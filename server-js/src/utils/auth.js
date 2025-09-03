import jwt from "jsonwebtoken";
import cookie from "cookie";

const Auth = {
  getUserFromCookie(source) {
    let cookies;

    if (source?.cookies) {
      // Express request (thanks to cookie-parser)
      cookies = source.cookies;
    } else if (source?.handshake?.headers?.cookie) {
      // Socket.IO handshake
      cookies = cookie.parse(source.handshake.headers.cookie);
    } else if (typeof source === "string") {
      // Raw cookie header string
      cookies = cookie.parse(source);
    } else {
      return null;
    }
    
    const token = cookies?.authToken;
    if (!token) return null;

    try {
      return this.verifyToken(token);
    } catch (err) {
      return null;
    }
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  },
};

export default Auth;
