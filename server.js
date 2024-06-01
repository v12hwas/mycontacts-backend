import express from "express";
import dotenv from "dotenv";
dotenv.config();

import router from "../mycontacts-backend/routes/contactRoutes.js";

import errorHandler from "./middleware/errorHandler.js"; //auto imported on calling app.use(errorHandler)

import connectDb from "./config/dbConnection.js";
//auto import on calling connectdb

const app = express();

const port = process.env.PORT || 5000;

connectDb();

//middlewares
app.use(express.json()); //to get req body

app.use("/api/contacts", router);

app.use(errorHandler);
// to get error message in req body if empty in json format and not html after handling the error in create contact

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
