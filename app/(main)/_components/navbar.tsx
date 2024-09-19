"use client";

import { Logo } from "@/app/(marketing)/_components/logo";
import { UserButton } from "@/firebase/components/userButton";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { ModeToggleButton } from "./mode-toggle-button";
import Search from "./search";

interface NavbarProps {
  expandPanel: () => void;
  isCollapsed: boolean;
}
export const Navbar = ({ expandPanel, isCollapsed }: NavbarProps) => {
  return (
    <div className="w-screen p-2 flex items-center justify-between fixed border-b backdrop-filter backdrop-grayscale backdrop-blur-xl z-50">
      <div
        className={cn(
          "hidden transition-all",
          isCollapsed && "flex cursor-pointer gap-x-3"
        )}
      >
        <Menu onClick={expandPanel} />
        <Logo />
      </div>
      <div className="flex gap-3 w-2/3">
      <Search />
      uzodinmablessing1706@gmail.com
        <ModeToggleButton />
        <UserButton />
      </div>
    </div>
  );
};
