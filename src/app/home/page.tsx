"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

const NAV = ["About", "Education", "Experience", "Skills", "Services", "Publications", "Projects", "Contact"];
const ROLES = ["Statistician","Tutorial Fellow","Data Analyst","ML Researcher","Research Officer"];

const PUBLICATIONS = [
  { title: "A Comparative Evaluation of Kaplan-Meier, Cox Proportional Hazards, and Random Survival Forests for Neonatal Mortality Prediction", authors: "Lumumba, V., Muriithi, D., Langat, A., Wanyama, M., Njoroge, E., Mutinda, J., Waka, O., & Mwebesa, E.", journal: "Computational Biology and Bioinformatics", year: 2025, vol: "Vol. 13(2), 42–59", doi: "https://doi.org/10.11648/j.cbb.20251302.11" },
  { title: "Evaluating Performance of Selected Single Classifiers with XAI in Prediction of Mental Health Distress Among University Students", authors: "Lumumba, V. W., Muriithi, D. K., Oundo, M.", journal: "American Journal of Artificial Intelligence", year: 2025, vol: "Vol. 9(2), 133–144", doi: "https://doi.org/10.11648/j.ajai.20250902.15" },
  { title: "An Explainable AI Framework for Neonatal Mortality Risk Prediction in Kenya: Enhancing Clinical Decisions with Machine Learning", authors: "Lumumba, V. W., Muriithi, D., Njoroge, E., Langat, A., Mwebesa, E., & Wanyama, M.", journal: "Biomedical Statistics and Informatics", year: 2025, vol: "Vol. 10(3), 64–83", doi: "https://doi.org/10.11648/j.bsi.20251003.12" },
  { title: "Explainable Artificial Intelligence Models for Predicting Malaria Risk in Kenya", authors: "Muriithi, D. K., Lumumba, V. W., Awe, O. O., & Muriithi, D. M.", journal: "European Journal of Artificial Intelligence and Machine Learning", year: 2025, vol: "Vol. 4(1), 1–8", doi: "https://doi.org/10.24018/ejai.2025.4.1.47" },
  { title: "Evaluating the Performance of Ensemble and Single Classifiers with Explainable Artificial Intelligence (XAI) on Hypertension Risk Prediction", authors: "Lumumba, V. W., Wanjuki, T. M., & Njoroge, E. W.", journal: "Computational Intelligence and Machine Learning", year: 2025, vol: "Vol. 6(1)", doi: "https://doi.org/10.36647/ciml/06.01.a004" },
  { title: "A Machine Learning-Based Prediction of Malaria Occurrence in Kenya", authors: "Muriithi, D., Lumumba, V. W., Okongo, M.", journal: "American Journal of Theoretical and Applied Statistics", year: 2024, vol: "Vol. 13(4), 65–72", doi: "https://doi.org/10.11648/j.ajtas.20241304.11" },
  { title: "Comparative Analysis of GARCH-Based Volatility Models: A Case of Nairobi Security Market PLC", authors: "Wanjuki, T. M., Lumumba, V. W., Kimtai, E. K., Mbaluka, M. K., & Njoroge, E. W.", journal: "European Journal of Mathematics and Statistics", year: 2024, vol: "Vol. 5(4), 1–18", doi: "https://doi.org/10.24018/ejmath.2024.5.4.310" },
];

const SKILLS_SOFT = [
  { name: "R", level: 98 }, { name: "Python", level: 92 }, { name: "SPSS", level: 95 },
  { name: "Stata", level: 90 }, { name: "SAS", level: 85 }, { name: "EViews", level: 88 },
  { name: "Excel", level: 95 }, { name: "Minitab", level: 85 }, { name: "Gretl", level: 82 },
];

const SKILLS_TECH = [
  { cat: "Predictive Modeling & ML", tags: ["Machine Learning","Deep Learning","Classification","Clustering","Neural Networks","XAI/Explainable AI"], color: "#e53e3e", bg: "#fff5f5", border: "#feb2b2" },
  { cat: "Statistical Inference", tags: ["Hypothesis Testing","Regression Analysis","ANOVA","Survival Analysis","Experimental Design"], color: "#d69e2e", bg: "#fffff0", border: "#fbd38d" },
  { cat: "Time Series & Spatial", tags: ["Time Series Forecasting","Spatiotemporal Modeling","ARIMA/GARCH","Seasonal Analysis","Trend Detection"], color: "#38a169", bg: "#f0fff4", border: "#9ae6b4" },
  { cat: "Data Science & Big Data", tags: ["Data Integration","Big Data Analytics","ETL Processes","Data Mining","Feature Engineering"], color: "#3182ce", bg: "#ebf8ff", border: "#90cdf4" },
  { cat: "Research & Communication", tags: ["Reproducible Research","Scientific Computing","Data Visualization","Academic Writing"], color: "#805ad5", bg: "#faf5ff", border: "#d6bcfa" },
  { cat: "Domain Applications", tags: ["Health Analytics","Malaria Forecasting","Mental Health Research","Agricultural Statistics","Economic Modeling"], color: "#dd6b20", bg: "#fffaf0", border: "#fbd38d" },
];

const EXPERIENCE = [
  { role: "Part-Time Assistant Lecturer", org: "Chuka University, Dept. of Physical Sciences", period: "Sep 2025 – Present", icon: "🎓", color: "#e53e3e", bg: "#fff5f5", border: "#feb2b2", points: ["Taught MATH 100: General Mathematics, MATH 121: Calculus I, MATH 124: Geometry and Linear Algebra, MATH 141: Introductory Statistics and MATH 242: Probability and Statistics II", "Developed curriculum-aligned assessments and instructional materials"], tags: ["University Teaching","Curriculum Development","Student Assessment","Calculus","Statistics"] },
  { role: "Data Analyst & Trainer", org: "Center for Data Analytics and Modeling (CDAM), Chuka University", period: "Aug 2024 – Present", icon: "📊", color: "#3182ce", bg: "#ebf8ff", border: "#90cdf4", points: ["Mentored undergraduate and postgraduate students on capstone projects and theses", "Led workshops on reproducible research; focus areas: survival analysis, predictive modeling, and time series forecasting"], tags: ["Student Mentorship","Workshop Facilitation","Reproducible Research","Predictive Modeling"] },
  { role: "Mathematics & Economics Tutor", org: "Acetiyo Academic Consultancy and Tutoring Company, Kenya", period: "Jan 2021 – Present", icon: "📐", color: "#38a169", bg: "#f0fff4", border: "#9ae6b4", points: ["Taught Linear Algebra I & II, Geometry, and Economics to undergraduate and pre-university students", "Provided individualized tutoring, exam preparation, and concept-focused problem-solving support across mathematics and economics curricula"], tags: ["Linear Algebra","Geometry","Economics","Exam Preparation","Individualized Tutoring"] },
  { role: "Trainer in Statistical Analysis and Modeling", org: "Eco-Stat Club, Chuka University", period: "Jan 2021 – Apr 2023", icon: "📈", color: "#805ad5", bg: "#faf5ff", border: "#d6bcfa", points: ["Delivered over two years of instruction in applied statistics and data analysis", "Taught R, Python, SPSS, STATA, SAS, and EViews using real-world datasets"], tags: ["Software Training","Hands-on Sessions","Customized Learning"] },
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
  { icon: "📚", title: "Statistical Tutoring", desc: "Comprehensive tutoring in statistics, econometrics, and data analysis for students and professionals.", color: "#e53e3e", bg: "#fff5f5", border: "#fed7d7", points: ["One-on-one tutoring sessions","Group workshops and seminars","Statistical software training","Exam preparation and support","Custom learning materials"] },
  { icon: "📋", title: "Data Analysis Plans", desc: "Customized data analysis strategies tailored to your research objectives.", color: "#d69e2e", bg: "#fffff0", border: "#fbd38d", points: ["Statistical methodology design","Sample size calculations","Data collection protocols","Analysis framework development","Quality assurance procedures"] },
  { icon: "🎓", title: "Thesis & Project Mentorship", desc: "Expert guidance for academic research projects and thesis development.", color: "#38a169", bg: "#f0fff4", border: "#9ae6b4", points: ["Research design consultation","Statistical analysis guidance","Methodology review","Results interpretation","Academic writing support"] },
  { icon: "🏛️", title: "Workshop Facilitation", desc: "Professional workshops on statistical methods and data science.", color: "#3182ce", bg: "#ebf8ff", border: "#90cdf4", points: ["Statistical software training","Data science workshops","Machine learning seminars","Research methodology training","Custom corporate training"] },
  { icon: "🔬", title: "Research Consulting", desc: "Comprehensive research consulting from design to publication-ready results.", color: "#805ad5", bg: "#faf5ff", border: "#d6bcfa", points: ["Research proposal development","Statistical analysis execution","Data visualization and reporting","Peer review support","Publication assistance"] },
  { icon: "✅", title: "Feedback & Assessment", desc: "Professional review and assessment of statistical analyses and reports.", color: "#dd6b20", bg: "#fffaf0", border: "#fbd38d", points: ["Statistical analysis review","Methodology assessment","Report quality evaluation","Improvement recommendations","Best practices guidance"] },
];

const PROJECTS = [
  { icon: "🧠", tag: "MSc Thesis", title: "Mental Health Distress Prediction", desc: "ML-based prediction of psychological mental health distress using interpretable models with XAI for transparency.", tools: ["R","Python","Random Forest","XGBoost","SHAP","LIME"], outcomes: ["Identified key risk factors","Developed screening protocols","Published in peer-reviewed journals"], color: "#e53e3e", bg: "#fff5f5", border: "#feb2b2" },
  { icon: "🦟", tag: "Health Analytics", title: "Malaria Forecasting with ML", desc: "Advanced predictive modeling for malaria outbreak forecasting in Kenya using ML and explainable AI frameworks.", tools: ["R","Python","Machine Learning","XAI","Time Series"], outcomes: ["Developed risk prediction models","Implemented XAI for interpretability","Published multiple papers"], color: "#38a169", bg: "#f0fff4", border: "#9ae6b4" },
  { icon: "👶", tag: "Biostatistics", title: "Neonatal Mortality Risk Prediction", desc: "Comparative evaluation of survival analysis methods and ML for predicting neonatal mortality in Kenya.", tools: ["R","Kaplan-Meier","Cox PH","Random Survival Forests","XAI"], outcomes: ["Enhanced clinical decision-making","Compared traditional and ML approaches","Framework for low-resource settings"], color: "#3182ce", bg: "#ebf8ff", border: "#90cdf4" },
  { icon: "💊", tag: "Health Informatics", title: "Hypertension Risk Prediction", desc: "Evaluating ensemble and single classifiers with Explainable AI for hypertension risk prediction.", tools: ["Python","Ensemble Methods","SHAP","Feature Importance"], outcomes: ["Identified risk factors","Transparent model explanations","Clinical applicability framework"], color: "#d69e2e", bg: "#fffff0", border: "#fbd38d" },
  { icon: "📉", tag: "Financial Analytics", title: "Market Volatility Analysis", desc: "Comparative analysis of GARCH-based volatility models for the Nairobi Securities Exchange.", tools: ["R","EViews","GARCH","EGARCH","Time Series"], outcomes: ["Volatility modeling for NSE","Risk assessment frameworks","Investment decision support"], color: "#805ad5", bg: "#faf5ff", border: "#d6bcfa" },
  { icon: "📡", tag: "Training & Mentorship", title: "Tidy Time Series Training", desc: "Led workshops on tidy time series analysis and forecasting in R as part of the Forecasting for Social Good initiative.", tools: ["R","tidyverse","fable","tsibble","Forecasting"], outcomes: ["Trained students and researchers","Reproducible research workflows","Community capacity building"], color: "#dd6b20", bg: "#fffaf0", border: "#fbd38d" },
];

const MEMBERSHIPS = [
  { name: "Statistical Society of Kenya (SSK)", num: "Member No. 752493" },
  { name: "International Biometrics Society, Kenya Chapter", num: "Member No. 1508813" },
  { name: "Applied Malaria Modeling Network (AMMNet)", num: "Kenya Chapter" },
];

const INTERESTS = [
  { icon: "📊", title: "Applied Statistical Modeling & ML", desc: "Developing interpretable ML models to predict malaria incidence and psychological distress.", color: "#e53e3e", bg: "#fff5f5", border: "#feb2b2" },
  { icon: "🌍", title: "ML/DL for Socioeconomic Challenges", desc: "Extending ML and deep learning to climate change, agricultural productivity, and financial modeling.", color: "#38a169", bg: "#f0fff4", border: "#9ae6b4" },
  { icon: "🧪", title: "Innovative Experimental Design", desc: "Optimal experimental designs, spatiotemporal modeling, and integration of big data sources.", color: "#3182ce", bg: "#ebf8ff", border: "#90cdf4" },
  { icon: "🏥", title: "Health Analytics", desc: "Evidence-based research for health outcomes, malaria forecasting, and neonatal mortality prediction.", color: "#d69e2e", bg: "#fffff0", border: "#fbd38d" },
  { icon: "💹", title: "Financial Econometrics", desc: "Modelling volatility, GARCH-based models, and forecasting in capital markets including the NSE.", color: "#805ad5", bg: "#faf5ff", border: "#d6bcfa" },
  { icon: "📚", title: "Teaching & Mentoring", desc: "Sharing statistical and data science knowledge with the next generation of researchers.", color: "#dd6b20", bg: "#fffaf0", border: "#fbd38d" },
];

const STAGE_IMGS = [
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570330/WhatsApp_Image_2026-03-02_at_4.17.28_PM_wkcadv.jpg", caption: "Conference Presentation" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570326/WhatsApp_Image_2026-03-02_at_4.17.24_PM_1_hfempc.jpg", caption: "Academic Keynote" },
];
const CDAM_IMGS = [
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570330/WhatsApp_Image_2026-03-02_at_4.17.23_PM_miakfq.jpg", caption: "CDAM Team" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570329/WhatsApp_Image_2026-03-02_at_4.17.23_PM_2_cnygck.jpg", caption: "Research Collaboration" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570329/WhatsApp_Image_2026-03-02_at_4.17.27_PM_ielxnj.jpg", caption: "Data Analytics Team" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570329/WhatsApp_Image_2026-03-02_at_4.17.26_PM_1_xkzgp1.jpg", caption: "CDAM Workshop" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570329/WhatsApp_Image_2026-03-02_at_4.17.26_PM_2_olpxqi.jpg", caption: "Research Meeting" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570327/WhatsApp_Image_2026-03-02_at_4.17.25_PM_2_hne4so.jpg", caption: "CDAM Members" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570326/WhatsApp_Image_2026-03-02_at_4.17.24_PM_2_geljsz.jpg", caption: "Analytics Session" },
];
const LAB_IMGS = [
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570328/WhatsApp_Image_2026-03-02_at_4.17.24_PM_uammec.jpg", caption: "Statistical Computing Lab" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570327/WhatsApp_Image_2026-03-02_at_4.17.25_PM_ihhisp.jpg", caption: "R & Python Training" },
  { src: "https://res.cloudinary.com/dacpiss4b/image/upload/v1772570328/WhatsApp_Image_2026-03-02_at_4.17.25_PM_1_jsnmzg.jpg", caption: "Data Analysis Workshop" },
];
const PROFILE_LINKS = [
  { label: "GitHub", href: "https://github.com/Lumumba1992", iconSrc: "/github.ico" },
  { label: "LinkedIn", href: "#", iconSrc: "/linkedin.ico" },
  { label: "Google Scholar", href: "#", iconSrc: "/google_scholar.ico" },
  { label: "ResearchGate", href: "#", iconSrc: "/researchgate.ico" },
];

function useTypewriter(words: string[]) {
  const [display, setDisplay] = useState(""); const [wordIdx, setWordIdx] = useState(0); const [charIdx, setCharIdx] = useState(0); const [deleting, setDeleting] = useState(false); const [showCursor, setShowCursor] = useState(true);
  useEffect(() => { const t = setInterval(() => setShowCursor(v => !v), 530); return () => clearInterval(t); }, []);
  useEffect(() => {
    const word = words[wordIdx]; let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx <= word.length) timeout = setTimeout(() => { setDisplay(word.slice(0, charIdx)); setCharIdx(c => c + 1); }, 80);
    else if (!deleting && charIdx > word.length) timeout = setTimeout(() => setDeleting(true), 1600);
    else if (deleting && charIdx >= 0) timeout = setTimeout(() => { setDisplay(word.slice(0, charIdx)); setCharIdx(c => c - 1); }, 45);
    else { setDeleting(false); setWordIdx(i => (i + 1) % words.length); setCharIdx(0); }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);
  return { display, showCursor };
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold }); if (ref.current) obs.observe(ref.current); return () => obs.disconnect(); }, [threshold]);
  return { ref, visible };
}
function Reveal({ children, delay = 0, dir = "up" }: { children: ReactNode; delay?: number; dir?: "up"|"left"|"right" }) {
  const { ref, visible } = useReveal();
  const t = dir === "left" ? "translateX(-28px)" : dir === "right" ? "translateX(28px)" : "translateY(22px)";
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : t, transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>{children}</div>;
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".4rem" }}>
        <span style={{ fontFamily: "var(--sans)", fontSize: ".85rem", fontWeight: 700, color: "#1a202c" }}>{name}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: ".72rem", color, fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: "7px", background: "#e2e8f0", borderRadius: "99px" }}>
        <div style={{ height: "100%", borderRadius: "99px", background: `linear-gradient(90deg, ${color}, ${color}cc)`, width: visible ? `${level}%` : "0%", transition: "width 1.2s cubic-bezier(.4,0,.2,1) 150ms", boxShadow: `0 2px 8px ${color}55` }} />
      </div>
    </div>
  );
}

function Lightbox({ src, caption, onClose }: { src: string; caption: string; onClose: () => void }) {
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", h); document.body.style.overflow = "hidden"; return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; }; }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(255,255,255,0.94)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", backdropFilter: "blur(20px)", cursor: "zoom-out" }}>
      <div onClick={e => e.stopPropagation()} style={{ maxWidth: "880px", width: "100%", position: "relative" }}>
        <img src={src} alt={caption} style={{ width: "100%", borderRadius: "16px", boxShadow: "0 30px 80px rgba(0,0,0,0.15)", display: "block" }} />
        <p style={{ fontFamily: "var(--mono)", fontSize: ".7rem", color: "#718096", textAlign: "center", marginTop: ".8rem" }}>{caption} · click anywhere to close</p>
        <button onClick={onClose} style={{ position: "absolute", top: "-1rem", right: "-1rem", width: "34px", height: "34px", borderRadius: "50%", background: "#e53e3e", border: "none", color: "#fff", cursor: "pointer", fontSize: "1.1rem", fontWeight: 700 }}>×</button>
      </div>
    </div>
  );
}

function SlideStrip({ images }: { images: { src: string; caption: string }[] }) {
  const [light, setLight] = useState<{ src: string; caption: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 }); if (containerRef.current) obs.observe(containerRef.current); return () => obs.disconnect(); }, []);
  return (
    <>
      <div ref={containerRef} style={{ display: "grid", gridTemplateColumns: `repeat(${images.length}, 1fr)`, gap: "1.1rem" }}>
        {images.map((img, i) => (
          <div key={i} onClick={() => setLight(img)} style={{ position: "relative", borderRadius: "14px", overflow: "hidden", aspectRatio: "4/3", cursor: "zoom-in", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : `translateX(${i % 2 === 0 ? "-50px" : "50px"})`, transition: `opacity 0.6s ease ${i * 160}ms, transform 0.6s ease ${i * 160}ms`, boxShadow: "0 8px 30px rgba(229,62,62,0.15)", border: "3px solid #fed7d7" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.03) translateY(-4px)"; (e.currentTarget.querySelector(".sov") as HTMLElement).style.opacity = "1"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; (e.currentTarget.querySelector(".sov") as HTMLElement).style.opacity = "0"; }}>
            <img src={img.src} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="sov" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(229,62,62,0.88) 0%, transparent 55%)", opacity: 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1rem" }}>
              <span style={{ fontFamily: "var(--sans)", fontSize: ".85rem", color: "#fff", fontWeight: 700 }}>{img.caption}</span>
            </div>
          </div>
        ))}
      </div>
      {light && <Lightbox src={light.src} caption={light.caption} onClose={() => setLight(null)} />}
    </>
  );
}

function CascadeGrid({ images, cols = 4 }: { images: { src: string; caption: string }[]; cols?: number }) {
  const [light, setLight] = useState<{ src: string; caption: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null); const [visible, setVisible] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 }); if (containerRef.current) obs.observe(containerRef.current); return () => obs.disconnect(); }, []);
  const tilts = [-2, 1.5, -1, 2, -1.5, 2.5, -2];
  return (
    <>
      <div ref={containerRef} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "0.75rem" }}>
        {images.map((img, i) => (
          <div key={i} onClick={() => setLight(img)} style={{ position: "relative", borderRadius: "10px", overflow: "hidden", aspectRatio: "1/1", cursor: "zoom-in", opacity: visible ? 1 : 0, transform: visible ? "translateY(0) rotate(0deg) scale(1)" : `translateY(40px) rotate(${tilts[i % tilts.length]}deg) scale(0.85)`, transition: `opacity 0.55s ease ${i * 90}ms, transform 0.65s cubic-bezier(.34,1.56,.64,1) ${i * 90}ms`, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", border: "2px solid #90cdf4" }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1.06) translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.zIndex = "10"; (e.currentTarget.querySelector(".gov") as HTMLElement).style.opacity = "1"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; (e.currentTarget as HTMLDivElement).style.zIndex = "1"; (e.currentTarget.querySelector(".gov") as HTMLElement).style.opacity = "0"; }}>
            <img src={img.src} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <div className="gov" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(49,130,206,0.85) 0%, transparent 55%)", opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: ".6rem" }}>
              <span style={{ fontFamily: "var(--sans)", fontSize: ".68rem", color: "#fff", fontWeight: 700 }}>{img.caption}</span>
            </div>
          </div>
        ))}
      </div>
      {light && <Lightbox src={light.src} caption={light.caption} onClose={() => setLight(null)} />}
    </>
  );
}

function LabStrip({ images }: { images: { src: string; caption: string }[] }) {
  const [light, setLight] = useState<{ src: string; caption: string } | null>(null);
  const [paused, setPaused] = useState(false);
  const doubled = [...images, ...images];
  return (
    <>
      <style>{`
        @keyframes marq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .lab-track{display:flex;gap:1.2rem;width:max-content;animation:marq 26s linear infinite;}
        .lab-track.paused{animation-play-state:paused;}
        .lab-item{flex-shrink:0;width:300px;border-radius:14px;overflow:hidden;cursor:zoom-in;box-shadow:0 6px 24px rgba(56,161,105,0.15);border:2px solid #9ae6b4;transition:transform .4s,box-shadow .4s;position:relative;}
        .lab-item:hover{transform:translateY(-5px) scale(1.03);box-shadow:0 18px 45px rgba(56,161,105,0.25);}
        .lab-item img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;}
        .lab-ov{position:absolute;inset:0;background:linear-gradient(to top,rgba(56,161,105,0.88) 0%,transparent 55%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:.9rem;}
        .lab-item:hover .lab-ov{opacity:1;}
      `}</style>
      <div style={{ overflow: "hidden", borderRadius: "14px", WebkitMaskImage: "linear-gradient(90deg,transparent 0%,black 8%,black 92%,transparent 100%)", maskImage: "linear-gradient(90deg,transparent 0%,black 8%,black 92%,transparent 100%)" }}
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className={`lab-track${paused ? " paused" : ""}`}>
          {doubled.map((img, i) => (
            <div key={i} className="lab-item" onClick={() => setLight(img)}>
              <img src={img.src} alt={img.caption} />
              <div className="lab-ov"><span style={{ fontFamily: "var(--sans)", fontSize: ".82rem", color: "#fff", fontWeight: 700 }}>{img.caption}</span></div>
            </div>
          ))}
        </div>
      </div>
      {light && <Lightbox src={light.src} caption={light.caption} onClose={() => setLight(null)} />}
    </>
  );
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const h = () => { const y = window.scrollY + 110; let cur = ids[0]; for (const id of ids) { const el = document.getElementById(id.toLowerCase()); if (el && el.offsetTop <= y) cur = id; } setActive(cur); };
    window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h);
  }, [ids]);
  return active;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useScrollSpy(NAV);
  const { display, showCursor } = useTypewriter(ROLES);
  const scrollTo = (s: string) => { document.getElementById(s.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "var(--sans)", color: "#1a202c" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        :root{
          --sans:'Outfit',sans-serif;
          --serif:'Fraunces',Georgia,serif;
          --mono:'DM Mono',monospace;
        }
        body{background:#f7fafc;}

        nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:.75rem 2.5rem;background:rgba(255,255,255,0.97);backdrop-filter:blur(16px);border-bottom:3px solid #e53e3e;box-shadow:0 2px 20px rgba(229,62,62,0.1);}
        .brand{font-family:var(--serif);font-weight:700;font-size:1.1rem;color:#e53e3e;background:none;border:none;cursor:pointer;}
        .nav-links{display:flex;gap:1.8rem;list-style:none;}
        .nav-links button{font-family:var(--sans);font-size:.78rem;font-weight:600;color:#4a5568;background:none;border:none;cursor:pointer;transition:color .2s;padding:0;}
        .nav-links button:hover{color:#e53e3e;}
        .nav-links button.active{color:#e53e3e;border-bottom:2px solid #e53e3e;padding-bottom:2px;}
        .hamburger{display:none;background:none;border:none;cursor:pointer;flex-direction:column;gap:5px;}
        .hamburger span{display:block;width:22px;height:2.5px;background:#e53e3e;border-radius:2px;}

        /* HERO - bright warm gradient */
        #hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 1.5rem 5rem;background:linear-gradient(135deg,#fff5f5 0%,#fffbeb 25%,#f0fff4 55%,#ebf8ff 80%,#faf5ff 100%);position:relative;overflow:hidden;}
        #hero::before{content:'';position:absolute;top:-100px;right:-80px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(229,62,62,0.14) 0%,transparent 60%);pointer-events:none;}
        #hero::after{content:'';position:absolute;bottom:-60px;left:-60px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(56,161,105,0.12) 0%,transparent 60%);pointer-events:none;}
        .hero-dots{position:absolute;inset:0;background-image:radial-gradient(circle,#e53e3e22 1.5px,transparent 1.5px);background-size:36px 36px;pointer-events:none;}

        .hero-name{font-family:var(--serif);font-size:clamp(2.8rem,6vw,4.6rem);font-weight:700;color:#1a202c;letter-spacing:-.02em;margin-bottom:.5rem;position:relative;z-index:1;line-height:1.1;}
        .hero-role-text{font-family:var(--serif);font-size:clamp(1.2rem,2.8vw,1.9rem);font-style:italic;font-weight:400;background:linear-gradient(100deg,#e53e3e 0%,#805ad5 50%,#3182ce 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;min-height:2.4rem;line-height:1.3;}
        .hero-cursor{display:inline-block;width:2.5px;height:1.5em;background:#e53e3e;border-radius:2px;margin-left:4px;vertical-align:middle;transition:opacity .1s;}
        .hero-bio{font-family:var(--sans);max-width:560px;margin:0 auto 2.2rem;font-size:.95rem;line-height:1.85;color:#4a5568;position:relative;z-index:1;}
        .hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.5rem;position:relative;z-index:1;}
        .btn-r{font-family:var(--sans);padding:.75rem 1.8rem;background:#e53e3e;color:#fff;border:none;cursor:pointer;font-size:.84rem;font-weight:700;border-radius:8px;box-shadow:0 6px 20px rgba(229,62,62,0.4);transition:transform .15s,box-shadow .2s;}
        .btn-r:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(229,62,62,0.5);}
        .btn-b{font-family:var(--sans);padding:.75rem 1.8rem;background:#3182ce;color:#fff;border:none;cursor:pointer;font-size:.84rem;font-weight:700;border-radius:8px;box-shadow:0 6px 20px rgba(49,130,206,0.35);transition:transform .15s,box-shadow .2s;}
        .btn-b:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(49,130,206,0.45);}
        .btn-g{font-family:var(--sans);padding:.75rem 1.8rem;background:#38a169;color:#fff;border:none;cursor:pointer;font-size:.84rem;font-weight:700;border-radius:8px;box-shadow:0 6px 20px rgba(56,161,105,0.35);transition:transform .15s,box-shadow .2s;}
        .btn-g:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(56,161,105,0.45);}
        .social-row{display:flex;gap:1.6rem;justify-content:center;position:relative;z-index:1;}
        .social-icon{display:flex;align-items:center;justify-content:center;text-decoration:none;transition:transform .15s;}
        .social-icon:hover{transform:translateY(-3px);}
        .social-icon-img{width:24px;height:24px;object-fit:contain;opacity:0.5;transition:opacity .2s,transform .2s;}
        .social-icon:hover .social-icon-img{opacity:1;transform:scale(1.15);}

        /* ABOUT - clean white */
        #about{padding:6rem 1.5rem;background:#ffffff;}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;}
        .about-photo{border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(229,62,62,0.15);border:4px solid #fed7d7;}
        .about-photo img{width:100%;display:block;}

        /* EDUCATION - soft blue */
        #education{padding:6rem 1.5rem;background:linear-gradient(160deg,#ebf8ff 0%,#e6fffa 100%);}
        .edu-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;}
        .edu-card{border:2px solid #90cdf4;padding:2rem;background:#fff;border-radius:16px;transition:transform .3s,box-shadow .3s;box-shadow:0 4px 20px rgba(49,130,206,0.08);}
        .edu-card:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(49,130,206,0.15);}

        /* EXPERIENCE - white with colored cards */
        #experience{padding:6rem 1.5rem;background:#ffffff;}
        .exp-timeline{position:relative;padding-left:2.5rem;}
        .exp-timeline::before{content:'';position:absolute;left:10px;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#e53e3e,#d69e2e,#38a169,#805ad5);border-radius:2px;}
        .exp-item{position:relative;margin-bottom:2.5rem;}
        .exp-card{border:2px solid;border-radius:14px;padding:1.75rem;transition:transform .3s,box-shadow .3s;}
        .exp-card:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(0,0,0,0.1);}
        .conf-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:2.5rem;}
        .conf-card{border:2px solid #fbd38d;border-radius:12px;padding:1.35rem;background:#fffff0;box-shadow:0 3px 12px rgba(214,158,46,0.1);transition:transform .25s,box-shadow .25s;}
        .conf-card:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(214,158,46,0.2);}

        /* SKILLS - soft green */
        #skills{padding:6rem 1.5rem;background:linear-gradient(160deg,#f0fff4 0%,#fffff0 100%);}
        .skills-soft-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem 3rem;margin-bottom:3rem;}
        .skills-tech-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;}
        .tech-card{border:2px solid;border-radius:12px;padding:1.4rem;background:#fff;transition:transform .3s,box-shadow .3s;}
        .tech-card:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,0.08);}
        .interests-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.1rem;margin-top:2rem;}
        .int-card{border:2px solid;padding:1.5rem;text-align:center;border-radius:14px;background:#fff;transition:transform .3s,box-shadow .3s;}
        .int-card:hover{transform:translateY(-3px);box-shadow:0 12px 35px rgba(0,0,0,0.08);}

        /* SERVICES - white */
        #services{padding:6rem 1.5rem;background:#ffffff;}
        .svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem;}
        .svc-card{border:2px solid;border-radius:14px;padding:1.85rem;transition:transform .3s,box-shadow .3s;}
        .svc-card:hover{transform:translateY(-4px);box-shadow:0 16px 45px rgba(0,0,0,0.1);}
        .process-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin:3rem 0;}
        .process-step{text-align:center;padding:2rem 1.5rem;border-radius:14px;border:2px dashed;}

        /* PUBLICATIONS - soft lavender */
        #publications{padding:6rem 1.5rem;background:linear-gradient(160deg,#faf5ff 0%,#fff5f5 100%);}
        .pub-item{display:flex;gap:1.4rem;align-items:flex-start;padding:1.5rem 0;border-bottom:2px dashed #e9d8fd;}
        .pub-doi{font-family:var(--mono);font-size:.63rem;color:#3182ce;text-decoration:none;display:inline-block;margin-top:.25rem;font-weight:500;}
        .pub-doi:hover{text-decoration:underline;}

        /* PROJECTS - white */
        #projects{padding:6rem 1.5rem;background:#ffffff;}
        .proj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4rem;}
        .proj-card{border:2px solid;border-radius:14px;padding:1.7rem;transition:transform .3s,box-shadow .3s;}
        .proj-card:hover{transform:translateY(-4px);box-shadow:0 16px 45px rgba(0,0,0,0.1);}

        /* CONTACT - bright gradient */
        #contact{padding:6rem 1.5rem;background:linear-gradient(135deg,#fff5f5 0%,#fffbeb 33%,#f0fff4 66%,#ebf8ff 100%);}
        .c-item{display:flex;gap:.9rem;align-items:center;margin-bottom:1.25rem;text-decoration:none;}
        .c-icon-img{width:22px;height:22px;object-fit:contain;opacity:0.5;transition:opacity .2s,transform .2s;}
        .c-item:hover .c-icon-img{opacity:1;transform:scale(1.1);}
        .c-lbl{font-family:var(--mono);font-size:.62rem;color:#a0aec0;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.1rem;}
        .c-val{font-family:var(--sans);font-size:.88rem;color:#1a202c;font-weight:600;}
        .link-row{display:flex;align-items:center;gap:.55rem;font-family:var(--sans);font-size:.84rem;color:#4a5568;margin-bottom:.6rem;text-decoration:none;transition:color .2s;font-weight:500;}
        .link-row:hover{color:#e53e3e;}
        .link-row img{width:16px;height:16px;object-fit:contain;opacity:0.5;transition:opacity .2s;}
        .link-row:hover img{opacity:1;}
        .f-input{background:#fff;border:2px solid #e2e8f0;border-radius:10px;padding:.85rem 1.1rem;color:#1a202c;font-family:var(--sans);font-size:.88rem;outline:none;transition:border-color .2s,box-shadow .2s;width:100%;font-weight:400;}
        .f-input::placeholder{color:#a0aec0;}
        .f-input:focus{border-color:#e53e3e;box-shadow:0 0 0 3px rgba(229,62,62,0.12);}

        .sec-inner{max-width:1080px;margin:0 auto;}
        .sec-label{text-align:center;font-family:var(--mono);font-size:.7rem;letter-spacing:.22em;text-transform:uppercase;margin-bottom:.6rem;font-weight:700;}
        .sec-title{font-family:var(--serif);text-align:center;font-size:clamp(2rem,4vw,2.9rem);font-weight:700;color:#1a202c;margin-bottom:.75rem;line-height:1.1;}
        .sec-title em{font-style:italic;font-weight:400;}
        .sec-sub{font-family:var(--sans);text-align:center;max-width:560px;margin:0 auto 3rem;font-size:.9rem;color:#4a5568;line-height:1.75;}
        .tags-row{display:flex;flex-wrap:wrap;gap:.65rem;margin-top:1.35rem;}

        footer{text-align:center;padding:2rem;background:#2d3748;color:rgba(255,255,255,.4);font-family:var(--mono);font-size:.68rem;letter-spacing:.08em;}

        @media(max-width:900px){.skills-soft-grid,.skills-tech-grid,.svc-grid,.proj-grid{grid-template-columns:1fr 1fr;}.process-grid{grid-template-columns:1fr;gap:1.2rem;}}
        @media(max-width:768px){nav{padding:.9rem 1.25rem;}.nav-links{display:none;}.nav-links.open{display:flex;flex-direction:column;position:fixed;top:57px;left:0;right:0;background:rgba(255,255,255,.98);border-bottom:2px solid #fed7d7;padding:1.25rem 1.5rem;gap:1.1rem;z-index:199;}.hamburger{display:flex;}section{padding:4rem 1.25rem !important;}.about-grid,.edu-grid,.conf-grid{grid-template-columns:1fr;gap:2rem;}.contact-grid{grid-template-columns:1fr !important;gap:2.5rem !important;}.interests-grid,.svc-grid,.proj-grid,.skills-soft-grid,.skills-tech-grid{grid-template-columns:1fr;}.stat-cards{grid-template-columns:1fr 1fr;}}
        @media(max-width:480px){.stat-cards{grid-template-columns:1fr;}}
      `}</style>

      {/* NAV */}
      <nav>
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Victor LW</button>
        <ul className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV.map(n => <li key={n}><button className={active === n ? "active" : ""} onClick={() => scrollTo(n)}>{n}</button></li>)}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu"><span /><span /><span /></button>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-dots" />
        <Reveal>
          <div style={{ fontFamily: "var(--mono)", fontSize: ".68rem", letterSpacing: ".28em", color: "#e53e3e", marginBottom: "1rem", textTransform: "uppercase", fontWeight: 700, background: "#fff5f5", padding: ".3rem 1.1rem", borderRadius: "99px", border: "2px solid #feb2b2", display: "inline-block", position: "relative", zIndex: 1 }}>✦ Hello, I am</div>
        </Reveal>
        <Reveal delay={60}><h1 className="hero-name">Victor Lumumba Wandera</h1></Reveal>
        <Reveal delay={120}>
          <div style={{ display: "inline-flex", alignItems: "center", marginBottom: "1.8rem", position: "relative", zIndex: 1 }}>
            <span className="hero-role-text">{display}</span>
            <span className="hero-cursor" style={{ opacity: showCursor ? 1 : 0 }} />
          </div>
        </Reveal>
        <Reveal delay={200}><p className="hero-bio">A dedicated statistician applying rigorous quantitative analyses to generate actionable, data-driven insights that support informed decision-making in health, agriculture, and economics.</p></Reveal>
        <Reveal delay={280}>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", margin: "0 0 2rem", flexWrap: "wrap" }}>
            {[["8+","Publications","#e53e3e","#fff5f5","#feb2b2"],["5+","Yrs Experience","#3182ce","#ebf8ff","#90cdf4"],["50+","Students Mentored","#38a169","#f0fff4","#9ae6b4"]].map(([n,l,c,bg,br]) => (
              <div key={l} style={{ textAlign: "center", padding: "1rem 1.5rem", background: bg as string, border: `2px solid ${br}`, borderRadius: "14px", boxShadow: `0 4px 14px ${br}60` }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 700, color: c as string, lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: "#4a5568", marginTop: ".3rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700 }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={360}>
          <div className="hero-btns">
            <button className="btn-r" onClick={() => scrollTo("Publications")}>View Research</button>
            <button className="btn-b" onClick={() => scrollTo("Services")}>Hire Me</button>
            <button className="btn-g" onClick={() => scrollTo("Contact")}>Get In Touch</button>
          </div>
        </Reveal>
        <Reveal delay={440}>
          <div className="social-row">
            <a className="social-icon" href="mailto:lumumbavictor172@gmail.com" title="Email"><img className="social-icon-img" src="/Mail.ico" alt="Email" /></a>
            <a className="social-icon" href="https://beyonddataanalytics.online" target="_blank" rel="noopener noreferrer" title="Website"><img className="social-icon-img" src="/Website.ico" alt="Website" /></a>
            <a className="social-icon" href="tel:+254706038599" title="Phone"><img className="social-icon-img" src="/phone.ico" alt="Phone" /></a>
            <a className="social-icon" href="https://github.com/Lumumba1992" target="_blank" rel="noopener noreferrer" title="GitHub"><img className="social-icon-img" src="/github.ico" alt="GitHub" /></a>
            <a className="social-icon" href="#" title="LinkedIn"><img className="social-icon-img" src="/linkedin.ico" alt="LinkedIn" /></a>
          </div>
        </Reveal>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="sec-inner">
          <Reveal><p className="sec-label" style={{ color: "#e53e3e" }}>About Me</p></Reveal>
          <div className="about-grid" style={{ marginTop: "1rem" }}>
            <Reveal dir="left">
              <div className="about-photo"><img src="https://res.cloudinary.com/dacpiss4b/image/upload/v1772514964/main_image_wjyuuq.jpg" alt="Victor Lumumba Wandera" /></div>
            </Reveal>
            <Reveal dir="right">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontFamily: "var(--mono)", fontSize: ".68rem", color: "#e53e3e", background: "#fff5f5", border: "1.5px solid #feb2b2", padding: ".35rem 1rem", borderRadius: "99px", marginBottom: "1rem" }}>✦ MSc Applied Statistics · Tutorial Fellow</div>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "2.1rem", fontWeight: 700, color: "#1a202c", marginBottom: "1rem", lineHeight: 1.15 }}>Hi! I'm Victor Lumumba Wandera</h3>
                <p style={{ fontFamily: "var(--sans)", fontSize: ".9rem", color: "#4a5568", lineHeight: 1.85, marginBottom: ".9rem" }}>A statistician with expertise in machine learning, predictive modeling, and research methodology, committed to generating actionable insights for health, agriculture, and economic development.</p>
                <p style={{ fontFamily: "var(--sans)", fontSize: ".9rem", color: "#4a5568", lineHeight: 1.85, marginBottom: ".9rem" }}><strong style={{ color: "#e53e3e" }}>My Mission: </strong>To apply rigorous quantitative and qualitative analyses to generate actionable, data-driven insights. Committed to methodological excellence, I uncover meaningful patterns to advance innovation, efficiency, and profitability while fostering evidence-based excellence.</p>
                <p style={{ fontFamily: "var(--sans)", fontSize: ".9rem", color: "#4a5568", lineHeight: 1.85 }}><strong style={{ color: "#3182ce" }}>My Vision: </strong>To excel as a statistician and ML specialist by pioneering innovative, data-driven strategies that enhance organizational profitability and optimize resources through rigorous, evidence-based analysis.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginTop: "2rem" }} className="stat-cards">
                  {[["8+","Publications","#e53e3e","#fff5f5","#feb2b2"],["5+","Yrs Experience","#3182ce","#ebf8ff","#90cdf4"],["50+","Students Mentored","#38a169","#f0fff4","#9ae6b4"]].map(([n,l,c,bg,br]) => (
                    <div key={l} style={{ padding: "1.3rem 1rem", textAlign: "center", borderRadius: "12px", background: bg as string, border: `2px solid ${br}` }}>
                      <div style={{ fontFamily: "var(--serif)", fontSize: "2.3rem", fontWeight: 700, color: c as string, lineHeight: 1 }}>{n}</div>
                      <div style={{ fontFamily: "var(--mono)", fontSize: ".58rem", color: c as string, marginTop: ".3rem", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700 }}>{l}</div>
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
          <Reveal><p className="sec-label" style={{ color: "#3182ce" }}>Educational Background</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Academic <em>Journey</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Built on a strong quantitative foundation at Chuka University.</p></Reveal>
          <div className="edu-grid">
            {[
              { icon: "🎓", degree: "Master of Science in Applied Statistics", school: "Chuka University, Kenya", year: "May 2023 – Nov 2025", desc: "Thesis: Machine Learning Based Prediction of Psychological Mental Health Distress Among University Students in Tharaka Nithi County.\nSupervisors: Prof. Dennis K. Muriithi, PhD & Dr. Monicah Oundo" },
              { icon: "🏅", degree: "BSc Economics & Statistics", school: "Chuka University — 2nd Class Hons. (Upper Division)", year: "Sep 2016 – Dec 2020", desc: "Project: Effects of Taxation on Private Investment in Kenya. Supervisor: Dr. Elizabeth Njiru\n\nSolid grounding in econometrics, statistical theory, probability, and research methods." },
            ].map((e, i) => (
              <Reveal key={i} dir={i === 0 ? "left" : "right"} delay={80}>
                <div className="edu-card">
                  <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{e.icon}</div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, color: "#2b6cb0", marginBottom: ".4rem" }}>{e.degree}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".83rem", color: "#4a5568", marginBottom: ".5rem", fontWeight: 500 }}>{e.school}</p>
                  <span style={{ fontFamily: "var(--mono)", fontSize: ".7rem", color: "#3182ce", fontWeight: 700, background: "#ebf8ff", padding: ".2rem .7rem", borderRadius: "99px", display: "inline-block" }}>📅 {e.year}</span>
                  <p style={{ fontFamily: "var(--sans)", marginTop: "1rem", fontSize: ".82rem", color: "#4a5568", lineHeight: 1.7, whiteSpace: "pre-line" }}>{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div style={{ borderLeft: "4px solid #3182ce", padding: "1.75rem 2rem", marginTop: "2rem", background: "#fff", borderRadius: "0 12px 12px 0", boxShadow: "0 4px 16px rgba(49,130,206,0.08)" }}>
              <p style={{ fontFamily: "var(--sans)", fontSize: ".9rem", color: "#2d3748", lineHeight: 1.85 }}><strong style={{ color: "#2b6cb0" }}>Mission Statement: </strong>To skillfully apply statistical and research expertise to generate actionable insights. As a dedicated statistician and aspiring research officer, I am committed to conducting meticulous quantitative and qualitative analyses that empower informed decision-making through cutting-edge methodologies.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ marginTop: "2.5rem" }}>
              <p className="sec-label" style={{ textAlign: "left", color: "#3182ce", marginBottom: ".85rem" }}>Professional Memberships</p>
              <div className="tags-row">
                {MEMBERSHIPS.map(m => <span key={m.name} style={{ fontFamily: "var(--sans)", padding: ".38rem 1rem", borderRadius: "99px", border: "2px solid #90cdf4", background: "#ebf8ff", fontSize: ".74rem", color: "#2b6cb0", fontWeight: 600 }}>{m.name} — {m.num}</span>)}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="sec-inner">
          <Reveal><p className="sec-label" style={{ color: "#e53e3e" }}>Work Experience</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Professional <em>Journey</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Teaching, training, and research experience across academia and data analytics.</p></Reveal>
          <div className="exp-timeline">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i * 80}>
                <div className="exp-item">
                  <div style={{ position: "absolute", left: "-2.3rem", top: ".5rem", width: "16px", height: "16px", borderRadius: "50%", background: e.color, border: "3px solid #fff", boxShadow: `0 0 0 3px ${e.color}40` }} />
                  <div className="exp-card" style={{ background: e.bg, borderColor: e.border }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: ".85rem" }}>
                      <span style={{ fontSize: "1.8rem", lineHeight: 1 }}>{e.icon}</span>
                      <div>
                        <p style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, color: e.color, marginBottom: ".25rem" }}>{e.role}</p>
                        <p style={{ fontFamily: "var(--sans)", fontSize: ".83rem", color: "#4a5568", marginBottom: ".3rem", fontWeight: 500 }}>{e.org}</p>
                        <span style={{ fontFamily: "var(--mono)", fontSize: ".68rem", fontWeight: 700, color: e.color, background: "rgba(255,255,255,0.8)", padding: ".2rem .7rem", borderRadius: "99px", border: `1.5px solid ${e.border}`, display: "inline-block" }}>{e.period}</span>
                      </div>
                    </div>
                    <ul style={{ listStyle: "none", marginBottom: "1rem" }}>
                      {e.points.map((pt, j) => (
                        <li key={j} style={{ fontFamily: "var(--sans)", fontSize: ".84rem", color: "#2d3748", lineHeight: 1.65, padding: ".28rem 0 .28rem 1.3rem", position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, color: e.color, fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.4 }}>›</span>{pt}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                      {e.tags.map(t => <span key={t} style={{ fontFamily: "var(--mono)", fontSize: ".62rem", padding: ".28rem .8rem", borderRadius: "99px", border: `1.5px solid ${e.border}`, color: e.color, background: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}><h3 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 700, color: "#1a202c", textAlign: "center", margin: "3.5rem 0 .5rem" }}>Conferences &amp; <em>Workshops</em></h3></Reveal>
          <div className="conf-grid">
            {CONFERENCES.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="conf-card">
                  <p style={{ fontFamily: "var(--mono)", fontSize: ".65rem", color: "#b7791f", letterSpacing: ".12em", marginBottom: ".5rem", fontWeight: 700 }}>{c.date}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".84rem", color: "#1a202c", lineHeight: 1.55, fontWeight: 600, marginBottom: ".35rem" }}>{c.name}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".76rem", color: "#718096", fontStyle: "italic" }}>{c.org}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}><div style={{ marginTop: "2.5rem" }}><p style={{ fontFamily: "var(--mono)", fontSize: ".65rem", color: "#e53e3e", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center", fontWeight: 700 }}>On Stage</p><SlideStrip images={STAGE_IMGS} /></div></Reveal>
          <Reveal delay={100}><div style={{ marginTop: "2.5rem" }}><p style={{ fontFamily: "var(--mono)", fontSize: ".65rem", color: "#3182ce", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "1rem", textAlign: "center", fontWeight: 700 }}>With the CDAM Team</p><CascadeGrid images={CDAM_IMGS} cols={4} /></div></Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="sec-inner">
          <Reveal><p className="sec-label" style={{ color: "#38a169" }}>Skills &amp; Expertise</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Technical <em>Proficiency</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Comprehensive expertise in statistical software, machine learning, and data science.</p></Reveal>
          <Reveal><h3 style={{ fontFamily: "var(--mono)", fontSize: ".68rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#38a169", marginBottom: "1.5rem", paddingBottom: ".6rem", borderBottom: "2px solid #9ae6b4", fontWeight: 700 }}>Software Proficiency</h3></Reveal>
          <div className="skills-soft-grid">
            {SKILLS_SOFT.map((s, i) => {
              const cols = ["#e53e3e","#3182ce","#38a169","#d69e2e","#805ad5","#dd6b20","#e53e3e","#3182ce","#38a169"];
              return <Reveal key={s.name} delay={i * 40}><SkillBar {...s} color={cols[i]} /></Reveal>;
            })}
          </div>
          <Reveal><h3 style={{ fontFamily: "var(--mono)", fontSize: ".68rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#38a169", margin: "2.5rem 0 1.5rem", paddingBottom: ".6rem", borderBottom: "2px solid #9ae6b4", fontWeight: 700 }}>Technical Expertise</h3></Reveal>
          <div className="skills-tech-grid">
            {SKILLS_TECH.map((s, i) => (
              <Reveal key={s.cat} delay={i * 60}>
                <div className="tech-card" style={{ borderColor: s.border, background: s.bg }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".85rem", fontWeight: 700, color: s.color }}>{s.cat}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".45rem" }}>
                    {s.tags.map(t => <span key={t} style={{ fontFamily: "var(--sans)", fontSize: ".72rem", padding: ".27rem .7rem", borderRadius: "99px", border: `1.5px solid ${s.border}`, color: s.color, background: "#fff", fontWeight: 600 }}>{t}</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}><h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3.5rem 0 .5rem", fontSize: "1.8rem", fontWeight: 700, color: "#1a202c" }}>Research <em>Interests</em></h3></Reveal>
          <div className="interests-grid">
            {INTERESTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="int-card" style={{ borderColor: item.border, background: item.bg }}>
                  <span style={{ fontSize: "1.9rem", display: "block", marginBottom: ".6rem" }}>{item.icon}</span>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 700, color: item.color, marginBottom: ".35rem" }}>{item.title}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".76rem", color: "#4a5568", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="sec-inner">
          <Reveal><p className="sec-label" style={{ color: "#805ad5" }}>Services</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">What I <em>Offer</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Professional statistical services to empower your research and drive data-driven success.</p></Reveal>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="svc-card" style={{ borderColor: s.border, background: s.bg }}>
                  <span style={{ fontSize: "2rem", marginBottom: ".85rem", display: "block" }}>{s.icon}</span>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", fontWeight: 700, marginBottom: ".6rem", color: "#1a202c" }}>{s.title}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".8rem", color: "#4a5568", lineHeight: 1.65, marginBottom: "1rem" }}>{s.desc}</p>
                  <ul style={{ listStyle: "none" }}>
                    {s.points.map(p => (
                      <li key={p} style={{ fontFamily: "var(--sans)", fontSize: ".78rem", color: "#2d3748", padding: ".22rem 0 .22rem 1.1rem", position: "relative", lineHeight: 1.55 }}>
                        <span style={{ position: "absolute", left: 0, color: s.color, fontSize: "1.4rem", lineHeight: 1 }}>·</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3.5rem 0 .8rem", fontSize: "1.8rem", fontWeight: 700, color: "#1a202c" }}>Training <em>in Action</em></h3>
            <p style={{ fontFamily: "var(--sans)", fontSize: ".83rem", color: "#4a5568", textAlign: "center", marginBottom: "1.25rem" }}>Hands-on statistical computing and data science workshops</p>
            <LabStrip images={LAB_IMGS} />
          </Reveal>
          <Reveal delay={80}><h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3.5rem 0 .5rem", fontSize: "1.8rem", fontWeight: 700, color: "#1a202c" }}>My Working <em>Process</em></h3></Reveal>
          <div className="process-grid">
            {[
              { n: "01", title: "Planning & Strategy", desc: "Understanding your objectives and developing a comprehensive strategy.", color: "#e53e3e", bg: "#fff5f5", border: "#feb2b2" },
              { n: "02", title: "Implementation & Analysis", desc: "Executing methodology using advanced statistical techniques and tools.", color: "#3182ce", bg: "#ebf8ff", border: "#90cdf4" },
              { n: "03", title: "Delivery & Support", desc: "Comprehensive reports, actionable insights, and ongoing support.", color: "#38a169", bg: "#f0fff4", border: "#9ae6b4" },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 80}>
                <div className="process-step" style={{ background: p.bg, borderColor: p.border }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "3.5rem", fontWeight: 700, color: p.color, lineHeight: 1, marginBottom: ".5rem" }}>{p.n}</div>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".92rem", fontWeight: 700, color: "#1a202c", marginBottom: ".5rem" }}>{p.title}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".8rem", color: "#4a5568", lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div style={{ textAlign: "center", marginTop: "2rem", padding: "2.5rem", background: "linear-gradient(135deg,#fff5f5,#ebf8ff,#f0fff4)", border: "2px solid #fed7d7", borderRadius: "16px" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", fontWeight: 700, color: "#1a202c", marginBottom: ".75rem" }}>Ready to Get Started?</h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: ".88rem", color: "#4a5568", marginBottom: "1.5rem", maxWidth: "480px", margin: "0 auto 1.5rem" }}>Let's discuss how my statistical expertise can help achieve your research goals.</p>
              <button className="btn-r" onClick={() => scrollTo("Contact")}>Get In Touch →</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="publications">
        <div className="sec-inner">
          <Reveal><p className="sec-label" style={{ color: "#805ad5" }}>Research</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Peer-Reviewed <em>Publications</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Contributions to international journals in AI, statistics, public health, and finance.</p></Reveal>
          {PUBLICATIONS.map(({ title, authors, journal, year, vol, doi }, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="pub-item">
                <span style={{ fontFamily: "var(--mono)", minWidth: "32px", fontSize: ".68rem", color: "#9f7aea", paddingTop: ".2rem", flexShrink: 0, fontWeight: 700 }}>[{i + 1}]</span>
                <span style={{ fontFamily: "var(--mono)", minWidth: "46px", fontSize: ".72rem", fontWeight: 700, color: "#e53e3e", paddingTop: ".2rem", flexShrink: 0 }}>{year}</span>
                <div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1.02rem", fontWeight: 600, color: "#1a202c", marginBottom: ".3rem", lineHeight: 1.45 }}>{title}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".75rem", color: "#718096", marginBottom: ".2rem" }}>{authors}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".78rem", color: "#805ad5", fontStyle: "italic", marginBottom: ".2rem", fontWeight: 600 }}>{journal}</p>
                  {vol && <p style={{ fontFamily: "var(--mono)", fontSize: ".63rem", color: "#a0aec0" }}>{vol}</p>}
                  {doi && <a className="pub-doi" href={doi} target="_blank" rel="noopener noreferrer">{doi}</a>}
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={80}><h3 style={{ fontFamily: "var(--serif)", textAlign: "center", margin: "3.5rem 0 1.5rem", fontSize: "1.8rem", fontWeight: 700, color: "#1a202c" }}>Research <em>Areas</em></h3></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
            {[
              { area: "Machine Learning & XAI", count: 6, level: "High Impact", color: "#e53e3e", bg: "#fff5f5", border: "#feb2b2" },
              { area: "Health Analytics & Biostatistics", count: 5, level: "High Impact", color: "#3182ce", bg: "#ebf8ff", border: "#90cdf4" },
              { area: "Time Series & Forecasting", count: 4, level: "High Impact", color: "#38a169", bg: "#f0fff4", border: "#9ae6b4" },
              { area: "Survival Analysis", count: 3, level: "Medium Impact", color: "#d69e2e", bg: "#fffff0", border: "#fbd38d" },
              { area: "Financial Econometrics", count: 2, level: "Medium Impact", color: "#805ad5", bg: "#faf5ff", border: "#d6bcfa" },
            ].map((r, i) => (
              <Reveal key={r.area} delay={i * 60}>
                <div style={{ background: r.bg, border: `2px solid ${r.border}`, borderRadius: "12px", padding: "1.4rem", textAlign: "center", boxShadow: `0 4px 14px ${r.border}50` }}>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "2.2rem", fontWeight: 700, color: r.color, lineHeight: 1 }}>{r.count}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".8rem", color: "#1a202c", margin: ".3rem 0 .3rem", fontWeight: 600 }}>{r.area}</p>
                  <span style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: r.color, letterSpacing: ".08em", fontWeight: 700 }}>{r.level}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="sec-inner">
          <Reveal><p className="sec-label" style={{ color: "#38a169" }}>Research &amp; Projects</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Featured <em>Projects</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Peer-reviewed research and analytical projects in ML, health analytics, and statistical modeling.</p></Reveal>
          <div className="proj-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="proj-card" style={{ borderColor: p.border, background: p.bg }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".5rem", fontWeight: 700, color: p.color }}>{p.tag}</p>
                  <span style={{ fontSize: "1.8rem", display: "block", marginBottom: ".6rem" }}>{p.icon}</span>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", fontWeight: 700, marginBottom: ".6rem", lineHeight: 1.3, color: "#1a202c" }}>{p.title}</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".79rem", color: "#4a5568", lineHeight: 1.65, marginBottom: "1rem" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginBottom: "1rem" }}>
                    {p.tools.map(t => <span key={t} style={{ fontFamily: "var(--mono)", fontSize: ".62rem", padding: ".22rem .65rem", borderRadius: "99px", border: `1.5px solid ${p.border}`, color: p.color, background: "rgba(255,255,255,0.7)", fontWeight: 700 }}>{t}</span>)}
                  </div>
                  <ul style={{ listStyle: "none" }}>
                    {p.outcomes.map(o => (
                      <li key={o} style={{ fontFamily: "var(--sans)", fontSize: ".76rem", color: "#2d3748", padding: ".18rem 0 .18rem 1.1rem", position: "relative", lineHeight: 1.55 }}>
                        <span style={{ position: "absolute", left: 0, color: p.color, fontWeight: 700 }}>✓</span>{o}
                      </li>
                    ))}
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
          <Reveal><p className="sec-label" style={{ color: "#e53e3e" }}>Contact</p></Reveal>
          <Reveal delay={80}><h2 className="sec-title">Let's <em>Collaborate</em></h2></Reveal>
          <Reveal delay={140}><p className="sec-sub">Open to research collaborations, consulting engagements, and academic partnerships.</p></Reveal>
          <Reveal delay={100}>
            <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", marginBottom: "3.5rem", flexWrap: "wrap" }}>
              {[["24h","Response Time","#e53e3e","#fff5f5","#feb2b2"],["100%","Confidentiality","#3182ce","#ebf8ff","#90cdf4"],["24/7","Availability","#38a169","#f0fff4","#9ae6b4"]].map(([n,l,c,bg,br]) => (
                <div key={l} style={{ textAlign: "center", padding: "1rem 1.75rem", background: bg as string, border: `2px solid ${br}`, borderRadius: "12px", boxShadow: `0 4px 14px ${br}60` }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 700, color: c as string }}>{n}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: ".6rem", color: "#4a5568", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <Reveal dir="left">
              <div>
                {[
                  { href: "mailto:lumumbavictor172@gmail.com", iconSrc: "/Mail.ico", lbl: "Primary Email", val: "lumumbavictor172@gmail.com" },
                  { href: "mailto:wanderavictor2@yahoo.com", iconSrc: "/Mail.ico", lbl: "Alt Email", val: "wanderavictor2@yahoo.com" },
                  { href: "tel:+254706038599", iconSrc: "/phone.ico", lbl: "Telephone", val: "+254 706 038 599" },
                  { href: "https://maps.google.com/?q=Chuka%2C+Kenya", iconSrc: "/location.ico", lbl: "Location", val: "Chuka, Kenya (Remote-Friendly)" },
                  { href: "https://beyonddataanalytics.online", iconSrc: "/Website.ico", lbl: "Website", val: "beyonddataanalytics.online" },
                ].map(({ href, iconSrc, lbl, val }) => (
                  <a key={lbl} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="c-item">
                    <img className="c-icon-img" src={iconSrc} alt={lbl} />
                    <div><p className="c-lbl">{lbl}</p><p className="c-val">{val}</p></div>
                  </a>
                ))}
                <div style={{ marginTop: "1.75rem" }}>
                  <p className="c-lbl" style={{ marginBottom: ".85rem" }}>Connect with me</p>
                  {PROFILE_LINKS.map(({ label, href, iconSrc }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="link-row">
                      <img src={iconSrc} alt={label} /> {label}
                    </a>
                  ))}
                </div>
                <div style={{ marginTop: "1.75rem" }}>
                  <p className="c-lbl" style={{ marginBottom: ".85rem" }}>Available for</p>
                  {["Research collaborations","Consulting opportunities","Academic partnerships","Data analytics projects","Statistical tutoring"].map(item => (
                    <p key={item} style={{ fontFamily: "var(--sans)", fontSize: ".85rem", color: "#4a5568", marginBottom: ".55rem" }}>→ {item}</p>
                  ))}
                </div>
                <div style={{ marginTop: "1.75rem", padding: "1.25rem", background: "#fff5f5", border: "2px solid #feb2b2", borderRadius: "12px" }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: ".62rem", color: "#e53e3e", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".4rem", fontWeight: 700 }}>Quick Response Guarantee</p>
                  <p style={{ fontFamily: "var(--sans)", fontSize: ".82rem", color: "#4a5568", lineHeight: 1.65 }}>I respond within 24 hours. For urgent needs, mention <strong style={{ color: "#e53e3e" }}>"URGENT"</strong> in your subject.</p>
                </div>
              </div>
            </Reveal>
            <Reveal dir="right">
              <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
                {["Full Name","Email Address","Subject"].map(ph => (
                  <input key={ph} type={ph === "Email Address" ? "email" : "text"} placeholder={ph} className="f-input" />
                ))}
                <textarea placeholder="Tell me about your project or how I can help you…" rows={5} className="f-input" style={{ resize: "vertical" }} />
                <button className="btn-r" style={{ width: "fit-content" }}>Send Message →</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} Victor Lumumba Wandera · All rights reserved · beyonddataanalytics.online
        <br /><span style={{ opacity: .5 }}>Statistician · Research Officer · Data Analyst · ML Enthusiast</span>
      </footer>
    </div>
  );
}