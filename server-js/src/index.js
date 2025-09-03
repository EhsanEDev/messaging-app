import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { UserRepo } from "./db/fake/repo/users.js";
import authExpress from "./middlewares/authExpress.js";
import authorization from "./routes/auth.js";
import chat from "./routes/chat.js";
import contact from "./routes/contact.js";

//Create an Express application
const app = express();
//Create an HTTP server with the Express app
export const server = http.createServer(app);

app.use(cookieParser());
app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authorization);
app.use("/api/users", (req, res) => {
  res.status(200).json(UserRepo.findAll());
});
// Auth for everything after this
app.use(authExpress);
app.use("/api/chat", chat);
app.use("/api/contact", contact);

server.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
