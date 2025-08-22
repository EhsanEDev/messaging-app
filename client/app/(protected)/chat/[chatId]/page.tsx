import ChatWindow from "@/components/chat/window";
import { getChatMessages, getChatMetadata } from "@/lib/api";

interface IProps {
  params: { chatId: string };
}

const ChatPage: React.FC<IProps> = async ({ params }) => {
  const { chatId } = await params;

  // Fetch from server (could be your REST API or DB)
  const metadata = await getChatMetadata(chatId);
  const messages = await getChatMessages(chatId);
  console.log(metadata);
  console.log(messages);

  return (
    <>
      <ChatWindow
        chatId={chatId}
        initialMetadata={metadata}
        initialMessages={messages}
      />
    </>
  );
};

export default ChatPage;
