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
// FIX 7006: Added string[] type annotation to words parameter
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
    // FIX 7034 + 7005: Typed timeout explicitly so TS can infer it in clearTimeout
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

// FIX 7031: Added explicit typed props interface to Reveal
function Reveal({ children, delay = 0, dir = "up" }: {
  children: ReactNode;
  delay?: number;
  dir?: "up" | "left" | "right";
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
// FIX 7031: Added explicit typed props to SkillBar
function SkillBar({ name, level }: { name: string; level: number }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
        <span style={{ fontFamily: "var(--sans)", fontSize: ".88rem", fontWeight: 500, color: "var(--skills-text)" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: ".75rem", color: "var(--skills-muted)" }}>{level}%</span>
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.2)", borderRadius: "2px" }}>
        <div style={{
          height: "100%", borderRadius: "2px",
          background: "linear-gradient(90deg, #f7c948, #ff8c42)",
          width: visible ? `${level}%` : "0%",
          transition: "width 1.1s cubic-bezier(.4,0,.2,1) 150ms",
        }} />
      </div>
    </div>
  );
}

/* ─── Scroll spy ──────────────────────────────────────────────────────────────── */
// FIX 7006: Added string[] type annotation to ids parameter
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

  // FIX 7006: Added string type annotation to s parameter
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
        }

        body { background: #f7f5f0; }

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

        /* HERO — deep navy */
        #hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 8rem 1.5rem 5rem;
          background: linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 45%, #0f2744 100%);
          position: relative; overflow: hidden;
        }
        #hero::before {
          content: ''; position: absolute;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,147,58,0.18) 0%, transparent 65%);
          top: -120px; right: -150px; pointer-events: none;
        }
        #hero::after {
          content: ''; position: absolute;
          width: 450px; height: 450px; border-radius: 50%;
          background: radial-gradient(circle, rgba(100,170,240,0.12) 0%, transparent 65%);
          bottom: -80px; left: -100px; pointer-events: none;
        }
        #hero .hero-name { color: #f5f2ec; }
        #hero .hero-bio  { color: rgba(220,215,205,0.75); }

        .hero-name {
          font-family: var(--serif); font-size: clamp(2.8rem, 6vw, 4.2rem);
          font-weight: 600; letter-spacing: -.01em; margin-bottom: .6rem;
          position: relative; z-index: 1;
        }
        .hero-role-wrap {
          display: inline-flex; align-items: center; gap: 0;
          margin-bottom: 1.6rem; position: relative; z-index: 1;
        }
        .hero-role-text {
          font-family: var(--serif); font-size: clamp(1.2rem, 2.8vw, 1.75rem);
          font-style: italic; font-weight: 300;
          background: linear-gradient(100deg, #64c8f0 0%, #f7c948 60%, #ff8c42 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; letter-spacing: .01em;
          min-height: 2.2rem; line-height: 1.3;
        }
        .hero-cursor {
          display: inline-block; width: 2px; height: 1.4em;
          background: linear-gradient(180deg, #64c8f0, #f7c948);
          border-radius: 1px; margin-left: 3px; vertical-align: middle;
          transition: opacity .1s;
        }
        .hero-bio {
          font-family: var(--sans); max-width: 560px; margin: 0 auto 2rem;
          font-size: .93rem; line-height: 1.8; position: relative; z-index: 1;
        }
        .hero-btns {
          display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
          margin-bottom: 2rem; position: relative; z-index: 1;
        }
        .btn-primary {
          font-family: var(--sans); padding: .7rem 1.7rem;
          background: var(--gold); color: #fff;
          border: none; cursor: pointer; font-size: .8rem; font-weight: 600;
          letter-spacing: .06em; transition: background .2s, transform .15s; border-radius: 3px;
        }
        .btn-primary:hover { background: #e0a540; transform: translateY(-1px); }
        .btn-outline {
          font-family: var(--sans); padding: .7rem 1.7rem;
          background: transparent; color: #f5f2ec;
          border: 1.5px solid rgba(245,242,236,0.4); cursor: pointer;
          font-size: .8rem; font-weight: 600; letter-spacing: .06em;
          transition: background .2s, color .2s, transform .15s; border-radius: 3px;
        }
        .btn-outline:hover { background: rgba(245,242,236,0.1); transform: translateY(-1px); }
        .social-row { display: flex; gap: 1.1rem; justify-content: center; position: relative; z-index: 1; }
        .social-icon {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1.5px solid rgba(245,242,236,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; text-decoration: none; color: rgba(245,242,236,0.8);
          transition: border-color .2s, color .2s, transform .15s;
          background: rgba(255,255,255,0.06);
        }
        .social-icon:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

        /* ABOUT — warm cream/sand */
        #about {
          padding: 5.5rem 1.5rem;
          background: linear-gradient(160deg, #fdf6e3 0%, #faebd7 50%, #fdf3e0 100%);
          position: relative; overflow: hidden;
        }
        #about::before {
          content: ''; position: absolute; pointer-events: none;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,147,58,0.12) 0%, transparent 70%);
          top: -50px; right: 8%;
        }

        /* EDUCATION — cool slate blue (dark) */
        #education {
          padding: 5.5rem 1.5rem;
          background: linear-gradient(150deg, #1e3a52 0%, #243b55 40%, #1a2f45 100%);
          position: relative; overflow: hidden;
        }
        #education::after {
          content: ''; position: absolute; pointer-events: none;
          width: 350px; height: 350px; border-radius: 50%;
          background: radial-gradient(circle, rgba(100,200,240,0.1) 0%, transparent 70%);
          bottom: 5%; left: 5%;
        }
        #education .sec-label { color: #f7c948; }
        #education .sec-title { color: #e8f4fd; }
        #education .sec-sub   { color: rgba(200,220,240,0.65); }
        #education .edu-degree { color: #64c8f0; }
        #education .edu-school { color: rgba(200,220,240,0.7); }
        #education .edu-year   { color: #f7c948; }
        #education .edu-desc   { color: rgba(200,220,240,0.65); }
        #education .edu-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(100,200,240,0.2);
        }
        #education .edu-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.3); }
        #education .edu-icon {
          background: linear-gradient(135deg, rgba(100,200,240,0.2), rgba(124,58,237,0.2));
        }
        #education .mission-box {
          background: rgba(255,255,255,0.05);
          border-left: 3px solid #f7c948;
        }
        #education .mission-box p { color: rgba(200,220,240,0.8); }
        #education .mission-box strong { color: #f5f2ec; }
        #education .tag {
          background: rgba(255,255,255,0.07);
          border-color: rgba(100,200,240,0.3);
          color: #a8d8f0;
        }

        /* SKILLS — rich forest green (dark) */
        #skills {
          padding: 5.5rem 1.5rem;
          background: linear-gradient(155deg, #1a3a2a 0%, #1e4530 45%, #152e22 100%);
          position: relative; overflow: hidden;
          --skills-text: #e8f5e9;
          --skills-muted: rgba(200,240,210,0.55);
        }
        #skills::before {
          content: ''; position: absolute; pointer-events: none;
          width: 450px; height: 450px; border-radius: 50%;
          background: radial-gradient(circle, rgba(100,220,140,0.1) 0%, transparent 70%);
          top: 10%; right: -5%;
        }
        #skills .sec-label { color: #f7c948; }
        #skills .sec-title { color: #e8f5e9; }
        #skills .sec-sub   { color: rgba(200,240,210,0.6); }
        #skills .int-card {
          background: rgba(255,255,255,0.07);
          border-color: rgba(100,220,140,0.18);
        }
        #skills .int-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
        #skills .int-title { color: #a8e6c0; }
        #skills .int-desc  { color: rgba(200,240,210,0.6); }
        #skills h3 { color: #e8f5e9 !important; }

        /* PUBLICATIONS — deep burgundy/wine (dark) */
        #publications {
          padding: 5.5rem 1.5rem;
          background: linear-gradient(145deg, #2d1b2e 0%, #3a1f3c 45%, #251525 100%);
          position: relative; overflow: hidden;
        }
        #publications::after {
          content: ''; position: absolute; pointer-events: none;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(200,100,220,0.1) 0%, transparent 70%);
          bottom: 0; right: 5%;
        }
        #publications .sec-label   { color: #f7c948; }
        #publications .sec-title   { color: #f5e8ff; }
        #publications .sec-sub     { color: rgba(220,190,240,0.6); }
        #publications .pub-item    { border-bottom-color: rgba(200,150,220,0.2); }
        #publications .pub-year    { color: #f7c948; }
        #publications .pub-title   { color: #e8d0ff; }
        #publications .pub-journal { color: rgba(200,170,230,0.65); }

        /* CONTACT — deep charcoal */
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

        /* Shared section elements */
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

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5rem; align-items: center; }
        .about-photo {
          width: 100%; border-radius: 18px; min-height: 460px;
          background: linear-gradient(145deg, #1a3a5c 0%, #2d6498 60%, #1e5c8a 100%);
          display: flex; align-items: center; justify-content: center;
          font-size: 8rem; overflow: hidden;
          box-shadow: 0 20px 60px rgba(26,58,92,0.2);
        }
        .about-text h3 { font-family: var(--serif); font-size: 1.7rem; font-weight: 600; color: var(--accent); margin-bottom: 1rem; }
        .about-text p  { font-family: var(--sans); font-size: .9rem; color: #3a3a45; line-height: 1.85; margin-bottom: .9rem; }
        .stat-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.75rem; }
        .stat-card {
          background: rgba(255,255,255,0.75); border: 1px solid rgba(200,147,58,0.2);
          backdrop-filter: blur(6px); padding: 1.2rem 1rem; text-align: center; border-radius: 10px;
          transition: box-shadow .25s, transform .25s;
        }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(26,58,92,0.1); }
        .stat-num { font-family: var(--serif); font-size: 2.2rem; font-weight: 600; color: var(--accent); line-height: 1; }
        .stat-lbl { font-family: var(--mono); font-size: .65rem; color: var(--muted); margin-top: .3rem; letter-spacing: .1em; text-transform: uppercase; }

        .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .edu-card {
          border: 1px solid rgba(200,147,58,0.15); padding: 1.75rem;
          background: rgba(255,255,255,0.7); border-radius: 12px;
          backdrop-filter: blur(8px); transition: box-shadow .25s, transform .25s;
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
        .edu-year   { font-family: var(--mono); font-size: .72rem; color: var(--gold); font-weight: 500; }
        .edu-desc   { font-family: var(--sans); margin-top: .9rem; font-size: .82rem; color: var(--muted); line-height: 1.7; }
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
          border: 1px solid rgba(26,58,92,0.2); background: rgba(255,255,255,0.7);
          font-size: .75rem; color: var(--accent); font-weight: 500;
        }

        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .interests-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; margin-top: 1rem; }
        .int-card {
          background: rgba(255,255,255,0.7); border: 1px solid rgba(200,147,58,0.15);
          padding: 1.35rem; text-align: center; border-radius: 10px;
          backdrop-filter: blur(6px); transition: box-shadow .25s, transform .25s;
        }
        .int-card:hover { box-shadow: 0 8px 28px rgba(26,58,92,0.1); transform: translateY(-2px); }
        .int-icon  { font-size: 1.6rem; display: block; margin-bottom: .55rem; }
        .int-title { font-family: var(--serif); font-size: .98rem; font-weight: 600; color: var(--accent); margin-bottom: .3rem; }
        .int-desc  { font-family: var(--sans); font-size: .75rem; color: var(--muted); line-height: 1.55; }

        .pub-item {
          display: flex; gap: 1.25rem; align-items: flex-start;
          padding: 1.35rem 0; border-bottom: 1px solid rgba(212,207,196,0.6);
        }
        .pub-year    { font-family: var(--mono); min-width: 48px; font-size: .72rem; font-weight: 500; color: var(--gold); padding-top: .2rem; flex-shrink: 0; }
        .pub-title   { font-family: var(--serif); font-size: 1rem; font-weight: 400; color: var(--accent); margin-bottom: .25rem; line-height: 1.45; }
        .pub-journal { font-family: var(--sans); font-size: .78rem; color: var(--muted); font-style: italic; }

        footer {
          text-align: center; padding: 1.5rem;
          background: #050508; color: rgba(245,242,236,.25);
          font-family: var(--mono); font-size: .7rem; letter-spacing: .08em;
        }

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
          #about, #education, #skills, #publications, #contact { padding: 4rem 1.25rem; }
          .about-grid, .edu-grid, .skills-grid { grid-template-columns: 1fr; gap: 2rem; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .interests-grid { grid-template-columns: 1fr 1fr; }
          .hero-name { font-size: 2.4rem; }
        }
        @media (max-width: 480px) {
          .interests-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
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

      {/* HERO */}
      <section id="hero">
        <Reveal>
          <h1 className="hero-name">Victor Lumumba Wandera</h1>
        </Reveal>
        <Reveal delay={100}>
          <div className="hero-role-wrap">
            <span className="hero-role-text">{display}</span>
            <span className="hero-cursor" style={{ opacity: showCursor ? 1 : 0 }} />
          </div>
        </Reveal>
        <Reveal delay={220}>
          <p className="hero-bio">
            Welcome to my portfolio. I&apos;m a dedicated statistician and data analyst at Chuka
            University&apos;s Centre for Data Analytics and Modelling, with peer-reviewed publications
            in international journals. Explore my research and let&apos;s build knowledge together.
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

      {/* ABOUT */}
      <section id="about">
        <div className="sec-inner">
          <Reveal><p className="sec-label">About Me</p></Reveal>
          <div className="about-grid" style={{ marginTop: "1rem" }}>
            <Reveal dir="left">
              <div className="about-photo">
                <img
                  src="https://res.cloudinary.com/dacpiss4b/image/upload/v1772514964/main_image_wjyuuq.jpg"
                  alt="Victor Lumumba Wandera"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </Reveal>
            <Reveal dir="right">
              <div className="about-text">
                <h3>Hi! I&apos;m Victor Lumumba Wandera</h3>
                <p>
                  A dynamic statistician and data analyst based at Chuka University&apos;s Centre for
                  Data Analytics and Modelling (CDAM). My passion lies in leveraging statistical
                  methods and machine learning to extract meaningful insights from complex datasets.
                </p>
                <p>
                  I have contributed to peer-reviewed journals in AI, public health, epidemiology,
                  and financial analytics. What drives me is the ability to build evidence-based
                  solutions that make a meaningful impact — because great analysis isn&apos;t just about
                  numbers, it&apos;s about crafting insights that are actionable and useful.
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

      {/* EDUCATION */}
      <section id="education">
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
                <p className="edu-degree">BSc Economics &amp; Statistics</p>
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

      {/* SKILLS */}
      <section id="skills">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Skills</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Technical <em>Proficiency</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Proficient in a broad range of statistical tools and analytical frameworks.</p></Reveal>
          <div className="skills-grid">
            <div>
              <h4 style={{ fontFamily: "var(--mono)", fontSize: ".72rem", fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase" as const, color: "#f7c948", marginBottom: "1.5rem", paddingBottom: ".5rem", borderBottom: "1px solid rgba(200,240,210,0.15)" }}>Statistical Software</h4>
              {SKILLS_STAT.map((s) => <SkillBar key={s.name} {...s} />)}
            </div>
            <div>
              <h4 style={{ fontFamily: "var(--mono)", fontSize: ".72rem", fontWeight: 500, letterSpacing: ".18em", textTransform: "uppercase" as const, color: "#f7c948", marginBottom: "1.5rem", paddingBottom: ".5rem", borderBottom: "1px solid rgba(200,240,210,0.15)" }}>Analytics &amp; Machine Learning</h4>
              {SKILLS_ML.map((s) => <SkillBar key={s.name} {...s} />)}
            </div>
          </div>
          <Reveal delay={80}>
            <h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3.5rem 0 1.5rem", fontSize: "1.6rem", fontWeight: 300, color: "#e8f5e9" }}>
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

      {/* PUBLICATIONS */}
      <section id="publications">
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

      {/* CONTACT */}
      <section id="contact">
        <div className="sec-inner">
          <Reveal><p className="sec-label" style={{ color: "var(--gold)" }}>Contact</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title" style={{ color: "#f5f2ec" }}>Let&apos;s <em>Collaborate</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub" style={{ color: "var(--muted)" }}>Open to research collaborations, consulting engagements, and academic partnerships.</p></Reveal>
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
                <button className="btn-primary" style={{ width: "fit-content" }}>Send Message →</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        © {new Date().getFullYear()} Victor Lumumba Wandera · All rights reserved · beyonddataanalytics.online
      </footer>
    </div>
  );
}