import http from "http";
import { app } from "./express.js";

//Create an HTTP server with the Express app
export const server = http.createServer(app);