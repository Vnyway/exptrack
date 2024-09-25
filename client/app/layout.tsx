import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ExpTrack",
  description: "Powerful finance tracker",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main className="flex w-full">
          <Navbar />

          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
