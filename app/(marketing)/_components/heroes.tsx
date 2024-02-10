"use client";

import { Button } from "@/components/ui/button"
import { SignUpButton } from "@/firebase/components/useSignUpButton"
import { useRouter } from "next/navigation"

export const Heroes = () => {
  const router = useRouter()

  const viewPosts = () => {
    router.push("/posts")
  }

  return (
    <div className="w-[90%] sm:max-w-3xl space-y-4 flex flex-col items-center">
          <span className="font-bold text-7xl font-sans">DevTalk</span> 
        <h1 className="text-md text-center max-w-60">
          A blog platform where developers and programmers can share Tech related articles, posts and content.</h1>
        <div>
          <div className="flex gap-5 items-center">
            <SignUpButton name="Get Started"/>
            <Button variant="secondary" onClick={viewPosts}>View Posts</Button>
          </div>
        </div>
    </div>
  )
}
