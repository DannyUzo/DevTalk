"use client";

import { Logo } from "@/app/(marketing)/_components/logo";
import { UserButton } from "@/firebase/components/userButton";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { ModeToggleButton } from "./mode-toggle-button";
import { useMediaQuery } from "usehooks-ts";
import Search from "./search";
import { MobileNav } from "./mobile-nav";

interface NavbarProps {
  expandPanel: () => void;
  isCollapsed: boolean;
}
export const Navbar = ({ expandPanel, isCollapsed }: NavbarProps) => {
  const isMobile = useMediaQuery("(max-width: 680px)");
  return (
    <div
      className={cn(
        "w-full p-2 flex items-center justify-between fixed  backdrop-filter backdrop-grayscale backdrop-blur-xl z-50",
        isMobile && "flex justify-evenly items-center"
      )}
    >
      <div
        className={cn(
          "hidden transition-all",
          isCollapsed && "flex cursor-pointer gap-x-3"
        )}
      >
        {!isMobile && (
          <>
            <Menu onClick={expandPanel} />
            <Logo />
          </>
        )}
        {isMobile && <MobileNav />}
      </div>
      <div
        className={cn(
          isMobile && "flex gap-3 w-full justify-between items-center",
          isCollapsed && "flex gap-2",
          !isCollapsed && "w-full flex justify-between"
        )}
      >
        <Search />
        <div className={cn("flex items-center gap-2")}>
          <ModeToggleButton />
          <UserButton />
        </div>
      </div>
    </div>
  );
};
