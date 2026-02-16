import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import groupRouter from "./routes/group.route.js";
import messageRouter from "./routes/message.route.js";

const app = express();
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Server is live");
});

app.use("/api/user", userRouter);
app.use("/api/group", groupRouter);
app.use("/api/message", messageRouter);

export default app;
