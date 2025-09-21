"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface UseFriendsRealtimeOptions {
  sessionId: string;
  initialFriends: User[];
}

export const useFriendsRealtime = ({
  sessionId,
  initialFriends,
}: UseFriendsRealtimeOptions) => {
  const [friends, setFriends] = useState<User[]>(initialFriends);

  // Memoized channel name
  const friendsChannel = useMemo(
    () => toPusherKey(`user:${sessionId}:friends`),
    [sessionId],
  );

  // Handler for new friend events
  const newFriendHandler = useCallback((newFriend: User) => {
    setFriends((prev) => [...prev, newFriend]);
  }, []);

  // Subscribe to friends channel
  useEffect(() => {
    pusherClient.subscribe(friendsChannel);
    pusherClient.bind("new_friend", newFriendHandler);
    return () => {
      pusherClient.unsubscribe(friendsChannel);
      pusherClient.unbind("new_friend", newFriendHandler);
    };
  }, [friendsChannel, newFriendHandler]);

  // Memoized sorted friends
  const sortedFriends = useMemo(
    () => friends.sort((a, b) => a.name.localeCompare(b.name)),
    [friends],
  );

  return {
    friends,
    sortedFriends,
  };
};
