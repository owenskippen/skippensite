import type { Metadata } from "next";
import { Fredoka, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Owen Skippen — Software Developer",
  description:
    "Owen Skippen is a Computer Systems Technology student and software developer based in Vancouver, BC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${fredoka.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
