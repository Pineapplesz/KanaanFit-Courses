import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
/*Main text */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});
/*H1-H3, Logo */
/*need to test Plus Jakarta Sans instead of Manrope */
const fontHeading = Manrope({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Kanaan Fit",
  description: "Красивое и здоровое тело под руководством реабилитолога",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${fontHeading.variable} h-full antialiased`}
    >
      <body className="min-h-svh flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="shrink-0">footer</footer>
      </body>
    </html>
  );
}
