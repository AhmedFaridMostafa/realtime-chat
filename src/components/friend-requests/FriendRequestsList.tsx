"use client";

import React from "react";
import { use } from "react";
import { useFriendRequest, useFriendRequestsRealtime } from "@/hooks";
import { EmptyFriendRequests } from "./EmptyFriendRequests";
import { FriendRequestCard } from "./FriendRequestCard";

interface FriendRequestsProps {
  incomingFriendRequests: Promise<FriendRequest[]>;
  sessionId: string;
}

const FriendRequestsList: React.FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const initialRequests = use(incomingFriendRequests);

  const { friendRequests, removeFriendRequest } = useFriendRequestsRealtime({
    sessionId,
    initialRequests,
  });

  const { handleFriendRequest, isLoading } =
    useFriendRequest(removeFriendRequest);

  if (friendRequests.length === 0) {
    return <EmptyFriendRequests />;
  }

  return (
    <div className="space-y-4">
      <div
        role="list"
        aria-label={`${friendRequests.length} friend requests`}
        className="space-y-3"
      >
        {friendRequests.map((request, index) => (
          <div
            key={request.senderId}
            role="listitem"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.5s ease-out forwards",
            }}
          >
            <FriendRequestCard
              request={request}
              isLoading={isLoading(request.senderId)}
              onAction={handleFriendRequest}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default FriendRequestsList;
