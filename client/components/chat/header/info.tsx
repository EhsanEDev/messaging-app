interface IProps {
  title: string;
  info: string;
}

const ChatInfo: React.FC<IProps> = ({ title, info }) => {
  return (
    <article className="flex flex-col">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">{info}</p>
    </article>
  );
};

export default ChatInfo;
