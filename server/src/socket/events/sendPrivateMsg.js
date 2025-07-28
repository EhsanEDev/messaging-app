const sendPrivateMsg = (socket, data) => {
  console.log("Sending private message:", data);
  socket.to(`user:${data.to}`).emit("receive_private_message", {
    from: socket.data.userId,
    text: data.text,
    time: new Date().toISOString(),
  });
};

export default sendPrivateMsg;