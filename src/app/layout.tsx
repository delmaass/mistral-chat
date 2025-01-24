import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mistral Chat",
  description: "Chat with Mistral AI public API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${interFont.variable} antialiased bg-surface-primary max-h-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
