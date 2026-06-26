import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Inter,
  Amiri,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import SiteHeader from "@/components/SiteHeader";

// — Latin display: Fraunces. High-contrast, optical, full of character.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// — Latin body/UI: Inter.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// — Arabic display: Amiri. Classical naskh — rooted, civic, editorial.
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-amiri",
  display: "swap",
});

// — Arabic body/UI: IBM Plex Sans Arabic. Clean, contemporary, legible on phones.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ibda — Begin your business in Al Qua'a",
  description:
    "Ibda (إبدأ) turns an idea or a skill into a concrete first step for first-time founders in rural Al Qua'a, Al Ain, UAE.",
};

export const viewport: Viewport = {
  themeColor: "#F7F4EF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // dir/lang are managed at runtime by LanguageProvider; sensible defaults here.
    <html
      lang="en"
      dir="ltr"
      className={`${fraunces.variable} ${inter.variable} ${amiri.variable} ${plexArabic.variable}`}
    >
      <body className="grain min-h-screen">
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}

/** Quiet colophon — reinforces the "printed civic guide" identity. */
function SiteFooter() {
  return (
    <footer className="no-print border-t border-hairline">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-5 py-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-serif italic">Ibda — إبدأ</span>
        <span>Al Qua'a · Al Ain · United Arab Emirates</span>
      </div>
    </footer>
  );
}
