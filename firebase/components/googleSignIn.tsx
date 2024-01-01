import { Button } from "@/components/ui/button";
import { Auth } from "@/components/providers/auth-provider";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase-config";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useSignUp } from "@/Hooks/use-sign-up";
import { toast } from "sonner";

export const SignInWithGoogle = () => {
  const router = useRouter();
  const signUp = useSignUp();
  const { setIsAuthenticated } = useContext(Auth);

  const GoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        setIsAuthenticated(true);
        router.push("/dashboard");
        signUp.onClose();
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        toast.error("Error signing in with Google. Check your Internet Connection");
      });
  };

  return (
    <Button onClick={GoogleSignIn} variant="outline">
      Continue with Google
    </Button>
  );
};