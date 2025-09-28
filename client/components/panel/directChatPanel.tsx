"use client";

import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/hooks/useSocket";
import { fetcher } from "@/lib/fetcher";
import { ChatCreate, Chat, User } from "@/shared/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Search from "../common/search";
import BackButton from "./directChat/backButton";
import ContactItem from "./directChat/contactItem";
import Panel from "./panel";

interface IProps {
  onBack: () => void;
}

const DirectChatPanel: React.FC<IProps> = ({ onBack }) => {
  const [isPending, startTransition] = useTransition();
  const [contactList, setContactList] = useState<User[]>([]);
  const { user } = useAuth();
  const router = useRouter();
  const { userStatus } = useSocket();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await fetcher<User[]>("/api/contact/list");
        const list = res.data.filter((u) => u.id !== user.id);
        setContactList(list);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    });
  }, [user.id]);

  const handleItemOnClick = async (chat: ChatCreate) => {
    // Create/Open chat by id
    try {
      const res = await fetcher<Chat>("/api/chat/create", {
        method: "POST",
        body: JSON.stringify(chat),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Redirect to the chat
      router.push(`/chat/${res.data.id}`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <Panel
      header={{
        btn: <BackButton onClick={onBack} />,
        input: <Search placeholder="Search contacts..." />,
      }}
      loading={isPending}
      list={contactList}
      renderItem={(item) => (
        <ContactItem
          onClick={() =>
            handleItemOnClick({ type: "direct", participantsId: [item.id] })
          }
          user={item}
          status={userStatus[item.id]}
        />
      )}
      emptyMessage="No contacts available"
    />
  );
};

export default DirectChatPanel;
