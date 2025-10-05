import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { AuthProvider } from "./auth";
import { SocketProvider } from "./socket";
import { StoreProvider } from "./store";
import { DataProvider } from "./data";

interface IProps {
  children: ReactNode;
}

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <StoreProvider>
      <AuthProvider>
        <DataProvider>
          <SocketProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </SocketProvider>
        </DataProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

export default AppProvider;
