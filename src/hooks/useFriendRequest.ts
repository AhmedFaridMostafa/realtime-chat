"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseFriendRequestReturn {
  handleFriendRequest: (
    senderId: string,
    action: FriendRequestAction,
  ) => Promise<void>;
  isLoading: (senderId: string) => FriendRequestAction | null;
}

export const useFriendRequest = (
  onRequestProcessed?: (senderId: string) => void,
): UseFriendRequestReturn => {
  const [loadingStates, setLoadingStates] =
    useState<FriendRequestLoadingStates>({});
  const router = useRouter();

  const handleFriendRequest = useCallback(
    async (senderId: string, action: FriendRequestAction): Promise<void> => {
      if (!senderId || loadingStates[senderId]) return;

      setLoadingStates((prev) => ({ ...prev, [senderId]: action }));

      try {
        const response = await fetch(`/api/friends/${action}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: senderId }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`,
          );
        }

        // Optimistic update - remove from local state immediately
        onRequestProcessed?.(senderId);

        const messages = {
          accept: {
            title: "Friend request accepted!",
            description: "You are now friends and can start chatting.",
          },
          deny: {
            title: "Friend request denied",
            description: "The friend request has been declined.",
          },
        };

        toast.success(messages[action].title, {
          description: messages[action].description,
        });
      } catch (error) {
        console.error(`Error ${action}ing friend request:`, error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to ${action} friend request. Please try again.`;

        toast.error("Something went wrong", {
          description: errorMessage,
        });
      } finally {
        setLoadingStates((prev) => ({ ...prev, [senderId]: null }));
        router.refresh();
      }
    },
    [loadingStates, onRequestProcessed, router],
  );

  const isLoading = useCallback(
    (senderId: string) => loadingStates[senderId] || null,
    [loadingStates],
  );

  return { handleFriendRequest, isLoading };
};
