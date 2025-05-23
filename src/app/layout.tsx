import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Sections/Navbar";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "MagicAuth",
  description: "Passwordless authentication using magic links",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen w-full bg-[#0B0121] text-white font-sans antialiased">
        <Navbar />
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
