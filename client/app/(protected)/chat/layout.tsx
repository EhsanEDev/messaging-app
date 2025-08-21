"use client";

import ChatsPanel from "@/components/panel/chats";
import NewChatButton from "@/components/panel/chats/newChatButton";
import ContactsPanel from "@/components/panel/contacts";
import { ReactNode, useState } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  return (
    <>
      {/* Panel */}
      <nav className="relative bg-background w-1/3 h-svh border-r-border border-r-1">
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
      <section className="relative bg-gray-300 w-2/3 h-svh flex flex-col">
        {children}
      </section>
    </>
  );
}
