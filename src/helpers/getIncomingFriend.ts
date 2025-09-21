import { db } from "@/lib/db";
import getFriendRequestsId from "./getFriendRequestsId";

type FriendRequest = {
  senderId: string;
  senderEmail: string;
  senderImage: string;
  senderName: string;
};

export async function getIncomingFriendRequestsBatch(
  id: string,
): Promise<FriendRequest[]> {
  const incomingSenderIds = await getFriendRequestsId(id);
  if (!incomingSenderIds.length) return [];

  try {
    // Use Redis MGET to fetch all user data in one command
    const userKeys = incomingSenderIds.map((id) => `user:${id}`);
    const usersData = (await db.mget(userKeys)) as User[];

    const validRequests: FriendRequest[] = [];

    usersData.forEach((userData, index) => {
      const senderId = incomingSenderIds[index];

      try {
        if (!userData) {
          console.warn(`User data not found for sender: ${senderId}`);
          return;
        }

        if (!userData?.email) {
          console.warn(
            `Invalid user data for sender: ${senderId} - missing email`,
          );
          return;
        }

        validRequests.push({
          senderId,
          senderEmail: userData.email,
          senderImage: userData.image,
          senderName: userData.name,
        });
      } catch (parseError) {
        console.error(
          `Failed to parse user data for sender: ${senderId}`,
          parseError,
        );
      }
    });

    return validRequests;
  } catch (error) {
    console.error("Error batch fetching friend requests:", error);
    throw error;
  }
}
