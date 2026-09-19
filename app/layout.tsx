import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
