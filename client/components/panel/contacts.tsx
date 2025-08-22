import { useAuth } from "@/hooks/useAuth";
import { getContactList } from "@/lib/api";
import Search from "../common/search";
import BackButton from "./contacts/backButton";
import ContactItem from "./contacts/contactItem";
import Panel from "./panel";
import { useEffect, useState, useTransition } from "react";
import { User } from "@/constants/types";

interface IProps {
  onBack: () => void;
}

const ContactsPanel: React.FC<IProps> = ({ onBack }) => {
  const [isPending, startTransition] = useTransition();
  const [contactList, setContactList] = useState<User[]>([]);
  const user = useAuth();

  useEffect(() => {
    startTransition(async () => {
      const contactList = await getContactList(user.id);
      setContactList(contactList);
    });
  }, [user.id]);

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
