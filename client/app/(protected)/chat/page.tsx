interface IProps {}

const ChatPage: React.FC<IProps> = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <p className="p-2">Select a chat to start conversation</p>
    </div>
  );
};

export default ChatPage;