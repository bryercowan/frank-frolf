import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frank's Frolf tracker",
  description: "A simple app to track your frolf games.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <div className="flex h-screen flex-col md:overflow-hidden bg-gradient-to-r from-green-500 to-blue-500">
          <header className="flex justify-between items-center p-5 bg-gradient-to-r from-blue-500 to-green-500">
            <Link href={"/"}>
              <h2 className="text-2xl text-gray-300">
                Frank&apos;s Frolf Tracker
              </h2>
            </Link>
            <Link href={"/scorecards"}>
              <h2 className="text-2xl text-gray-300">Past Scorecards</h2>
            </Link>
          </header>
          <div className="flex-grow">
            <div className="dark:text-white bg-[url('/disc-golf-evolution.svg')]">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
