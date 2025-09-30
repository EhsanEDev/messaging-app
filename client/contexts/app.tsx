import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { ChatProvider } from "./chat";
import { SocketProvider } from "./socket";
import { StoreProvider } from "./store";

interface IProps {
  children: ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <StoreProvider>
      <AuthProvider>
        <ChatProvider>
          <SocketProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </SocketProvider>
        </ChatProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default AppProvider;
