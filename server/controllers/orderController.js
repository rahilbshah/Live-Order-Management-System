import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const newOrder = await Order.create({ ...req.body, userEmail: user.email });
    return res
      .status(201)
      .json({ newOrder, message: "Order has been Created." });
  } catch (error) {
    console.error("Error creating Order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.isAdmin) {
      const order = await Order.findByIdAndUpdate(id, {
        status: req.body.status,
      });
      return res
        .status(200)
        .json({ order, message: "Order Status has been Updated." });
    } else {
      return res.status(401).json({ error: "You are not authorized" });
    }
  } catch (error) {
    console.error("Error creating Order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
export const getOrders = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const allOrders = await Order.find();
      return res.status(200).json(allOrders);
    } else {
      const user = await User.findById(req.user.id);
      const userOrders = await Order.find({ userEmail: user.email });
      return res.status(200).json(userOrders);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
