import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const initSocket = (io) => {

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) return next(new Error("User not found"));

      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {

    console.log("User connected:", socket.user.name);

    socket.on("join_group", (groupId) => {
      socket.join(groupId);
    });

    socket.on("send_message", async ({ groupId, content }) => {

      const messageData = {
        content,
        sender: socket.user._id,
        groupId,
        orgId: socket.user.orgId,
        createdAt: new Date()
      };

      io.to(groupId).emit("receive_message", messageData);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });
};

export default initSocket;
