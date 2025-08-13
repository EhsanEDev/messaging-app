import { io } from "socket.io-client";
import { getAccessToken } from "./accessToken";
// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : process.env.NEXT_PUBLIC_BASE_URL;

export const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
  withCredentials: true,
});
