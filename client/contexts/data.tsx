"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { fetcher } from "@/lib/fetcher";
import { Chat, User } from "@/shared/types";
import { initChats } from "@/store/slices/chatSlice";
import { initContacts } from "@/store/slices/userSlice";
import { useEffect } from "react";

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.current);

  useEffect(() => {
    if (!currentUser) return;

    const loadInitialData = async () => {
      try {
        const [contactlist, chatList] = await Promise.all([
          fetcher<User[]>("/api/contact/list"),
          fetcher<Chat[]>("/api/chat/list"),
          // get messages for each chat
        ]);

        dispatch(initContacts(contactlist.data));
        dispatch(initChats(chatList.data));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    loadInitialData();
  }, [currentUser, dispatch]);

  return <>{children}</>;
};
