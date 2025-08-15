/** ===== Base User & Message Types ===== **/

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}
export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string; // ISO timestamp
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
