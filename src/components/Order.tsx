"use client";
import { useRef, useState, type FormEvent } from "react";
import { useOS } from "@/lib/os";

const services = [
  ["website", "Veb-sayt", "Website"],
  ["landing", "Landing page", "Landing page"],
  ["telegram", "Telegram bot / Mini App", "Telegram bot / Mini App"],
  ["crm", "CRM tizimi", "CRM system"],
  ["saas", "SaaS platforma", "SaaS platform"],
  ["ai", "AI integratsiyasi", "AI integration"],
  ["other", "Boshqa", "Other"],
];
const field = "mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-slate-600";
const endpoint = "https://qhqhkgfdttvhmaizhorr.supabase.co/rest/v1/portfolio_orders";
const headers = { apikey: "sb_publishable_fB_bMMLw8J-u8Zw2jaf14A_Nd-IYxDO", "Content-Type": "application/json", Prefer: "return=minimal" };

export default function Order() {
  const uz = useOS(s => s.lang) === "uz";
  const [status, setStatus] = useState<"sent" | "error" | "duplicate" | null>(null);
  const [sending, setSending] = useState(false);
  const busy = useRef(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    const payload = Object.fromEntries(["name", "contact", "service", "description", "budget"].map(k => [k, String(data.get(k) ?? "").trim()]));
    if (!payload.name || payload.contact.length < 3 || payload.description.length < 10) { setStatus("error"); return; }
    busy.current = true;
    setSending(true); setStatus(null);
    try {
      const res = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(payload) });
      if (res.status === 409) { setStatus("duplicate"); return; }
      if (!res.ok) throw new Error("submit");
      setStatus("sent"); form.reset();
    } catch { setStatus("error"); }
    finally { setSending(false); busy.current = false; }
  }
  return <section className="space-y-5 text-slate-800">
    <header><h1 className="text-[26px] font-semibold tracking-tight">{uz ? "Buyurtma berish" : "Start a project"}</h1><p className="mt-1 text-sm text-slate-500">{uz ? "Loyihangiz haqida yozing yoki bevosita bog‘laning." : "Tell me about your project or contact me directly."}</p></header>
    <div className="grid grid-cols-2 gap-2">
      <a href="https://www.fiverr.com/shbvv1" target="_blank" rel="noreferrer" className="rounded-xl bg-[#16864f] px-3 py-3 text-center text-sm font-semibold text-white hover:opacity-90">{uz ? "Fiverr orqali" : "Order on Fiverr"} ↗</a>
      <a href="https://t.me/shbvv1" target="_blank" rel="noreferrer" className="rounded-xl bg-[#1686ba] px-3 py-3 text-center text-sm font-semibold text-white hover:opacity-90">{uz ? "Telegramdan yozish" : "Message on Telegram"} ↗</a>
    </div>
    <div className="flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200"/>{uz ? "yoki formani to‘ldiring" : "or fill out the form"}<span className="h-px flex-1 bg-slate-200"/></div>
    <form onSubmit={submit} className="space-y-3.5">
      <label className="block text-sm font-medium">{uz ? "Ismingiz" : "Your name"}<input name="name" required maxLength={80} autoComplete="name" className={field}/></label>
      <label className="block text-sm font-medium">{uz ? "Telegram yoki email" : "Telegram or email"}<input name="contact" required minLength={3} maxLength={150} placeholder="@username / email" className={field}/></label>
      <label className="block text-sm font-medium">{uz ? "Xizmat turi" : "Service"}<select name="service" required defaultValue="" className={field}><option value="" disabled>{uz ? "Tanlang" : "Select a service"}</option>{services.map(([id,u,en])=><option value={id} key={id}>{uz ? u : en}</option>)}</select></label>
      <label className="block text-sm font-medium">{uz ? "Loyiha haqida" : "Project details"}<textarea name="description" required minLength={10} maxLength={3000} rows={4} className={field} placeholder={uz ? "Qanday loyiha kerak?" : "What would you like to build?"}/></label>
      <label className="block text-sm font-medium">{uz ? "Budjet (ixtiyoriy)" : "Budget (optional)"}<input name="budget" maxLength={100} placeholder="$" className={field}/></label>
      <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off"/></div>
      <p className="text-xs leading-relaxed text-slate-500">{uz ? "Kontakt ma’lumotlaringiz faqat buyurtmaga javob berish uchun saqlanadi va boshqa tashrif buyuruvchilarga ko‘rinmaydi. Bu to‘lov emas, loyiha so‘rovi." : "Your contact details are stored to reply to your request and are not public. This is a project inquiry, not a payment."}</p>
      <button type="submit" disabled={sending} className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{sending ? (uz ? "Yuborilmoqda..." : "Sending...") : (uz ? "Buyurtma yuborish" : "Send request")}</button>
      {status && <p role="status" className={"rounded-lg p-3 text-sm " + (status==="sent" ? "bg-emerald-50 text-emerald-800" : "bg-slate-100 text-slate-700")}>{status==="sent" ? (uz ? "So‘rovingiz qabul qilindi. Rahmat!" : "Your request was received. Thank you!") : status==="duplicate" ? (uz ? "Bu so‘rov avval yuborilgan." : "This request was already submitted.") : (uz ? "So‘rov yuborilmadi. Qayta urinib ko‘ring yoki Telegramdan yozing." : "Could not send. Retry or contact me on Telegram.")}</p>}
    </form>
  </section>;
}
