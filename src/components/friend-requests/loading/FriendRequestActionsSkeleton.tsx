import { Skeleton } from "@/components/ui/skeleton";

const FriendRequestActionsSkeleton = () => {
  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Loading friend request actions"
    >
      {/* Accept button skeleton */}
      <Skeleton className="h-8 w-8 rounded-md" />

      {/* Deny button skeleton */}
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  );
};
export default FriendRequestActionsSkeleton;
