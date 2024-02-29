import mongoose from "mongoose";
import { ProductSchema } from "./Product.js";
const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    products:  [{
      title: {
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
      options: [{
        title: String,
      }]
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
