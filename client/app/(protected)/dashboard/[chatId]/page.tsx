import ChatConversation from "@/components/chat/conversation";
import ChatFooter from "@/components/chat/footer";
import ChatHeader from "@/components/chat/header";

interface IProps {
  params: { chatId: string };
}

const ChatPage: React.FC<IProps> = async ({ params }: IProps) => {
  const { chatId } = await params;

  // Fetch chat metadata
  // const chatData = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/chats/${chatId}`,
  //   {
  //     cache: "no-store", // Ensure fresh data
  //     credentials: "include",
  //   }
  // );
  // console.log(chatData);

  // Fetch conversation messages
  // const messages = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/chats/${chatId}/messages`,
  //   { cache: "no-store" }
  // ).then((res) => res.json());

  return (
    <>
      {/* <ChatHeader title={chatData.title} participants={chatData.participants} />
      <ChatConversation messages={messages} />
      <ChatFooter chatId={chatId} /> */}
      <ChatHeader
        chatId={chatId}
        avatarUrl=""
        title={chatId}
        membersCount={"3 members"}
      />
      <div className="xl:max-w-6xl mx-auto h-full w-full flex flex-col items-center">
        <ChatConversation />
        <ChatFooter
          onTypingStart={() => {}}
          onTypingStop={() => {}}
          onSendMessage={() => {}}
        />
      </div>
    </>
  );
};

export default ChatPage;
