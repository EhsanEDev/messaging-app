"use client";

import { useAppSelector } from "@/hooks/useStore";
import { fetcher } from "@/lib/fetcher";
import { Chat, ChatCreate } from "@/shared/types";
import { useRouter } from "next/navigation";
import Search from "../common/search";
import BackButton from "./directChat/backButton";
import ContactItem from "./directChat/contactItem";
import Panel from "./panel";

interface IProps {
  onBack: () => void;
}

const DirectChatPanel: React.FC<IProps> = ({ onBack }) => {
  const router = useRouter();
  const contacts = useAppSelector((state) => state.user.contact);

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
      list={Object.values(contacts)}
      renderItem={(item) => (
        <ContactItem
          onClick={() =>
            handleItemOnClick({
              type: "direct",
              participantsId: [item.meta.id],
            })
          }
          contact={item.meta}
          status={contacts[item.meta.id].status}
        />
      )}
      empty={<p>No contacts available</p>}
    />
  );
};

export default DirectChatPanel;
