import { db } from "@/lib/db";

const getFriendRequestsId = async (id: string): Promise<string[]> => {
  return await db.smembers(`user:${id}:incoming_friend_requests`);
};

export default getFriendRequestsId;
