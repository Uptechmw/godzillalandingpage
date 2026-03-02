import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Godzilla AI – Multi-Model AI Development Platform for Production Software",
  description: "Godzilla AI is a secure multi-model AI coding platform built for production software engineering teams. Local execution, enterprise-grade authentication, and deterministic billing.",
  keywords: "AI development platform, AI coding platform, Multi-model AI, AI software engineering tool, AI code assistant for developers, Production-grade AI coding",
  openGraph: {
    title: "Godzilla AI – Multi-Model AI Development Platform",
    description: "The secure infrastructure for production-grade AI coding.",
    url: "https://godzillaai.dev",
    siteName: "Godzilla AI",
    images: [
      {
        url: "/images/enterprise/hero.png",
        width: 1200,
        height: 630,
        alt: "Godzilla AI Workstation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Godzilla AI – Multi-Model AI Development Platform",
    description: "Secure infrastructure for production-grade AI coding.",
    images: ["/images/enterprise/hero.png"],
  },
};

import { ToastProvider, ToastInitializer } from "@/components/ui/toast";
import SeoJsonLd from "@/components/seo/SeoJsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <SeoJsonLd />
      </head>
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <ToastProvider>
          <ToastInitializer />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
