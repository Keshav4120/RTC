import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        const { MONGO_URI } = process.env;
        if(!MONGO_URI) throw new Error("Mongo_URI is not set");

        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB Connected : " , conn.connection.host);
    } catch (error) {
        console.error("Error connectiion to MongoDB : " , error)
        process.exit(1); // 1 mean fail , 0 mean succeess
    }
}