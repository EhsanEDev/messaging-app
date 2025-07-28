const registerUser = (socket, data) => {
  console.log("User connected:", data);
  socket.join(`user:${data.userId}`);
  socket.join(`group:family`);
  socket.data.userId = data.userId;
};

export default registerUser;
