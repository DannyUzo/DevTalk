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
import { Share } from "@/app/(main)/_components/share";

interface ContentItem {
  type: string;
  content: string;
}

interface CardProps {
  Title: string;
  Author: string;
  AuthorImg: string;
  AuthorId: string;
  Content: ContentItem[];
  CreatedAt: any;
  Id: string;
}

export const PostCard = ({
  Title,
  Author,
  AuthorImg,
  AuthorId,
  Content,
  CreatedAt,
  Id,
}: CardProps) => {
  const router = useRouter();

  const viewpost = () => {
    router.push(`/dashboard/${Id}`);
  };

  const timestamp = CreatedAt; 

  let date;
  let displayDate;

  if (
    timestamp &&
    timestamp.seconds !== undefined &&
    timestamp.nanoseconds !== undefined
  ) {
    date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  } else {
    console.error("Timestamp is not properly defined:", timestamp);
    date = new Date(); // Fallback to the current date and time if timestamp is not defined
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const isYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (diffInSeconds < 60) {
    displayDate = "Just now";
  } else if (diffInMinutes < 60) {
    displayDate = `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (isSameDay) {
    displayDate = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (isYesterday) {
    displayDate = "yesterday";
  } else {
    displayDate = date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const extractFirst15Words = (contentArray: any[]): string => {
    const allText = contentArray
      .flatMap((item) => item.content.map((contentItem: { text: any; }) => contentItem.text))
      .join(" ");
  
    const words = allText.split(" ");
  
    if (words.length > 20) {
      return words.slice(0, 20).join(" ") + "...";
    }
  
    return allText;
  };

  return (
    <Card className="w-[17rem] sm:w-[480px] flex flex-col justify-between">
      <CardHeader className="p-3">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src={AuthorImg} alt="display picture" />
              <AvatarFallback>DT</AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-evenly">
              <CardDescription className="text-sm">{Author}</CardDescription>
              <CardDescription className="text-[12px]">{displayDate}</CardDescription>
            </div>
          </div>
          <div>
            <Share postId={Id} />
            {AuthorId === auth?.currentUser?.uid && <Menu postId={Id} />}
          </div>
        </div>
        <Separator />
        <CardTitle
          onClick={viewpost}
          className="hover:underline cursor-pointer tracking-wide text-lg"
        >
          {Title}
        </CardTitle>
      </CardHeader>
      <CardContent><p className="dark:text-[#e8e8e8] text-sm ">{extractFirst15Words(Content)}</p></CardContent>
    </Card>
  );
};
