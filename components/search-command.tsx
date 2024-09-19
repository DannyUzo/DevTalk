"use client";

import { useState ,useEffect } from "react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from "./ui/command"
import { useSearch } from "@/Hooks/use-search";

export const SearchCommand = () => {
    const router = useRouter()
    const [ isMounted, setIsMounted ] = useState(false);

    const toggle = useSearch((store) => store.toggle)
    const isOpen = useSearch((store) => store.isOpen)
    const onClose = useSearch((store) => store.onClose)

    useEffect(() => {
        setIsMounted(true)
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [toggle])

    // const onSelect = (id: string) => {
    //     router.push(`/documents/${id}`);
    //     onClose();
    // }
    if(!isMounted){
        return null
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput placeholder={`Search Jotion...`} />
            <CommandList>
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup heading="Documents">
                    
                        <CommandItem >
                        Search
                        </CommandItem>
                    
                </CommandGroup>
            </CommandList>
        </CommandDialog>
)
};