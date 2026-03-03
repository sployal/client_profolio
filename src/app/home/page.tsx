"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

/* ─── Data ───────────────────────────────────────────────────────────────────── */
const NAV = ["About", "Education", "Experience", "Skills", "Services", "Publications", "Projects", "Contact"];

const ROLES = [
  "Statistician",
  "Tutorial Fellow",
  "Data Analyst",
  "ML Researcher",
  "Research Officer",
];

const PUBLICATIONS = [
  {
    title: "A Comparative Evaluation of Kaplan-Meier, Cox Proportional Hazards, and Random Survival Forests for Neonatal Mortality Prediction",
    authors: "Lumumba, V., Muriithi, D., Langat, A., Wanyama, M., Njoroge, E., Mutinda, J., Waka, O., & Mwebesa, E.",
    journal: "Computational Biology and Bioinformatics",
    year: 2025,
    vol: "Vol. 13(2), 42–59",
    doi: "https://doi.org/10.11648/j.cbb.20251302.11",
  },
  {
    title: "Evaluating Performance of Selected Single Classifiers with XAI in Prediction of Mental Health Distress Among University Students",
    authors: "Lumumba, V. W., Muriithi, D. K., Oundo, M.",
    journal: "American Journal of Artificial Intelligence",
    year: 2025,
    vol: "Vol. 9(2), 133–144",
    doi: "https://doi.org/10.11648/j.ajai.20250902.15",
  },
  {
    title: "An Explainable AI Framework for Neonatal Mortality Risk Prediction in Kenya: Enhancing Clinical Decisions with Machine Learning",
    authors: "Lumumba, V. W., Muriithi, D., Njoroge, E., Langat, A., Mwebesa, E., & Wanyama, M.",
    journal: "Biomedical Statistics and Informatics",
    year: 2025,
    vol: "Vol. 10(3), 64–83",
    doi: "https://doi.org/10.11648/j.bsi.20251003.12",
  },
  {
    title: "Explainable Artificial Intelligence Models for Predicting Malaria Risk in Kenya",
    authors: "Muriithi, D. K., Lumumba, V. W., Awe, O. O., & Muriithi, D. M.",
    journal: "European Journal of Artificial Intelligence and Machine Learning",
    year: 2025,
    vol: "Vol. 4(1), 1–8",
    doi: "https://doi.org/10.24018/ejai.2025.4.1.47",
  },
  {
    title: "Evaluating the Performance of Ensemble and Single Classifiers with Explainable Artificial Intelligence (XAI) on Hypertension Risk Prediction",
    authors: "Lumumba, V. W., Wanjuki, T. M., & Njoroge, E. W.",
    journal: "Computational Intelligence and Machine Learning",
    year: 2025,
    vol: "Vol. 6(1)",
    doi: "https://doi.org/10.36647/ciml/06.01.a004",
  },
  {
    title: "A Machine Learning-Based Prediction of Malaria Occurrence in Kenya",
    authors: "Muriithi, D., Lumumba, V. W., Okongo, M.",
    journal: "American Journal of Theoretical and Applied Statistics",
    year: 2024,
    vol: "Vol. 13(4), 65–72",
    doi: "https://doi.org/10.11648/j.ajtas.20241304.11",
  },
  {
    title: "Comparative Analysis of GARCH-Based Volatility Models: A Case of Nairobi Security Market PLC",
    authors: "Wanjuki, T. M., Lumumba, V. W., Kimtai, E. K., Mbaluka, M. K., & Njoroge, E. W.",
    journal: "European Journal of Mathematics and Statistics",
    year: 2024,
    vol: "Vol. 5(4), 1–18",
    doi: "https://doi.org/10.24018/ejmath.2024.5.4.310",
  },
];

const SKILLS_SOFT = [
  { name: "R",       level: 98 },
  { name: "Python",  level: 92 },
  { name: "SPSS",    level: 95 },
  { name: "Stata",   level: 90 },
  { name: "SAS",     level: 85 },
  { name: "EViews",  level: 88 },
  { name: "Excel",   level: 95 },
  { name: "Minitab", level: 85 },
  { name: "Gretl",   level: 82 },
];

const SKILLS_TECH = [
  { cat: "Predictive Modeling & ML", tags: ["Machine Learning","Deep Learning","Classification","Clustering","Neural Networks","XAI/Explainable AI"] },
  { cat: "Statistical Inference",    tags: ["Hypothesis Testing","Regression Analysis","ANOVA","Survival Analysis","Experimental Design"] },
  { cat: "Time Series & Spatial",    tags: ["Time Series Forecasting","Spatiotemporal Modeling","ARIMA/GARCH","Seasonal Analysis","Trend Detection"] },
  { cat: "Data Science & Big Data",  tags: ["Data Integration","Big Data Analytics","ETL Processes","Data Mining","Feature Engineering"] },
  { cat: "Research & Communication", tags: ["Reproducible Research","Scientific Computing","Data Visualization","Academic Writing"] },
  { cat: "Domain Applications",      tags: ["Health Analytics","Malaria Forecasting","Mental Health Research","Agricultural Statistics","Economic Modeling"] },
];

const EXPERIENCE = [
  {
    role: "Tutorial Fellow & Part-Time Lecturer",
    org: "Chuka University, Dept. of Physical Sciences",
    period: "Sep 2025 – Present",
    icon: "🎓",
    points: ["Teaching MATH 100: General Mathematics and MATH 124: Geometry and Linear Algebra","Developed lecture notes, problem sets, and assessments aligned with curriculum standards"],
    tags: ["University Teaching","Curriculum Development","Student Assessment"],
  },
  {
    role: "Data Analyst / Trainer",
    org: "Center for Data Analytics and Modeling (CDAM)",
    period: "Aug 2024 – Present",
    icon: "📊",
    points: ["Mentoring undergraduate and postgraduate students on capstone projects and theses","Focus areas: survival analysis, predictive modeling, and time series forecasting"],
    tags: ["Student Mentorship","Workshop Facilitation","Reproducible Research"],
  },
  {
    role: "Trainer in Statistical Analysis and Modeling",
    org: "Eco-Stat Club, Chuka University",
    period: "Jan 2021 – Apr 2023",
    icon: "📈",
    points: ["Delivered over two years of instruction in applied statistics and data analysis","Taught R, Python, SPSS, STATA, SAS, and EViews using real-world datasets"],
    tags: ["Software Training","Hands-on Sessions","Customized Learning"],
  },
];

const CONFERENCES = [
  { name: "Hands-on Workshop for AI and Machine Learning Modeling on Malaria Prediction", org: "CDAM, Chuka University", date: "Aug 2025" },
  { name: "NAMBARI 8th Workshop: Advanced Biostatistical Methods – Survival Analysis and ML in Health Research", org: "Moi University (with Brown, Hasselt & NYU)", date: "Jul 2025" },
  { name: "6th Annual International Research Conference – Presented research paper", org: "Tharaka University", date: "Oct 2024" },
  { name: "WASHA TAKWIMU Workshop: Machine Learning for Health Data Science", org: "DSI-Africa, Durban, South Africa", date: "Jul 2024" },
  { name: "AFRICAST Workshop: Tidy Time Series & Forecasting in R", org: "Forecasting for Social Good (F4SG) Initiative", date: "Oct 2023" },
  { name: "NAMBARI-DSSD 6th Workshop: Machine Learning for Real-World Data", org: "Moi University/AMPATH, Eldoret, Kenya", date: "May 2023" },
];

const SERVICES = [
  { icon: "📚", title: "Statistical Tutoring",      desc: "Comprehensive tutoring in statistics, econometrics, and data analysis for students and professionals.", points: ["One-on-one tutoring sessions","Group workshops and seminars","Statistical software training","Exam preparation and support","Custom learning materials"] },
  { icon: "📋", title: "Data Analysis Plans",       desc: "Customized data analysis strategies tailored to your research objectives and business needs.", points: ["Statistical methodology design","Sample size calculations","Data collection protocols","Analysis framework development","Quality assurance procedures"] },
  { icon: "🎓", title: "Thesis & Project Mentorship", desc: "Expert guidance for academic research projects, dissertations, and thesis development.", points: ["Research design consultation","Statistical analysis guidance","Methodology review","Results interpretation","Academic writing support"] },
  { icon: "🏛️", title: "Workshop Facilitation",    desc: "Professional workshops on statistical methods, data science, and research methodologies.", points: ["Statistical software training","Data science workshops","Machine learning seminars","Research methodology training","Custom corporate training"] },
  { icon: "🔬", title: "Research Consulting",       desc: "Comprehensive research consulting services from design to publication-ready results.", points: ["Research proposal development","Statistical analysis execution","Data visualization and reporting","Peer review support","Publication assistance"] },
  { icon: "✅", title: "Feedback & Assessment",     desc: "Professional review and assessment of statistical analyses, research methodologies, and reports.", points: ["Statistical analysis review","Methodology assessment","Report quality evaluation","Improvement recommendations","Best practices guidance"] },
];

const PROJECTS = [
  { icon: "🧠", tag: "MSc Thesis", title: "Mental Health Distress Prediction", desc: "ML-based prediction of psychological mental health distress using interpretable ML models with XAI for transparency and clinical applicability.", tools: ["R","Python","Random Forest","XGBoost","SHAP","LIME"], outcomes: ["Identified key risk factors for mental health distress","Developed screening protocols for universities","Published in peer-reviewed journals"] },
  { icon: "🦟", tag: "Health Analytics", title: "Malaria Forecasting with ML", desc: "Advanced predictive modeling for malaria outbreak forecasting in Kenya using machine learning algorithms and explainable AI frameworks.", tools: ["R","Python","Machine Learning","XAI","Time Series"], outcomes: ["Developed malaria risk prediction models","Implemented XAI for model interpretability","Published multiple research papers"] },
  { icon: "👶", tag: "Biostatistics", title: "Neonatal Mortality Risk Prediction", desc: "Comparative evaluation of survival analysis methods and ML for predicting neonatal mortality in Kenya with clinical decision support.", tools: ["R","Kaplan-Meier","Cox PH","Random Survival Forests","XAI"], outcomes: ["Enhanced clinical decision-making tools","Compared traditional and ML approaches","Framework for low-resource settings"] },
  { icon: "💊", tag: "Health Informatics", title: "Hypertension Risk Prediction with XAI", desc: "Evaluating ensemble and single classifiers with Explainable AI for hypertension risk prediction to support preventive healthcare.", tools: ["Python","Ensemble Methods","SHAP","Feature Importance"], outcomes: ["Identified hypertension risk factors","Transparent model explanations","Clinical applicability framework"] },
  { icon: "📉", tag: "Financial Analytics", title: "Financial Market Volatility Analysis", desc: "Comparative analysis of GARCH-based volatility models for the Nairobi Securities Exchange to understand financial market dynamics.", tools: ["R","EViews","GARCH","EGARCH","Time Series"], outcomes: ["Volatility modeling for NSE","Risk assessment frameworks","Investment decision support"] },
  { icon: "📡", tag: "Training & Mentorship", title: "Tidy Time Series & Forecasting Training", desc: "Led workshops and mentorship on tidy time series analysis and forecasting in R as part of the Forecasting for Social Good initiative.", tools: ["R","tidyverse","fable","tsibble","Forecasting"], outcomes: ["Trained students and researchers","Reproducible research workflows","Community capacity building"] },
];

const MEMBERSHIPS = [
  { name: "Statistical Society of Kenya (SSK)", num: "Member No. 752493" },
  { name: "International Biometrics Society, Kenya Chapter", num: "Member No. 1508813" },
  { name: "Applied Malaria Modeling Network (AMMNet)", num: "Kenya Chapter" },
];

const INTERESTS = [
  { icon: "📊", title: "Applied Statistical Modeling & ML", desc: "Developing interpretable ML models to predict malaria incidence and psychological distress, emphasizing model transparency in low-resource settings." },
  { icon: "🌍", title: "ML/DL for Socioeconomic Challenges", desc: "Extending ML and deep learning to study climate change, agricultural productivity, food security, and financial modeling in sub-Saharan Africa." },
  { icon: "🧪", title: "Innovative Experimental Design", desc: "Optimal experimental designs, spatiotemporal modeling, and integration of heterogeneous big data sources for evidence-based policy." },
  { icon: "🏥", title: "Health Analytics", desc: "Evidence-based research for health outcomes, malaria forecasting, mental health research, and neonatal mortality prediction." },
  { icon: "💹", title: "Financial Econometrics", desc: "Modelling volatility, GARCH-based models, and forecasting in capital markets including the Nairobi Securities Exchange." },
  { icon: "📚", title: "Teaching & Mentoring", desc: "Sharing statistical and data science knowledge with the next generation of researchers and analysts." },
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
      timeout = setTimeout(() => { setDisplay(word.slice(0, charIdx)); setCharIdx(c => c + 1); }, 80);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), 1600);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => { setDisplay(word.slice(0, charIdx)); setCharIdx(c => c - 1); }, 45);
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

function Reveal({ children, delay = 0, dir = "up" }: { children: ReactNode; delay?: number; dir?: "up"|"left"|"right"; }) {
  const { ref, visible } = useReveal();
  const translate = dir === "left" ? "translateX(-28px)" : dir === "right" ? "translateX(28px)" : "translateY(28px)";
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : translate, transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Skill bar ───────────────────────────────────────────────────────────────── */
function SkillBar({ name, level }: { name: string; level: number }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
        <span style={{ fontFamily: "var(--sans)", fontSize: ".85rem", fontWeight: 500, color: "var(--skills-text)" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: ".72rem", color: "var(--skills-muted)" }}>{level}%</span>
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.15)", borderRadius: "2px" }}>
        <div style={{ height: "100%", borderRadius: "2px", background: "linear-gradient(90deg, #f7c948, #ff8c42)", width: visible ? `${level}%` : "0%", transition: "width 1.1s cubic-bezier(.4,0,.2,1) 150ms" }} />
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
  const scrollTo = (s: string) => { document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "var(--sans)", color: "var(--ink)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Bricolage+Grotesque:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        :root {
          --ink: #1c1f2e; --paper: #f7f5f0; --accent: #1a3a5c; --gold: #c8933a;
          --muted: #6b6b78; --border: #dddad3; --card: #ffffff;
          --mono: 'DM Mono', monospace; --serif: 'Cormorant Garamond', Georgia, serif;
          --sans: 'Bricolage Grotesque', sans-serif;
        }
        body { background: #f7f5f0; }
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          display: flex; align-items: center; justify-content: space-between;
          padding: .85rem 2.5rem;
          background: rgba(250,248,244,0.93); backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(200,147,58,0.15);
        }
        .brand { font-family: var(--sans); font-weight: 700; font-size: .95rem; color: var(--accent); background: none; border: none; cursor: pointer; letter-spacing: -.01em; }
        .nav-links { display: flex; gap: 1.8rem; list-style: none; }
        .nav-links button { font-family: var(--sans); font-size: .78rem; font-weight: 500; color: var(--muted); background: none; border: none; cursor: pointer; letter-spacing: .03em; transition: color .2s; padding: 0; }
        .nav-links button:hover, .nav-links button.active { color: var(--accent); }
        .hamburger { display: none; background: none; border: none; cursor: pointer; flex-direction: column; gap: 5px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: var(--ink); }

        /* HERO */
        #hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 1.5rem 5rem; background: linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 45%, #0f2744 100%); position: relative; overflow: hidden; }
        #hero::before { content: ''; position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(200,147,58,0.18) 0%, transparent 65%); top: -120px; right: -150px; pointer-events: none; }
        #hero::after { content: ''; position: absolute; width: 450px; height: 450px; border-radius: 50%; background: radial-gradient(circle, rgba(100,170,240,0.12) 0%, transparent 65%); bottom: -80px; left: -100px; pointer-events: none; }
        .hero-name { font-family: var(--serif); font-size: clamp(2.8rem, 6vw, 4.2rem); font-weight: 600; letter-spacing: -.01em; margin-bottom: .6rem; position: relative; z-index: 1; color: #f5f2ec; }
        .hero-role-wrap { display: inline-flex; align-items: center; gap: 0; margin-bottom: 1.6rem; position: relative; z-index: 1; }
        .hero-role-text { font-family: var(--serif); font-size: clamp(1.2rem, 2.8vw, 1.75rem); font-style: italic; font-weight: 300; background: linear-gradient(100deg, #64c8f0 0%, #f7c948 60%, #ff8c42 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: .01em; min-height: 2.2rem; line-height: 1.3; }
        .hero-cursor { display: inline-block; width: 2px; height: 1.4em; background: linear-gradient(180deg, #64c8f0, #f7c948); border-radius: 1px; margin-left: 3px; vertical-align: middle; transition: opacity .1s; }
        .hero-bio { font-family: var(--sans); max-width: 580px; margin: 0 auto 2rem; font-size: .93rem; line-height: 1.8; position: relative; z-index: 1; color: rgba(220,215,205,0.75); }
        .hero-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem; position: relative; z-index: 1; }
        .btn-primary { font-family: var(--sans); padding: .7rem 1.7rem; background: var(--gold); color: #fff; border: none; cursor: pointer; font-size: .8rem; font-weight: 600; letter-spacing: .06em; transition: background .2s, transform .15s; border-radius: 3px; }
        .btn-primary:hover { background: #e0a540; transform: translateY(-1px); }
        .btn-outline { font-family: var(--sans); padding: .7rem 1.7rem; background: transparent; color: #f5f2ec; border: 1.5px solid rgba(245,242,236,0.4); cursor: pointer; font-size: .8rem; font-weight: 600; letter-spacing: .06em; transition: background .2s, color .2s, transform .15s; border-radius: 3px; }
        .btn-outline:hover { background: rgba(245,242,236,0.1); transform: translateY(-1px); }
        .social-row { display: flex; gap: 1.1rem; justify-content: center; position: relative; z-index: 1; }
        .social-icon { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid rgba(245,242,236,0.2); display: flex; align-items: center; justify-content: center; font-size: 1rem; text-decoration: none; color: rgba(245,242,236,0.8); transition: border-color .2s, color .2s, transform .15s; background: rgba(255,255,255,0.06); }
        .social-icon:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }

        /* ABOUT — warm cream */
        #about { padding: 5.5rem 1.5rem; background: linear-gradient(160deg, #fdf6e3 0%, #faebd7 50%, #fdf3e0 100%); position: relative; overflow: hidden; }
        #about::before { content: ''; position: absolute; pointer-events: none; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(200,147,58,0.12) 0%, transparent 70%); top: -50px; right: 8%; }

        /* EDUCATION — slate blue dark */
        #education { padding: 5.5rem 1.5rem; background: linear-gradient(150deg, #1e3a52 0%, #243b55 40%, #1a2f45 100%); position: relative; overflow: hidden; }
        #education::after { content: ''; position: absolute; pointer-events: none; width: 350px; height: 350px; border-radius: 50%; background: radial-gradient(circle, rgba(100,200,240,0.1) 0%, transparent 70%); bottom: 5%; left: 5%; }
        #education .sec-label { color: #f7c948; }
        #education .sec-title { color: #e8f4fd; }
        #education .sec-sub   { color: rgba(200,220,240,0.65); }
        #education .edu-degree { color: #64c8f0; }
        #education .edu-school { color: rgba(200,220,240,0.7); }
        #education .edu-year   { color: #f7c948; }
        #education .edu-desc   { color: rgba(200,220,240,0.65); }
        #education .edu-card   { background: rgba(255,255,255,0.07); border: 1px solid rgba(100,200,240,0.2); }
        #education .edu-card:hover { box-shadow: 0 10px 36px rgba(0,0,0,0.3); }
        #education .edu-icon   { background: linear-gradient(135deg, rgba(100,200,240,0.2), rgba(124,58,237,0.2)); }
        #education .mission-box { background: rgba(255,255,255,0.05); border-left: 3px solid #f7c948; }
        #education .mission-box p { color: rgba(200,220,240,0.8); }
        #education .mission-box strong { color: #f5f2ec; }
        #education .tag { background: rgba(255,255,255,0.07); border-color: rgba(100,200,240,0.3); color: #a8d8f0; }

        /* EXPERIENCE — amber/terracotta dark */
        #experience { padding: 5.5rem 1.5rem; background: linear-gradient(145deg, #2a1f0d 0%, #3a2910 45%, #251a08 100%); position: relative; overflow: hidden; }
        #experience::before { content: ''; position: absolute; pointer-events: none; width: 420px; height: 420px; border-radius: 50%; background: radial-gradient(circle, rgba(247,201,72,0.1) 0%, transparent 70%); top: 5%; right: -5%; }
        #experience .sec-label { color: #f7c948; }
        #experience .sec-title { color: #fdf3e0; }
        #experience .sec-sub   { color: rgba(240,220,180,0.6); }

        /* SKILLS — forest green dark */
        #skills { padding: 5.5rem 1.5rem; background: linear-gradient(155deg, #1a3a2a 0%, #1e4530 45%, #152e22 100%); position: relative; overflow: hidden; --skills-text: #e8f5e9; --skills-muted: rgba(200,240,210,0.55); }
        #skills::before { content: ''; position: absolute; pointer-events: none; width: 450px; height: 450px; border-radius: 50%; background: radial-gradient(circle, rgba(100,220,140,0.1) 0%, transparent 70%); top: 10%; right: -5%; }
        #skills .sec-label { color: #f7c948; }
        #skills .sec-title { color: #e8f5e9; }
        #skills .sec-sub   { color: rgba(200,240,210,0.6); }
        #skills .int-card  { background: rgba(255,255,255,0.07); border-color: rgba(100,220,140,0.18); }
        #skills .int-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.3); }
        #skills .int-title { color: #a8e6c0; }
        #skills .int-desc  { color: rgba(200,240,210,0.6); }

        /* SERVICES — indigo/violet dark */
        #services { padding: 5.5rem 1.5rem; background: linear-gradient(150deg, #1a1a3a 0%, #22224a 45%, #151530 100%); position: relative; overflow: hidden; }
        #services::after { content: ''; position: absolute; pointer-events: none; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(130,100,255,0.1) 0%, transparent 70%); bottom: 0; left: 5%; }
        #services .sec-label { color: #f7c948; }
        #services .sec-title { color: #ece8ff; }
        #services .sec-sub   { color: rgba(200,195,240,0.6); }

        /* PUBLICATIONS — deep burgundy */
        #publications { padding: 5.5rem 1.5rem; background: linear-gradient(145deg, #2d1b2e 0%, #3a1f3c 45%, #251525 100%); position: relative; overflow: hidden; }
        #publications::after { content: ''; position: absolute; pointer-events: none; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(200,100,220,0.1) 0%, transparent 70%); bottom: 0; right: 5%; }
        #publications .sec-label   { color: #f7c948; }
        #publications .sec-title   { color: #f5e8ff; }
        #publications .sec-sub     { color: rgba(220,190,240,0.6); }
        #publications .pub-item    { border-bottom-color: rgba(200,150,220,0.2); }
        #publications .pub-year    { color: #f7c948; }
        #publications .pub-title   { color: #e8d0ff; }
        #publications .pub-journal { color: rgba(200,170,230,0.65); }
        #publications .pub-authors { color: rgba(210,185,235,0.55); }
        #publications .pub-doi     { color: #c8a8e8; }

        /* PROJECTS — deep teal dark */
        #projects { padding: 5.5rem 1.5rem; background: linear-gradient(150deg, #0d2a2a 0%, #0f3535 45%, #082020 100%); position: relative; overflow: hidden; }
        #projects::before { content: ''; position: absolute; pointer-events: none; width: 440px; height: 440px; border-radius: 50%; background: radial-gradient(circle, rgba(60,200,200,0.09) 0%, transparent 70%); top: 5%; right: -5%; }
        #projects .sec-label { color: #f7c948; }
        #projects .sec-title { color: #e0fafa; }
        #projects .sec-sub   { color: rgba(180,230,230,0.6); }

        /* CONTACT — deep charcoal */
        #contact { padding: 5.5rem 1.5rem; background: var(--ink); }
        .c-item { display: flex; gap: 1rem; align-items: center; margin-bottom: 1.2rem; text-decoration: none; }
        .c-icon { width: 40px; height: 40px; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; transition: border-color .2s, background .2s; }
        .c-item:hover .c-icon { border-color: var(--gold); background: rgba(200,147,58,0.1); }
        .c-lbl { font-family: var(--mono); font-size: .65rem; color: var(--muted); letter-spacing: .1em; text-transform: uppercase; margin-bottom: .1rem; }
        .c-val { font-family: var(--sans); font-size: .85rem; color: rgba(245,242,236,.85); font-weight: 500; }
        .f-input { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 4px; padding: .8rem 1rem; color: #f5f2ec; font-family: var(--sans); font-size: .87rem; outline: none; transition: border-color .2s; width: 100%; }
        .f-input::placeholder { color: rgba(245,242,236,.25); }
        .f-input:focus { border-color: var(--gold); }

        /* Shared */
        .sec-inner { max-width: 1060px; margin: 0 auto; }
        .sec-label { text-align: center; font-family: var(--mono); font-size: .72rem; letter-spacing: .2em; text-transform: uppercase; color: var(--gold); margin-bottom: .6rem; }
        .sec-title { font-family: var(--serif); text-align: center; font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 300; color: var(--accent); margin-bottom: .75rem; }
        .sec-title em { font-style: italic; }
        .sec-sub { font-family: var(--sans); text-align: center; max-width: 560px; margin: 0 auto 3rem; font-size: .9rem; color: var(--muted); line-height: 1.75; }

        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4.5rem; align-items: center; }
        .about-photo { width: 100%; border-radius: 18px; min-height: 460px; background: linear-gradient(145deg, #1a3a5c 0%, #2d6498 60%, #1e5c8a 100%); display: flex; align-items: center; justify-content: center; font-size: 8rem; overflow: hidden; box-shadow: 0 20px 60px rgba(26,58,92,0.2); }
        .about-text h3 { font-family: var(--serif); font-size: 1.7rem; font-weight: 600; color: var(--accent); margin-bottom: 1rem; }
        .about-text p { font-family: var(--sans); font-size: .9rem; color: #3a3a45; line-height: 1.85; margin-bottom: .9rem; }
        .stat-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1.75rem; }
        .stat-card { background: rgba(255,255,255,0.75); border: 1px solid rgba(200,147,58,0.2); backdrop-filter: blur(6px); padding: 1.2rem 1rem; text-align: center; border-radius: 10px; transition: box-shadow .25s, transform .25s; }
        .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(26,58,92,0.1); }
        .stat-num { font-family: var(--serif); font-size: 2.2rem; font-weight: 600; color: var(--accent); line-height: 1; }
        .stat-lbl { font-family: var(--mono); font-size: .62rem; color: var(--muted); margin-top: .3rem; letter-spacing: .1em; text-transform: uppercase; }

        .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .edu-card { border: 1px solid rgba(200,147,58,0.15); padding: 1.75rem; background: rgba(255,255,255,0.7); border-radius: 12px; backdrop-filter: blur(8px); transition: box-shadow .25s, transform .25s; }
        .edu-card:hover { box-shadow: 0 10px 36px rgba(26,58,92,0.1); transform: translateY(-2px); }
        .edu-icon { width: 42px; height: 42px; border-radius: 10px; background: linear-gradient(135deg, #dbeafe, #ede9fe); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 1rem; }
        .edu-degree { font-family: var(--serif); font-size: 1.15rem; font-weight: 600; color: var(--accent); margin-bottom: .35rem; }
        .edu-school { font-family: var(--sans); font-size: .82rem; color: var(--muted); margin-bottom: .6rem; }
        .edu-year   { font-family: var(--mono); font-size: .72rem; color: var(--gold); font-weight: 500; }
        .edu-desc   { font-family: var(--sans); margin-top: .9rem; font-size: .82rem; color: var(--muted); line-height: 1.7; }
        .mission-box { background: rgba(255,255,255,0.65); border-left: 3px solid var(--gold); padding: 1.75rem 2rem; margin-top: 2rem; border-radius: 0 10px 10px 0; backdrop-filter: blur(6px); }
        .mission-box p { font-family: var(--sans); font-size: .9rem; color: #3a3a45; line-height: 1.85; }
        .mission-box strong { color: var(--ink); }
        .tags-row { display: flex; flex-wrap: wrap; gap: .65rem; margin-top: 1.25rem; }
        .tag { font-family: var(--sans); padding: .35rem .9rem; border-radius: 99px; border: 1px solid rgba(26,58,92,0.2); background: rgba(255,255,255,0.7); font-size: .75rem; color: var(--accent); font-weight: 500; }

        /* Experience timeline */
        .exp-timeline { position: relative; padding-left: 2rem; }
        .exp-timeline::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, #f7c948, rgba(247,201,72,0.1)); border-radius: 1px; }
        .exp-item { position: relative; margin-bottom: 2.5rem; }
        .exp-item::before { content: ''; position: absolute; left: -2.35rem; top: .4rem; width: 12px; height: 12px; border-radius: 50%; background: #f7c948; border: 2px solid #2a1f0d; box-shadow: 0 0 0 3px rgba(247,201,72,0.25); }
        .exp-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(247,201,72,0.2); border-radius: 12px; padding: 1.5rem; transition: box-shadow .25s, transform .25s; }
        .exp-card:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .exp-role { font-family: var(--serif); font-size: 1.15rem; font-weight: 600; color: #f7c948; margin-bottom: .25rem; }
        .exp-org  { font-family: var(--sans); font-size: .82rem; color: rgba(240,220,180,0.75); margin-bottom: .3rem; }
        .exp-period { font-family: var(--mono); font-size: .7rem; color: rgba(240,210,150,0.55); margin-bottom: 1rem; }
        .exp-points { list-style: none; margin-bottom: 1rem; }
        .exp-points li { font-family: var(--sans); font-size: .83rem; color: rgba(240,220,180,0.7); line-height: 1.6; padding: .2rem 0; padding-left: 1rem; position: relative; }
        .exp-points li::before { content: '→'; position: absolute; left: 0; color: #f7c948; font-size: .75rem; }
        .exp-tags { display: flex; flex-wrap: wrap; gap: .5rem; }
        .exp-tag { font-family: var(--mono); font-size: .65rem; padding: .25rem .7rem; border-radius: 99px; background: rgba(247,201,72,0.12); border: 1px solid rgba(247,201,72,0.25); color: #f7c948; letter-spacing: .05em; }

        /* Conferences */
        .conf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2.5rem; }
        .conf-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(247,201,72,0.15); border-radius: 10px; padding: 1.25rem; transition: box-shadow .25s, transform .25s; }
        .conf-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
        .conf-date { font-family: var(--mono); font-size: .65rem; color: #f7c948; letter-spacing: .12em; margin-bottom: .5rem; }
        .conf-name { font-family: var(--sans); font-size: .83rem; color: rgba(240,220,180,0.85); line-height: 1.55; font-weight: 500; margin-bottom: .35rem; }
        .conf-org  { font-family: var(--sans); font-size: .76rem; color: rgba(240,210,150,0.5); font-style: italic; }

        /* Skills */
        .skills-soft-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem 3rem; margin-bottom: 3rem; }
        .skills-tech-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
        .tech-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(100,220,140,0.18); border-radius: 10px; padding: 1.25rem; }
        .tech-cat  { font-family: var(--mono); font-size: .65rem; color: #f7c948; letter-spacing: .12em; text-transform: uppercase; margin-bottom: .75rem; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: .45rem; }
        .tech-tag  { font-family: var(--sans); font-size: .72rem; padding: .25rem .65rem; border-radius: 99px; background: rgba(100,220,140,0.12); border: 1px solid rgba(100,220,140,0.25); color: #a8e6c0; }
        .interests-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; margin-top: 2rem; }
        .int-card { background: rgba(255,255,255,0.7); border: 1px solid rgba(200,147,58,0.15); padding: 1.35rem; text-align: center; border-radius: 10px; backdrop-filter: blur(6px); transition: box-shadow .25s, transform .25s; }
        .int-card:hover { box-shadow: 0 8px 28px rgba(26,58,92,0.1); transform: translateY(-2px); }
        .int-icon  { font-size: 1.6rem; display: block; margin-bottom: .55rem; }
        .int-title { font-family: var(--serif); font-size: .98rem; font-weight: 600; color: var(--accent); margin-bottom: .3rem; }
        .int-desc  { font-family: var(--sans); font-size: .75rem; color: var(--muted); line-height: 1.55; }

        /* Services */
        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; }
        .svc-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(130,100,255,0.2); border-radius: 12px; padding: 1.75rem; transition: box-shadow .25s, transform .25s; }
        .svc-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.35); border-color: rgba(130,100,255,0.4); }
        .svc-icon  { font-size: 1.8rem; margin-bottom: .85rem; display: block; }
        .svc-title { font-family: var(--serif); font-size: 1.1rem; font-weight: 600; color: #c8b8ff; margin-bottom: .6rem; }
        .svc-desc  { font-family: var(--sans); font-size: .8rem; color: rgba(200,195,240,0.65); line-height: 1.65; margin-bottom: 1rem; }
        .svc-points { list-style: none; }
        .svc-points li { font-family: var(--sans); font-size: .78rem; color: rgba(200,195,240,0.6); padding: .2rem 0 .2rem 1rem; position: relative; line-height: 1.5; }
        .svc-points li::before { content: '·'; position: absolute; left: 0; color: #f7c948; font-size: 1.1rem; line-height: 1.3; }
        .process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin: 3rem 0; }
        .process-step { text-align: center; }
        .process-num { font-family: var(--serif); font-size: 3rem; font-weight: 600; color: rgba(130,100,255,0.3); line-height: 1; margin-bottom: .5rem; }
        .process-title { font-family: var(--sans); font-size: .9rem; font-weight: 600; color: #c8b8ff; margin-bottom: .5rem; }
        .process-desc  { font-family: var(--sans); font-size: .8rem; color: rgba(200,195,240,0.55); line-height: 1.6; }

        /* Publications */
        .pub-item { display: flex; gap: 1.25rem; align-items: flex-start; padding: 1.4rem 0; border-bottom: 1px solid rgba(200,150,220,0.2); }
        .pub-num     { font-family: var(--mono); min-width: 30px; font-size: .68rem; color: rgba(200,170,230,0.4); padding-top: .2rem; flex-shrink: 0; }
        .pub-year    { font-family: var(--mono); min-width: 44px; font-size: .7rem; font-weight: 500; color: #f7c948; padding-top: .2rem; flex-shrink: 0; }
        .pub-title   { font-family: var(--serif); font-size: 1rem; font-weight: 400; color: #e8d0ff; margin-bottom: .25rem; line-height: 1.45; }
        .pub-authors { font-family: var(--sans); font-size: .75rem; color: rgba(210,185,235,0.5); margin-bottom: .2rem; }
        .pub-journal { font-family: var(--sans); font-size: .78rem; color: rgba(200,170,230,0.65); font-style: italic; margin-bottom: .2rem; }
        .pub-vol     { font-family: var(--mono); font-size: .65rem; color: rgba(200,170,230,0.4); }
        .pub-doi     { font-family: var(--mono); font-size: .65rem; color: #c8a8e8; text-decoration: none; display: inline-block; margin-top: .2rem; }
        .pub-doi:hover { text-decoration: underline; }

        /* Projects */
        .proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; }
        .proj-card { background: rgba(255,255,255,0.07); border: 1px solid rgba(60,200,200,0.15); border-radius: 12px; padding: 1.6rem; transition: box-shadow .25s, transform .25s; }
        .proj-card:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.35); border-color: rgba(60,200,200,0.3); }
        .proj-tag   { font-family: var(--mono); font-size: .62rem; color: #f7c948; letter-spacing: .1em; text-transform: uppercase; margin-bottom: .5rem; }
        .proj-icon  { font-size: 1.6rem; display: block; margin-bottom: .6rem; }
        .proj-title { font-family: var(--serif); font-size: 1.05rem; font-weight: 600; color: #a0e8e8; margin-bottom: .6rem; line-height: 1.3; }
        .proj-desc  { font-family: var(--sans); font-size: .79rem; color: rgba(180,230,230,0.6); line-height: 1.65; margin-bottom: 1rem; }
        .proj-tools { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: 1rem; }
        .proj-tool  { font-family: var(--mono); font-size: .62rem; padding: .2rem .6rem; border-radius: 99px; background: rgba(60,200,200,0.12); border: 1px solid rgba(60,200,200,0.25); color: #80d8d8; }
        .proj-outcomes { list-style: none; }
        .proj-outcomes li { font-family: var(--sans); font-size: .76rem; color: rgba(180,230,230,0.55); padding: .15rem 0 .15rem 1rem; position: relative; line-height: 1.5; }
        .proj-outcomes li::before { content: '✓'; position: absolute; left: 0; color: #f7c948; font-size: .7rem; }

        /* Memberships */
        .memb-row { display: flex; flex-wrap: wrap; gap: .65rem; }
        .memb-tag { font-family: var(--sans); font-size: .78rem; padding: .4rem 1.1rem; border-radius: 99px; border: 1px solid rgba(247,201,72,0.3); background: rgba(247,201,72,0.08); color: #f7c948; font-weight: 500; }

        footer { text-align: center; padding: 1.5rem; background: #050508; color: rgba(245,242,236,.25); font-family: var(--mono); font-size: .7rem; letter-spacing: .08em; }

        @media (max-width: 900px) {
          .skills-soft-grid, .skills-tech-grid, .svc-grid, .proj-grid { grid-template-columns: 1fr 1fr; }
          .process-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }
        @media (max-width: 768px) {
          nav { padding: .9rem 1.25rem; }
          .nav-links { display: none; }
          .nav-links.open { display: flex; flex-direction: column; position: fixed; top: 57px; left: 0; right: 0; background: rgba(250,248,244,.97); border-bottom: 1px solid var(--border); padding: 1.25rem 1.5rem; gap: 1rem; z-index: 199; }
          .hamburger { display: flex; }
          section { padding: 4rem 1.25rem !important; }
          .about-grid, .edu-grid, .conf-grid { grid-template-columns: 1fr; gap: 2rem; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .interests-grid, .svc-grid, .proj-grid, .skills-soft-grid, .skills-tech-grid { grid-template-columns: 1fr; }
          .stat-cards { grid-template-columns: 1fr 1fr; }
          .hero-name { font-size: 2.4rem; }
        }
        @media (max-width: 480px) {
          .stat-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Victor LW</button>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV.map((n) => (
            <li key={n}><button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>{n}</button></li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="hero">
        <Reveal>
          <div style={{ fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".25em", color: "rgba(247,201,72,0.8)", marginBottom: ".8rem", textTransform: "uppercase" }}>Hello, I am</div>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="hero-name">Victor Lumumba Wandera</h1>
        </Reveal>
        <Reveal delay={120}>
          <div className="hero-role-wrap">
            <span className="hero-role-text">{display}</span>
            <span className="hero-cursor" style={{ opacity: showCursor ? 1 : 0 }} />
          </div>
        </Reveal>
        <Reveal delay={220}>
          <p className="hero-bio">
            A dedicated statistician applying rigorous quantitative analyses to generate actionable, data-driven insights that support informed decision-making in health, agriculture, and economics.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo("Publications")}>View Research</button>
            <button className="btn-outline" onClick={() => scrollTo("Services")}>Hire Me</button>
            <button className="btn-outline" onClick={() => scrollTo("Contact")}>Get In Touch</button>
          </div>
        </Reveal>
        <Reveal delay={420}>
          <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", margin: "1.5rem 0", position: "relative", zIndex: 1 }}>
            {[["5+","Years Experience"],["8+","Publications"],["50+","Students Mentored"]].map(([n,l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 600, color: "#f7c948", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: "rgba(220,215,205,0.55)", marginTop: ".3rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={500}>
          <div className="social-row">
            <a className="social-icon" href="mailto:lumumbavictor172@gmail.com" title="Email">✉</a>
            <a className="social-icon" href="https://beyonddataanalytics.online" target="_blank" rel="noopener noreferrer" title="Website">🌐</a>
            <a className="social-icon" href="tel:+254706038599" title="Phone">☎</a>
            <a className="social-icon" href="https://github.com/Lumumba1992" target="_blank" rel="noopener noreferrer" title="GitHub">⌨</a>
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
                <img src="https://res.cloudinary.com/dacpiss4b/image/upload/v1772514964/main_image_wjyuuq.jpg" alt="Victor Lumumba Wandera" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </Reveal>
            <Reveal dir="right">
              <div className="about-text">
                <h3>Hi! I&apos;m Victor Lumumba Wandera</h3>
                <p style={{ fontFamily: "var(--mono)", fontSize: ".72rem", color: "var(--gold)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".75rem" }}>MSc Applied Statistics · Tutorial Fellow</p>
                <p>
                  A statistician with expertise in machine learning, predictive modeling, and research methodology, committed to generating actionable insights for health, agriculture, and economic development.
                </p>
                <p>
                  <strong style={{ color: "var(--accent)" }}>My Mission: </strong>
                  To apply rigorous quantitative and qualitative analyses to generate actionable, data-driven insights that support informed decision-making. Committed to methodological excellence, I uncover meaningful patterns to advance innovation, efficiency, and profitability while fostering a culture of evidence-based excellence.
                </p>
                <p>
                  <strong style={{ color: "var(--accent)" }}>My Vision: </strong>
                  To excel as a statistician and machine learning specialist by pioneering innovative, data-driven strategies that enhance organizational profitability and optimize resources — driving informed decision-making through rigorous, evidence-based analysis.
                </p>
                <div className="stat-cards">
                  {[["8+","Publications"],["5+","Yrs Experience"],["50+","Students Mentored"]].map(([n,l]) => (
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
                <p className="edu-school">Chuka University, Kenya</p>
                <span className="edu-year">📅 May 2023 – Nov 2025</span>
                <p className="edu-desc">Thesis: <em>Machine Learning Based Prediction of Psychological Mental Health Distress Among University Students in Tharaka Nithi County.</em><br/>Supervisors: Prof. Dennis K. Muriithi, PhD &amp; Dr. Monicah Oundo</p>
              </div>
            </Reveal>
            <Reveal dir="right" delay={80}>
              <div className="edu-card">
                <div className="edu-icon">🏅</div>
                <p className="edu-degree">BSc Economics &amp; Statistics</p>
                <p className="edu-school">Chuka University — 2nd Class Hons. (Upper Division)</p>
                <span className="edu-year">📅 Sep 2016 – Dec 2020</span>
                <p className="edu-desc">Project: <em>Effects of Taxation on Private Investment in Kenya.</em><br/>Supervisor: Dr. Elizabeth Njiru<br/><br/>Solid grounding in econometrics, statistical theory, probability, and research methods forming the bedrock for postgraduate and applied research work.</p>
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
                {MEMBERSHIPS.map((m) => <span className="tag" key={m.name}>{m.name} — {m.num}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Work Experience</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title" style={{ color: "#fdf3e0" }}>Professional <em>Journey</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub" style={{ color: "rgba(240,220,180,0.6)" }}>Teaching, training, and research experience across academia and data analytics.</p></Reveal>
          <div className="exp-timeline">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i * 80}>
                <div className="exp-item">
                  <div className="exp-card">
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: ".75rem" }}>
                      <span style={{ fontSize: "1.5rem" }}>{e.icon}</span>
                      <div>
                        <p className="exp-role">{e.role}</p>
                        <p className="exp-org">{e.org}</p>
                        <p className="exp-period">{e.period}</p>
                      </div>
                    </div>
                    <ul className="exp-points">
                      {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
                    </ul>
                    <div className="exp-tags">
                      {e.tags.map(t => <span className="exp-tag" key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Conferences */}
          <Reveal delay={100}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 300, color: "#fdf3e0", textAlign: "center", margin: "3rem 0 .5rem" }}>Conferences &amp; <em>Workshops</em></h3>
          </Reveal>
          <div className="conf-grid">
            {CONFERENCES.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="conf-card">
                  <p className="conf-date">{c.date}</p>
                  <p className="conf-name">{c.name}</p>
                  <p className="conf-org">{c.org}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Skills &amp; Expertise</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Technical <em>Proficiency</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Comprehensive expertise in statistical software, machine learning, and cutting-edge data science methodologies.</p></Reveal>

          <Reveal>
            <h3 style={{ fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#f7c948", marginBottom: "1.5rem", paddingBottom: ".5rem", borderBottom: "1px solid rgba(200,240,210,0.15)" }}>Software Proficiency</h3>
          </Reveal>
          <div className="skills-soft-grid">
            {SKILLS_SOFT.map((s, i) => (
              <Reveal key={s.name} delay={i * 40}>
                <SkillBar {...s} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h3 style={{ fontFamily: "var(--mono)", fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#f7c948", margin: "2.5rem 0 1.5rem", paddingBottom: ".5rem", borderBottom: "1px solid rgba(200,240,210,0.15)" }}>Technical Expertise</h3>
          </Reveal>
          <div className="skills-tech-grid">
            {SKILLS_TECH.map((s, i) => (
              <Reveal key={s.cat} delay={i * 60}>
                <div className="tech-card">
                  <p className="tech-cat">{s.cat}</p>
                  <div className="tech-tags">
                    {s.tags.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3.5rem 0 .5rem", fontSize: "1.6rem", fontWeight: 300, color: "#e8f5e9" }}>Research <em>Interests</em></h3>
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

      {/* SERVICES */}
      <section id="services">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Services</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title" style={{ color: "#ece8ff" }}>What I <em>Offer</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub" style={{ color: "rgba(200,195,240,0.6)" }}>Professional statistical services designed to empower your research, enhance your analytical capabilities, and drive data-driven success.</p></Reveal>

          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="svc-card">
                  <span className="svc-icon">{s.icon}</span>
                  <p className="svc-title">{s.title}</p>
                  <p className="svc-desc">{s.desc}</p>
                  <ul className="svc-points">
                    {s.points.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3.5rem 0 .5rem", fontSize: "1.6rem", fontWeight: 300, color: "#ece8ff" }}>My Working <em>Process</em></h3>
          </Reveal>
          <div className="process-grid">
            {[
              { n: "01", title: "Planning & Strategy", desc: "Understanding your objectives, analyzing requirements, and developing a comprehensive strategy tailored to your specific needs." },
              { n: "02", title: "Implementation & Analysis", desc: "Executing the planned methodology using advanced statistical techniques and cutting-edge tools to deliver accurate results." },
              { n: "03", title: "Delivery & Support", desc: "Providing comprehensive reports, actionable insights, and ongoing support to ensure successful implementation of results." },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="process-step">
                  <div className="process-num">{p.n}</div>
                  <p className="process-title">{p.title}</p>
                  <p className="process-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div style={{ textAlign: "center", marginTop: "2rem", padding: "2rem", background: "rgba(130,100,255,0.08)", border: "1px solid rgba(130,100,255,0.2)", borderRadius: "12px" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 300, color: "#ece8ff", marginBottom: ".75rem" }}>Ready to Get Started?</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: ".87rem", color: "rgba(200,195,240,0.65)", marginBottom: "1.25rem", maxWidth: "480px", margin: "0 auto 1.25rem" }}>Let&apos;s discuss how my statistical expertise can help you achieve your research and analytical goals.</p>
              <button className="btn-primary" onClick={() => scrollTo("Contact")}>Get In Touch →</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Research</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Peer-Reviewed <em>Publications</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Contributions to international journals in AI, statistics, public health, and finance.</p></Reveal>
          <div>
            {PUBLICATIONS.map(({ title, authors, journal, year, vol, doi }, i) => (
              <Reveal key={i} delay={i * 55}>
                <div className="pub-item">
                  <span className="pub-num">[{i + 1}]</span>
                  <span className="pub-year">{year}</span>
                  <div>
                    <p className="pub-title">{title}</p>
                    <p className="pub-authors">{authors}</p>
                    <p className="pub-journal">{journal}</p>
                    {vol && <p className="pub-vol">{vol}</p>}
                    {doi && <a className="pub-doi" href={doi} target="_blank" rel="noopener noreferrer">{doi}</a>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Research Areas */}
          <Reveal delay={80}>
            <h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3rem 0 1.5rem", fontSize: "1.5rem", fontWeight: 300, color: "#f5e8ff" }}>Research <em>Areas</em></h3>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { area: "Machine Learning & XAI", count: 6, level: "High Impact" },
              { area: "Health Analytics & Biostatistics", count: 5, level: "High Impact" },
              { area: "Time Series & Forecasting", count: 4, level: "High Impact" },
              { area: "Survival Analysis", count: 3, level: "Medium Impact" },
              { area: "Financial Econometrics", count: 2, level: "Medium Impact" },
            ].map((r, i) => (
              <Reveal key={r.area} delay={i * 60}>
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,150,220,0.2)", borderRadius: "10px", padding: "1.2rem", textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 600, color: "#f7c948", lineHeight: 1 }}>{r.count}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".78rem", color: "#e8d0ff", margin: ".3rem 0 .2rem" }}>{r.area}</p>
                  <span style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: r.level === "High Impact" ? "#a8e6c0" : "rgba(200,170,230,0.5)", letterSpacing: ".08em" }}>{r.level}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
              {[["⌨ GitHub","https://github.com/Lumumba1992"],["📖 Google Scholar","#"],["🔬 ResearchGate","#"]].map(([label, href]) => (
                <a key={label as string} href={href as string} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--sans)", fontSize: ".8rem", padding: ".6rem 1.3rem", border: "1px solid rgba(200,150,220,0.3)", borderRadius: "6px", color: "#c8b8ff", textDecoration: "none", background: "rgba(200,150,220,0.07)", transition: "border-color .2s, background .2s" }}>
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="sec-inner">
          <Reveal><p className="sec-label">Research &amp; Projects</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title" style={{ color: "#e0fafa" }}>Featured <em>Projects</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub" style={{ color: "rgba(180,230,230,0.6)" }}>Peer-reviewed research and analytical projects in machine learning, health analytics, and statistical modeling.</p></Reveal>
          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="proj-card">
                  <p className="proj-tag">{p.tag}</p>
                  <span className="proj-icon">{p.icon}</span>
                  <p className="proj-title">{p.title}</p>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tools">
                    {p.tools.map(t => <span className="proj-tool" key={t}>{t}</span>)}
                  </div>
                  <ul className="proj-outcomes">
                    {p.outcomes.map(o => <li key={o}>{o}</li>)}
                  </ul>
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

          {/* Quick guarantees */}
          <Reveal delay={100}>
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
              {[["24h","Response Time"],["100%","Confidentiality"],["24/7","Availability"]].map(([n,l]) => (
                <div key={l} style={{ textAlign: "center", padding: ".8rem 1.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,147,58,0.2)", borderRadius: "8px" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", fontWeight: 600, color: "var(--gold)" }}>{n}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <Reveal dir="left">
              <div>
                {[
                  { href: "mailto:lumumbavictor172@gmail.com", icon: "✉", lbl: "Primary Email", val: "lumumbavictor172@gmail.com" },
                  { href: "mailto:wanderavictor2@yahoo.com",   icon: "✉", lbl: "Alt Email",     val: "wanderavictor2@yahoo.com" },
                  { href: "tel:+254706038599",                 icon: "☎", lbl: "Phone",         val: "+254 706 038 599" },
                  { href: "#",                                 icon: "📍", lbl: "Location",      val: "Chuka, Kenya (Remote-Friendly)" },
                  { href: "https://beyonddataanalytics.online", icon: "🌐", lbl: "Website",     val: "beyonddataanalytics.online" },
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
                  <p className="c-lbl" style={{ marginBottom: ".75rem" }}>Connect with me</p>
                  {[
                    ["⌨ GitHub", "https://github.com/Lumumba1992"],
                    ["💼 LinkedIn", "#"],
                    ["📖 Google Scholar", "#"],
                    ["🔬 ResearchGate", "#"],
                  ].map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: ".5rem", fontFamily: "var(--sans)", fontSize: ".83rem", color: "rgba(245,242,236,.65)", marginBottom: ".5rem", textDecoration: "none", transition: "color .2s" }}>
                      <span style={{ color: "var(--gold)" }}>→</span> {label}
                    </a>
                  ))}
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <p className="c-lbl" style={{ marginBottom: ".75rem" }}>Available for</p>
                  {["Research collaborations","Consulting opportunities","Academic partnerships","Data analytics projects","Statistical tutoring"].map((item) => (
                    <p key={item} style={{ fontFamily: "var(--sans)", fontSize: ".85rem", color: "rgba(245,242,236,.65)", marginBottom: ".5rem" }}>→ {item}</p>
                  ))}
                </div>

                <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(200,147,58,0.08)", border: "1px solid rgba(200,147,58,0.2)", borderRadius: "8px" }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: ".65rem", color: "var(--gold)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".4rem" }}>Quick Response Guarantee</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".8rem", color: "rgba(245,242,236,.55)", lineHeight: 1.6 }}>I typically respond to all inquiries within 24 hours. For urgent needs, mention <strong style={{ color: "var(--gold)" }}>"URGENT"</strong> in your subject.</p>
                </div>
              </div>
            </Reveal>
            <Reveal dir="right">
              <div style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}>
                {["Full Name","Email Address","Subject"].map((ph) => (
                  <input key={ph} type={ph === "Email Address" ? "email" : "text"} placeholder={ph} className="f-input" />
                ))}
                <textarea placeholder="Tell me about your project or how I can help you…" rows={5} className="f-input" style={{ resize: "vertical" }} />
                <button className="btn-primary" style={{ width: "fit-content" }}>Send Message →</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        © {new Date().getFullYear()} Victor Lumumba Wandera · All rights reserved · beyonddataanalytics.online
        <br />
        <span style={{ opacity: .5 }}>Statistician · Research Officer · Data Analyst · ML Enthusiast</span>
      </footer>
    </div>
  );
}