"use client";

import Loading from "@/components/common/loading";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { AuthService } from "@/services/auth";
import { User } from "@/shared/types";
import { selectUser } from "@/store/selectors/authSelectors";
import { cleanUser, setUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";

type AuthContextType = {
  user: User;
  signout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await AuthService.me();
        dispatch(setUser({ user }));
      } catch (err) {
        // Force to signin, cookie is invalid
        dispatch(cleanUser());
        router.push("/signin");
      }
    };

    getCurrentUser();
  }, []);

  const signout = async () => {
    dispatch(cleanUser());
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
