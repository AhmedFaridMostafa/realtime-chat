import { UserPlus } from "lucide-react";

export const EmptyFriendRequests = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 text-center"
      role="status"
      aria-live="polite"
      aria-label="No friend requests available"
    >
      <UserPlus
        className="text-muted-foreground mb-4 h-12 w-12"
        aria-hidden="true"
      />
      <h3 className="mb-2 text-lg font-semibold" id="empty-state-title">
        No friend requests
      </h3>
      <p
        className="text-muted-foreground max-w-sm text-sm"
        aria-describedby="empty-state-title"
      >
        When someone sends you a friend request, it will appear here.
      </p>
    </div>
  );
};
