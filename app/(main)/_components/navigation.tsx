"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft } from "lucide-react";
interface Props {
  collapsePanel: () => void;
}
export const Navigation = ({ collapsePanel }: Props) => {
  return (
    <aside className="group/sidebar h-full overflow-y-auto flex relative flex-col z-[99999]">
      <div
        onClick={collapsePanel}
        role="button"
        className={cn(
          "w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-200 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
        )}
      >
        <ChevronsLeft className="h-6 w-6" />
      </div>
      <div className="flex h-full items-center justify-center p-6">
        <p>Sidebar</p>
      </div>
    </aside>
  );
};
