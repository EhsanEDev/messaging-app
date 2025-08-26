import { User } from "@/constants/types";
import { useAuth } from "@/hooks/useAuth";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useState, useTransition } from "react";
import Search from "../common/search";
import BackButton from "./contacts/backButton";
import ContactItem from "./contacts/contactItem";
import Panel from "./panel";

interface IProps {
  onBack: () => void;
}

const ContactsPanel: React.FC<IProps> = ({ onBack }) => {
  const [isPending, startTransition] = useTransition();
  const [contactList, setContactList] = useState<User[]>([]);
  const currentUser = useAuth();

  useEffect(() => {
    startTransition(async () => {
      const data = await fetcher<User[]>("/api/contact/list");
      const list = data.filter((user) => user.id !== currentUser.id);
      setContactList(list);
    });
  }, [currentUser.id]);

  return (
    <Panel
      header={{
        btn: <BackButton onClick={onBack} />,
        input: <Search placeholder="Search contacts..." />,
      }}
      loading={isPending}
      list={contactList}
      renderItem={(item) => <ContactItem user={item} />}
      emptyMessage="No contacts available"
    />
  );
};

export default ContactsPanel;
