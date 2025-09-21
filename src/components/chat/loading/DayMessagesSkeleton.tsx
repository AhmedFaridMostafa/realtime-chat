import MessageSkeleton from "./MessageSkeleton";

interface DayMessagesSkeletonProps {
  messageCount?: number;
}

const DayMessagesSkeleton = ({
  messageCount = 3,
}: DayMessagesSkeletonProps) => {
  return (
    <div className="flex flex-col-reverse gap-1">
      {Array.from({ length: messageCount }).map((_, index) => (
        <MessageSkeleton
          key={index}
          isCurrentUser={index % 2 === 0}
          showTimestamp={index === 0}
        />
      ))}
    </div>
  );
};

export default DayMessagesSkeleton;
