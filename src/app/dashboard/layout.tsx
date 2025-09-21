import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
// Done after the video and optional: add page metadata
export const metadata = {
  title: "FriendZone | Dashboard",
  description: "Your dashboard",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (!session?.user) return redirect("/login");
  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
      <main className="from-background to-muted/20 flex min-h-screen flex-1 flex-col bg-gradient-to-br">
        <div className="bg-background/80 sticky top-0 z-10 border-b backdrop-blur-sm">
          <div className="flex items-center justify-between p-4">
            <SidebarTrigger className="hover:bg-muted/50 transition-colors" />
            <div className="text-muted-foreground flex items-center space-x-2 text-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
