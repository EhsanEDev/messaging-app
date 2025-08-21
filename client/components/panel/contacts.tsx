import { useAuth } from "@/hooks/useAuth";
import { getContactList } from "@/lib/api";
import Search from "../common/search";
import BackButton from "./contacts/backButton";
import ContactListItem from "./contacts/item";
import Panel from "./panel";

interface IProps {
  onBack: () => void;
}

const ContactsPanel: React.FC<IProps> = ({ onBack }) => {
  const user = useAuth();
  const contactList = getContactList(user.id);
  return (
    <Panel
      header={{ btn: <BackButton onClick={onBack} />, input: <Search /> }}
      list={contactList}
      renderItem={(item) => <ContactListItem user={item} />}
      emptyMessage="No contacts available"
    />
  );
};

export default ContactsPanel;
