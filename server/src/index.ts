import dotenv from "dotenv";
dotenv.config();

// Initialize Modules in order (Express app, HTTP server, Socket server)
import "./modules/express.js";
import { server } from "./modules/http.js";
import "./modules/socket.js";

// Start the HTTP server
server.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`Server is listening on port ${process.env.SERVER_PORT || 4000}`);
});
