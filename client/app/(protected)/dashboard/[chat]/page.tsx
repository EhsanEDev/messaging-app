import ChatConversation from "@/components/chat/conversation";
import ChatFooter from "@/components/chat/footer";
import ChatHeader from "@/components/chat/header";

interface IProps {}

const ChatPage: React.FC<IProps> = () => {
  return (
    <>
      <ChatHeader />
      <ChatConversation />
      <ChatFooter />
    </>
  );
};

export default ChatPage;
