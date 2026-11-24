import "server-only";
import { timingSafeEqual } from "node:crypto";

const endpoint = "https://qhqhkgfdttvhmaizhorr.supabase.co/rest/v1/portfolio_orders";
const publicKey = "sb_publishable_fB_bMMLw8J-u8Zw2jaf14A_Nd-IYxDO";
export type Order = { id: string; name: string; contact: string; service: string; description: string; budget: string; status: string; created_at: string };
export function hasAdminKey() { return Boolean(process.env.SUPABASE_ORDERS_SERVER_KEY); }
export function adminId() { return process.env.PORTFOLIO_ADMIN_CHAT_ID || ""; }
export function authorized(secret: string | null) {
  const expected = process.env.PORTFOLIO_WEBHOOK_SECRET;
  if (!expected || !secret) return false;
  const a = Buffer.from(secret), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a,b);
}
export async function db(query = "", init: RequestInit = {}, admin = true) {
  const key = admin ? process.env.SUPABASE_ORDERS_SERVER_KEY : publicKey;
  if (!key) throw new Error("Database configuration missing");
  const headers: Record<string,string> = { apikey: key, "Content-Type": "application/json" };
  if (key.startsWith("eyJ")) headers.Authorization = "Bearer " + key;
  return fetch(endpoint + query, { ...init, cache: "no-store", headers: { ...headers, ...init.headers }, signal: AbortSignal.timeout(10000) });
}
export async function telegram(method: string, body: Record<string, unknown>) {
  const token = process.env.PORTFOLIO_BOT_TOKEN;
  if (!token) throw new Error("Bot configuration missing");
  const res = await fetch("https://api.telegram.org/bot" + token + "/" + method, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error("Telegram request failed");
  const data = await res.json();
  if (!data.ok) throw new Error("Telegram API error");
  return data.result;
}
export const statusLabel = (s: string) => s === "accepted" ? "Qabul qilingan" : s === "rejected" ? "Rad etilgan" : "Yangi";
export function orderText(o: Order) {
  return ["Buyurtma #" + o.id.slice(0,8), "Holati: " + statusLabel(o.status), "Ism: " + o.name, "Kontakt: " + o.contact, "Xizmat: " + o.service, "Budjet: " + (o.budget || "Ko‘rsatilmagan"), "", o.description].join("\n");
}
export function keyboard(o: Order) {
  const rows: {text:string;callback_data?:string;url?:string}[][] = [];
  if (o.status === "new") rows.push([{text:"Qabul qilish",callback_data:"accept:"+o.id},{text:"Rad etish",callback_data:"reject:"+o.id}]);
  if (/^@[A-Za-z0-9_]{5,32}$/.test(o.contact)) rows.push([{text:"Bog‘lanish",url:"https://t.me/"+o.contact.slice(1)}]);
  return { inline_keyboard: rows };
}
export async function sendOrder(o: Order) {
  if (!adminId()) return;
  await telegram("sendMessage", { chat_id: adminId(), text: orderText(o), reply_markup: keyboard(o), link_preview_options: { is_disabled: true } });
}
