import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { addFriendValidator } from "@/lib/validations/validations";
import z from "zod";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();

    // Validate email
    const parsedEmail = addFriendValidator.safeParse(body);

    if (!parsedEmail.success) {
      return new Response("Invalid email", { status: 400 });
    }

    // Check if user exists
    const idToAdd = (await db.get(
      `user:email:${parsedEmail.data.email}`,
    )) as string;

    if (!idToAdd) return new Response("User not found", { status: 404 });

    if (idToAdd === session.user.id) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }
    // check if user is already added
    const isAlreadyAdded = (await db.sismember(
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id,
    )) as 0 | 1;

    if (isAlreadyAdded) {
      return new Response("Already added this user", { status: 400 });
    }

    const isAlreadyFriends = (await db.sismember(
      `user:${session.user.id}:friends`,
      idToAdd,
    )) as 0 | 1;

    if (isAlreadyFriends) {
      return new Response("Already friends with this user", { status: 400 });
    }

    await pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      "incoming_friend_requests",
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
      },
    );

    await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
