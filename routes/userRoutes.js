import express from "express";
const userrouter = express.Router();

userrouter.post("/register", (req, res) => {
  res.json({ message: "register the user" });
});

userrouter.post("/login", (req, res) => {
  res.json({ message: "login the user" });
});

userrouter.get("/current", (req, res) => {
  res.json({ message: "current user info" });
});

export default userrouter;
