"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* ─── School data (neon colours matching home page) ─── */
const schoolsData = [
  {
    name: "School of Computing, AI & Emerging Technologies",
    short: "Computing, AI & Emerging Technologies",
    slug: "computing-ai",
    color: "#b800ff", colorHi: "#e040ff",
    programs: [
      { category: "B.TECH PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Tech Computer Science and Engineering", "B.Tech Information Technology", "B.Tech Artificial Intelligence and Data Science", "B.Tech Artificial Intelligence and Machine Learning", "B.Tech CSE — Specialization in Data Science", "B.Tech CSE — Specialization in Cyber Security", "B.Tech CSE — Specialization in Cloud Computing", "B.Tech CSE — Specialization in Gaming Technology", "B.Tech CSE — Specialization in Full Stack Development", "B.Tech Mathematics and Computing", "B.Tech CSE — Specialization in Quantum Computing"] },
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Artificial Intelligence and Machine Learning", "B.Sc Computer Science", "B.Sc Computer Science (AI & Data Science)", "B.Sc Computer Science (Artificial Intelligence)", "B.Sc Computer Science (Cyber Security)", "B.Sc Computer Science (Data Science)", "B.Sc Computer Technology (Generative AI)", "B.Sc Data Science and Analytics", "B.Sc Digital and Cyber Forensics Science", "B.Sc Information Technology", "B.Sc Information Technology (Specialization in Data Science)"] },
      { category: "BCA PROGRAMMES", level: "UNDERGRADUATE", courses: ["BCA", "BCA (Artificial Intelligence)"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.Sc Artificial Intelligence and Data Science", "M.Sc Computer Science", "M.Sc Data Science and Business Analytics"] }
    ]
  },
  {
    name: "School of Engineering & Applied Technologies",
    short: "Engineering & Applied Technologies",
    slug: "engineering",
    color: "#0099ff", colorHi: "#40d0ff",
    programs: [
      { category: "UNDERGRADUATE PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Tech Mechanical Engineering", "B.Tech Civil Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Chemical Engineering", "B.Tech Biotechnology", "B.Tech Mechatronics Engineering", "B.Tech Robotics and Automation", "B.Tech Food Technology", "B.Tech Electric Vehicle Technology"] }
    ]
  },
  {
    name: "School of Business & Commerce",
    short: "Business & Commerce",
    slug: "business",
    color: "#88dd00", colorHi: "#ccff00",
    programs: [
      { category: "BBA PROGRAMMES", level: "UNDERGRADUATE", courses: ["BBA General", "BBA Aviation Management", "BBA Computer Applications", "BBA Logistics"] },
      { category: "B.COM PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Com Accounting & Finance", "B.Com Banking & Insurance", "B.Com Business Process Services", "B.Com Corporate Secretorship", "B.Com Financial Services", "B.Com Information Technology", "B.Com International Business", "B.Com Professional Accounting", "B.Com Professional Accounting (CA Training)"] },
      { category: "B.COM — AI & PROFESSIONAL SPECIALIZATIONS", level: "UNDERGRADUATE", courses: ["B.Com Computer Applications (Business Intelligence & AI)", "B.Com Computer Applications (AI-Ready Accountant)", "B.Com Financial Services (AI-Ready Account Analyst)", "B.Com Financial Services (Public Accountant)", "B.Com IT (Accounting Analytics)", "B.Com International Business (AI-Ready Business Analyst)", "B.Com Professional Accounting (Chartered Accountant)", "B.Com (AI-Ready Accountant)", "B.Com (ACCA)"] },
      { category: "M.COM PROGRAMMES", level: "POSTGRADUATE", courses: ["M.Com Computer Applications (AI-Ready Accountant)", "M.Com General (Guaranteed Internship)"] },
      { category: "MBA PROGRAMMES", level: "POSTGRADUATE", courses: ["MBA General", "MBA in Business Analytics and Artificial Intelligence", "MBA in Marketing", "MBA in Finance", "MBA in Human Resource", "MBA in Supply Chain and Logistics", "MBA in Sustainability Management", "MBA in AI Product Management", "MBA in Entrepreneurship 5.0", "MBA in Media & Entertainment Management", "MBA in Sports Management", "MBA Hospitality"] }
    ]
  },
  {
    name: "School of Applied Biosciences, Food & Agri-Tech",
    short: "Applied Biosciences, Food & Agri-Tech",
    slug: "biosciences",
    color: "#00cc7a", colorHi: "#00ffaa",
    programs: [
      { category: "B.TECH PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Tech Food Technology", "B.Tech Biotechnology"] },
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Biotechnology", "B.Sc Microbiology"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.Sc Biotechnology", "M.Sc Microbiology"] }
    ]
  },
  {
    name: "School of Liberal Arts & Science",
    short: "Liberal Arts & Science",
    slug: "liberal-arts",
    color: "#ff5500", colorHi: "#ff8800",
    programs: [
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Mathematics", "B.Sc Physics"] },
      { category: "B.A PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.A English Literature"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.A English Literature", "M.A Public Administration", "M.Sc Mathematics"] }
    ]
  },
  {
    name: "School of Design, Media & Performing Arts",
    short: "Design, Media & Performing Arts",
    slug: "design-arts",
    color: "#ff0077", colorHi: "#ff55bb",
    programs: [
      { category: "B.TECH PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Tech Fashion Technology"] },
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Fashion Design", "B.Sc Visual Communication (AI-Ready Animation & VFX Design)", "B.Sc Digital Media & Content Creation", "B.Sc Film Production"] },
      { category: "B.A PERFORMING ARTS", level: "UNDERGRADUATE", courses: ["B.A Theatre / Acting", "B.A Dance", "B.A Music (Vocal / Instrumental)"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.A Journalism and Mass Communication"] }
    ]
  },
  {
    name: "School of Health Sciences & Rehabilitation",
    short: "Health Sciences & Rehabilitation",
    slug: "health-sciences",
    color: "#cc00ff", colorHi: "#ee55ff",
    programs: [
      { category: "B.SC PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.Sc Psychology", "B.Sc Behavioural Science"] },
      { category: "BBA PROGRAMMES", level: "UNDERGRADUATE", courses: ["BBA Hospital & Health Service Management"] },
      { category: "B.A PROGRAMMES", level: "UNDERGRADUATE", courses: ["B.A Counselling Studies"] },
      { category: "POSTGRADUATE PROGRAMMES", level: "POSTGRADUATE", courses: ["M.Sc Applied Psychology", "M.Sc Clinical Psychology", "M.Sc Behavioural Science"] }
    ]
  }
];

/* ─── Flatten all courses ─── */
const allCourses = schoolsData.flatMap(school =>
  school.programs.flatMap(prog =>
    prog.courses.map(courseName => ({
      name: courseName,
      category: prog.category,
      level: prog.level,
      schoolName: school.name,
      schoolShort: school.short,
      schoolColor: school.color,
      schoolColorHi: school.colorHi,
      schoolSlug: school.slug,
    }))
  )
);

/* ─── Course card ─── */
function CourseCard({ c, highlight = false }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: highlight ? `linear-gradient(135deg,${c.schoolColor}12,${c.schoolColorHi}08)` : "#ffffff",
        padding: 24, borderRadius: 20,
        border: highlight
          ? `2px solid ${c.schoolColor}55`
          : `1px solid ${hov ? c.schoolColor + "55" : "rgba(0,0,0,.06)"}`,
        boxShadow: hov
          ? `0 12px 36px ${c.schoolColor}22`
          : highlight ? `0 6px 24px ${c.schoolColor}18` : "0 4px 16px rgba(0,0,0,.03)",
        display: "flex", flexDirection: "column",
        transition: "all .25s cubic-bezier(.25,.8,.25,1)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        position: "relative", overflow: "hidden",
      }}>
      {/* top colour accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg,${c.schoolColor},${c.schoolColorHi})`,
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, marginTop: 4 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.schoolColor, boxShadow: `0 0 6px ${c.schoolColor}` }} />
        <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: c.schoolColor }}>{c.level}</span>
      </div>

      <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, color: "#0f172a", lineHeight: 1.35, marginBottom: 10 }}>{c.name}</h3>
      <p style={{ fontSize: 12, color: "#64748b", marginBottom: 20, flex: 1, lineHeight: 1.5 }}>{c.schoolShort}</p>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(0,0,0,.05)" }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: ".04em" }}>{c.category}</span>
        <a href="#" style={{
          display: "inline-block",
          background: `linear-gradient(135deg,${c.schoolColor},${c.schoolColorHi})`,
          color: c.schoolColor === "#88dd00" || c.schoolColor === "#00cc7a" ? "#0a1a00" : "#ffffff",
          padding: "8px 18px", borderRadius: 8, fontSize: 12, fontWeight: 700,
          textDecoration: "none", transition: "opacity .2s",
          boxShadow: `0 4px 14px ${c.schoolColor}44`,
        }}
          onMouseEnter={e => e.target.style.opacity = ".88"}
          onMouseLeave={e => e.target.style.opacity = "1"}>
          Apply Now
        </a>
      </div>
    </div>
  );
}

/* ─── School banner image ─── */
function SchoolBanner({ school }) {
  const [imgOk, setImgOk] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => { setImgOk(false); setImgLoaded(false); }, [school?.slug]);

  if (!school) {
    /* default all-schools banner */
    return (
      <div style={{
        width: "100%", height: 220, borderRadius: 24, overflow: "hidden", position: "relative",
        background: "linear-gradient(135deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(168,85,247,.25) 0%, transparent 70%)" }} />
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 800, color: "#ffffff", letterSpacing: ".04em" }}>
            All Programmes
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", marginTop: 6, letterSpacing: ".12em", textTransform: "uppercase" }}>
            7 World-Class Schools · 100+ Programmes
          </div>
        </div>
      </div>
    );
  }

  const src = `/schools/${school.slug}/banner.jpg`;

  return (
    <div style={{
      width: "100%", height: 220, borderRadius: 24, overflow: "hidden", position: "relative",
      background: `linear-gradient(135deg, ${school.color}cc 0%, ${school.colorHi}99 50%, ${school.color}aa 100%)`,
    }}>
      {/* actual image (hidden until loaded) */}
      <img
        src={src}
        alt={school.short}
        onLoad={() => { setImgOk(true); setImgLoaded(true); }}
        onError={() => { setImgOk(false); }}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", opacity: imgLoaded && imgOk ? 1 : 0,
          transition: "opacity .5s",
        }}
      />
      {/* gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: imgOk
          ? "linear-gradient(to right, rgba(0,0,0,.55) 0%, rgba(0,0,0,.1) 60%, transparent 100%)"
          : "linear-gradient(135deg,rgba(0,0,0,.25) 0%,transparent 100%)",
      }} />
      {/* neon glow */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(ellipse 60% 80% at 80% 50%, ${school.colorHi}44 0%, transparent 70%)`,
      }} />
      {/* text */}
      <div style={{ position: "absolute", left: 36, bottom: 32, zIndex: 2 }}>
        <div style={{
          fontFamily: "'Sora',sans-serif", fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 800,
          color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,.4)", marginBottom: 6,
        }}>
          {school.short}
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.35)",
          borderRadius: 20, padding: "4px 14px", backdropFilter: "blur(10px)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: school.colorHi, boxShadow: `0 0 6px ${school.colorHi}` }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#ffffff" }}>
            {school.programs.reduce((a, p) => a + p.courses.length, 0)} Programmes
          </span>
        </div>
      </div>
      {/* placeholder text when no image */}
      {!imgOk && (
        <div style={{
          position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)",
          fontSize: 11, color: "rgba(255,255,255,.45)", fontFamily: "'DM Sans',sans-serif",
          textAlign: "right", lineHeight: 1.6,
        }}>
          Upload banner to:<br />
          <code style={{ color: "rgba(255,255,255,.65)" }}>public/schools/{school.slug}/banner.jpg</code>
        </div>
      )}
    </div>
  );
}

/* ─── Main content ─── */
function ProgrammesContent() {
  const searchParams = useSearchParams();
  const initCourse = searchParams.get("course") || "";

  const [searchTerm, setSearchTerm] = useState(initCourse);
  const [selectedSchool, setSelectedSchool] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [schoolDropOpen, setSchoolDropOpen] = useState(false);
  const dropRef = useRef(null);
  const similarRef = useRef(null);

  /* auto-select school when arriving via ?course= */
  useEffect(() => {
    if (initCourse) {
      const match = allCourses.find(c => c.name === initCourse);
      if (match) setSelectedSchool(match.schoolName);
    }
  }, [initCourse]);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setSchoolDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeSchoolObj = useMemo(
    () => schoolsData.find(s => s.name === selectedSchool) || null,
    [selectedSchool]
  );

  /* main filtered list */
  const filteredCourses = useMemo(() => {
    return allCourses.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSchool = selectedSchool === "All" || c.schoolName === selectedSchool;
      const matchLevel = selectedLevel === "All" || c.level === selectedLevel;
      return matchSearch && matchSchool && matchLevel;
    });
  }, [searchTerm, selectedSchool, selectedLevel]);

  /* similar programmes: same school, not in main results, no level filter applied */
  const similarCourses = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const mainNames = new Set(filteredCourses.map(c => c.name));
    const schoolForSearch = filteredCourses.length > 0 ? filteredCourses[0].schoolName : null;
    if (!schoolForSearch) return [];
    return allCourses.filter(c =>
      c.schoolName === schoolForSearch && !mainNames.has(c.name)
    ).slice(0, 6);
  }, [filteredCourses, searchTerm]);

  const reset = () => { setSearchTerm(""); setSelectedSchool("All"); setSelectedLevel("All"); };

  const levelLabels = { All: "Both", UNDERGRADUATE: "UG", POSTGRADUATE: "PG" };

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", fontFamily: "'DM Sans',sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .prog-drop-item:hover { background: rgba(0,0,0,.04) !important; }
        .school-pill:hover { opacity: .82; }
        @keyframes fadein { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .card-anim { animation: fadein .35s ease both; }
        input::placeholder { color: #94a3b8; }
      `}} />

      <Navbar />

      {/* ── Page header ── */}
      <div style={{ background: "#ffffff", padding: "140px 32px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", paddingBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(184,0,255,.08)", border: "1px solid rgba(184,0,255,.18)", borderRadius: 20, padding: "6px 16px", marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b800ff" }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#b800ff" }}>Programmes & Admissions</span>
            </div>
            <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, color: "#0f172a", marginBottom: 10, lineHeight: 1.2 }}>
              Find Your Future at RGU
            </h1>
            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 520, margin: "0 auto" }}>
              7 world-class schools · 100+ programmes · Apply for 2026 intake
            </p>
          </div>
        </div>
      </div>

      {/* ── Filters + Banner ── */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid rgba(0,0,0,.06)", padding: "0 32px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* School banner image */}
          <div style={{ marginBottom: 24 }}>
            <SchoolBanner school={activeSchoolObj} />
          </div>

          {/* Horizontal filter bar */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center",
            background: "#f8fafc", border: "1px solid rgba(0,0,0,.07)",
            borderRadius: 18, padding: "14px 20px",
          }}>
            {/* Search */}
            <div style={{ flex: "1 1 240px", position: "relative", minWidth: 200 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search programmes..."
                style={{
                  width: "100%", padding: "11px 14px 11px 40px", borderRadius: 12,
                  background: "#ffffff", border: "1.5px solid rgba(0,0,0,.08)",
                  outline: "none", fontSize: 14, color: "#0f172a", fontFamily: "'DM Sans',sans-serif",
                  transition: "border-color .2s",
                }}
                onFocus={e => e.target.style.borderColor = "#b800ff"}
                onBlur={e => e.target.style.borderColor = "rgba(0,0,0,.08)"}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  background: "rgba(0,0,0,.06)", border: "none", borderRadius: 6, width: 22, height: 22,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b",
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 32, background: "rgba(0,0,0,.1)", flexShrink: 0 }} />

            {/* Degree level pills */}
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#94a3b8", marginRight: 4 }}>Level</span>
              {["All", "UNDERGRADUATE", "POSTGRADUATE"].map(lv => (
                <button key={lv} onClick={() => setSelectedLevel(lv)} style={{
                  padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer",
                  border: selectedLevel === lv ? "none" : "1.5px solid rgba(0,0,0,.1)",
                  background: selectedLevel === lv ? "#0f172a" : "transparent",
                  color: selectedLevel === lv ? "#ffffff" : "#64748b",
                  transition: "all .2s", outline: "none",
                }}>
                  {levelLabels[lv]}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: 1, height: 32, background: "rgba(0,0,0,.1)", flexShrink: 0 }} />

            {/* School dropdown */}
            <div ref={dropRef} style={{ position: "relative", flexShrink: 0, minWidth: 220 }}>
              <button
                onClick={() => setSchoolDropOpen(o => !o)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 16px 9px 14px", borderRadius: 12, cursor: "pointer",
                  background: activeSchoolObj ? `${activeSchoolObj.color}15` : "#ffffff",
                  border: activeSchoolObj ? `1.5px solid ${activeSchoolObj.color}55` : "1.5px solid rgba(0,0,0,.1)",
                  color: activeSchoolObj ? activeSchoolObj.color : "#0f172a",
                  fontSize: 13, fontWeight: 700, outline: "none", transition: "all .2s",
                  whiteSpace: "nowrap",
                }}>
                {activeSchoolObj && (
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: activeSchoolObj.color, flexShrink: 0, boxShadow: `0 0 6px ${activeSchoolObj.color}` }} />
                )}
                <span style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {activeSchoolObj ? activeSchoolObj.short : "All Schools"}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ marginLeft: 4, transition: "transform .2s", transform: schoolDropOpen ? "rotate(180deg)" : "rotate(0)" }}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {schoolDropOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 200, minWidth: 280,
                  background: "#ffffff", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,.12)",
                  border: "1px solid rgba(0,0,0,.07)", overflow: "hidden",
                }}>
                  <button className="prog-drop-item" onClick={() => { setSelectedSchool("All"); setSchoolDropOpen(false); }} style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 18px",
                    background: selectedSchool === "All" ? "rgba(0,0,0,.04)" : "transparent",
                    border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#0f172a",
                    textAlign: "left",
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#94a3b8" }} />
                    All Schools
                  </button>
                  <div style={{ height: 1, background: "rgba(0,0,0,.05)" }} />
                  {schoolsData.map(s => (
                    <button key={s.name} className="prog-drop-item" onClick={() => { setSelectedSchool(s.name); setSchoolDropOpen(false); }} style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 18px",
                      background: selectedSchool === s.name ? `${s.color}12` : "transparent",
                      border: "none", cursor: "pointer", fontSize: 13, fontWeight: selectedSchool === s.name ? 700 : 500,
                      color: selectedSchool === s.name ? s.color : "#374151",
                      textAlign: "left", transition: "background .15s",
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0, boxShadow: `0 0 5px ${s.color}` }} />
                      {s.short}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset */}
            {(searchTerm || selectedSchool !== "All" || selectedLevel !== "All") && (
              <button onClick={reset} style={{
                padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                background: "transparent", border: "1.5px solid rgba(239,68,68,.3)", color: "#ef4444",
                cursor: "pointer", outline: "none", flexShrink: 0, transition: "all .2s",
              }}>
                Reset
              </button>
            )}

            {/* Result count */}
            <div style={{ marginLeft: "auto", flexShrink: 0 }}>
              <span style={{
                fontSize: 13, fontWeight: 700, background: "#f1f5f9",
                color: "#64748b", padding: "7px 14px", borderRadius: 10,
                border: "1px solid rgba(0,0,0,.07)",
              }}>
                {filteredCourses.length} result{filteredCourses.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Course Grid ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px 80px" }}>

        {filteredCourses.length === 0 ? (
          <div style={{ padding: "80px 40px", textAlign: "center", background: "#ffffff", borderRadius: 24, border: "1px dashed rgba(0,0,0,.1)" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>No programmes found</h3>
            <p style={{ color: "#64748b", fontSize: 15, marginBottom: 24 }}>Try adjusting your filters or search term.</p>
            <button onClick={reset} style={{ padding: "10px 24px", background: "#0f172a", color: "#fff", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: "#0f172a" }}>
                {searchTerm ? `Results for "${searchTerm}"` : activeSchoolObj ? activeSchoolObj.short : "All Programmes"}
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {filteredCourses.map((c, i) => (
                <div key={i} className="card-anim" style={{ animationDelay: `${i * 0.04}s` }}>
                  <CourseCard c={c} highlight={!!searchTerm && filteredCourses.length <= 3} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Similar Programmes Section ── */}
        {similarCourses.length > 0 && (
          <div ref={similarRef} style={{ marginTop: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,.08)" }} />
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: `${similarCourses[0].schoolColor}12`,
                border: `1.5px solid ${similarCourses[0].schoolColor}33`,
                borderRadius: 20, padding: "8px 20px",
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: similarCourses[0].schoolColor, boxShadow: `0 0 7px ${similarCourses[0].schoolColor}` }} />
                <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 800, color: similarCourses[0].schoolColor, whiteSpace: "nowrap" }}>
                  More from {similarCourses[0].schoolShort}
                </span>
              </div>
              <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,.08)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {similarCourses.map((c, i) => (
                <div key={i} className="card-anim" style={{ animationDelay: `${i * 0.05}s` }}>
                  <CourseCard c={c} />
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button onClick={() => { setSearchTerm(""); setSelectedLevel("All"); }} style={{
                padding: "11px 28px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                background: "transparent", border: `2px solid ${similarCourses[0].schoolColor}55`,
                color: similarCourses[0].schoolColor, cursor: "pointer", transition: "all .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = `${similarCourses[0].schoolColor}12`}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                View All {similarCourses[0].schoolShort} Programmes
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default function ProgrammesPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", fontFamily: "'DM Sans',sans-serif", color: "#64748b" }}>
        Loading programmes…
      </div>
    }>
      <ProgrammesContent />
    </Suspense>
  );
}
