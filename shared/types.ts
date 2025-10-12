export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  password: string;
  createdAt: string;
}
export type Contact = Omit<User, "password">;
export interface Member extends Contact {
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
  members: Member[];
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

export interface Identifier {
  id: string;
}
export interface Typing extends Identifier {
  username: string;
  isTyping: boolean;
}
export interface ChatCreate {
  type: ChatType;
  name?: string;
  avatarUrl?: string;
  membersId: string[];
}
export interface MessageSend {
  chatId: string;
  content: string;
}
export interface MessageSeen {
  chatId: string;
  msgId: number;
}
export interface UserStatus extends Identifier {
  isOnline: boolean;
  lastSeenAt: string | null;
}
// export interface ChatStatus extends Identifier {
//   typingUser: Pick<User, "username">;
//   // unreadCount: number;
//   // lastSeenMessageId?: number;
// }

// Events which client can emit or server can listen
export interface ClientToServerEvent {
  "user:join": (user: Identifier) => void;
  "user:status": () => void;
  "chat:join": (chat: Identifier) => void;
  "typing:start": (chat: Identifier) => void;
  "typing:stop": (chat: Identifier) => void;
  "message:send": (msg: MessageSend) => void;
  "message:seen": (msg: MessageSeen) => void;
}
// Events which server can emit or client can listen
export interface ServerToClientEvent {
  "user:online": (data: UserStatus[]) => void;
  "user:offline": (data: UserStatus) => void;
  "user:typing": (data: Typing) => void;
  "message:receive": (msg: Message) => void;
  "chat:created": (chat: Chat) => void;
  "chat:updated": (chat: Chat) => void;
}

export interface AuthResult {
  user?: User;
  message: string;
}
