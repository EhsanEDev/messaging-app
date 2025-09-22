import Asidebar from "@/components/aside/aside";
import AppProvider from "@/contexts/app";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <main className="flex flex-row w-full">
        <Asidebar />
        {children}
      </main>
    </AppProvider>
  );
}
