export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  password: string;
}
export type Contact = Omit<User, "password">;
export interface Participant extends Contact {
  role: "owner" | "admin" | "member";
}



export interface SeenByEntry {
  userId: string;
  seenAt: string; // ISO timestamp
}
export interface ReactedByEntry extends User {
  emoji: string;
  reactedAt: string; // ISO timestamp
}
export interface Attachment {
  id: string;
  type: "image" | "video" | "file" | "audio";
  url: string;
  thumbnailUrl?: string; // optional for images/videos
  fileName?: string; // for documents
  size?: number; // in bytes
}
export interface Message {
  id: string;
  chatId: string;
  sender: Contact;
  content: string;
  createdAt: string; // ISO timestamp
  updatedAt?: string; // in case of edits
  seenBy?: SeenByEntry[]; // Seen status in private and group chat
  reactedBy?: ReactedByEntry[]; // optional for message reactions
  replyToMessageId?: string; // optional if supporting replies
  attachments?: Attachment[]; // optional for images/files
}



interface BaseChatMetaData {
  id: string;
  participants: Participant[];
  lastMessage: Message | null;
  createdAt: string;
}
export interface PrivateChatMetaData extends BaseChatMetaData {
  type: "private";
}
export interface GroupChatMetaData extends BaseChatMetaData {
  type: "group";
  title: string;
  avatarUrl?: string;
}
export type ChatMetadata = PrivateChatMetaData | GroupChatMetaData;



export interface ChatJoin {
  userId: string;
}
export interface ChatSendMsg {
  receiverId: string;
  content: string;
}
export interface ChatReceiveMsg {
  id: string;
  receiverId: string;
  senderId: string;
  content: string;
  createdAt: string;
}
