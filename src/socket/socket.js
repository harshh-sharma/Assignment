import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const initSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      console.log("Incoming connection with token", token);

      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      console.log("user",user,"decode", decoded)

      if (!user) return next(new Error("User not found"));

      socket.user = user;
      console.log("Authenticated user:", user.name);
      next();
    } catch (error) {
      console.log("Auth error", error.message);
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected", socket.user.name); 
    console.log("Socket ID", socket.id);

    socket.on("join_group", (groupId) => {
      console.log(socket.user.name, "joined group", groupId);
      socket.join(groupId);
    });

    socket.on("send_message", ({ groupId, text }) => {
      console.log("Send message event received", { groupId, text })

      if (!groupId || !text) return;

      const messageData = {
        _id: Date.now().toString(),
        text,
        senderId: {
          _id: socket.user._id,
          name: socket.user.name,
        },
        groupId,
        createdAt: new Date(),
      };

      console.log("Broadcasting message", messageData)

      io.to(groupId).emit("receive_message", messageData);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.user.name); 
    });
  });
};

export default initSocket;
