"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════
   SVG ICON SYSTEM  — all vector, zero emoji
═══════════════════════════════════════════════════════════════════ */
const PATHS = {
  book:       ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  send:       ["M22 2L11 13","M22 2L15 22 11 13 2 9l20-7z"],
  globe:      ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z","M2 12h20","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
  users:      ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75"],
  zap:        ["M13 2 3 14h9l-1 8 10-12h-9l1-8z"],
  award:      ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z","M8.21 13.89 7 23l5-3 5 3-1.21-9.12"],
  film:       ["M19.82 2H4.18A2.18 2.18 0 0 0 2 4.18v15.64A2.18 2.18 0 0 0 4.18 22h15.64A2.18 2.18 0 0 0 22 19.82V4.18A2.18 2.18 0 0 0 19.82 2z","M7 2v20","M17 2v20","M2 12h20","M2 7h5","M2 17h5","M17 17h5","M17 7h5"],
  cpu:        ["M9 3H5a2 2 0 0 0-2 2v4","M9 3h6","M15 3h4a2 2 0 0 1 2 2v4","M21 9v6","M21 15v4a2 2 0 0 1-2 2h-4","M15 21H9","M9 21H5a2 2 0 0 1-2-2v-4","M3 15V9","M9 9h6v6H9z"],
  medal:      ["M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 13.9h7.6L12 2z"],
  cap:        ["M22 10v6","M2 10l10-5 10 5-10 5z","M6 12v5c3 3 9 3 12 0v-5"],
  flask:      ["M9 3h6l1 9H8L9 3z","M3 21h18","M8 12l-4 5h16l-4-5"],
  lightbulb:  ["M9 21h6","M9 18h6","M12 2a6 6 0 0 1 6 6c0 3.5-2 5.5-3 7H9c-1-1.5-3-3.5-3-7a6 6 0 0 1 6-6z"],
  building:   ["M3 22V8l9-6 9 6v14","M9 22v-6h6v6"],
  home:       ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"],
  target:     ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z","M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  music:      ["M9 18V5l12-2v13","M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  leaf:       ["M17 8C8 10 5.9 16.17 3.82 22","M7.77 11.31C9 8 10.74 5.8 18 5"],
  heart:      ["M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"],
  trending:   ["M22 7l-7.5 7.5-5-5L2 17","M16 7h6v6"],
  activity:   ["M22 12h-4l-3 9L9 3l-3 9H2"],
  columns:    ["M2 3h20v2H2z","M4 22h16","M6 5v17","M10 5v17","M14 5v17","M18 5v17"],
  star:       ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  settings:   ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  shield:     ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z","M9 12l2 2 4-4"],
  clipboard:  ["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2","M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"],
  badge:      ["M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 13.9h7.6z","M12 7v5","M12 15h.01"],
  mapPin:     ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z","M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  phone:      ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.62 2 2 0 0 1 3.6 1.44h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.83-1.83a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"],
  mail:       ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
  camera:     ["M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z","M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  calendar:   ["M3 4h18v18H3z","M16 2v4","M8 2v4","M3 10h18"],
  instagram:  ["M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z","M12 6.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27z","M17.796 6.465a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"],
  twitter:    ["M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"],
  linkedin:   ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z","M2 9h4v12H2z","M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  facebook:   ["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"],
  youtube:    ["M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z","M9.75 15.02l5.75-3.02-5.75-3.02v6.04z"],
  dot:        ["M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"],
};

function Icon({ name, size = 24, color = "currentColor", sw = 1.75, fill = "none" }) {
  const ps = [].concat(PATHS[name] || []);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
      stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ display:"inline-block", flexShrink:0 }}>
      {ps.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED HOOK — intersection observer for scroll-reveal
═══════════════════════════════════════════════════════════════════ */
function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ═══════════════════════════════════════════════════════════════════
   1. HERO  (full-screen bgvideo, logo, heading, carousel, CTA)
═══════════════════════════════════════════════════════════════════ */
const heroCarousel = [
  { tag: "REGISTRATIONS OPEN", line1: "UG Programs 2026", line2: "B.Tech · BBA · B.Sc · B.Des · B.Arch · B.Pharm" },
  { tag: "APPLICATIONS LIVE",  line1: "PG Programs 2026", line2: "M.Tech · MBA · M.Sc · M.Des · LLM · M.Pharm"   },
  { tag: "NOW ACCEPTING",      line1: "Ph.D Research Programs", line2: "Full-time · Part-time · Industry Ph.D"    },
  { tag: "APPLY EARLY",        line1: "Lateral Entry 2026", line2: "Direct 2nd year admissions now open"         },
];

const statsCarousel = [
  { num: "25,000+", label: "Students Enrolled"   },
  { num: "NAAC A++", label: "Accreditation Grade" },
  { num: "98%",      label: "Placement Record"    },
  { num: "80+",      label: "Global Partnerships" },
  { num: "50+",      label: "Research Centres"    },
  { num: "NIRF",     label: "Ranked Institute"     },
];

function HeroSection() {
  const [hIdx, setHIdx]     = useState(0);
  const [sIdx, setSIdx]     = useState(0);
  const [mouse, setMouse]   = useState({ x: 50, y: 50 });
  const [mounted, setMounted] = useState(false);
  const [cineGone, setCineGone] = useState(false);
  const secRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setCineGone(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setHIdx(i => (i + 1) % heroCarousel.length), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSIdx(i => (i + 1) % statsCarousel.length), 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = secRef.current;
    if (!el) return;
    const fn = (e) => {
      const r = el.getBoundingClientRect();
      setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const pX = ((mouse.x - 50) * -0.016).toFixed(3);
  const pY = ((mouse.y - 50) * -0.016).toFixed(3);
  const cur = heroCarousel[hIdx];
  const stat = statsCarousel[sIdx];

  return (
    <section ref={secRef} style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", background: "#050510" }}>

      {/* Cinematic bars */}
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"18vh", background:"#000", zIndex:60,
        transition:"transform 1s cubic-bezier(.76,0,.24,1)", transform: cineGone ? "translateY(-100%)" : "translateY(0)" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"18vh", background:"#000", zIndex:60,
        transition:"transform 1s cubic-bezier(.76,0,.24,1)", transform: cineGone ? "translateY(100%)" : "translateY(0)" }} />

      {/* BG Video + parallax */}
      <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
        <video autoPlay muted loop playsInline
          style={{ position:"absolute", width:"100%", height:"100%", objectFit:"cover",
            transform:`scale(1.08) translate(${pX}%,${pY}%)`, transition:"transform 0.3s ease-out" }}>
          <source src="/bgvideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Spotlight overlay */}
      <div style={{ position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
        background:`radial-gradient(ellipse 58vw 58vh at ${mouse.x}% ${mouse.y}%,
          transparent 0%, rgba(5,5,16,.52) 42%, rgba(5,5,16,.88) 72%, rgba(5,5,16,.97) 100%)`,
        transition:"background .06s linear" }} />

      {/* Deep colour grade */}
      <div style={{ position:"absolute", inset:0, zIndex:10, pointerEvents:"none",
        background:"linear-gradient(135deg,rgba(88,28,135,.45) 0%,rgba(0,0,0,0) 40%,rgba(7,89,133,.32) 100%)" }} />

      {/* Film grain */}
      <div style={{ position:"absolute", inset:0, zIndex:10, pointerEvents:"none", opacity:.03,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ── TOP BAR ── */}
      <div style={{ position:"absolute", top:0, left:0, right:0, zIndex:40, display:"flex", alignItems:"center",
        justifyContent:"space-between", padding:"20px 36px" }}>

        {/* Logo */}
        <div style={{ background:"rgba(255,255,255,.94)", borderRadius:14, padding:"6px 16px", display:"flex", alignItems:"center",
          boxShadow:"0 4px 20px rgba(0,0,0,.35)", backdropFilter:"blur(12px)" }}>
          <img src="/logo.png" alt="RGU" style={{ height:44, width:"auto", objectFit:"contain" }} />
        </div>

        {/* Admission Enquiry button */}
        <a href="#enquiry"
          style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"11px 24px", borderRadius:12,
            background:"linear-gradient(135deg,#a855f7,#6d28d9)", color:"#fff", fontFamily:"'Sora',sans-serif",
            fontWeight:700, fontSize:14, letterSpacing:".04em", textDecoration:"none",
            boxShadow:"0 6px 24px rgba(168,85,247,.45)", transition:"all .3s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 10px 32px rgba(168,85,247,.6)"}}
          onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 6px 24px rgba(168,85,247,.45)"}}>
          <Icon name="dot" size={8} color="#a855f7" sw={3} fill="#a855f7" />
          Admission Enquiry
        </a>
      </div>

      {/* ── CENTER-LEFT CONTENT ── */}
      <div style={{ position:"absolute", top:"50%", left:0, transform:"translateY(-50%)", zIndex:30,
        padding:"0 36px", maxWidth:680 }}>

        {/* Live dot + label */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 16px", borderRadius:100,
          background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.14)", backdropFilter:"blur(12px)",
          marginBottom:20,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition:"all .6s ease .15s" }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:"#a3e635",
            boxShadow:"0 0 0 3px rgba(163,230,53,.3)", animation:"heroPulse 2s ease-in-out infinite" }} />
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:11,
            letterSpacing:".28em", textTransform:"uppercase", color:"rgba(255,255,255,.7)" }}>
            Live — Admissions 2026
          </span>
        </div>

        {/* Main heading */}
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontWeight:900, lineHeight:.88, marginBottom:20,
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition:"all .7s ease .25s" }}>
          <span style={{ display:"block", fontSize:"clamp(2.8rem,6.5vw,5.8rem)", color:"transparent",
            WebkitTextStroke:"1px rgba(255,255,255,.28)", letterSpacing:"-.03em" }}>
            ADMISSION
          </span>
          <span style={{ display:"block", fontSize:"clamp(3.4rem,8vw,7.2rem)", color:"#fff",
            letterSpacing:"-.04em", textShadow:"0 0 80px rgba(168,85,247,.65),0 0 160px rgba(168,85,247,.25)" }}>
            OPEN 2026
          </span>
          <span style={{ display:"block", fontSize:"clamp(1.1rem,2.2vw,1.7rem)", fontWeight:600,
            letterSpacing:".01em", marginTop:12,
            background:"linear-gradient(90deg,#a3e635,#34d399,#38bdf8)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Join RGU — Where Readiness Defines Your Future.
          </span>
        </h1>

        {/* Animated carousel box */}
        <div style={{ position:"relative", overflow:"hidden", borderRadius:16, padding:"18px 24px",
          background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.12)", backdropFilter:"blur(16px)",
          marginBottom:28, maxWidth:520,
          opacity: mounted ? 1 : 0, transition:"opacity .7s ease .4s" }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:800, fontSize:10,
            letterSpacing:".3em", textTransform:"uppercase", color:"#a3e635", marginBottom:6 }}>
            {cur.tag}
          </div>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:"clamp(1.1rem,2.4vw,1.6rem)",
            color:"#fff", lineHeight:1.1, marginBottom:4, transition:"opacity .4s" }}>
            {cur.line1}
          </div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.55)", fontWeight:500 }}>
            {cur.line2}
          </div>
          {/* progress bar */}
          <div style={{ position:"absolute", bottom:0, left:0, height:2, background:"rgba(255,255,255,.1)", width:"100%" }}>
            <div key={hIdx} style={{ height:"100%", background:"linear-gradient(90deg,#a855f7,#38bdf8)",
              animation:"heroProgress 4s linear forwards" }} />
          </div>
          {/* dots */}
          <div style={{ display:"flex", gap:6, marginTop:12 }}>
            {heroCarousel.map((_, i) => (
              <button key={i} onClick={() => setHIdx(i)}
                style={{ width: i===hIdx ? 20 : 6, height:6, borderRadius:3, border:"none", cursor:"pointer",
                  background: i===hIdx ? "#a855f7" : "rgba(255,255,255,.2)", transition:"all .3s", padding:0 }} />
            ))}
          </div>
        </div>

        {/* Apply button — bottom left */}
        <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)", transition:"all .6s ease .55s" }}>
          <a href="#apply"
            style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"15px 36px", borderRadius:16,
              background:"linear-gradient(90deg,#a3e635,#34d399)", color:"#0a0a14",
              fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:16, textDecoration:"none",
              boxShadow:"0 8px 32px rgba(163,230,53,.40)", transition:"all .3s" }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.03)";e.currentTarget.style.boxShadow="0 14px 40px rgba(163,230,53,.55)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 8px 32px rgba(163,230,53,.40)"}}>
            Apply Now
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="/landing"
            style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"15px 28px", borderRadius:16,
              background:"transparent", border:"1.5px solid rgba(255,255,255,.22)", color:"rgba(255,255,255,.8)",
              fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, textDecoration:"none",
              transition:"all .3s", marginLeft:12 }}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)"}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
            Explore RGU Way →
          </a>
        </div>
      </div>

      {/* ── RIGHT CENTER — Logo Placeholder ── */}
      <div style={{ position:"absolute", top:"50%", right:60, transform:"translateY(-50%)", zIndex:30,
        opacity: mounted ? 1 : 0, transition:"opacity .8s ease .6s",
        animation: mounted ? "logoFloat 4s ease-in-out infinite" : undefined }}>
        <div style={{ position:"relative", width:240, height:140, borderRadius:18,
          background:"rgba(255,255,255,.06)", backdropFilter:"blur(20px)",
          border:"1.5px solid rgba(255,255,255,.18)",
          boxShadow:"0 0 0 1px rgba(168,85,247,.15), 0 24px 64px rgba(0,0,0,.45)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          overflow:"hidden", animation: mounted ? "logoGlow 3s ease-in-out infinite" : undefined }}>
          {/* Animated corner accents */}
          <div style={{ position:"absolute", top:10, left:10, width:18, height:18,
            borderTop:"2px solid rgba(168,85,247,.7)", borderLeft:"2px solid rgba(168,85,247,.7)", borderRadius:"4px 0 0 0" }} />
          <div style={{ position:"absolute", top:10, right:10, width:18, height:18,
            borderTop:"2px solid rgba(168,85,247,.7)", borderRight:"2px solid rgba(168,85,247,.7)", borderRadius:"0 4px 0 0" }} />
          <div style={{ position:"absolute", bottom:10, left:10, width:18, height:18,
            borderBottom:"2px solid rgba(168,85,247,.7)", borderLeft:"2px solid rgba(168,85,247,.7)", borderRadius:"0 0 0 4px" }} />
          <div style={{ position:"absolute", bottom:10, right:10, width:18, height:18,
            borderBottom:"2px solid rgba(168,85,247,.7)", borderRight:"2px solid rgba(168,85,247,.7)", borderRadius:"0 0 4px 0" }} />
          {/* Shimmer sweep */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(105deg, transparent 40%, rgba(255,255,255,.06) 50%, transparent 60%)",
            animation:"logoShimmer 2.8s ease-in-out infinite", pointerEvents:"none" }} />
          {/* Logo image — shown when file exists, hidden otherwise */}
          <img src="/banner-logo.png" alt="Logo" onError={e => { e.currentTarget.style.display="none"; e.currentTarget.nextSibling.style.display="flex"; }}
            style={{ maxWidth:200, maxHeight:110, objectFit:"contain", position:"relative", zIndex:2 }} />
          {/* Placeholder (visible until image uploaded) */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, position:"relative", zIndex:2 }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,.6)" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700, letterSpacing:".18em",
              textTransform:"uppercase", color:"rgba(255,255,255,.35)" }}>Your Logo Here</span>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, color:"rgba(255,255,255,.2)",
              letterSpacing:".1em", textTransform:"uppercase" }}>banner-logo.png</span>
          </div>
        </div>
        {/* Glow halo behind the box */}
        <div style={{ position:"absolute", inset:-20, borderRadius:30, background:"radial-gradient(ellipse at center, rgba(168,85,247,.12) 0%, transparent 70%)",
          pointerEvents:"none", zIndex:-1 }} />
      </div>

      {/* ── BOTTOM RIGHT — Stats carousel ── */}
      <div style={{ position:"absolute", bottom:36, right:36, zIndex:30,
        opacity: mounted ? 1 : 0, transition:"opacity .6s ease .7s" }}>
        <div style={{ borderRadius:20, padding:"20px 28px", background:"rgba(255,255,255,.06)",
          border:"1px solid rgba(255,255,255,.12)", backdropFilter:"blur(20px)",
          textAlign:"center", minWidth:180, position:"relative", overflow:"hidden" }}>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:900,
            fontSize:"clamp(2rem,3.5vw,2.8rem)", color:"#a3e635",
            lineHeight:1, transition:"opacity .3s" }}>
            {stat.num}
          </div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,.5)",
            fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", marginTop:4 }}>
            {stat.label}
          </div>
          <div style={{ position:"absolute", bottom:0, left:0, height:2, width:"100%", background:"rgba(255,255,255,.08)" }}>
            <div key={sIdx} style={{ height:"100%", background:"linear-gradient(90deg,#a3e635,#38bdf8)",
              animation:"heroProgress 2.8s linear forwards" }} />
          </div>
        </div>
        {/* Accreditation strip */}
        <div style={{ display:"flex", gap:8, marginTop:10, justifyContent:"flex-end", flexWrap:"wrap", maxWidth:260 }}>
          {["NAAC A++","NBA","UGC","AICTE","NIRF 50"].map(tag => (
            <span key={tag} style={{ fontSize:10, fontFamily:"'DM Sans',sans-serif", fontWeight:700,
              padding:"4px 10px", borderRadius:6, background:"rgba(255,255,255,.08)",
              border:"1px solid rgba(255,255,255,.14)", color:"rgba(255,255,255,.55)",
              letterSpacing:".08em", textTransform:"uppercase" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", zIndex:30,
        display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:9, letterSpacing:".3em",
          textTransform:"uppercase", color:"rgba(255,255,255,.25)" }}>Scroll</span>
        <div style={{ width:20, height:32, borderRadius:10, border:"1px solid rgba(255,255,255,.18)",
          display:"flex", justifyContent:"center", paddingTop:6 }}>
          <div style={{ width:3, height:8, borderRadius:2, background:"#a3e635",
            animation:"scrollDot 1.6s ease-in-out infinite" }} />
        </div>
      </div>

      {/* Ticker */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, zIndex:30, overflow:"hidden",
        borderTop:"1px solid rgba(255,255,255,.07)", background:"rgba(0,0,0,.50)", backdropFilter:"blur(16px)" }}>
        <div style={{ display:"flex", padding:"10px 0", animation:"ticker 25s linear infinite", whiteSpace:"nowrap" }}>
          {[...Array(3)].fill([
            { icon:"cap",      text:"25,000+ Students"     },
            { icon:"award",    text:"NAAC A++"             },
            { icon:"trending", text:"98% Placements"       },
            { icon:"globe",    text:"80+ Global Partners"  },
            { icon:"send",     text:"Admissions Open 2026" },
            { icon:"book",     text:"120+ Programs"        },
            { icon:"flask",    text:"50+ Research Centres" },
            { icon:"star",     text:"NIRF Top 50"          },
          ]).flat().map((item, i) => (
              <span key={i} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700,
                textTransform:"uppercase", letterSpacing:".16em", color:"rgba(255,255,255,.40)",
                marginRight:48, display:"inline-flex", alignItems:"center", gap:8 }}>
                <Icon name={item.icon} size={13} color="rgba(163,230,53,.55)" sw={2} />
                {item.text}<span style={{ color:"rgba(163,230,53,.40)" }}>◆</span>
              </span>
            ))}
        </div>
      </div>

      <style>{`
        @keyframes heroPulse  { 0%,100%{box-shadow:0 0 0 3px rgba(163,230,53,.3)} 50%{box-shadow:0 0 0 6px rgba(163,230,53,.15)} }
        @keyframes heroProgress { from{width:0} to{width:100%} }
        @keyframes scrollDot  { 0%,100%{transform:translateY(0);opacity:1} 50%{transform:translateY(10px);opacity:.3} }
        @keyframes ticker     { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }
        @keyframes logoFloat  { 0%,100%{transform:translateY(calc(-50% + 0px))} 50%{transform:translateY(calc(-50% - 8px))} }
        @keyframes logoGlow   { 0%,100%{box-shadow:0 0 0 1px rgba(168,85,247,.15),0 24px 64px rgba(0,0,0,.45),0 0 30px rgba(168,85,247,.08)} 50%{box-shadow:0 0 0 1px rgba(168,85,247,.35),0 24px 64px rgba(0,0,0,.45),0 0 50px rgba(168,85,247,.22)} }
        @keyframes logoShimmer{ 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. COURSES OFFERED
═══════════════════════════════════════════════════════════════════ */
const schoolsConfig = [
  {
    name: "School of Computing, AI & Emerging Technologies", short: "Computing & AI", color: "#a855f7",
    svg: (c) => (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="14" width="32" height="20" rx="4" stroke={c} strokeWidth="1.5"/><circle cx="24" cy="24" r="5" stroke={c} strokeWidth="1.5"/><circle cx="24" cy="24" r="2" fill={c}/><path d="M19 24h-8M37 24h-8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M24 19v-6M24 35v-6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="24" r="2" fill={c} opacity=".6"/><circle cx="37" cy="24" r="2" fill={c} opacity=".6"/></svg>),
    programs: [
      { category: "B.TECH PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Tech Computer Science and Engineering", "B.Tech Information Technology", "B.Tech Artificial Intelligence and Data Science", "B.Tech Artificial Intelligence and Machine Learning", "B.Tech CSE — Specialization in Data Science", "B.Tech CSE — Specialization in Cyber Security", "B.Tech CSE — Specialization in Cloud Computing", "B.Tech CSE — Specialization in Gaming Technology", "B.Tech CSE — Specialization in Full Stack Development", "B.Tech Mathematics and Computing", "B.Tech CSE — Specialization in Quantum Computing"] },
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Artificial Intelligence and Machine Learning", "B.Sc Computer Science", "B.Sc Computer Science (AI & Data Science)", "B.Sc Computer Science (Artificial Intelligence)", "B.Sc Computer Science (Cyber Security)", "B.Sc Computer Science (Data Science)", "B.Sc Computer Technology (Generative AI)", "B.Sc Data Science and Analytics", "B.Sc Digital and Cyber Forensics Science", "B.Sc Information Technology", "B.Sc Information Technology (Specialization in Data Science)"] },
      { category: "BCA PROGRAMMES", level: "UNDERGRADUATE", courses: ["BCA", "BCA (Artificial Intelligence)"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.Sc Artificial Intelligence and Data Science", "M.Sc Computer Science", "M.Sc Data Science and Business Analytics"] }
    ]
  },
  {
    name: "School of Engineering & Applied Technologies", short: "Engineering & Applied Tech", color: "#38bdf8",
    svg: (c) => (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="20" fill={c+"18"} stroke={c} strokeWidth="1.5" strokeDasharray="4 3"/><path d="M16 32l8-16 8 16" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="16" r="3" fill={c}/><path d="M12 36h24" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><rect x="20" y="26" width="8" height="6" rx="1" stroke={c} strokeWidth="1.5"/></svg>),
    programs: [
      { category: "UNDERGRADUATE PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Tech Mechanical Engineering", "B.Tech Civil Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Chemical Engineering", "B.Tech Biotechnology", "B.Tech Mechatronics Engineering", "B.Tech Robotics and Automation", "B.Tech Food Technology", "B.Tech Electric Vehicle Technology"] }
    ]
  },
  {
    name: "School of Business & Commerce", short: "Business & Commerce", color: "#a3e635",
    svg: (c) => (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="20" width="32" height="18" rx="3" stroke={c} strokeWidth="1.5"/><path d="M18 20v-4a6 6 0 0112 0v4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M16 32l4-4 4 4 4-4 4 4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="29" r="2" fill={c}/></svg>),
    programs: [
      { category: "BBA PROGRAMMES", level: "UNDERGRADUATE", courses: ["BBA Aviation Management", "BBA Computer Applications", "BBA Logistics"] },
      { category: "B.COM PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Com Accounting & Finance", "B.Com Banking & Insurance", "B.Com Business Process Services", "B.Com Corporate Secretorship", "B.Com Financial Services", "B.Com Information Technology", "B.Com International Business", "B.Com Professional Accounting"] },
      { category: "B.COM — AI & PROFESSIONAL SPECIALIZATIONS", level: "UNDERGRADUATE", courses: ["B.Com Computer Applications (Business Intelligence & AI)", "B.Com Computer Applications (AI-Ready Accountant)", "B.Com Financial Services (AI-Ready Account Analyst)", "B.Com Financial Services (Public Accountant)", "B.Com IT (Accounting Analytics)", "B.Com International Business (AI-Ready Business Analyst)", "B.Com Professional Accounting (Chartered Accountant)", "B.Com (AI-Ready Accountant)", "B.Com (ACCA)"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.Com Computer Applications (AI-Ready Accountant)", "M.Com General (Guaranteed Internship)", "MBA in Business Analytics and Artificial Intelligence"] }
    ]
  },
  {
    name: "School of Applied Biosciences, Food & Agri-Tech", short: "Biosciences & Agri-Tech", color: "#86efac",
    svg: (c) => (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 36V22" stroke={c} strokeWidth="2" strokeLinecap="round"/><path d="M24 22c0-8-10-10-10-10s0 10 10 10z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill={c+"20"}/><path d="M24 26c0-6 10-8 10-8s0 8-10 8z" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill={c+"20"}/><path d="M12 36h24" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    programs: [
      { category: "B.TECH PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Tech Food Technology", "B.Tech Biotechnology"] },
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Biotechnology", "B.Sc Microbiology"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.Sc Biotechnology", "M.Sc Microbiology"] }
    ]
  },
  {
    name: "School of Liberal Arts & Science", short: "Liberal Arts & Science", color: "#fb923c",
    svg: (c) => (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M12 36V16l12-6 12 6v20" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="19" y="26" width="10" height="10" rx="1" stroke={c} strokeWidth="1.5"/><path d="M19 22h10M22 18h4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    programs: [
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Mathematics"] },
      { category: "B.A PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.A English Literature"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.A English Literature", "M.A Public Administration", "M.Sc Mathematics"] }
    ]
  },
  {
    name: "School of Design, Media & Performing Arts", short: "Design, Media & Arts", color: "#34d399",
    svg: (c) => (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="14" stroke={c} strokeWidth="1.5"/><circle cx="24" cy="18" r="4" stroke={c} strokeWidth="1.5"/><path d="M16 34c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/><path d="M32 14l4-4M16 14l-4-4" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>),
    programs: [
      { category: "B.TECH PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Tech Fashion Technology"] },
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Fashion Design", "B.Sc Visual Communication (AI-Ready Animation & VFX Design)", "B.Sc Digital Media & Content Creation", "B.Sc Film Production"] },
      { category: "B.A PERFORMING ARTS", level: "UNDERGRADUATE", courses: ["B.A Theatre / Acting", "B.A Dance", "B.A Music (Vocal / Instrumental)"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.A Journalism and Mass Communication"] }
    ]
  },
  {
    name: "School of Health Sciences & Rehabilitation", short: "Health Sciences", color: "#f472b6",
    svg: (c) => (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="16" stroke={c} strokeWidth="1.5"/><path d="M24 16v16M16 24h16" stroke={c} strokeWidth="2.5" strokeLinecap="round"/><circle cx="24" cy="24" r="5" fill={c+"30"}/></svg>),
    programs: [
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Psychology", "B.Sc Behavioural Science"] },
      { category: "BBA PROGRAMMES", level: "UNDERGRADUATE", courses: ["BBA Hospital & Health Service Management"] },
      { category: "B.A PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.A Counselling Studies"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.Sc Applied Psychology", "M.Sc Clinical Psychology", "M.Sc Behavioural Science"] }
    ]
  }
];

function CoursesSection() {
  const [ref, vis] = useVisible(0.06);
  const [search, setSearch]         = useState("");
  const [activeSchool, setActiveSchool] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);
  const expandRef = useRef(null);

  const filteredSchools = useMemo(() => {
    if (!search.trim()) return schoolsConfig;
    const lower = search.toLowerCase();
    return schoolsConfig.map(sc => {
      const matchSchool = sc.name.toLowerCase().includes(lower) || sc.short.toLowerCase().includes(lower);
      const filteredProgs = sc.programs.map(p => ({
        ...p,
        courses: p.courses.filter(c => c.toLowerCase().includes(lower))
      })).filter(p => p.courses.length > 0);
      if (matchSchool || filteredProgs.length > 0)
        return { ...sc, programs: (matchSchool && filteredProgs.length === 0) ? sc.programs : filteredProgs.length > 0 ? filteredProgs : sc.programs };
      return null;
    }).filter(Boolean);
  }, [search]);

  const activeData = filteredSchools.find(s => s.name === activeSchool) || null;

  // scroll to expanded panel when a bubble is opened
  useEffect(() => {
    if (activeSchool && expandRef.current) {
      setTimeout(() => expandRef.current?.scrollIntoView({ behavior:"smooth", block:"nearest" }), 120);
    }
  }, [activeSchool]);

  // float delay cycles for bubble rows
  const floatClass = (i) => ["bubbleF0","bubbleF1","bubbleF2","bubbleF3"][i % 4];

  return (
    <section ref={ref} id="programs" style={{ background:"#07070f", padding:"100px 0 120px", position:"relative", overflow:"hidden" }}>

      {/* ── Background glows ── */}
      <div style={{ position:"absolute", top:-260, left:-220, width:700, height:700,
        background:"radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-200, right:-200, width:800, height:800,
        background:"radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:.012,
        backgroundImage:"repeating-linear-gradient(45deg,rgba(255,255,255,.9) 0,rgba(255,255,255,.9) 1px,transparent 0,transparent 50%)",
        backgroundSize:"28px 28px" }} />

      <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:10 }}>

        {/* ── Section header ── */}
        <div style={{ textAlign:"center", marginBottom:44,
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(28px)", transition:"all .8s ease" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"7px 18px", borderRadius:100,
            background:"rgba(163,230,53,.07)", border:"1px solid rgba(163,230,53,.22)", marginBottom:22 }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#a3e635", animation:"heroPulse 2s infinite" }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:11,
              letterSpacing:".28em", textTransform:"uppercase", color:"#a3e635" }}>Your Future Awaits</span>
          </div>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800,
            fontSize:"clamp(2.4rem,4.5vw,3.8rem)", color:"#f8fafc",
            letterSpacing:"-.04em", lineHeight:1.05, marginBottom:18 }}>
            Courses Offered{" "}
            <span style={{ background:"linear-gradient(90deg,#a855f7,#38bdf8)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              at RGU
            </span>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,.45)", fontSize:16,
            maxWidth:560, margin:"0 auto", lineHeight:1.75 }}>
            {schoolsConfig.length} world-class schools · {schoolsConfig.reduce((a,s)=>a+s.programs.reduce((b,p)=>b+p.courses.length,0),0)}+ programmes
          </p>
        </div>

        {/* ── Search box ── */}
        <div style={{ display:"flex", justifyContent:"center", marginBottom:60,
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(20px)", transition:"all .8s ease .15s" }}>
          <div style={{ position:"relative", width:"100%", maxWidth:580 }}>

            {/* search icon */}
            <div style={{ position:"absolute", left:22, top:"50%", transform:"translateY(-50%)",
              color: inputFocused ? "#a855f7" : "rgba(255,255,255,.35)", transition:"color .3s", pointerEvents:"none" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search programmes, schools or specializations…"
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveSchool(null); }}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              style={{ width:"100%", padding:"18px 52px 18px 58px", borderRadius:22,
                background: inputFocused ? "rgba(168,85,247,.08)" : "rgba(255,255,255,.05)",
                border:`1.5px solid ${inputFocused ? "rgba(168,85,247,.55)" : "rgba(255,255,255,.12)"}`,
                color:"#f8fafc", fontFamily:"'Sora',sans-serif", fontSize:15, outline:"none",
                transition:"all .35s", backdropFilter:"blur(16px)",
                boxShadow: inputFocused
                  ? "0 0 0 4px rgba(168,85,247,.12), 0 16px 40px rgba(0,0,0,.35)"
                  : "0 12px 32px rgba(0,0,0,.28)" }} />

            {/* clear button */}
            {search && (
              <button onClick={() => { setSearch(""); setActiveSchool(null); }}
                style={{ position:"absolute", right:18, top:"50%", transform:"translateY(-50%)",
                  background:"rgba(255,255,255,.1)", border:"none", borderRadius:8, width:28, height:28,
                  cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                  color:"rgba(255,255,255,.6)", transition:"all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.18)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)"}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            )}

            {/* result count badge */}
            {search && (
              <div style={{ position:"absolute", top:-10, right:0, fontSize:11, fontFamily:"'DM Sans',sans-serif",
                fontWeight:700, color:"#a855f7", background:"rgba(168,85,247,.15)", padding:"2px 10px",
                borderRadius:20, border:"1px solid rgba(168,85,247,.3)" }}>
                {filteredSchools.reduce((a,s)=>a+s.programs.reduce((b,p)=>b+p.courses.length,0),0)} results
              </div>
            )}
          </div>
        </div>

        {/* ── Bubble grid ── */}
        {filteredSchools.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"rgba(255,255,255,.35)" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" style={{ opacity:.4, margin:"0 auto 16px", display:"block" }}>
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <div style={{ fontFamily:"'Sora',sans-serif", fontSize:18, fontWeight:600, marginBottom:8 }}>No programmes match</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14 }}>Try a different keyword</div>
          </div>
        ) : (
          <>
            <div style={{ display:"flex", flexWrap:"wrap", gap:16, justifyContent:"center",
              opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(30px)", transition:"all .8s ease .3s" }}>
              {filteredSchools.map((sc, i) => {
                const isActive = activeSchool === sc.name;
                const totalCourses = sc.programs.reduce((a,p)=>a+p.courses.length,0);
                return (
                  /* wrapper carries the float animation so button scale doesn't fight with it */
                  <div key={sc.name}
                    className={floatClass(i)}
                    style={{ animationDelay: `${i * 0.22}s` }}>
                    <button
                      onClick={() => setActiveSchool(isActive ? null : sc.name)}
                      style={{
                        display:"flex", flexDirection:"column", alignItems:"center", gap:14,
                        padding:"28px 24px 22px", borderRadius:28, cursor:"pointer", outline:"none",
                        width: 188, minHeight: 210,
                        background: isActive
                          ? `linear-gradient(145deg, ${sc.color}22 0%, rgba(12,12,22,.92) 100%)`
                          : "rgba(255,255,255,.034)",
                        border: `1.5px solid ${isActive ? sc.color+"70" : "rgba(255,255,255,.09)"}`,
                        boxShadow: isActive
                          ? `0 0 0 3px ${sc.color}25, 0 20px 56px ${sc.color}18, inset 0 1px 0 rgba(255,255,255,.08)`
                          : "0 8px 32px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05)",
                        backdropFilter:"blur(18px)",
                        transition:"all .4s cubic-bezier(.25,.8,.25,1)",
                        transform: isActive ? "scale(1.05)" : "scale(1)",
                        position:"relative", overflow:"hidden",
                      }}
                      onMouseEnter={e => { if(!isActive){ e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.borderColor=`${sc.color}45`; e.currentTarget.style.boxShadow=`0 12px 40px ${sc.color}14, inset 0 1px 0 rgba(255,255,255,.06)`; }}}
                      onMouseLeave={e => { if(!isActive){ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.borderColor="rgba(255,255,255,.09)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05)"; }}}>

                      {/* glow blob behind icon */}
                      <div style={{ position:"absolute", top:-20, left:"50%", transform:"translateX(-50%)",
                        width:100, height:100, borderRadius:"50%",
                        background:`radial-gradient(circle, ${sc.color}22 0%, transparent 70%)`,
                        pointerEvents:"none", transition:"opacity .4s", opacity: isActive ? 1 : 0.5 }} />

                      {/* icon container */}
                      <div style={{ width:68, height:68, borderRadius:22, position:"relative",
                        background:`${sc.color}14`, border:`1.5px solid ${sc.color}35`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        boxShadow: isActive ? `0 0 22px ${sc.color}30` : "none",
                        transition:"all .4s" }}>
                        {sc.svg(sc.color)}
                        {isActive && (
                          <div style={{ position:"absolute", inset:-3, borderRadius:25,
                            border:`1.5px solid ${sc.color}50`, animation:"iconRing .9s ease-out infinite" }} />
                        )}
                      </div>

                      {/* name */}
                      <div style={{ fontFamily:"'Sora',sans-serif", fontSize:13, fontWeight:700, lineHeight:1.3,
                        color: isActive ? "#fff" : "rgba(255,255,255,.8)", textAlign:"center",
                        transition:"color .3s" }}>
                        {sc.short}
                      </div>

                      {/* count badge */}
                      <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 12px",
                        borderRadius:20, background:`${sc.color}18`, border:`1px solid ${sc.color}30` }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:sc.color, flexShrink:0 }} />
                        <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700,
                          letterSpacing:".1em", textTransform:"uppercase", color:sc.color }}>
                          {totalCourses} programmes
                        </span>
                      </div>

                      {/* chevron */}
                      <div style={{ marginTop:"auto", opacity:.6, transition:"transform .4s",
                        transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke={isActive ? sc.color : "rgba(255,255,255,.5)"} strokeWidth="2.5"
                          strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ── Expanded programme panel ── */}
            <div ref={expandRef}
              style={{
                marginTop: activeData ? 36 : 0,
                maxHeight: activeData ? "4000px" : "0px",
                opacity: activeData ? 1 : 0,
                overflow: "hidden",
                transition: "max-height 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.45s ease, margin-top 0.45s ease",
              }}>
              {activeData && (
                <div style={{ borderRadius:28, overflow:"hidden",
                  background:`linear-gradient(160deg, ${activeData.color}08 0%, rgba(10,10,20,.96) 60%)`,
                  border:`1.5px solid ${activeData.color}35`,
                  boxShadow:`0 32px 80px ${activeData.color}10, inset 0 1px 0 rgba(255,255,255,.07)` }}>

                  {/* Panel header */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                    padding:"28px 36px 24px",
                    borderBottom:`1px solid ${activeData.color}20` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                      <div style={{ width:52, height:52, borderRadius:16, background:`${activeData.color}16`,
                        border:`1.5px solid ${activeData.color}35`, display:"flex", alignItems:"center", justifyContent:"center",
                        boxShadow:`0 0 20px ${activeData.color}20` }}>
                        {activeData.svg(activeData.color)}
                      </div>
                      <div>
                        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, fontWeight:700,
                          letterSpacing:".22em", textTransform:"uppercase", color:activeData.color, marginBottom:4 }}>
                          {activeData.programs.reduce((a,p)=>a+p.courses.length,0)} Programmes Available
                        </div>
                        <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800,
                          fontSize:"clamp(1.2rem,2.5vw,1.6rem)", color:"#f8fafc", lineHeight:1.2, margin:0 }}>
                          {activeData.name}
                        </h3>
                      </div>
                    </div>
                    <button onClick={() => setActiveSchool(null)}
                      style={{ width:40, height:40, borderRadius:12, background:"rgba(255,255,255,.06)",
                        border:"1px solid rgba(255,255,255,.12)", cursor:"pointer", display:"flex",
                        alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.5)",
                        transition:"all .2s", flexShrink:0 }}
                      onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.12)"; e.currentTarget.style.color="#fff"}}
                      onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.06)"; e.currentTarget.style.color="rgba(255,255,255,.5)"}}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>

                  {/* Programme categories grid */}
                  <div style={{ padding:"32px 36px 40px",
                    display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:32 }}>
                    {activeData.programs.map((prog, pIdx) => (
                      <div key={pIdx}>
                        {/* Category label */}
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16,
                          paddingBottom:12, borderBottom:`1px solid ${activeData.color}20` }}>
                          <span style={{ width:28, height:28, borderRadius:8, background:`${activeData.color}15`,
                            border:`1px solid ${activeData.color}30`, display:"flex", alignItems:"center",
                            justifyContent:"center", fontFamily:"'Sora',sans-serif", fontSize:12,
                            fontWeight:800, color:activeData.color, flexShrink:0 }}>
                            {pIdx + 1}
                          </span>
                          <h4 style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:800,
                            letterSpacing:".14em", textTransform:"uppercase", color:"rgba(255,255,255,.75)", margin:0 }}>
                            {prog.category}
                          </h4>
                        </div>

                        {/* Course list */}
                        <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:8 }}>
                          {prog.courses.map((course, cIdx) => (
                            <li key={cIdx}
                              style={{ display:"flex", alignItems:"flex-start", gap:10,
                                padding:"12px 14px", borderRadius:10,
                                background:"rgba(255,255,255,.026)",
                                border:"1px solid rgba(255,255,255,.055)",
                                transition:"all .22s", cursor:"default" }}
                              onMouseEnter={e=>{ e.currentTarget.style.background=`${activeData.color}0d`; e.currentTarget.style.borderColor=`${activeData.color}28`; e.currentTarget.style.transform="translateX(4px)"; }}
                              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.026)"; e.currentTarget.style.borderColor="rgba(255,255,255,.055)"; e.currentTarget.style.transform="translateX(0)"; }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={activeData.color}
                                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                style={{ flexShrink:0, marginTop:2, opacity:.75 }}>
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                              <span style={{ fontFamily:"'Sora',sans-serif", fontSize:13.5, fontWeight:500,
                                color:"rgba(255,255,255,.82)", lineHeight:1.4 }}>
                                {course}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Panel footer CTA */}
                  <div style={{ padding:"20px 36px 32px", borderTop:`1px solid rgba(255,255,255,.05)`,
                    display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
                    <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.4)" }}>
                      Interested in joining {activeData.short}?
                    </span>
                    <a href="#apply"
                      style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"12px 28px",
                        borderRadius:14, background:`linear-gradient(135deg, ${activeData.color}cc, ${activeData.color})`,
                        color:"#000", fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:14,
                        textDecoration:"none", boxShadow:`0 8px 24px ${activeData.color}40`, transition:"all .3s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 14px 32px ${activeData.color}55`; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow=`0 8px 24px ${activeData.color}40`; }}>
                      Apply Now
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

      </div>

      {/* ── Keyframes for bubble floats ── */}
      <style>{`
        .bubbleF0 { animation: bFloat0 4.2s ease-in-out infinite; }
        .bubbleF1 { animation: bFloat1 5.1s ease-in-out infinite; }
        .bubbleF2 { animation: bFloat2 3.8s ease-in-out infinite; }
        .bubbleF3 { animation: bFloat3 4.7s ease-in-out infinite; }
        @keyframes bFloat0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
        @keyframes bFloat1 { 0%,100%{transform:translateY(-5px)} 50%{transform:translateY(7px)} }
        @keyframes bFloat2 { 0%,100%{transform:translateY(0px)} 33%{transform:translateY(-8px)} 66%{transform:translateY(4px)} }
        @keyframes bFloat3 { 0%,100%{transform:translateY(-3px)} 50%{transform:translateY(9px)} }
        @keyframes iconRing { 0%{opacity:.8;transform:scale(1)} 100%{opacity:0;transform:scale(1.5)} }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. THE RGU WAY  (animated pillar design)
═══════════════════════════════════════════════════════════════════ */
const pillars = [
  { icon:"book",    title:"Academic Rigour",      color:"#a855f7", desc:"Curriculum co-designed with industry leaders, blending theory with hands-on application."       },
  { icon:"send",    title:"Innovation First",      color:"#38bdf8", desc:"50+ research centres, incubators, and maker spaces turning ideas into real-world solutions."    },
  { icon:"globe",   title:"Global Perspective",    color:"#a3e635", desc:"Partnerships with 80+ universities worldwide, exchange programs, and international faculty."    },
  { icon:"users",   title:"Industry Connect",      color:"#f472b6", desc:"200+ corporate partners, internships, mentorship, live projects, and 98% placement record."     },
  { icon:"zap",     title:"Future-Ready Skills",   color:"#fb923c", desc:"Every graduate leaves with certifications in AI, cloud, sustainability, and leadership."       },
  { icon:"award",   title:"Excellence Culture",    color:"#34d399", desc:"NAAC A++ accredited. Nationally ranked. Globally recognised. A legacy of high standards."      },
];

function RGUWaySection() {
  const [ref, vis] = useVisible(0.08);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % pillars.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} id="rgu-way" style={{ background:"#080810", padding:"100px 0", position:"relative", overflow:"hidden" }}>

      {/* Radial accent */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        width:800, height:800, borderRadius:"50%", pointerEvents:"none",
        background:`radial-gradient(circle,${pillars[active].color}0A 0%,transparent 70%)`,
        transition:"background 1s ease" }} />

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>

          {/* Left text */}
          <div style={{ opacity: vis?1:0, transform: vis?"translateX(0)":"translateX(-32px)", transition:"all 1s ease" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 18px", borderRadius:100,
              background:"rgba(168,85,247,.10)", border:"1px solid rgba(168,85,247,.25)", marginBottom:24 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#a855f7", animation:"heroPulse 2s infinite" }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:11,
                letterSpacing:".28em", textTransform:"uppercase", color:"#a855f7" }}>The RGU Way</span>
            </div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:900,
              fontSize:"clamp(2.4rem,4.5vw,3.8rem)", color:"#f8fafc", letterSpacing:"-.03em",
              lineHeight:.95, marginBottom:20 }}>
              What Makes<br/>
              <span style={{ background:"linear-gradient(90deg,#38bdf8,#a855f7)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Rathinam Global
              </span><br/>Different
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,.45)",
              fontSize:16, lineHeight:1.75, maxWidth:440, marginBottom:32 }}>
              Six pillars that define our philosophy — and your transformation from student to leader.
            </p>
            <a href="/landing"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:12,
                background:"linear-gradient(135deg,#a855f7,#6d28d9)", color:"#fff",
                fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, textDecoration:"none",
                boxShadow:"0 8px 28px rgba(168,85,247,.38)", transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none"}}>
              Explore The RGU Way →
            </a>
          </div>

          {/* Right — animated pillar cards */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14,
            opacity: vis?1:0, transform: vis?"translateX(0)":"translateX(32px)", transition:"all 1s ease .2s" }}>
            {pillars.map((p, i) => (
              <div key={p.title} onClick={() => setActive(i)}
                style={{ borderRadius:20, padding:"22px 20px", border:`1px solid ${active===i ? p.color+"55" : p.color+"25"}`,
                  background: active===i ? `${p.color}12` : `${p.color}07`,
                  cursor:"pointer", transition:"all .4s cubic-bezier(.175,.885,.32,1.275)",
                  transform: active===i ? "scale(1.04)" : "none",
                  boxShadow: active===i ? `0 16px 48px ${p.color}20` : "none",
                  position:"relative", overflow:"hidden" }}>
                {/* active top line */}
                <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                  background:`linear-gradient(90deg,transparent,${p.color},transparent)`,
                  opacity: active===i ? 1 : 0, transition:"opacity .3s" }} />
                <div style={{ marginBottom:10 }}><Icon name={p.icon} size={28} color={p.color} sw={1.6} /></div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:14,
                  color:"#f8fafc", marginBottom:6, lineHeight:1.2 }}>{p.title}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,.45)",
                  lineHeight:1.6, maxHeight: active===i ? 60 : 0, overflow:"hidden", transition:"max-height .4s ease" }}>
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. HAPPENING @ RATHINAM
═══════════════════════════════════════════════════════════════════ */
const events = [
  { icon:"film",      cat:"Annual Cultural", title:"Cultural Fiesta 2026",       date:"May 2–4, 2026",    tag:"FEATURED",  color:"#a855f7" },
  { icon:"cpu",       cat:"Tech Festival",   title:"TechRise 2026",              date:"Apr 18–20, 2026",  tag:"LIVE",      color:"#38bdf8" },
  { icon:"medal",     cat:"Inter-College",   title:"Sports Meet",                date:"Apr 25–28, 2026",  tag:"UPCOMING",  color:"#a3e635" },
  { icon:"cap",       cat:"Celebration",     title:"Founders Day",               date:"Jun 1, 2026",      tag:"UPCOMING",  color:"#f472b6" },
  { icon:"flask",     cat:"Innovation",      title:"Research Expo 2026",         date:"Jun 5, 2026",      tag:"UPCOMING",  color:"#fb923c" },
  { icon:"lightbulb", cat:"Hackathon",       title:"RGU Hackathon Season 4",     date:"May 20, 2026",     tag:"REGISTER",  color:"#34d399" },
];

function HappeningSection() {
  const [ref, vis] = useVisible(0.08);
  return (
    <section ref={ref} id="happening" style={{ background:"#0c0c18", padding:"100px 0", position:"relative", overflow:"hidden" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between",
          flexWrap:"wrap", gap:20, marginBottom:52,
          opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(24px)", transition:"all .8s ease" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 18px", borderRadius:100,
              background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.25)", marginBottom:16 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", animation:"heroPulse 2s infinite" }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:11,
                letterSpacing:".28em", textTransform:"uppercase", color:"#f87171" }}>Live & Upcoming</span>
            </div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:900,
              fontSize:"clamp(2.4rem,5vw,4rem)", color:"#f8fafc", letterSpacing:"-.03em", lineHeight:1 }}>
              Happening @{" "}
              <span style={{ background:"linear-gradient(90deg,#38bdf8,#34d399)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Rathinam</span>
            </h2>
          </div>
          <a href="#" style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:14,
            color:"rgba(255,255,255,.5)", textDecoration:"none", letterSpacing:".08em",
            border:"1px solid rgba(255,255,255,.12)", padding:"10px 20px", borderRadius:10, transition:"all .3s" }}
            onMouseEnter={e=>{e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor="rgba(255,255,255,.3)"}}
            onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.5)";e.currentTarget.style.borderColor="rgba(255,255,255,.12)"}}>
            View All Events →
          </a>
        </div>

        {/* Bento grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {events.map((ev, i) => (
            <div key={ev.title}
              style={{ borderRadius:24, overflow:"hidden", border:`1px solid ${ev.color}25`,
                background:`${ev.color}08`, position:"relative", cursor:"pointer",
                transition:"all .4s cubic-bezier(.175,.885,.32,1.275)",
                opacity: vis ? 1 : 0, transitionDelay:`${i*80}ms`,
                transform: vis ? "translateY(0)" : "translateY(32px)" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px) scale(1.01)";e.currentTarget.style.boxShadow=`0 20px 60px ${ev.color}20`}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none"}}>

              {/* Image placeholder */}
              <div style={{ height:200, background:`linear-gradient(135deg,${ev.color}18,${ev.color}08)`,
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                position:"relative", borderBottom:`1px solid ${ev.color}20` }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:8 }}>
                  <Icon name={ev.icon} size={64} color={ev.color} sw={1.2} />
                </div>
                <span style={{ position:"absolute", top:14, right:14, fontSize:10, fontWeight:800,
                  padding:"4px 10px", borderRadius:6, fontFamily:"'DM Sans',sans-serif", letterSpacing:".12em",
                  background: ev.tag==="LIVE" ? "#ef4444" : ev.tag==="FEATURED" ? "#a855f7" : ev.tag==="REGISTER" ? "#a3e635" : "rgba(255,255,255,.12)",
                  color: ev.tag==="REGISTER" ? "#0a0a14" : "#fff" }}>
                  {ev.tag}
                </span>
              </div>

              <div style={{ padding:"20px 22px 24px" }}>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, fontWeight:700,
                  letterSpacing:".2em", textTransform:"uppercase", color:ev.color, marginBottom:6 }}>
                  {ev.cat}
                </p>
                <h4 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:18,
                  color:"#f8fafc", marginBottom:8, lineHeight:1.2 }}>{ev.title}</h4>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,.40)",
                  fontWeight:600, display:"flex", alignItems:"center", gap:6 }}>
                  <Icon name="calendar" size={13} color="rgba(255,255,255,.35)" sw={2} />
                  {ev.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   5. LIFE @ RATHINAM
═══════════════════════════════════════════════════════════════════ */
const lifeCards = [
  { icon:"building", title:"World-Class Campus",     sub:"300-acre modern campus",               color:"#38bdf8" },
  { icon:"home",     title:"Safe & Vibrant Hostels",  sub:"Boys & Girls, 24×7 security, Wi-Fi",   color:"#a855f7" },
  { icon:"target",   title:"Sports & Athletics",       sub:"National-level champions trained here", color:"#a3e635" },
  { icon:"music",    title:"Arts & Culture",           sub:"40+ active student organisations",      color:"#f472b6" },
  { icon:"flask",    title:"Research Opportunities",   sub:"From your very first year",             color:"#fb923c" },
  { icon:"leaf",     title:"Wellness & Sustainability",sub:"Yoga, counselling, eco-campus",         color:"#34d399" },
];

function LifeSection() {
  const [ref, vis] = useVisible(0.08);
  return (
    <section ref={ref} id="life" style={{ background:"linear-gradient(180deg,#080810,#0c0c18)", padding:"100px 0", position:"relative" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center", marginBottom:64 }}>
          <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:"all .8s ease" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 18px", borderRadius:100,
              background:"rgba(163,230,53,.08)", border:"1px solid rgba(163,230,53,.22)", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#a3e635", animation:"heroPulse 2s infinite" }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:11,
                letterSpacing:".28em", textTransform:"uppercase", color:"#a3e635" }}>Beyond the Classroom</span>
            </div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:900,
              fontSize:"clamp(2.4rem,5vw,4rem)", color:"#f8fafc", letterSpacing:"-.03em", lineHeight:1, marginBottom:20 }}>
              Life @{" "}
              <span style={{ background:"linear-gradient(90deg,#a855f7,#f472b6)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Rathinam</span>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,.45)", fontSize:16, lineHeight:1.75 }}>
              University is more than a degree. It's where you discover yourself, build friendships, and develop lifelong skills.
            </p>
          </div>
          <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:"all .8s ease .2s" }}>
            <div style={{ borderRadius:28, padding:28, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)" }}>
              {[["25,000+","Students"],["300","Acre Campus"],["40+","Student Clubs"],["98%","Satisfaction"]].map(([n,l],i) => (
                <div key={l} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"14px 0", borderBottom: i<3 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"rgba(255,255,255,.5)", fontWeight:500 }}>{l}</span>
                  <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:26,
                    background:"linear-gradient(90deg,#a3e635,#38bdf8)",
                    WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {lifeCards.map((c, i) => (
            <div key={c.title}
              style={{ borderRadius:22, padding:"28px 24px", border:`1px solid ${c.color}25`,
                background:`${c.color}07`, transition:"all .4s cubic-bezier(.175,.885,.32,1.275)",
                opacity:vis?1:0, transitionDelay:`${i*80}ms`, transform:vis?"translateY(0)":"translateY(24px)" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 20px 50px ${c.color}18`}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
              <div style={{ marginBottom:14 }}><Icon name={c.icon} size={36} color={c.color} sw={1.5} /></div>
              <h4 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:17, color:"#f8fafc", marginBottom:6 }}>{c.title}</h4>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.45)", lineHeight:1.6 }}>{c.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6. SPOTLIGHT PROJECTS
═══════════════════════════════════════════════════════════════════ */
const projects = [
  { icon:"heart",    award:"SIH 2026 Winner",         title:"HealthAI – Diagnostics Platform",    school:"School of Computing & AI",          color:"#a855f7",
    desc:"AI-powered early disease detection deployed in 12 rural clinics across Tamil Nadu." },
  { icon:"zap",      award:"ISRO Research Grant",      title:"GreenGrid – Micro Renewable System", school:"School of Engineering & Technology", color:"#38bdf8",
    desc:"Portable solar-wind hybrid powering remote villages without grid connectivity." },
  { icon:"trending", award:"Best Startup 2026",        title:"FinMind – Fintech Analytics",        school:"School of Business & Management",    color:"#a3e635",
    desc:"ML-based personal finance optimizer recognised by the Reserve Bank Innovation Hub." },
  { icon:"activity", award:"National Innovation Award",title:"CureMove – Physio Wearable",         school:"Physiotherapy",                      color:"#f472b6",
    desc:"Smart wearable guiding physiotherapy exercises with real-time AI motion tracking." },
];

function SpotlightSection() {
  const [ref, vis] = useVisible(0.08);
  return (
    <section ref={ref} id="innovation" style={{ background:"#080810", padding:"100px 0", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        width:600, height:600, borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle,rgba(168,85,247,.06) 0%,transparent 70%)" }} />
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>

        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between",
          flexWrap:"wrap", gap:20, marginBottom:52,
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:"all .8s ease" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 18px", borderRadius:100,
              background:"rgba(168,85,247,.08)", border:"1px solid rgba(168,85,247,.22)", marginBottom:16 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#a855f7", animation:"heroPulse 2s infinite" }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:11,
                letterSpacing:".28em", textTransform:"uppercase", color:"#a855f7" }}>Innovation Hub</span>
            </div>
            <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:900,
              fontSize:"clamp(2.4rem,5vw,4rem)", color:"#f8fafc", letterSpacing:"-.03em" }}>
              Spotlight{" "}
              <span style={{ background:"linear-gradient(90deg,#a855f7,#f472b6)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Projects</span>
            </h2>
          </div>
          <a href="#" style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:14,
            color:"rgba(255,255,255,.5)", textDecoration:"none",
            border:"1px solid rgba(255,255,255,.12)", padding:"10px 20px", borderRadius:10, transition:"all .3s" }}
            onMouseEnter={e=>{e.currentTarget.style.color="#fff"}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.5)"}}>
            View All Research Projects →
          </a>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20 }}>
          {projects.map((p, i) => (
            <div key={p.title}
              style={{ borderRadius:24, padding:28, border:`1px solid ${p.color}28`,
                background:`${p.color}07`, position:"relative", overflow:"hidden", cursor:"pointer",
                transition:"all .4s", opacity:vis?1:0, transitionDelay:`${i*100}ms`,
                transform:vis?"translateY(0)":"translateY(24px)" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow=`0 24px 60px ${p.color}20`}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none"}}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                background:`linear-gradient(90deg,${p.color},transparent)`, opacity:.6 }} />
              <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:16 }}>
                <div style={{ width:56, height:56, borderRadius:16, background:`${p.color}18`,
                  border:`1px solid ${p.color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name={p.icon} size={28} color={p.color} sw={1.6} />
                </div>
                <div>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:10,
                    fontFamily:"'DM Sans',sans-serif", fontWeight:800, letterSpacing:".1em",
                    color:p.color, marginBottom:6, padding:"3px 10px", borderRadius:6,
                    background:`${p.color}18`, border:`1px solid ${p.color}28` }}>
                    <Icon name="award" size={11} color={p.color} sw={2} fill={p.color} />
                    {p.award}
                  </span>
                  <h4 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:20,
                    color:"#f8fafc", lineHeight:1.2 }}>{p.title}</h4>
                </div>
              </div>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"rgba(255,255,255,.50)",
                lineHeight:1.7, marginBottom:16 }}>{p.desc}</p>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:p.color }} />
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,.35)",
                  fontWeight:600 }}>{p.school}</span>
                <span style={{ marginLeft:"auto", fontSize:12, fontFamily:"'Sora',sans-serif",
                  fontWeight:700, color:p.color }}>Learn More →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   7. CHAIRMAN'S MESSAGE
═══════════════════════════════════════════════════════════════════ */
function ChairmanSection() {
  const [ref, vis] = useVisible(0.12);
  return (
    <section ref={ref} id="chairman" style={{ background:"linear-gradient(180deg,#0c0c18,#080810)", padding:"100px 0", position:"relative", overflow:"hidden" }}>
      {/* Large faded RGU watermark */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:"22vw", color:"rgba(255,255,255,.018)",
        pointerEvents:"none", letterSpacing:"-.05em", whiteSpace:"nowrap", userSelect:"none" }}>
        RGU
      </div>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:10 }}>

        <div style={{ textAlign:"center", marginBottom:60,
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:"all .8s ease" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 18px", borderRadius:100,
            background:"rgba(251,191,36,.08)", border:"1px solid rgba(251,191,36,.22)", marginBottom:20 }}>
            <Icon name="cap" size={14} color="#fbbf24" sw={2} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:11,
              letterSpacing:".28em", textTransform:"uppercase", color:"#fbbf24" }}>Leadership Vision</span>
          </div>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:900,
            fontSize:"clamp(2.4rem,5vw,4rem)", color:"#f8fafc", letterSpacing:"-.03em" }}>
            Inspiring{" "}
            <span style={{ background:"linear-gradient(90deg,#fbbf24,#fb923c)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Direction</span>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"340px 1fr", gap:64, alignItems:"center" }}>

          {/* Left — photo + name card */}
          <div style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(-32px)", transition:"all 1s ease .15s" }}>
            {/* Photo placeholder */}
            <div style={{ borderRadius:28, overflow:"hidden", marginBottom:24, position:"relative",
              border:"1px solid rgba(251,191,36,.2)", boxShadow:"0 24px 80px rgba(251,191,36,.12)" }}>
              <div style={{ height:380, background:"linear-gradient(135deg,rgba(251,191,36,.12),rgba(168,85,247,.10))",
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:100, height:100, borderRadius:"50%", background:"rgba(251,191,36,.15)",
                  border:"2px solid rgba(251,191,36,.3)", display:"flex", alignItems:"center",
                  justifyContent:"center", marginBottom:16 }}>
                  <Icon name="cap" size={48} color="rgba(251,191,36,.6)" sw={1.4} />
                </div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,.3)",
                  letterSpacing:".12em", textTransform:"uppercase" }}>Chairman's Photo</div>
              </div>
              {/* Bottom overlay */}
              <div style={{ background:"linear-gradient(to top,rgba(5,5,16,.95) 0%,transparent 100%)",
                position:"absolute", bottom:0, left:0, right:0, padding:"24px 20px" }}>
                <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:20, color:"#f8fafc" }}>
                  Dr. Arjun Rathinam
                </div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.5)", marginTop:4 }}>
                  Chairman & Founder
                </div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#fbbf24", fontWeight:600, marginTop:2 }}>
                  Rathinam Global University
                </div>
              </div>
            </div>

            {/* Quote chip */}
            <div style={{ borderRadius:16, padding:"16px 20px", background:"rgba(251,191,36,.08)",
              border:"1px solid rgba(251,191,36,.2)", textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:4, color:"#fbbf24" }}>"</div>
              <p style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:16,
                color:"rgba(255,255,255,.8)", lineHeight:1.4, fontStyle:"italic" }}>
                Readiness is the ultimate education.
              </p>
            </div>
          </div>

          {/* Right — message */}
          <div style={{ opacity:vis?1:0, transform:vis?"translateX(0)":"translateX(32px)", transition:"all 1s ease .3s" }}>
            <div style={{ fontSize:60, color:"rgba(251,191,36,.25)", fontFamily:"Georgia,serif",
              lineHeight:1, marginBottom:-16 }}>"</div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:18, color:"rgba(255,255,255,.75)",
              lineHeight:1.9, marginBottom:24 }}>
              At Rathinam Global University, we believe that true education is not merely the transfer of knowledge —
              it is the cultivation of <span style={{ color:"#fbbf24", fontWeight:700 }}>readiness</span>. Readiness to think
              independently, to lead with integrity, and to adapt in a world that never stops changing.
            </p>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:17, color:"rgba(255,255,255,.55)",
              lineHeight:1.9, marginBottom:28 }}>
              We have built this institution on a singular promise: that every student who walks through our doors will
              leave transformed — equipped not just with a degree, but with the{" "}
              <span style={{ color:"#f8fafc", fontWeight:600 }}>confidence, competence, and character</span>{" "}
              to make a difference.
            </p>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:17, color:"rgba(255,255,255,.55)", lineHeight:1.9, marginBottom:36 }}>
              With world-class faculty, cutting-edge research facilities, and an unshakeable commitment to industry
              relevance, RGU stands as a beacon of what Indian higher education can and should be.
            </p>
            <a href="#"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:12,
                border:"1.5px solid rgba(251,191,36,.3)", color:"#fbbf24",
                fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, textDecoration:"none", transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(251,191,36,.1)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
              Read Full Message →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   8. RECOGNITION — 2×4 ANIMATED FLIP CARDS
═══════════════════════════════════════════════════════════════════ */
const recognitions = [
  { icon:"columns",   title:"NAAC A++ Accreditation",      desc:"Highest grade awarded by the National Assessment and Accreditation Council — a testament to academic excellence, governance, and student outcomes.",         color:"#a855f7" },
  { icon:"star",      title:"NIRF Top 50 Ranking",          desc:"Consistently ranked among India's top 50 universities by the National Institutional Ranking Framework across multiple disciplines.",                         color:"#38bdf8" },
  { icon:"settings",  title:"NBA Accreditation",             desc:"National Board of Accreditation recognition for Engineering & Technology programs, ensuring global quality benchmarks are met.",                             color:"#a3e635" },
  { icon:"globe",     title:"QS World University Ranking",   desc:"Recognised in the QS World Rankings for research output, employer reputation, and international faculty diversity.",                                          color:"#f472b6" },
  { icon:"shield",    title:"ISO 9001:2015 Certified",       desc:"Quality management certification guaranteeing consistent, process-driven education delivery across all departments and schools.",                             color:"#fb923c" },
  { icon:"clipboard", title:"AICTE Approved",                desc:"All technical programs are fully approved by the All India Council for Technical Education, ensuring curriculum relevance and industry alignment.",           color:"#34d399" },
  { icon:"badge",     title:"ABET Accredited Programs",      desc:"Select engineering programs carry ABET accreditation, internationally recognised across 41 countries for technical education quality.",                      color:"#fbbf24" },
  { icon:"lightbulb", title:"Smart India Hackathon Winners", desc:"RGU students have consistently won national-level hackathons, reflecting our culture of innovation, problem-solving, and real-world impact.",               color:"#e879f9" },
];

function FlipCard({ card, delay, vis }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{ perspective:1200, height:280, cursor:"pointer",
        opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(32px)",
        transition:`opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms` }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div style={{ position:"relative", width:"100%", height:"100%",
        transformStyle:"preserve-3d", transition:"transform .65s cubic-bezier(.175,.885,.32,1.275)",
        transform: flipped ? "rotateY(180deg)" : "none" }}>

        {/* Front */}
        <div style={{ position:"absolute", inset:0, borderRadius:24, backfaceVisibility:"hidden",
          border:`1px solid ${card.color}30`, background:`${card.color}08`,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          padding:"28px 24px", textAlign:"center", overflow:"hidden" }}>
          {/* Icon box */}
          <div style={{ width:64, height:64, borderRadius:18, background:`${card.color}18`,
            border:`1px solid ${card.color}30`, display:"flex", alignItems:"center",
            justifyContent:"center", marginBottom:16 }}>
            <Icon name={card.icon} size={30} color={card.color} sw={1.5} />
          </div>
          <h4 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:16,
            color:"#f8fafc", lineHeight:1.25, marginBottom:10 }}>{card.title}</h4>
          <div style={{ fontSize:11, fontFamily:"'DM Sans',sans-serif", color:card.color,
            fontWeight:600, letterSpacing:".12em", textTransform:"uppercase" }}>
            CLICK TO LEARN MORE →
          </div>
          {/* Bottom glow line */}
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2,
            background:`linear-gradient(90deg,transparent,${card.color},transparent)`, opacity:.5 }} />
        </div>

        {/* Back */}
        <div style={{ position:"absolute", inset:0, borderRadius:24, backfaceVisibility:"hidden",
          transform:"rotateY(180deg)", border:`1px solid ${card.color}50`,
          background:`linear-gradient(135deg,${card.color}15,${card.color}08)`,
          display:"flex", flexDirection:"column", justifyContent:"center",
          padding:"28px 24px", textAlign:"center" }}>
          <div style={{ marginBottom:12 }}><Icon name={card.icon} size={36} color={card.color} sw={1.4} /></div>
          <h4 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:16,
            color:card.color, lineHeight:1.25, marginBottom:14 }}>{card.title}</h4>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.65)",
            lineHeight:1.7 }}>{card.desc}</p>
        </div>
      </div>
    </div>
  );
}

function RecognitionSection() {
  const [ref, vis] = useVisible(0.08);
  return (
    <section ref={ref} id="recognition" style={{ background:"#0c0c18", padding:"100px 0", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:.02,
        backgroundImage:"linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
        backgroundSize:"60px 60px" }} />
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 32px" }}>

        <div style={{ textAlign:"center", marginBottom:64,
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(24px)", transition:"all .8s ease" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"8px 18px", borderRadius:100,
            background:"rgba(251,191,36,.08)", border:"1px solid rgba(251,191,36,.22)", marginBottom:20 }}>
            <Icon name="award" size={14} color="#fbbf24" sw={2} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:700, fontSize:11,
              letterSpacing:".28em", textTransform:"uppercase", color:"#fbbf24" }}>Awards & Accreditations</span>
          </div>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:900,
            fontSize:"clamp(2.4rem,5vw,4rem)", color:"#f8fafc", letterSpacing:"-.03em", marginBottom:16 }}>
            Recognition That Reflects{" "}
            <span style={{ background:"linear-gradient(90deg,#fbbf24,#fb923c)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Readiness</span>
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,.45)", fontSize:17,
            maxWidth:560, margin:"0 auto" }}>
            Global accreditations, national rankings, and industry accolades — hover any card to learn more.
          </p>
        </div>

        {/* 2×4 grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }}>
          {recognitions.map((card, i) => (
            <FlipCard key={card.title} card={card} delay={i * 70} vis={vis} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   9. CTA BANNER
═══════════════════════════════════════════════════════════════════ */
function CTABanner() {
  const [ref, vis] = useVisible(0.15);
  return (
    <section ref={ref} style={{ background:"#080810", padding:"80px 0" }}>
      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 32px", textAlign:"center" }}>
        <div style={{ borderRadius:32, padding:"64px 48px", position:"relative", overflow:"hidden",
          background:"linear-gradient(135deg,rgba(168,85,247,.12),rgba(56,189,248,.08))",
          border:"1px solid rgba(168,85,247,.2)",
          opacity:vis?1:0, transform:vis?"scale(1)":"scale(.96)", transition:"all .8s ease" }}>
          {/* Top gradient line */}
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
            background:"linear-gradient(90deg,transparent,#a855f7,#38bdf8,#a3e635,transparent)" }} />
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:900,
            fontSize:"clamp(2rem,4vw,3.2rem)", color:"#f8fafc", letterSpacing:"-.03em", marginBottom:16 }}>
            Ready to Begin Your Journey?
          </h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif", color:"rgba(255,255,255,.5)", fontSize:17,
            lineHeight:1.7, maxWidth:560, margin:"0 auto 36px" }}>
            Applications for the 2026–27 academic year are open. Secure your place at RGU before seats fill up.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#apply"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"15px 36px", borderRadius:14,
                background:"linear-gradient(90deg,#a3e635,#34d399)", color:"#0a0a14",
                fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:16, textDecoration:"none",
                boxShadow:"0 8px 32px rgba(163,230,53,.35)", transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px) scale(1.02)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none"}}>
              Apply Online Now →
            </a>
            <a href="tel:+914222345678"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"15px 28px", borderRadius:14,
                border:"1.5px solid rgba(255,255,255,.2)", color:"rgba(255,255,255,.8)",
                fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:15, textDecoration:"none", transition:"all .3s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.08)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent"}}>
              <Icon name="phone" size={16} color="rgba(255,255,255,.8)" sw={2} />
              Call Admissions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   10. FOOTER
═══════════════════════════════════════════════════════════════════ */
function FooterSection() {
  const quickLinks = ["About RGU","Leadership","Accreditation","Research","Innovation Hub","Placements","Alumni","Contact"];
  const schoolLinks = ["Engineering & Tech","Computing & AI","Business & Mgmt","Health Sciences","Liberal Arts","Design & Media","Physiotherapy","Law & Governance"];
  const admissionLinks = ["UG Programs","PG Programs","Ph.D Programs","Lateral Entry","International Students","Scholarships","Fee Structure","Enquiry Form"];
  return (
    <footer id="contact" style={{ background:"#050508", borderTop:"1px solid rgba(255,255,255,.06)" }}>
      {/* 5-colour accent stripe */}
      <div style={{ height:3, display:"flex" }}>
        {["#a855f7","#38bdf8","#a3e635","#f472b6","#fb923c"].map(c=>(
          <div key={c} style={{ flex:1, background:c }} />
        ))}
      </div>

      <div style={{ maxWidth:1280, margin:"0 auto", padding:"60px 32px 0" }}>
        <div style={{ display:"grid", gridTemplateColumns:"240px 1fr 1fr 1fr 260px", gap:40, marginBottom:48 }}>

          {/* Brand */}
          <div>
            <div style={{ background:"rgba(255,255,255,.95)", borderRadius:12, padding:"8px 14px",
              display:"inline-flex", alignItems:"center", marginBottom:20, boxShadow:"0 4px 16px rgba(0,0,0,.3)" }}>
              <img src="/logo.png" alt="RGU" style={{ height:36, width:"auto", objectFit:"contain" }} />
            </div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.35)",
              lineHeight:1.8, marginBottom:20 }}>
              Rathinam Global University — a leading deemed university in Coimbatore shaping future-ready graduates since 1997.
            </p>
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              {[
                { key:"twitter",   label:"X / Twitter" },
                { key:"linkedin",  label:"LinkedIn"     },
                { key:"facebook",  label:"Facebook"     },
                { key:"youtube",   label:"YouTube"      },
                { key:"instagram", label:"Instagram"    },
              ].map(s=>(
                <a key={s.key} href="#" aria-label={s.label}
                  style={{ width:36, height:36, borderRadius:10, display:"flex", alignItems:"center",
                    justifyContent:"center", background:"rgba(255,255,255,.05)",
                    border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.4)",
                    textDecoration:"none", transition:"all .3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.12)";e.currentTarget.style.color="#fff"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.05)";e.currentTarget.style.color="rgba(255,255,255,.4)"}}>
                  <Icon name={s.key} size={16} color="currentColor" sw={1.8} />
                </a>
              ))}
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {["NAAC A++","NBA","UGC","AICTE","ISO 9001","NIRF 50","QS","ABET"].map(t=>(
                <span key={t} style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:9,
                  fontFamily:"'DM Sans',sans-serif", fontWeight:700, padding:"3px 7px", borderRadius:5,
                  background:"rgba(163,230,53,.08)", border:"1px solid rgba(163,230,53,.18)",
                  color:"rgba(163,230,53,.7)", letterSpacing:".06em" }}>
                  <svg width="7" height="7" viewBox="0 0 10 10" fill="none" stroke="rgba(163,230,53,.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 5l2 2 4-4"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:11,
              letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginBottom:20 }}>Quick Links</h5>
            <ul style={{ listStyle:"none", padding:0, margin:0 }}>
              {quickLinks.map(l=>(
                <li key={l} style={{ marginBottom:10 }}>
                  <a href="#" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.40)",
                    textDecoration:"none", transition:"color .2s", display:"flex", alignItems:"center", gap:6 }}
                    onMouseEnter={e=>{e.currentTarget.style.color="rgba(255,255,255,.8)"}}
                    onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.40)"}}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Schools */}
          <div>
            <h5 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:11,
              letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginBottom:20 }}>Schools</h5>
            <ul style={{ listStyle:"none", padding:0, margin:0 }}>
              {schoolLinks.map(l=>(
                <li key={l} style={{ marginBottom:10 }}>
                  <a href="#" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.40)",
                    textDecoration:"none", transition:"color .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.color="rgba(255,255,255,.8)"}}
                    onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.40)"}}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions */}
          <div>
            <h5 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:11,
              letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginBottom:20 }}>Admissions</h5>
            <ul style={{ listStyle:"none", padding:0, margin:0 }}>
              {admissionLinks.map(l=>(
                <li key={l} style={{ marginBottom:10 }}>
                  <a href="#" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.40)",
                    textDecoration:"none", transition:"color .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.color="rgba(255,255,255,.8)"}}
                    onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.40)"}}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:11,
              letterSpacing:".2em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginBottom:20 }}>Contact</h5>
            {[
              { icon:"mapPin", val:"Eachanari, Coimbatore\nTamil Nadu – 641 021" },
              { icon:"phone",  val:"+91-422-234-5678"     },
              { icon:"mail",   val:"admissions@rgu.edu.in"},
              { icon:"globe",  val:"www.rgu.edu.in"        },
            ].map(c=>(
              <div key={c.icon} style={{ display:"flex", gap:10, marginBottom:16, alignItems:"flex-start" }}>
                <span style={{ marginTop:2, flexShrink:0 }}>
                  <Icon name={c.icon} size={14} color="rgba(255,255,255,.4)" sw={2} />
                </span>
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.45)",
                  lineHeight:1.6, whiteSpace:"pre-line" }}>{c.val}</span>
              </div>
            ))}
            <Link href="/landing"
              style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10,
                background:"rgba(168,85,247,.12)", border:"1px solid rgba(168,85,247,.25)",
                color:"#c084fc", fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:13,
                textDecoration:"none", transition:"all .3s", marginTop:8 }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(168,85,247,.2)"}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(168,85,247,.12)"}}>
              Visit RGU Way Page →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,.06)", padding:"24px 0",
          display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"rgba(255,255,255,.22)" }}>
            © 2026 Rathinam Global University. All rights reserved. Deemed to be University u/s 3 of UGC Act, 1956.
          </p>
          <div style={{ display:"flex", gap:24 }}>
            {["Privacy Policy","Terms of Use","Accessibility","Sitemap","RTI"].map(l=>(
              <a key={l} href="#" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12,
                color:"rgba(255,255,255,.22)", textDecoration:"none", transition:"color .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.color="rgba(255,255,255,.55)"}}
                onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.22)"}}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE EXPORT
═══════════════════════════════════════════════════════════════════ */
export default function AdmissionHomepage() {
  return (
    <>
      <HeroSection />
      <CoursesSection />
      <RGUWaySection />
      <HappeningSection />
      <LifeSection />
      <SpotlightSection />
      <ChairmanSection />
      <RecognitionSection />
      <CTABanner />
      <FooterSection />
    </>
  );
}
