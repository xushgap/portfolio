import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import OS from "@/components/OS";
import SeoContent from "@/components/SeoContent";
import { projects, profile } from "@/content/data";

type Props = { params: { slug?: string[] } };

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["about"] },
    { slug: ["projects"] },
    { slug: ["comments"] },
    { slug: ["order"] },
    ...projects.map((p) => ({ slug: ["projects", p.slug] })),
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const s = params.slug ?? [];
  const base = `${SITE_NAME} — ${profile.name} | Full-Stack Developer`;
  const url = SITE_URL + (s.length ? "/" + s.join("/") : "/");
  const canonical = { alternates: { canonical: url } };
  if (s.length > 2 || (s.length === 2 && (s[0] !== "projects" || !projects.some(p => p.slug === s[1]))) || (s.length === 1 && !["about","projects","comments","order"].includes(s[0]))) return { title: "404", robots: { index: false, follow: false } };
  if (s[0] === "projects" && s[1]) {
    const p = projects.find((x) => x.slug === s[1]);
    if (p) return { ...canonical, title: `${p.name} — ${SITE_NAME}`, description: p.summary.en, openGraph: { url, title: `${p.name} — ${SITE_NAME}`, description: p.summary.en, siteName: SITE_NAME } };
  }
  if (s[0] === "projects") return { ...canonical, title: `Projects — ${SITE_NAME}`, description: "Projects I have worked on." };
  if (s[0] === "order") return { ...canonical, title: `Order a Project — ${SITE_NAME}`, description: "Request a website, Telegram bot, CRM, or other digital service." };
  if (s[0] === "comments") return { ...canonical, title: `Comments — ${SITE_NAME}`, description: "Leave feedback about the portfolio." };
  if (s[0] === "about") return { ...canonical, title: `About — ${SITE_NAME}`, description: profile.bio.en[0] };
  return { ...canonical, title: base, description: SITE_DESCRIPTION };
}

export default function Page({ params }: Props) {
  const s = params.slug ?? [];
  if (s.length > 2 || (s.length === 2 && (s[0] !== "projects" || !projects.some(p => p.slug === s[1]))) || (s.length === 1 && !["about","projects","comments","order"].includes(s[0]))) notFound();
  const schema = { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, alternateName: "Shoxjahon OS", url: SITE_URL + "/" };
  return (
    <>
      {s.length === 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />}
      <SeoContent />
      <OS />
    </>
  );
}
