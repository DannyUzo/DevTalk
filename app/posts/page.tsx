"use client";

import { Navbar } from "../(marketing)/_components/navbar";
import { useState, useEffect } from "react";
import { Auth } from "@/components/providers/auth-provider";
import { db } from "@/firebase/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { toast } from "sonner";
import { SkeletonCard } from "@/components/skeleton-card";

interface DocumentProps {
  id: string;
  Title: string;
  Content: string;
  content?: any;
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
      <div className="p-20 mt-20 h-full flex items-center justify-center w-full">
        <h1>PostsPage</h1>
        <div>
          {allPosts.map((post) => (
            <div key={post.id}>
              <h2>{post.Title}</h2>
              <h2>{post.Content[0].content[0].text}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsPage;
