"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/lib/os";

export function Clock({ light = false, dark = false }: { light?: boolean; dark?: boolean }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Tashkent",
        }).format(new Date())
      );
    tick();
    const t = setInterval(tick, 10_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span
      className={`font-mono text-[12px] tabular-nums ${
        dark ? "text-slate-600" : light ? "text-white" : "text-white/70"
      }`}
    >
      {now || "--:--"}
    </span>
  );
}

export function LangSwitch({ dark = false }: { dark?: boolean }) {
  const lang = useOS((s) => s.lang);
  const setLang = useOS((s) => s.setLang);
  const base = dark ? "text-slate-500" : "text-white/45";
  const active = dark ? "text-slate-900" : "text-white";
  return (
    <div className="flex items-center gap-1 text-[12px] font-medium">
      {(["uz", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i === 1 && <span className={base}>/</span>}
          <button
            onClick={() => setLang(l)}
            className={`uppercase transition ${lang === l ? active : `${base} hover:opacity-80`}`}
            aria-pressed={lang === l}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}

export function ThemeSwitch({ onSurface = false }: { onSurface?: boolean }) {
  const theme = useOS(s => s.theme);
  const setTheme = useOS(s => s.setTheme);
  const uz = useOS(s => s.lang) === "uz";
  const dark = theme === "dark";
  const label = dark ? (uz ? "Yorug‘ rejim" : "Light mode") : (uz ? "Qorong‘i rejim" : "Dark mode");
  return <button type="button" aria-label={label} title={label} aria-pressed={dark} onClick={() => setTheme(dark ? "light" : "dark")} className={"inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition hover:opacity-75 " + (onSurface ? "theme-toggle-surface" : "text-white")}>
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{dark ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19"/></> : <path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5 8.8 8.8 0 1 0 20.5 14.2Z"/>}</svg>
    <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
  </button>;
}
