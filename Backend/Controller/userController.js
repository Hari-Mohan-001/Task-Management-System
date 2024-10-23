import { errorHandler } from "../Middleware/errorHandler.js";
import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateAuthToken.js";

export const signUp = async (req, res, next) => {
  try {
    console.log(req.body);

    const { name, email, mobile, password } = req.body;
    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(400).json({ message: "This user already exist" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ name, email, mobile, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "user created" });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Credentials"));
    generateToken(res, validUser._id);
    const { password: hashedPassword, ...rest } = validUser._doc;
    res.status(200).json({ message: "Sign in successfull", data: rest });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const signOut = async (req, res, next) => {
  res
    .clearCookie("accessToken")
    .status(200)
    .json({ message: "signout success" });
};
