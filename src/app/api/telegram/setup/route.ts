import { NextResponse } from "next/server";
import { authorized, telegram, adminId, hasAdminKey } from "@/lib/portfolioOrders";
export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!authorized(req.headers.get("x-setup-secret"))) return new NextResponse(null,{status:403});
  if (!adminId() || !hasAdminKey() || !process.env.PORTFOLIO_BOT_TOKEN) return NextResponse.json({ok:false},{status:503});
  try {
    await telegram("setWebhook",{url:"https://shoxjahonos.vercel.app/api/telegram/webhook",secret_token:process.env.PORTFOLIO_WEBHOOK_SECRET,allowed_updates:["message","callback_query"]});
    await telegram("setMyCommands",{commands:[{command:"orders",description:"So‘nggi buyurtmalar"},{command:"new",description:"Yangi buyurtmalar"},{command:"accepted",description:"Qabul qilingan"},{command:"rejected",description:"Rad etilgan"},{command:"delivered",description:"Topshirilgan"},{command:"stats",description:"Statistika"}]});
    return NextResponse.json({ok:true});
  } catch { return NextResponse.json({ok:false},{status:502}); }
}
