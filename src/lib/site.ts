/**
 * Saytning to'liq manzili. Vercel'ga chiqargandan keyin loyiha sozlamalarida
 * NEXT_PUBLIC_SITE_URL o'zgaruvchisini o'z domeningizga qo'ying.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shohjahon.vercel.app").replace(/\/$/, "");
