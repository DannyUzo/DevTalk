"use client";

import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Button } from "@/components/ui/button"

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
  const [updatedPost, setUpdatedPost] = useState(post?.Content);
  const [updatedPostTitle, setUpdatedPostTitle] = useState();
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const postRef = doc(db, "posts", params.postId);

  const getPost = async (): Promise<void> => {
    try {
      const docSnap = await getDoc(postRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setPost(docSnap.data() as DocumentProps);
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

  const onChange = () => {
    setUpdatedPost(updatedPost);
  };

  return (
    <div className="pb-60 flex flex-col items-center gap-10 px-10">
        <Button>Save</Button>
        <h1 className="w-full text-4xl font-semibold">{post?.Title}</h1>
        <div className="-ml-12">
        <Editor
          onChange={onChange}
          initialContent={post?.Content}
        />
        </div>
      </div>
  );
};

export default EditPage;
