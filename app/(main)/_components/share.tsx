"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useOrigin } from "@/Hooks/use-origin";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Share2 ,Globe} from "lucide-react";

interface ShareProps {
    postId: string;
}

// TypeScript expects a string type for postId, but it's receiving
// a type that could potentially be undefined. 
// This is likely because the postId is coming from a source that might not always provide a value, like a prop.
export const Share: React.FC<ShareProps> = ({ postId }) => {
    const origin = useOrigin();
    const [copied, setCopied] = useState(false);


    const url = `${origin}/documents/${postId}`


    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }
    return (
       <Popover>
        <PopoverTrigger asChild>
            <Button size="tn" variant="ghost">
            <Share2 className="w-3 h-3" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>

                <div className="space-y-4">
                    <div className="flex items-center gap-x-2">
                        <Globe className="text-sky-500 animate-pulse w-4 h-4"/>
                        <p className="text-xs font-medium text-sky-500">This post is live on the web</p>
                    </div>
                    <div className="flex items-center">
                        <input className="flex-1 px-2 outline-0 border-none text-xs rounded-l-md h-8 bg-muted truncate" value={url}/>
                        <Button onClick={onCopy} disabled={copied} className="h-8 rounded-l-none">
                            {copied ? (
                                <Check className="h-4 w-4"/>
                            ) : (
                                <Copy className="h-4 w-4"/>
                            )}
                        </Button>
</div>
                </div>
           
        </PopoverContent>
       </Popover>
    )
}