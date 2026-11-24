import { NextResponse } from "next/server";
import { db, hasAdminKey, sendOrder, type Order } from "@/lib/portfolioOrders";
export const runtime = "nodejs";
const allowed = new Set(["website","landing","telegram","crm","saas","ai","other"]);
export async function POST(req: Request) {
  try {
    if (Number(req.headers.get("content-length") || 0) > 24000) return NextResponse.json({ok:false},{status:413});
    const raw = await req.text();
    if (raw.length > 24000) return NextResponse.json({ok:false},{status:413});
    const input = JSON.parse(raw);
    const clean = (k:string) => typeof input?.[k] === "string" ? input[k].trim() : "";
    const name = clean("name"), contact = clean("contact"), service = clean("service"), description = clean("description"), budget = clean("budget");
    if (!name || name.length > 80 || contact.length < 3 || contact.length > 150 || !allowed.has(service) || description.length < 10 || description.length > 3000 || budget.length > 100) return NextResponse.json({ok:false},{status:400});
    const admin = hasAdminKey();
    const res = await db("", {method:"POST",headers:{Prefer:admin ? "return=representation" : "return=minimal"},body:JSON.stringify({name,contact,service,description,budget})},admin);
    if (!res.ok) return NextResponse.json({ok:false},{status:res.status===409?409:503});
    if (admin) {
      const rows = await res.json() as Order[];
      if (rows[0] && process.env.PORTFOLIO_BOT_TOKEN) {
        try { await sendOrder(rows[0]); } catch { console.warn("Portfolio order stored; notification failed"); }
      }
    }
    return NextResponse.json({ok:true},{status:201});
  } catch { return NextResponse.json({ok:false},{status:503}); }
}
