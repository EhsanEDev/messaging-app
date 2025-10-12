import { Chat, Message, Member, Typing, UserStatus } from "@/shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Record<
  string,
  {
    meta: Chat;
    messages: Message[];
    status: { typing: string[] };
  }
> = {};

const chatSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    initChats: (state, action: PayloadAction<Chat[]>) => {
      const chats = action.payload;
      chats.forEach((chat) => {
        if (!state[chat.id]) {
          state[chat.id] = {
            meta: chat,
            messages: [],
            status: { typing: [] },
          };
        } else {
          state[chat.id].meta = chat;
        }
      });
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      const chat = action.payload;
      if (!state[chat.id]) {
        state[chat.id] = {
          meta: chat,
          messages: [],
          status: { typing: [] },
        };
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
        state[chatId] = {
          meta: {} as Chat,
          messages: messages,
          status: { typing: [] },
        };
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
            ...state[message.chatId],
            meta: { lastMessage: message } as Chat,
          };
        }
      } else {
        state[message.chatId] = {
          meta: {} as Chat,
          messages: [message],
          status: { typing: [] },
        };
      }
    },
    updateTyping: (state, action: PayloadAction<Typing>) => {
      // console.log("Typing status update: ", action.payload);
      const { id, username, isTyping } = action.payload;
      if (state[id]) {
        if (isTyping) {
          state[id].status.typing.push(username);
        } else {
          state[id].status.typing = state[id].status.typing.filter(
            (name) => name !== username
          );
        }
      } else {
        state[id] = {
          meta: {} as Chat,
          messages: [],
          status: { typing: [username] },
        };
      }
    },
  },
});

export const { initChats, addChat, initMessages, addMessage, updateTyping } =
  chatSlice.actions;
export default chatSlice.reducer;
