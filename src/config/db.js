import mongoose from "mongoose"

const connectionToDb = async () => {
    try {
         await mongoose.connect("mongodb://localhost:27017/slack");
         console.log("Database successfully connected");
    } catch (error) {
        onsole.error("Database connection failed", error.message);
        process.exit(1); 
    }
}

export default connectionToDb;