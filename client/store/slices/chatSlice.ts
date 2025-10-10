import { Chat, Message } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<string, { meta: Chat; messages: Message[] }> = {};

const chatSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    initChats: (state, action: PayloadAction<Chat[]>) => {
      const chats = action.payload;
      chats.forEach((chat) => {
        if (!state[chat.id]) {
          state[chat.id] = { meta: chat, messages: [] };
        } else {
          state[chat.id].meta = chat;
        }
      });
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      if (!state[chat.id]) {
        state[chat.id] = { meta: chat, messages: [] };
      } else {
        state[chat.id].meta = chat;
      }
    },
    initMessages: (
      state,
      action: PayloadAction<{ chatId: string; messages: Message[] }>
    ) => {
      const { chatId, messages } = action.payload;
      if (!state[chatId]) {
        state[chatId] = { meta: {} as Chat, messages: messages };
      } else {
        state[chatId].messages = messages;
      }
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      if (state[message.chatId]) {
        state[message.chatId].messages.push(message);
        if (state[message.chatId].meta) {
          state[message.chatId].meta = {
            ...state[message.chatId].meta,
            lastMessage: message,
          };
        } else {
          state[message.chatId] = {
            meta: { lastMessage: message } as Chat,
            messages: [message],
          };
        }
      } else {
        state[message.chatId] = { meta: {} as Chat, messages: [message] };
      }
    },
  },
});

export const { initChats, addChat, initMessages, addMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
