import { PropsWithChildren, useEffect } from "react";
import Archive from "./components/Archive";
import Desk from "./components/Desk";
import {
  certifications,
  education,
  featured,
  job,
  leadership,
  profile,
  recognition,
  research,
  skills,
} from "./data/content";

const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Ext = ({ href, children, className = "link" }: PropsWithChildren<{ href: string; className?: string }>) => (
  <a className={className} href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
);

const SecHead = ({ id, title, aside }: { id: string; title: string; aside?: string }) => (
  <header className="sec-head">
    <h2 id={id}>{title}</h2>
    {aside && <p className="hand sec-aside">{aside}</p>}
  </header>
);

/** The page's one reveal: blocks settle in once as they enter. */
const useReveal = () => {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const App = () => {
  useReveal();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header className="top container">
        <a href="#main" className="wordmark" aria-label="Dishan Sarkar, home">
          Dishan Sarkar
        </a>
        <nav className="pill" aria-label="Sections">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
          <Ext href={profile.resume} className="pill-cta">
            Résumé
          </Ext>
        </nav>
      </header>

      <main id="main">
        <Desk />

        <section className="sec container" aria-labelledby="work-h" id="work">
          <SecHead id="work-h" title="Selected work" aside="the three I’d show you first" />
          <div className="folders" data-reveal>
            {featured.map((p, i) => (
              <article key={p.name} className={`folder folder-${p.tone}`} style={{ ["--tilt" as string]: `${[-1.2, 0.8, -0.6][i]}deg` }}>
                <p className="folder-tab">{p.kind}</p>
                <div className="folder-body">
                  <h3>{p.name}</h3>
                  <p className="folder-summary">{p.summary}</p>
                  <dl className="folder-stats">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="num">{s.value}</dt>
                        <dd>{s.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="folder-stack">{p.stack}</p>
                  <div className="folder-links">
                    {p.live && (
                      <Ext href={p.live} className="folder-link">
                        Try the demo
                      </Ext>
                    )}
                    <Ext href={p.href} className="folder-link">
                      View source
                    </Ext>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sec container" aria-labelledby="about-h" id="about">
          <SecHead id="about-h" title="Where I’ve been" />
          <div className="about" data-reveal>
            <div className="badge-wrap">
              <span className="lanyard" aria-hidden="true" />
              <div className="badge">
                <p className="badge-org">{job.company}</p>
                <p className="badge-mono" aria-hidden="true">DS</p>
                <p className="badge-name">{profile.name}</p>
                <p className="badge-role">{job.role}</p>
                <p className="badge-when">
                  {job.period}, {job.place}
                </p>
              </div>
            </div>
            <div className="about-copy">
              <h3>What I built at Accenture</h3>
              <ul className="about-points">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <p className="about-repo">
                <Ext href={job.repo}>The incident platform on GitHub</Ext>
              </p>

              <div className="about-grid">
                <div>
                  <h3>{education.degree}</h3>
                  <p>
                    {education.school}, {education.detail}
                  </p>
                </div>
                <div>
                  <h3>{leadership.role}</h3>
                  <p>{leadership.detail}</p>
                </div>
              </div>
            </div>
          </div>

          <article className="paper" data-reveal>
            <span className="staple" aria-hidden="true" />
            <p className="paper-stamp" aria-hidden="true">
              {research.arxiv}
            </p>
            <p className="paper-meta">{research.meta}</p>
            <h3 className="paper-title">{research.title}</h3>
            <p className="paper-summary">{research.summary}</p>
            <div className="paper-links">
              {research.links.map((l) => (
                <Ext key={l.href} href={l.href}>
                  {l.label}
                </Ext>
              ))}
            </div>
          </article>
        </section>

        <section className="sec container" aria-labelledby="archive-h">
          <SecHead id="archive-h" title="More builds" aside="from the slide box, filed by kind" />
          <div data-reveal>
            <Archive />
          </div>
        </section>

        <section className="sec sec-skills container" aria-labelledby="skills-h">
          <SecHead id="skills-h" title="What I work with" />
          <div className="labels" data-reveal>
            {skills.map((g) => (
              <div className="label-group" key={g.group}>
                <h3>{g.group}</h3>
                <ul className={`tapes tape-${g.tape}`}>
                  {g.items.map((it, i) => (
                    <li key={it} className="tape" style={{ ["--tilt" as string]: `${((i * 37) % 5) - 2}deg` }}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="index-card" data-reveal>
            <h3 className="hand">things I’m proud of</h3>
            <ul>
              {recognition.map((r) => (
                <li key={r.title}>
                  <span>{r.title}</span>
                  <span className="dim">{r.detail}</span>
                </li>
              ))}
            </ul>
            <p className="index-certs">{certifications}</p>
          </div>
        </section>
      </main>

      <footer className="foot container" id="contact">
        <div className="postcard" data-reveal>
          <div className="pc-left">
            <h2 className="pc-h">Have a 6-month AI internship from January? Write to me.</h2>
            <p className="hand pc-note">
              p.s. the <a href={profile.resume} target="_blank" rel="noreferrer">résumé</a> has the long version.
            </p>
          </div>
          <div className="pc-right">
            <div className="stamp" aria-hidden="true">
              <span>DS</span>
              <span className="stamp-val">AI</span>
            </div>
            <div className="postmark" aria-hidden="true">
              Kolkata, 2026
            </div>
            <ul className="pc-lines">
              <li>
                <a className="link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a className="link" href={profile.phoneHref}>
                  {profile.phone}
                </a>
              </li>
              <li className="pc-row">
                {profile.links.map((l) => (
                  <Ext key={l.href} href={l.href}>
                    {l.label}
                  </Ext>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <p className="foot-end">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <a className="link" href="#main">
            Back to top
          </a>
        </p>
      </footer>
    </>
  );
};

export default App;
