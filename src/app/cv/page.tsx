"use client";

export default function CVPage() {
  return (
    <main className="min-h-screen bg-[#e9e9ec] px-4 py-8 text-[#25252b] print:bg-white print:p-0">
      <div className="mx-auto mb-5 flex max-w-[800px] items-center justify-between gap-3 print:hidden">
        <a href="/" className="text-sm font-medium hover:underline">← Portfolio</a>
        <button onClick={() => window.print()} className="rounded-lg bg-[#831e2b] px-5 py-2.5 text-sm font-semibold text-white">Download / Save as PDF</button>
      </div>
      <article className="mx-auto max-w-[800px] bg-white px-10 py-12 shadow-lg sm:px-14 print:max-w-none print:p-0 print:shadow-none">
        <header className="border-b-2 border-[#831e2b] pb-5">
          <h1 className="text-3xl font-bold tracking-tight">SHOXJAHON BEKCHANOV</h1>
          <p className="mt-1 text-sm font-semibold text-[#831e2b]">Junior Full-Stack Developer | AI Engineering</p>
          <p className="mt-3 text-xs leading-6">Khiva, Uzbekistan | <a href="mailto:bekchanovv1@gmail.com">bekchanovv1@gmail.com</a> | <a href="https://t.me/shbvv1">Telegram: @shbvv1</a></p>
          <p className="text-xs"><a href="https://github.com/xushgap">github.com/xushgap</a> | <a href="https://shoxjahonos.vercel.app/">Portfolio website</a> | <a href="https://www.fiverr.com/shbvv1">Fiverr: shbvv1</a></p>
        </header>
        <div className="space-y-5 pt-5 text-[13px] leading-[1.55] print:space-y-3 print:pt-4 print:text-[11px] print:leading-[1.4]">
          <section><h2 className="mb-2 text-sm font-bold tracking-widest text-[#831e2b]">PROFILE</h2><p>Early-career full-stack developer building websites, web applications, Telegram bots, CRM dashboards and SaaS products. Interested in responsive interfaces, database-backed applications, AI engineering, LLM integration and automation. Developing technical skills through independent projects and freelance work.</p></section>
          <section><h2 className="mb-2 text-sm font-bold tracking-widest text-[#831e2b]">TECHNICAL SKILLS</h2><p><b>Core:</b> HTML5, CSS3, JavaScript and Python (learning)</p><p><b>Front-end project experience:</b> TypeScript, React, Next.js, Tailwind CSS, Vite, Zustand, Framer Motion, Three.js, responsive design</p><p><b>Back-end &amp; databases:</b> Supabase, PostgreSQL, API integration, authentication, Google OAuth, database-backed applications</p><p><b>Telegram:</b> Telegram Bot API, Mini Apps</p><p><b>AI Engineering (project experience &amp; learning):</b> LLM API integration, Groq API, prompt engineering, AI chatbots, AI-powered search, workflow automation</p><p><b>Application development:</b> CRM dashboards, SaaS, admin panels, user profiles, multiplayer interfaces</p><p><b>Tools &amp; workflow:</b> Git, GitHub, Vercel, web deployment, UI prototyping</p></section>
          <section><h2 className="mb-2 text-sm font-bold tracking-widest text-[#831e2b]">SELECTED PROJECTS</h2>
            <div className="space-y-3 print:space-y-2">
              <div><b>BotForge | SaaS platform for Telegram bot creation</b><p>Developed a web product concept and interface for configuring and managing Telegram bots, with cloud-based infrastructure and account workflows. <a className="underline" href="https://botforge-creator.vercel.app/">Live website</a></p></div>
              <div><b>UzbeCards | Telegram card-game Mini App</b><p>Built a card-game experience featuring friend play, online matchmaking, player rankings, profiles, and customizable card skins. <a className="underline" href="https://t.me/UzbeCards_Bot">Telegram app</a></p></div>
              <div><b>NextGen English | Learning and group management platform</b><p>Group registration, attendance, assignments, grading, rankings and Google OAuth. <a className="underline" href="https://nextgen-english.vercel.app">Live website</a></p></div>
              <div><b>FoodRadar AI | Food price comparison</b><p>Web and Telegram experience using Supabase and Groq for menu discovery and price comparison. <a className="underline" href="https://foodradar-ai-uz.vercel.app/">Live website</a></p></div>
              <div><b>PMML Landing Page | Interactive web experience</b><p>Created a promotional landing page for a Telegram chatbot, using interactive visuals and a 3D-inspired presentation. <a className="underline" href="https://pmml-chatbot.vercel.app/">Live website</a></p></div>
            </div>
          </section>
          <section><h2 className="mb-2 text-sm font-bold tracking-widest text-[#831e2b]">EDUCATION</h2><p>School student | Khiva, Uzbekistan</p><p>Additional studies at Al-Xorazmiy Vorislari. Continuing independent study in programming and web development.</p></section>
          <section><h2 className="mb-2 text-sm font-bold tracking-widest text-[#831e2b]">LANGUAGES</h2><p>Uzbek — Native | English — Learning | Russian — Used in communication</p></section>
        </div>
      </article>
      <style jsx global>{`@media print { @page { size: A4; margin: 14mm; } html, body { background: white !important; } a { color: inherit; text-decoration: none; } }`}</style>
    </main>
  );
}
