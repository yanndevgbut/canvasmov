import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Moventra Canvas — Turn Words Into Art",
    template: "%s | Moventra Canvas",
  },
  description:
    "Generate stunning AI images from text prompts instantly. Free, fast, and beautifully simple.",
  keywords: ["AI image generator", "text to image", "AI art", "image generation"],
  openGraph: {
    title: "Moventra Canvas",
    description: "Turn words into art. Instantly.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moventra Canvas",
    description: "Turn words into art. Instantly.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
