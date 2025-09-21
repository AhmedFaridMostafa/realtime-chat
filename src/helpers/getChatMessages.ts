import { messageArrayValidator } from "@/lib/validations/validations";
import { notFound } from "next/navigation";
import { Message } from "@/lib/validations/message";
import { db } from "@/lib/db";

export async function getChatMessages(chatId: string) {
  try {
    const results: Message[] = await db.zrange(
      `chat:${chatId}:messages`,
      0,
      -1,
    );
    const reversedDbMessages = results.reverse();
    const messages = messageArrayValidator.parse(reversedDbMessages);
    return messages;
  } catch (error) {
    console.error("[CHAT_MESSAGES_ERROR]", error);
    notFound();
  }
}
