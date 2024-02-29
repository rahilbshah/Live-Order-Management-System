import { body } from "express-validator";
import User from "../models/User";

export const registerValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
    body("email").isEmail().withMessage("Email is not valid").custom(async value=>{
      const user = await User.findOne({email:value})
      if(user){
        throw new Error('Email is already in the use')
      }
    }),
  ];
};

export const loginValidationRules = () => {
  return [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};
