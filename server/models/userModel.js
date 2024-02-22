import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  orders: [{ type: mongoose.Schema.ObjectId, ref: "order" }],
  cartItems: [
    {
      productId: { type: mongoose.Schema.ObjectId, ref: "meal" },
      quantity: {
        type: Number,
        default: 0,
        min: [0, "Quantity can't be a negative value"],
      },
    },
  ],
});

export const User = mongoose.model("user", userSchema);
