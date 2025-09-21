import Header from "./Header";
import Footer from "./Footer";
import { Sidebar, SidebarContent } from "../ui/sidebar";
import getFriendRequestsId from "@/helpers/getFriendRequestsId";
import { getFriendsByUserId } from "@/helpers/getFriendsByUserId";
import { Suspense } from "react";
import { RequestsNavLinkSkeleton } from "./loading/RequestsNavLinkSkeleton";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { FriendsList, NavItems, RequestsNavLink } from "./Nav";
import { SearchProvider } from "@/contexts/SearchContext";

interface AppSidebarProps {
  user: User;
}

export function AppSidebar({ user }: AppSidebarProps) {
  const friendRequestsPromise = getFriendRequestsId(user.id);
  const friendsPromise = getFriendsByUserId(user.id);
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SearchProvider>
        <Header />
        <SidebarContent>
          <NavItems>
            <Suspense fallback={<RequestsNavLinkSkeleton />}>
              <RequestsNavLink
                friendRequestsPromise={friendRequestsPromise}
                userId={user.id}
              />
            </Suspense>
          </NavItems>
          <Suspense fallback={<LoadingSpinner size="md" />}>
            <FriendsList user={user} friendsPromise={friendsPromise} />
          </Suspense>
        </SidebarContent>
        <Footer user={user} />
      </SearchProvider>
    </Sidebar>
  );
}
