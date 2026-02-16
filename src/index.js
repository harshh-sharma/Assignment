import dotenv from "dotenv";
import express from "express";
import connectionToDb from "./config/db.js";
import userRouter from "./routes/user.route.js";
import groupRouter from "./routes/group.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
connectionToDb();

app.get('/',(req, res) => {
    return res.send('Server is live');
})


app.use('/api/user', userRouter);
app.use('/api/group', groupRouter);

app.listen(PORT, () => {
    console.log(`server successfully running on http://localhost:${PORT}`);
})