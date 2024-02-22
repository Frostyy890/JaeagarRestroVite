import { Category } from "../models/categoryModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json(allCategories);
  } catch (err) {
    console.log("Error fetching Categories", err);
    res
      .status(500)
      .json({ error: `@Categories: Internal Server Error: ${err}` });
  }
};
