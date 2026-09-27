"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { projects } from "@/content/data";
import type { Lang } from "@/content/data";
import { defaultWallpaper } from "@/content/wallpapers";

export type AppId = "about" | "projects" | "trash" | `project:${string}`;

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  z: number;
  min: boolean;
};

export type Point = { x: number; y: number };

/* ---------- route <-> app id ---------- */

export function routeFor(id: AppId): string {
  if (id.startsWith("project:")) return `/projects/${id.slice(8)}`;
  return `/${id}`;
}

export function idForRoute(path: string): AppId | null {
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/") return null;
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "projects" && parts[1]) {
    return projects.some((p) => p.slug === parts[1]) ? (`project:${parts[1]}` as AppId) : null;
  }
  if (["about", "projects", "trash"].includes(parts[0])) return parts[0] as AppId;
  return null;
}

/* ---------- default desktop icon layout ---------- */

export const DESKTOP_ICONS: AppId[] = ["projects", "about", "trash"];

export function defaultIconPos(id: AppId): Point {
  const i = Math.max(0, DESKTOP_ICONS.indexOf(id));
  return { x: 14, y: 14 + i * 96 };
}

/* ---------- store ---------- */

type OSState = {
  windows: WindowState[];
  topZ: number;
  lang: Lang;
  wallpaper: string;
  iconPos: Record<string, Point>;

  open: (id: AppId) => void;
  close: (id: AppId) => void;
  closeAll: () => void;
  minimize: (id: AppId) => void;
  focus: (id: AppId) => void;
  move: (id: AppId, x: number, y: number) => void;
  setIconPos: (id: AppId, x: number, y: number) => void;
  resetIcons: () => void;
  setLang: (l: Lang) => void;
  setWallpaper: (id: string) => void;
};

function spawnPosition(index: number) {
  const step = 30;
  return { x: 130 + index * step, y: 70 + index * step };
}

export const useOS = create<OSState>()(
  persist(
    (set, get) => ({
      windows: [],
      topZ: 10,
      lang: "uz",
      wallpaper: defaultWallpaper,
      iconPos: {},

      open: (id) => {
        const { windows, topZ } = get();
        const existing = windows.find((w) => w.id === id);
        if (existing) {
          set({
            topZ: topZ + 1,
            windows: windows.map((w) => (w.id === id ? { ...w, z: topZ + 1, min: false } : w)),
          });
          return;
        }
        const pos = spawnPosition(windows.length % 5);
        set({ topZ: topZ + 1, windows: [...windows, { id, ...pos, z: topZ + 1, min: false }] });
      },

      close: (id) => set({ windows: get().windows.filter((w) => w.id !== id) }),

      closeAll: () => set({ windows: [] }),

      minimize: (id) => set({ windows: get().windows.map((w) => (w.id === id ? { ...w, min: true } : w)) }),

      focus: (id) => {
        const { windows, topZ } = get();
        const w = windows.find((x) => x.id === id);
        if (!w || (w.z === topZ && !w.min)) return;
        set({ topZ: topZ + 1, windows: windows.map((x) => (x.id === id ? { ...x, z: topZ + 1, min: false } : x)) });
      },

      move: (id, x, y) => set({ windows: get().windows.map((w) => (w.id === id ? { ...w, x, y } : w)) }),

      setIconPos: (id, x, y) => set({ iconPos: { ...get().iconPos, [id]: { x, y } } }),

      resetIcons: () => set({ iconPos: {} }),

      setLang: (lang) => set({ lang }),

      setWallpaper: (wallpaper) => set({ wallpaper }),
    }),
    {
      name: "portfolio-os",
      storage: createJSONStorage(() => localStorage),
      // windows are session state — only preferences are remembered
      partialize: (s) => ({ lang: s.lang, wallpaper: s.wallpaper, iconPos: s.iconPos }),
    }
  )
);

/** Topmost non-minimized window — this is what the URL reflects. */
export function activeRoute(windows: WindowState[]): string {
  const visible = windows.filter((w) => !w.min);
  if (visible.length === 0) return "/";
  const top = visible.reduce((a, b) => (a.z > b.z ? a : b));
  return routeFor(top.id);
}

export function topWindow(windows: WindowState[]): WindowState | null {
  const visible = windows.filter((w) => !w.min);
  if (!visible.length) return null;
  return visible.reduce((a, b) => (a.z > b.z ? a : b));
}
