"use client";

import Loading from "@/components/common/loading";
import { useAuth } from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { WebSocket } from "@/lib/socket";
import { Message } from "@/shared/types";
import { addChat, addMessage, updateTyping } from "@/store/slices/chatSlice";
import { setAppState } from "@/store/slices/uiSlice";
import { setContactStatus } from "@/store/slices/userSlice";
import { createContext, useEffect } from "react";

type SocketContextType = {
  socket: typeof WebSocket;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  // console.log(currentUser);

  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.ui.appState.initState);

  useEffect(() => {
    
    // Initialize socket on mounting
    const socket = WebSocket.init();
    WebSocket.JoinUser({ id: currentUser.id });
    
    // Request user status
    WebSocket.RequestUserStatus();
    
    // socket.on("connect", () => {
      dispatch(setAppState("ready"));
    // });
    
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    socket.on("message:receive", (message: Message) => {
      // console.log("New message received: ", message);
      dispatch(addMessage(message));
    });

    socket.on("chat:created", (chat) => {
      // console.log("New chat created: ", chat);
      WebSocket.JoinChat({ id: chat.id });
      dispatch(addChat(chat));
    });

    socket.on("user:online", (statuses) => {
      statuses.forEach((status) => {
        dispatch(setContactStatus(status));
      });
    });

    socket.on("user:offline", (status) => {
      dispatch(setContactStatus(status));
    });

    socket.on("user:typing", (data) => {
      dispatch(updateTyping(data));
    });

    // cleanup on unmount
    return () => {
      socket.off("message:receive");
      socket.off("chat:created");
      WebSocket.disconnect();
    };
  }, []);

  return appState === "ready" ? (
    <SocketContext.Provider
      value={{
        socket: WebSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  ) : (
    <Loading />
  );
};
