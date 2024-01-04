"use client";

import { Menu } from "lucide-react";

interface NavbarProps {
  expandPanel: () => void;
  isCollapsed: boolean;
}
export const Navbar = ({ expandPanel, isCollapsed }: NavbarProps) => {
  return (
    <div>
      {isCollapsed && (
        <div
          onClick={expandPanel}
        >
            <Menu/>
        </div>
      )}
      <div>Navbar</div>
    </div>
  );
};
