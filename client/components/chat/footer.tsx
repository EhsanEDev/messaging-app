interface IProps {}

const ChatFooter: React.FC<IProps> = () => {
  return (
    <>
      <footer className="p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <button className="bg-blue-500 text-white rounded-lg p-2 ml-2">
          Send
        </button>
      </footer>
    </>
  );
};

export default ChatFooter;