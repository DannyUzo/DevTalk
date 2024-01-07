"use client"

import { Auth } from "@/components/providers/auth-provider"
import { SignOutButton } from "@/firebase/components/signOut";
import { redirect } from "next/navigation";
import { useContext } from "react";

const MainPage = () => {
    const { isAuthenticated } = useContext(Auth);

    if(!isAuthenticated){
      return redirect("/");
    }


  return (
    <div>MainPage
        <SignOutButton />
    </div>
  )
}

export default MainPage