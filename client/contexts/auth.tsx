"use client";

import Loading from "@/components/common/loading";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { AuthService } from "@/services/auth";
import { User } from "@/shared/types";
import { setAppState } from "@/store/slices/uiSlice";
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
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.current);
  const appState = useAppSelector((state) => state.ui.appState.initState);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await AuthService.me();
        dispatch(setCurrent(user));
        dispatch(setAppState("data-loading"));
      } catch (err) {
        // Force to signin, cookie is invalid
        dispatch(cleanCurrent());
        router.push("/signin");
      }
    };

    dispatch(setAppState("authenticating"));
    getCurrentUser();
  }, []);

  const signout = async () => {
    dispatch(cleanCurrent());
    return await AuthService.signout();
  };

  return currentUser &&
    (appState === "data-loading" ||
      appState === "socket-connecting" ||
      appState === "ready") ? (
    <AuthContext.Provider value={{ currentUser, signout }}>
      {children}
    </AuthContext.Provider>
  ) : (
    <Loading />
  );
};
