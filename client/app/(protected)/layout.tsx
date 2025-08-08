import SignoutButton from "@/components/auth/signoutButton";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-800 text-white p-4">
        Sidebar
      </aside>
      <div className="flex-1">
        <header className="bg-gray-800 text-white p-4 flex justify-between">
          <h1 className="text-lg font-bold">Telegraph</h1>
          <SignoutButton />
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
