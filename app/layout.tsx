import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FlightPathBackground } from "@/components/layout/flight-path-background";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Taylor Travels",
    template: "%s | Taylor Travels",
  },
  description:
    "Clean, practical travel inspiration for solo travelers, couples, and groups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <div className="relative flex min-h-full flex-col">
          <FlightPathBackground />
          <div className="relative z-10">
            <SiteHeader />
          </div>
          <main className="relative z-10 flex-1">{children}</main>
          <div className="relative z-10">
            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
