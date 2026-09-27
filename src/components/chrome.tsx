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
