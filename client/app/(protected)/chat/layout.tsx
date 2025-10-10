"use client";

import PanelWrapper from "@/components/panel/panelWrapper";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Panel */}
      <nav className="relative bg-background w-1/3 border-r-border border-r-1 flex flex-col">
        <PanelWrapper />
      </nav>
      {/* Chat window */}
      <section className="relative bg-muted w-2/3 flex flex-col h-screen box-border">
        {children}
      </section>
    </>
  );
}
