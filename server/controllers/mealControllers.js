import { Meal } from "../models/mealModel.js";
import { Category } from "../models/categoryModel.js";

export const createMeal = async (req, res, next) => {
  try {
    const { name, price, available, imgUrl, categories } = req.body;
    const existingMeal = await Meal.findOne({ name });
    if (existingMeal) {
      return res.status(409).json({ message: "Meal already exists" });
    }

    const itemCategories = [];
    for (const categoryName of categories) {
      let category = await Category.findOne({ name: categoryName });
      itemCategories.push(category._id);
    }
    const newMeal = new Meal({
      name,
      price,
      available,
      imgUrl,
      categories: itemCategories,
    });
    await newMeal.save();
    console.log("Success: ", newMeal);
    res.status(201).json({
      message: "Meal was successfully created!",
      success: true,
      newMeal,
    });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `@Meal:Internal Server Error: ${err}` });
  }
};

export const getAllMeals = async (req, res) => {
  try {
    const allMeals = await Meal.find({})
      .populate("categories")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
    res.status(200).json(allMeals);
    console.log("Getting meals");
  } catch (err) {
    console.log("Error fetching meals:", err);
    res.status(500).json({ error: `@Meals: Internal Server Error: ${err}` });
  }
};
