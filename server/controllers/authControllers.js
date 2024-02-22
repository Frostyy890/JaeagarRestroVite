import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createSecretToken } from "../util/secretToken.js";

export const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      orders: [],
      cartItems: [],
    });
    await newUser.save();
    console.log(newUser);
    const token = createSecretToken(newUser._id);
    res.cookie("token", token, { withCredentials: true, httpOnly: true });
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      newUser,
      token: token,
    });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email })
      .populate("cartItems.productId")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
    if (!existingUser) {
      return res.json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, existingUser.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(existingUser._id);
    res.cookie("token", token, { withCredentials: true, httpOnly: true });
    res.status(202).json({
      message: "User logged in successfully",
      success: true,
      existingUser,
      token: token,
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
