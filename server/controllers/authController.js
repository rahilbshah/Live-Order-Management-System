import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

export const register = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(req.body.password, salt);
  try {
    const newUser = new User({ ...req.body, password: hash });
    const savedUser = await newUser.save();
    const { password, isAdmin, ...otherDetails } = savedUser._doc;
    return res.status(201).json({
      details: otherDetails,
      message: "Registration successful! Welcome aboard!",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const validity = bcryptjs.compareSync(req.body.password, user.password);
      if (validity) {
        const token = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          process.env.JWT,
          { expiresIn: "5d" }
        );
        const { password, ...otherDetails } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({
            details: otherDetails,
            message: "Welcome back! You are now logged in.",
          });
      } else {
        return res.status(400).json({ error: "Wrong Password" });
      }
    } else {
      return res.status(404).json({ error: "User Does not Exist" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
