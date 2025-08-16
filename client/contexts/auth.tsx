"use client";

import { User } from "@/constants/types";
import { createContext } from "react";

export const AuthContext = createContext<User | null>(null);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  user: User;
}> = ({ children, user }) => (
  <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
);
