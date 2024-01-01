"use client"

import { useEffect, useState } from "react"
import { SignUpModal } from "@/components/modals/signUp-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    },[]);

    if(!isMounted) {
        return null
    }

    return (
        <>
        <SignUpModal />
        </>
    )
}