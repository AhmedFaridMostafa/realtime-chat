import { cn } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { format } from "date-fns";
import { CheckCheck } from "lucide-react";

interface DayMessagesProps {
  dayMessages: Message[];
  sessionId: string;
}

const DayMessages = ({ dayMessages, sessionId }: DayMessagesProps) => {
  return (
    <div className="flex flex-col-reverse gap-1">
      {dayMessages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;
        const hasNextMessageFromSameUser =
          dayMessages[index - 1]?.senderId === message.senderId;

        return (
          <div
            key={`${message.id}-${message.timestamp}`}
            className={cn("group flex items-end gap-2", {
              "justify-end": isCurrentUser,
              "justify-start": !isCurrentUser,
            })}
          >
            {/* Message bubble */}
            <div
              className={cn("flex max-w-xs flex-col space-y-1 md:max-w-md", {
                "order-1 items-end": isCurrentUser,
                "order-2 items-start": !isCurrentUser,
              })}
            >
              <div
                className={cn("relative rounded-2xl px-4 py-2 break-words", {
                  "bg-primary text-primary-foreground": isCurrentUser,
                  "bg-muted text-foreground": !isCurrentUser,
                  "rounded-br-md": !hasNextMessageFromSameUser && isCurrentUser,
                  "rounded-bl-md":
                    !hasNextMessageFromSameUser && !isCurrentUser,
                })}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>

                {/* Timestamp and status */}
                <div
                  className={cn(
                    "mt-1 flex items-center gap-1",
                    isCurrentUser ? "justify-end" : "justify-start",
                  )}
                >
                  <span
                    className={cn(
                      "text-xs opacity-70",
                      isCurrentUser
                        ? "text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {format(message.timestamp, "h:mm aa")}
                  </span>

                  {/* Read receipt indicators (for current user messages) */}
                  {isCurrentUser && (
                    <div className="flex items-center">
                      <CheckCheck
                        className={cn(
                          "h-3 w-3 opacity-70",
                          "text-primary-foreground",
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayMessages;
