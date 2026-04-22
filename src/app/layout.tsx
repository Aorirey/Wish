import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: "Wishly — lists worth sharing",
  description:
    "A quiet, friendly place to collect the things you love and see what your people are dreaming about.",
  metadataBase: new URL("https://wishly.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh bg-ink-50 font-sans text-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
