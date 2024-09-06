"use client";

import { useState, useEffect } from "react";
import { Auth } from "@/components/providers/auth-provider";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { db } from "@/firebase/firebase-config";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { toast } from "sonner";
import { SkeletonCard } from "@/components/skeleton-card";
import { PostCard } from "../../_components/post-card";

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

const MainPage = () => {
  const { isAuthenticated } = useContext(Auth);
  const [allPosts, setAllPosts] = useState<DocumentProps[]>([]);


  const collectionRef = collection(db, "posts");
  const getAllPosts = async (): Promise<void> => {
    try {
      const postsQuery = query(collectionRef, orderBy("CreatedAt", "desc"));
      const data = await getDocs(postsQuery);
      const posts: DocumentProps[] = data.docs.map((doc) => {
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

  if (!isAuthenticated) {
    return redirect("/");
  }

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
    <div className="w-full h-full items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-y-4">
        {allPosts.map((post) => (
          <div key={post.id} >
            <PostCard Id={post.id}  {...post}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
