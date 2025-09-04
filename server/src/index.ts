import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import contactRoute from "./routes/contact.js";
import authExpress from "./middlewares/authExpress.js";
import { UserRepo } from "./db/fake/repo/users.js";
import dotenv from "dotenv";

dotenv.config();

//Create an Express application
export const app = express();
//Create an HTTP server with the Express app
export const server = http.createServer(app);

app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_BASE_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/users", (req, res) => {
  res.status(200).json(UserRepo.findAll());
});
// Auth for everything after this
app.use(authExpress);
app.use("/api/user", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/contact", contactRoute);

server.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`Server is listening on port ${process.env.SERVER_PORT || 4000}`);
});
