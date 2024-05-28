"use client";

import { useState, useEffect } from "react";
import { Auth } from "@/components/providers/auth-provider";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { db } from "@/firebase/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { toast } from "sonner";
import { SkeletonCard } from "@/components/skeleton-card";
import { PostCard } from "../../_components/post-card";

interface DocumentProps {
  id: string;
  Title: string;
  Content: string;
  Author: string;
  AuthorImg: string;
}

const MainPage = () => {
  const { isAuthenticated } = useContext(Auth);
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
    <div className="w-full h-full items-center justify-center">
      MainPage
      <div>
        {allPosts.map((post) => (
          <div key={post.id}>
            <PostCard Title={post.Title} Author={post.Author} AuthorImg={post.AuthorImg}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
