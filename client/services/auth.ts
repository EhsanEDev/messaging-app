import { fetcher } from "@/lib/fetcher";
import { AuthResult, User } from "@/shared/types";

export const AuthService = {
  signup: async (data: { username: string; password: string; }) => {
    const res = await fetcher<AuthResult>("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      // Signed up successfully
      if (!res.data.user) {
        throw Error("Something went wrong");
      }
      return res.data.user;
    } else if (res.status === 401) {
      // Signup failed
      throw Error(res.data.message);
    } else {
      // Unknown error
      throw Error("Something went wrong");
    }
  },

  signin: async (data: {
    username: string;
    password: string;
  }): Promise<User> => {
    const res = await fetcher<AuthResult>("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      // Signed in successfully
      if (!res.data.user) {
        // Unexpected response
        throw Error("Something went wrong");
      }
      return res.data.user;
    } else if (res.status === 401) {
      // Signin failed
      throw Error(res.data.message);
    } else {
      // Unknown error
      throw Error("Something went wrong");
    }
  },

  signout: async () => {
    const res = await fetcher("/api/auth/signout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      return;
    } else {
      // Unexpected response
      throw Error("Something went wrong");
    }
  },

  me: async () => {
    const res = await fetcher<User>("/api/user/me");
    if (res.status === 200) {
      return res.data;
    } else {
      // Unexpected response
      throw Error("Something went wrong");
    }
  },
};
