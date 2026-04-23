import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { ThemeHydrator } from "@/components/ThemeHydrator";

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

// Мини-скрипт, который применяет класс темы ДО первой отрисовки — чтобы не было
// белой вспышки при заходе на сайт в тёмной теме.
const themeInitScript = `(function(){try{var t=localStorage.getItem('wishly:theme');var r=t==='dark'||t==='light'?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var d=document.documentElement;if(r==='dark')d.classList.add('dark');d.style.colorScheme=r;}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="min-h-dvh bg-ink-50 font-sans text-ink-900 antialiased transition-colors duration-200 dark:bg-ink-950 dark:text-ink-100">
        <ThemeHydrator />
        {children}
      </body>
    </html>
  );
}
