import express from "express";
const router = express.Router();

import {
  getContact,
  getIndContact,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactControllers.js";

import validateToken from "../middleware/validateTokenHandler.js";

router.use(validateToken);
//can do it individually on each routes as in userroutes current

router.get("/", getContact);

router.get("/:id", getIndContact);

router.post("/", createContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

export default router;
