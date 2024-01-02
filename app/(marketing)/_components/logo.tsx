import { Poppins } from "next/font/google";
import React from "react";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 sm:flex">
      <p className={cn("font-semibold", font.className)}>
        <span>{"< "}</span>
        DevTalk
        <span>{" />"}</span>
      </p>
    </div>
  );
};
