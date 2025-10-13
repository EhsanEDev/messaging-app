"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetcher } from "@/lib/fetcher";
import { Chat, ChatCreate } from "@/shared/types";
import { setPanelState } from "@/store/slices/uiSlice";
import { useRouter } from "next/navigation";
import Search from "../common/search";
import BackButton from "./directChat/backButton";
import ContactItem from "./directChat/contactItem";
import Panel from "./panel";

const DirectChatPanel: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
        btn: <BackButton onClick={() => dispatch(setPanelState("Main"))} />,
        input: <Search placeholder="Search contacts..." />,
      }}
      list={Object.values(contacts)}
      renderItem={(item) => (
        <ContactItem
          onClick={() =>
            handleItemOnClick({
              type: "Direct",
              membersId: [item.meta.id],
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
