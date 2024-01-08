"use client";

import { useCallback, useEffect } from "react";
import { Logo } from "@/app/(marketing)/_components/logo";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { ChevronsLeft, FolderClock, Home, PenLine } from "lucide-react";
import Link from "next/link";
interface Props {
  collapsePanel: () => void;
}
export const Navigation = ({ collapsePanel }: Props) => {
  const isMobile = useMediaQuery("(max-width: 868px)");

  useEffect(() => {
    if (isMobile) {
      collapsePanel();
    }
  }, [isMobile]);

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
          <Logo />
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-y-5 py-3">
        <Link
          href="/dashboard"
          passHref
          className={cn(
            "flex rounded-lg border items-center gap-2 w-50 px-5 py-2"
          )}
        >
          <Home className="h-5 w-5" />
          <span className={cn("text-lg lg:text-xl text-slate-800", isMobile && "hidden")}>
            Home
          </span>
        </Link>
        <Link
          href="/createpost"
          passHref
          className={cn(
            "flex rounded-lg border items-center gap-2 w-50  px-5 py-2"
          )}
        >
          <PenLine className="h-5 w-5" />
          <span className={cn("text-lg md:text-xl text-slate-800", isMobile && "hidden")}>
            CreatePost
          </span>
        </Link>
        <Link
          href="/history"
          passHref
          className={cn(
            "flex rounded-lg border text-xl items-center gap-2 w-50 text-slate-800 px-5 py-2"
          )}
        >
          <FolderClock className="h-5 w-5" />
          <span className={cn("text-lg md:text-xl text-slate-800", isMobile && "hidden")}>
            History
          </span>
        </Link>
      </div>
    </aside>
  );
};
