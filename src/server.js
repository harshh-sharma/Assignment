import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectionToDb from "./config/db.js";
import app from "./app.js";
import initSocket from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectionToDb();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

initSocket(io);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
