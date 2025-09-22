import ChatWindow from "@/components/chat/window";
import { fetcher } from "@/lib/fetcher";
import { ChatMetadata, Message } from "@/shared/types";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

interface IProps {
  params: { chatId: string };
}

const ChatPage: React.FC<IProps> = async ({ params }) => {
  const { chatId } = await params;
  const cookieStore = cookies(); // read incoming request cookies
  const token = (await cookieStore).get("authToken")?.value;

  const metadata = await fetcher<ChatMetadata>(`/api/chat/${chatId}`, {
    // Current is a server component, so we have to pass cookies manually
    headers: { Cookie: `authToken=${token}` },
    cache: "no-store",
  });
  const messages = await fetcher<Message[]>(`/api/chat/${chatId}/messages`, {
    // Current is a server component, so we have to pass cookies manually
    headers: { Cookie: `authToken=${token}` },
    cache: "no-store",
  });
  console.log(messages);
  

  // The ChatId not found, so ignore it and redirect to the chat list
  if (metadata.status === 404) {
    redirect("/chat", RedirectType.replace);
  }

  return (
    <>
      <ChatWindow
        chatId={chatId}
        initialMetadata={metadata.data}
        initialMessages={messages.data}
      />
    </>
  );
};

export default ChatPage;
