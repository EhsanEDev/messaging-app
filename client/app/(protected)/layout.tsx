import SidebarMenu from "@/components/sidebar/menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/auth";
import { getCurrentUser } from "@/lib/auth";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = getCurrentUser();
  return (
    <AuthProvider user={user}>
      <SidebarProvider>
        <main className="flex flex-row w-full">
          <SidebarMenu />
          {children}
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
}
