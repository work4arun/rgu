"use client";
import { Trophy, Briefcase, Star, Search, Plane, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const cards = [
  { Icon: Trophy,    title: "Global Certification", sub: "Every Semester",       desc: "Students earn internationally recognised certifications each semester, building a verified global profile from Day 1.",                       color: "#a855f7", border: "rgba(168,85,247,.25)", bg: "rgba(168,85,247,.07)", delay: 0   },
  { Icon: Briefcase, title: "Internship",            sub: "Every Semester",       desc: "Real-world work experience every semester — not just once. Students graduate with a rich, practice-based portfolio.",                          color: "#38bdf8", border: "rgba(56,189,248,.25)",  bg: "rgba(56,189,248,.07)",  delay: 80  },
  { Icon: Star,      title: "Outbound Leadership",   sub: "Every Year",           desc: "Annual leadership programmes outside the campus — building resilience, teamwork, and executive presence.",                                       color: "#a3e635", border: "rgba(163,230,53,.25)", bg: "rgba(163,230,53,.07)", delay: 160 },
  { Icon: Search,    title: "Field Exposure",        sub: "Every Year",           desc: "Industry visits, live projects, and on-ground learning experiences that connect classroom knowledge to the real world.",                         color: "#f472b6", border: "rgba(244,114,182,.25)", bg: "rgba(244,114,182,.07)", delay: 240 },
  { Icon: Plane,     title: "Global Immersion",      sub: "Programme",            desc: "An international immersive experience exposing students to global campuses, cultures, and careers.",                                            color: "#fb923c", border: "rgba(251,146,60,.25)",  bg: "rgba(251,146,60,.07)",  delay: 320 },
  { Icon: BarChart3, title: "Measured Progress",     sub: "Skill Passport",       desc: "Every achievement recorded, tracked, and certified through the Global Skill Passport and personal Growth Card.",                               color: "#34d399", border: "rgba(52,211,153,.25)",  bg: "rgba(52,211,153,.07)",  delay: 400 },
];

export default function CoreBrandPromise() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="core-promise" className="relative py-32 overflow-hidden"
      style={{ background: "#080810" }}>

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8"
            style={{ background:"rgba(163,230,53,.08)", borderColor:"rgba(163,230,53,.22)", color:"#a3e635" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#a3e635" }} />
            <span className="text-[10px] font-inter font-bold tracking-[0.28em] uppercase">The RGU Way</span>
          </div>
          <h2 className="font-outfit font-black text-5xl lg:text-7xl leading-tight mb-6 tracking-tighter text-white">
            Built for{" "}
            <span style={{ background:"linear-gradient(90deg,#38bdf8,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Global Readiness
            </span>
          </h2>
          <p className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-inter">
            RGU Way ensures students begin building their profile from{" "}
            <span className="text-white font-bold">semester one</span> — every element designed to stack, compound, and transform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div key={card.title}
              className={`group relative rounded-3xl p-7 border overflow-hidden cursor-default transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
              style={{ background:card.bg, borderColor:card.border, transitionDelay:`${card.delay}ms`,
                boxShadow:`0 0 0 0 ${card.color}00` }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 20px 60px ${card.color}20`)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {/* Top glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:`linear-gradient(90deg,transparent,${card.color},transparent)` }} />

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background:`${card.color}18`, border:`1px solid ${card.color}30` }}>
                <card.Icon size={22} style={{ color:card.color }} />
              </div>

              <h3 className="font-outfit font-bold text-xl text-white mb-1">{card.title}</h3>
              <p className="text-[11px] font-inter font-bold uppercase tracking-wider mb-4" style={{ color:card.color }}>{card.sub}</p>
              <p className="text-slate-400 text-sm font-inter leading-relaxed">{card.desc}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background:`linear-gradient(90deg,${card.color},transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
