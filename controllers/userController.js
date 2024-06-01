import asyncHandler from "express-async-handler";

import userModel from "../models/userModel.js";

import bcrpyt from "bcrypt";

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
  const hashpassword = await bcrpyt.hash(password, 10);
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

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login the user" });
});

const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user" });
});

export { userRegister, loginUser, currentUser };
