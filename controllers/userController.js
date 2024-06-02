import asyncHandler from "express-async-handler";

import userModel from "../models/userModel.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

//register user

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("all fields are needed");
  }
  const userAvailable = await userModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already regsitered");
  }
  const hashpassword = await bcrypt.hash(password, 10);
  console.log(`hashed pwd : ${hashpassword}`);
  const user = await userModel.create({
    username,
    email,
    password: hashpassword,
  });
  console.log(`user created ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user datat not valid");
  }
  //   res.json({ message: "register the user" });
});
//
//
//

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields needed");
  }
  const user = await userModel.findOne({ email });
  if (user) {
    const ans = await bcrypt.compare(password, user.password);
    if (ans) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password not valid");
    }
  } else {
    res.status(401);
    throw new Error("User not found");
  }

  //   res.json({ message: "login the user" });
});

//current user info
const currentUser = asyncHandler(async (req, res) => {
  //   res.json({ message: "current user information" });
  res.json(req.user);
});

export { userRegister, loginUser, currentUser };
