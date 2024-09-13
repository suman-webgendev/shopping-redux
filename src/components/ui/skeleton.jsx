import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-300/50", className)}
      {...props}
    />
  );
}

export { Skeleton };
