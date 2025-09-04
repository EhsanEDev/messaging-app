"use client";

import Loading from "@/components/common/loading";
import { User } from "@/constants/types";
import { fetcher } from "@/lib/fetcher";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetcher<User>("/api/user/me");
        setUser(res.data);
      } catch (err) {
        throw new Error("Failed to fetch user");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
