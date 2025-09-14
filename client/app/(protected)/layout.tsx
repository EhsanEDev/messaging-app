import SidebarMenu from "@/components/sidebar/menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/auth";
import { SocketProvider } from "@/contexts/socket";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SocketProvider>
        <SidebarProvider>
          <main className="flex flex-row w-full">
            <SidebarMenu />
            {children}
          </main>
        </SidebarProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
