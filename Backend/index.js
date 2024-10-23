import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnect } from "./Config/dbConnection.js";
import userRoutes from "./Routes/userRoute.js";
import { createServer } from "http";
import configureSocket from "./Config/socketConfig.js";

dotenv.config();
dbConnect();

const app = express();
const server = createServer(app);

// Initialize Socket.IO
configureSocket(server);
  
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});