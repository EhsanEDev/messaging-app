import { ThemeProvider } from "@/contexts/theme";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Messaging App",
  description: "Messaging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
