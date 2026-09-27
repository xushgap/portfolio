# Portfolio OS — Shohjahon Bekchanov

Desktop operatsion tizimi ko'rinishidagi shaxsiy portfolio. Kompyuterda — papkalar va suriladigan oynalar, telefonda — iPhone home screen.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Zustand · Framer Motion

---

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Kontentni tahrirlash

Deyarli hamma matn bitta faylda:

| Fayl | Nima uchun |
|---|---|
| `src/content/data.ts` | Ism, bio, faktlar, loyihalar, kontaktlar, "Savat" matni |
| `src/content/wallpapers.ts` | Fon variantlari |
| `src/lib/site.ts` | Sayt domeni (SEO uchun) |

### Yangi loyiha qo'shish

`src/content/data.ts` ichidagi `projects` massiviga qo'shing:

```ts
{
  slug: "yangi-loyiha",          // URL: /projects/yangi-loyiha
  name: "Yangi Loyiha",
  year: "2026",
  stack: ["Next.js", "TypeScript"],
  summary: { uz: "Qisqa tavsif", en: "Short description" },
  body: {
    uz: ["Birinchi abzats.", "Ikkinchi abzats."],
    en: ["First paragraph.", "Second paragraph."],
  },
  live: "https://...",
  liveLabel: { uz: "Saytni ochish", en: "Live demo" },
}
```

Route avtomatik yaratiladi, sitemap ham o'zi yangilanadi.

---

## Arxitektura

### Routing — URL bu fokusdagi oyna

| URL | Nima ochiladi |
|---|---|
| `/` | Bo'sh desktop |
| `/about` | About oynasi |
| `/projects` | Loyihalar papkasi |
| `/projects/:slug` | Bitta loyiha |
| `/trash` | Savat |

- Barcha route'lar `src/app/[[...slug]]/page.tsx` catch-all orqali, build vaqtida **statik** generatsiya qilinadi
- To'g'ridan-to'g'ri `/about` ga kirilsa — desktop chiqadi va oyna allaqachon ochiq (deep link)
- Brauzerning **orqaga** tugmasi oynani yopadi
- URL sinxronizatsiyasi: `src/components/OS.tsx`

### SEO

Ko'rinadigan UI to'liq client-side chiziladi, shuning uchun `src/components/SeoContent.tsx` server tomonda **ko'rinmas** (`sr-only`) to'liq matn qatlamini render qiladi: bio (UZ+EN), barcha loyihalar, kontaktlar. Google va screen reader'lar shuni o'qiydi.

`sitemap.xml` va `robots.txt` avtomatik generatsiya qilinadi.

### Holat (state)

`src/lib/os.ts` — Zustand store: ochiq oynalar, z-index, ikonka joylashuvi, til, fon.
`localStorage`da saqlanadi: **til**, **fon**, **ikonka joylashuvi**. Ochiq oynalar saqlanmaydi.

---

## Vercel'ga deploy

1. GitHub'da yangi **bo'sh** repo yarating (masalan `portfolio`)
2. Shu papkada:

```bash
git init
git add .
git commit -m "Portfolio OS"
git branch -M main
git remote add origin https://github.com/xushgap/portfolio.git
git push -u origin main
```

3. [vercel.com/new](https://vercel.com/new) → GitHub bilan kiring → repo'ni **Import**
4. Hech narsani o'zgartirmang (Next.js avtomatik aniqlanadi) → **Deploy**
5. Deploy tugagach, **Settings → Environment Variables** ga qo'shing:

```
NEXT_PUBLIC_SITE_URL = https://sizning-domeningiz.vercel.app
```

6. **Deployments → Redeploy** (sitemap va OG teglari to'g'ri domen bilan yangilanishi uchun)

### O'z domeningiz

Vercel → **Settings → Domains** → domen qo'shing. Keyin `NEXT_PUBLIC_SITE_URL` ni ham yangilab, qayta deploy qiling.

---

## Qilinishi mumkin (Faza 2)

- [ ] Oynani chetidan cho'zish (resize)
- [ ] Desktopda o'ng tugma → kontekst menyu
- [ ] Loyihalar skrinshotlari
- [ ] Boot animatsiya
- [ ] Har bir loyiha uchun OG rasm
