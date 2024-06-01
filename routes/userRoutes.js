import express from "express";

import {
  currentUser,
  loginUser,
  userRegister,
} from "../controllers/userController.js";

const userrouter = express.Router();

userrouter.post("/register", userRegister);

userrouter.post("/login", loginUser);

userrouter.get("/current", currentUser);

export default userrouter;
