"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const NAV = ["About", "Education", "Skills", "Publications", "Contact"];

const ROLES = [
  "Statistician",
  "Research Officer",
  "Data Analyst",
  "ML Researcher",
];

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

/* ─── Typewriter hook ─────────────────────────────────────────────────────────── */
function useTypewriter(words: string[]) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, 80);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, 45);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      setCharIdx(0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return { display, showCursor };
}

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
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : translate,
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Skill bar ───────────────────────────────────────────────────────────────── */
function SkillBar({ name, level }: { name: string; level: number }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
        <span style={{ fontFamily: "var(--sans)", fontSize: ".88rem", fontWeight: 500, color: "var(--ink)" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: ".75rem", color: "var(--muted)" }}>{level}%</span>
      </div>
      <div style={{ height: "3px", background: "var(--border)", borderRadius: "2px" }}>
        <div style={{
          height: "100%", borderRadius: "2px",
          background: "linear-gradient(90deg, var(--accent), var(--gold))",
          width: visible ? `${level}%` : "0%",
          transition: "width 1.1s cubic-bezier(.4,0,.2,1) 150ms",
        }} />
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
  const { display, showCursor } = useTypewriter(ROLES);

  const scrollTo = (s: string) => {
    document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "var(--sans)", color: "var(--ink)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        :root {
          --ink:    #1c1f2e;
          --paper:  #f7f5f0;
          --accent: #1a3a5c;
          --gold:   #c8933a;
          --muted:  #6b6b78;
          --border: #dddad3;
          --card:   #ffffff;
          --mono:   'DM Mono', monospace;
          --serif:  'Cormorant Garamond', Georgia, serif;
          --sans:   'Bricolage Grotesque', sans-serif;

          /* ── Aesthetic section backgrounds ── */
          --bg-hero:        linear-gradient(145deg, #faf8f4 0%, #eef4fb 50%, #f4f0fa 100%);
          --bg-about:       linear-gradient(160deg, #edf4fb 0%, #f0ebf7 60%, #fdf4ed 100%);
          --bg-education:   linear-gradient(150deg, #f8f5ff 0%, #fffbf0 60%, #f0f8ff 100%);
          --bg-skills:      linear-gradient(155deg, #f0faf4 0%, #f5f0ff 50%, #fff8f0 100%);
          --bg-pubs:        linear-gradient(145deg, #fefcf8 0%, #f0f6ff 50%, #fdf8fe 100%);
        }

        body { background: #f7f5f0; }

        /* ── NAV ── */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2.5rem;
          background: rgba(250,248,244,0.92);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(200,147,58,0.15);
        }
        .brand {
          font-family: var(--sans); font-weight: 700; font-size: 1rem;
          color: var(--accent); background: none; border: none; cursor: pointer;
          letter-spacing: -.01em;
        }
        .nav-links { display: flex; gap: 2.2rem; list-style: none; }
        .nav-links button {
          font-family: var(--sans); font-size: .82rem; font-weight: 500;
          color: var(--muted); background: none; border: none; cursor: pointer;
          letter-spacing: .03em; transition: color .2s; padding: 0;
        }
        .nav-links button:hover,
        .nav-links button.active { color: var(--accent); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--ink); }

        /* ── HERO ── */
        #hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 8rem 1.5rem 5rem;
          background: var(--bg-hero);
          position: relative; overflow: hidden;
        }
        /* Soft decorative blobs */
        #hero::before {
          content: ''; position: absolute;
          width: 520px; height: 520px; border-radius: 50%;
          background: radial-gradient(circle, rgba(167,197,235,0.22) 0%, transparent 70%);
          top: -80px; right: -100px; pointer-events: none;
        }
        #hero::after {
          content: ''; position: absolute;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,147,58,0.1) 0%, transparent 70%);
          bottom: -60px; left: -80px; pointer-events: none;
        }

        .hero-name {
          font-family: var(--serif); font-size: clamp(2.8rem, 6vw, 4.2rem);
          font-weight: 600; color: var(--ink); letter-spacing: -.01em; margin-bottom: .6rem;
          position: relative; z-index: 1;
        }

        /* ── TYPEWRITER ROLE ── */
        .hero-role-wrap {
          display: inline-flex; align-items: center; gap: 0;
          margin-bottom: 1.6rem; position: relative; z-index: 1;
        }
        .hero-role-text {
          font-family: var(--serif);
          font-size: clamp(1.2rem, 2.8vw, 1.75rem);
          font-style: italic;
          font-weight: 300;
          /* Vibrant teal-to-violet gradient */
          background: linear-gradient(100deg, #0e7fa8 0%, #7c3aed 60%, #c8933a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: .01em;
          min-height: 2.2rem;
          line-height: 1.3;
        }
        .hero-cursor {
          display: inline-block; width: 2px; height: 1.4em;
          background: linear-gradient(180deg, #0e7fa8, #7c3aed);
          border-radius: 1px; margin-left: 3px; vertical-align: middle;
          transition: opacity .1s;
        }

        .hero-bio {
          font-family: var(--sans); max-width: 560px; margin: 0 auto 2rem;
          font-size: .93rem; color: var(--muted); line-height: 1.8;
          position: relative; z-index: 1;
        }
        .hero-btns {
          display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
          margin-bottom: 2rem; position: relative; z-index: 1;
        }
        .btn-primary {
          font-family: var(--sans); padding: .7rem 1.7rem;
          background: var(--accent); color: #fff;
          border: none; cursor: pointer; font-size: .8rem; font-weight: 600;
          letter-spacing: .06em; transition: background .2s, transform .15s; border-radius: 3px;
        }
        .btn-primary:hover { background: var(--gold); transform: translateY(-1px); }
        .btn-outline {
          font-family: var(--sans); padding: .7rem 1.7rem;
          background: transparent; color: var(--accent);
          border: 1.5px solid var(--accent); cursor: pointer;
          font-size: .8rem; font-weight: 600; letter-spacing: .06em;
          transition: background .2s, color .2s, transform .15s; border-radius: 3px;
        }
        .btn-outline:hover { background: var(--accent); color: #fff; transform: translateY(-1px); }
        .social-row { display: flex; gap: 1.1rem; justify-content: center; position: relative; z-index: 1; }
        .social-icon {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; text-decoration: none; color: var(--ink);
          transition: border-color .2s, color .2s, transform .15s;
          background: rgba(255,255,255,0.6);
        }
        .social-icon:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

        /* ── SECTION SHARED ── */
        .sec { padding: 5.5rem 1.5rem; }
        .sec-inner { max-width: 1060px; margin: 0 auto; }
        .sec-label {
          text-align: center; font-family: var(--mono);
          font-size: .72rem; letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: .6rem;
        }
        .sec-title {
          font-family: var(--serif); text-align: center;
          font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 300;
          color: var(--accent); margin-bottom: .75rem;
        }
        .sec-title em { font-style: italic; }
        .sec-sub {
          font-family: var(--sans); text-align: center; max-width: 540px;
          margin: 0 auto 3rem; font-size: .9rem; color: var(--muted); line-height: 1.75;
        }

        /* ── ABOUT ── */
        #about {
          padding: 5.5rem 1.5rem;
          background: var(--bg-about);
          position: relative; overflow: hidden;
        }
        #about::before {
          content: ''; position: absolute; pointer-events: none;
          width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%);
          top: 0; right: 10%;
        }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5rem; align-items: center; }
        .about-photo {
          width: 100%; border-radius: 18px; min-height: 460px;
          background: linear-gradient(145deg, #1a3a5c 0%, #2d6498 60%, #1e5c8a 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 8rem; overflow: hidden;
          box-shadow: 0 20px 60px rgba(26,58,92,0.2);
        }
        .about-text h3 {
          font-family: var(--serif); font-size: 1.7rem; font-weight: 600;
          color: var(--accent); margin-bottom: 1rem;
        }
        .about-text p {
          font-family: var(--sans); font-size: .9rem;
          color: #3a3a45; line-height: 1.85; margin-bottom: .9rem;
        }
        .stat-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.75rem; }
        .stat-card {
          background: rgba(255,255,255,0.75); border: 1px solid rgba(200,147,58,0.2);
          backdrop-filter: blur(6px);
          padding: 1.2rem 1rem; text-align: center; border-radius: 10px;
          transition: box-shadow .25s, transform .25s;
        }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(26,58,92,0.1); }
        .stat-num { font-family: var(--serif); font-size: 2.2rem; font-weight: 600; color: var(--accent); line-height: 1; }
        .stat-lbl { font-family: var(--mono); font-size: .65rem; color: var(--muted); margin-top: .3rem; letter-spacing: .1em; text-transform: uppercase; }

        /* ── EDUCATION ── */
        #education {
          padding: 5.5rem 1.5rem;
          background: var(--bg-education);
          position: relative; overflow: hidden;
        }
        #education::after {
          content: ''; position: absolute; pointer-events: none;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(14,127,168,0.07) 0%, transparent 70%);
          bottom: 5%; left: 5%;
        }
        .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .edu-card {
          border: 1px solid rgba(200,147,58,0.15); padding: 1.75rem;
          background: rgba(255,255,255,0.7); border-radius: 12px;
          backdrop-filter: blur(8px);
          transition: box-shadow .25s, transform .25s;
        }
        .edu-card:hover { box-shadow: 0 10px 36px rgba(26,58,92,0.1); transform: translateY(-2px); }
        .edu-icon {
          width: 42px; height: 42px; border-radius: 10px;
          background: linear-gradient(135deg, #dbeafe, #ede9fe);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; margin-bottom: 1rem;
        }
        .edu-degree { font-family: var(--serif); font-size: 1.15rem; font-weight: 600; color: var(--accent); margin-bottom: .35rem; }
        .edu-school { font-family: var(--sans); font-size: .82rem; color: var(--muted); margin-bottom: .6rem; }
        .edu-year { font-family: var(--mono); font-size: .72rem; color: var(--gold); font-weight: 500; }
        .edu-desc { font-family: var(--sans); margin-top: .9rem; font-size: .82rem; color: var(--muted); line-height: 1.7; }
        .mission-box {
          background: rgba(255,255,255,0.65); border-left: 3px solid var(--gold);
          padding: 1.75rem 2rem; margin-top: 2rem; border-radius: 0 10px 10px 0;
          backdrop-filter: blur(6px);
        }
        .mission-box p { font-family: var(--sans); font-size: .9rem; color: #3a3a45; line-height: 1.85; }
        .mission-box strong { color: var(--ink); }
        .tags-row { display: flex; flex-wrap: wrap; gap: .65rem; margin-top: 1.25rem; }
        .tag {
          font-family: var(--sans); padding: .35rem .9rem; border-radius: 99px;
          border: 1px solid rgba(26,58,92,0.2);
          background: rgba(255,255,255,0.7);
          font-size: .75rem; color: var(--accent); font-weight: 500;
        }

        /* ── SKILLS ── */
        #skills {
          padding: 5.5rem 1.5rem;
          background: var(--bg-skills);
          position: relative; overflow: hidden;
        }
        #skills::before {
          content: ''; position: absolute; pointer-events: none;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,147,58,0.08) 0%, transparent 70%);
          top: 10%; right: -5%;
        }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .skills-group h4 {
          font-family: var(--mono); font-size: .72rem; font-weight: 500;
          letter-spacing: .18em; text-transform: uppercase; color: var(--gold);
          margin-bottom: 1.5rem; padding-bottom: .5rem; border-bottom: 1px solid var(--border);
        }
        .interests-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; margin-top: 1rem; }
        .int-card {
          background: rgba(255,255,255,0.7); border: 1px solid rgba(200,147,58,0.15);
          padding: 1.35rem; text-align: center; border-radius: 10px;
          backdrop-filter: blur(6px);
          transition: box-shadow .25s, transform .25s;
        }
        .int-card:hover { box-shadow: 0 8px 28px rgba(26,58,92,0.1); transform: translateY(-2px); }
        .int-icon { font-size: 1.6rem; display: block; margin-bottom: .55rem; }
        .int-title { font-family: var(--serif); font-size: .98rem; font-weight: 600; color: var(--accent); margin-bottom: .3rem; }
        .int-desc { font-family: var(--sans); font-size: .75rem; color: var(--muted); line-height: 1.55; }

        /* ── PUBLICATIONS ── */
        #publications {
          padding: 5.5rem 1.5rem;
          background: var(--bg-pubs);
          position: relative; overflow: hidden;
        }
        #publications::after {
          content: ''; position: absolute; pointer-events: none;
          width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
          bottom: 0; right: 5%;
        }
        .pub-item {
          display: flex; gap: 1.25rem; align-items: flex-start;
          padding: 1.35rem 0; border-bottom: 1px solid rgba(212,207,196,0.6);
        }
        .pub-year { font-family: var(--mono); min-width: 48px; font-size: .72rem; font-weight: 500; color: var(--gold); padding-top: .2rem; flex-shrink: 0; }
        .pub-title { font-family: var(--serif); font-size: 1rem; font-weight: 400; color: var(--accent); margin-bottom: .25rem; line-height: 1.45; }
        .pub-journal { font-family: var(--sans); font-size: .78rem; color: var(--muted); font-style: italic; }

        /* ── CONTACT ── */
        #contact { padding: 5.5rem 1.5rem; background: var(--ink); }
        .c-item {
          display: flex; gap: 1rem; align-items: center;
          margin-bottom: 1.2rem; text-decoration: none;
        }
        .c-icon {
          width: 40px; height: 40px;
          border: 1px solid rgba(255,255,255,.12); border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0; transition: border-color .2s, background .2s;
        }
        .c-item:hover .c-icon { border-color: var(--gold); background: rgba(200,147,58,0.1); }
        .c-lbl { font-family: var(--mono); font-size: .65rem; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; margin-bottom: .1rem; }
        .c-val { font-family: var(--sans); font-size: .85rem; color: rgba(245,242,236,.85); font-weight: 500; }
        .f-input {
          background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
          border-radius: 4px; padding: .8rem 1rem;
          color: #f5f2ec; font-family: var(--sans); font-size: .87rem;
          outline: none; transition: border-color .2s; width: 100%;
        }
        .f-input::placeholder { color: rgba(245,242,236,.25); }
        .f-input:focus { border-color: var(--gold); }

        /* ── FOOTER ── */
        footer {
          text-align: center; padding: 1.5rem;
          background: #050508; color: rgba(245,242,236,.25);
          font-family: var(--mono); font-size: .7rem; letter-spacing: .08em;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          nav { padding: .9rem 1.25rem; }
          .nav-links { display: none; }
          .nav-links.open {
            display: flex; flex-direction: column; position: fixed;
            top: 57px; left: 0; right: 0;
            background: rgba(250,248,244,.97);
            border-bottom: 1px solid var(--border);
            padding: 1.25rem 1.5rem; gap: 1rem; z-index: 199;
          }
          .hamburger { display: flex; }
          .sec, #about, #education, #skills, #publications, #contact { padding: 4rem 1.25rem; }
          .about-grid, .edu-grid, .skills-grid { grid-template-columns: 1fr; gap: 2rem; }
          .contact-grid { grid-template-columns: 1fr; gap: 2rem; }
          .interests-grid { grid-template-columns: 1fr 1fr; }
          .hero-name { font-size: 2.4rem; }
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
              <button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>{n}</button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero">
        <Reveal>
          <h1 className="hero-name">Victor Lumumba Wandera</h1>
        </Reveal>

        {/* Typewriter role */}
        <Reveal delay={100}>
          <div className="hero-role-wrap">
            <span className="hero-role-text">{display}</span>
            <span className="hero-cursor" style={{ opacity: showCursor ? 1 : 0 }} />
          </div>
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
            <button className="btn-primary" onClick={() => scrollTo("Publications")}>View Research</button>
            <button className="btn-outline" onClick={() => scrollTo("Contact")}>Get In Touch</button>
          </div>
        </Reveal>
        <Reveal delay={420}>
          <div className="social-row">
            <a className="social-icon" href="mailto:lumumbavictor172@gmail.com" title="Email">✉</a>
            <a className="social-icon" href="https://beyonddataanalytics.online" target="_blank" rel="noopener noreferrer" title="Website">🌐</a>
            <a className="social-icon" href="tel:+254706038599" title="Phone">☎</a>
          </div>
        </Reveal>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="sec">
        <div className="sec-inner">
          <Reveal><p className="sec-label">About Me</p></Reveal>
          <div className="about-grid" style={{ marginTop: "1rem" }}>
            <Reveal dir="left">
              <div className="about-photo">👨🏾‍💼</div>
            </Reveal>
            <Reveal dir="right">
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
                  solutions that make a meaningful impact — because great analysis isn't just about
                  numbers, it's about crafting insights that are actionable and useful.
                </p>
                <p>
                  I am always learning, exploring new methodologies, and finding better ways to
                  model the world. Every research project is an opportunity to grow and contribute
                  to the evolving landscape of data science.
                </p>
                <div className="stat-cards">
                  {[["8+","Publications"],["5+","Years Experience"],["3","Memberships"],["2","Degrees"]].map(([n,l]) => (
                    <div className="stat-card" key={l}>
                      <div className="stat-num">{n}</div>
                      <div className="stat-lbl">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="sec">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Educational Background</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Academic <em>Journey</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Built on a strong quantitative foundation at Chuka University.</p></Reveal>

          <div className="edu-grid">
            <Reveal dir="left" delay={80}>
              <div className="edu-card">
                <div className="edu-icon">🎓</div>
                <p className="edu-degree">Master of Science in Applied Statistics</p>
                <p className="edu-school">Chuka University, Chuka</p>
                <span className="edu-year">📅 May 2023 – May 2025</span>
                <p className="edu-desc">Advanced training in statistical modelling, machine learning, survival analysis, time series, and explainable AI — culminating in multiple peer-reviewed publications in international journals.</p>
              </div>
            </Reveal>
            <Reveal dir="right" delay={80}>
              <div className="edu-card">
                <div className="edu-icon">🏅</div>
                <p className="edu-degree">BSc Economics & Statistics</p>
                <p className="edu-school">Chuka University — 2nd Class Hons. (Upper Division)</p>
                <span className="edu-year">📅 Sep 2016 – Dec 2020</span>
                <p className="edu-desc">Solid grounding in econometrics, statistical theory, probability, and research methods — forming the bedrock for postgraduate and applied research work in data analytics and modelling.</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="mission-box">
              <p><strong>Mission Statement: </strong>To skillfully apply statistical and research expertise to generate actionable insights. As a dedicated statistician and aspiring research officer, I am committed to conducting meticulous quantitative and qualitative analyses that empower informed decision-making. By employing cutting-edge methodologies, I strive to unravel meaningful patterns within data — contributing to innovation and evidence-based profitability.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ marginTop: "2.5rem" }}>
              <p className="sec-label" style={{ textAlign: "left" }}>Professional Memberships</p>
              <div className="tags-row">
                {MEMBERSHIPS.map((m) => <span className="tag" key={m}>{m}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="sec">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Skills</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Technical <em>Proficiency</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Proficient in a broad range of statistical tools and analytical frameworks.</p></Reveal>

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
            <h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3.5rem 0 1.5rem", fontSize: "1.6rem", fontWeight: 300, color: "var(--accent)" }}>
              What Excites Me About Data Science
            </h3>
          </Reveal>
          <div className="interests-grid">
            {INTERESTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="int-card">
                  <span className="int-icon">{item.icon}</span>
                  <p className="int-title">{item.title}</p>
                  <p className="int-desc">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section id="publications" className="sec">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Research</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Publications</h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Peer-reviewed contributions to international journals in AI, statistics, public health, and finance.</p></Reveal>
          <div>
            {PUBLICATIONS.map(({ title, journal, year }, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="pub-item">
                  <span className="pub-year">{year}</span>
                  <div>
                    <p className="pub-title">{title}</p>
                    <p className="pub-journal">{journal}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec">
        <div className="sec-inner">
          <Reveal>
            <p className="sec-label" style={{ color: "var(--gold)" }}>Contact</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="sec-title" style={{ color: "#f5f2ec" }}>Let's <em>Collaborate</em></h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="sec-sub" style={{ color: "var(--muted)" }}>Open to research collaborations, consulting engagements, and academic partnerships.</p>
          </Reveal>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <Reveal dir="left">
              <div>
                {[
                  { href: "mailto:lumumbavictor172@gmail.com", icon: "✉", lbl: "Email",    val: "lumumbavictor172@gmail.com" },
                  { href: "tel:+254706038599",                 icon: "☎", lbl: "Phone",    val: "+254 706 038 599" },
                  { href: "#",                                 icon: "📍", lbl: "Location", val: "109-60400 Chuka, Kenya" },
                  { href: "https://beyonddataanalytics.online",icon: "🌐", lbl: "Website",  val: "beyonddataanalytics.online" },
                ].map(({ href, icon, lbl, val }) => (
                  <a key={lbl} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="c-item">
                    <div className="c-icon">{icon}</div>
                    <div>
                      <p className="c-lbl">{lbl}</p>
                      <p className="c-val">{val}</p>
                    </div>
                  </a>
                ))}
                <div style={{ marginTop: "1.5rem" }}>
                  <p className="c-lbl" style={{ marginBottom: ".75rem" }}>Available for</p>
                  {["Research collaborations","Consulting opportunities","Academic partnerships","Data analytics projects"].map((item) => (
                    <p key={item} style={{ fontFamily: "var(--sans)", fontSize: ".85rem", color: "rgba(245,242,236,.65)", marginBottom: ".5rem" }}>→ {item}</p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal dir="right">
              <div style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}>
                {["Your Name","Your Email","Subject"].map((ph) => (
                  <input key={ph} type={ph === "Your Email" ? "email" : "text"} placeholder={ph} className="f-input" />
                ))}
                <textarea placeholder="Your message…" rows={5} className="f-input" style={{ resize: "vertical" }} />
                <button
                  className="btn-primary"
                  style={{ width: "fit-content" }}
                >
                  Send Message →
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        © {new Date().getFullYear()} Victor Lumumba Wandera · All rights reserved · beyonddataanalytics.online
      </footer>
    </div>
  );
}