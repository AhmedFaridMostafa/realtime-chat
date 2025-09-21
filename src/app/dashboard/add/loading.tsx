import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex w-full flex-col gap-3">
      <Skeleton className="mb-4 h-16 w-1/4" />
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
};

export default loading;
