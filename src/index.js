import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/',(req, res) => {
    return res.send('Server is live');
})

app.listen(PORT, () => {
    console.log(`server successfully running on http://localhost:${PORT}`);
})