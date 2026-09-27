"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useOS, topWindow, type AppId } from "@/lib/os";
import { AppBody, titleFor } from "@/components/apps";
import { AppIcon } from "@/components/icons";
import { profile } from "@/content/data";
import { Clock, LangSwitch } from "@/components/chrome";
import { getWallpaper } from "@/content/wallpapers";

const HOME_APPS: AppId[] = ["projects", "about", "trash"];
const DOCK_APPS: AppId[] = ["about", "projects"];

function HomeIcon({ id, onOpen }: { id: AppId; onOpen: () => void }) {
  const lang = useOS((s) => s.lang);
  return (
    <button onClick={onOpen} className="flex flex-col items-center gap-1.5 active:scale-95 transition">
      <span className="flex h-[62px] w-[62px] items-center justify-center rounded-[16px] border border-white/20 bg-white/15 shadow-lg backdrop-blur-md">
        <AppIcon id={id} className="h-9 w-9" />
      </span>
      <span className="max-w-[72px] truncate text-[11px] font-medium">{titleFor(id, lang)}</span>
    </button>
  );
}

export default function Phone() {
  const windows = useOS((s) => s.windows);
  const open = useOS((s) => s.open);
  const closeAll = useOS((s) => s.closeAll);
  const lang = useOS((s) => s.lang);

  const wpId = useOS((s) => s.wallpaper);
  const wp = getWallpaper(wpId);
  const dark = wp.dark;
  const top = topWindow(windows);

  return (
    <div className={`relative h-[100dvh] w-full overflow-hidden ${dark ? "bg-[#0f1115] text-white" : "bg-[#e8e5e0] text-slate-900"}`}>
      <div
        className="absolute inset-0"
        style={{ background: wp.css }}
      />

      {/* status bar */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-3 text-[13px] font-semibold">
        <Clock light={dark} dark={!dark} />
        <div className="flex items-center gap-2">
          <LangSwitch dark={!dark} />
          <span className={`text-[11px] ${dark ? "text-white/70" : "text-slate-500"}`}>▮▮▮</span>
        </div>
      </div>

      {/* home screen */}
      <div className="relative z-10 flex h-[calc(100%-3rem)] flex-col px-6 pt-8">
        <div className="mb-8 text-center">
          <p className="text-[19px] font-semibold tracking-tight">{profile.name}</p>
          <p className={`text-[13px] ${dark ? "text-white/50" : "text-slate-500"}`}>{profile.role[lang]}</p>
        </div>

        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          {HOME_APPS.map((id) => (
            <HomeIcon key={id} id={id} onOpen={() => open(id)} />
          ))}
        </div>

        <div className="mt-auto mb-6 flex justify-center">
          <div className="flex gap-6 rounded-[24px] border border-white/20 bg-white/15 px-5 py-3 backdrop-blur-xl">
            {DOCK_APPS.map((id) => (
              <button key={id} onClick={() => open(id)} className="active:scale-95 transition">
                <AppIcon id={id} className="h-9 w-9" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* full-screen app sheet */}
      <AnimatePresence>
        {top && (
          <motion.div
            key={top.id}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
            className="absolute inset-0 z-40 flex flex-col rounded-t-[22px] bg-white"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <span className="text-[14px] font-semibold text-slate-800">{titleFor(top.id, lang)}</span>
              <div className="flex items-center gap-3">
                <LangSwitch dark />
                <button
                  onClick={closeAll}
                  aria-label="close app"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-10 pt-5">
              <AppBody id={top.id} />
            </div>
            <div className="flex justify-center pb-2">
              <button onClick={closeAll} className="h-1.5 w-32 rounded-full bg-slate-300" aria-label="home" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
