"use client";
import { LayoutDashboard, UserPlus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Navigation items configuration
const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Add Friend",
    url: "/dashboard/add",
    icon: UserPlus,
  },
];

const NavItems = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <SidebarGroup key="Overview">
      <SidebarGroupLabel className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
        Overview
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url !== "/dashboard" && pathname.includes(item.url));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4 shrink-0" />
                    <span className="truncate font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
          {children}
        </SidebarMenu>
      </SidebarGroupContent>
      <Separator className="mx-auto my-4" />
    </SidebarGroup>
  );
};

export default NavItems;
