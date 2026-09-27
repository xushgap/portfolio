"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useDragControls } from "framer-motion";
import { useOS, DESKTOP_ICONS, defaultIconPos, type AppId, type WindowState } from "@/lib/os";
import { AppBody, titleFor } from "@/components/apps";
import { AppIcon } from "@/components/icons";
import { profile, ui } from "@/content/data";
import { getWallpaper, wallpapers } from "@/content/wallpapers";
import { Clock, LangSwitch } from "@/components/chrome";

const WIDTH: Partial<Record<string, number>> = { about: 660, projects: 620, trash: 480 };
const widthFor = (id: AppId) => (id.startsWith("project:") ? 600 : WIDTH[id] ?? 560);

/* ---------------- draggable desktop icon ---------------- */

function DesktopIcon({ id, bounds, dark }: { id: AppId; bounds: React.RefObject<HTMLDivElement>; dark: boolean }) {
  const open = useOS((s) => s.open);
  const lang = useOS((s) => s.lang);
  const stored = useOS((s) => s.iconPos[id]);
  const setIconPos = useOS((s) => s.setIconPos);

  const start = stored ?? defaultIconPos(id);
  const x = useMotionValue(start.x);
  const y = useMotionValue(start.y);
  const dragging = useRef(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={bounds}
      dragElastic={0}
      style={{ x, y, left: 0, top: 0 }}
      className="absolute z-[1] touch-none"
      onDragStart={() => {
        dragging.current = true;
      }}
      onDragEnd={() => {
        setIconPos(id, x.get(), y.get());
        setTimeout(() => (dragging.current = false), 150);
      }}
      whileDrag={{ scale: 1.06 }}
    >
      <button
        onClick={() => {
          if (!dragging.current) open(id);
        }}
        className={`group flex w-[88px] cursor-pointer flex-col items-center gap-1.5 rounded-lg p-2 text-center transition focus:outline-none ${
          dark ? "hover:bg-white/10 focus:bg-white/15" : "hover:bg-black/5 focus:bg-black/10"
        }`}
      >
        <AppIcon id={id} className="h-12 w-12 drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]" />
        <span
          className={`rounded px-1.5 py-0.5 text-[11.5px] font-medium leading-tight ${
            dark ? "text-white/90 group-hover:bg-white/15" : "text-slate-800 group-hover:bg-black/10"
          }`}
        >
          {titleFor(id, lang)}
        </span>
      </button>
    </motion.div>
  );
}

/* ---------------- window ---------------- */

function Window({ w, bounds }: { w: WindowState; bounds: React.RefObject<HTMLDivElement> }) {
  const focus = useOS((s) => s.focus);
  const close = useOS((s) => s.close);
  const minimize = useOS((s) => s.minimize);
  const move = useOS((s) => s.move);
  const lang = useOS((s) => s.lang);

  const x = useMotionValue(w.x);
  const y = useMotionValue(w.y);
  const dragControls = useDragControls();

  return (
    <motion.section
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={bounds}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
      transition={{ type: "spring", stiffness: 460, damping: 34 }}
      style={{ x, y, zIndex: w.z, width: widthFor(w.id), left: 0, top: 0 }}
      onPointerDown={() => focus(w.id)}
      onDragEnd={() => move(w.id, x.get(), y.get())}
      aria-label={titleFor(w.id, lang)}
      className="absolute max-w-[calc(100vw-40px)] overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_24px_70px_-12px_rgba(0,0,0,0.45)]"
    >
      <div
        onPointerDown={(e) => dragControls.start(e)}
        onDoubleClick={() => close(w.id)}
        className="group/bar flex cursor-grab touch-none items-center gap-2 border-b border-slate-200 bg-slate-50/90 px-3.5 py-2.5 active:cursor-grabbing"
      >
        <div className="flex gap-1.5">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => close(w.id)}
            aria-label={lang === "uz" ? "Yopish" : "Close"}
            title={lang === "uz" ? "Yopish" : "Close"}
            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f57] text-[8px] font-bold leading-none text-[#7a0b06] opacity-100 transition hover:brightness-95"
          >
            <span className="opacity-0 transition group-hover/bar:opacity-100">✕</span>
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => minimize(w.id)}
            aria-label={lang === "uz" ? "Yig'ish" : "Minimize"}
            title={lang === "uz" ? "Yig'ish" : "Minimize"}
            className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#febc2e] text-[9px] font-bold leading-none text-[#7a5200] transition hover:brightness-95"
          >
            <span className="opacity-0 transition group-hover/bar:opacity-100">–</span>
          </button>
          <span className="h-3.5 w-3.5 rounded-full bg-[#dfe3e8]" />
        </div>
        <span className="mx-auto select-none pr-8 text-[12.5px] font-medium text-slate-500">
          {titleFor(w.id, lang)}
        </span>
      </div>

      <div className="max-h-[min(62vh,560px)] overflow-y-auto px-6 pb-6 pt-5">
        <AppBody id={w.id} />
      </div>
    </motion.section>
  );
}

/* ---------------- wallpaper picker ---------------- */

function WallpaperPicker({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState(false);
  const current = useOS((s) => s.wallpaper);
  const setWallpaper = useOS((s) => s.setWallpaper);
  const resetIcons = useOS((s) => s.resetIcons);
  const lang = useOS((s) => s.lang);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 text-[12px] font-medium transition ${
          dark ? "text-white/60 hover:text-white" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <span
          className="h-3 w-3 rounded-full border border-white/40"
          style={{ background: getWallpaper(current).swatch }}
        />
        {lang === "uz" ? "Fon" : "Wallpaper"}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[1000]" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-7 z-[1001] w-[200px] rounded-xl border border-black/10 bg-white/95 p-2 shadow-2xl backdrop-blur-xl">
            {wallpapers.map((w) => (
              <button
                key={w.id}
                onClick={() => {
                  setWallpaper(w.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[12.5px] transition hover:bg-slate-100 ${
                  current === w.id ? "text-slate-900" : "text-slate-600"
                }`}
              >
                <span
                  className="h-6 w-9 shrink-0 rounded-md border border-black/10"
                  style={{ background: w.swatch }}
                />
                <span className="flex-1">{w.name[lang]}</span>
                {current === w.id && <span className="text-[11px] text-slate-400">✓</span>}
              </button>
            ))}
            <div className="mt-1 border-t border-slate-200 pt-1">
              <button
                onClick={() => {
                  resetIcons();
                  setOpen(false);
                }}
                className="w-full rounded-lg px-2 py-1.5 text-left text-[12px] text-slate-500 transition hover:bg-slate-100"
              >
                {lang === "uz" ? "Ikonkalarni tartiblash" : "Tidy up icons"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------------- shell ---------------- */

export default function Desktop() {
  const windows = useOS((s) => s.windows);
  const lang = useOS((s) => s.lang);
  const closeAll = useOS((s) => s.closeAll);
  const open = useOS((s) => s.open);
  const wallpaperId = useOS((s) => s.wallpaper);
  const bounds = useRef<HTMLDivElement>(null);

  const wp = getWallpaper(wallpaperId);
  const dark = wp.dark;
  const visible = windows.filter((w) => !w.min);

  return (
    <div className={`relative h-[100dvh] w-full overflow-hidden ${dark ? "bg-[#0f1115]" : "bg-[#e8e5e0]"}`}>
      <motion.div
        key={wp.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0"
        style={{ background: wp.css }}
      />

      {/* menu bar */}
      <header
        className={`relative z-[999] flex items-center gap-4 border-b px-4 py-1.5 backdrop-blur-md ${
          dark ? "border-white/10 bg-black/25 text-white" : "border-black/10 bg-white/50 text-slate-900"
        }`}
      >
        <button onClick={closeAll} className="text-[13px] font-semibold tracking-tight hover:opacity-70">
          {profile.name}
        </button>
        <span className={`hidden text-[12px] sm:inline ${dark ? "text-white/45" : "text-slate-500"}`}>
          {profile.role[lang]}
        </span>
        <div className="ml-auto flex items-center gap-4">
          <WallpaperPicker dark={dark} />
          <LangSwitch dark={!dark} />
          <Clock light={dark} dark={!dark} />
        </div>
      </header>

      {/* desktop surface */}
      <div ref={bounds} className="relative h-[calc(100%-34px)] w-full">
        {DESKTOP_ICONS.map((id) => (
          <DesktopIcon key={id} id={id} bounds={bounds} dark={dark} />
        ))}

        <AnimatePresence>
          {visible.map((w) => (
            <Window key={w.id} w={w} bounds={bounds} />
          ))}
        </AnimatePresence>

        {visible.length === 0 && (
          <p
            className={`pointer-events-none absolute bottom-24 left-1/2 -translate-x-1/2 text-[12.5px] ${
              dark ? "text-white/35" : "text-slate-500"
            }`}
          >
            {ui.hint[lang]}
          </p>
        )}

        {/* dock */}
        <div className="absolute bottom-3 left-1/2 z-[900] -translate-x-1/2">
          <div
            className={`flex items-end gap-1.5 rounded-2xl border px-2.5 py-2 backdrop-blur-xl ${
              dark ? "border-white/15 bg-white/10" : "border-black/10 bg-white/55"
            }`}
          >
            {DESKTOP_ICONS.map((id) => {
              const w = windows.find((x) => x.id === id);
              return (
                <button
                  key={id}
                  onClick={() => open(id)}
                  title={titleFor(id, lang)}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition hover:-translate-y-1.5 ${
                    dark ? "hover:bg-white/10" : "hover:bg-black/5"
                  }`}
                >
                  <AppIcon id={id} className="h-8 w-8" />
                  {w && (
                    <span
                      className={`absolute -bottom-1 h-1 w-1 rounded-full ${
                        w.min ? (dark ? "bg-white/35" : "bg-slate-400") : dark ? "bg-white/85" : "bg-slate-700"
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
