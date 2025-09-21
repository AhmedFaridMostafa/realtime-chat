"use client";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AvatarImageWithFallback from "@/components/AvatarImageWithFallback";
import { usePathname } from "next/navigation";
import { chatHrefConstructor } from "@/lib/utils";
import { use, useCallback, useMemo } from "react";
import { toast } from "sonner";
import UnseenChatToast from "@/components/chat/UnseenChatToast";
import { useFriendsRealtime } from "@/hooks/useFriendsRealtime";
import { useChatNotifications } from "@/hooks/useChatNotifications";
import { useSearch } from "@/contexts/SearchContext";

interface FriendsListProps {
  user: User;
  friendsPromise: Promise<User[]>;
}

interface ExtendedMessage extends Message {
  senderImg: string;
  senderName: string;
}

const FriendsList = ({ user, friendsPromise }: FriendsListProps) => {
  const friends = use(friendsPromise);
  const pathname = usePathname();
  const { searchQuery } = useSearch();

  // Handle new message notifications with toast
  const handleNewMessage = useCallback(
    (message: ExtendedMessage) => {
      toast.custom((t) => (
        <UnseenChatToast
          t={t}
          sessionId={user.id}
          senderId={message.senderId}
          senderImg={message.senderImg}
          senderMessage={message.text}
          senderName={message.senderName}
        />
      ));
    },
    [user.id],
  );

  // Use separated hooks
  const { sortedFriends } = useFriendsRealtime({
    sessionId: user.id,
    initialFriends: friends,
  });

  const { getUnseenMessagesCount } = useChatNotifications({
    sessionId: user.id,
    onNewMessage: handleNewMessage,
  });

  // Filter friends based on search query
  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedFriends;
    }

    const query = searchQuery.toLowerCase().trim();
    return sortedFriends.filter((friend) => {
      const nameMatch = friend.name.toLowerCase().includes(query);
      const emailMatch = friend.email.toLowerCase().includes(query);
      return nameMatch || emailMatch;
    });
  }, [sortedFriends, searchQuery]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Your chats
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-2 pt-2">
          {filteredFriends.length > 0 ? (
            filteredFriends.map((friend) => {
              const unseenMessagesCount = getUnseenMessagesCount(friend.id);
              const chatHref = `/dashboard/chat/${chatHrefConstructor(user.id, friend.id)}`;
              const isActive = pathname === chatHref;
              return (
                <SidebarMenuItem key={friend.id}>
                  <SidebarMenuButton
                    className="hover:bg-muted/50 h-auto transition-colors group-data-[collapsible=icon]:!p-0"
                    asChild
                    isActive={isActive}
                    tooltip={friend.name}
                  >
                    <Link
                      href={chatHref}
                      aria-label={`Chat with ${friend.name}${unseenMessagesCount > 0 ? ` (${unseenMessagesCount} unread)` : ""}`}
                    >
                      <div className="flex w-full items-center gap-3">
                        <div className="relative">
                          <AvatarImageWithFallback
                            name={friend.name}
                            src={friend.image}
                            alt={`${friend.name}'s avatar`}
                            size="sm"
                          />
                          <div className="border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 bg-green-500"></div>
                        </div>
                        <div className="min-w-0 flex-1 truncate">
                          <p className="truncate text-sm font-semibold">
                            {friend.name}
                          </p>
                          <p className="text-muted-foreground truncate text-xs">
                            {friend.email}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                  {unseenMessagesCount > 0 && (
                    <SidebarMenuBadge className="bg-primary text-primary-foreground text-xs font-bold">
                      {unseenMessagesCount}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              );
            })
          ) : (
            <div className="px-3 py-6 text-center">
              {searchQuery.trim() ? (
                <>
                  <p className="text-muted-foreground text-sm">
                    No friends found
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Try searching with a different term
                  </p>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground text-sm">
                    No friends yet
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Add friends to start chatting
                  </p>
                </>
              )}
            </div>
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default FriendsList;
