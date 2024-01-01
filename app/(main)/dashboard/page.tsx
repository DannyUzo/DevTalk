"use client"

import { Auth } from "@/components/providers/auth-provider"
import { SignOutButton } from "@/firebase/components/signOut";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

const MainPage = () => {
    const { isAuthenticated } = useContext(Auth);
    const router = useRouter();

    if(!isAuthenticated){
        router.push("/");
    }

// useEffect(() => {
//     if(!isAuthenticated){
//         router.push("/");
//     }
// }, []);

  return (
    <div>MainPage
        <SignOutButton />
    </div>
  )
}

export default MainPage