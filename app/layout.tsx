import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://erfanhassan.sonictch.com'),
  title: {
    default: "Best AI Automation Agency & Experienced AI Developer | Erfan Hassan",
    template: "%s | Erfan Hassan - Best AI Automation Agency"
  },
  description:
    "Erfan Hassan is an experienced AI developer running the best AI automation agency in Bangladesh. Specializing in AI automation, custom agents, and scalable web applications to grow your business.",
  keywords: [
    "best ai automation agency", 
    "ai developer", 
    "experienced ai developer", 
    "best ai automation in bangladesh", 
    "ai automation bangladesh", 
    "experienced AI automation", 
    "AI Agents",
    "custom AI development",
    "LLM development",
    "generative AI agency",
    "AI medical assistant developer",
    "Full Stack Developer", 
    "Erfan Hassan"
  ],
  authors: [{ name: "Erfan Hassan" }],
  creator: "Erfan Hassan",
  openGraph: {
    title: "Best AI Automation Agency & Experienced AI Developer in Bangladesh",
    description: "Erfan Hassan is an experienced AI developer running the best AI automation agency in Bangladesh. Specializing in custom AI agents and workflow automation.",
    url: '/',
    siteName: 'Erfan Hassan - AI Automation Agency',
    locale: 'en_US',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best AI Automation Agency & Experienced AI Developer",
    description: "Experienced AI developer providing the best AI automation in Bangladesh.",
    creator: '@erfanhassan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'tFnjHplns5blI0qsWVHxWqvFMJYV1u6QlQgAPRPrykw',
  },
};

import type { Viewport } from 'next';
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="min-h-full bg-[#0a0a0a] text-[#f0f0f0] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
