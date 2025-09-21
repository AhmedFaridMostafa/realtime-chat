declare type SearchParamProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

declare type FriendRequestAction = "accept" | "deny";

declare interface FriendRequestLoadingStates {
  [senderId: string]: FriendRequestAction | null;
}

declare interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

declare interface Chat {
  id: string;
  messages: Message[];
}

declare interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

declare interface FriendRequest {
  id?: string;
  senderId: string;
  receiverId?: string;
  senderName?: string;
  senderEmail?: string;
  senderImage?: string;
}
