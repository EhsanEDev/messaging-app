"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex h-screen items-center justify-center flex-col gap-4">
      <img src="/logo.svg" alt="Logo" className="w-24 h-24 animate-pulse" />
      <p className="text-xl font-medium">Loading...</p>
    </main>
  );
}
