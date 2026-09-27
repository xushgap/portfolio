"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useOS, idForRoute, activeRoute } from "@/lib/os";
import Desktop from "@/components/Desktop";
import Phone from "@/components/Phone";

function useIsMobile() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return mobile;
}

export default function OS() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const windows = useOS((s) => s.windows);
  const open = useOS((s) => s.open);
  const closeAll = useOS((s) => s.closeAll);
  const current = activeRoute(windows);

  /* URL -> windows (deep links + browser back/forward) */
  useEffect(() => {
    if (pathname === current) return;
    const id = idForRoute(pathname);
    if (id) open(id);
    else if (pathname === "/") closeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /* windows -> URL (topmost window defines the address) */
  useEffect(() => {
    if (current !== window.location.pathname) {
      router.push(current, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  /* Esc closes the focused window */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const ws = useOS.getState().windows;
      if (!ws.length) return;
      const top = ws.reduce((a, b) => (a.z > b.z ? a : b));
      useOS.getState().close(top.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (isMobile === null) {
    return <div className="h-[100dvh] w-full bg-[#0f1115]" />;
  }
  return isMobile ? <Phone /> : <Desktop />;
}
