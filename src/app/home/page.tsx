"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

/* ─── Data ─────────────────────────────────────────────────────────────────── */
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

/* ─── Reveal hook ────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
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

/* ─── Reveal wrapper ─────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up" }: {
  children: ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none";
}) {
  const { ref, visible } = useReveal();
  const transforms: Record<string, string> = {
    up: "translateY(36px)", left: "translateX(-36px)", right: "translateX(36px)", none: "none",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Skill bar ──────────────────────────────────────────────────────────────── */
function SkillBar({ name, level }: { name: string; level: number }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".35rem" }}>
        <span style={{ fontSize: ".88rem", fontWeight: 500, color: "#1e293b" }}>{name}</span>
        <span style={{ fontSize: ".78rem", color: "#64748b", fontFamily: "monospace" }}>{level}%</span>
      </div>
      <div style={{ height: "5px", background: "#e2e8f0", borderRadius: "99px" }}>
        <div style={{
          height: "100%", borderRadius: "99px",
          background: "linear-gradient(90deg,#3b82f6,#6366f1)",
          width: visible ? `${level}%` : "0%",
          transition: "width 1.1s cubic-bezier(.4,0,.2,1) 200ms",
        }} />
      </div>
    </div>
  );
}

/* ─── Scroll spy ─────────────────────────────────────────────────────────────── */
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

  const scrollTo = (section: string) => {
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body  { font-family: 'Inter', sans-serif; background: #fff; color: #1e293b; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: .95rem 2.5rem;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #f1f5f9;
        }
        .brand { font-weight: 700; font-size: 1.05rem; color: #1e293b; text-decoration: none; cursor: pointer; background: none; border: none; font-family: 'Inter', sans-serif; }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links button {
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; font-size: .875rem; font-weight: 500;
          color: #64748b; transition: color .2s; padding: 0;
        }
        .nav-links button:hover,
        .nav-links button.active { color: #3b82f6; }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: #1e293b; }

        /* HERO */
        #hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 8rem 1.5rem 5rem; background: #fff;
        }
        .hero-name { font-size: clamp(2.4rem, 5vw, 3.6rem); font-weight: 700; color: #0f172a; margin-bottom: .5rem; letter-spacing: -.02em; }
        .hero-role { font-size: 1.15rem; font-weight: 400; color: #64748b; margin-bottom: 1.5rem; }
        .hero-bio { max-width: 600px; margin: 0 auto 2rem; font-size: .95rem; color: #64748b; line-height: 1.75; }
        .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; }
        .btn-dark { padding: .65rem 1.5rem; background: #0f172a; color: #fff; border-radius: 6px; font-size: .85rem; font-weight: 600; text-decoration: none; border: none; cursor: pointer; transition: background .2s; font-family: 'Inter', sans-serif; }
        .btn-dark:hover { background: #3b82f6; }
        .btn-ghost { padding: .65rem 1.5rem; background: transparent; color: #0f172a; border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: .85rem; font-weight: 600; text-decoration: none; cursor: pointer; transition: border-color .2s, color .2s; font-family: 'Inter', sans-serif; }
        .btn-ghost:hover { border-color: #3b82f6; color: #3b82f6; }
        .social-row { display: flex; gap: 1.25rem; justify-content: center; }
        .social-icon { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; text-decoration: none; color: #1e293b; transition: border-color .2s, background .2s; }
        .social-icon:hover { border-color: #3b82f6; background: #eff6ff; }

        /* SECTIONS */
        section { padding: 5.5rem 1.5rem; }
        .section-inner { max-width: 1060px; margin: 0 auto; }
        .section-label { text-align: center; font-size: .78rem; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: #3b82f6; margin-bottom: .75rem; }
        .section-title { text-align: center; font-size: clamp(1.7rem, 3.5vw, 2.4rem); font-weight: 700; color: #0f172a; margin-bottom: .75rem; letter-spacing: -.01em; }
        .section-sub { text-align: center; max-width: 560px; margin: 0 auto 3rem; font-size: .93rem; color: #64748b; line-height: 1.7; }

        /* ABOUT */
        #about { background: #f0f4ff; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
        .avatar-placeholder { width: 100%; border-radius: 20px; min-height: 440px; background: linear-gradient(135deg,#6366f1 0%,#3b82f6 100%); display: flex; align-items: center; justify-content: center; font-size: 8rem; }
        .about-text h3 { font-size: 1.45rem; font-weight: 700; margin-bottom: 1.1rem; color: #0f172a; }
        .about-text p { font-size: .93rem; color: #475569; line-height: 1.8; margin-bottom: 1rem; }
        .stat-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.75rem; }
        .stat-card { background: #fff; border-radius: 12px; padding: 1.3rem 1rem; text-align: center; box-shadow: 0 1px 4px rgba(0,0,0,.06); transition: transform .25s, box-shadow .25s; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,.09); }
        .stat-num { font-size: 2.1rem; font-weight: 700; color: #3b82f6; line-height: 1; }
        .stat-lbl { font-size: .75rem; color: #94a3b8; margin-top: .35rem; font-weight: 500; text-transform: uppercase; letter-spacing: .07em; }

        /* EDUCATION */
        #education { background: #fff; }
        .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .edu-card { border: 1px solid #e2e8f0; border-radius: 14px; padding: 1.75rem; background: #fff; transition: box-shadow .25s, transform .25s; }
        .edu-card:hover { box-shadow: 0 10px 32px rgba(0,0,0,.08); transform: translateY(-3px); }
        .edu-icon { width: 44px; height: 44px; border-radius: 10px; background: #eff6ff; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 1rem; }
        .edu-degree { font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: .4rem; }
        .edu-school { font-size: .85rem; color: #64748b; margin-bottom: .65rem; }
        .edu-year { display: inline-flex; align-items: center; gap: .35rem; font-size: .78rem; color: #3b82f6; font-weight: 600; background: #eff6ff; padding: .25rem .75rem; border-radius: 99px; }
        .edu-desc { margin-top: 1rem; font-size: .85rem; color: #64748b; line-height: 1.7; }
        .mission-box { background: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 0 12px 12px 0; padding: 1.75rem 2rem; margin-top: 2rem; }
        .mission-box p { font-size: .93rem; color: #475569; line-height: 1.8; }
        .mission-box strong { color: #0f172a; }
        .tags-row { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.25rem; }
        .tag { padding: .4rem 1rem; border-radius: 99px; border: 1px solid #bfdbfe; background: #eff6ff; font-size: .78rem; color: #3b82f6; font-weight: 500; }

        /* SKILLS */
        #skills { background: #f0f4ff; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .skills-group h4 { font-size: .8rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #3b82f6; margin-bottom: 1.5rem; padding-bottom: .5rem; border-bottom: 2px solid #bfdbfe; }
        .interests-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 1rem; }
        .interest-card { background: #fff; border-radius: 12px; padding: 1.4rem; text-align: center; border: 1px solid #e2e8f0; transition: box-shadow .25s, transform .25s; }
        .interest-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,.08); transform: translateY(-3px); }
        .interest-icon { font-size: 1.75rem; margin-bottom: .65rem; display: block; }
        .interest-title { font-size: .9rem; font-weight: 700; color: #0f172a; margin-bottom: .35rem; }
        .interest-desc { font-size: .78rem; color: #64748b; line-height: 1.5; }

        /* PUBLICATIONS */
        #publications { background: #fff; }
        .pub-item { display: flex; gap: 1.25rem; align-items: flex-start; padding: 1.4rem 0; border-bottom: 1px solid #f1f5f9; }
        .pub-year { min-width: 52px; padding: .3rem .6rem; border-radius: 6px; background: #eff6ff; font-size: .75rem; font-weight: 700; color: #3b82f6; text-align: center; margin-top: .15rem; flex-shrink: 0; }
        .pub-title { font-size: .93rem; font-weight: 600; color: #0f172a; margin-bottom: .3rem; line-height: 1.45; }
        .pub-journal { font-size: .8rem; color: #64748b; font-style: italic; }

        /* CONTACT */
        #contact { background: #0f172a; color: #f8fafc; }
        #contact .section-label { color: #60a5fa; }
        #contact .section-title { color: #f8fafc; }
        #contact .section-sub { color: #94a3b8; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
        .contact-item { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem; text-decoration: none; }
        .c-icon { width: 42px; height: 42px; border-radius: 10px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; transition: background .2s; }
        .contact-item:hover .c-icon { background: #3b82f6; }
        .c-label { font-size: .75rem; color: #64748b; margin-bottom: .1rem; }
        .c-value { font-size: .88rem; color: #e2e8f0; font-weight: 500; }
        .form-col { display: flex; flex-direction: column; gap: .85rem; }
        .form-field { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 8px; padding: .8rem 1rem; color: #f8fafc; font-family: 'Inter', sans-serif; font-size: .88rem; outline: none; transition: border-color .2s; width: 100%; }
        .form-field::placeholder { color: #475569; }
        .form-field:focus { border-color: #3b82f6; }
        textarea.form-field { resize: vertical; min-height: 120px; }
        .btn-blue { padding: .75rem 1.75rem; background: #3b82f6; color: #fff; border: none; border-radius: 8px; font-size: .88rem; font-weight: 600; cursor: pointer; transition: background .2s; font-family: 'Inter', sans-serif; }
        .btn-blue:hover { background: #2563eb; }

        /* FOOTER */
        footer { text-align: center; padding: 1.5rem; background: #020617; color: #334155; font-size: .78rem; }

        /* MOBILE */
        @media (max-width: 768px) {
          nav { padding: .85rem 1.25rem; }
          .nav-links { display: none; }
          .nav-links.open { display: flex; flex-direction: column; position: fixed; top: 57px; left: 0; right: 0; background: #fff; border-bottom: 1px solid #f1f5f9; padding: 1.25rem 1.5rem; gap: 1rem; z-index: 199; }
          .hamburger { display: flex; }
          section { padding: 4rem 1.25rem; }
          .about-grid, .edu-grid, .skills-grid, .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
          .interests-grid { grid-template-columns: 1fr 1fr; }
          .hero-name { font-size: 2.2rem; }
        }
        @media (max-width: 480px) {
          .interests-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav>
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Victor Lumumba Wandera
        </button>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV.map((n) => (
            <li key={n}>
              <button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>
                {n}
              </button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <Reveal>
          <h1 className="hero-name">Victor Lumumba Wandera</h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="hero-role">Statistician | Research Officer | Data Analyst</p>
        </Reveal>
        <Reveal delay={220}>
          <p className="hero-bio">
            Welcome to my portfolio. I'm a dedicated statistician and data analyst at Chuka
            University's Centre for Data Analytics and Modelling, with peer-reviewed publications
            in international journals. Explore my research and let's build knowledge together.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="hero-btns">
            <button className="btn-dark" onClick={() => scrollTo("Publications")}>View Research</button>
            <button className="btn-ghost" onClick={() => scrollTo("Contact")}>Get In Touch</button>
          </div>
        </Reveal>
        <Reveal delay={420}>
          <div className="social-row">
            <a className="social-icon" href="mailto:lumumbavictor172@gmail.com" title="Email">✉️</a>
            <a className="social-icon" href="https://beyonddataanalytics.online" target="_blank" rel="noopener noreferrer" title="Website">🌐</a>
            <a className="social-icon" href="tel:+254706038599" title="Phone">📞</a>
          </div>
        </Reveal>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="section-inner">
          <Reveal><p className="section-label">About Me</p></Reveal>
          <div className="about-grid" style={{ marginTop: "1rem" }}>
            <Reveal direction="left">
              <div className="avatar-placeholder">👨🏾‍💼</div>
            </Reveal>
            <Reveal direction="right">
              <div className="about-text">
                <h3>Hi! I'm Victor Lumumba Wandera</h3>
                <p>
                  A dynamic statistician and data analyst based at Chuka University's Centre for
                  Data Analytics and Modelling (CDAM). My passion lies in leveraging statistical
                  methods and machine learning to extract meaningful insights from complex datasets.
                </p>
                <p>
                  I have contributed to peer-reviewed journals in AI, public health, epidemiology,
                  and financial analytics. What drives me is the ability to build evidence-based
                  solutions that make a meaningful impact on society — because great analysis isn't
                  just about numbers, it's about crafting insights that are actionable and useful.
                </p>
                <p>
                  I am always learning, exploring new methodologies, and finding better ways to
                  model the world. Every research project is an opportunity to grow and contribute
                  to the evolving landscape of data science.
                </p>
                <div className="stat-cards">
                  <div className="stat-card">
                    <div className="stat-num">8+</div>
                    <div className="stat-lbl">Publications</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">5+</div>
                    <div className="stat-lbl">Years Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">3</div>
                    <div className="stat-lbl">Memberships</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-num">2</div>
                    <div className="stat-lbl">Degrees</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education">
        <div className="section-inner">
          <Reveal><p className="section-label">Educational Background</p></Reveal>
          <Reveal delay={80}><h2 className="section-title">Academic Journey</h2></Reveal>
          <Reveal delay={140}><p className="section-sub">Built on a strong quantitative foundation at Chuka University.</p></Reveal>

          <div className="edu-grid">
            <Reveal direction="left" delay={80}>
              <div className="edu-card">
                <div className="edu-icon">🎓</div>
                <p className="edu-degree">Master of Science in Applied Statistics</p>
                <p className="edu-school">Chuka University, Chuka</p>
                <span className="edu-year">📅 May 2023 – May 2025</span>
                <p className="edu-desc">
                  Advanced training in statistical modelling, machine learning, survival analysis,
                  time series, and explainable AI — culminating in multiple peer-reviewed publications
                  in international journals.
                </p>
              </div>
            </Reveal>
            <Reveal direction="right" delay={80}>
              <div className="edu-card">
                <div className="edu-icon">🏅</div>
                <p className="edu-degree">BSc Economics & Statistics</p>
                <p className="edu-school">Chuka University — 2nd Class Hons. (Upper Division)</p>
                <span className="edu-year">📅 Sep 2016 – Dec 2020</span>
                <p className="edu-desc">
                  Solid grounding in econometrics, statistical theory, probability, and research
                  methods — forming the bedrock for postgraduate and applied research work in
                  data analytics and modelling.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="mission-box">
              <p>
                <strong>Mission Statement: </strong>
                To skillfully apply statistical and research expertise to generate actionable insights.
                As a dedicated statistician and aspiring research officer, I am committed to conducting
                meticulous quantitative and qualitative analyses that empower informed decision-making.
                By employing cutting-edge methodologies, I strive to unravel meaningful patterns within
                data — contributing to innovation and evidence-based profitability.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ marginTop: "2.5rem" }}>
              <p className="section-label" style={{ textAlign: "left" }}>Professional Memberships</p>
              <div className="tags-row">
                {MEMBERSHIPS.map((m) => <span className="tag" key={m}>{m}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills">
        <div className="section-inner">
          <Reveal><p className="section-label">Skills</p></Reveal>
          <Reveal delay={80}><h2 className="section-title">Technical Proficiency</h2></Reveal>
          <Reveal delay={140}><p className="section-sub">Proficient in a broad range of statistical tools and analytical frameworks.</p></Reveal>

          <div className="skills-grid">
            <div>
              <h4>Statistical Software</h4>
              {SKILLS_STAT.map((s) => <SkillBar key={s.name} {...s} />)}
            </div>
            <div>
              <h4>Analytics & Machine Learning</h4>
              {SKILLS_ML.map((s) => <SkillBar key={s.name} {...s} />)}
            </div>
          </div>

          <Reveal delay={80}>
            <h3 style={{ textAlign: "center", margin: "3.5rem 0 1.5rem", fontSize: "1.2rem", fontWeight: 700, color: "#0f172a" }}>
              What Excites Me About Data Science
            </h3>
          </Reveal>
          <div className="interests-grid">
            {INTERESTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="interest-card">
                  <span className="interest-icon">{item.icon}</span>
                  <p className="interest-title">{item.title}</p>
                  <p className="interest-desc">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section id="publications">
        <div className="section-inner">
          <Reveal><p className="section-label">Research</p></Reveal>
          <Reveal delay={80}><h2 className="section-title">Publications</h2></Reveal>
          <Reveal delay={140}><p className="section-sub">Peer-reviewed contributions to international journals in AI, statistics, public health, and finance.</p></Reveal>

          <div>
            {PUBLICATIONS.map((p, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="pub-item">
                  <span className="pub-year">{p.year}</span>
                  <div>
                    <p className="pub-title">{p.title}</p>
                    <p className="pub-journal">{p.journal}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact">
        <div className="section-inner">
          <Reveal><p className="section-label">Contact</p></Reveal>
          <Reveal delay={80}><h2 className="section-title">Let's Work Together</h2></Reveal>
          <Reveal delay={140}><p className="section-sub">Open to research collaborations, consulting engagements, and academic partnerships.</p></Reveal>

          <div className="contact-grid">
            <Reveal direction="left">
              <div>
                <a className="contact-item" href="mailto:lumumbavictor172@gmail.com">
                  <div className="c-icon">✉️</div>
                  <div><p className="c-label">Email</p><p className="c-value">lumumbavictor172@gmail.com</p></div>
                </a>
                <a className="contact-item" href="tel:+254706038599">
                  <div className="c-icon">📞</div>
                  <div><p className="c-label">Phone</p><p className="c-value">+254 706 038 599</p></div>
                </a>
                <div className="contact-item" style={{ cursor: "default" }}>
                  <div className="c-icon">📍</div>
                  <div><p className="c-label">Location</p><p className="c-value">109-60400 Chuka, Kenya</p></div>
                </div>
                <a className="contact-item" href="https://beyonddataanalytics.online" target="_blank" rel="noopener noreferrer">
                  <div className="c-icon">🌐</div>
                  <div><p className="c-label">Website</p><p className="c-value">beyonddataanalytics.online</p></div>
                </a>
                <div className="contact-item" style={{ cursor: "default", alignItems: "flex-start" }}>
                  <div className="c-icon" style={{ marginTop: ".15rem" }}>🔍</div>
                  <div>
                    <p className="c-label">Available for</p>
                    <p className="c-value" style={{ lineHeight: 1.75, marginTop: ".2rem" }}>
                      Research collaborations<br />
                      Consulting opportunities<br />
                      Academic partnerships<br />
                      Data analytics projects
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="form-col">
                <input  className="form-field" type="text"  placeholder="Your Name" />
                <input  className="form-field" type="email" placeholder="Your Email" />
                <input  className="form-field" type="text"  placeholder="Subject" />
                <textarea className="form-field"             placeholder="Your message…" />
                <button className="btn-blue">Send Message →</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        © {new Date().getFullYear()} Victor Lumumba Wandera · All rights reserved · beyonddataanalytics.online
      </footer>
    </>
  );
}