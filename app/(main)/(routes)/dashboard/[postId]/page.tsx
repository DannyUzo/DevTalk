"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { auth } from "@/firebase/firebase-config";
import { Menu } from "@/app/(main)/_components/menu";
import { Share } from "@/app/(main)/_components/share";

interface ContentItem {
  type: string; // Adjust based on actual content structure
  content: string;
  // other fields if necessary
}

interface DocumentProps {
  id: string;
  Title: string;
  Content: ContentItem[];
  Author: string;
  AuthorId: string;
  AuthorImg: string;
}

const PostPage = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<DocumentProps | null>(null);
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

  const onChange = (content: string) => {
    console.log(post);
  };

  return (
    <div className="pb-60 flex flex-col items-center gap-10 px-10">
      <div className="w-full flex items-center justify-between gap-2 p-5 md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post?.AuthorImg} alt="display picture" />
            <AvatarFallback>DT</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{post?.Author}</h2>
        </div>
        <div className="flex items-center space-evenly">
          <Share postId={post?.id || ""} />
          {post?.AuthorId === auth?.currentUser?.uid && <Menu />}
        </div>
      </div>

      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold">{post?.Title}</h1>
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={post?.Content}
        />
      </div>
    </div>
  );
};

export default PostPage;
