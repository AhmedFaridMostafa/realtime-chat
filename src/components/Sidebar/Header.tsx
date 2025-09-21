"use client";
import { Logo } from "../Logo";
import { SidebarHeader, useSidebar } from "../ui/sidebar";
import { SearchForm } from "./SearchForm";

const Header = () => {
  const { open, isMobile } = useSidebar();
  return (
    <SidebarHeader className="from-background to-muted/20 border-b bg-gradient-to-r">
      <div className="space-y-4">
        <Logo href="/dashboard" showText={open || isMobile} />
        {open || isMobile ? <SearchForm /> : null}
      </div>
    </SidebarHeader>
  );
};

export default Header;
