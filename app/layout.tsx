import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/providers/StoreProvider";
import { APP_CONFIG } from "@/constants/app.constants";
import OpticBackground from "@/components/common/OpticBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: APP_CONFIG.APP_TITLE,
  description: APP_CONFIG.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans relative">
        <OpticBackground />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
