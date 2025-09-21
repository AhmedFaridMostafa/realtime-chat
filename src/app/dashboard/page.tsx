import { auth } from "@/lib/auth";
import { chatHrefConstructor, cn, formatMessageTime } from "@/lib/utils";
import {
  ChevronRight,
  MessageCircle,
  Clock,
  Users,
  Plus,
  Sparkles,
  MessageSquare,
} from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getFriendsByUserId } from "@/helpers/getFriendsByUserId";
import getFriendsWithLastMessage from "@/helpers/getFriendsWithLastMessage";
import AvatarImageWithFallback from "@/components/AvatarImageWithFallback";

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user) notFound();
  const friends = await getFriendsByUserId(session.user.id);
  const friendsWithLastMessage = await getFriendsWithLastMessage(
    friends,
    session.user.id,
  );

  // Sort by last message timestamp (most recent first)
  const sortedFriends = friendsWithLastMessage.sort((a, b) => {
    if (!a.lastMessage && !b.lastMessage) return 0;
    if (!a.lastMessage) return 1;
    if (!b.lastMessage) return -1;
    return b.lastMessage.timestamp - a.lastMessage.timestamp;
  });

  const truncateMessage = (text: string, maxLength: number = 60) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-lg p-2">
                <MessageSquare className="text-primary h-6 w-6" />
              </div>
              <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight">
                Recent Chats
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Continue your conversations with friends
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-muted/50 px-3 py-1.5 text-sm"
            >
              <Users className="mr-1.5 h-4 w-4" />
              {friends.length} {friends.length === 1 ? "friend" : "friends"}
            </Badge>
            <Button asChild size="sm" className="gap-2">
              <Link href="/dashboard/add">
                <Plus className="h-4 w-4" />
                Add Friend
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="mt-6" />
      </div>

      {/* Content */}
      {sortedFriends.length === 0 ? (
        <Card className="border-muted/50 bg-muted/20 border-2 border-dashed py-16 text-center">
          <CardContent className="space-y-6">
            <div className="relative">
              <div className="from-primary/20 to-primary/5 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br">
                <MessageCircle className="text-primary h-10 w-10" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-6 w-6 animate-pulse text-yellow-500" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">No recent chats yet</h3>
              <p className="text-muted-foreground mx-auto max-w-md text-base leading-relaxed">
                Start building your network by adding friends and begin
                meaningful conversations.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/dashboard/add">
                  <Plus className="h-4 w-4" />
                  Add your first friend
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="gap-2">
                <Link href="/dashboard/requests">
                  <Users className="h-4 w-4" />
                  View requests
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {sortedFriends.map((friend, index) => {
            const chatHref = `/dashboard/chat/${chatHrefConstructor(session.user.id, friend.id)}`;
            const isFromCurrentUser =
              friend.lastMessage?.senderId === session.user.id;

            return (
              <Card
                key={friend.id}
                className="group hover:shadow-primary/5 hover:border-primary/20 hover:from-background hover:to-muted/30 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:shadow-lg"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                }}
              >
                <CardContent className="p-0">
                  <Link href={chatHref} className="block">
                    <div className="flex items-center p-6">
                      {/* Avatar */}
                      <div className="relative mr-4 flex-shrink-0">
                        <div className="border-background absolute -right-1 -bottom-1 z-10 h-4 w-4 rounded-full border-2 bg-green-500" />
                        <AvatarImageWithFallback
                          src={friend.image}
                          alt={friend.name}
                          name={friend.name}
                          size="lg"
                        />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-foreground truncate text-lg font-semibold">
                            {friend.name}
                          </h3>

                          {friend.lastMessage && (
                            <div className="text-muted-foreground bg-muted/50 ml-2 flex items-center rounded-full px-2 py-1 text-sm">
                              <Clock className="mr-1 h-3 w-3" />
                              {formatMessageTime(friend.lastMessage.timestamp)}
                            </div>
                          )}
                        </div>

                        {friend.lastMessage ? (
                          <div className="flex items-center space-x-2">
                            <p
                              className={cn(
                                "text-muted-foreground flex-1 truncate text-sm leading-relaxed",
                                isFromCurrentUser && "text-foreground/80",
                              )}
                            >
                              {isFromCurrentUser && (
                                <span className="text-primary mr-1 font-medium">
                                  You:
                                </span>
                              )}
                              {truncateMessage(friend.lastMessage.text, 80)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground bg-muted/30 inline-block rounded-full px-3 py-1 text-sm italic">
                            No messages yet
                          </p>
                        )}
                      </div>

                      {/* Chevron */}
                      <ChevronRight className="text-muted-foreground group-hover:text-primary ml-4 h-5 w-5 flex-shrink-0 transition-all duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Quick Actions */}
      {sortedFriends.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="outline" asChild size="lg" className="gap-2">
              <Link href="/dashboard/add">
                <Plus className="h-4 w-4" />
                Add more friends
              </Link>
            </Button>
            <Button variant="ghost" asChild size="lg" className="gap-2">
              <Link href="/dashboard/requests">
                <Users className="h-4 w-4" />
                View friend requests
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
