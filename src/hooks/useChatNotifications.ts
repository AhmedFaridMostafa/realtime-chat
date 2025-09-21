"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}

interface UseChatNotificationsOptions {
  sessionId: string;
  onNewMessage?: (message: ExtendedMessage) => void;
}

export const useChatNotifications = ({
  sessionId,
  onNewMessage,
}: UseChatNotificationsOptions) => {
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  // Memoized channel name
  const chatsChannel = useMemo(
    () => toPusherKey(`user:${sessionId}:chats`),
    [sessionId],
  );

  // Handler for new message events
  const chatHandler = useCallback(
    (message: ExtendedMessage) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

      if (!shouldNotify) return;

      // Call the optional callback for custom handling (like showing toast)
      onNewMessage?.(message);

      setUnseenMessages((prev) => [...prev, message]);
    },
    [pathname, sessionId, onNewMessage],
  );

  // Subscribe to chats channel
  useEffect(() => {
    pusherClient.subscribe(chatsChannel);
    pusherClient.bind("new_message", chatHandler);

    return () => {
      pusherClient.unsubscribe(chatsChannel);
      pusherClient.unbind("new_message", chatHandler);
    };
  }, [chatsChannel, chatHandler]);

  // Clear unseen messages when navigating to a chat
  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  // Helper function to get unseen message count for a specific friend
  const getUnseenMessagesCount = useCallback(
    (friendId: string) => {
      return unseenMessages.filter(
        (unseenMsg) => unseenMsg.senderId === friendId,
      ).length;
    },
    [unseenMessages],
  );

  return {
    unseenMessages,
    getUnseenMessagesCount,
  };
};
