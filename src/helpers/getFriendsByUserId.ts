import z from "zod";
import { db } from "@/lib/db";

export const getFriendsByUserId = async (userId: string): Promise<User[]> => {
  try {
    // Input validation
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid userId provided");
    }

    // Get friend IDs
    const friendIds = (await db.smembers(`user:${userId}:friends`)) as string[];

    // Handle empty friends list
    if (!friendIds || friendIds.length === 0) {
      return [];
    }

    // Use MGET to fetch all friend data in one Redis call
    const userKeys = friendIds.map((id) => `user:${id}`);
    const friendsData = (await db.mget(...userKeys)) as (User | null)[];

    // Process the results
    const friends: User[] = [];

    friendsData.forEach((friendData, index) => {
      const friendId = friendIds[index];

      try {
        if (!friendData) {
          console.warn(`Friend data not found for ID: ${friendId}`);
          return;
        }
        // Validate the parsed user data
        if (z.email().safeParse(friendData.email).success) {
          friends.push(friendData);
        } else {
          console.warn(`Invalid user data structure for friend: ${friendId}`);
        }
      } catch (parseError) {
        console.error(
          `Failed to parse friend data for ID: ${friendId}`,
          parseError,
        );
      }
    });

    return friends;
  } catch (error) {
    console.error(`Error fetching friends for user ${userId}:`, error);
    throw new Error(`Failed to fetch friends for user: ${userId}`);
  }
};
