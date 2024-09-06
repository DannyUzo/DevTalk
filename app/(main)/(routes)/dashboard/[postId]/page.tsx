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
import { toast } from "sonner";

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
  CreatedAt: any;
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
        toast.error("No such document!");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const timestamp = post?.CreatedAt; // Replace with your actual timestamp object

  let date;
  let displayDate;

  if (
    timestamp &&
    timestamp.seconds !== undefined &&
    timestamp.nanoseconds !== undefined
  ) {
    date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  } else {
    console.error("Timestamp is not properly defined:", timestamp);
    date = new Date(); // Fallback to the current date and time if timestamp is not defined
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (diffInSeconds < 60) {
    displayDate = "Just now";
  } else if (diffInMinutes < 60) {
    displayDate = `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (isSameDay) {
    displayDate = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (isYesterday) {
    displayDate = "yesterday";
  } else {
    displayDate = date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
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
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold">{post?.Author}</h2>
            <sub>{displayDate}</sub>
          </div>
        </div>
        <div className="flex items-center space-evenly">
          <Share postId={params.postId} />
          {post?.AuthorId === auth?.currentUser?.uid && (
            <Menu postId={params.postId} />
          )}
        </div>
      </div>
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto h-full dark:bg-[#1f1f1f] flex flex-col justify-start rounded-md p-4 gap-2">
        <h1 className="w-full text-4xl font-semibold ml-12">{post?.Title}</h1>
        <div>
          <Editor
            editable={false}
            onChange={onChange}
            initialContent={post?.Content}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
