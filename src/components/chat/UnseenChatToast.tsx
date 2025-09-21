"use client";
import { chatHrefConstructor } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import AvatarImageWithFallback from "../AvatarImageWithFallback";

interface UnseenChatToastProps {
  t: string | number; // Sonner toast ID
  sessionId: string;
  senderId: string;
  senderImg: string;
  senderName: string;
  senderMessage: string;
}

const UnseenChatToast = ({
  t,
  senderId,
  sessionId,
  senderImg,
  senderName,
  senderMessage,
}: UnseenChatToastProps) => {
  const router = useRouter();

  const handleChatClick = () => {
    toast.dismiss(t);
    router.push(`/dashboard/chat/${chatHrefConstructor(sessionId, senderId)}`);
  };

  const handleDismiss = () => {
    toast.dismiss(t);
  };

  const truncateMessage = (message: string, maxLength: number = 60) => {
    return message.length > maxLength
      ? `${message.substring(0, maxLength)}...`
      : message;
  };

  return (
    <Card className="pointer-events-auto w-full max-w-md border shadow-lg">
      <CardContent className="p-0">
        <div className="flex">
          {/* Clickable chat area */}
          <Button
            variant="ghost"
            size="lg"
            onClick={handleChatClick}
            className="flex-1 rounded-l-lg p-4 text-left"
          >
            <div className="flex items-start space-x-3">
              <div className="relative flex-shrink-0">
                <AvatarImageWithFallback
                  src={senderImg}
                  alt={senderName}
                  name={senderName}
                  className="rounded-full object-cover"
                />
                {/* Message indicator */}
                <div className="bg-primary border-background absolute -right-0.5 -bottom-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2">
                  <MessageCircle className="h-1.5 w-1.5 text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1">
                  <p className="text-foreground truncate text-sm font-semibold">
                    {senderName}
                  </p>
                  <span className="text-muted-foreground text-xs">
                    sent a message
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-sm leading-tight">
                  {truncateMessage(senderMessage)}
                </p>
              </div>
            </div>
          </Button>

          {/* Close button */}
          <div className="flex items-center border-l">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="hover:bg-muted/50 h-full rounded-none rounded-r-lg px-3"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnseenChatToast;
