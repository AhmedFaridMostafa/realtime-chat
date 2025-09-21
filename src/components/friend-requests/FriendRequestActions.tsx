import { memo } from "react";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FriendRequestActionsProps {
  senderId: string;
  isLoading: FriendRequestAction | null;
  onAction: (
    senderId: string,
    action: FriendRequestAction,
  ) => Promise<void> | void;
  disabled?: boolean;
}

export const FriendRequestActions = memo<FriendRequestActionsProps>(
  ({ senderId, isLoading, onAction, disabled = false }) => {
    const isProcessing = Boolean(isLoading);

    return (
      <div
        className="flex items-center gap-3"
        role="group"
        aria-label="Friend request actions"
      >
        <Button
          size="sm"
          variant="default"
          disabled={disabled || isProcessing}
          onClick={() => onAction(senderId, "accept")}
          className="group h-10 bg-green-600 px-4 transition-all duration-200 hover:bg-green-700 focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          aria-label="Accept friend request"
          type="button"
        >
          {isLoading === "accept" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" aria-hidden="true" />
              Accept
            </>
          )}
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={disabled || isProcessing}
          onClick={() => onAction(senderId, "deny")}
          className="group h-10 border-red-200 px-4 text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          aria-label="Deny friend request"
          type="button"
        >
          {isLoading === "deny" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              <X className="mr-2 h-4 w-4" aria-hidden="true" />
              Decline
            </>
          )}
        </Button>
      </div>
    );
  },
);

FriendRequestActions.displayName = "FriendRequestActions";
