import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import ClientLayout from "./ClientLayout"; // ✅ Import client wrapper

export const metadata = {
  title: "Ashik the Great | Portfolio",
  description: "Client-focused Web Developer & Designer Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0d1117] text-gray-100 antialiased scroll-smooth">
        <Navbar />
        {/* <ClientLayout> */}
          <main className="pt-24 min-h-screen">{children}</main>
        {/* </ClientLayout> */}
        <Footer />
      </body>
    </html>
  );
}
