import { MessageSquare } from "lucide-react";

const MessagesEmpty = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="space-y-4 text-center">
        <div className="bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <MessageSquare className="text-muted-foreground h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Start your conversation</h3>
          <p className="text-muted-foreground max-w-sm text-sm">
            Send a message to {name} to begin your chat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessagesEmpty;
