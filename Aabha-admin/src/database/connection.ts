import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const MONGO_URL = process.env.MONGO_DATABASE;

if (!MONGO_URL) {
    throw new Error("MONGO_DATABASE environment variable is not defined");
}

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
};

export default connect;