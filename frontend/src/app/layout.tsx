import "~/styles/globals.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "./providers"; 

export const metadata: Metadata = {
  title: "ViralAI - AI-Powered Podcast Clipper",
  description:
    "Transform your podcasts into viral clips instantly with AI. Upload once, get dozens of share-ready clips optimized for TikTok, Instagram Reels, and YouTube Shorts. Save hours of editing time.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "podcast clipper",
    "AI podcast editor",
    "viral clips",
    "podcast to clips",
    "TikTok clips",
    "Instagram Reels",
    "YouTube Shorts",
    "podcast editing",
    "automated video clips",
    "ViralAI",
  ],
  authors: [{ name: "ViralAI" }],
  creator: "ViralAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viralai.com",
    title: "ViralAI - AI-Powered Podcast Clipper",
    description:
      "Transform your podcasts into viral clips instantly with AI. Upload once, get dozens of share-ready clips optimized for social media.",
    siteName: "ViralAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralAI - AI-Powered Podcast Clipper",
    description:
      "Transform your podcasts into viral clips instantly with AI. Upload once, get dozens of share-ready clips optimized for social media.",
    creator: "@viralai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
