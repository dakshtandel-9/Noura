import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
// Staging and review builds stay out of search results until launch is approved (NFR-11).
const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} — A quieter moment. A deeper connection.`,
  description: site.description,
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — By invitation`,
    description: site.description,
    images: [{ url: "/media/hero/og-image.jpg", width: 1600, height: 900, alt: "" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F4",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
