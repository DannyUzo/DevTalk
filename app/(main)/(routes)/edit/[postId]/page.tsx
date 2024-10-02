"use client";

import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { useState, useEffect, useRef, ElementRef } from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TextareaAutoSize from "react-textarea-autosize";
import { toast } from 'sonner';


interface ContentItem {
  type: string;
  content: string;
}

interface DocumentProps {
  id: string;
  Title: string;
  Content: ContentItem[];
  Author: string;
  AuthorId: string;
  AuthorImg: string;
}

const EditPage = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<DocumentProps | null>(null);
  const [updatedPostTitle, setUpdatedPostTitle] = useState<string>("");
  const [updatedPostContent, setUpdatedPostContent] = useState<string | any>({});

  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const router = useRouter();

  const postRef = doc(db, "posts", params.postId);

  const getPost = async (): Promise<void> => {
    try {
      const docSnap = await getDoc(postRef);

      if (docSnap.exists()) {
        const postData = docSnap.data() as DocumentProps;
        setPost(postData);
        setUpdatedPostTitle(postData.Title);
        setUpdatedPostContent(postData.Content);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setUpdatedPostTitle(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onChange = (value: string) => {
    setUpdatedPostContent(value); // Update the content as a string
  };


  const cleanContent = (contentArray: any[]) => {
    return contentArray.map(block => {
      if (block.type === "image") {
        // For image, use the URL or a placeholder
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
  

const handleSave = async () => {
  if (!post) return;

  const cleanedContent = cleanContent(updatedPostContent);

  const promise = new Promise<void>(async (resolve, reject) => {
    try {
      await updateDoc(postRef, {
        Title: updatedPostTitle,
        Content: cleanedContent,
      });
      resolve(); 
    } catch (error) {
      reject(error); 
    }
  });

  toast.promise(promise, {
    loading: "Saving changes...",
    success: "Changes saved successfully!",
    error: "Failed to save changes. Please try again.",
  });

  promise
    .then(() => {
      router.back();  // Redirect back after save
    })
    .catch((error) => {
      console.error("Error updating document:", error);
      console.log(updatedPostContent)
    });
};

  const onDiscard = () => {
    router.back();
  };



  return (
    <div className="pb-60 flex flex-col items-center gap-10 px-10 mt-10">
      <div className="flex w-full justify-between">
        <Button onClick={onDiscard}>Discard</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>

      <div className="flex flex-col items-center">
        {isEditing ? (
          <TextareaAutoSize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={updatedPostTitle || ""}
            onChange={(e) => onInput(e.target.value)}
            className="text-3xl md:max-w-2xl lg:max-w-3xl sm:text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          />
        ) : (
          <div
            onClick={enableInput}
            className="pb-[11.5px] md:max-w-2xl lg:max-w-3xl text-3xl sm:text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          >
            {updatedPostTitle || ""}
          </div>
        )}
      </div>

      <div className="-ml-12 md:max-w-2xl lg:max-w-3xl">
        <Editor onChange={onChange} initialContent={updatedPostContent} />
      </div>
    </div>
  );
};

export default EditPage;
