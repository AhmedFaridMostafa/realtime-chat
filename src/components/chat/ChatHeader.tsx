import { MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import AvatarImageWithFallback from "../AvatarImageWithFallback";

const ChatHeader = ({ chatPartner }: { chatPartner: User }) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <AvatarImageWithFallback
              src={chatPartner.image}
              alt={chatPartner.name}
              name={chatPartner.name}
              size="lg"
            />
            <div className="border-background absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-green-500">
              <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-3">
              <h1 className="text-foreground text-xl font-semibold">
                {chatPartner.name}
              </h1>
              <Badge
                variant="secondary"
                className="border-green-200 bg-green-100 px-2 py-1 text-xs text-green-700"
              >
                <div className="mr-1.5 h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Online
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">{chatPartner.email}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-muted/50 h-10 w-10 p-0 transition-colors"
            disabled
            title="Voice call (coming soon)"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-muted/50 h-10 w-10 p-0 transition-colors"
            disabled
            title="Video call (coming soon)"
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-muted/50 h-10 w-10 p-0 transition-colors"
            title="More options"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
