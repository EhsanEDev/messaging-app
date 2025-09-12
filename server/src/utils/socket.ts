import { ChatMetadata } from "@/shared/types.js";
import { io } from "../modules/socket.js";

export const SocketService = {
  //   joinUserToChat: (chatId: string) => {
  //     socket.join(`chat:${chatId}`);
  //   },
  //   joinUserToChats: (chatIds: string[]) => {
  //     chatIds.forEach((chatId) => {
  //       SocketService.joinUserToChat(socket, chatId);
  //     });
  //   },

  NotifyChatCreated: (chat: ChatMetadata) => {
    chat.participants.forEach((participant) => {
      io.to(`user:${participant.id}`).emit("chat:created", chat);
    });
  },
};
