"use client";

import { useSignUp } from "@/Hooks/use-sign-up";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { SignInWithGithub } from "@/firebase/components/githubSignIn";
import { SignInWithGoogle } from "@/firebase/components/googleSignIn";

export const SignUpModal = () => {
  const signUp = useSignUp();

  return (
      <Dialog open={signUp.isOpen} onOpenChange={signUp.onClose}>
        <DialogContent>
          <DialogHeader>
            <h1 className="font-bold text-2xl text-center font-sans">
              Join DevTalk Today
            </h1>
          </DialogHeader>
          <div className="flex flex-col gap-y-5 items-center justify-center">
            <SignInWithGoogle />
            <SignInWithGithub />
          </div>
        </DialogContent>
      </Dialog>
  );
};
