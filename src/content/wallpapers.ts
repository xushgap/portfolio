export type Wallpaper = {
  id: string;
  name: { uz: string; en: string };
  swatch: string;
  css: string;
  /** dark = light-coloured UI text on top */
  dark: boolean;
};

const noise =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")";

export const wallpapers: Wallpaper[] = [
  {
    id: "grafit",
    name: { uz: "Grafit", en: "Graphite" },
    swatch: "linear-gradient(135deg,#1b1f27,#0f1115)",
    css: `${noise}, radial-gradient(1100px 700px at 20% 10%, rgba(148,163,184,0.10), transparent 62%), linear-gradient(165deg, #0f1115 0%, #171b23 55%, #0f1115 100%)`,
    dark: true,
  },
  {
    id: "tun",
    name: { uz: "Tun", en: "Midnight" },
    swatch: "linear-gradient(135deg,#1e2a3a,#0c1017)",
    css: `${noise}, radial-gradient(900px 620px at 78% 18%, rgba(100,130,170,0.16), transparent 60%), linear-gradient(170deg, #0c1017 0%, #16202e 60%, #0b0e14 100%)`,
    dark: true,
  },
  {
    id: "xiva",
    name: { uz: "Xiva", en: "Khiva" },
    swatch: "linear-gradient(135deg,#3a2f26,#15110e)",
    css: `${noise}, radial-gradient(950px 650px at 25% 85%, rgba(196,150,96,0.14), transparent 62%), linear-gradient(160deg, #15110e 0%, #2a211a 58%, #14100d 100%)`,
    dark: true,
  },
  {
    id: "zaytun",
    name: { uz: "Zaytun", en: "Olive" },
    swatch: "linear-gradient(135deg,#2a3129,#11140f)",
    css: `${noise}, radial-gradient(900px 600px at 80% 80%, rgba(140,160,120,0.13), transparent 60%), linear-gradient(165deg, #11140f 0%, #1e241c 58%, #10130e 100%)`,
    dark: true,
  },
  {
    id: "qogoz",
    name: { uz: "Qog'oz", en: "Paper" },
    swatch: "linear-gradient(135deg,#f4f2ee,#d9d5cd)",
    css: `${noise}, radial-gradient(900px 600px at 20% 12%, rgba(255,255,255,0.9), transparent 60%), linear-gradient(165deg, #eceae5 0%, #dfdcd5 60%, #e8e5e0 100%)`,
    dark: false,
  },
];

export const defaultWallpaper = wallpapers[0].id;

export function getWallpaper(id: string): Wallpaper {
  return wallpapers.find((w) => w.id === id) ?? wallpapers[0];
}
