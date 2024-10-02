"use client";

// import type{ Metadata } from "next"

import { ElementRef, useRef, useState, useMemo } from "react";
import { db, auth } from "@/firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";
import TextareaAutoSize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "DevTalk | CreatePost",
// }
const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("Untitled");
  const [postContent, setPostContent] = useState<string | any>("");

  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const Router = useRouter();
  const collectionRef = collection(db, "posts");

  const author = auth.currentUser?.displayName;
  const authorImg = auth.currentUser?.photoURL;
  const authorId = auth.currentUser?.uid;

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const cleanContent = (contentArray: any[]) => {
    return contentArray.map(block => {
      if (block.type === "image") {
        return {
          ...block,
          content: block.props.url ? block.props.url : 'No image URL',
        };
      } else if (block.content) {
        return block;
      }

      return null;
    }).filter(Boolean);
  };
  

  const onPost = async () => {
    const cleanedContent = cleanContent(postContent);
    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        await addDoc(collectionRef, {
          Title: postTitle,
          Content: cleanedContent,
          Author: author,
          AuthorImg: authorImg,
          AuthorId: authorId,
          CreatedAt: serverTimestamp(),
        });
        resolve(); 
      } catch (err) {
        reject(err); 
      }
    });
    
      toast.promise(promise, {
        loading: "Creating post...",
        success: "Post Created!",
        error: "Failed to create post."
      });
    
      promise.then(() => {
        Router.push("/dashboard");  
        console.log(postContent);
      }).catch((err) => {
        console.log(err);
      });
  };


  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setPostTitle(value);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onChange = (content: string) => {
    setPostContent(content);
  };

  if(Editor === undefined){
    return(
      <Skeleton className="w-[50%] h-4"/>
    )
  }

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex w-full justify-between">
        <h2>
        {postTitle}
        </h2>
        <Button onClick={onPost}>Post</Button>
      </div>
      <div className="md:max-w-2xl lg:max-w-3xl mx-auto mt-12">
        <div className="flex flex-col items-center">
          {!isEditing ? (
            <TextareaAutoSize
              ref={inputRef}
              onBlur={disableInput}
              onKeyDown={onKeyDown}
              value={postTitle}
              onChange={(e) => onInput(e.target.value)}
              className="text-3xl md:max-w-2xl lg:max-w-3xl sm:text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
            />
          ) : (
            <div
              onClick={enableInput}
              className="pb-[11.5px] md:max-w-2xl lg:max-w-3xl text-3xl sm:text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
            >
              {postTitle}
            </div>
          )}
        </div>
        <div className="-ml-12 md:max-w-2xl lg:max-w-3xl">
        <Editor onChange={onChange} initialContent={postContent} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
