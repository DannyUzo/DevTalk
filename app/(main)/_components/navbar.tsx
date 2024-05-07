"use client";

import { Logo } from "@/app/(marketing)/_components/logo";
import { UserButton } from "@/firebase/components/userButton";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useParams } from "next/navigation";
import { ModeToggleButton } from "./mode-toggle-button";

interface NavbarProps {
  expandPanel: () => void;
  isCollapsed: boolean;
}
export const Navbar = ({ expandPanel, isCollapsed }: NavbarProps) => {
  const params = useParams();
  return (
    <div className="w-full p-2 flex items-center justify-between fixed border-b">
      <div
        className={cn(
          "hidden transition-all",
          isCollapsed && "flex cursor-pointer gap-x-3"
        )}
      >
        <Menu onClick={expandPanel} />
        <Logo />
      </div>
      <div>Navbar</div>
      <div className="flex gap-3">
        <ModeToggleButton />
        <UserButton />
      </div>
    </div>
  );
};
