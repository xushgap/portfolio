export type Wallpaper = {
  id: string;
  name: { uz: string; en: string };
  swatch: string;
  css: string;
  dark: boolean;
};

// Original macOS wallpaper archive: https://512pixels.net/projects/default-mac-wallpapers-in-5k/
// Images remain the property of their respective copyright holders.
const photos = [
  [
    "big-sur-night",
    "Big Sur — Tun",
    "Big Sur — Night",
    "11-0-Night.jpg",
    "https://media.512pixels.net/wp-content/uploads/2025/06/11-0-Night-thumbnail.jpg",
    "#101e35"
  ],
  [
    "catalina",
    "Catalina",
    "Catalina",
    "10-15-Day.jpg",
    "https://media.512pixels.net/wp-content/uploads/2025/06/10-15-Day-thumb.jpg",
    "#33334d"
  ],
  [
    "mojave-night",
    "Mojave — Tun",
    "Mojave — Night",
    "10-14-Night.jpg",
    "https://media.512pixels.net/downloads/macos-wallpapers-thumbs/10-14-Night-Thumb.jpg",
    "#172338"
  ],
  [
    "high-sierra",
    "High Sierra",
    "High Sierra",
    "10-13.jpg",
    "https://media.512pixels.net/downloads/macos-wallpapers-thumbs/10-13--thumb.jpg",
    "#5c5543"
  ],
  [
    "el-capitan",
    "El Capitan",
    "El Capitan",
    "10-11.jpg",
    "https://media.512pixels.net/downloads/macos-wallpapers-thumbs/10-11--thumb.jpg",
    "#303e46"
  ],
  [
    "mavericks",
    "Mavericks",
    "Mavericks",
    "10-9.jpg",
    "https://media.512pixels.net/downloads/macos-wallpapers-thumbs/10-9--thumb.jpg",
    "#164a62"
  ]
] as const;

export const wallpapers: Wallpaper[] = photos.map(([id, uz, en, file, preview, fallback]) => ({
  id,
  name: { uz, en },
  swatch: `url("${preview}") center / cover no-repeat ${fallback}`,
  css: `url("https://raw.githubusercontent.com/LAYTAT/macOS-Wallpapers/main/${file}") center / cover no-repeat, url("${preview}") center / cover no-repeat ${fallback}`,
  dark: true,
}));

export const defaultWallpaper = wallpapers[0].id;
export function getWallpaper(id: string): Wallpaper {
  return wallpapers.find(w => w.id === id) ?? wallpapers[0];
}
