import { ThemeProvider } from "@/contexts/theme";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chapar",
  description: "Messaging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
