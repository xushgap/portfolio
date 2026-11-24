import type { MetadataRoute } from "next";
import { projects } from "@/content/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/cv", "/projects", "/comments", "/order", ...projects.map((p) => `/projects/${p.slug}`)];
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
}
