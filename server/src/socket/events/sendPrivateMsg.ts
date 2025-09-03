// import { MessageRepo } from "../../db/fake/repo/messages.js";

// const sendPrivateMsg = (socket, data) => {
//   console.log("Sending private message:", data);
//   const message = MessageRepo.store(
//     data.receiverId,
//     socket.data.userId,
//     data.content
//   );
//   console.log("Private message sent:", message);

//   socket.to(`user:${data.receiverId}`).emit("chat:receive-message", message);
// };

// export default sendPrivateMsg;
