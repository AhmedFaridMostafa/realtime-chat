import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Messages from "@/components/chat/Messages";
import ChatInput from "@/components/chat/ChatInput";
import { getChatMessages } from "@/helpers/getChatMessages";
import ChatHeader from "@/components/chat/ChatHeader";
import { Suspense } from "react";
import MessagesSkeleton from "@/components/chat/loading/MessagesSkeleton";
import { db } from "@/lib/db";

export async function generateMetadata({ params }: SearchParamProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { chatId } = await params;
  const [userId1, userId2] = chatId.split("--");
  const { user } = session;
  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
  return { title: `FriendZone | ${chatPartner.name} chat` };
}

const ChatPage = async ({ params }: SearchParamProps) => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { chatId } = await params;
  const [userId1, userId2] = chatId.split("--");
  const { user } = session;
  if (user.id !== userId1 && user.id !== userId2) notFound();
  const chatPartnerId = user.id === userId1 ? userId2 : userId1;
  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
  const initialMessages = getChatMessages(chatId);

  return (
    <div className="flex h-[calc(100vh-6rem)] max-h-[calc(100vh-4rem)] flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="bg-background/95 flex-shrink-0 border-b backdrop-blur-sm">
        <ChatHeader chatPartner={chatPartner} />
      </div>

      {/* Messages Area */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Suspense fallback={<MessagesSkeleton />}>
          <Messages
            chatId={chatId}
            chatPartner={chatPartner}
            sessionId={session.user.id}
            initialMessages={initialMessages}
          />
        </Suspense>
      </div>

      {/* Chat Input */}
      <div className="bg-background/95 flex-shrink-0 border-t backdrop-blur-sm">
        <ChatInput chatId={chatId} chatPartner={chatPartner} />
      </div>
    </div>
  );
};

export default ChatPage;
