import FriendRequestsList from "@/components/friend-requests/FriendRequestsList";
import FriendRequestsListSkeleton from "@/components/friend-requests/loading/FriendRequestsListSkeleton";
import { getIncomingFriendRequestsBatch } from "@/helpers/getIncomingFriend";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCheck, ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FriendRequestPage = async () => {
  const session = await auth();
  if (!session?.user) return redirect("/login");

  const incomingFriendRequests = getIncomingFriendRequestsBatch(
    session.user.id,
  ) as Promise<FriendRequest[]>;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="bg-primary/10 rounded-xl p-3">
            <UserCheck className="text-primary h-8 w-8" />
          </div>
          <div>
            <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight">
              Friend Requests
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Manage incoming friend requests from other users
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Requests List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="text-primary h-5 w-5" />
                Incoming Requests
              </CardTitle>
              <CardDescription>
                Review and respond to friend requests from other users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<FriendRequestsListSkeleton />}>
                <FriendRequestsList
                  incomingFriendRequests={incomingFriendRequests}
                  sessionId={session.user.id}
                />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <Card className="from-muted/30 to-muted/10 bg-gradient-to-br">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCheck className="text-primary h-5 w-5" />
                About Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-semibold text-white">
                    ✓
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Accept to start chatting
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-sm font-semibold text-white">
                    ✗
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Decline to remove request
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
                    ℹ
                  </div>
                  <p className="text-muted-foreground text-sm">
                    You can always add them later
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 dark:border-amber-800 dark:from-amber-950/20 dark:to-amber-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-white">
                  💡
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold">Quick Tip</h4>
                  <p className="text-muted-foreground text-xs">
                    Only accept requests from people you know and trust. You can
                    always send your own friend requests from the dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestPage;
