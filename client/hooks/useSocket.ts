// import { useEffect } from "react";
// import { socket } from "../lib/socket";

// export function useSocket<T>(event: string, handler: (data: T) => void) {
//   useEffect(() => {
//     socket.on(event, handler);
//     return () => {
//       socket.off(event, handler);
//     };
//   }, [event, handler]);
// }

"use client";

import { useEffect } from "react";
import { WS } from "@/lib/socket";
import { useAuth } from "@/hooks/useAuth";

export function useSocket() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // init & connect
    WS.init();
    WS.register({ userId: user.id });

    // cleanup on unmount
    return () => WS.disconnect();
  }, [user]);

  return WS;
}
