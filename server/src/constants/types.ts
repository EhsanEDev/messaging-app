/** ===== Base User & Message Types ===== **/
export interface User {
  id: string;
  username: string;
  avatarUrl: string | null;
  password: string;
}
export type Contact = Omit<User, "password">;
export interface Participant extends Contact {
  role: "owner" | "admin" | "member";
}
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string; // ISO timestamp
  updatedAt?: string; // in case of edits
  seenBy?: SeenByEntry[]; // Seen status in private and group chat
  reactedBy?: ReactedByEntry[]; // optional for message reactions
  replyToMessageId?: string; // optional if supporting replies
  attachments?: Attachment[]; // optional for images/files
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
/** ===== Chat Metadata (Static) ===== **/
export interface ChatMetadata {
  id: string;
  type: "private" | "group";
  title?: string;
  avatarUrl?: string | null;
  participants: Participant[];
  lastMessage: Message | null;
  createdAt: string;
}

/** ===== Chat Real-Time State (Dynamic) ===== **/
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
export type SocketEvent =
  | "user:join"
  | "user:online"
  | "user:offline"
  | "message:send"
  | "message:receive";
// Events your client can emit
export interface ClientToServerEvents {
  "user:join": (data: ChatJoin) => void;
  "chat:send-message": (data: ChatSendMsg) => void;
  // "chat:create": (data: { participantsId: string[] }) => void;
}

// Events your client can listen to
// export interface ServerToClientEvents {
//   "chat:receive-message": (msg: {
//     id: string;
//     chatId: string;
//     senderId: string;
//     content: string;
//     createdAt: string;
//   }) => void;

//   "chat:created": (chat: {
//     id: string;
//     title: string;
//     participants: string[];
//     createdAt: string;
//   }) => void;

//   "user:online": (userId: string) => void;
//   "user:offline": (userId: string) => void;
// }
export interface TypingUser {
  userId: string;
  name: string;
}
export interface ChatRealtimeState {
  chatId: string;
  unreadCount: number;
  typingUsers: TypingUser[];
}

/** ===== Global User Status ===== **/
export interface UserStatus {
  userId: string;
  isOnline: boolean;
  lastSeen?: string; // ISO timestamp
}
export type UsersStatusMap = Record<string, UserStatus>;
