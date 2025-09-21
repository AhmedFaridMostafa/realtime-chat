"use client";

import { useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput = ({ chatPartner, chatId }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  // Send message function
  const sendMessage = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setIsLoading(true);

    // Optimistically clear input
    const messageToSend = trimmedInput;
    setInput("");

    try {
      const response = await fetch("/api/message/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input, chatId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Focus back to textarea
      textareaRef.current?.focus();
    } catch (error) {
      console.error("Failed to send message:", error);
      // Restore message on error
      setInput(messageToSend);
      toast.error("Failed to send message", {
        description: "Please check your connection and try again.",
        action: {
          label: "Retry",
          onClick: () => sendMessage(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, chatId, isLoading]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  const isInputEmpty = !input.trim();
  const maxLength = 1000;
  const remainingChars = maxLength - input.length;

  return (
    <div className="px-6 py-4" role="complementary" aria-label="Message input">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label htmlFor="message-input" className="sr-only">
            Type your message to {chatPartner.name}
          </label>
          <div className="relative">
            <Textarea
              id="message-input"
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${chatPartner.name}...`}
              className="focus:border-primary/50 max-h-[200px] min-h-[60px] resize-none border-2 pr-12 transition-colors"
              disabled={isLoading}
              maxLength={maxLength}
              aria-describedby="char-count"
            />
            <div className="absolute right-2 bottom-2">
              <Button
                onClick={sendMessage}
                disabled={isInputEmpty || isLoading}
                size="sm"
                className="h-8 w-8 rounded-full p-0"
                aria-label={
                  isLoading
                    ? "Sending message..."
                    : `Send message to ${chatPartner.name}`
                }
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span
              id="char-count"
              className="text-muted-foreground text-xs"
              aria-live="polite"
            >
              {remainingChars} characters remaining
            </span>
            <span className="text-muted-foreground text-xs">
              Press Enter to send, Shift+Enter for new line
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
