"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/chat");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return <Loading />;
}
