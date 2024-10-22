import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  try {
    const connectionString = process.env.MONGOOSE_CONNECTION_STRING;    
    
    if (!connectionString) {
      throw new Error("Mongoose Connection string not defined");
    }
    await mongoose.connect(connectionString);
    console.log("db connected succesfully");
  } catch (error) {
    if (error instanceof Error) {
      console.log(`db connection error ${error.message}`);
    } else {
      console.log(`unexpected error ${error}`);
    } 
  }
};