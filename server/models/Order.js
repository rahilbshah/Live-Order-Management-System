import mongoose from "mongoose";
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
    products: [
      {
        title: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        optionsName:{
          type: [String],
          required: true,
        }
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
