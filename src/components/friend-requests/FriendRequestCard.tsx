import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FriendRequestActions } from "./FriendRequestActions";
import AvatarImageWithFallback from "../AvatarImageWithFallback";

interface FriendRequestCardProps {
  request: FriendRequest;
  isLoading: FriendRequestAction | null;
  onAction: (senderId: string, action: FriendRequestAction) => Promise<void>;
}

export const FriendRequestCard = memo<FriendRequestCardProps>(
  ({ request, isLoading, onAction }) => {
    const displayName =
      request.senderName || request.senderEmail!.split("@")[0];

    return (
      <Card
        className="group hover:shadow-primary/5 hover:border-primary/20 focus-within:ring-primary/20 transition-all duration-300 focus-within:ring-2 hover:shadow-md"
        role="article"
        aria-labelledby={`friend-request-${request.senderId}`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="relative">
                <AvatarImageWithFallback
                  src={request.senderImage || ""}
                  alt={displayName}
                  name={displayName}
                  size="lg"
                  className="shrink-0"
                />
                <div className="border-background absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-blue-500">
                  <span className="text-xs font-bold text-white">+</span>
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col space-y-1">
                <p
                  id={`friend-request-${request.senderId}`}
                  className="truncate text-base font-semibold"
                >
                  {displayName}
                </p>
                <p className="text-muted-foreground truncate text-sm">
                  {request.senderEmail}
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-muted/50 rounded-full px-2 py-1 text-xs">
                    Wants to be friends
                  </span>
                </div>
              </div>
            </div>

            <FriendRequestActions
              senderId={request.senderId}
              isLoading={isLoading}
              onAction={onAction}
            />
          </div>
        </CardContent>
      </Card>
    );
  },
);

FriendRequestCard.displayName = "FriendRequestCard";
