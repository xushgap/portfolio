import type { Metadata } from "next";
import OS from "@/components/OS";
import SeoContent from "@/components/SeoContent";
import { projects, profile } from "@/content/data";

type Props = { params: { slug?: string[] } };

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["about"] },
    { slug: ["projects"] },
    { slug: ["trash"] },
    ...projects.map((p) => ({ slug: ["projects", p.slug] })),
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const s = params.slug ?? [];
  const base = `${profile.name} — ${profile.role.uz}`;
  if (s[0] === "projects" && s[1]) {
    const p = projects.find((x) => x.slug === s[1]);
    if (p) return { title: `${p.name} — ${profile.name}`, description: p.summary.uz };
  }
  if (s[0] === "projects") return { title: `Loyihalar — ${profile.name}`, description: "Men ishlagan loyihalar." };
  if (s[0] === "about") return { title: `Men haqimda — ${profile.name}`, description: profile.bio.uz[0] };
  return { title: base, description: profile.bio.uz[0] };
}

export default function Page() {
  return (
    <>
      <SeoContent />
      <OS />
    </>
  );
}
