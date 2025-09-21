"use client";

import { formatDateSeparator } from "@/lib/utils";
import { format } from "date-fns";
import { useMemo, use } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import DayMessages from "./DayMessages";
import MessagesEmpty from "./MessagesEmpty";
import { useMessagesRealtime } from "@/hooks";
import { Message } from "@/lib/validations/message";

interface MessagesProps {
  initialMessages: Promise<Message[]>;
  sessionId: string;
  chatPartner: User;
  chatId: string;
}

const Messages = ({
  initialMessages,
  sessionId,
  chatId,
  chatPartner,
}: MessagesProps) => {
  const currentMessage = use(initialMessages);
  const messages = useMessagesRealtime(chatId, currentMessage);

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { [key: string]: Message[] } = {};
    messages.forEach((message) => {
      const dateKey = format(new Date(message.timestamp), "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [messages]);

  // Empty state
  if (messages.length === 0) return <MessagesEmpty name={chatPartner.name} />;

  return (
    <div className="h-full w-full overflow-hidden">
      <ScrollArea className="h-full w-full">
        <div
          id="messages"
          className="flex flex-col gap-1 px-4 py-4"
          role="log"
          aria-label="Chat messages"
        >
          {/* Messages grouped by date */}
          {groupedMessages.map(([dateKey, dayMessages]) => (
            <div key={dateKey} className="space-y-4">
              <div className="flex items-center justify-center py-4">
                <Badge variant="secondary" className="text-xs">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDateSeparator(dayMessages[0].timestamp)}
                </Badge>
              </div>
              <DayMessages dayMessages={dayMessages} sessionId={sessionId} />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Messages;
