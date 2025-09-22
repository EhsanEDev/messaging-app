"use client";

import Loading from "@/components/common/loading";
import { AuthService } from "@/services/auth";
import { User } from "@/shared/types";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User;
  signout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await AuthService.me();
        setUser(user);
      } catch (err) {
        // Force to signin, cookie is invalid
        setUser(null);
        router.push("/signin");
      }
    };

    getCurrentUser();
  }, []);

  const signout = async () => {
    setUser(null);
    return await AuthService.signout();
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
