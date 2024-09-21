"use client";

import { Logo } from "@/app/(marketing)/_components/logo";
import { UserButton } from "@/firebase/components/userButton";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { ModeToggleButton } from "./mode-toggle-button";
import { useMediaQuery } from "usehooks-ts";
import Search from "./search";

interface NavbarProps {
  expandPanel: () => void;
  isCollapsed: boolean;
}
export const Navbar = ({ expandPanel, isCollapsed }: NavbarProps) => {
  const isMobile = useMediaQuery("(max-width: 680px)");
  return (
    <div
      className={cn(
        "w-full p-2 flex items-center justify-between fixed  backdrop-filter backdrop-grayscale backdrop-blur-4xl z-50",
        isMobile && "justify-evenly"
      )}
    >
      <div
        className={cn(
          "hidden transition-all",
          isCollapsed && "flex cursor-pointer gap-x-3"
        )}
      >
        {!isMobile && <Menu onClick={expandPanel} />}
        {isMobile && <Menu />}
        <Logo />
      </div>
      <div
        className={cn(
          "flex gap-3 w-full justify-between",
          isCollapsed && "w-5/6 flex justify-between"
        )}
      >
        <Search />
        <div className="flex">
          <ModeToggleButton />
          <UserButton />
        </div>
      </div>
    </div>
  );
};
