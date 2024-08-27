"use client";

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { auth, db } from "@/firebase/firebase-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { MoreHorizontal, PenSquare, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteDoc, doc } from "firebase/firestore";
import ConfirmModal from "@/components/modals/confirm-modal";

interface MenuProps {
  postId: string;
}

export const Menu: React.FC<MenuProps> = ({ postId }) => {
  const router = useRouter();

  // const deletePost = async (postId: string) => {
  //   const userDoc = doc(db, "posts", postId);
  //   await deleteDoc(userDoc);
  // };

  const deletePost = async (postId: string, router: AppRouterInstance) => {
    const promise: Promise<void> = new Promise(async (resolve, reject) => {
      try {
        const userDoc = doc(db, "posts", postId);
        await deleteDoc(userDoc);
        resolve();  // Resolves without any value
      } catch (error) {
        reject(error);  // Rejects with an error
      }
    });
  
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note."
    });
  
    promise.then(() => {
      router.push('/dashboard'); 
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="tn" variant="ghost">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={() => {}}>
          <PenSquare className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
            <ConfirmModal onConfirm={() => deletePost(postId, router)}>
          <div className=
      "relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
              <div className="flex items-center">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </div>
          </div>
            </ConfirmModal>
        <DropdownMenuSeparator />
        <div className="text-sm text-muted-foreground p-2">
          Last edited by: {auth.currentUser?.displayName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
