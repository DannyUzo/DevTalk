"use client";

import { Navbar } from "../(marketing)/_components/navbar";
import { useState, useEffect } from "react";
import { Auth } from "@/components/providers/auth-provider";
import { db } from "@/firebase/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { toast } from "sonner";
import { SkeletonCard } from "@/components/skeleton-card";
import { PostCard } from "../(main)/_components/post-card";

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
  CreatedAt: string;
}
const PostsPage = () => {
  const [allPosts, setAllPosts] = useState<DocumentProps[]>([]);

  const collectionRef = collection(db, "posts");
  const getAllPosts = async (): Promise<void> => {
    try {
      const data = await getDocs(collectionRef);
      const posts: DocumentProps[] = data.docs.map((doc) => {
        // Use the DocumentProps type for `doc.data()`
        const docData = doc.data() as DocumentProps;
        return { ...docData, id: doc.id };
      });
      setAllPosts(posts);
      console.log(posts);
    } catch (error) {
      console.error("Error fetching Data:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (allPosts.length == 0) {
    return (
      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4 w-full flex flex-col items-center justify-center">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col dark:bg-[#1F1F1F] h-full">
      <Navbar />
      <div className="p-20 mt-10 h-full flex flex-col items-center justify-center w-full gap-4">
        <div className="flex flex-col gap-y-4">
          {allPosts.slice(0, 10).map((post) => (
            <div key={post.id}>
              <PostCard Id={post.id} {...post} />
            </div>
          ))}
        </div>
        <p>Kindly login to view more.😊</p>
      </div>
    </div>
  );
};

export default PostsPage;
