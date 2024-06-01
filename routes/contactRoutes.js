import express from "express";
const router = express.Router();

import {
  getContact,
  getIndContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactControllers.js";

router.get("/", getContact);

router.get("/:id", getIndContact);

router.post("/", createContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

export default router;
