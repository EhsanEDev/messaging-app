export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  password: string;
  createdAt: string;
  // isOnline: boolean;
  // lastSeenAt: string;
}
export type Contact = Omit<User, "password">;
export interface Participant extends Contact {
  role: "owner" | "admin" | "member";
  lastSeenMessageId?: number;
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
  id: number;
  type: "image" | "video" | "file" | "audio";
  url: string;
  thumbnailUrl?: string; // optional for images/videos
  fileName?: string; // for documents
  size?: number; // in bytes
}
export interface Message {
  id: number;
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

interface BaseChat {
  id: string;
  type: ChatType;
  visibility: ChatVisibility;
  participants: Participant[];
  lastMessage: Message | null;
  createdAt: string;
}
export interface DirectChat extends BaseChat {
  type: "direct";
  visibility: "private";
}
export interface GroupChat extends BaseChat {
  type: "group";
  title: string;
  avatarUrl?: string;
}
export interface ChannelChat extends BaseChat {
  type: "channel";
  title: string;
  avatarUrl?: string;
}
export type Chat = DirectChat | GroupChat | ChannelChat;

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
export interface MessageSend {
  chatId: string;
  content: string;
}
export interface MessageSeen {
  chatId: string;
  msgId: number;
}
// export interface UserOnline extends Identifier {}
export interface UserStatus extends Identifier {
  isOnline: boolean;
  lastSeenAt: string | null;
}

// Events which client can emit or server can listen
export interface ClientToServerEvent {
  "user:join": (data: Identifier) => void;
  "user:status": () => void;
  "chat:join": (data: Identifier) => void;
  "message:send": (data: MessageSend) => void;
  "message:seen": (data: MessageSeen) => void;
}
// Events which server can emit or client can listen
export interface ServerToClientEvent {
  "user:online": (data: UserStatus[]) => void;
  "user:offline": (data: UserStatus) => void;
  "message:receive": (data: Message) => void;
  "chat:created": (data: Chat) => void;
  "chat:updated": (data: Chat) => void;
}

export interface AuthResult {
  user?: User;
  message: string;
}
