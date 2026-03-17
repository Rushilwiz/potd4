import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { VisitorProvider } from "@/components/VisitorContext";

const inter = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Visitor Management System",
  description: "POTD4 for DBMS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <nav>
          <div className="flex text-blue-900 bg-gray-200 items-center justify-between p-4">
            <h1 className="text-xl font-bold">Visitor Management System</h1>
            <div className="flex gap-4">
              <Link href="/" className="hover:underline">
                home
              </Link>
              <Link href="/visitors" className="hover:underline">
                visitors
              </Link>
              <Link href="/login" className="hover:underline">
                sign in
              </Link>
            </div>
          </div>
        </nav>
        <VisitorProvider>{children}</VisitorProvider>
      </body>
    </html>
  );
}
