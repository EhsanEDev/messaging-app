import ChatListPanel from "@/components/panel/panel";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Chat list panel */}
      <nav className="bg-background w-1/3 h-screen border-r-border border-r-1">
        <ChatListPanel />
      </nav>
      {/* Chat window */}
      <section className="bg-muted w-2/3 h-screen flex flex-col">
        {children}
      </section>
    </>
  );
}
