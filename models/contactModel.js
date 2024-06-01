import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "please add the contact email"],
    },
    phone: {
      type: String,
      required: [true, "please add the conatct ph no"],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Contact", contactSchema);

export default model;
