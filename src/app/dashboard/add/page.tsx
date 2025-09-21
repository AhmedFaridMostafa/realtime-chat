import AddFriendForm from "@/components/form/AddFriendForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserPlus, Mail, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = () => {
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
            <UserPlus className="text-primary h-8 w-8" />
          </div>
          <div>
            <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight">
              Add a Friend
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Connect with friends by entering their email address
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card className="border-muted/50 border-2 border-dashed">
            <CardHeader className="pb-4 text-center">
              <div className="from-primary/20 to-primary/5 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br">
                <Mail className="text-primary h-8 w-8" />
              </div>
              <CardTitle className="text-2xl">Send Friend Request</CardTitle>
              <CardDescription className="text-base">
                Enter your friend&apos;s email address to send them a friend
                request
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <AddFriendForm />
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <Card className="from-muted/30 to-muted/10 bg-gradient-to-br">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="text-primary h-5 w-5" />
                How it works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    1
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Enter your friend&apos;s email address
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    2
                  </div>
                  <p className="text-muted-foreground text-sm">
                    We&apos;ll send them a friend request
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary text-primary-foreground mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    3
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Once accepted, start chatting!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:border-blue-800 dark:from-blue-950/20 dark:to-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
                  💡
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold">Pro Tip</h4>
                  <p className="text-muted-foreground text-xs">
                    Make sure your friend is already registered on FriendZone
                    before sending the request.
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

export default page;
