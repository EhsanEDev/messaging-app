import ChatListPanel from "@/components/panel/chatList";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ChatListPanel />
      <section className="w-2/3">{children}</section>
    </>
  );
}
