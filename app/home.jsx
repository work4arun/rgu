"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; font-family: 'Inter', 'Segoe UI', system-ui, sans-serif; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes pulse2 {
    0%,100% { transform: scale(1); opacity: 0.7; }
    50% { transform: scale(1.08); opacity: 1; }
  }
  @keyframes scrollBounce {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(3deg); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes cardSlideIn {
    from { opacity: 0; transform: translateY(50px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 80px; }
  }
  @keyframes orbit {
    from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
  }
  @keyframes textGlow {
    0%,100% { text-shadow: 0 0 20px rgba(255,200,50,0.5); }
    50% { text-shadow: 0 0 40px rgba(255,200,50,0.9), 0 0 80px rgba(255,200,50,0.4); }
  }
  @keyframes videoOverlayPulse {
    0%,100% { opacity: 0.55; }
    50% { opacity: 0.48; }
  }
  @keyframes carouselFade {
    0% { opacity: 0; transform: translateY(10px); }
    10% { opacity: 1; transform: translateY(0); }
    80% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
  }
  @keyframes ripple {
    0% { transform: scale(0); opacity: 0.6; }
    100% { transform: scale(4); opacity: 0; }
  }
  .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
  .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 24px 60px rgba(0,0,0,0.18) !important; }
  .btn-glow:hover { box-shadow: 0 0 30px rgba(37,99,235,0.5) !important; }

  /* Mobile */
  @media (max-width: 768px) {
    .hero-text-main { font-size: 2.2rem !important; }
    .hero-tagline { font-size: 1rem !important; }
    .hero-overlay-inner { padding: 24px !important; }
    .section-heading { font-size: 2rem !important; }
    .schools-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .rgu-way-grid { grid-template-columns: 1fr !important; }
    .recognition-grid { grid-template-columns: 1fr !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════
   COLOR PALETTE
═══════════════════════════════════════════════════════════ */
const C = {
  navy:   "#0d1f4e",
  blue:   "#1a56db",
  blue2:  "#2563eb",
  gold:   "#f59e0b",
  gold2:  "#fbbf24",
  white:  "#ffffff",
  light:  "#f0f4ff",
  muted:  "#64748b",
  dark:   "#0f172a",
  teal:   "#0891b2",
  emerald:"#059669",
};

/* ═══════════════════════════════════════════════════════════
   SCHOOL DATA
═══════════════════════════════════════════════════════════ */
const SCHOOLS = [
  {
    name: "School of Engineering & Technology",
    short: "Engineering & Tech",
    color: "#1a56db",
    gradient: "linear-gradient(135deg,#1a56db22,#1a56db08)",
    programs: ["B.Tech CSE", "B.Tech Mech", "B.Tech ECE", "M.Tech"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <circle cx="32" cy="32" r="12" stroke="#1a56db" strokeWidth="3"/>
        <circle cx="32" cy="32" r="4" fill="#1a56db"/>
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <rect key={i} x="30" y="10" width="4" height="8" rx="2" fill="#1a56db" opacity="0.6"
            transform={`rotate(${a} 32 32)`}/>
        ))}
        <rect x="14" y="30" width="6" height="4" rx="2" fill="#1a56db"/>
        <rect x="44" y="30" width="6" height="4" rx="2" fill="#1a56db"/>
      </svg>
    ),
  },
  {
    name: "School of Computing & AI",
    short: "Computing & AI",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg,#7c3aed22,#7c3aed08)",
    programs: ["B.Sc CS", "M.Sc AI/ML", "B.Tech AI", "Ph.D CS"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <rect x="8" y="16" width="48" height="32" rx="4" stroke="#7c3aed" strokeWidth="3"/>
        <circle cx="20" cy="32" r="4" fill="#7c3aed"/>
        <circle cx="32" cy="24" r="4" fill="#7c3aed" opacity="0.7"/>
        <circle cx="32" cy="40" r="4" fill="#7c3aed" opacity="0.7"/>
        <circle cx="44" cy="32" r="4" fill="#7c3aed"/>
        <line x1="24" y1="32" x2="28" y2="24" stroke="#7c3aed" strokeWidth="1.5"/>
        <line x1="24" y1="32" x2="28" y2="40" stroke="#7c3aed" strokeWidth="1.5"/>
        <line x1="36" y1="24" x2="40" y2="32" stroke="#7c3aed" strokeWidth="1.5"/>
        <line x1="36" y1="40" x2="40" y2="32" stroke="#7c3aed" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: "School of Business & Management",
    short: "Business & Mgmt",
    color: "#059669",
    gradient: "linear-gradient(135deg,#05966922,#05966908)",
    programs: ["MBA", "BBA", "Executive MBA", "PGDM"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <rect x="10" y="44" width="10" height="12" rx="2" fill="#059669"/>
        <rect x="27" y="32" width="10" height="24" rx="2" fill="#059669" opacity="0.8"/>
        <rect x="44" y="20" width="10" height="36" rx="2" fill="#059669" opacity="0.6"/>
        <polyline points="10,40 32,24 54,12" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="10" cy="40" r="3" fill="#059669"/>
        <circle cx="32" cy="24" r="3" fill="#059669"/>
        <circle cx="54" cy="12" r="3" fill="#059669"/>
      </svg>
    ),
  },
  {
    name: "School of Health Sciences",
    short: "Health Sciences",
    color: "#e11d48",
    gradient: "linear-gradient(135deg,#e11d4822,#e11d4808)",
    programs: ["B.Pharm", "M.Pharm", "B.Sc Nursing", "M.Sc Biotech"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <circle cx="32" cy="32" r="22" stroke="#e11d48" strokeWidth="2.5" opacity="0.3"/>
        <rect x="28" y="16" width="8" height="32" rx="4" fill="#e11d48"/>
        <rect x="16" y="28" width="32" height="8" rx="4" fill="#e11d48"/>
      </svg>
    ),
  },
  {
    name: "School of Liberal Arts & Sciences",
    short: "Liberal Arts",
    color: "#d97706",
    gradient: "linear-gradient(135deg,#d9770622,#d9770608)",
    programs: ["BA English", "B.Sc Physics", "MA History", "M.Sc Math"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <path d="M8 12 L32 8 L56 12 L56 52 L32 56 L8 52 Z" stroke="#d97706" strokeWidth="2.5" fill="none"/>
        <line x1="32" y1="8" x2="32" y2="56" stroke="#d97706" strokeWidth="1.5" opacity="0.5"/>
        <line x1="16" y1="24" x2="48" y2="24" stroke="#d97706" strokeWidth="1.5" opacity="0.5"/>
        <line x1="14" y1="36" x2="50" y2="36" stroke="#d97706" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="32" cy="32" r="6" fill="#d97706" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "School of Design, Media & Performing Arts",
    short: "Design & Media",
    color: "#db2777",
    gradient: "linear-gradient(135deg,#db277722,#db277708)",
    programs: ["B.Des UI/UX", "BA Film", "BA Music", "M.Des"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <circle cx="20" cy="20" r="8" fill="#db2777" opacity="0.8"/>
        <circle cx="44" cy="20" r="8" fill="#f59e0b" opacity="0.8"/>
        <circle cx="32" cy="40" r="8" fill="#7c3aed" opacity="0.8"/>
        <path d="M28,20 Q32,32 36,20" stroke="#fff" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    name: "Physiotherapy",
    short: "Physiotherapy",
    color: "#0891b2",
    gradient: "linear-gradient(135deg,#0891b222,#0891b208)",
    programs: ["BPT", "MPT", "Ph.D Physio", "Sports PT"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <circle cx="32" cy="12" r="6" stroke="#0891b2" strokeWidth="2.5"/>
        <path d="M32 18 L32 38" stroke="#0891b2" strokeWidth="3" strokeLinecap="round"/>
        <path d="M32 28 L18 22" stroke="#0891b2" strokeWidth="3" strokeLinecap="round"/>
        <path d="M32 28 L46 22" stroke="#0891b2" strokeWidth="3" strokeLinecap="round"/>
        <path d="M32 38 L22 52" stroke="#0891b2" strokeWidth="3" strokeLinecap="round"/>
        <path d="M32 38 L42 52" stroke="#0891b2" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: "School of Law & Governance",
    short: "Law & Governance",
    color: "#1d4ed8",
    gradient: "linear-gradient(135deg,#1d4ed822,#1d4ed808)",
    programs: ["BA LLB", "BBA LLB", "LLM", "Cyber Law"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <line x1="32" y1="8" x2="32" y2="56" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round"/>
        <line x1="16" y1="22" x2="48" y2="22" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M16 22 L10 38" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 38 Q10 46 18 46 Q26 46 22 38 Z" fill="#1d4ed8" opacity="0.6"/>
        <path d="M48 22 L54 38" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round"/>
        <path d="M54 38 Q54 46 46 46 Q38 46 42 38 Z" fill="#1d4ed8" opacity="0.6"/>
        <rect x="28" y="52" width="8" height="4" rx="1" fill="#1d4ed8"/>
      </svg>
    ),
  },
  {
    name: "School of Architecture",
    short: "Architecture",
    color: "#78350f",
    gradient: "linear-gradient(135deg,#78350f22,#78350f08)",
    programs: ["B.Arch", "M.Arch", "Urban Design", "Interior Design"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <polygon points="32,8 8,36 56,36" stroke="#78350f" strokeWidth="2.5" fill="none"/>
        <rect x="16" y="36" width="32" height="20" stroke="#78350f" strokeWidth="2.5" fill="none"/>
        <rect x="26" y="44" width="12" height="12" rx="1" stroke="#78350f" strokeWidth="1.5" fill="none"/>
        <rect x="20" y="40" width="6" height="8" rx="1" fill="#78350f" opacity="0.5"/>
        <rect x="38" y="40" width="6" height="8" rx="1" fill="#78350f" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: "School of Agriculture",
    short: "Agriculture",
    color: "#16a34a",
    gradient: "linear-gradient(135deg,#16a34a22,#16a34a08)",
    programs: ["B.Sc Agri", "M.Sc Agri", "Horticulture", "Agribusiness"],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"64px",height:"64px"}}>
        <path d="M32 52 Q32 28 48 16" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M32 40 Q20 36 16 20 Q28 18 36 30" fill="#16a34a" opacity="0.7"/>
        <path d="M32 30 Q44 24 48 10 Q36 8 28 22" fill="#16a34a" opacity="0.5"/>
        <line x1="32" y1="52" x2="32" y2="58" stroke="#78350f" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════
   RECOGNITION CARDS DATA  (2 col × 4 row = 8 cards)
═══════════════════════════════════════════════════════════ */
const RECOGNITIONS = [
  { title: "NAAC A++ Accreditation", desc: "Highest grade awarded by the National Assessment and Accreditation Council — a testament to academic excellence, governance, and student outcomes.", img: "🏛️" },
  { title: "NIRF Top 50 Ranking", desc: "Consistently ranked among India's top 50 universities by the National Institutional Ranking Framework across multiple disciplines.", img: "🏆" },
  { title: "NBA Accreditation", desc: "National Board of Accreditation recognition for our Engineering & Technology programs, ensuring global quality benchmarks.", img: "⚙️" },
  { title: "QS World University Ranking", desc: "Recognized in the QS World University Rankings for research output, employer reputation, and international faculty diversity.", img: "🌍" },
  { title: "ISO 9001:2015 Certified", desc: "Quality management certification that guarantees consistent, process-driven education delivery across all departments.", img: "✅" },
  { title: "AICTE Approved", desc: "All technical programs are fully approved by the All India Council for Technical Education, ensuring curriculum relevance and industry alignment.", img: "📋" },
  { title: "ABET Accredited Programs", desc: "Select engineering programs carry ABET accreditation, internationally recognised across 41 countries for technical education quality.", img: "🎖️" },
  { title: "Smart India Hackathon Winners", desc: "RGU students have consistently won national-level hackathons, reflecting our culture of innovation, problem-solving, and real-world impact.", img: "💡" },
];

/* ═══════════════════════════════════════════════════════════
   UTILITY HOOK — Intersection Observer
═══════════════════════════════════════════════════════════ */
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ═══════════════════════════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════════════════════════ */
function SectionLabel({ children, color = C.blue }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
      <div style={{ width:"32px", height:"3px", background:color, borderRadius:"2px" }} />
      <span style={{ fontSize:"12px", fontWeight:"800", color, letterSpacing:"2.5px", textTransform:"uppercase" }}>{children}</span>
      <div style={{ width:"32px", height:"3px", background:color, borderRadius:"2px" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   1. HERO SECTION
═══════════════════════════════════════════════════════════ */
function Hero() {
  const CAROUSEL_SLIDES = [
    {
      top:     "ADMISSION OPEN 2026",
      tagline: "Join RGU — Where Readiness Defines Your Future.",
      sub:     "Registration Open for UG and PG Programs",
      subtag:  "Build a career that matters. Apply before seats fill up.",
    },
    {
      top:     "WORLD-CLASS EDUCATION",
      tagline: "Shaping Innovators. Inspiring Leaders.",
      sub:     "120+ Programs Across 10 Schools",
      subtag:  "From Engineering to Arts — find your perfect program at RGU.",
    },
    {
      top:     "RESEARCH & INNOVATION",
      tagline: "Where Ideas Meet Impact.",
      sub:     "50+ Research Centres. Real-World Solutions.",
      subtag:  "Join a thriving ecosystem of thinkers, creators, and changemakers.",
    },
  ];

  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(false);
      setTimeout(() => { setSlide(p => (p + 1) % CAROUSEL_SLIDES.length); setAnimating(true); }, 200);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const s = CAROUSEL_SLIDES[slide];

  return (
    <section style={{ position:"relative", height:"100vh", minHeight:"620px", overflow:"hidden" }}>

      {/* BG Video */}
      <video
        autoPlay muted loop playsInline
        style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div style={{
        position:"absolute", inset:0, zIndex:1,
        background:"linear-gradient(110deg, rgba(8,20,70,0.82) 0%, rgba(8,20,70,0.65) 50%, rgba(8,20,70,0.35) 100%)",
        animation:"videoOverlayPulse 6s ease-in-out infinite",
      }} />

      {/* Dot grid texture */}
      <div style={{
        position:"absolute", inset:0, zIndex:2, opacity:0.06,
        backgroundImage:"radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize:"36px 36px",
      }} />

      {/* ── TOP BAR ── */}
      <div style={{
        position:"absolute", top:0, left:0, right:0, zIndex:10,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"22px 36px",
      }}>
        {/* Logo */}
        <img
          src="/logo.png"
          alt="RGU Logo"
          style={{ height:"64px", objectFit:"contain", filter:"drop-shadow(0 2px 12px rgba(0,0,0,0.4))" }}
        />

        {/* Admission Enquiry Button */}
        <a href="#enquiry" style={{
          padding:"12px 28px",
          background:"linear-gradient(135deg,#f59e0b,#d97706)",
          color:"#fff", borderRadius:"50px",
          fontWeight:"800", fontSize:"14px",
          textDecoration:"none",
          boxShadow:"0 4px 20px rgba(245,158,11,0.45)",
          letterSpacing:"0.5px",
          transition:"all 0.3s",
          border:"2px solid rgba(255,255,255,0.2)",
          display:"flex", alignItems:"center", gap:"8px",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(245,158,11,0.6)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(245,158,11,0.45)"; }}
        >
          <span>📞</span> Admission Enquiry
        </a>
      </div>

      {/* ── LEFT MIDDLE — Main Copy ── */}
      <div style={{
        position:"absolute", left:"36px", top:"50%", transform:"translateY(-50%)",
        zIndex:10, maxWidth:"560px",
        opacity: animating ? 1 : 0,
        transition:"opacity 0.3s ease",
      }}>
        {/* Badge */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          background:"rgba(245,158,11,0.15)",
          border:"1px solid rgba(245,158,11,0.45)",
          borderRadius:"100px", padding:"6px 18px", marginBottom:"20px",
          backdropFilter:"blur(8px)",
        }}>
          <span style={{
            background:"#f59e0b", color:"#fff", borderRadius:"50px",
            padding:"2px 10px", fontSize:"11px", fontWeight:"800", letterSpacing:"1px"
          }}>LIVE</span>
          <span style={{ color:"#fde68a", fontSize:"12px", fontWeight:"700", letterSpacing:"1px" }}>
            {s.top}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-text-main" style={{
          fontSize:"clamp(2.4rem,4.5vw,4rem)", fontWeight:"900",
          color:"#fff", lineHeight:1.12, marginBottom:"18px",
          fontFamily:"'Playfair Display','Inter',serif",
          animation: animating ? "fadeInLeft 0.6s ease forwards" : "none",
        }}>{s.tagline}</h1>

        {/* Carousel Sub Content */}
        <div style={{
          background:"rgba(255,255,255,0.08)",
          border:"1px solid rgba(255,255,255,0.18)",
          borderRadius:"16px", padding:"20px 24px", marginBottom:"32px",
          backdropFilter:"blur(12px)",
          animation: animating ? "fadeInLeft 0.7s 0.1s ease forwards" : "none",
        }}>
          <p style={{ fontSize:"1.2rem", fontWeight:"700", color:"#fde68a", marginBottom:"8px" }}>{s.sub}</p>
          <p className="hero-tagline" style={{ fontSize:"0.95rem", color:"rgba(255,255,255,0.8)", lineHeight:1.6 }}>{s.subtag}</p>
        </div>

        {/* Slide Dots */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"28px" }}>
          {CAROUSEL_SLIDES.map((_,i) => (
            <button key={i} onClick={() => setSlide(i)} style={{
              width: i===slide ? "36px" : "10px", height:"10px",
              borderRadius:"100px", border:"none", cursor:"pointer",
              background: i===slide ? "#f59e0b" : "rgba(255,255,255,0.35)",
              transition:"all 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* ── BOTTOM LEFT — Apply Button ── */}
      <div style={{
        position:"absolute", bottom:"40px", left:"36px", zIndex:10,
        display:"flex", gap:"16px", alignItems:"center",
      }}>
        <a href="/admissions" style={{
          padding:"16px 40px",
          background:"linear-gradient(135deg,#2563eb,#1d4ed8)",
          color:"#fff", borderRadius:"50px",
          fontWeight:"800", fontSize:"16px", textDecoration:"none",
          boxShadow:"0 6px 28px rgba(37,99,235,0.5)",
          display:"flex", alignItems:"center", gap:"10px",
          transition:"all 0.3s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(37,99,235,0.65)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 28px rgba(37,99,235,0.5)"; }}
        >
          Apply Now <span style={{fontSize:"20px"}}>→</span>
        </a>
        <a href="#programs" style={{
          padding:"16px 28px",
          background:"rgba(255,255,255,0.1)",
          border:"2px solid rgba(255,255,255,0.35)",
          color:"#fff", borderRadius:"50px",
          fontWeight:"700", fontSize:"15px", textDecoration:"none",
          backdropFilter:"blur(8px)", transition:"all 0.3s",
        }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.1)"}
        >
          Explore Programs
        </a>
      </div>

      {/* ── BOTTOM RIGHT — Info Carousel Card ── */}
      <div style={{
        position:"absolute", bottom:"40px", right:"36px", zIndex:10,
        width:"320px",
      }}>
        <div style={{
          background:"rgba(255,255,255,0.1)",
          border:"1px solid rgba(255,255,255,0.2)",
          borderRadius:"20px", padding:"24px",
          backdropFilter:"blur(16px)",
          boxShadow:"0 8px 32px rgba(0,0,0,0.2)",
        }}>
          <div style={{ display:"flex", gap:"12px", marginBottom:"16px" }}>
            {[
              { icon:"🎓", label:"25,000+", sub:"Students" },
              { icon:"🏆", label:"NAAC A++", sub:"Accredited" },
              { icon:"💼", label:"98%", sub:"Placements" },
            ].map((item,i) => (
              <div key={i} style={{ flex:1, textAlign:"center" }}>
                <div style={{ fontSize:"20px", marginBottom:"4px" }}>{item.icon}</div>
                <div style={{ fontWeight:"800", color:"#fff", fontSize:"14px" }}>{item.label}</div>
                <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.65)" }}>{item.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.15)", paddingTop:"14px" }}>
            <p style={{ color:"#fde68a", fontWeight:"700", fontSize:"13px", marginBottom:"4px" }}>
              🔴 Admissions Closing Soon
            </p>
            <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"12px" }}>
              Limited seats for 2026 batch. Apply today.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute", bottom:"40px", left:"50%", transform:"translateX(-50%)",
        zIndex:10, display:"flex", flexDirection:"column", alignItems:"center", gap:"6px",
        color:"rgba(255,255,255,0.5)",
      }}>
        <span style={{ fontSize:"11px", letterSpacing:"1.5px", textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:"24px", height:"36px", border:"2px solid rgba(255,255,255,0.3)", borderRadius:"12px", display:"flex", justifyContent:"center", paddingTop:"4px" }}>
          <div style={{ width:"4px", height:"8px", background:"rgba(255,255,255,0.6)", borderRadius:"2px", animation:"scrollBounce 1.6s infinite" }} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. ACCREDITATION RIBBON
═══════════════════════════════════════════════════════════ */
function AccreditationRibbon() {
  const items = ["NAAC A++","NBA Accredited","UGC Recognized","AICTE Approved","ISO 9001:2015","NIRF Top 50","QS Ranked","ABET Certified","25,000+ Students","98% Placements"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background:C.navy, padding:"14px 0", overflow:"hidden", position:"relative" }}>
      <div style={{ display:"flex", gap:"0", width:"max-content", animation:"scrollRibbon 30s linear infinite" }}>
        {doubled.map((item,i) => (
          <span key={i} style={{
            padding:"0 40px", color:"#93c5fd", fontSize:"13px", fontWeight:"700",
            letterSpacing:"0.5px", whiteSpace:"nowrap", borderRight:"1px solid rgba(255,255,255,0.1)",
            display:"flex", alignItems:"center", gap:"8px",
          }}>
            <span style={{ color:C.gold }}>✦</span> {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes scrollRibbon { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. SCHOOLS / COURSES SECTION
═══════════════════════════════════════════════════════════ */
function SchoolsSection() {
  const [ref, visible] = useVisible(0.08);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="programs" ref={ref} style={{ padding:"100px 40px", background:"#f8faff" }}>
      <div style={{ maxWidth:"1280px", margin:"0 auto" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"64px", opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease" }}>
          <SectionLabel>Schools & Programs</SectionLabel>
          <h2 className="section-heading" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:"900", color:C.navy, lineHeight:1.15, marginBottom:"16px" }}>
            Courses Offered at RGU
          </h2>
          <p style={{ color:C.muted, fontSize:"1.1rem", maxWidth:"600px", margin:"0 auto", lineHeight:1.7 }}>
            Ten world-class schools. Hundreds of programs. One university built to transform your potential into purpose.
          </p>
        </div>

        {/* Grid */}
        <div className="schools-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:"20px" }}>
          {SCHOOLS.map((school, i) => (
            <div
              key={i}
              className="hover-lift"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: hovered===i ? school.color : "#fff",
                borderRadius:"20px", padding:"28px 20px",
                border:`2px solid ${hovered===i ? school.color : "#eef2ff"}`,
                cursor:"pointer", textAlign:"center",
                boxShadow: hovered===i ? `0 20px 48px ${school.color}40` : "0 4px 20px rgba(0,0,0,0.06)",
                transition:"all 0.35s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                transitionDelay:`${i * 60}ms`,
              }}
            >
              {/* SVG Icon */}
              <div style={{
                width:"72px", height:"72px", borderRadius:"18px",
                background: hovered===i ? "rgba(255,255,255,0.2)" : school.gradient,
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 16px",
                transition:"all 0.35s",
              }}>
                <div style={{ filter: hovered===i ? "brightness(10)" : "none", transition:"all 0.35s" }}>
                  {school.icon}
                </div>
              </div>

              <h3 style={{
                fontSize:"13px", fontWeight:"800",
                color: hovered===i ? "#fff" : C.navy,
                lineHeight:1.3, marginBottom:"10px",
                transition:"color 0.35s",
              }}>{school.name}</h3>

              {/* Programs */}
              <div style={{
                display:"flex", flexDirection:"column", gap:"4px",
                opacity: hovered===i ? 1 : 0,
                transform: hovered===i ? "translateY(0)" : "translateY(8px)",
                transition:"all 0.35s",
              }}>
                {school.programs.map((p,j) => (
                  <span key={j} style={{
                    fontSize:"11px", color: hovered===i ? "rgba(255,255,255,0.85)" : C.muted,
                    background: hovered===i ? "rgba(255,255,255,0.15)" : "transparent",
                    borderRadius:"4px", padding:"2px 6px",
                  }}>{p}</span>
                ))}
              </div>

              {hovered===i && (
                <div style={{ marginTop:"14px" }}>
                  <a href="/programs" style={{
                    display:"inline-block", padding:"8px 18px",
                    background:"rgba(255,255,255,0.25)",
                    border:"1px solid rgba(255,255,255,0.5)",
                    color:"#fff", borderRadius:"50px",
                    fontSize:"12px", fontWeight:"700", textDecoration:"none",
                  }}>Explore →</a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign:"center", marginTop:"56px", opacity: visible?1:0, transition:"opacity 0.7s 0.5s ease" }}>
          <a href="/programs" style={{
            display:"inline-flex", alignItems:"center", gap:"10px",
            padding:"16px 40px",
            background:`linear-gradient(135deg,${C.blue},${C.navy})`,
            color:"#fff", borderRadius:"50px",
            fontWeight:"800", fontSize:"15px", textDecoration:"none",
            boxShadow:`0 6px 28px ${C.blue}50`,
            transition:"all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; }}
          >
            View All 120+ Programs <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. THE RGU WAY
═══════════════════════════════════════════════════════════ */
function RGUWay() {
  const [ref, visible] = useVisible(0.1);

  const pillars = [
    { icon:"🧠", title:"Academic Rigour", desc:"Curriculum co-designed with industry leaders, blending theory with hands-on application across every discipline.", color:"#1a56db" },
    { icon:"🚀", title:"Innovation First", desc:"50+ research centres, incubators, and maker spaces where students turn ideas into real-world solutions.", color:"#7c3aed" },
    { icon:"🌐", title:"Global Perspective", desc:"Partnerships with 80+ universities worldwide, exchange programs, and international faculty across all schools.", color:"#059669" },
    { icon:"🤝", title:"Industry Connect", desc:"200+ corporate partners ensure internships, mentorship, live projects, and a 98% placement record every year.", color:"#e11d48" },
    { icon:"⚡", title:"Future-Ready Skills", desc:"Every graduate leaves with certifications in emerging technologies — AI, cloud, sustainability, and leadership.", color:"#d97706" },
    { icon:"🏆", title:"Excellence Culture", desc:"NAAC A++ accredited. Nationally ranked. Globally recognised. A legacy of high standards in everything we do.", color:"#0891b2" },
  ];

  return (
    <section style={{
      padding:"100px 40px",
      background:`linear-gradient(135deg, ${C.navy} 0%, #1a2f6e 50%, #0f2557 100%)`,
      position:"relative", overflow:"hidden",
    }}>
      {/* Background decoration */}
      <div style={{ position:"absolute", top:"-120px", right:"-120px", width:"500px", height:"500px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.05)" }} />
      <div style={{ position:"absolute", bottom:"-80px", left:"-80px", width:"400px", height:"400px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.04)" }} />
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"700px", height:"700px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.03)" }} />

      <div ref={ref} style={{ maxWidth:"1280px", margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"72px" }}>
          <SectionLabel color={C.gold}>The RGU Way</SectionLabel>
          <h2 style={{
            fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:"900", color:"#fff",
            lineHeight:1.15, marginBottom:"20px",
            animation: visible ? "fadeInUp 0.7s ease forwards" : "none",
            opacity: visible ? 1 : 0,
          }}>
            What Makes Rathinam Global
            <span style={{ display:"block", color:C.gold2, animation:"textGlow 3s infinite" }}> Different</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"1.1rem", maxWidth:"600px", margin:"0 auto", lineHeight:1.7, opacity: visible?1:0, transition:"opacity 0.7s 0.2s" }}>
            Six pillars that define our philosophy — and your transformation.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="rgu-way-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px" }}>
          {pillars.map((p,i) => (
            <div
              key={i}
              className="hover-lift"
              style={{
                background:"rgba(255,255,255,0.06)",
                border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:"20px", padding:"36px 28px",
                backdropFilter:"blur(12px)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition:`all 0.6s ease ${i*90}ms`,
                cursor:"pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor=`${p.color}80`; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}
            >
              <div style={{
                width:"56px", height:"56px", borderRadius:"14px",
                background:`${p.color}25`, border:`1px solid ${p.color}50`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"26px", marginBottom:"20px",
              }}>
                {p.icon}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
                <div style={{ width:"3px", height:"28px", background:p.color, borderRadius:"2px" }} />
                <h3 style={{ fontSize:"18px", fontWeight:"800", color:"#fff" }}>{p.title}</h3>
              </div>
              <p style={{ color:"rgba(255,255,255,0.68)", fontSize:"14px", lineHeight:1.75 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. HAPPENING @ RATHINAM
═══════════════════════════════════════════════════════════ */
function HappeningAtRathinam() {
  const [ref, visible] = useVisible(0.1);

  const events = [
    { label:"Tech Fest 2026", tag:"Upcoming", color:"#1a56db", date:"Apr 18–20", emoji:"💻" },
    { label:"Cultural Fiesta", tag:"Annual", color:"#db2777", date:"May 2–4", emoji:"🎭" },
    { label:"Sports Meet", tag:"Inter-College", color:"#059669", date:"Apr 25–28", emoji:"🏅" },
    { label:"AI Summit", tag:"Conference", color:"#7c3aed", date:"May 10", emoji:"🤖" },
    { label:"Founders Day", tag:"Celebration", color:"#d97706", date:"Jun 1", emoji:"🎓" },
    { label:"Research Expo", tag:"Innovation", color:"#0891b2", date:"Jun 5", emoji:"🔬" },
  ];

  return (
    <section style={{ padding:"100px 40px", background:"#fff" }}>
      <div ref={ref} style={{ maxWidth:"1280px", margin:"0 auto" }}>

        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"56px", flexWrap:"wrap", gap:"20px" }}>
          <div style={{ opacity: visible?1:0, transform: visible?"translateX(0)":"translateX(-30px)", transition:"all 0.7s" }}>
            <SectionLabel>Campus Life</SectionLabel>
            <h2 style={{ fontSize:"clamp(2rem,3vw,2.8rem)", fontWeight:"900", color:C.navy }}>
              Happening <span style={{ color:C.blue }}>@Rathinam</span>
            </h2>
          </div>
          <a href="/events" style={{
            padding:"12px 28px", background:"transparent",
            border:`2px solid ${C.blue}`, color:C.blue,
            borderRadius:"50px", fontWeight:"700", fontSize:"14px", textDecoration:"none",
            transition:"all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background=C.blue; e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.blue; }}
          >View All Events →</a>
        </div>

        {/* Image Placeholders Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gridTemplateRows:"auto auto", gap:"20px" }}>
          {/* Large featured card */}
          <div className="hover-lift" style={{
            gridColumn:"span 2", gridRow:"span 1",
            background:"linear-gradient(135deg,#0d1f4e,#1a56db)",
            borderRadius:"24px", padding:"48px 40px",
            minHeight:"300px", position:"relative", overflow:"hidden",
            opacity: visible?1:0, transform: visible?"scale(1)":"scale(0.95)", transition:"all 0.7s 0.1s",
            cursor:"pointer",
          }}>
            <div style={{ position:"absolute", top:"-40px", right:"-40px", width:"200px", height:"200px", borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
            <div style={{ position:"absolute", bottom:"-60px", right:"60px", width:"300px", height:"300px", borderRadius:"50%", background:"rgba(255,255,255,0.03)" }} />
            <span style={{
              display:"inline-block", background:"#f59e0b", color:"#fff",
              padding:"4px 14px", borderRadius:"50px", fontSize:"12px", fontWeight:"800",
              marginBottom:"20px", letterSpacing:"0.5px"
            }}>FEATURED EVENT</span>
            <h3 style={{ fontSize:"2rem", fontWeight:"900", color:"#fff", marginBottom:"12px", lineHeight:1.2 }}>
              TechRise 2026 — Annual Tech Festival
            </h3>
            <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"15px", lineHeight:1.7, maxWidth:"420px", marginBottom:"24px" }}>
              Three days of hackathons, robotics, AI demos, startup pitches, and music. RGU's biggest annual event.
            </p>
            <div style={{ display:"flex", gap:"24px", alignItems:"center" }}>
              <span style={{ color:"#fde68a", fontWeight:"700" }}>📅 April 18 – 20, 2026</span>
              <a href="/events" style={{ color:"#fff", fontWeight:"700", textDecoration:"none", border:"1px solid rgba(255,255,255,0.4)", padding:"8px 20px", borderRadius:"50px", fontSize:"13px" }}>Register Now →</a>
            </div>
          </div>

          {/* Small card 1 */}
          <div className="hover-lift" style={{
            background:"linear-gradient(135deg,#db2777,#9d174d)",
            borderRadius:"24px", padding:"32px 28px",
            opacity: visible?1:0, transform: visible?"scale(1)":"scale(0.95)", transition:"all 0.7s 0.2s",
            cursor:"pointer",
          }}>
            <div style={{ fontSize:"48px", marginBottom:"16px" }}>🎭</div>
            <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", padding:"3px 12px", borderRadius:"50px", fontSize:"11px", fontWeight:"700", marginBottom:"12px", display:"inline-block" }}>ANNUAL</span>
            <h3 style={{ fontSize:"1.3rem", fontWeight:"800", color:"#fff", marginBottom:"8px" }}>Cultural Fiesta</h3>
            <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"13px" }}>Dance, drama, music & fashion — celebrating arts & culture.</p>
            <p style={{ color:"#fce7f3", fontWeight:"700", fontSize:"13px", marginTop:"12px" }}>📅 May 2–4, 2026</p>
          </div>

          {/* Small cards row */}
          {events.slice(2).map((ev, i) => (
            <div key={i} className="hover-lift" style={{
              background:`linear-gradient(135deg,${ev.color}18,${ev.color}08)`,
              border:`1px solid ${ev.color}30`,
              borderRadius:"20px", padding:"28px 24px",
              opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(30px)",
              transition:`all 0.6s ease ${(i+3)*80}ms`,
              cursor:"pointer",
            }}>
              <div style={{ fontSize:"36px", marginBottom:"12px" }}>{ev.emoji}</div>
              <span style={{ background:`${ev.color}20`, color:ev.color, padding:"3px 10px", borderRadius:"50px", fontSize:"11px", fontWeight:"700", marginBottom:"10px", display:"inline-block" }}>{ev.tag}</span>
              <h3 style={{ fontSize:"1rem", fontWeight:"800", color:C.navy, marginBottom:"4px" }}>{ev.label}</h3>
              <p style={{ color:ev.color, fontWeight:"700", fontSize:"12px" }}>📅 {ev.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. LIFE @ RATHINAM
═══════════════════════════════════════════════════════════ */
function LifeAtRathinam() {
  const [ref, visible] = useVisible(0.1);

  const aspects = [
    { icon:"🏟️", title:"World-Class Campus", desc:"300-acre campus with modern labs, libraries, sports arenas, and sustainable green spaces.", color:"#1a56db" },
    { icon:"🏠", title:"Safe & Vibrant Hostels", desc:"Separate hostels for boys and girls with CCTV, Wi-Fi, 24×7 security, and nutritious dining.", color:"#059669" },
    { icon:"⚽", title:"Sports & Athletics", desc:"Cricket, football, basketball, swimming, and athletics — multiple national champions have trained here.", color:"#e11d48" },
    { icon:"🎵", title:"Arts & Culture", desc:"Clubs for music, dance, drama, photography, debate, and over 40 active student organisations.", color:"#d97706" },
    { icon:"🔬", title:"Research Opportunities", desc:"Undergraduate students actively participate in funded research projects from their first year.", color:"#7c3aed" },
    { icon:"🌱", title:"Wellness & Sustainability", desc:"Yoga center, counselling services, green energy initiatives, and a thriving eco-campus.", color:"#0891b2" },
  ];

  return (
    <section style={{
      padding:"100px 40px",
      background:"linear-gradient(170deg,#f0f4ff 0%,#fff 60%,#f8faff 100%)",
    }}>
      <div ref={ref} style={{ maxWidth:"1280px", margin:"0 auto" }}>

        <div style={{ textAlign:"center", marginBottom:"64px" }}>
          <SectionLabel>Beyond the Classroom</SectionLabel>
          <h2 style={{
            fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:"900", color:C.navy, marginBottom:"16px",
            opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(20px)", transition:"all 0.7s",
          }}>
            Life <span style={{ color:C.blue }}>@</span> Rathinam
          </h2>
          <p style={{ color:C.muted, fontSize:"1.1rem", maxWidth:"580px", margin:"0 auto", lineHeight:1.7, opacity: visible?1:0, transition:"opacity 0.7s 0.2s" }}>
            University is more than a degree. It's where you discover yourself, build friendships, and develop lifelong skills.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px" }}>
          {aspects.map((a, i) => (
            <div
              key={i}
              className="hover-lift"
              style={{
                background:"#fff", borderRadius:"20px", padding:"36px 28px",
                boxShadow:"0 4px 24px rgba(0,0,0,0.07)",
                border:"1px solid #eef2ff",
                opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(40px)",
                transition:`all 0.6s ease ${i*80}ms`,
                position:"relative", overflow:"hidden", cursor:"pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=a.color; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#eef2ff"; }}
            >
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:"4px",
                background:`linear-gradient(90deg,${a.color},${a.color}80)`,
              }} />
              <div style={{
                width:"64px", height:"64px", borderRadius:"16px",
                background:`${a.color}15`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"28px", marginBottom:"20px",
              }}>
                {a.icon}
              </div>
              <h3 style={{ fontSize:"17px", fontWeight:"800", color:C.navy, marginBottom:"10px" }}>{a.title}</h3>
              <p style={{ color:C.muted, fontSize:"14px", lineHeight:1.75 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. SPOTLIGHT PROJECTS (placeholder)
═══════════════════════════════════════════════════════════ */
function SpotlightProjects() {
  const [ref, visible] = useVisible(0.1);

  const projects = [
    { title:"HealthAI – Diagnostics Platform", school:"School of Computing & AI", award:"SIH 2026 Winner", desc:"AI-powered early disease detection system deployed in 12 rural clinics across Tamil Nadu.", icon:"🏥", color:"#7c3aed" },
    { title:"GreenGrid – Micro Renewable System", school:"School of Engineering & Tech", award:"ISRO Research Grant", desc:"Portable, solar-wind hybrid system powering remote villages without grid connectivity.", icon:"⚡", color:"#059669" },
    { title:"FinMind – Fintech Analytics", school:"School of Business & Management", award:"Best Startup 2026", desc:"ML-based personal finance optimizer recognized by the Reserve Bank Innovation Hub.", icon:"💹", color:"#1a56db" },
    { title:"CureMove – Physio Wearable", school:"Physiotherapy", award:"National Innovation Award", desc:"Smart wearable that guides physiotherapy exercises using real-time motion tracking and AI feedback.", icon:"🦾", color:"#e11d48" },
  ];

  return (
    <section style={{ padding:"100px 40px", background:"#0d1f4e", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 30% 50%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(124,58,237,0.1) 0%, transparent 50%)" }} />

      <div ref={ref} style={{ maxWidth:"1280px", margin:"0 auto", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:"64px" }}>
          <SectionLabel color={C.gold}>Innovation Hub</SectionLabel>
          <h2 style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:"900", color:"#fff", marginBottom:"16px", opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(20px)", transition:"all 0.7s" }}>
            Spotlight <span style={{ color:C.gold }}>Projects</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"1.1rem", maxWidth:"580px", margin:"0 auto", lineHeight:1.7 }}>
            Student-led innovations that are changing communities, winning awards, and attracting real investment.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"24px" }}>
          {projects.map((p,i) => (
            <div
              key={i}
              className="hover-lift"
              style={{
                background:"rgba(255,255,255,0.06)",
                border:`1px solid ${p.color}40`,
                borderRadius:"20px", padding:"36px 32px",
                backdropFilter:"blur(12px)",
                opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(40px)",
                transition:`all 0.6s ease ${i*100}ms`,
                cursor:"pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor=`${p.color}80`; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor=`${p.color}40`; }}
            >
              <div style={{ display:"flex", alignItems:"flex-start", gap:"16px", marginBottom:"16px" }}>
                <div style={{ fontSize:"36px", width:"60px", height:"60px", borderRadius:"14px", background:`${p.color}25`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{p.icon}</div>
                <div>
                  <span style={{ display:"inline-block", background:`${p.color}30`, color:p.color, padding:"3px 12px", borderRadius:"50px", fontSize:"11px", fontWeight:"800", marginBottom:"8px", letterSpacing:"0.5px" }}>
                    🏆 {p.award}
                  </span>
                  <h3 style={{ fontSize:"18px", fontWeight:"800", color:"#fff", lineHeight:1.3 }}>{p.title}</h3>
                </div>
              </div>
              <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"14px", lineHeight:1.75, marginBottom:"16px" }}>{p.desc}</p>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ color:p.color, fontSize:"12px", fontWeight:"700" }}>📚 {p.school}</span>
                <a href="/research" style={{ color:"rgba(255,255,255,0.6)", fontSize:"12px", textDecoration:"none", fontWeight:"600" }}>Learn More →</a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:"center", marginTop:"48px" }}>
          <a href="/research" style={{
            display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"14px 36px",
            border:`2px solid ${C.gold}`,
            color:C.gold, borderRadius:"50px",
            fontWeight:"700", fontSize:"15px", textDecoration:"none",
            transition:"all 0.3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background=C.gold; e.currentTarget.style.color=C.navy; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color=C.gold; }}
          >
            View All Research Projects →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. CHAIRMAN'S MESSAGE
═══════════════════════════════════════════════════════════ */
function ChairmanMessage() {
  const [ref, visible] = useVisible(0.1);

  return (
    <section style={{ padding:"100px 40px", background:"linear-gradient(135deg,#fff 0%,#f0f4ff 100%)" }}>
      <div ref={ref} style={{ maxWidth:"1100px", margin:"0 auto" }}>

        <div style={{ textAlign:"center", marginBottom:"20px" }}>
          <SectionLabel>Leadership Vision</SectionLabel>
        </div>

        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:"72px", alignItems:"center",
          opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(30px)", transition:"all 0.8s ease",
        }}>
          {/* Left — Photo placeholder + details */}
          <div style={{ textAlign:"center" }}>
            <div style={{
              width:"220px", height:"220px", borderRadius:"50%", margin:"0 auto 24px",
              background:`linear-gradient(135deg,${C.navy},${C.blue})`,
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:`0 20px 60px ${C.blue}35`,
              border:"6px solid #fff",
              position:"relative",
              fontSize:"80px",
            }}>
              🎓
              {/* Gold ring */}
              <div style={{
                position:"absolute", inset:"-16px",
                borderRadius:"50%",
                border:`3px solid ${C.gold}`,
                opacity:0.5,
              }} />
            </div>

            <h3 style={{ fontSize:"22px", fontWeight:"900", color:C.navy, marginBottom:"4px" }}>Dr. Arjun Rathinam</h3>
            <p style={{ color:C.blue, fontWeight:"700", fontSize:"14px", marginBottom:"4px" }}>Chairman & Founder</p>
            <p style={{ color:C.muted, fontSize:"13px" }}>Rathinam Global University</p>

            {/* Signature line */}
            <div style={{ width:"120px", height:"2px", background:`linear-gradient(90deg,transparent,${C.gold},transparent)`, margin:"20px auto" }} />
            <p style={{ color:C.muted, fontSize:"13px", fontStyle:"italic" }}>"Readiness is the ultimate education."</p>
          </div>

          {/* Right — Message */}
          <div>
            <h2 style={{
              fontSize:"clamp(2rem,3vw,2.8rem)", fontWeight:"900", color:C.navy,
              lineHeight:1.15, marginBottom:"28px",
              fontFamily:"'Playfair Display','Inter',serif",
            }}>
              Inspiring <span style={{ color:C.blue, display:"inline-block",
                backgroundImage:`linear-gradient(90deg,${C.blue},${C.teal})`,
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>Direction</span>
            </h2>

            <div style={{
              borderLeft:`5px solid ${C.gold}`,
              paddingLeft:"24px", marginBottom:"28px",
            }}>
              <p style={{ fontSize:"1.15rem", color:"#1e293b", lineHeight:1.85, fontStyle:"italic", fontWeight:"500" }}>
                "At Rathinam Global University, we believe that true education is not merely the transfer of knowledge — it is the cultivation of readiness. Readiness to think independently, to lead with integrity, and to adapt in a world that never stops changing."
              </p>
            </div>

            <p style={{ color:C.muted, fontSize:"15px", lineHeight:1.85, marginBottom:"20px" }}>
              We have built this institution on a singular promise: that every student who walks through our doors will leave transformed — equipped not just with a degree, but with the confidence, competence, and character to make a difference.
            </p>
            <p style={{ color:C.muted, fontSize:"15px", lineHeight:1.85, marginBottom:"32px" }}>
              With world-class faculty, cutting-edge research facilities, and an unshakeable commitment to industry relevance, RGU stands as a beacon of what Indian higher education can and should be.
            </p>

            <a href="/leadership" style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              padding:"14px 32px",
              background:`linear-gradient(135deg,${C.navy},${C.blue})`,
              color:"#fff", borderRadius:"50px",
              fontWeight:"700", fontSize:"15px", textDecoration:"none",
              boxShadow:`0 6px 24px ${C.blue}40`,
              transition:"all 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
            >
              Read Full Message →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   9. RECOGNITION SECTION (2 × 4 animated cards)
═══════════════════════════════════════════════════════════ */
function RecognitionSection() {
  const [ref, visible] = useVisible(0.08);
  const [flipped, setFlipped] = useState({});

  const toggle = (i) => setFlipped(p => ({ ...p, [i]: !p[i] }));

  return (
    <section style={{ padding:"100px 40px", background:"linear-gradient(135deg,#0d1f4e 0%,#162454 50%,#0f172a 100%)", position:"relative", overflow:"hidden" }}>
      {/* Background glow circles */}
      <div style={{ position:"absolute", top:"-100px", left:"20%", width:"400px", height:"400px", borderRadius:"50%", background:"rgba(37,99,235,0.08)", filter:"blur(60px)" }} />
      <div style={{ position:"absolute", bottom:"-100px", right:"20%", width:"400px", height:"400px", borderRadius:"50%", background:"rgba(245,158,11,0.06)", filter:"blur(60px)" }} />

      <div ref={ref} style={{ maxWidth:"1200px", margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:"72px", opacity: visible?1:0, transform: visible?"translateY(0)":"translateY(30px)", transition:"all 0.7s ease" }}>
          <SectionLabel color={C.gold}>Awards & Accreditations</SectionLabel>
          <h2 style={{ fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:"900", color:"#fff", lineHeight:1.15, marginBottom:"16px" }}>
            Recognition That <span style={{ color:C.gold2 }}>Reflects Readiness</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"1.1rem", maxWidth:"580px", margin:"0 auto", lineHeight:1.7 }}>
            Global accreditations, national rankings, and industry accolades that validate our commitment to excellence.
          </p>
        </div>

        {/* 2 × 4 Grid */}
        <div className="recognition-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"24px" }}>
          {RECOGNITIONS.map((r, i) => (
            <div
              key={i}
              onClick={() => toggle(i)}
              style={{
                borderRadius:"20px", overflow:"hidden",
                position:"relative", height:"220px",
                cursor:"pointer",
                opacity: visible?1:0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.95)",
                transition:`all 0.65s ease ${i*70}ms`,
              }}
            >
              {/* Card inner with flip */}
              <div style={{
                width:"100%", height:"100%",
                transition:"transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                transformStyle:"preserve-3d",
                transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)",
                position:"relative",
              }}>
                {/* Front */}
                <div style={{
                  position:"absolute", inset:0,
                  backfaceVisibility:"hidden",
                  background:"rgba(255,255,255,0.06)",
                  border:"1px solid rgba(255,255,255,0.12)",
                  borderRadius:"20px", padding:"32px 28px",
                  backdropFilter:"blur(10px)",
                  display:"flex", flexDirection:"column",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor="rgba(245,158,11,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; }}
                >
                  {/* Image placeholder top corner */}
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"16px" }}>
                    <div style={{
                      width:"60px", height:"60px", borderRadius:"14px",
                      background:"rgba(245,158,11,0.15)",
                      border:"1px solid rgba(245,158,11,0.3)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"28px",
                    }}>
                      {r.img}
                    </div>
                    <div style={{
                      width:"36px", height:"36px", borderRadius:"8px",
                      border:"1px solid rgba(255,255,255,0.15)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      color:"rgba(255,255,255,0.4)", fontSize:"16px",
                    }}>ℹ</div>
                  </div>

                  <h3 style={{ fontSize:"17px", fontWeight:"800", color:"#fff", marginBottom:"8px", lineHeight:1.3 }}>{r.title}</h3>
                  <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"13px", lineHeight:1.65, flex:1 }}>
                    {r.desc.length > 90 ? r.desc.slice(0,90)+"…" : r.desc}
                  </p>
                  <p style={{ color:C.gold, fontSize:"11px", fontWeight:"700", marginTop:"12px", letterSpacing:"0.5px" }}>CLICK TO LEARN MORE →</p>
                </div>

                {/* Back */}
                <div style={{
                  position:"absolute", inset:0,
                  backfaceVisibility:"hidden",
                  transform:"rotateY(180deg)",
                  background:`linear-gradient(135deg,${C.navy},${C.blue}cc)`,
                  border:"1px solid rgba(245,158,11,0.4)",
                  borderRadius:"20px", padding:"32px 28px",
                  display:"flex", flexDirection:"column", justifyContent:"center",
                }}>
                  <h3 style={{ fontSize:"16px", fontWeight:"800", color:C.gold2, marginBottom:"12px" }}>{r.title}</h3>
                  <p style={{ color:"rgba(255,255,255,0.85)", fontSize:"14px", lineHeight:1.75 }}>{r.desc}</p>
                  <p style={{ color:"rgba(255,255,255,0.4)", fontSize:"11px", fontWeight:"700", marginTop:"16px" }}>CLICK TO FLIP BACK</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .recognition-grid > div > div { perspective: 1200px; }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   10. FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background:"#070e1f", color:"#94a3b8" }}>
      {/* Top CTA band */}
      <div style={{
        background:`linear-gradient(135deg,${C.blue},${C.navy})`,
        padding:"48px 40px",
      }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"24px" }}>
          <div>
            <h3 style={{ fontSize:"1.8rem", fontWeight:"900", color:"#fff", marginBottom:"8px" }}>Ready to Begin Your Journey?</h3>
            <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"1rem" }}>Applications for the 2026–27 academic year are open now. Don't miss your seat.</p>
          </div>
          <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
            <a href="/admissions" style={{
              padding:"14px 32px", background:"#fff", color:C.blue,
              borderRadius:"50px", fontWeight:"800", fontSize:"15px", textDecoration:"none",
              boxShadow:"0 6px 24px rgba(0,0,0,0.2)", transition:"all 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}
            >Apply Online Now →</a>
            <a href="tel:+914222345678" style={{
              padding:"14px 28px",
              border:"2px solid rgba(255,255,255,0.4)",
              color:"#fff", borderRadius:"50px", fontWeight:"700", fontSize:"14px", textDecoration:"none",
              transition:"all 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}
            >📞 Call Admissions</a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"64px 40px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr 1fr", gap:"48px", marginBottom:"56px" }}>

          {/* Brand */}
          <div>
            <img src="/logo.png" alt="RGU" style={{ height:"60px", objectFit:"contain", marginBottom:"16px", filter:"brightness(1.5)" }} />
            <p style={{ fontSize:"14px", lineHeight:1.8, marginBottom:"24px" }}>
              Rathinam Global University — a leading deemed university in Coimbatore shaping future-ready graduates since 1997.
            </p>
            {/* Socials */}
            <div style={{ display:"flex", gap:"10px" }}>
              {[
                { icon:"f", bg:"#1877f2" },
                { icon:"in", bg:"#0a66c2" },
                { icon:"𝕏", bg:"#000" },
                { icon:"▶", bg:"#ff0000" },
                { icon:"📸", bg:"#e1306c" },
              ].map((s,i)=>(
                <a key={i} href="#" style={{
                  width:"36px", height:"36px", borderRadius:"10px",
                  background:s.bg, color:"#fff",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"13px", fontWeight:"800", textDecoration:"none",
                  transition:"all 0.2s", opacity:0.85,
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(0)"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {[
            {
              title:"Quick Links",
              links:["About RGU","Leadership","Accreditation","Research","Innovation Hub","Placements","Alumni","Contact"]
            },
            {
              title:"Schools",
              links:["Engineering & Tech","Computing & AI","Business & Mgmt","Health Sciences","Liberal Arts","Design & Media","Physiotherapy","Law & Governance"]
            },
            {
              title:"Admissions",
              links:["UG Programs","PG Programs","Ph.D Programs","Lateral Entry","International Students","Scholarships","Fee Structure","Enquiry Form"]
            },
            {
              title:"Contact",
              links:null,
              contact:true,
            }
          ].map((col,i) => (
            <div key={i}>
              <h4 style={{ color:"#e2e8f0", fontWeight:"800", marginBottom:"20px", fontSize:"13px", letterSpacing:"1.5px", textTransform:"uppercase" }}>{col.title}</h4>
              {col.contact ? (
                <div style={{ fontSize:"13px", lineHeight:2 }}>
                  <p>📍 Eachanari, Coimbatore<br/>Tamil Nadu – 641 021</p>
                  <p style={{ marginTop:"12px" }}>📞 <a href="tel:+914222345678" style={{ color:"#93c5fd", textDecoration:"none" }}>+91-422-234-5678</a></p>
                  <p>✉ <a href="mailto:admissions@rgu.edu.in" style={{ color:"#93c5fd", textDecoration:"none" }}>admissions@rgu.edu.in</a></p>
                  <p>🌐 <a href="https://www.rgu.edu.in" style={{ color:"#93c5fd", textDecoration:"none" }}>www.rgu.edu.in</a></p>
                </div>
              ) : (
                col.links.map(link => (
                  <a key={link} href="#" style={{
                    display:"block", color:"#94a3b8", textDecoration:"none",
                    fontSize:"13px", marginBottom:"10px", transition:"color 0.2s",
                    lineHeight:1.5,
                  }}
                    onMouseEnter={e => e.target.style.color="#60a5fa"}
                    onMouseLeave={e => e.target.style.color="#94a3b8"}
                  >{link}</a>
                ))
              )}
            </div>
          ))}
        </div>

        {/* Accreditation badges row */}
        <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", borderTop:"1px solid #1e293b", paddingTop:"28px", marginBottom:"28px" }}>
          {["NAAC A++","NBA","UGC","AICTE","ISO 9001","NIRF 50","QS","ABET"].map(badge => (
            <span key={badge} style={{
              padding:"6px 14px", background:"#1e293b",
              border:"1px solid #334155",
              borderRadius:"6px", fontSize:"11px", fontWeight:"700",
              color:"#94a3b8", letterSpacing:"0.5px",
            }}>✓ {badge}</span>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:"1px solid #1e293b", paddingTop:"24px",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:"16px", fontSize:"12px", color:"#475569"
        }}>
          <span>© 2026 Rathinam Global University. All rights reserved. Deemed to be University u/s 3 of UGC Act, 1956.</span>
          <div style={{ display:"flex", gap:"20px" }}>
            {["Privacy Policy","Terms of Use","Accessibility","Sitemap","RTI"].map(l=>(
              <a key={l} href="#" style={{ color:"#475569", textDecoration:"none", transition:"color 0.2s" }}
                onMouseEnter={e => e.target.style.color="#94a3b8"}
                onMouseLeave={e => e.target.style.color="#475569"}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   FLOATING ENQUIRY WIDGET
═══════════════════════════════════════════════════════════ */
function FloatingEnquiry() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Chat bubble */}
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          position:"fixed", bottom:"32px", right:"32px", zIndex:9000,
          width:"60px", height:"60px", borderRadius:"50%",
          background:`linear-gradient(135deg,${C.blue},${C.navy})`,
          color:"#fff", fontSize:"24px", border:"none", cursor:"pointer",
          boxShadow:"0 8px 32px rgba(37,99,235,0.5)",
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all 0.3s", animation:"pulse2 2.5s infinite",
        }}
        onMouseEnter={e => { e.currentTarget.style.animation="none"; e.currentTarget.style.transform="scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.animation="pulse2 2.5s infinite"; e.currentTarget.style.transform="scale(1)"; }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Popup */}
      {open && (
        <div style={{
          position:"fixed", bottom:"104px", right:"32px", zIndex:8999,
          width:"300px",
          background:"#fff", borderRadius:"20px",
          boxShadow:"0 24px 64px rgba(0,0,0,0.2)",
          overflow:"hidden",
          animation:"scaleIn 0.3s ease",
        }}>
          <div style={{ background:`linear-gradient(135deg,${C.navy},${C.blue})`, padding:"20px 24px" }}>
            <h4 style={{ color:"#fff", fontWeight:"800", fontSize:"16px", marginBottom:"4px" }}>Admission Enquiry</h4>
            <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"13px" }}>We reply within 24 hours</p>
          </div>
          <div style={{ padding:"20px 24px" }}>
            {["Your Name","Phone Number","Email","Interested Program"].map((ph,i) => (
              <input key={i} placeholder={ph} style={{
                display:"block", width:"100%", padding:"10px 14px",
                border:"1px solid #e2e8f0", borderRadius:"8px",
                fontSize:"13px", marginBottom:"10px", outline:"none",
                fontFamily:"'Inter',sans-serif",
              }} />
            ))}
            <button style={{
              width:"100%", padding:"12px",
              background:`linear-gradient(135deg,${C.blue},${C.navy})`,
              color:"#fff", border:"none", borderRadius:"8px",
              fontWeight:"800", fontSize:"14px", cursor:"pointer",
              transition:"all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity="0.9"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >Submit Enquiry →</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════════ */
export default function RGUHomePage() {
  return (
    <main style={{ fontFamily:"'Inter','Segoe UI',system-ui,sans-serif", margin:0, padding:0, overflowX:"hidden" }}>
      <style>{GLOBAL_STYLES}</style>

      <Hero />
      <AccreditationRibbon />
      <SchoolsSection />
      <RGUWay />
      <HappeningAtRathinam />
      <LifeAtRathinam />
      <SpotlightProjects />
      <ChairmanMessage />
      <RecognitionSection />
      <Footer />
      <FloatingEnquiry />
    </main>
  );
}
