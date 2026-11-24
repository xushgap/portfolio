// Only production builds configure the dedicated Portfolio Orders bot.
if(process.env.VERCEL_ENV==="production" && process.env.PORTFOLIO_BOT_TOKEN && process.env.PORTFOLIO_WEBHOOK_SECRET && process.env.PORTFOLIO_ORDERS_BRIDGE_SECRET){
  async function call(method,data){
    const res=await fetch("https://api.telegram.org/bot"+process.env.PORTFOLIO_BOT_TOKEN+"/"+method,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data),signal:AbortSignal.timeout(10000)});
    if(!res.ok)throw new Error(method+" failed ("+res.status+")");
    const json=await res.json();if(!json.ok)throw new Error(method+" failed");
    return json.result;
  }
  try{
    await call("setWebhook",{url:"https://shoxjahonos.vercel.app/api/telegram/webhook",secret_token:process.env.PORTFOLIO_WEBHOOK_SECRET,allowed_updates:["message","callback_query"]});
    console.log("Portfolio Orders webhook configured");
    await call("setMyName",{name:"Portfolio Orders"});
    await call("setMyDescription",{description:"Portfolio buyurtmalarini boshqarish uchun shaxsiy admin markazi. Yangi so‘rovlar, mijoz kontaktlari va statistika."});
    await call("setMyShortDescription",{short_description:"Portfolio Orders • Admin dashboard"});
    await call("setMyCommands",{commands:[{command:"start",description:"Bosh menyu"},{command:"orders",description:"So‘nggi buyurtmalar"},{command:"new",description:"Yangi buyurtmalar"},{command:"accepted",description:"Qabul qilingan"},{command:"rejected",description:"Rad etilgan"},{command:"delivered",description:"Topshirilgan"},{command:"stats",description:"Statistika"}]});
    console.log("Portfolio Orders menu configured");
  }catch(e){console.warn("Portfolio Orders setup not completed:",e instanceof Error ? e.message.replace(/https?:\/\/\S+/g,"[redacted]") : "unknown error");}
}
