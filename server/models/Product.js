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
  color: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  options: [{ title: String, additionalPrice: Number }],
});

export default mongoose.model("Product", ProductSchema);
