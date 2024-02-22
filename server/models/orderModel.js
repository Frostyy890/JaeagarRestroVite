import mongoose from "mongoose";
import { Meal } from "./mealModel.js";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: mongoose.Schema.ObjectId, ref: "meal" },
        quantity: {
          type: Number,
          default: 0,
          min: [0, "Quantity can't be a negative value"],
        },
      },
    ],
    customerId: { type: mongoose.Schema.ObjectId, ref: "user" },
    status: {
      type: String,
      enum: ["Pending", "Complete", "Preparing"],
      default: "Pending",
    },
    total: { type: Number, default: 0 },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  try {
    let total = 0;
    for (const item of this.items) {
      const product = await Meal.findById(item.productId);
      total += product.price * item.quantity;
    }
    this.total = total;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export const Order = mongoose.model("order", orderSchema);
