import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#020202",
};

export const metadata: Metadata = {
  // FIX: Add this line with your production domain (or localhost for dev)
  metadataBase: new URL("https://wibescheck.ekjot.me"),

  title: {
    default: "Wibes Check - Web Intelligence Engine",
    template: "%s | Wibes Check",
  },
  description: "Comprehensive OSINT analysis tool. Scan DNS records, SSL chains, server infrastructure, and security headers in seconds.",
  keywords: ["OSINT", "DNS Lookup", "SSL Checker", "Server Recon", "Web Security", "Wibes Check"],
  authors: [{ name: "Ekjot Singh", url: "https://ekjot.me" }],
  creator: "Ekjot Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wibescheck.ekjot.me",
    title: "Wibes Check - Web Intelligence Engine",
    description: "Reveal the invisible web. Instant security and infrastructure analysis for any domain.",
    siteName: "Wibes Intelligence",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wibes Check - Web Intelligence Engine",
    description: "Reveal the invisible web. Instant security and infrastructure analysis for any domain.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#020202] text-slate-300 selection:bg-indigo-500/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
