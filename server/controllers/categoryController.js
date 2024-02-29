import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    return res
      .status(201)
      .json({ newCategory, message: "Category has been Created." });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
