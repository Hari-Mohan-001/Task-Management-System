import express from "express"
import { signIn, signOut, signUp } from "../Controller/userController.js"
import { addTask, deleteTask, editTask, getAllTask, getChartData } from "../Controller/taskController.js"
import { verifyToken } from "../Middleware/verifyToken.js"

const userRouter = express.Router()

userRouter.post("/signUp", signUp)
userRouter.post("/signIn",signIn)
userRouter.post("/task", verifyToken, addTask)
userRouter.get("/task/:userId", verifyToken,getAllTask)
userRouter.put("/task",verifyToken, editTask)
userRouter.delete("/task/:taskId", verifyToken,deleteTask)
userRouter.get("/chartData/:userId",verifyToken,getChartData)
userRouter.get("/signout",verifyToken,signOut)

export default userRouter 