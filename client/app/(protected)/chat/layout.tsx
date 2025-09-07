"use client";

import ChatsPanel from "@/components/panel/chats";
import NewChatButton from "@/components/panel/chats/newChatButton";
import ContactsPanel from "@/components/panel/contacts";
import { useSocket } from "@/hooks/useSocket";
import { ReactNode, useState } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  // Initialize socket connection at main layout
  useSocket();

  return (
    <>
      {/* Panel */}
      <nav className="relative bg-background w-1/3 border-r-border border-r-1 flex flex-col">
        {isNewChatOpen ? (
          <ContactsPanel onBack={() => setIsNewChatOpen(false)} />
        ) : (
          <>
            <ChatsPanel />
            <NewChatButton onClick={() => setIsNewChatOpen((prev) => !prev)} />
          </>
        )}
      </nav>
      {/* Chat window */}
      <section className="relative bg-gray-300 w-2/3 flex flex-col h-screen box-border">
        {children}
      </section>
    </>
  );
}
