import express from "express";

import {
  currentUser,
  loginUser,
  userRegister,
} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const userrouter = express.Router();

userrouter.post("/register", userRegister);

userrouter.post("/login", loginUser);

userrouter.get("/current", validateToken, currentUser);

export default userrouter;
