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

export type ChatType = "direct" | "group" | "channel";
export type ChatVisibility = "public" | "private" | "restricted";

interface BaseChatMetaData {
  id: string;
  type: ChatType;
  visibility: ChatVisibility;
  participants: Participant[];
  lastMessage: Message | null;
  createdAt: string;
}
export interface DirectChatMetaData extends BaseChatMetaData {
  type: "direct";
  visibility: "private";
}
export interface GroupChatMetaData extends BaseChatMetaData {
  type: "group";
  title: string;
  avatarUrl?: string;
}
export interface ChannelChatMetaData extends BaseChatMetaData {
  type: "channel";
  title: string;
  avatarUrl?: string;
}
export type ChatMetadata =
  | DirectChatMetaData
  | GroupChatMetaData
  | ChannelChatMetaData;

// export type SocketEvent =
//   | "user:join"
//   | "user:online"
//   | "user:offline"
//   | "message:send"
//   | "message:receive";

export interface Identifier {
  id: string;
}
export interface ChatCreate {
  type: ChatType;
  participantsId: string[];
}
export interface ChatSendMsg {
  chatId: string;
  content: string;
}

// Events which client can emit or server can listen
export interface ClientToServerEvent {
  "user:join": (data: Identifier) => void;
  "user:leave": (data: Identifier) => void;
  "chat:join": (data: Identifier) => void;
  "message:send": (data: ChatSendMsg) => void;
}
// Events which server can emit or client can listen
export interface ServerToClientEvent {
  "user:online": (data: Identifier) => void;
  "user:offline": (data: Identifier) => void;
  "message:receive": (data: Message) => void;
  "chat:created": (data: ChatMetadata) => void;
}
