import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "./Components/Sections/Navbar";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: "MagicAuth",
    template: "%s | MagicAuth"
  },
  description: "Passwordless authentication using magic links",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className="min-h-screen w-full bg-[#0B0121] text-white font-sans antialiased">
        {/* Global Suspense boundary for all client-side components */}
        <Suspense fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-[#0B0121]">
            <div className="animate-pulse">Loading...</div>
          </div>
        }>
          <Navbar />
          <main className="w-full">
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  );
}