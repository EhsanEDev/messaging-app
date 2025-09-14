"use client";

import { SocketContext } from "@/contexts/socket";
import { useContext } from "react";

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used inside SocketProvider");
  return ctx;
};