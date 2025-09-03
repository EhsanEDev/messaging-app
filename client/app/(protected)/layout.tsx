import SidebarMenu from "@/components/sidebar/menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <main className="flex flex-row w-full">
        <SidebarMenu />
        {children}
      </main>
    </SidebarProvider>
  );
}
