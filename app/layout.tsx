import React from "react"
import type { Metadata, Viewport } from "next";
import { Dancing_Script, Quicksand } from "next/font/google";

import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "Your Valentine Garden",
  description: "A special Valentine experience just for you",
  icons: {
    icon: "/icon-v2.png",
    shortcut: "/icon-v2.png",
    apple: "/icon-v2.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#d8c4ee",
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
