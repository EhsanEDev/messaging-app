/** ===== Base User & Message Types ===== **/
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}
export interface Message {
  id: string;
  chatId: string;
  sender: User;
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
  title: string;
  avatarUrl?: string;
  participants: User[];
  lastMessage?: Message;
}

/** ===== Chat Real-Time State (Dynamic) ===== **/
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
