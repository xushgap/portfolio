"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useOS } from "@/lib/os";

const endpoint = "https://qhqhkgfdttvhmaizhorr.supabase.co/rest/v1/portfolio_comments";
const headers = { apikey: "sb_publishable_fB_bMMLw8J-u8Zw2jaf14A_Nd-IYxDO", "Content-Type": "application/json" };
type Comment = { id: string; name: string; comment: string; created_at: string };

export default function Comments() {
  const lang = useOS(s => s.lang);
  const uz = lang === "uz";
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [items, setItems] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"sent" | "error" | "duplicate" | "cooldown" | null>(null);
  const lastSent = useRef(0);
  const busy = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch(endpoint + "?select=id,name,comment,created_at&order=created_at.desc&limit=100", { headers, cache: "no-store" });
      if (!res.ok) throw new Error("load");
      setItems(await res.json());
    } catch { setLoadError(true); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current || !name.trim() || !comment.trim()) return;
    if (Date.now() - lastSent.current < 15000) { setStatus("cooldown"); return; }
    busy.current = true;
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { ...headers, Prefer: "return=minimal" }, body: JSON.stringify({ name: name.trim(), comment: comment.trim() }) });
      if (res.status === 409) { setStatus("duplicate"); return; }
      if (!res.ok) throw new Error("send");
      lastSent.current = Date.now();
      setComment("");
      setStatus("sent");
      await load();
    } catch { setStatus("error"); }
    finally { busy.current = false; setSending(false); }
  }

  return (
    <section className="space-y-6 text-slate-800">
      <header><h1 className="text-[26px] font-semibold tracking-tight">{uz ? "Izohlar" : "Comments"}</h1><p className="mt-1 text-sm text-slate-500">{uz ? "Portfolio haqida fikringizni qoldiring." : "Leave your feedback about the portfolio."}</p></header>
      <form onSubmit={submit} className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="block text-sm font-medium">{uz ? "Ismingiz" : "Your name"}<input required maxLength={50} value={name} onChange={e => setName(e.target.value)} autoComplete="nickname" placeholder={uz ? "Ism yoki taxallus" : "Name or nickname"} className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-600" /></label>
        <label className="block text-sm font-medium">{uz ? "Izohingiz" : "Your comment"}<textarea required rows={4} maxLength={1000} value={comment} onChange={e => setComment(e.target.value)} placeholder={uz ? "Fikringizni yozing..." : "Write your feedback..."} className="mt-1.5 block w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-600" /></label>
        <div className="flex justify-between text-xs text-slate-500"><span>{uz ? "Ism va izoh hammaga ko‘rinadi." : "Your name and comment will be public."}</span><span>{comment.length}/1000</span></div>
        <button disabled={sending || !name.trim() || !comment.trim()} className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50">{sending ? (uz ? "Yuborilmoqda..." : "Sending...") : (uz ? "Izoh qoldirish" : "Post comment")}</button>
        {status && <p role="status" className={"text-sm " + (status === "sent" ? "text-emerald-700" : "text-red-700")}>{status === "sent" ? (uz ? "Izohingiz yuborildi." : "Comment posted.") : status === "duplicate" ? (uz ? "Bu izoh avval yuborilgan." : "This comment was already posted.") : status === "cooldown" ? (uz ? "Keyingi izohdan oldin 15 soniya kuting." : "Please wait 15 seconds between comments.") : (uz ? "Yuborilmadi. Qayta urinib ko‘ring." : "Could not post. Please retry.")}</p>}
      </form>
      <div className="space-y-3"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">{uz ? "So‘nggi izohlar" : "Recent comments"}</h2><button onClick={() => void load()} className="text-xs text-slate-500 underline">{uz ? "Yangilash" : "Refresh"}</button></div>
        {loading ? <p className="text-sm text-slate-500">{uz ? "Yuklanmoqda..." : "Loading..."}</p> : loadError ? <p role="alert" className="text-sm text-red-700">{uz ? "Izohlar yuklanmadi. Yangilashni bosing." : "Could not load comments. Try refreshing."}</p> : items.length === 0 ? <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">{uz ? "Hozircha izohlar yo‘q. Birinchi bo‘lib yozing!" : "No comments yet. Be the first!"}</p> : items.map(item => <article key={item.id} className="rounded-xl border border-slate-200 p-3.5"><div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="break-all text-sm font-semibold">{item.name}</h3><time dateTime={item.created_at} className="text-xs text-slate-400">{new Date(item.created_at).toLocaleDateString(uz ? "uz-UZ" : "en-GB", { timeZone: "Asia/Tashkent" })}</time></div><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-600">{item.comment}</p></article>)}
      </div>
    </section>
  );
}
