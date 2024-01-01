"use client"

import { useSignUp } from "@/Hooks/use-sign-up";
import { Button } from "@/components/ui/button"

interface Props {
    name: string;
}
export const SignUpButton = ({ name }: Props) => {
    const signUp = useSignUp();

    return (
        <Button role="button" onClick={signUp.onOpen}>{name}</Button>
    )
}