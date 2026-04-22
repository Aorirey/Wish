import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const display = Lora({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Wishly — списки, которыми хочется делиться",
  description:
    "Уютное место, где можно собрать всё, что вам нравится, и посмотреть, о чём мечтают ваши друзья.",
  metadataBase: new URL("https://wishly.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-dvh bg-ink-50 font-sans text-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
