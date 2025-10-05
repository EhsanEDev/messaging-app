"use client";

import Loading from "@/components/common/loading";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { AuthService } from "@/services/auth";
import { User } from "@/shared/types";
import { cleanCurrent, setCurrent } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";

type AuthContextType = {
  currentUser: User;
  signout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.user.current);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await AuthService.me();
        dispatch(setCurrent(user));
      } catch (err) {
        // Force to signin, cookie is invalid
        dispatch(cleanCurrent());
        router.push("/signin");
      }
    };

    getCurrentUser();
  }, []);

  const signout = async () => {
    dispatch(cleanCurrent());
    return await AuthService.signout();
  };

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ currentUser, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
