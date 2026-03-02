"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

/* ─── Google Fonts (loaded via next/head or just a link tag in layout) ──────── */
// Add to your layout.tsx / _document.tsx:
// <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

/* ─── tailwind.config.js – extend these colours/fonts: ─────────────────────────
  theme: {
    extend: {
      colors: {
        ink:    '#0a0a0f',
        paper:  '#f5f2ec',
        panel:  '#edeae2',
        card:   '#fffdf9',
        accent: '#1a3a5c',
        gold:   '#c8933a',
        muted:  '#6b6b78',
        border: '#d4cfc4',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono:  ['"DM Mono"', 'monospace'],
        sans:  ['"Bricolage Grotesque"', 'sans-serif'],
      },
    },
  },
──────────────────────────────────────────────────────────────────────────────── */

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const NAV = ["About", "Education", "Skills", "Publications", "Contact"];

const PUBLICATIONS = [
  { title: "Evaluating Performance of Selected Single Classifiers with XAI in Prediction of Mental Health Distress Among University Students", journal: "American Journal of Artificial Intelligence", year: 2025 },
  { title: "Explainable Artificial Intelligence Models for Predicting Malaria Risk in Kenya", journal: "European Journal of Artificial Intelligence and Machine Learning", year: 2025 },
  { title: "Evaluating the Performance of Ensemble and Single Classifiers with Explainable Artificial Intelligence", journal: "International Journal of Statistics", year: 2025 },
  { title: "A Comparative Evaluation of Kaplan-Meier, Cox Proportional Hazards, and Random Survival Forests for Neonatal Mortality Prediction", journal: "Journal of Public Health Research", year: 2025 },
  { title: "A Machine Learning-Based Prediction of Malaria Occurrence in Kenya", journal: "American Journal of Theoretical and Applied Statistics", year: 2024 },
  { title: "Comparative Analysis of GARCH-Based Volatility Models: A Case of Nairobi Security Market PLC", journal: "European Journal of Mathematics and Statistics", year: 2024 },
  { title: "Forecasting Monthly Crude Oil Prices in Kenya Using Comparative Time Series Models", journal: "Asian Journal of Probability and Statistics", year: 2024 },
  { title: "Comparative Analysis of Cross-Validation Techniques: LOOCV, K-folds, and Repeated K-folds in Machine Learning Models", journal: "American Journal of Theoretical and Applied Statistics", year: 2024 },
];

const SKILLS_STAT = [
  { name: "R",      level: 95 },
  { name: "Python", level: 90 },
  { name: "SPSS",   level: 88 },
  { name: "Stata",  level: 85 },
  { name: "SAS",    level: 80 },
];

const SKILLS_ML = [
  { name: "Machine Learning",     level: 88 },
  { name: "Time Series Analysis", level: 92 },
  { name: "Survival Analysis",    level: 87 },
  { name: "Explainable AI (XAI)", level: 82 },
  { name: "Data Visualisation",   level: 90 },
];

const INTERESTS = [
  { icon: "📊", title: "Statistical Modelling", desc: "Applying advanced models to complex real-world datasets." },
  { icon: "🤖", title: "Machine Learning",      desc: "Building predictive systems with explainable AI frameworks." },
  { icon: "🏥", title: "Public Health",         desc: "Evidence-based research for health outcomes and policy." },
  { icon: "📈", title: "Financial Analytics",   desc: "Modelling volatility and forecasting in capital markets." },
  { icon: "🌍", title: "Open Research",         desc: "Contributing to reproducible, open-access scholarship." },
  { icon: "📚", title: "Teaching & Mentoring",  desc: "Sharing statistical knowledge with the next generation." },
];

const MEMBERSHIPS = [
  "Statistical Society of Kenya",
  "International Biometric Society (Kenya Chapter)",
  "Applied Malaria Modeling Network (AMMNet)",
];

/* ─── Inline style tokens (fallback for custom colours not in default Tailwind) */
const C = {
  ink:    "#0a0a0f",
  paper:  "#f5f2ec",
  panel:  "#edeae2",
  card:   "#fffdf9",
  accent: "#1a3a5c",
  gold:   "#c8933a",
  muted:  "#6b6b78",
  border: "#d4cfc4",
};

/* ─── Reveal hook ─────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Reveal({ children, delay = 0, dir = "up" }: {
  children: ReactNode; delay?: number; dir?: "up" | "left" | "right";
}) {
  const { ref, visible } = useReveal();
  const translate = dir === "left" ? "translateX(-28px)" : dir === "right" ? "translateX(28px)" : "translateY(28px)";
  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : translate,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Skill bar ───────────────────────────────────────────────────────────────── */
function SkillBar({ name, level }: { name: string; level: number }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium" style={{ color: C.ink, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{name}</span>
        <span className="text-xs" style={{ color: C.muted, fontFamily: "'DM Mono', monospace" }}>{level}%</span>
      </div>
      <div className="h-[3px] rounded-full" style={{ background: C.border }}>
        <div
          className="h-full rounded-full"
          style={{
            background:  `linear-gradient(90deg, ${C.accent}, ${C.gold})`,
            width:       visible ? `${level}%` : "0%",
            transition:  "width 1.1s cubic-bezier(.4,0,.2,1) 150ms",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Scroll spy ──────────────────────────────────────────────────────────────── */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + 110;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id.toLowerCase());
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [ids]);
  return active;
}

/* ─── Main ───────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(NAV);

  const scrollTo = (s: string) => {
    document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: C.paper, color: C.ink, fontFamily: "'Bricolage Grotesque', sans-serif" }}>

      {/* Load fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 backdrop-blur-md border-b"
        style={{ background: "rgba(245,242,236,0.94)", borderColor: C.border }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-bold text-base tracking-tight"
          style={{ color: C.ink, fontFamily: "'Bricolage Grotesque', sans-serif", background: "none", border: "none", cursor: "pointer" }}
        >
          Victor Lumumba Wandera
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {NAV.map((n) => (
            <li key={n}>
              <button
                onClick={() => scrollTo(n)}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{
                  color: active === n ? C.accent : C.muted,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: active === n ? `1px solid ${C.gold}` : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {n}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-1 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span className="block w-5 h-0.5" style={{ background: C.ink }} />
          <span className="block w-5 h-0.5" style={{ background: C.ink }} />
          <span className="block w-5 h-0.5" style={{ background: C.ink }} />
        </button>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="absolute top-full left-0 right-0 flex flex-col gap-4 px-6 py-5 border-b md:hidden"
            style={{ background: C.paper, borderColor: C.border }}
          >
            {NAV.map((n) => (
              <button
                key={n}
                onClick={() => scrollTo(n)}
                className="text-left text-sm font-medium"
                style={{ color: active === n ? C.accent : C.muted, fontFamily: "'Bricolage Grotesque', sans-serif", background: "none", border: "none", cursor: "pointer" }}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-20"
        style={{ background: C.paper }}
      >
        <Reveal>
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.ink, letterSpacing: "-0.01em" }}
          >
            Victor Lumumba Wandera
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-lg font-normal mb-6" style={{ color: C.muted }}>
            Statistician | Research Officer | Data Analyst
          </p>
        </Reveal>

        <Reveal delay={220}>
          <p className="max-w-xl mx-auto text-sm leading-relaxed mb-8" style={{ color: C.muted }}>
            Welcome to my portfolio. I'm a dedicated statistician and data analyst at Chuka
            University's Centre for Data Analytics and Modelling, with peer-reviewed publications
            in international journals. Explore my research and let's build knowledge together.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="flex gap-4 flex-wrap justify-center mb-8">
            <button
              onClick={() => scrollTo("Publications")}
              className="px-6 py-2.5 text-xs font-semibold tracking-widest uppercase text-white transition-all duration-200"
              style={{ background: C.accent, border: "none", cursor: "pointer", borderRadius: "2px" }}
              onMouseEnter={e => (e.currentTarget.style.background = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.background = C.accent)}
            >
              View Research
            </button>
            <button
              onClick={() => scrollTo("Contact")}
              className="px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-200"
              style={{ background: "transparent", border: `1.5px solid ${C.accent}`, color: C.accent, cursor: "pointer", borderRadius: "2px" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.accent; }}
            >
              Get In Touch
            </button>
          </div>
        </Reveal>

        <Reveal delay={420}>
          <div className="flex gap-3 justify-center">
            {[
              { href: "mailto:lumumbavictor172@gmail.com", label: "✉" },
              { href: "https://beyonddataanalytics.online", label: "🌐" },
              { href: "tel:+254706038599", label: "☎" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-all duration-200"
                style={{ border: `1.5px solid ${C.border}`, color: C.ink, textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.ink; }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────────── */}
      <section id="about" className="px-6 py-24" style={{ background: C.panel }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-center text-xs font-medium tracking-widest uppercase mb-2" style={{ color: C.gold, fontFamily: "'DM Mono', monospace" }}>
              About Me
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-4">
            {/* Photo */}
            <Reveal dir="left">
              <div
                className="w-full rounded-2xl flex items-center justify-center text-8xl overflow-hidden"
                style={{ minHeight: "460px", background: `linear-gradient(145deg, ${C.accent} 0%, #2d6498 100%)` }}
              >
                👨🏾‍💼
              </div>
            </Reveal>

            {/* Text */}
            <Reveal dir="right">
              <h3
                className="text-3xl font-semibold mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
              >
                Hi! I'm Victor Lumumba Wandera
              </h3>
              <p className="text-sm leading-loose mb-4" style={{ color: "#3a3a45" }}>
                A dynamic statistician and data analyst based at Chuka University's Centre for
                Data Analytics and Modelling (CDAM). My passion lies in leveraging statistical
                methods and machine learning to extract meaningful insights from complex datasets.
              </p>
              <p className="text-sm leading-loose mb-4" style={{ color: "#3a3a45" }}>
                I have contributed to peer-reviewed journals in AI, public health, epidemiology,
                and financial analytics. What drives me is the ability to build evidence-based
                solutions that make a meaningful impact on society.
              </p>
              <p className="text-sm leading-loose" style={{ color: "#3a3a45" }}>
                I am always learning, exploring new methodologies, and finding better ways to
                model the world. Every research project is an opportunity to grow and contribute.
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4 mt-7">
                {[
                  { num: "8+", lbl: "Publications" },
                  { num: "5+", lbl: "Years Experience" },
                  { num: "3",  lbl: "Memberships" },
                  { num: "2",  lbl: "Degrees" },
                ].map(({ num, lbl }) => (
                  <div
                    key={lbl}
                    className="text-center px-4 py-5 border transition-all duration-200 cursor-default"
                    style={{ background: C.card, borderColor: C.border, borderRadius: "2px" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.07)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
                  >
                    <div
                      className="text-4xl font-semibold leading-none mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
                    >
                      {num}
                    </div>
                    <div
                      className="text-xs uppercase tracking-widest"
                      style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
                    >
                      {lbl}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ────────────────────────────────────────────────────────── */}
      <section id="education" className="px-6 py-24" style={{ background: C.paper }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-center text-xs font-medium tracking-widest uppercase mb-2" style={{ color: C.gold, fontFamily: "'DM Mono', monospace" }}>
              Educational Background
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="text-center text-4xl font-light mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
            >
              Academic <em>Journey</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-center text-sm leading-relaxed max-w-md mx-auto mb-12" style={{ color: C.muted }}>
              Built on a strong quantitative foundation at Chuka University.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "🎓",
                degree: "Master of Science in Applied Statistics",
                school: "Chuka University, Chuka",
                years: "May 2023 – May 2025",
                desc: "Advanced training in statistical modelling, machine learning, survival analysis, time series, and explainable AI — culminating in multiple peer-reviewed publications.",
              },
              {
                icon: "🏅",
                degree: "BSc Economics & Statistics",
                school: "Chuka University — 2nd Class Hons. (Upper Division)",
                years: "Sep 2016 – Dec 2020",
                desc: "Solid grounding in econometrics, statistical theory, probability, and research methods — forming the bedrock for postgraduate and applied research work.",
              },
            ].map(({ icon, degree, school, years, desc }, i) => (
              <Reveal key={degree} dir={i === 0 ? "left" : "right"} delay={80}>
                <div
                  className="p-7 border transition-all duration-200"
                  style={{ background: C.card, borderColor: C.border, borderRadius: "2px" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-4"
                    style={{ background: "#eef2f8" }}
                  >
                    {icon}
                  </div>
                  <p
                    className="text-lg font-semibold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
                  >
                    {degree}
                  </p>
                  <p className="text-xs mb-3" style={{ color: C.muted }}>{school}</p>
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: "'DM Mono', monospace", color: C.gold }}
                  >
                    📅 {years}
                  </span>
                  <p className="text-xs leading-relaxed mt-4" style={{ color: C.muted }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mission */}
          <Reveal delay={100}>
            <div
              className="mt-8 px-8 py-7"
              style={{ background: C.card, borderLeft: `3px solid ${C.gold}`, borderRadius: "0 2px 2px 0" }}
            >
              <p className="text-sm leading-loose" style={{ color: "#3a3a45" }}>
                <strong style={{ color: C.ink }}>Mission Statement: </strong>
                To skillfully apply statistical and research expertise to generate actionable insights.
                As a dedicated statistician and aspiring research officer, I am committed to conducting
                meticulous quantitative and qualitative analyses that empower informed decision-making.
                By employing cutting-edge methodologies, I strive to unravel meaningful patterns within
                data — contributing to innovation and evidence-based profitability.
              </p>
            </div>
          </Reveal>

          {/* Memberships */}
          <Reveal delay={120}>
            <div className="mt-10">
              <p
                className="text-xs font-medium tracking-widest uppercase mb-4"
                style={{ color: C.gold, fontFamily: "'DM Mono', monospace" }}
              >
                Professional Memberships
              </p>
              <div className="flex flex-wrap gap-3">
                {MEMBERSHIPS.map((m) => (
                  <span
                    key={m}
                    className="px-4 py-1.5 text-xs font-medium rounded-full border"
                    style={{ background: C.card, borderColor: C.border, color: C.accent }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────────── */}
      <section id="skills" className="px-6 py-24" style={{ background: C.panel }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-center text-xs font-medium tracking-widest uppercase mb-2" style={{ color: C.gold, fontFamily: "'DM Mono', monospace" }}>
              Skills
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="text-center text-4xl font-light mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
            >
              Technical <em>Proficiency</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-center text-sm leading-relaxed max-w-md mx-auto mb-12" style={{ color: C.muted }}>
              Proficient in a broad range of statistical tools and analytical frameworks.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-6 pb-2 border-b"
                style={{ fontFamily: "'DM Mono', monospace", color: C.gold, borderColor: C.border }}
              >
                Statistical Software
              </p>
              {SKILLS_STAT.map((s) => <SkillBar key={s.name} {...s} />)}
            </div>
            <div>
              <p
                className="text-xs tracking-widest uppercase mb-6 pb-2 border-b"
                style={{ fontFamily: "'DM Mono', monospace", color: C.gold, borderColor: C.border }}
              >
                Analytics & Machine Learning
              </p>
              {SKILLS_ML.map((s) => <SkillBar key={s.name} {...s} />)}
            </div>
          </div>

          {/* Interests */}
          <Reveal delay={80}>
            <h3
              className="text-center text-3xl font-light mt-16 mb-6"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
            >
              What Excites Me About Data Science
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTERESTS.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div
                  className="p-5 border text-center transition-all duration-200"
                  style={{ background: C.card, borderColor: C.border, borderRadius: "2px" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
                >
                  <span className="block text-3xl mb-3">{icon}</span>
                  <p
                    className="text-base font-semibold mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
                  >
                    {title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: C.muted }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ─────────────────────────────────────────────────────── */}
      <section id="publications" className="px-6 py-24" style={{ background: C.paper }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-center text-xs font-medium tracking-widest uppercase mb-2" style={{ color: C.gold, fontFamily: "'DM Mono', monospace" }}>
              Research
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="text-center text-4xl font-light mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
            >
              Publications
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-center text-sm leading-relaxed max-w-lg mx-auto mb-12" style={{ color: C.muted }}>
              Peer-reviewed contributions to international journals in AI, statistics, public health, and finance.
            </p>
          </Reveal>

          <div>
            {PUBLICATIONS.map(({ title, journal, year }, i) => (
              <Reveal key={i} delay={i * 50}>
                <div
                  className="flex gap-5 items-start py-5 border-b"
                  style={{ borderColor: C.border }}
                >
                  <span
                    className="text-xs font-medium shrink-0 pt-0.5"
                    style={{ fontFamily: "'DM Mono', monospace", color: C.gold, minWidth: "44px" }}
                  >
                    {year}
                  </span>
                  <div>
                    <p
                      className="text-base font-normal leading-snug mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.accent }}
                    >
                      {title}
                    </p>
                    <p className="text-xs italic" style={{ color: C.muted }}>{journal}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section id="contact" className="px-6 py-24" style={{ background: C.ink }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p
              className="text-center text-xs font-medium tracking-widest uppercase mb-2"
              style={{ color: C.gold, fontFamily: "'DM Mono', monospace" }}
            >
              Contact
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="text-center text-4xl font-light mb-3"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: C.paper }}
            >
              Let's <em>Collaborate</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-center text-sm leading-relaxed max-w-md mx-auto mb-12" style={{ color: C.muted }}>
              Open to research collaborations, consulting engagements, and academic partnerships.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Contact info */}
            <Reveal dir="left">
              <div>
                {[
                  { href: "mailto:lumumbavictor172@gmail.com", icon: "✉", lbl: "Email",    val: "lumumbavictor172@gmail.com" },
                  { href: "tel:+254706038599",                 icon: "☎", lbl: "Phone",    val: "+254 706 038 599" },
                  { href: "#",                                 icon: "📍", lbl: "Location", val: "109-60400 Chuka, Kenya" },
                  { href: "https://beyonddataanalytics.online",icon: "🌐", lbl: "Website",  val: "beyonddataanalytics.online" },
                ].map(({ href, icon, lbl, val }) => (
                  <a
                    key={lbl}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 mb-5 no-underline group"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center text-base shrink-0 transition-all duration-200"
                      style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: "2px" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = C.gold; (e.currentTarget as HTMLDivElement).style.background = "rgba(200,147,58,0.1)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLDivElement).style.background = ""; }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p
                        className="text-xs uppercase tracking-widest mb-0.5"
                        style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
                      >
                        {lbl}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "rgba(245,242,236,0.85)" }}>{val}</p>
                    </div>
                  </a>
                ))}

                <div className="mt-6">
                  <p
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ fontFamily: "'DM Mono', monospace", color: C.muted }}
                  >
                    Available for
                  </p>
                  {["Research collaborations", "Consulting opportunities", "Academic partnerships", "Data analytics projects"].map((item) => (
                    <p key={item} className="text-sm mb-1.5" style={{ color: "rgba(245,242,236,0.65)" }}>
                      → {item}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal dir="right">
              <div className="flex flex-col gap-3">
                {["Your Name", "Your Email", "Subject"].map((ph) => (
                  <input
                    key={ph}
                    type={ph === "Your Email" ? "email" : "text"}
                    placeholder={ph}
                    className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "2px",
                      color: C.paper,
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                    onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                ))}
                <textarea
                  placeholder="Your message…"
                  rows={5}
                  className="w-full px-4 py-3 text-sm outline-none transition-all duration-200 resize-y"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "2px",
                    color: C.paper,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                />
                <button
                  className="self-start px-6 py-2.5 text-xs font-semibold tracking-widest uppercase text-white transition-all duration-200"
                  style={{ background: C.accent, border: "none", cursor: "pointer", borderRadius: "2px" }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.gold)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.accent)}
                >
                  Send Message →
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        className="text-center py-6 text-xs tracking-widest"
        style={{ background: "#050508", color: "rgba(245,242,236,0.28)", fontFamily: "'DM Mono', monospace" }}
      >
        © {new Date().getFullYear()} Victor Lumumba Wandera · All rights reserved · beyonddataanalytics.online
      </footer>
    </div>
  );
}