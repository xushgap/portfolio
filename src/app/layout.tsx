import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/content/data";
import { SITE_URL } from "@/lib/site";

const title = `${profile.name} — ${profile.role.uz}`;
const description = profile.bio.uz[0];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "Shohjahon Bekchanov",
    "front-end dasturchi",
    "frontend developer",
    "Telegram bot",
    "portfolio",
    "Xiva",
    "Xorazm",
    "Uzbekistan",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: profile.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
