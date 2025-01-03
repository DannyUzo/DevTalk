"use client";

import { useState, useEffect } from "react";
import { Auth } from "@/components/providers/auth-provider";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { db } from "@/firebase/firebase-config";
import { collection, query, getDocs, orderBy, limit, startAfter } from "firebase/firestore";
import { toast } from "sonner";
import { SkeletonCard } from "@/components/skeleton-card";
import { PostCard } from "../../_components/post-card";
import { Button } from "@/components/ui/button";
import { useScrollEnd } from "@/Hooks/use-scroll-end";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [allPosts, setAllPosts] = useState<DocumentProps[]>([]);
  const [lastVisibleDoc, setLastVisibleDoc] = useState<any>(null); 
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true);

  const collectionRef = collection(db, "posts");

  const getAllPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      const postsQuery = query(collectionRef, orderBy("CreatedAt", "desc"), limit(5));
      const data = await getDocs(postsQuery);
      const posts: DocumentProps[] = data.docs.map((doc) => {
        const docData = doc.data() as DocumentProps;
        return { ...docData, id: doc.id };
      });

      setLastVisibleDoc(data.docs[data.docs.length - 1]); 
      setAllPosts(posts);
      console.log(posts);
    } catch (error) {
      console.error("Error fetching Data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async (): Promise<void> => {
    try {
      if (!lastVisibleDoc || !hasMore) return;
      setLoading(true);
  
      const postsQuery = query(
        collectionRef,
        orderBy("CreatedAt", "desc"),
        startAfter(lastVisibleDoc),
        limit(5)
      );
  
      const data = await getDocs(postsQuery);
      const newPosts: DocumentProps[] = data.docs.map((doc) => {
        const docData = doc.data() as DocumentProps;
        return { ...docData, id: doc.id };
      });
  
      if (data.docs.length === 0) {
        setHasMore(false);
      } else {
        setLastVisibleDoc(data.docs[data.docs.length - 1]); // Update the last visible document
        setAllPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new posts
  
        if (data.docs.length < 5) {
          setHasMore(false);
        }
      }
  
      console.log(newPosts);
    } catch (error) {
      console.error("Error fetching more data:", error);
      toast.error("Failed to load more data");
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    getAllPosts();
  }, []);


  
  if (!isAuthenticated) {
    return redirect("/");
  }

  if (loading || allPosts.length === 0) {
    return (
      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pt-4 w-full flex flex-col items-center justify-center">
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
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-y-4">
        {allPosts.map((post) => (
          <div key={post.id}>
            <PostCard Id={post.id} {...post} />
          </div>
        ))}
      </div>
      <div>
      <div className="mt-12">

      {hasMore ? (
        <Button size="sm" className="bg-muted-foreground" onClick={loadMore} disabled={loading}>
          {loading ? "Loading..." : <p>Show more &rarr;</p>}
        </Button>
      ) : (
        <p className="text-xs text-muted text-center">No more posts to load. Why not post something &rarr; <span onClick={() => router.push("/createpost")} className="underline cursor-pointer">create post.</span>✌️</p> // Display this message when no more posts are available
      )} 
      </div>
      </div>
    </div>
  );
};


export default MainPage;
