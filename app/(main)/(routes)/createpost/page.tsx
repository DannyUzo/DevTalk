"use client";

// import type{ Metadata } from "next"

import { ElementRef, useRef, useState, useMemo } from "react";
import { db, auth } from "@/firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
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
  const [postContent, setPostContent] = useState("");

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

  const onPost = async () => {
    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        await addDoc(collectionRef, {
          Title: postTitle,
          Content: postContent,
          Author: author,
          AuthorImg: authorImg,
          AuthorId: authorId,
        });
        resolve();  // Resolves if the post is successfully created
      } catch (err) {
        reject(err);  // Rejects if there's an error creating the post
      }
    });
    
      toast.promise(promise, {
        loading: "Creating post...",
        success: "Post Created!",
        error: "Failed to create post."
      });
    
      promise.then(() => {
        Router.push("/dashboard");  // Redirect to the dashboard page on success
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
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-12">
        <div className="flex flex-col items-center">
          {!isEditing ? (
            <TextareaAutoSize
              ref={inputRef}
              onBlur={disableInput}
              onKeyDown={onKeyDown}
              value={postTitle}
              onChange={(e) => onInput(e.target.value)}
              className="text-3xl sm:text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
            />
          ) : (
            <div
              onClick={enableInput}
              className="pb-[11.5px] text-3xl sm:text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
            >
              {postTitle}
            </div>
          )}
        </div>
        <div className="-ml-12 md:max-w-3xl lg:max-w-4xl">
        <Editor onChange={onChange} initialContent={postContent} />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
