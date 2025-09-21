import React from "react";
import { SidebarFooter } from "../ui/sidebar";

import AvatarImageWithFallback from "../AvatarImageWithFallback";
import SignOutButton from "../auth/SignOutButton";

const Footer = ({ user }: { user: User }) => {
  return (
    <SidebarFooter className="from-muted/20 to-background border-t bg-gradient-to-r">
      <div className="flex items-center gap-3 p-2">
        <div className="relative">
          <AvatarImageWithFallback
            src={user.image}
            alt={user.name}
            name={user.name}
            size="md"
          />
          <div className="border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 bg-green-500"></div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="text-muted-foreground truncate text-xs">{user.email}</p>
        </div>
        <SignOutButton className="hover:bg-muted/50 h-8 w-8 transition-colors" />
      </div>
    </SidebarFooter>
  );
};

export default Footer;
