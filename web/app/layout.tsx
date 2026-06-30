import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "20/80 — Productivity Platform",
  description: "Medical-grade productivity for meaningful progress.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-white text-[#233137]`}>{children}</body>
    </html>
  );
}
