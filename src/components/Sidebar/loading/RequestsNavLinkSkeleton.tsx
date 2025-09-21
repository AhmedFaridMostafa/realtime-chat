import { SidebarMenuButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell } from "lucide-react";

export const RequestsNavLinkSkeleton = () => {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuButton tooltip="Requests">
        <Bell className="h-4 w-4 shrink-0 opacity-50" />
        <span className="truncate">Requests</span>
      </SidebarMenuButton>
      {/* Badge skeleton - positioned to match SidebarMenuBadge */}
      <div className="pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none group-data-[collapsible=icon]:hidden peer-data-[size=default]/menu-button:top-1.5">
        <Skeleton className="h-4 w-4 rounded-sm" />
      </div>
    </SidebarMenuSubItem>
  );
};
