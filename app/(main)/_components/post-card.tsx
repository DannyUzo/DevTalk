import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CardProps {
    Title: string;
    Author: string;
    AuthorImg: string;

}

export const PostCard = ({ Title, Author, AuthorImg }: CardProps) => {
    return (
        <Card className="w-70 sm:w-[480px] flex flex-col justify-between p-0">
            <CardHeader>
                <div className="flex">
                <Avatar>
                    <AvatarImage src={AuthorImg} alt="display picture"/>
                    <AvatarFallback>DT</AvatarFallback>
                </Avatar>
                <CardDescription>{Author}</CardDescription>
                </div>
                <CardTitle>{Title}</CardTitle>
            </CardHeader>
            <CardContent>

            </CardContent>
        </Card>
    )
}