"use client";
import Loading from "@/components/common/loading";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetcher } from "@/lib/fetcher";
import { Chat, Contact } from "@/shared/types";
import { store } from "@/store";
import { initChats } from "@/store/slices/chatSlice";
import { setAppState } from "@/store/slices/uiSlice";
import { initContacts } from "@/store/slices/userSlice";
import { useEffect } from "react";

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state.ui.appState.initState);
  // const { currentUser } = useAuth();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [contactlist, chatList] = await Promise.all([
          fetcher<Contact[]>("/api/contact/list"),
          fetcher<Chat[]>("/api/chat/list"),
          // get messages for each chat
        ]);
        dispatch(initContacts(contactlist.data));
        dispatch(initChats(chatList.data));
        dispatch(setAppState("socket-connecting"));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    loadInitialData();
  }, [dispatch]);

  return appState === "socket-connecting" || appState === "ready" ? (
    <>{children}</>
  ) : (
    <Loading />
  );
};
