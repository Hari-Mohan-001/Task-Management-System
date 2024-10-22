import { errorHandler } from "../Middleware/errorHandler.js";
import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ userName, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ messge: "user created" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email,isAdmin:false });
    if (!validUser) return next(errorHandler(401, "Invalid Credentials"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));
    generateToken(res, validUser._id);
    const { password: hashedPassword, ...rest } = validUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async(req,res,next)=>{
  res.clearCookie('accessToken').status(200).json("signout success")
}
