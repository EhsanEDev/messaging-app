import AppProvider from "@/contexts/app";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <main className="flex flex-row w-full">{children}</main>
    </AppProvider>
  );
}
