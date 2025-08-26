import ChatWindow from "@/components/chat/window";
import { ChatMetadata, Message } from "@/constants/types";
import { fetcher } from "@/lib/fetcher";
import { cookies } from "next/headers";

interface IProps {
  params: { chatId: string };
}

const ChatPage: React.FC<IProps> = async ({ params }) => {
  const { chatId } = await params;
  const cookieStore = cookies(); // read incoming request cookies
  const token = (await cookieStore).get("authToken")?.value;

  // Fetch from server (could be your REST API or DB)
  const metadata = await fetcher<ChatMetadata>(`/api/chat/${chatId}`, {
    headers: { Cookie: `authToken=${token}` },
    cache: "no-store",
  });
  const messages = await fetcher<Message[]>(`/api/chat/${chatId}/messages`, {
    headers: { Cookie: `authToken=${token}` },
    cache: "no-store",
  });

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
