"use client";

import { useEffect } from "react";
import { WS } from "@/lib/socket";
import { useAuth } from "@/hooks/useAuth";

export function useSocket() {
  const { user } = useAuth();

  useEffect(() => {
    // null user 
    if (!user) return;

    // init & connect
    WS.init();
    WS.register({ userId: user.id });

    // cleanup on unmount
    return () => WS.disconnect();
  }, [user]);

  return WS;
}
