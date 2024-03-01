import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    return res
      .status(201)
      .json({ newProduct, message: "Product has been Created." });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching Product by ID:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getAllProduct = async (req, res) => {
  const cat = req.query.cat;
  try {
    let products;
    if (cat) {
      products = await Product.find({ catSlug: cat });
    } else {
      products = await Product.find({ isFeatured: true });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({message:"Product has been Deleted"});
  } catch (error) {
    console.error("Error Deleting product:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
