import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body);
    const session = await auth();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // verify both users are not already friends
    const isAlreadyFriends = await db.sismember(
      `user:${session.user.id}:friends`,
      idToAdd,
    );

    if (isAlreadyFriends) {
      return new Response("Already friends", { status: 400 });
    }

    const hasFriendRequest = await db.sismember(
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd,
    );

    if (!hasFriendRequest) {
      return new Response("No friend request", { status: 400 });
    }

    const [user, friend] = (await Promise.all([
      db.get(`user:${session.user.id}`),
      db.get(`user:${idToAdd}`),
    ])) as User[];

    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`user:${idToAdd}:friends`),
        "new_friend",
        user,
      ),
      pusherServer.trigger(
        toPusherKey(`user:${session.user.id}:friends`),
        "new_friend",
        friend,
      ),
      db.sadd(`user:${session.user.id}:friends`, idToAdd), // Sadd is like the Set.add in JS
      db.sadd(`user:${idToAdd}:friends`, session.user.id), // Sadd is like the Set.add in JS
      db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd), // Srem is like the Set.remove in JS
      db.srem(`user:${idToAdd}:outgoing_friend_requests`, session.user.id), // Srem is like the Set.remove in JS
    ]);

    return new Response("OK");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
