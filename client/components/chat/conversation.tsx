interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface IProps {
  messages: Array<Message>;
}

const ChatThread: React.FC<IProps> = ({ messages }) => {
  return (
    <article className="w-full flex-1">
      {messages.map((message) => (
        <div key={message.id} className="chat-bubble">
          <span className="chat-sender">{message.senderId}</span>:{" "}
          <span className="chat-text">{message.text}</span>
        </div>
      ))}
    </article>
  );
};

export default ChatThread;
