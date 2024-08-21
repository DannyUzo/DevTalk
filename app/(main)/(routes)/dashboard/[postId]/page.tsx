"use client";

import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";


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
  AuthorImg: string;
}

const PostPage = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<DocumentProps | null>(null);
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }), []);

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
    <div>
      <h1>{post?.Title}</h1>
      <p>{post?.Author}</p>
      <img src={post?.AuthorImg} alt="Author" />

      <div>
        <Editor editable={false} onChange={onChange} initialContent={post?.Content}/>

        {post?.Content.map((item, index) => (
          <div key={index}>
            {/* Render content based on its type */}
            {item.type === 'text' ? (
              <p>{item.content}</p>
            ) : item.type === 'image' ? (
              <img src={item.content} alt={`Content ${index}`} />
            ) : (
              <div>Unsupported content type</div>
            )}
          </div>
        ))}
      </div>

      <div>Dynamic post page</div>
    </div>
  );
};

export default PostPage;
