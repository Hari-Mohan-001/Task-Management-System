import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import { dbConnect } from "./Config/dbConnection.js";
dotenv.config();
dbConnect()


const app = express();

app.use(
    cors({
      origin: process.env.FRONTEND_BASE_URL,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

// app.use("/api/user", userRoutes);
// app.use("/api/userAuth", userAuthRoutes);


app.use((err, req,res,next)=>{
    const statusCode = err.statusCode||500
    const message = err.message||"Internal server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode 
    })
})
