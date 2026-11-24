import "server-only";
import { timingSafeEqual } from "node:crypto";

const endpoint = "https://qhqhkgfdttvhmaizhorr.supabase.co/rest/v1/portfolio_orders";
const publicKey = "sb_publishable_fB_bMMLw8J-u8Zw2jaf14A_Nd-IYxDO";
export type Order = { id: string; name: string; contact: string; service: string; description: string; budget: string; status: string; created_at: string };
export function hasAdminKey() { return Boolean(process.env.PORTFOLIO_ORDERS_BRIDGE_SECRET || process.env.SUPABASE_ORDERS_SERVER_KEY); }
export function adminId() { return process.env.PORTFOLIO_ADMIN_CHAT_ID || ""; }
export function authorized(secret: string | null) {
  const expected = process.env.PORTFOLIO_WEBHOOK_SECRET;
  if (!expected || !secret) return false;
  const a = Buffer.from(secret), b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a,b);
}
export async function db(query = "", init: RequestInit = {}, admin = true) {
  const bridge = process.env.PORTFOLIO_ORDERS_BRIDGE_SECRET;
  if (admin && bridge) return fetch("https://qhqhkgfdttvhmaizhorr.supabase.co/functions/v1/portfolio-orders-bridge", {method:"POST",headers:{apikey:publicKey,"x-portfolio-secret":bridge,"Content-Type":"application/json"},body:JSON.stringify({method:init.method || "GET",query,body:typeof init.body==="string"?JSON.parse(init.body):undefined}),cache:"no-store",signal:AbortSignal.timeout(12000)});
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
  if (!res.ok) throw new Error("Telegram HTTP "+res.status);
  const data = await res.json();
  if (!data.ok) throw new Error("Telegram API error");
  return data.result;
}
export const statusLabel = (s: string) => s === "accepted" ? "Qabul qilingan" : s === "rejected" ? "Rad etilgan" : "Yangi";
const symbols = ["💎","📥","📦","✅","❌","📊","👤","💬","💼","💰","📝","🔗"];
let cached: {expires:number; icons:Record<string,string>} | undefined;
let pending: Promise<Record<string,string>> | undefined;
async function premiumIcons() {
  if (cached && cached.expires > Date.now()) return cached.icons;
  if (pending) return pending;
  pending = (async()=>{
    const icons:Record<string,string> = {};
    try {
      const set=await telegram("getStickerSet",{name:"AnimatedIconsEmoji"});
      for(const s of set.stickers || []) {
        const e=String(s.emoji||"").replace(/\uFE0F/g,"");
        if(symbols.includes(e)&&/^\d+$/.test(String(s.custom_emoji_id))) icons[e]=String(s.custom_emoji_id);
      }
    } catch { /* Telegram permission or sticker set unavailable */ }
    cached={icons,expires:Date.now()+3600000};
    return icons;
  })();
  try {return await pending;} finally {pending=undefined;}
}
const escapeHTML=(s:string)=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
export function orderText(o: Order) {
  return ["💎  PORTFOLIO / ORDERS","━━━━━━━━━━━━━━━━","📦  #"+o.id.slice(0,8).toUpperCase(),"📥  "+statusLabel(o.status),"","👤  Ism: "+o.name,"💬  Kontakt: "+o.contact,"💼  Xizmat: "+(({website:"Veb-sayt",landing:"Landing page",telegram:"Telegram bot / Mini App",crm:"CRM",saas:"SaaS",ai:"AI integratsiyasi",other:"Boshqa"} as Record<string,string>)[o.service]||o.service),"💰  Budjet: "+(o.budget||"Ko‘rsatilmagan"),"","📝  Loyiha tafsilotlari",o.description,"━━━━━━━━━━━━━━━━"].join("\n");
}
type Button={text:string;callback_data?:string;url?:string;style?:string;icon_custom_emoji_id?:string};
export function keyboard(o: Order) {
  const rows:Button[][]=[];
  if(o.status==="new")rows.push([{text:"✅ Qabul qilish",callback_data:"accept:"+o.id,style:"success"},{text:"❌ Rad etish",callback_data:"reject:"+o.id,style:"danger"}]);
  if(/^@[A-Za-z0-9_]{5,32}$/.test(o.contact))rows.push([{text:"🔗 Bog‘lanish",url:"https://t.me/"+o.contact.slice(1),style:"primary"}]);
  rows.push([{text:"📦 Bosh menyu",callback_data:"menu:home"}]);
  return {inline_keyboard:rows};
}
export function menuKeyboard(){return {inline_keyboard:[
  [{text:"📥 Yangi buyurtmalar",callback_data:"menu:new",style:"primary"}],
  [{text:"📦 Barcha buyurtmalar",callback_data:"menu:orders"}],
  [{text:"✅ Qabul qilingan",callback_data:"menu:accepted",style:"success"},{text:"❌ Rad etilgan",callback_data:"menu:rejected",style:"danger"}],
  [{text:"📊 Statistika",callback_data:"menu:stats"},{text:"🔗 Portfolio",url:"https://shoxjahonos.vercel.app"}]
]};}
export async function richTelegram(method:string,body:Record<string,unknown>) {
  const icons=await premiumIcons();
  const text=String(body.text||"");
  const html=text.split("\n").map((line,i)=>{
    let safe=escapeHTML(line);
    for(const e of symbols)if(icons[e]&&safe.startsWith(e))safe='<tg-emoji emoji-id="'+icons[e]+'">'+e+'</tg-emoji>'+safe.slice(e.length);
    return i===0?"<b>"+safe+"</b>":safe;
  }).join("\n");
  const markup=body.reply_markup as {inline_keyboard?:Button[][]}|undefined;
  const enhanced=markup?.inline_keyboard?{inline_keyboard:markup.inline_keyboard.map(row=>row.map(b=>{
    const e=symbols.find(e=>b.text.startsWith(e));return e&&icons[e]?{...b,text:b.text.slice(e.length).trim(),icon_custom_emoji_id:icons[e]}:b;
  }))}:markup;
  try{return await telegram(method,{...body,text:html,parse_mode:"HTML",reply_markup:enhanced});}
  catch(e){if(!(e instanceof Error)||!e.message.includes("HTTP 400"))throw e;return telegram(method,body);}
}
export async function sendOrder(o: Order) {
  if(!adminId())return;
  await richTelegram("sendMessage",{chat_id:adminId(),text:orderText(o),reply_markup:keyboard(o),link_preview_options:{is_disabled:true}});
}
