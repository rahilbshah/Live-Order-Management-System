import mongoose from "mongoose";
const CategorySchema = new mongoose.Schema(
  {
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
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    products: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
