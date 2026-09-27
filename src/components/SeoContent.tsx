import { profile, projects } from "@/content/data";

/**
 * Server-rendered copy of every piece of content on the site.
 * Visually hidden, but present in the HTML source — so search engines
 * and screen readers get the real text even though the visible UI is
 * a client-side "desktop" that draws windows on demand.
 */
export default function SeoContent() {
  return (
    <div className="sr-only">
      <h1>
        {profile.name} — {profile.role.uz} / {profile.role.en}
      </h1>
      <p>{profile.location.uz}</p>

      <section>
        <h2>Men haqimda / About</h2>
        {profile.bio.uz.map((p, i) => (
          <p key={`uz-${i}`}>{p}</p>
        ))}
        {profile.bio.en.map((p, i) => (
          <p key={`en-${i}`}>{p}</p>
        ))}
        <ul>
          {profile.facts.map((f) => (
            <li key={f.key.en}>
              {f.key.uz}: {f.value.uz}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Loyihalar / Projects</h2>
        {projects.map((p) => (
          <article key={p.slug}>
            <h3>
              {p.name} ({p.year})
            </h3>
            <p>{p.summary.uz}</p>
            <p>{p.summary.en}</p>
            <p>Stack: {p.stack.join(", ")}</p>
            {p.body.uz.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            {p.live && <a href={p.live}>{p.name}</a>}
          </article>
        ))}
      </section>

      <section>
        <h2>Bog'lanish / Contact</h2>
        <ul>
          {profile.contacts.map((c) => (
            <li key={c.label}>
              <a href={c.href}>
                {c.label}: {c.value}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
