import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add the user email adress"],
      unique: [true, "email add is already taken"],
    },
    password: {
      type: String,
      required: [true, "please add password"],
    },
  },
  {
    timestamp: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
