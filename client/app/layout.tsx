import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "copo",
  description:
    "A global pomodoro timer of 25/5 minute intervals. During the 5-minute breaks, a global chat lets everyone interact with each other.",
};

const nunito = Nunito({ subsets: ["latin-ext"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  );
}
