"use client";

import { useCallback } from 'react';
import { Logo } from "@/app/(marketing)/_components/logo";
import { cn } from "@/lib/utils";
import { ChevronsLeft, FolderClock, Home, PlusSquare } from "lucide-react";
import Link from "next/link";
interface Props {
  collapsePanel: () => void;
}
export const Navigation = ({ collapsePanel }: Props) => {
  const handleClick = useCallback(() => {
    collapsePanel();
  }, [collapsePanel]);

  return (
    <aside className="group/sidebar h-[100vh] overflow-y-auto flex relative justify-between flex-col z-[99999]">
      <div>
        <div
          onClick={handleClick}
          role="button"
          className={cn(
            "w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-100 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
          )}
        >
          <ChevronsLeft className="h-6 w-6" aria-label="Collapse panel" />
        </div>
        <div className="flex h-full items-center justify-center p-6">
          <Logo/>
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-y-5 py-3">
        <Link href="/dashboard" passHref className={cn("flex rounded-lg border text-xl items-center gap-2 w-40 text-slate-800 px-5 py-2")}>
          {/* <Home className="h-5 w-5"/> */}
          Home
        </Link>
        <Link href="/createpost" passHref className={cn("flex rounded-lg border text-xl items-center gap-2 w-40 text-slate-800 px-5 py-2")}>
          {/* <PlusSquare className="h-5 w-5"/> */}
          CreatePost
        </Link>
        <Link href="/history" passHref className={cn("flex rounded-lg border text-xl items-center gap-2 w-40 text-slate-800 px-5 py-2")}>
          {/* <FolderClock className="h-5 w-5"/> */}
          History
        </Link>
      </div>
    </aside>
  );
};
