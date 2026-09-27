"use client";

import { profile, projects, trashItems, ui } from "@/content/data";
import type { AppId } from "@/lib/os";
import { useOS } from "@/lib/os";
import { AppIcon, MarkdownIcon } from "@/components/icons";

/* ---------- shared bits ---------- */

function H({ children }: { children: React.ReactNode }) {
  return <h1 className="text-[26px] font-semibold tracking-tight text-slate-900">{children}</h1>;
}

function Para({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-[1.75] text-slate-600">{children}</p>;
}

/* ---------- About (bio + facts + contact at the bottom) ---------- */

function About() {
  const lang = useOS((s) => s.lang);
  return (
    <article className="space-y-7">
      <header className="space-y-1.5">
        <H>{profile.name}</H>
        <p className="text-[15px] text-slate-500">
          {profile.role[lang]} · {profile.location[lang]}
        </p>
      </header>

      <div className="space-y-4">
        {profile.bio[lang].map((p, i) => (
          <Para key={i}>{p}</Para>
        ))}
      </div>

      <ul className="divide-y divide-slate-100 border-y border-slate-100">
        {profile.facts.map((f) => (
          <li key={f.key.en} className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 py-2.5">
            <span className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              {f.key[lang]}
            </span>
            <span className="text-[14px] text-slate-700">{f.value[lang]}</span>
          </li>
        ))}
      </ul>

      {/* contact lives at the bottom of the bio */}
      <section id="contact" className="space-y-3 rounded-xl bg-slate-50 p-5">
        <h2 className="text-[15px] font-semibold text-slate-900">{ui.contact[lang]}</h2>
        <Para>{ui.contactNote[lang]}</Para>
        <ul className="grid gap-2">
          {profile.contacts.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 transition hover:border-slate-900"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{c.label}</span>
                <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">{c.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

/* ---------- Projects folder ---------- */

function ProjectsFolder() {
  const lang = useOS((s) => s.lang);
  const open = useOS((s) => s.open);
  return (
    <div className="space-y-4">
      <p className="text-[12px] text-slate-400">
        {projects.length} {ui.files[lang]}
      </p>
      <ul className="grid gap-2.5">
        {projects.map((p) => (
          <li key={p.slug}>
            <button
              onClick={() => open(`project:${p.slug}` as AppId)}
              className="flex w-full items-start gap-3 rounded-xl border border-slate-200 p-3.5 text-left transition hover:border-slate-900 hover:bg-slate-50"
            >
              <MarkdownIcon className="mt-0.5 h-9 w-9 shrink-0" />
              <span className="min-w-0">
                <span className="flex items-baseline gap-2">
                  <span className="truncate text-[14px] font-semibold text-slate-900">{p.name}</span>
                  <span className="font-mono text-[11px] text-slate-400">{p.year}</span>
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">{p.summary[lang]}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Single project ---------- */

function ProjectView({ slug }: { slug: string }) {
  const lang = useOS((s) => s.lang);
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <Para>404</Para>;
  return (
    <article className="space-y-6">
      <header className="space-y-1.5">
        <H>{p.name}</H>
        <p className="text-[15px] text-slate-500">
          {p.summary[lang]} · <span className="font-mono text-[13px] text-slate-400">{p.year}</span>
        </p>
      </header>

      <div className="flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span key={s} className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-600">
            {s}
          </span>
        ))}
      </div>

      <div className="space-y-3.5">
        {p.body[lang].map((t, i) => (
          <Para key={i}>{t}</Para>
        ))}
      </div>

      {p.live && (
        <div className="pt-1">
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-[13px] font-medium text-white transition hover:bg-slate-700"
          >
            {(p.liveLabel ?? { uz: "Ochish", en: "Open" })[lang]} →
          </a>
        </div>
      )}
    </article>
  );
}

/* ---------- Trash ---------- */

function Trash() {
  const lang = useOS((s) => s.lang);
  return (
    <div className="space-y-4">
      <H>{lang === "uz" ? "Savat" : "Trash"}</H>
      <Para>{ui.trashNote[lang]}</Para>
      <ul className="space-y-2">
        {trashItems[lang].map((t) => (
          <li key={t} className="flex items-center gap-3 rounded-lg bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-500">
            <span className="text-slate-300">✕</span>
            <span className="line-through decoration-slate-300">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- registry ---------- */

export function titleFor(id: AppId, lang: "uz" | "en"): string {
  if (id.startsWith("project:")) {
    const p = projects.find((x) => x.slug === id.slice(8));
    return p ? `${p.name}.md` : "unknown";
  }
  if (id === "about") return lang === "uz" ? "Men-haqimda.md" : "About.md";
  if (id === "projects") return lang === "uz" ? "Loyihalar" : "Projects";
  if (id === "trash") return lang === "uz" ? "Savat" : "Trash";
  return id;
}

export function AppBody({ id }: { id: AppId }) {
  if (id.startsWith("project:")) return <ProjectView slug={id.slice(8)} />;
  if (id === "about") return <About />;
  if (id === "projects") return <ProjectsFolder />;
  if (id === "trash") return <Trash />;
  return null;
}

export { AppIcon };
