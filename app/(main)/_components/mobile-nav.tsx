import { Logo } from "@/app/(marketing)/_components/logo";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { ChevronsLeft, FolderClock, Home, PenLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const MobileNav = () => {
  const pathname = usePathname();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <div className="flex  items-center justify-center p-6">
              <Logo />
            </div>
          </SheetHeader>
          <div className="flex flex-col w-full items-center gap-y-5 py-3 ">
            <Link
              href="/dashboard"
              passHref
              className={cn(
                "flex rounded-lg border items-center gap-2 w-50 px-5 py-2",
                pathname.startsWith("/dashboard") &&
                  "bg-[#f9f9f9] dark:bg-zinc-900"
              )}
            >
              <Home className="h-5 w-5" />
              <span
                className={cn(
                  "text-lg lg:text-xl text-slate-800 dark:text-white"
                )}
              >
                Home
              </span>
            </Link>
            <Link
              href="/createpost"
              passHref
              className={cn(
                "flex rounded-lg border items-center gap-2 w-50  px-5 py-2",
                pathname.startsWith("/createpost") &&
                  "bg-[#f9f9f9] dark:bg-zinc-900"
              )}
            >
              <PenLine className="h-5 w-5" />
              <span
                className={cn(
                  "text-lg md:text-xl text-slate-800 dark:text-white"
                )}
              >
                CreatePost
              </span>
            </Link>
            <Link
              href="/history"
              passHref
              className={cn(
                "flex rounded-lg border text-xl items-center gap-2 w-50 text-slate-800 px-5 py-2",
                pathname.startsWith("/history") &&
                  "bg-[#f9f9f9] dark:bg-zinc-900"
              )}
            >
              <FolderClock className="h-5 w-5 dark:text-white" />
              <span
                className={cn(
                  "text-lg md:text-xl text-slate-800 dark:text-white"
                )}
              >
                History
              </span>
            </Link>
          </div>
          <div className="md:p-10"></div>
        </SheetContent>
      </Sheet>
    </>
  );
};
