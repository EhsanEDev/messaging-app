import { ChatContext } from "@/contexts/chat";
import { useContext } from "react";

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
