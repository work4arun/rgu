"use client";
import { GraduationCap, Globe, Theater, Trophy, Users, Utensils, FlaskConical, Music, Plane, School } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const highlights = [
  { Icon: GraduationCap, label: "Academic Excellence",  c: "#a855f7", bg: "rgba(168,85,247,.1)"  },
  { Icon: Globe,         label: "Global Exposure",       c: "#38bdf8", bg: "rgba(56,189,248,.1)"  },
  { Icon: Theater,       label: "Cultural Vibrancy",     c: "#a3e635", bg: "rgba(163,230,53,.1)"  },
  { Icon: Trophy,        label: "Sports & Fitness",      c: "#f472b6", bg: "rgba(244,114,182,.1)" },
  { Icon: Users,         label: "Clubs & Societies",     c: "#fb923c", bg: "rgba(251,146,60,.1)"  },
  { Icon: Utensils,      label: "Campus Living",         c: "#34d399", bg: "rgba(52,211,153,.1)"  },
  { Icon: FlaskConical,  label: "Innovation Labs",       c: "#a855f7", bg: "rgba(168,85,247,.1)"  },
  { Icon: Music,         label: "Arts & Music",          c: "#38bdf8", bg: "rgba(56,189,248,.1)"  },
];

const bento = [
  { Icon: School,       label: "Campus Life",         sub: "Modern Spaces & Community",  c: "#a855f7", bg: "rgba(168,85,247,.1)",  border: "rgba(168,85,247,.22)", span: "lg:col-span-2 lg:row-span-2" },
  { Icon: FlaskConical, label: "Innovation Labs",      sub: "World-class Infrastructure", c: "#38bdf8", bg: "rgba(56,189,248,.1)",  border: "rgba(56,189,248,.22)",  span: "" },
  { Icon: Theater,      label: "Events & Fests",       sub: "Always Happening",           c: "#a3e635", bg: "rgba(163,230,53,.1)",  border: "rgba(163,230,53,.22)",  span: "" },
  { Icon: Plane,        label: "Global Exchanges",     sub: "Study Abroad",               c: "#f472b6", bg: "rgba(244,114,182,.1)", border: "rgba(244,114,182,.22)", span: "" },
  { Icon: Trophy,       label: "Sports Complex",       sub: "Champion Mindset",           c: "#fb923c", bg: "rgba(251,146,60,.1)",  border: "rgba(251,146,60,.22)",  span: "" },
];

export default function LifeAtRGU() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="life" className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#0f0f1e 0%,#0c0c18 100%)" }}>

      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(168,85,247,.07) 0%,transparent 70%)", top:"-20%", right:"-10%", filter:"blur(70px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header row */}
        <div className={`grid lg:grid-cols-2 gap-12 items-end mb-16 transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-6"
              style={{ background:"rgba(163,230,53,.08)", borderColor:"rgba(163,230,53,.22)", color:"#a3e635" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#a3e635" }} />
              <span className="text-[10px] font-inter font-bold tracking-[0.28em] uppercase">The Campus Experience</span>
            </div>
            <h2 className="font-outfit font-black text-5xl lg:text-7xl leading-none text-white">
              Life @{" "}
              <span style={{ background:"linear-gradient(90deg,#a855f7,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                RGU
              </span>
            </h2>
          </div>
          <div>
            <p className="text-slate-400 text-lg leading-relaxed font-inter">
              Life at RGU extends far beyond classrooms — a vibrant, global community where students learn, grow, explore, and lead every single day.
            </p>
            <a href="#explore-campus"
              className="mt-5 inline-flex items-center gap-2 font-inter font-bold text-sm transition-all duration-300 hover:gap-4"
              style={{ color:"#a3e635" }}>
              Explore Campus Life <span>→</span>
            </a>
          </div>
        </div>

        {/* Bento grid */}
        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-4 mb-14 transition-all duration-1000 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {bento.map((item) => (
            <div key={item.label}
              className={`group rounded-3xl border p-7 flex flex-col justify-end min-h-[160px] relative overflow-hidden cursor-default transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${item.span}`}
              style={{ background:item.bg, borderColor:item.border }}>
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:`linear-gradient(90deg,transparent,${item.c},transparent)` }} />
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
                style={{ background:`${item.c}18`, border:`1px solid ${item.c}30` }}>
                <item.Icon size={22} style={{ color:item.c }} />
              </div>
              <h4 className="font-outfit font-bold text-white text-lg leading-tight">{item.label}</h4>
              <p className="text-slate-500 text-xs font-inter mt-1">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Pill highlights row */}
        <div className={`flex flex-wrap gap-3 transition-all duration-1000 delay-400 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {highlights.map(({ Icon, label, c, bg }) => (
            <div key={label}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 hover:scale-105"
              style={{ background:bg, borderColor:`${c}30`, color:c }}>
              <Icon size={14} />
              <span className="text-xs font-inter font-bold">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
