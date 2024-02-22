// OTHER IMPORTS
import express from "express";
import cors from "cors";
import mongoose, { model } from "mongoose";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

// DATA IMPORTS
import dataMeal from "./data/meals.js";
import dataCategories from "./data/categories.js";

// MODEL IMPORTS
import { Meal } from "./models/mealModel.js";
import { User } from "./models/userModel.js";
import { Category } from "./models/categoryModel.js";

// ROUTE IMPORTS
import { authRouter } from "./routes/authRoute.js";
import { mealRouter } from "./routes/mealRoute.js";
import { categoryRouter } from "./routes/categoryRoute.js";
import { orderRouter } from "./routes/orderRoute.js";
import { userRouter } from "./routes/userRoute.js";
// CONFIG
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(cookieParser());

// ROUTES
app.use("/", authRouter);
app.use("/meals", mealRouter);
app.use("/categories", categoryRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);

// CONNECTION
const { MONGO_URL, PORT } = process.env;
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // updateModel();
    const defaultValue = [];
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

    // INSERTING MEAL DATA TO THE DATABASE !DON'T REPEAT THE PROCESS AGAIN!
    // Meal.insertMany(dataMeal);

    // INSERTING CATEGORIES DATA TO THE DATABASE !DON'T REPEAT THE PROCESS AGAIN!
    // Category.insertMany(dataCategories);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    throw err;
  });

async function updateModel() {
  try {
    const usersToUpdate = await User.find({ cartItems: { $exists: false } });

    for (const user of usersToUpdate) {
      user.cartItems = [];
      await user.save();
      console.log(`Updated user ${user._id}`);
    }

    console.log("All users updated successfully");
  } catch (error) {
    console.error("Error updating users:", error);
  } finally {
    mongoose.disconnect();
  }
}
