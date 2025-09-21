import { chatHrefConstructor } from "@/lib/utils";
import { db } from "@/lib/db";

type FriendWithLastMessage = User & {
  lastMessage: Message | null;
};

const getFriendsWithLastMessage = async (
  friends: User[],
  currentUserId: string,
): Promise<FriendWithLastMessage[]> => {
  if (!friends.length) return [];

  try {
    // Create array of promises for all Redis queries
    const messagePromises = friends.map((friend) =>
      db.zrange(
        `chat:${chatHrefConstructor(currentUserId, friend.id)}:messages`,
        -1,
        -1,
      ),
    );

    // Wait for all Redis queries to complete
    const messagesArrays = await Promise.all(messagePromises);

    // Map friends with their corresponding last messages
    return friends.map((friend, index) => ({
      ...friend,
      lastMessage: (messagesArrays[index] as Message[])[0] || null,
    }));
  } catch (error) {
    console.error("Error fetching friends with last messages:", error);
    throw error;
  }
};

export default getFriendsWithLastMessage;
