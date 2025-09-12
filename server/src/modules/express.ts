import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import authExpress from "../middlewares/express.js";
import authRoute from "../routes/auth.js";
import chatRoute from "../routes/chat.js";
import contactRoute from "../routes/contact.js";
import userRoute from "../routes/user.js";
import dotenv from "dotenv";
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
// app.use("/api/users", (req, res) => {
//   res.status(200).json(UserRepo.findAll());
// });

// Authorization for everything after this
app.use(authExpress);

// Protected routes
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/contact", contactRoute);