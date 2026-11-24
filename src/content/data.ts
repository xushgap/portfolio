export type Lang = "uz" | "en";
export type L = Record<Lang, string>;

export const profile = {
  name: "Shohjahon Bekchanov",
  role: {
    uz: "Full-stack dasturchi",
    en: "Full-Stack Developer",
  } as L,
  location: { uz: "Xiva, Xorazm, O'zbekiston", en: "Khiva, Khorezm, Uzbekistan" } as L,
  bio: {
    uz: [
      "Salom! Men Shohjahon Bekchanov, O'zbekistonning Xiva shahridan bo'lgan full-stack yo'nalishidagi dasturchiman. Texnologiyalar, dizayn va yangi raqamli mahsulotlar yaratishga qiziqaman.",
      "Dasturlashda g'oyani shakllantirishdan boshlab, interfeys dizayni, front-end, back-end va ma'lumotlar bazasigacha bo'lgan jarayonlar bilan shug'ullanaman. Zamonaviy veb-saytlar, landing page'lar, Telegram botlar, Mini App'lar, CRM tizimlari va SaaS platformalarini yarataman.",
      "Loyihalarimda sodda va tushunarli interfeys, moslashuvchan dizayn hamda amaliy funksionallikka e'tibor beraman. AI integratsiyasi, avtomatlashtirish va interaktiv veb-tajribalar ham qiziqishlarim qatoriga kiradi.",
      "Hozir bilim va tajribamni oshirish, shaxsiy loyihalarimni rivojlantirish va xalqaro mijozlar bilan ishlash ustida harakat qilyapman. Fiverr orqali ham freelance xizmatlarimni taklif qilaman.",
    ],
    en: [
      "Hi! I'm Shohjahon Bekchanov, a developer based in Khiva, Uzbekistan, focused on full-stack development. I'm interested in technology, design, and building new digital products.",
      "I enjoy the entire development process, from shaping an idea and designing its interface to working on the front end, back end, and database. I build modern websites, landing pages, Telegram bots, Mini Apps, CRM systems, and SaaS platforms.",
      "My projects emphasize clear interfaces, responsive design, and practical functionality. I'm also interested in AI integration, automation, and interactive web experiences.",
      "I'm currently developing my skills, improving my personal projects, and working toward collaborating with international clients. I also offer freelance services on Fiverr.",
    ],
  } as Record<Lang, string[]>,

  facts: [
    {
      key: { uz: "Hozir", en: "Currently" } as L,
      value: { uz: "Full-stack yo'nalishida o'qiyapman va ishlayapman", en: "Learning & developing in full-stack" } as L,
    },
    {
      key: { uz: "Shuningdek", en: "Also" } as L,
      value: { uz: "Telegram bot development", en: "Telegram bot development" } as L,
    },
    {
      key: { uz: "Joylashuv", en: "Based in" } as L,
      value: { uz: "Xiva, Xorazm, O'zbekiston", en: "Khiva, Khorezm, Uzbekistan" } as L,
    },
    {
      key: { uz: "Yo'nalish", en: "Focus" } as L,
      value: {
        uz: "Full-stack · Web Apps · CRM · SaaS · Telegram Bots · AI",
        en: "Full-stack · Web Apps · CRM · SaaS · Telegram Bots · AI",
      } as L,
    },
  ],

  contacts: [
    { label: "Fiverr", value: "fiverr.com/shbvv1", href: "https://www.fiverr.com/shbvv1" },
    { label: "Telegram", value: "@shbvv1", href: "https://t.me/shbvv1" },
    { label: "Email", value: "bekchanovv1@gmail.com", href: "mailto:bekchanovv1@gmail.com" },
    { label: "GitHub", value: "github.com/xushgap", href: "https://github.com/xushgap" },
  ],
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  stack: string[];
  summary: L;
  body: Record<Lang, string[]>;
  live?: string;
  liveLabel?: L;
  telegram?: string;
};

export const projects: Project[] = [
  {
    slug: "foodradar-ai",
    name: "FoodRadar AI",
    year: "2026",
    stack: ["Next.js", "Supabase", "Groq", "Telegram Bot API"],
    summary: {
      uz: "O‘zbekistonda fastfud va kombo narxlarini sayt yoki Telegram orqali solishtiring.",
      en: "Compare fast food and combo prices across Uzbekistan on the web or Telegram.",
    },
    body: {
      uz: ["Shahar va byudjetingizni yozing. FoodRadar AI restoran menyularidan mos taomlarni narxi va manbasi bilan topadi. Katalogda mos taom bo‘lmasa, internetdan menyu qidiradi."],
      en: ["Enter your city and budget to find dishes with prices and menu sources. When the catalog has no match, FoodRadar AI searches for menus on the web."],
    },
    live: "https://foodradar-ai-uz.vercel.app/",
    liveLabel: { uz: "Saytni ochish", en: "Open website" },
    telegram: "https://t.me/FoodRadar_AiBot",
  },
  {
    slug: "nextgen-english",
    name: "NextGen English",
    year: "2026",
    stack: ["Web App", "JavaScript", "Supabase", "PostgreSQL", "Google OAuth", "Vercel"],
    summary: {
      uz: "Ingliz tilini o‘rganish va o‘quv guruhlarini boshqarish uchun interaktiv platforma",
      en: "An interactive platform for learning English and managing study groups",
    },
    body: {
      uz: [
        "NextGen English — o‘quvchilar va o‘qituvchilar uchun yaratilgan ingliz tili web platformasi. Guruh bo‘yicha ro‘yxatdan o‘tish, davomat, vazifalar, baholash, reyting va support yozishmalari mavjud.",
        "Platformada 4000 Essential English Words bo‘yicha kitob va Unitlarga ajratilgan lug‘at, irregular verbs, testlar hamda telefonga moslashtirilgan Word Runner o‘yini bor. Interfeys telefon va kompyuter uchun moslashuvchan, ma’lumotlar Supabase’da saqlanadi.",
      ],
      en: [
        "NextGen English is a web platform for English learners and teachers. It brings together group-based registration, attendance, assignments, grading, rankings and support messages.",
        "It includes book- and unit-based vocabulary practice for the 4000 Essential English Words series, irregular verbs, quizzes and a mobile-friendly Word Runner game. The responsive interface connects to Supabase for data storage.",
      ],
    },
    live: "https://nextgen-english.vercel.app",
    liveLabel: { uz: "Saytni ochish", en: "Live demo" } as L,
  },
  {
    slug: "uzbecards",
    name: "UzbeCards",
    year: "2026",
    stack: ["Telegram Mini App", "Card Game", "Multiplayer", "Web Development"],
    summary: {
      uz: "Do'stlar va boshqa o'yinchilar bilan karta o'ynash uchun Telegram Mini App",
      en: "A Telegram Mini App for playing cards with friends and online players",
    },
    body: {
      uz: [
        "UzbeCards — Telegram ichida ishlaydigan karta o'yini. Unda do'stlar bilan o'ynash va onlayn raqib qidirish imkoniyatlari mavjud.",
        "Loyihada o'yinchilar reytingi, profil, karta skinlari va onlayn raqib topilmasa boshqa o'yin rejimini tanlash kabi funksiyalar ko'zda tutilgan.",
      ],
      en: [
        "UzbeCards is a card game built as a Telegram Mini App, with modes for playing with friends and finding online opponents.",
        "The project includes player profiles, rankings, card skins and alternative play modes when no online opponent is found.",
      ],
    },
    live: "https://t.me/UzbeCards_Bot",
    liveLabel: { uz: "Telegramda ochish", en: "Open in Telegram" } as L,
  },
  {
    slug: "uzbek-cuisine",
    name: "Uzbek Cuisine",
    year: "2026",
    stack: ["Web Development"],
    summary: {
      uz: "O'zbek milliy taomlari haqida web loyiha",
      en: "A web project about Uzbek national cuisine",
    },
    body: {
      uz: [
        "O'zbek milliy taomlari va oshxonasi haqida ma'lumot beruvchi web loyiha.",
        "Har bir taom haqida ma'lumot toza va o'qishga qulay ko'rinishda joylashtirilgan — maqsad foydalanuvchi qidirayotgan narsasini tez topishi edi.",
      ],
      en: [
        "A web project that presents information about Uzbek national dishes and cuisine.",
        "Each dish is laid out in a clean, readable way — the goal was for visitors to find what they're looking for quickly.",
      ],
    },
    live: "https://uzbekcuisine.vercel.app/",
    liveLabel: { uz: "Saytni ochish", en: "Live demo" } as L,
  },
  {
    slug: "viruschecker",
    name: "VirusChecker",
    year: "2026",
    stack: ["Python", "Telegram Bot", "VirusTotal API"],
    summary: {
      uz: "Fayllarni xavfsizlik uchun tekshiruvchi Telegram bot",
      en: "A Telegram bot that scans files for threats",
    },
    body: {
      uz: [
        "Foydalanuvchi yuborgan fayllarni VirusTotal orqali tekshiradi va xavfsizlik tahlilini qaytaradi.",
        "Bot fayl qabul qiladi, uni API'ga uzatadi va natijani tushunarli ko'rinishda — qaysi antiviruslar nima deganini ko'rsatib beradi.",
      ],
      en: [
        "Scans files sent by the user through VirusTotal and returns a security analysis.",
        "The bot takes a file, passes it to the API and reports the result in a readable form — showing what each antivirus engine flagged.",
      ],
    },
    live: "https://t.me/VirusCheck_robot",
    liveLabel: { uz: "Telegramda ochish", en: "Open in Telegram" } as L,
  },
  {
    slug: "pmml",
    name: "PMML",
    year: "2026",
    stack: ["Telegram Bot", "AI"],
    summary: {
      uz: "Suhbatdosh Telegram bot",
      en: "A Telegram bot built for conversation",
    },
    body: {
      uz: [
        "Foydalanuvchi bilan suhbatlashish uchun yaratilgan Telegram bot.",
        "Asosiy maqsadi oddiy AI yordamchi bo'lish emas, balki suhbatdosh sifatida muloqot qilish — savolga javob beruvchi vosita emas, gaplashadigan bot.",
      ],
      en: [
        "A Telegram bot built to have conversations with the user.",
        "The goal wasn't to be another AI assistant, but to actually talk like a companion — not a tool that answers queries, but a bot you can chat with.",
      ],
    },
    live: "https://t.me/pmml_aibot",
    liveLabel: { uz: "Telegramda ochish", en: "Open in Telegram" } as L,
  },
  {
    slug: "pmml-landing",
    name: "PMML Landing Page",
    year: "2026",
    stack: ["React", "TypeScript", "Vite", "Three.js", "3D Animation"],
    summary: {
      uz: "PMML suhbatdosh bot uchun 3D animatsiyali landing page",
      en: "A 3D animated landing page for the PMML chat companion",
    },
    body: {
      uz: [
        "PMML Telegram botini tanishtirish uchun yaratilgan alohida landing page. Maqsad botning suhbatdosh sifatidagi xarakterini zamonaviy, esda qoladigan vizual tajriba orqali ko‘rsatish.",
        "Loyihada React, TypeScript va Three.js asosidagi 3D vizuallar hamda interaktiv animatsiyalar ishlatiladi. Dizayn qora va yashil ranglar, silliq harakatlar va PMML brendiga mos uslubga tayangan.",
      ],
      en: [
        "A dedicated landing page introducing PMML, a Telegram chat companion. The goal is to express the bot's conversational personality through a modern, memorable visual experience.",
        "The project uses React, TypeScript and Three.js for 3D visuals and interactive animation, with a black-and-green palette and a visual style built around the PMML brand.",
      ],
    },
    live: "https://pmml-chatbot.vercel.app",
    liveLabel: { uz: "Saytni ochish", en: "Live demo" } as L,
  },
  {
    slug: "botforge",
    name: "BotForge",
    year: "2026",
    stack: ["SaaS", "Web Development", "Telegram Bots", "Supabase", "Vercel"],
    summary: {
      uz: "Telegram botlarini yaratish va boshqarish uchun SaaS platforma",
      en: "A SaaS platform for creating and managing Telegram bots",
    },
    body: {
      uz: [
        "BotForge — Telegram botlarini yaratish va boshqarishni qulaylashtirishga qaratilgan web platforma.",
        "Loyiha sodda va tushunarli interfeys, botlarni sozlash jarayoni hamda bulutli infratuzilmaga e'tibor qaratadi.",
      ],
      en: [
        "BotForge is a web platform designed to simplify creating and managing Telegram bots.",
        "The project focuses on an accessible interface, bot configuration workflows and cloud-based infrastructure.",
      ],
    },
    live: "https://botforge-creator.vercel.app/",
    liveLabel: { uz: "Saytni ochish", en: "Live demo" } as L,
  },
];

// Hazil bo'lim — o'zingizga moslab o'zgartiring yoki butunlay o'chirib tashlang
export const trashItems: Record<Lang, string[]> = {
  uz: [
    "Birinchi saytim — faqat <table> teglaridan iborat edi",
    "\"Ertaga albatta boshlayman\" rejasi",
    "Tugallanmagan pet-project'lar papkasi",
  ],
  en: [
    "My first website — built entirely out of <table> tags",
    "The \"I'll definitely start tomorrow\" plan",
    "A folder of unfinished pet projects",
  ],
};

export const ui = {
  contact: { uz: "Bog'lanish", en: "Get in touch" } as L,
  contactNote: {
    uz: "Loyiha, hamkorlik yoki shunchaki savol bo'lsa — yozing.",
    en: "Got a project, an offer or just a question? Write to me.",
  } as L,
  stack: { uz: "Texnologiyalar", en: "Stack" } as L,
  sourceCode: { uz: "Kodi", en: "Source" } as L,
  files: { uz: "ta loyiha", en: "projects" } as L,
  trashNote: {
    uz: "Amalga oshmagan g'oyalar. Har biridan biror narsa o'rgandim.",
    en: "Ideas that didn't make it. I learned something from each one.",
  } as L,
  hint: {
    uz: "Papkani oching, oynalarni suring",
    en: "Open a folder, drag the windows",
  } as L,
};
