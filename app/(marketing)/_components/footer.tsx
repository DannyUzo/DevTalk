import { Terms } from "./Terms";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="flex items-center dark:bg-[#1F1F1F] bottom-0  w-full p-6 bg-background z-50">
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Terms />
      </div>
    </div>
  );
};
