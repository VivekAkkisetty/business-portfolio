import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "./site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Vivek Tech — Premium Websites & Digital Experiences",
  description:
    "Vivek Tech is a founder-led digital studio building premium websites, digital experiences and AI-powered solutions for ambitious businesses.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vivek Tech — Premium Websites & Digital Experiences",
    description:
      "Founder-led digital studio building premium websites, digital experiences and AI-powered solutions for ambitious businesses.",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vivek Tech — Premium Websites & Digital Experiences",
    description:
      "Founder-led digital studio building premium websites, digital experiences and AI-powered solutions for ambitious businesses.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
