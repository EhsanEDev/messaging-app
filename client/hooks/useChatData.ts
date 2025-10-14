import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/hooks/useStore";
import { formatStatus, isOnlineInDirect } from "@/lib/user-status";
import { Chat } from "@/shared/types";

interface Input {
  mode: "item" | "header";
  chat: Chat;
}
interface Output {
  chatTitle: string;
  chatAvatarUrl?: string;
  chatInfo: string;
  isOnline: boolean | undefined;
}

let chatTitle: string;
let chatAvatarUrl: string | undefined;
let chatInfo: string;
let chatStatus: string | null = null;
let isOnline: boolean | undefined = undefined;

export const useChatData = ({ mode, chat }: Input): Output => {
  const { currentUser } = useAuth();
  const contacts = useAppSelector((state) => state.user.contact);
  const typingMembers = useAppSelector((state) => state.chat)[chat?.id!]?.status
    .typing;

  isOnline = undefined;
  chatInfo = chat.lastMessage?.content || "";
  const member = chat.members.find((p) => p.id !== currentUser.id);
  if (member) {
    chatStatus = formatStatus(contacts[member.id]?.status);
  }

  if (chat.type === "Group") {
    chatTitle = chat.title;
    chatAvatarUrl = chat.avatarUrl;
    if (mode === "header") {
      chatInfo = `${chat.members.length} members`;
    }
    if (typingMembers?.length > 0) {
      chatInfo =
        typingMembers.length === 1
          ? `${typingMembers[0]} is typing...`
          : `${typingMembers.join(", ")} are typing...`;
    }
  } else if (chat.type === "Channel") {
    chatTitle = chat.title;
    chatAvatarUrl = chat.avatarUrl;
    if (mode === "header") {
      chatInfo = `${chat.members.length} subscribers`;
    }
  } else {
    if (chat.members.length < 2) {
      chatTitle = "Saved Messages";
      chatInfo = "Your saved messages will appear here.";
      chatAvatarUrl = undefined;
    } else {
      if (member) {
        isOnline = isOnlineInDirect(chatStatus);
        chatTitle = member.username;
        chatAvatarUrl = member.avatarUrl;
        if (mode === "header" && chatStatus) {
          chatInfo = chatStatus;
        }
        if (typingMembers?.length) {
          chatInfo = `is typing...`;
        }
      }
    }
  }

  return { chatTitle, chatAvatarUrl, chatInfo, isOnline };
};
