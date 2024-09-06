import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect, usePathname } from "next/navigation";
import { headers } from "next/headers";

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
          <div>
            <div className="w-full mx-auto">
              <div className="items-center">
                <h2 className="py-5 px-3 text-center text-2xl text-gray-300">
                  Frank&apos;s Frolf Tracker
                </h2>
              </div>
            </div>
            <div className="flex-grow">
              <div className="dark:text-white bg-[url('/disc-golf-evolution.svg')]">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
