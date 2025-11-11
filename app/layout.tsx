import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Ashik the Great | Portfolio",
  description: "Client-focused Web Developer & Designer Portfolio",
  themeColor: "#0d1117",
  icons: {
    icon: "/favicon.jpeg", // browser tab icon
    apple: "/favicon-180x180.png", // iOS devices
    other: [
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon & Apple Touch Icon */}
        <link rel="icon" href="/favicon.jpeg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#0d1117" />
      </head>
      <body className="bg-[#0d1117] text-gray-100 antialiased scroll-smooth">
        <Navbar />
        <main className="pt-24 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
