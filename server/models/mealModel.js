import mongoose from "mongoose";

const mealSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    price: {
      type: Number,
      required: true,
      min: [1, "Price cannot be lower than 1"],
    },
    available: {
      type: Number,
      required: true,
      min: [0, "Can't be lower than 0"],
    },
    imgUrl: { type: String, required: true, unique: true },
    categories: [{ type: mongoose.Schema.ObjectId, ref: "category" }],
  },
  { timestamps: true }
);

export const Meal = mongoose.model("meal", mealSchema);
