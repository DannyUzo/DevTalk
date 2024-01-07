"use client";

import { Logo } from "@/app/(marketing)/_components/logo";
import { UserButton } from "@/firebase/components/userButton";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

interface NavbarProps {
  expandPanel: () => void;
  isCollapsed: boolean;
}
export const Navbar = ({ expandPanel, isCollapsed }: NavbarProps) => {
  return (
    <div className="w-full p-2 flex items-center justify-between border">
        <div
        // className={cn("opacity-0 flex gap-2", isCollapsed && "opacity-100 cursor-pointer")}
        className={cn("hidden transition-all", isCollapsed && "flex cursor-pointer")}
        >
            <Menu onClick={expandPanel}/>
            <Logo />
        </div>
      <div>Navbar</div>
      <UserButton />
    </div>
  );
};
