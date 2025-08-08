"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignoutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Logout failed");

      router.push("/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button variant="secondary" onClick={handleSignout}>
      Signout
    </Button>
  );
}
