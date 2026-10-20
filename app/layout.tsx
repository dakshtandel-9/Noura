import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

// The same font files as the visual mockup, bundled locally so builds work offline.
const playfair = localFont({
  src: [
    { path: "./fonts/playfair.woff2", weight: "400 500", style: "normal" },
    { path: "./fonts/playfair-italic.woff2", weight: "400 500", style: "italic" },
  ],
  display: "swap",
  variable: "--font-playfair",
});

const inter = localFont({
  src: "./fonts/inter.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-inter",
});

// Search and link-preview defaults; indexing stays off until NEXT_PUBLIC_SITE_INDEXABLE is "true".
export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#FBF9F4",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
