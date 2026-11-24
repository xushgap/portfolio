import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/content/data";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const title = `${SITE_NAME} — ${profile.name} | Full-Stack Developer`;
const description = SITE_DESCRIPTION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "ShoxjahonOS",
    "Shoxjahon OS",
    "Shoxjahon Bekchanov",
    "Shohjahon Bekchanov",
    "Full-Stack Developer",
    "AI Engineering",
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
    siteName: SITE_NAME,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  applicationName: SITE_NAME,
  verification: { google: "QL1vUDrB5e9hdNT9j2wfpbyvA6dlSlSx_mKcLWeBgDU" },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
