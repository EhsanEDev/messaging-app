import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetcher } from "@/lib/fetcher";
import { Chat, ChatCreate, ChatType, Contact } from "@/shared/types";
import { setPanelState } from "@/store/slices/uiSlice";
import { ForwardIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FloatButton from "../common/floatButton";
import Search from "../common/search";
import ContactItem from "./collectiveChat/contactItem";
import MainForm from "./collectiveChat/form";
import BackButton from "./directChat/backButton";
import Panel from "./panel";

interface IProps {
  type: Omit<ChatType, "direct">;
}

const CollectiveChatPanel: React.FC<IProps> = ({ type }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.user.contact);
  const [step, setStep] = useState(1);
  const [members, setMembers] = useState<Contact[]>([]);

  const handleBack = () => dispatch(setPanelState("main"));

  const handleMembers = (value: boolean, contact: Contact) => {
    setMembers((prev) => {
      if (value) {
        // Add only if not already present
        if (!prev.some((c) => c.id === contact.id)) {
          return [...prev, contact];
        }
        return prev;
      } else {
        // Remove by id
        return prev.filter((c) => c.id !== contact.id);
      }
    });
  };

  const handleCreate = async (chat: ChatCreate) => {
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
      handleBack();
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  if (step === 1) {
    return (
      <Panel
        header={{
          btn: <BackButton onClick={handleBack} />,
          input: <Search placeholder="Search contacts..." />,
        }}
        main={<FloatButton tooltip="Continue to group info" icon={ForwardIcon} onClick={() => setStep(2)} />}
        list={Object.values(contacts).map((c) => c.meta)}
        renderItem={(item) => (
          <ContactItem
            onChange={handleMembers}
            defaultChecked={members.some((c) => c.id === item.id)}
            contact={item}
            status={contacts[item.id].status}
          />
        )}
        empty={<p>No contacts available</p>}
      />
    );
  }
  if (step === 2) {
    return (
      <Panel
        header={{
          btn: <BackButton onClick={() => setStep(1)} />,
          input: <p className="ml-2 text-lg font-semibold">Create a group chat</p>,
        }}
        main={
          <MainForm
            onSubmit={(name) =>
              handleCreate({
                name,
                type: type as ChatType,
                membersId: members.map((m) => m.id),
              })
            }
            membersCount={members.length}
          />
        }
        list={members}
        renderItem={(item) => (
          <ContactItem
            onChange={handleMembers}
            contact={item}
            disabled
            status={contacts[item.id].status}
          />
        )}
        empty={<p>No contacts available</p>}
      />
    );
  }
};

export default CollectiveChatPanel;
