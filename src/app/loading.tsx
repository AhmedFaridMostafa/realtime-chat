import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, UserPlus } from "lucide-react";

export default function Loading() {
  return (
    <div className="from-background via-muted/20 to-background flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-muted/50 bg-muted/10 border-2 border-dashed">
          <CardContent className="p-12 text-center">
            {/* Loading Animation */}
            <div className="relative mb-8">
              <div className="from-primary/20 to-primary/5 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br">
                <MessageCircle className="text-primary h-10 w-10 animate-pulse" />
              </div>
              <div className="bg-primary absolute -top-2 -right-2 h-6 w-6 animate-bounce rounded-full" />
              <div
                className="bg-primary/60 absolute -bottom-2 -left-2 h-4 w-4 animate-bounce rounded-full"
                style={{ animationDelay: "0.2s" }}
              />
            </div>

            {/* Loading Message */}
            <div className="mb-8 space-y-4">
              <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                Loading FriendZone
              </h1>
              <p className="text-muted-foreground text-lg">
                Setting up your chat experience...
              </p>
            </div>

            {/* Loading Dots */}
            <div className="mb-8 flex justify-center space-x-2">
              <div className="bg-primary h-3 w-3 animate-bounce rounded-full" />
              <div
                className="bg-primary h-3 w-3 animate-bounce rounded-full"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="bg-primary h-3 w-3 animate-bounce rounded-full"
                style={{ animationDelay: "0.2s" }}
              />
            </div>

            {/* Feature Icons */}
            <div className="text-muted-foreground flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">Chat</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">Friends</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span className="text-sm">Connect</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
