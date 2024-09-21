import { Poppins } from "next/font/google";
import React from "react";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"],
});

export const Logo = () => {
  return (
    <div className="hidden items-center shrink gap-x-2 sm:flex text-xs sm:text-lg">
      <p className={cn("font-semibold", font.className)}>
        <span>{"< "}</span>
        DevTalk
        <span>{" />"}</span>
      </p>
    </div>
  );
};
