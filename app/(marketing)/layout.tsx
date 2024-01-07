"use client";

import { useContext, useEffect } from "react";
import { Navbar } from "./_components/navbar";
import { Auth } from "@/components/providers/auth-provider";
import { redirect } from "next/navigation";

const Landinglayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useContext(Auth);

  useEffect(() => {
    if (isAuthenticated) {
      return redirect("/dashboard");
    }
  }, []);

  return (
    <div className="h-full dark:bg-[#1F1F1F] ">
      <Navbar />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default Landinglayout;
