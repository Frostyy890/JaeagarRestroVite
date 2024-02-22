import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(402).json({
      status: false,
      message: "You don't have credentials to perform the following actions",
    });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).json({ status: false });
    }

    next();
  });
};
