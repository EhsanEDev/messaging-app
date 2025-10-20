import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authExpress from "../middlewares/express.js";
import authRoute from "../routes/auth.js";
import chatRoute from "../routes/chat.js";
import contactRoute from "../routes/contact.js";
import userRoute from "../routes/user.js";
dotenv.config();

//Create an Express application
export const app = express();

// Middlewares
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_BASE_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use("/api/auth", authRoute);
app.use("/api/hi", (req, res) => {
  console.log("requested 'hi' api endpoint");
  const origin = req.headers.origin;
  res.status(200).send(`<h2>${origin}</h2><p>Hello dear client, this is messaging app's server</p>`);
});

// Authorization for everything after this
app.use(authExpress);

// Protected routes
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/contact", contactRoute);