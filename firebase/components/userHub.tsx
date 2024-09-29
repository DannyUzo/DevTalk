import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/firebase/firebase-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "./signOut";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { LogOut, MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface UserData {
  imgUrl?: string;
  initials: string;
  displayName: string;
  email?: string;
}

export const UserHub = () => {
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

  if(!user) {
    return (
        <Skeleton className="w-24 h-5 rounded"/>
    )
  }

  return (
    <div className="flex flex-shrink-0 w-full max-w-sm">
    <div className="flex p-2 gap-2 items-center w-full">
      <Avatar className="w-12 h-12 rounded-full flex-shrink-0">
        <AvatarImage src={user?.imgUrl || undefined} alt="user" className="w-full h-full object-cover" />
        <AvatarFallback>{user?.initials}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-ellipsis overflow-hidden">
        <span className="font-semibold text-sm sm:text-base md:text-lg">{user?.displayName}</span>
        <sub className="text-muted-foreground/90 text-xs sm:text-sm -mt-1">
          {user?.email}
        </sub>
      </div>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger className="mt-5" asChild>
      <Button size="tn" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <LogOut className="mr-4 h-4 w-4 " />
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  
  );
};
