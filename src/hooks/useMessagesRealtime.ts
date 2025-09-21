import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { useCallback, useEffect, useState } from "react";

const useMessagesRealtime = (chatId: string, currentMessage: Message[]) => {
  const [messages, setMessages] = useState<Message[]>(currentMessage);
  const messageHandler = useCallback(
    (message: Message) => {
      setMessages((prev) => {
        // Prevent duplicate messages
        if (prev.some((msg) => msg.id === message.id)) {
          return prev;
        }
        return [message, ...prev];
      });
    },
    [setMessages],
  );

  useEffect(() => {
    const channelKey = toPusherKey(`chat:${chatId}`);
    pusherClient.subscribe(channelKey);
    pusherClient.bind("incoming_message", messageHandler);
    return () => {
      pusherClient.unsubscribe(channelKey);
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [chatId, messageHandler]);
  return messages;
};

export { useMessagesRealtime };
