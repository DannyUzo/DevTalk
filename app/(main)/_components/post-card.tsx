import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Menu } from "./menu";
import { auth } from "@/firebase/firebase-config";
import { Share2 } from "lucide-react";


interface CardProps {
  Title: string;
  Author: string;
  AuthorImg: string;
  AuthorId: string;
  Id: string;
}

export const PostCard = ({ Title, Author, AuthorImg, AuthorId, Id }: CardProps) => {
  const router = useRouter();

  const viewpost = () => {
    router.push(`/dashboard/${Id}`);
  };

  return (
    <Card className="w-40 sm:w-[480px] flex flex-col justify-between gap-5">
      <CardHeader>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={AuthorImg} alt="display picture" />
              <AvatarFallback>DT</AvatarFallback>
            </Avatar>
            <CardDescription className="text-sm">{Author}</CardDescription>
          </div>
          <Share2 />
          {AuthorId === auth?.currentUser?.uid && (
          <Menu />
          )}
        </div>
        <Separator />
        <CardTitle
          onClick={viewpost}
          className="text-base hover:underline cursor-pointer"
        >
          {Title}
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
