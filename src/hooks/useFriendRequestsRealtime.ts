"use client";

import { useEffect, useState, useCallback } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface UseFriendRequestsRealtimeOptions {
  sessionId: string;
  initialRequests: FriendRequest[];
}

export const useFriendRequestsRealtime = ({
  sessionId,
  initialRequests,
}: UseFriendRequestsRealtimeOptions) => {
  const [friendRequests, setFriendRequests] =
    useState<FriendRequest[]>(initialRequests);

  const addFriendRequest = useCallback((newRequest: FriendRequest) => {
    setFriendRequests((prev) => {
      const exists = prev.some((req) => req.senderId === newRequest.senderId);
      return exists ? prev : [...prev, newRequest];
    });
  }, []);

  const removeFriendRequest = useCallback((senderId: string) => {
    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId),
    );
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const channelKey = toPusherKey(
      `user:${sessionId}:incoming_friend_requests`,
    );

    pusherClient.subscribe(channelKey);
    pusherClient.bind("incoming_friend_requests", addFriendRequest);

    return () => {
      pusherClient.unsubscribe(channelKey);
      pusherClient.unbind("incoming_friend_requests", addFriendRequest);
    };
  }, [sessionId, addFriendRequest]);

  return {
    friendRequests,
    removeFriendRequest,
  };
};
