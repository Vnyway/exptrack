import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CubesCanvas from "@/components/CubesCanvas";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ExpTrack",
  description: "Powerful finance tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main className="flex h-[100vh] w-full">
          {children}
          <section className="w-[40%] h-full bg-[#858383]">
            <CubesCanvas />
          </section>
        </main>
      </body>
    </html>
  );
}
