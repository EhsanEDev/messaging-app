import { SidebarTrigger } from "@/components/ui/sidebar";

interface IProps {}

const ChatListPanel: React.FC<IProps> = () => {
  return (
    <div className="bg-gray-200 w-1/3 h-screen">
      <SidebarTrigger />
      Chat List Panel
    </div>
  );
};

export default ChatListPanel;
