export type Lang = "uz" | "en";
export type L = Record<Lang, string>;

export const profile = {
  name: "Shohjahon Bekchanov",
  role: {
    uz: "Front-end dasturchi",
    en: "Front-end Developer",
  } as L,
  location: { uz: "Xiva, Xorazm, O'zbekiston", en: "Khiva, Khorezm, Uzbekistan" } as L,
  bio: {
    uz: [
      "Men hozir front-end development yo'nalishida o'qib, o'rganib va amaliy loyihalar orqali tajriba to'plab kelayotgan dasturchiman.",
      "Web yaratish menga shunchaki kod yozishdan ko'ra ko'proq yoqadi. G'oyani o'ylab topish, uni dizayn qilish va oxirida ishlaydigan loyihaga aylantirish jarayoni men uchun qiziq.",
      "Shuningdek, Telegram botlar yaratish bilan ham shug'ullanaman. Botlar orqali turli g'oyalarni avtomatlashtirish va foydali funksiyalarni amalda sinab ko'rish menga yangi tajriba beradi.",
      "Hozircha yo'limning boshidaman va hali o'rganadigan narsalarim ko'p. Har bir yangi loyiha men uchun yangi bilim va tajriba. Xatolardan o'rganib, keyingi loyihalarimni avvalgilaridan yaxshiroq qilishga harakat qilaman.",
      "Asosiy e'tiborim front-end development, zamonaviy interfeyslar va foydalanuvchiga qulay web loyihalar yaratishga qaratilgan.",
    ],
    en: [
      "I'm a developer currently studying front-end development and gaining experience by building real projects.",
      "I enjoy making things for the web more than just writing code. Coming up with an idea, designing it and turning it into something that actually works — that whole process is what interests me.",
      "I also build Telegram bots. Automating ideas through bots and testing useful features in practice keeps teaching me something new.",
      "I'm still at the beginning of the road and there's a lot left to learn. Every new project is new knowledge for me. I learn from my mistakes and try to make each project better than the last.",
      "My main focus is front-end development, modern interfaces and web projects that feel easy to use.",
    ],
  } as Record<Lang, string[]>,

  facts: [
    {
      key: { uz: "Hozir", en: "Currently" } as L,
      value: { uz: "Front-end yo'nalishida o'qiyapman va ishlayapman", en: "Learning & developing in front-end" } as L,
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
        uz: "Front-end · Web Development · UI · Telegram Bots",
        en: "Front-end · Web Development · UI · Telegram Bots",
      } as L,
    },
  ],

  contacts: [
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
};

export const projects: Project[] = [
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
