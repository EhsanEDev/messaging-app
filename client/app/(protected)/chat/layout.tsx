import ChatListPanel from "@/components/panel/panel";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Chat list panel */}
      <nav className="bg-background w-1/3 h-svh border-r-border border-r-1">
        <ChatListPanel />
      </nav>
      {/* Chat window */}
      <section className="relative bg-gray-300 w-2/3 h-svh flex flex-col">
        {children}
      </section>
    </>
  );
}
