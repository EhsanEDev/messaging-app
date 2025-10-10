"use client";

import Loading from "@/components/common/loading";
import PanelWrapper from "@/components/panel/panelWrapper";
import { useAppSelector } from "@/hooks/useStore";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
    const isInit = useAppSelector(
    (state) => state.ui.appState.isInitializedSuccess
  );

  if (!isInit) return <Loading />;

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
