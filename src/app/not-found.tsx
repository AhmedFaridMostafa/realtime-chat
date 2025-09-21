"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, MessageCircle, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="from-background via-muted/20 to-background flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-muted/50 bg-muted/10 border-2 border-dashed">
          <CardContent className="p-12 text-center">
            {/* 404 Illustration */}
            <div className="relative mb-8">
              <div className="from-primary/20 to-primary/5 mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br">
                <MessageCircle className="text-primary h-16 w-16" />
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-8 space-y-4">
              <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-6xl font-bold text-transparent">
                Page Not Found
              </h1>
              <p className="text-muted-foreground mx-auto max-w-md text-xl leading-relaxed">
                Oops! The page you&apos;re looking for seems to have wandered
                off into the digital void.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleGoBack}
                size="lg"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="border-t pt-6">
              <p className="text-muted-foreground mb-4 text-sm">
                Maybe you were looking for:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="ghost" asChild size="sm" className="gap-2">
                  <Link href="/dashboard">
                    <MessageCircle className="h-4 w-4" />
                    Recent Chats
                  </Link>
                </Button>
                <Button variant="ghost" asChild size="sm" className="gap-2">
                  <Link href="/dashboard/add">
                    <Users className="h-4 w-4" />
                    Add Friends
                  </Link>
                </Button>
                <Button variant="ghost" asChild size="sm" className="gap-2">
                  <Link href="/dashboard/requests">
                    <Search className="h-4 w-4" />
                    Friend Requests
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            If you believe this is an error, please{" "}
            <Button variant="link" className="h-auto p-0 text-sm">
              contact support
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
