"use client";

import { use } from "react";
import { usePathname } from "next/navigation";
import { useFriendRequestsRealtime } from "@/hooks";

import { Bell } from "lucide-react";
import Link from "next/link";

import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface FriendRequestSidebarOptionsProps {
  userId: string;
  friendRequestsPromise: Promise<string[]>;
}

const RequestsNavLink = ({
  userId,
  friendRequestsPromise,
}: FriendRequestSidebarOptionsProps) => {
  const resolvedFriendRequests = use(friendRequestsPromise);
  const pathname = usePathname();

  const initialRequests = resolvedFriendRequests.map((id) => ({
    senderId: id,
  }));
  const { friendRequests: realtimeFriendRequests } = useFriendRequestsRealtime({
    sessionId: userId,
    initialRequests,
  });

  const isActive = pathname.includes("/dashboard/requests");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip="Friend Requests"
        className="hover:bg-muted/50 transition-colors"
      >
        <Link href="/dashboard/requests" className="flex items-center gap-3">
          <Bell className="h-4 w-4 shrink-0" />
          <span className="truncate font-medium">Requests</span>
        </Link>
      </SidebarMenuButton>
      {realtimeFriendRequests.length > 0 && (
        <SidebarMenuBadge className="animate-pulse bg-orange-500 text-xs font-bold text-white">
          {realtimeFriendRequests.length}
        </SidebarMenuBadge>
      )}
    </SidebarMenuItem>
  );
};

export default RequestsNavLink;
