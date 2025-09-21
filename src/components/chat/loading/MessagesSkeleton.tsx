import { Skeleton } from "@/components/ui/skeleton";
import DayMessagesSkeleton from "./DayMessagesSkeleton";

interface MessagesSkeletonProps {
  dayCount?: number;
  messagesPerDay?: number;
}

const MessagesSkeleton = ({
  dayCount = 2,
  messagesPerDay = 3,
}: MessagesSkeletonProps) => {
  return (
    <div className="h-full flex-1">
      <div
        className="flex flex-col gap-1 px-4 py-4"
        role="status"
        aria-label="Loading messages"
      >
        {Array.from({ length: dayCount }).map((_, dayIndex) => (
          <div key={dayIndex} className="space-y-4">
            {/* Date separator skeleton */}
            <div className="flex items-center justify-center py-4">
              <div className="bg-secondary/50 flex items-center gap-1 rounded-md px-2 py-1">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            {/* Day messages skeleton */}
            <DayMessagesSkeleton messageCount={messagesPerDay} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagesSkeleton;
