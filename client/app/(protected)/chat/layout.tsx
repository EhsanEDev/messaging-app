"use client";

import PanelWrapper from "@/components/panel/panelWrapper";
import { useSocket } from "@/hooks/useSocket";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  // Initialize socket connection at main layout
  useSocket();

  return (
    <>
      {/* Panel */}
      <nav className="relative bg-background w-1/3 border-r-border border-r-1 flex flex-col">
        <PanelWrapper />
      </nav>
      {/* Chat window */}
      <section className="relative bg-gray-300 w-2/3 flex flex-col h-screen box-border">
        {children}
      </section>
    </>
  );
}
