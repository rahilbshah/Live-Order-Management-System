import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  catSlug: {
    type: String,
  },
  options: [{ title: String, additionalPrice: Number }],
});

export default mongoose.model("Product", ProductSchema);
export { ProductSchema };