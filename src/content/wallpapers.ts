export type Wallpaper = {
  id: string;
  name: { uz: string; en: string };
  swatch: string;
  css: string;
  mobileCss: string;
  dark: boolean;
};

// macOS wallpaper archive (LAYTAT/macOS-Wallpapers).
// WebP variants generated during build and served as static assets.
const photo = (id: string, name: Wallpaper["name"], fallback: string): Wallpaper => ({
  id, name, dark: true,
  css: `url("/wallpapers/${id}.webp") center / cover no-repeat ${fallback}`,
  mobileCss: `url("/wallpapers/${id}-mobile.webp") center / cover no-repeat ${fallback}`,
  swatch: `url("/wallpapers/${id}-thumb.webp") center / cover no-repeat ${fallback}`,
});
export const wallpapers = [
  photo("big-sur-night", { uz: "Big Sur", en: "Big Sur" }, "#101e35"),
  photo("mojave-night", { uz: "Mojave Tun", en: "Mojave Night" }, "#172338"),
];
export const defaultWallpaper = wallpapers[0].id;
export function getWallpaper(id: string): Wallpaper {
  return wallpapers.find(w => w.id === id) ?? wallpapers[0];
}
