import NavBar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snake Game By Topu",
  description:
    "Full Stack Snake Game by Topu Roy. Generated by create next app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className=" bg-gray-800">
      <body className={inter.className}>
        <NavBar />
        {children}</body>
    </html>
  );
}
