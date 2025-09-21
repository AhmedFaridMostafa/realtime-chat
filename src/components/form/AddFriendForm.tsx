"use client";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addFriendValidator } from "@/lib/validations/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
function AddFriendForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof addFriendValidator>>({
    resolver: zodResolver(addFriendValidator),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof addFriendValidator>) {
    try {
      setIsLoading(true);
      const addFriend = async () => {
        const response = await fetch("/api/friends/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
          }),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`,
          );
        }
        return response;
      };
      toast.promise(addFriend(), {
        loading: "Adding friend...",
        success: "Friend added successfully!",
        error: (error) => {
          if (error instanceof z.ZodError) {
            return "Friend already exists.";
          }
          if (error instanceof Error) {
            return error.message || "Something went wrong.";
          }
          return "Something went wrong.";
        },
      });
    } catch (error) {
      console.error("Error adding friend:", error);
      toast.error("Email", { description: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold">
                Friend&apos;s Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="friend@example.com"
                  {...field}
                  className="h-12 text-base"
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription className="text-sm">
                We&apos;ll send a friend request to this email address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isLoading}
          type="submit"
          className="h-12 w-full gap-2 text-base font-semibold"
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Sending Request...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Send Friend Request
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default AddFriendForm;
