import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

const ProductDetailsLoading = () => {
  return (
    <div className="absolute inset-0 z-30 m-3 mx-auto grid h-full max-w-[85vw] grid-cols-1 gap-3 sm:grid-cols-2">
      <Skeleton className="h-[25rem]" />
      <div className="h-[25rem] p-3">
        <Skeleton className="mb-2 h-8 w-full" />
        <Skeleton className="mb-4 h-32 w-full" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetailsLoading);
