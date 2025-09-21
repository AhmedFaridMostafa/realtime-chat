import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface MessageSkeletonProps {
  isCurrentUser?: boolean;
  showTimestamp?: boolean;
}

const MessageSkeleton = ({
  isCurrentUser = false,
  showTimestamp = true,
}: MessageSkeletonProps) => {
  return (
    <div
      className={cn("group flex items-end gap-2", {
        "justify-end": isCurrentUser,
        "justify-start": !isCurrentUser,
      })}
    >
      {/* Message bubble skeleton */}
      <div
        className={cn("flex max-w-xs flex-col space-y-1 md:max-w-md", {
          "order-1 items-end": isCurrentUser,
          "order-2 items-start": !isCurrentUser,
        })}
      >
        <div
          className={cn("relative rounded-2xl px-4 py-2", {
            "bg-primary/10": isCurrentUser,
            "bg-muted/50": !isCurrentUser,
            "rounded-br-md": isCurrentUser,
            "rounded-bl-md": !isCurrentUser,
          })}
        >
          {/* Message text skeleton */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Timestamp skeleton */}
          {showTimestamp && (
            <div
              className={cn(
                "mt-2 flex items-center gap-1",
                isCurrentUser ? "justify-end" : "justify-start",
              )}
            >
              <Skeleton className="h-3 w-10" />
              {isCurrentUser && <Skeleton className="h-3 w-3" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
