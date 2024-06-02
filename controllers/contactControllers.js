//@desc get all contacts
//@route GET /api/contact
//@access public
//@access is now private after user id is added in conatct model.

import asyncHandler from "express-async-handler";
//wrapping all function by making use of asynhandler so that try catch block is not needed. this is done so as to implement mogodb database since it gives a promise.

import model from "../models/contactModel.js";

const getContact = asyncHandler(async (req, res) => {
  const contacts = await model.find({ user_id: req.user.id });
  res.json(contacts);
});

const getIndContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await model.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.json({ contact });
});

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const contacts = await model.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.json({ contacts });
});

const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await model.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  const updatedcontact = await model.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json({ updatedcontact });
  //   res.json({ message: `update contact for ${req.params.id}` });
});

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await model.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  const deletecontact = await model.findByIdAndDelete(id);
  console.log("successfully deleted");
  res.json({ deletecontact });
  //   res.json({ message: "Contact deleted successfully" });
});

// const deleteContact = asyncHandler(async (req, res) => {
//   const id = req.params.id;

//   console.log(`Attempting to delete contact with id: ${id}`);

//   // Check if the ID is a valid MongoDB ObjectID
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     res.status(400);
//     throw new Error("Invalid contact ID");
//   }

//   // Attempt to find and delete the contact
//   const contact = await Contact.findByIdAndDelete(id);

//   if (!contact) {
//     res.status(404);
//     throw new Error("Contact not found");
//   }

//   console.log(`Successfully deleted contact with id: ${id}`);
//   res.json({ message: "Contact deleted successfully" });
// });

export {
  getContact,
  getIndContact,
  createContact,
  updateContact,
  deleteContact,
};
