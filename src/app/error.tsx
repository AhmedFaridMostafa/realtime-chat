"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Home, RefreshCw, Bug, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  const isNetworkError =
    error.message.includes("fetch") || error.message.includes("network");
  const isAuthError =
    error.message.includes("auth") || error.message.includes("unauthorized");

  return (
    <div className="from-background via-muted/20 to-background flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="border-2 border-dashed border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader className="pb-4 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-red-600/10">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-red-700 dark:text-red-400">
              Something went wrong!
            </CardTitle>
            <CardDescription className="text-base">
              We encountered an unexpected error. Don&apos;t worry, we&apos;re
              on it!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Details */}
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
              <Bug className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                <div className="space-y-2">
                  <p className="font-medium">Error Details:</p>
                  <p className="rounded bg-red-100 p-2 font-mono text-sm dark:bg-red-900/50">
                    {error.message || "An unexpected error occurred"}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>

            {/* Error Type Specific Messages */}
            {isNetworkError && (
              <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 dark:text-orange-200">
                  <strong>Network Error:</strong> It looks like there&apos;s a
                  connection issue. Please check your internet connection and
                  try again.
                </AlertDescription>
              </Alert>
            )}

            {isAuthError && (
              <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <strong>Authentication Error:</strong> Your session may have
                  expired. Please try logging in again.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button onClick={reset} size="lg" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" asChild size="lg" className="gap-2">
                <Link href="/dashboard">
                  <Home className="h-4 w-4" />
                  Go to Dashboard
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={handleGoBack}
                size="lg"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>

            {/* Troubleshooting Tips */}
            <div className="border-t pt-6">
              <h3 className="mb-3 text-center text-sm font-semibold">
                Troubleshooting Tips:
              </h3>
              <div className="text-muted-foreground grid gap-2 text-sm">
                <div className="flex items-start gap-2">
                  <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  <span>Check your internet connection</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  <span>Try refreshing the page</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  <span>Clear your browser cache</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-muted-foreground mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  <span>Try logging out and back in</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            If this problem persists, please{" "}
            <Button variant="link" className="h-auto p-0 text-sm">
              contact our support team
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
