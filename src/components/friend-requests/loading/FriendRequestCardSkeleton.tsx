import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import FriendRequestActionsSkeleton from "./FriendRequestActionsSkeleton";

const FriendRequestCardSkeleton = () => {
  return (
    <Card className="hover:bg-muted/50 transition-colors duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            {/* Avatar skeleton */}
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              {/* Name skeleton */}
              <Skeleton className="h-4 w-32" />
              {/* Email skeleton */}
              <Skeleton className="h-3 w-40" />
            </div>
          </div>

          {/* Action buttons skeleton */}
          <FriendRequestActionsSkeleton />
        </div>
      </CardContent>
    </Card>
  );
};
export default FriendRequestCardSkeleton;
