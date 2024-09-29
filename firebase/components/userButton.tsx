import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/firebase/firebase-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "./signOut";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

interface UserData {
  imgUrl?: string;
  initials: string;
  displayName: string;
  email?: string;
}

export const UserButton = () => {
  const isMobile = useMediaQuery("(max-width: 680px)");
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData: UserData = {
          imgUrl: currentUser.photoURL || undefined,
          initials: currentUser.displayName?.[0] ?? "",
          displayName: currentUser.displayName ?? "",
          email: currentUser.email || undefined,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
      } else {
        localStorage.removeItem("userData");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-8 w-8" asChild>
        <Avatar>
          <AvatarImage src={user?.imgUrl || undefined} alt="user"/>
          <AvatarFallback>{user?.initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex p-2 gap-5">
          <Avatar className="w-12 h-12 rounded-full">
            <AvatarImage src={user?.imgUrl || undefined} alt="" />
            <AvatarFallback>{user?.initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{user?.displayName}</span>
            <span className="text-muted-foreground/90 text-sm">
              {user?.email}
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-4 h-4 w-4 " />
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
