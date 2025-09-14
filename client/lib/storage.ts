"use client";

const getAccessToken = () : string | null => {
  if (typeof window === "undefined") return null;
  const token = sessionStorage.getItem("accessToken");
  return token ? JSON.parse(token) : null;
};

const setAccessToken = (token: string) => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("accessToken", JSON.stringify(token));
};

const clearAccessToken = () => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem("accessToken");
};

export { getAccessToken, setAccessToken, clearAccessToken };
