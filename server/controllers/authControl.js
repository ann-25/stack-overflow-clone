/*Backend of Authentication */
import subscriptions from "../models/subscriptionsModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/authModel.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const newSubscribtion = await subscriptions.create({
      email,
      amount: "0",
      subcription: "false",
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );

    res.status(200).json({ result: newUser, newSubscribtion, token });
  } catch (error) {
    res.status(500).json("something went wrong...");
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existinguser = await users.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User doesnot exist." });
    }

    const isPasswordCrct = await bcrypt.compare(
      password,
      existinguser.password
    );
    if (!isPasswordCrct) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    res.status(200).json({ result: existinguser, token });
  } catch (error) {
    res.status(500).json("something went wrong...");
    console.log(error);
  }
};
