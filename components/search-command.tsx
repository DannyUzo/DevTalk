"use client";

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from "./ui/command";
import { useSearch } from "@/Hooks/use-search";
import { db } from "@/firebase/firebase-config"; // Update this to your Firebase config

interface DocumentProps {
  id: string;
  title: string;
  author: string;
  authorId: string;
  authorImg?: string;
  content: any[];
  createdAt: any;
}

export const SearchCommand = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState<DocumentProps[]>([]);
  const [loading, setLoading] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const getSearch = async (searchTerm = ""): Promise<void> => {
    if (!searchTerm) return; // Avoid empty searches

    try {
      setLoading(true);
      const collectionRef = collection(db, "posts");

      // Query by title or author ID dynamically based on search term
      const titleQuery = query(
        collectionRef,
        where("title", ">=", searchTerm),
        where("title", "<=", searchTerm + "\uf8ff"),
        orderBy("CreatedAt", "desc"),
        limit(5)
      );

      const authorQuery = query(
        collectionRef,
        where("authorId", ">=", searchTerm),
        where("authorId", "<=", searchTerm + "\uf8ff"),
        orderBy("CreatedAt", "desc"),
        limit(5)
      );

      // Run both queries
      const [titleDocs, authorDocs] = await Promise.all([
        getDocs(titleQuery),
        getDocs(authorQuery),
      ]);

      const titlePosts = titleDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as DocumentProps[];

      const authorPosts = authorDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as DocumentProps[];

      // Combine both results, removing duplicates
      const posts = [...titlePosts, ...authorPosts].filter(
        (value, index, self) => index === self.findIndex((t) => t.id === value.id)
      );

      setDocuments(posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      getSearch(searchTerm);
    } else {
      setDocuments([]); // Reset search results when searchTerm is cleared
    }
  }, [searchTerm]);

  const onSelect = (id: string) => {
    router.push(`/posts/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder="Search posts by title or author..."
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <CommandList>
        {loading ? (
          <CommandEmpty>Loading...</CommandEmpty>
        ) : documents.length === 0 ? (
          <CommandEmpty>No results found</CommandEmpty>
        ) : (
          <CommandGroup heading="Documents">
            {documents.map((document) => (
              <CommandItem
                key={document.id}
                value={`${document.id}-${document.title}`}
                title={document.title}
                onSelect={() => onSelect(document.id)}
              >
                {document.authorImg ? (
                  <img className="mr-2 h-4 w-4 rounded-full" src={document.authorImg} alt={document.author} />
                ) : (
                  <File className="mr-2 h-4 w-4" />
                )}
                <span>{document.title}</span>
                <small>by {document.author}</small>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};
