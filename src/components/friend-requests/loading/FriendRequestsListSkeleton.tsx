import { Skeleton } from "@/components/ui/skeleton";
import { UserPlus } from "lucide-react";
import FriendRequestCardSkeleton from "./FriendRequestCardSkeleton";

interface FriendRequestsListSkeletonProps {
  count?: number;
}

const FriendRequestsListSkeleton = ({
  count = 3,
}: FriendRequestsListSkeletonProps) => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <header className="mb-6 flex items-center gap-2">
        <UserPlus className="text-primary h-5 w-5" aria-hidden="true" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
      </header>

      {/* Friend request cards skeleton */}
      <div
        role="status"
        aria-label="Loading friend requests"
        className="space-y-4"
      >
        {Array.from({ length: count }).map((_, index) => (
          <FriendRequestCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
export default FriendRequestsListSkeleton;
