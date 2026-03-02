"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavItem { label: string; href: string }
interface Skill   { name: string; level: number }
interface Pub     { title: string; journal: string; year: number; doi?: string }

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV: NavItem[] = [
  { label: "About",        href: "#about"        },
  { label: "Education",    href: "#education"    },
  { label: "Research",     href: "#research"     },
  { label: "Skills",       href: "#skills"       },
  { label: "Publications", href: "#publications" },
  { label: "Contact",      href: "#contact"      },
];

const SKILLS: { category: string; items: Skill[] }[] = [
  {
    category: "Statistical Tools",
    items: [
      { name: "R",     level: 95 },
      { name: "Python", level: 90 },
      { name: "SPSS",   level: 88 },
      { name: "Stata",  level: 85 },
      { name: "SAS",    level: 80 },
    ],
  },
  {
    category: "Analytics & ML",
    items: [
      { name: "Machine Learning",      level: 88 },
      { name: "Time Series Analysis",  level: 92 },
      { name: "Survival Analysis",     level: 87 },
      { name: "Explainable AI (XAI)",  level: 82 },
      { name: "Data Visualisation",    level: 90 },
    ],
  },
];

const PUBLICATIONS: Pub[] = [
  {
    title:   "Evaluating Performance of Selected Single Classifiers with XAI in Prediction of Mental Health Distress Among University Students",
    journal: "American Journal of Artificial Intelligence",
    year:    2025,
  },
  {
    title:   "Explainable Artificial Intelligence Models for Predicting Malaria Risk in Kenya",
    journal: "European Journal of Artificial Intelligence and Machine Learning",
    year:    2025,
  },
  {
    title:   "Evaluating the Performance of Ensemble and Single Classifiers with Explainable Artificial Intelligence",
    journal: "International Journal of Statistics",
    year:    2025,
  },
  {
    title:   "A Machine Learning-Based Prediction of Malaria Occurrence in Kenya",
    journal: "American Journal of Theoretical and Applied Statistics",
    year:    2024,
  },
  {
    title:   "Comparative Analysis of GARCH-Based Volatility Models: A Case of Nairobi Security Market PLC",
    journal: "European Journal of Mathematics and Statistics",
    year:    2024,
  },
  {
    title:   "Forecasting Monthly Crude Oil Prices in Kenya Using Comparative Time Series Models",
    journal: "Asian Journal of Probability and Statistics",
    year:    2024,
  },
  {
    title:   "Comparative Analysis of Cross-Validation Techniques: LOOCV, K-folds, and Repeated K-folds in Machine Learning Models",
    journal: "American Journal of Theoretical and Applied Statistics",
    year:    2024,
  },
  {
    title:   "A Comparative Evaluation of Kaplan-Meier, Cox Proportional Hazards, and Random Survival Forests for Neonatal Mortality Prediction",
    journal: "Journal of Public Health Research",
    year:    2025,
  },
];

const MEMBERSHIPS = [
  "Statistical Society of Kenya",
  "International Biometric Society (Kenya Chapter)",
  "Applied Malaria Modeling Network (AMMNet)",
];

// ─── Utility ─────────────────────────────────────────────────────────────────
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

// ─── Animated number ─────────────────────────────────────────────────────────
function AnimatedStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-card">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// ─── Skill bar ───────────────────────────────────────────────────────────────
function SkillBar({ name, level }: Skill) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFilled(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="skill-bar-wrap">
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: filled ? `${level}%` : "0%", transition: "width 1s cubic-bezier(.4,0,.2,1)" }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = NAV.map((n) => n.href.replace("#", ""));
  const active = useScrollSpy(sectionIds);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --ink:    #0a0a0f;
          --paper:  #f5f2ec;
          --accent: #1a3a5c;
          --gold:   #c8933a;
          --muted:  #6b6b78;
          --border: #d4cfc4;
          --card:   #fffdf9;
          --mono:   'DM Mono', monospace;
          --serif:  'Cormorant Garamond', Georgia, serif;
          --sans:   'Bricolage Grotesque', sans-serif;
        }

        html { scroll-behavior: smooth; }
        body  { background: var(--paper); color: var(--ink); font-family: var(--sans); font-size: 16px; line-height: 1.6; overflow-x: hidden; }

        /* ── NAV ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2.5rem;
          background: rgba(245,242,236,.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-brand {
          font-family: var(--serif); font-size: 1.25rem; font-weight: 600;
          color: var(--accent); letter-spacing: .02em; text-decoration: none;
        }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a {
          font-size: .8rem; letter-spacing: .12em; text-transform: uppercase;
          color: var(--muted); text-decoration: none; font-weight: 500;
          transition: color .2s;
          padding-bottom: 2px; border-bottom: 1px solid transparent;
        }
        .nav-links a.active,
        .nav-links a:hover { color: var(--accent); border-bottom-color: var(--gold); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--ink); transition: .3s; }

        /* ── HERO ── */
        #about {
          min-height: 100vh; display: grid; place-items: center;
          padding: 8rem 2.5rem 4rem;
          position: relative; overflow: hidden;
        }
        .hero-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem;
          max-width: 1100px; width: 100%; align-items: center;
        }
        .hero-eyebrow {
          font-family: var(--mono); font-size: .75rem; letter-spacing: .18em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 1rem;
        }
        .hero-name {
          font-family: var(--serif); font-size: clamp(2.6rem, 5vw, 4.2rem);
          font-weight: 300; line-height: 1.1; color: var(--accent);
          margin-bottom: .5rem;
        }
        .hero-name em { font-style: italic; color: var(--gold); }
        .hero-title {
          font-family: var(--mono); font-size: .85rem; color: var(--muted);
          letter-spacing: .1em; margin-bottom: 1.8rem;
        }
        .hero-bio { font-size: 1rem; color: #3a3a45; line-height: 1.8; margin-bottom: 2rem; }
        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .75rem 1.75rem; font-size: .78rem; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase; text-decoration: none;
          cursor: pointer; border: none; transition: all .25s;
        }
        .btn-primary { background: var(--accent); color: #fff; }
        .btn-primary:hover { background: var(--gold); }
        .btn-outline { background: transparent; color: var(--accent); border: 1.5px solid var(--accent); }
        .btn-outline:hover { background: var(--accent); color: #fff; }

        .hero-visual {
          position: relative; display: flex; justify-content: center; align-items: center;
        }
        .avatar-ring {
          width: 340px; height: 340px; border-radius: 50%;
          border: 2px solid var(--gold);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .avatar-inner {
          width: 300px; height: 300px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent) 0%, #2d6498 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--serif); font-size: 5rem; color: rgba(255,255,255,.9);
          font-weight: 300;
        }
        .orbit {
          position: absolute; border-radius: 50%;
          border: 1px dashed rgba(200,147,58,.25);
          animation: orbit 18s linear infinite;
        }
        .orbit:nth-child(1) { width: 420px; height: 420px; top: -42px; left: -42px; }
        .orbit:nth-child(2) { width: 500px; height: 500px; top: -82px; left: -82px; animation-duration: 28s; animation-direction: reverse; }
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .stats-row {
          display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 2rem;
        }
        .stat-card {
          background: var(--card); border: 1px solid var(--border);
          padding: .9rem 1.4rem; display: flex; flex-direction: column; gap: .25rem;
          flex: 1; min-width: 110px;
        }
        .stat-value { font-family: var(--serif); font-size: 2rem; color: var(--accent); font-weight: 600; }
        .stat-label { font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); }

        /* ── SECTIONS ── */
        section { padding: 6rem 2.5rem; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-tag {
          font-family: var(--mono); font-size: .72rem; letter-spacing: .2em;
          text-transform: uppercase; color: var(--gold); margin-bottom: .75rem;
        }
        .section-heading {
          font-family: var(--serif); font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300; color: var(--accent); margin-bottom: 3rem;
          border-bottom: 1px solid var(--border); padding-bottom: 1rem;
        }
        .section-heading em { font-style: italic; }

        /* ── EDUCATION ── */
        #education { background: var(--card); }
        .edu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
        .edu-card {
          border: 1px solid var(--border); padding: 2rem;
          position: relative; background: var(--paper);
          transition: box-shadow .25s;
        }
        .edu-card:hover { box-shadow: 0 8px 32px rgba(26,58,92,.08); }
        .edu-degree {
          font-family: var(--serif); font-size: 1.3rem; color: var(--accent);
          font-weight: 600; margin-bottom: .5rem;
        }
        .edu-institution { font-size: .85rem; color: var(--muted); margin-bottom: .4rem; }
        .edu-years {
          font-family: var(--mono); font-size: .78rem; color: var(--gold);
        }
        .edu-badge {
          position: absolute; top: 1.25rem; right: 1.25rem;
          width: 40px; height: 40px; border-radius: 50%;
          background: var(--accent); display: flex; align-items: center; justify-content: center;
          font-family: var(--serif); font-size: 1.2rem; color: #fff;
        }
        .mission-block {
          margin-top: 3rem; padding: 2.5rem;
          border-left: 3px solid var(--gold);
          background: var(--paper);
        }
        .mission-block p { font-size: 1rem; line-height: 1.85; color: #3a3a45; }

        .memberships { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1.5rem; }
        .member-tag {
          padding: .4rem 1rem; border: 1px solid var(--border);
          font-size: .78rem; letter-spacing: .06em; color: var(--accent);
          background: var(--card);
        }

        /* ── SKILLS ── */
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .skills-category-title {
          font-family: var(--mono); font-size: .75rem; letter-spacing: .15em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem;
        }
        .skill-bar-wrap { margin-bottom: 1.2rem; }
        .skill-bar-header { display: flex; justify-content: space-between; margin-bottom: .4rem; }
        .skill-name { font-size: .85rem; font-weight: 500; color: var(--ink); }
        .skill-pct  { font-family: var(--mono); font-size: .75rem; color: var(--muted); }
        .skill-track { height: 3px; background: var(--border); border-radius: 2px; }
        .skill-fill  { height: 100%; background: linear-gradient(90deg, var(--accent), var(--gold)); border-radius: 2px; }

        /* ── RESEARCH/PUBLICATIONS ── */
        #research { background: var(--card); }
        .pub-list { display: flex; flex-direction: column; gap: 0; }
        .pub-item {
          display: grid; grid-template-columns: 56px 1fr;
          gap: 1.5rem; padding: 1.75rem 0;
          border-bottom: 1px solid var(--border);
          align-items: start;
        }
        .pub-year {
          font-family: var(--mono); font-size: .75rem; color: var(--gold);
          padding-top: .2rem; font-weight: 500;
        }
        .pub-title { font-family: var(--serif); font-size: 1.05rem; color: var(--accent); font-weight: 400; margin-bottom: .3rem; line-height: 1.4; }
        .pub-journal { font-size: .78rem; color: var(--muted); font-style: italic; }

        /* ── CONTACT ── */
        #contact { background: var(--ink); color: var(--paper); }
        #contact .section-heading { color: var(--paper); border-color: rgba(255,255,255,.1); }
        #contact .section-tag { color: var(--gold); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        .contact-intro { font-size: 1.05rem; line-height: 1.8; color: rgba(245,242,236,.7); margin-bottom: 2rem; }
        .contact-item {
          display: flex; align-items: center; gap: 1rem;
          margin-bottom: 1.25rem; text-decoration: none;
          color: rgba(245,242,236,.85);
          font-size: .9rem;
          transition: color .2s;
        }
        .contact-item:hover { color: var(--gold); }
        .contact-icon {
          width: 38px; height: 38px; border: 1px solid rgba(255,255,255,.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
          transition: border-color .2s, background .2s;
        }
        .contact-item:hover .contact-icon { border-color: var(--gold); background: rgba(200,147,58,.08); }
        .contact-form-block {
          display: flex; flex-direction: column; gap: 1rem;
        }
        .form-input {
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12);
          color: var(--paper); padding: .85rem 1rem; font-family: var(--sans);
          font-size: .9rem; outline: none; transition: border-color .2s;
          width: 100%;
        }
        .form-input::placeholder { color: rgba(245,242,236,.3); }
        .form-input:focus { border-color: var(--gold); }
        textarea.form-input { resize: vertical; min-height: 130px; }

        /* ── FOOTER ── */
        footer {
          text-align: center; padding: 2rem;
          background: #050508; color: rgba(245,242,236,.3);
          font-family: var(--mono); font-size: .72rem; letter-spacing: .1em;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          nav { padding: 1rem 1.25rem; }
          .nav-links { display: none; }
          .nav-links.open {
            display: flex; flex-direction: column; position: fixed;
            top: 60px; left: 0; right: 0;
            background: var(--paper); border-bottom: 1px solid var(--border);
            padding: 1.5rem; gap: 1.25rem;
          }
          .hamburger { display: flex; }
          #about { padding: 6rem 1.25rem 3rem; }
          .hero-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .hero-visual { order: -1; }
          .avatar-ring { width: 220px; height: 220px; }
          .avatar-inner { width: 190px; height: 190px; font-size: 3.5rem; }
          .orbit:nth-child(1) { width: 280px; height: 280px; top: -30px; left: -30px; }
          .orbit:nth-child(2) { width: 330px; height: 330px; top: -55px; left: -55px; }
          section { padding: 4rem 1.25rem; }
          .skills-grid { grid-template-columns: 1fr; gap: 2rem; }
          .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .stats-row { gap: 1rem; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav>
        <a className="nav-brand" href="#about">V. Lumumba Wandera</a>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={active === n.href.replace("#", "") ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollTo(n.href); }}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO / ABOUT ── */}
      <section id="about">
        <div className="hero-grid section-inner" style={{ padding: 0 }}>
          {/* Left */}
          <div>
            <p className="hero-eyebrow">// Statistician · Research Officer · Data Analyst</p>
            <h1 className="hero-name">
              Victor Lumumba<br /><em>Wandera</em>
            </h1>
            <p className="hero-title">MSc Applied Statistics · Chuka University · Chuka, Kenya</p>
            <p className="hero-bio">
              A dynamic statistician and data analyst at Chuka University's Center for Data
              Analytics and Modelling (CDAM), with peer-reviewed publications in international
              journals. I leverage advanced statistical methods and machine learning to unravel
              meaningful patterns from complex datasets — driving evidence-based decisions in
              public health, finance, and beyond.
            </p>
            <div className="hero-btns">
              <a className="btn btn-primary" href="#contact">Get In Touch</a>
              <a className="btn btn-outline" href="#publications">View Research</a>
            </div>
            <div className="stats-row">
              <AnimatedStat value="8+" label="Publications" />
              <AnimatedStat value="5+"  label="Years Experience" />
              <AnimatedStat value="3"   label="Memberships" />
            </div>
          </div>

          {/* Right – visual */}
          <div className="hero-visual">
            <div style={{ position: "relative", display: "inline-block" }}>
              <div className="orbit" />
              <div className="orbit" />
              <div className="avatar-ring">
                <div className="avatar-inner">VL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education">
        <div className="section-inner">
          <p className="section-tag">// 02 — Background</p>
          <h2 className="section-heading">Educational <em>Journey</em></h2>

          <div className="edu-grid">
            <div className="edu-card">
              <div className="edu-badge">M</div>
              <p className="edu-degree">Master of Science in Applied Statistics</p>
              <p className="edu-institution">Chuka University, Chuka</p>
              <p className="edu-years">May 2023 – May 2025</p>
            </div>
            <div className="edu-card">
              <div className="edu-badge">B</div>
              <p className="edu-degree">BSc Economics & Statistics</p>
              <p className="edu-institution">Chuka University — 2nd Class Hons. (Upper Division)</p>
              <p className="edu-years">Sep 2016 – Dec 2020</p>
            </div>
          </div>

          <div className="mission-block">
            <p>
              <strong>Mission:</strong> To skillfully apply statistical and research expertise to
              generate actionable insights. As a dedicated statistician and aspiring research officer,
              I am committed to conducting meticulous quantitative and qualitative analyses that
              empower informed decision-making. By employing cutting-edge methodologies, I strive to
              unravel meaningful patterns within data, contributing to the organisation's mission of
              innovation and profitability.
            </p>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <p className="section-tag">// Professional Memberships</p>
            <div className="memberships">
              {MEMBERSHIPS.map((m) => (
                <span key={m} className="member-tag">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="section-inner">
          <p className="section-tag">// 03 — Technical Proficiency</p>
          <h2 className="section-heading">Skills &amp; <em>Tools</em></h2>

          <div className="skills-grid">
            {SKILLS.map((group) => (
              <div key={group.category}>
                <p className="skills-category-title">{group.category}</p>
                {group.items.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section id="research">
        <div className="section-inner">
          <p className="section-tag">// 04 — Scholarly Work</p>
          <h2 className="section-heading">Research &amp; <em>Publications</em></h2>

          <div className="pub-list">
            {PUBLICATIONS.map((p, i) => (
              <div className="pub-item" key={i}>
                <span className="pub-year">{p.year}</span>
                <div>
                  <p className="pub-title">{p.title}</p>
                  <p className="pub-journal">{p.journal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS SECTION ID ── */}
      <div id="publications" style={{ marginTop: "-6rem", paddingTop: "6rem" }} />

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="section-inner">
          <p className="section-tag">// 05 — Get In Touch</p>
          <h2 className="section-heading">Let's <em>Collaborate</em></h2>

          <div className="contact-grid">
            <div>
              <p className="contact-intro">
                I'm always open to research collaborations, data analytics consulting, and
                opportunities to contribute to evidence-based solutions. Whether you're a fellow
                researcher, an organisation seeking data-driven insights, or a university
                exploring partnerships — I'd love to hear from you.
              </p>

              <a className="contact-item" href="mailto:lumumbavictor172@gmail.com">
                <div className="contact-icon">✉</div>
                lumumbavictor172@gmail.com
              </a>
              <a className="contact-item" href="tel:+254706038599">
                <div className="contact-icon">☎</div>
                +254 706 038 599
              </a>
              <div className="contact-item" style={{ cursor: "default" }}>
                <div className="contact-icon">📍</div>
                109-60400 Chuka, Kenya
              </div>
              <a className="contact-item" href="https://beyonddataanalytics.online" target="_blank" rel="noopener noreferrer">
                <div className="contact-icon">🌐</div>
                beyonddataanalytics.online
              </a>
            </div>

            {/* Quick form (UI only) */}
            <div className="contact-form-block">
              <input className="form-input" type="text"     placeholder="Your Name"    />
              <input className="form-input" type="email"    placeholder="Your Email"   />
              <input className="form-input" type="text"     placeholder="Subject"      />
              <textarea className="form-input"              placeholder="Your message…" />
              <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        © {new Date().getFullYear()} Victor Lumumba Wandera — All rights reserved &nbsp;·&nbsp; beyonddataanalytics.online
      </footer>
    </>
  );
}