"use client";

import { Button } from "@/components/ui/button"
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useContext } from "react";
import { Auth } from "@/components/providers/auth-provider";

export const SignOutButton = () => {
    const { setIsAuthenticated } = useContext(Auth);

    const LogOut = () => {
        signOut(auth).then(() => {
            setIsAuthenticated(false);
        })
    }

    return (
        <Button onClick={LogOut} variant="outline">Log Out</Button>
    )
}