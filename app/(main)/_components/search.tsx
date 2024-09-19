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
      className={cn("flex border border-gray-700 items-center w-[20%] max-w-[240px] p-2 rounded", isMobile && "border-none")}
    > {isMobile ? ( 

      <SearchIcon className="w-6 h-6" />
     ) : (
      <>
      <div className="flex gap-1">
        <SearchIcon className="w-4 h-4" />
        <span className="text-xs">Search</span>
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
