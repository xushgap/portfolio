import { NextResponse } from "next/server";
import { authorized, adminId, db, telegram, sendOrder, orderText, keyboard, statusLabel, type Order } from "@/lib/portfolioOrders";
export const runtime = "nodejs";
type Message = { text?: string; chat?: { id: number; type: string }; from?: {id:number}; message_id?:number };
type Update = { message?: Message; callback_query?: { id:string; from:{id:number}; data?:string; message?:Message } };
export async function POST(req: Request) {
  if (!authorized(req.headers.get("x-telegram-bot-api-secret-token"))) return new NextResponse(null,{status:403});
  try {
    const u = await req.json() as Update;
    const id = adminId(), m = u.message, cb = u.callback_query;
    const privateAdmin = (msg?:Message, from?:number) => Boolean(id && msg?.chat?.type === "private" && String(msg.chat.id) === id && String(from) === id);
    if (cb) {
      if (!privateAdmin(cb.message, cb.from.id)) return NextResponse.json({ok:true});
      const match = /^(accept|reject):([0-9a-f-]{36})$/.exec(cb.data || "");
      if (!match) { await telegram("answerCallbackQuery",{callback_query_id:cb.id,text:"Noma’lum amal"}); return NextResponse.json({ok:true}); }
      const status = match[1] === "accept" ? "accepted" : "rejected";
      const res = await db("?id=eq."+match[2]+"&status=eq.new",{method:"PATCH",headers:{Prefer:"return=representation"},body:JSON.stringify({status})});
      if (!res.ok) throw new Error("Update failed");
      const rows = await res.json() as Order[];
      await telegram("answerCallbackQuery",{callback_query_id:cb.id,text:rows[0] ? statusLabel(status) : "Holati avval o‘zgartirilgan"});
      if (rows[0]) await telegram("editMessageText",{chat_id:id,message_id:cb.message?.message_id,text:orderText(rows[0]),reply_markup:keyboard(rows[0]),link_preview_options:{is_disabled:true}});
      return NextResponse.json({ok:true});
    }
    if (!privateAdmin(m,m?.from?.id)) return NextResponse.json({ok:true});
    const cmd = (m?.text || "").split(/\s+/)[0].split("@")[0];
    const send = (text:string) => telegram("sendMessage",{chat_id:id,text,link_preview_options:{is_disabled:true}});
    if (cmd === "/stats") {
      const counts = await Promise.all(["new","accepted","rejected"].map(async status=>{
        const res = await db("?status=eq."+status+"&select=id",{method:"HEAD",headers:{Prefer:"count=exact",Range:"0-0"}});
        if (!res.ok) throw new Error("Count failed");
        return res.headers.get("content-range")?.split("/").pop() || "0";
      }));
      await send("Buyurtmalar statistikasi\nYangi: "+counts[0]+"\nQabul qilingan: "+counts[1]+"\nRad etilgan: "+counts[2]);
    } else if (["/orders","/new","/accepted","/rejected"].includes(cmd)) {
      const status = cmd === "/orders" ? "" : "&status=eq."+cmd.slice(1);
      const res = await db("?select=*&order=created_at.desc&limit=5"+status);
      if (!res.ok) throw new Error("List failed");
      const rows = await res.json() as Order[];
      if (!rows.length) await send("Buyurtmalar yo‘q.");
      else { await send("So‘nggi "+rows.length+" ta buyurtma:"); for (const row of rows) await sendOrder(row); }
    } else await send("Portfolio Orders\n/orders — so‘nggi buyurtmalar\n/new — yangi\n/accepted — qabul qilingan\n/rejected — rad etilgan\n/stats — statistika");
    return NextResponse.json({ok:true});
  } catch { return NextResponse.json({ok:false},{status:500}); }
}
