"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SignOutButton = ({ ...props }) => {
  return (
    <Button
      {...props}
      variant="ghost"
      onClick={() => {
        toast.promise(signOut(), {
          loading: "Signing Out...",
          success: "Signed Out Successfully!",
          error: (error) =>
            error instanceof Error ? error.message : "Error Signing Out",
        });
      }}
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
};

export default SignOutButton;
