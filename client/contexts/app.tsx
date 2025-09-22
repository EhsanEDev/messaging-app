import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { ChatProvider } from "./chat";
import { SocketProvider } from "./socket";

interface IProps {
  children: ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ChatProvider>
        <SocketProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </SocketProvider>
      </ChatProvider>
    </AuthProvider>
  );
};

export default AppProvider;
