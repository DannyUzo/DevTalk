import { SearchIcon } from "lucide-react";
import { useSearch } from "@/Hooks/use-search";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

const Search = () => {
  const search = useSearch();
  const isMobile = useMediaQuery("(max-width: 868px)")
  return (
    <div
      role="button"
      onClick={search.onOpen}
      className={cn("flex bg-[#bababa] dark:bg-[#121212] items-center w-60  p-2 rounded", isMobile && "w-1/2 h-8 rounded-md ml-2")}
    > {isMobile ? ( 
<p className="font-sans text-muted-foreground text-xs">Search...</p>
     ) : (
      <>
      <div className="flex gap-1 items-center">
        <SearchIcon className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Search</span>
      </div>
      <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center select-none gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ">
        <span className="text-xs">Ctrl</span>k
      </kbd>
      </>
     )}
    </div>
  );
};

export default Search;
