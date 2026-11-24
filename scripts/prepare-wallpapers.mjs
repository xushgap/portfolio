import { mkdir, writeFile, stat, access, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";
const target = resolve("public/wallpapers");
await mkdir(target,{recursive:true});
const temp=await mkdtemp(join(tmpdir(),"portfolio-wallpapers-"));
const assets=[["big-sur-night","11-0-Night.jpg"],["mojave-night","10-14-Night.jpg"]];
const sizes=[["",1920,75],["-mobile",960,72],["-thumb",240,65]];
try {
  for(const [id,filename] of assets){
    const outputs=sizes.map(([suffix])=>join(target,id+suffix+".webp"));
    if((await Promise.all(outputs.map(p=>access(p).then(()=>true,()=>false)))).every(Boolean))continue;
    const res=await fetch("https://raw.githubusercontent.com/LAYTAT/macOS-Wallpapers/main/"+filename,{signal:AbortSignal.timeout(45000)});
    if(!res.ok)throw new Error("Wallpaper source unavailable: "+filename+" ("+res.status+")");
    const input=join(temp,filename);
    await writeFile(input,Buffer.from(await res.arrayBuffer()));
    for(const [suffix,width,quality] of sizes){
      const out=join(target,id+suffix+".webp");
      execFileSync(process.platform==="win32"?"npx.cmd":"npx",["--yes","--package=sharp-cli@5.2.0","--","sharp","-i",input,"-o",out,"-f","webp","-q",String(quality),"resize",String(width)],{stdio:"inherit",timeout:180000});
      console.log("Wallpaper optimized:",id+suffix,Math.round((await stat(out)).size/1024)+" KB");
    }
  }
} finally { await rm(temp,{recursive:true,force:true}); }
