"use client"

import { Auth } from "@/components/providers/auth-provider"
import { redirect } from "next/navigation";
import { useContext } from "react";

const MainPage = () => {
    const { isAuthenticated } = useContext(Auth);

    if(!isAuthenticated){
      return redirect("/");
    }


  return (
    <div className="w-full h-full items-center justify-center">MainPage

    </div>
  )
}

export default MainPage