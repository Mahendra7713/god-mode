import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProjectLayout from "./ProjectLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "God Mode",
  description: "Welcome to the God Mode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProjectLayout>{children}</ProjectLayout>
      </body>
    </html>
  );
}
