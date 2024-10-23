import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  try {
    const connectionString = 'mongodb+srv://hari1111mohan:L1kbPbdteOjoj2Bs@cluster0.qc5zo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';    
    console.log('the uri',process.env.MONGOOSE_CONNECTION_STRING);
    
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