import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => (
  <div className="w-[85%] sm:w-[55%] md:max-w-3xl lg:max-w-4xl h-60 flex flex-col justify-between rounded-md p-3 bg-[#f6f6f6] dark:bg-muted/70">
    <div className="w-full flex justify-between">
      <div className="flex items-center gap-x-2">
        <Skeleton className="w-12 h-12 rounded-full bg-[#ebeaea] dark:bg-muted/75" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-[50%] sm:w-[200px] h-4 rounded bg-[#ebeaea] dark:bg-muted/75" />
          <Skeleton className="w-20 h-3 rounded bg-[#ebeaea] dark:bg-muted/75" />
        </div>
      </div>
      <Skeleton className="w-4 h-6 rounded bg-[#ebeaea] dark:bg-muted/75"/>
    </div>
    <Skeleton className="w-full h-6 rounded bg-[#ebeaea] dark:bg-muted/75"/>
    <Skeleton className="w-full h-28 rounded bg-[#ebeaea] dark:bg-muted/75"/>
  </div>
);
