"use client";
import { Globe, Briefcase, Zap, Rocket, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const outcomes = [
  { Icon: Globe,     title: "Globally Ready",       stat: "40+", statLabel: "Global Partners",  desc: "International certifications, global immersion, and cross-cultural skills to thrive anywhere.",          color: "#a855f7", border: "rgba(168,85,247,.3)", bg: "rgba(168,85,247,.08)" },
  { Icon: Briefcase, title: "Career Ready",          stat: "95%", statLabel: "Placement Rate",   desc: "Multiple internship experiences, industry connections, and job-ready skills from semester one.",          color: "#38bdf8", border: "rgba(56,189,248,.3)",  bg: "rgba(56,189,248,.08)"  },
  { Icon: Zap,       title: "Practical & Confident", stat: "6+",  statLabel: "Real Projects/Yr", desc: "Field visits, hands-on projects, and live environments — so students perform, not just know.",            color: "#a3e635", border: "rgba(163,230,53,.3)", bg: "rgba(163,230,53,.08)" },
  { Icon: Rocket,    title: "Leadership Oriented",   stat: "2×",  statLabel: "Leadership Tracks", desc: "Outbound leadership programmes and cross-functional challenges building executive presence.",             color: "#f472b6", border: "rgba(244,114,182,.3)", bg: "rgba(244,114,182,.08)" },
  { Icon: Sparkles,  title: "Future Ready",          stat: "∞",   statLabel: "Possibilities",    desc: "Adaptable, resilient, and prepared for careers that don't yet exist — that's the RGU promise.",          color: "#fb923c", border: "rgba(251,146,60,.3)",  bg: "rgba(251,146,60,.08)"  },
];

export default function ProjectedOutcomes() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="outcomes" className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#0f0f1e 0%,#080810 100%)" }}>

      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(56,189,248,.06) 0%,transparent 70%)", top:"-15%", right:"-8%", filter:"blur(70px)" }} />
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(163,230,53,.05) 0%,transparent 70%)", bottom:"-10%", left:"-5%", filter:"blur(70px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8"
            style={{ background:"rgba(56,189,248,.08)", borderColor:"rgba(56,189,248,.22)", color:"#38bdf8" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#38bdf8" }} />
            <span className="text-[10px] font-inter font-bold tracking-[0.28em] uppercase">Transformation Agenda</span>
          </div>
          <h2 className="font-outfit font-black text-5xl lg:text-7xl text-white leading-tight mb-6 tracking-tighter">
            Projected{" "}
            <span style={{ background:"linear-gradient(90deg,#a3e635,#38bdf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Outcomes
            </span>
          </h2>
          <p className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-inter">
            The RGU Way doesn't just prepare you for a job — it prepares you for a life of{" "}
            <span className="text-white font-semibold">impact, leadership</span>, and global significance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {outcomes.map((o, i) => (
            <OutcomeCard key={o.title} outcome={o} vis={vis} delay={i * 100} />
          ))}
        </div>

        {/* Summary banner */}
        <div className={`rounded-3xl border p-10 lg:p-14 text-center transition-all duration-1000 delay-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ background:"rgba(255,255,255,.03)", borderColor:"rgba(255,255,255,.08)" }}>
          <h3 className="font-outfit font-black text-3xl lg:text-4xl text-white mb-4">
            One Journey.{" "}
            <span style={{ background:"linear-gradient(90deg,#a3e635,#38bdf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Five Transformations.
            </span>
          </h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 font-inter leading-relaxed">
            Every element of the RGU Way is designed to compound — creating a graduate comprehensively ready for the world.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {outcomes.map((o) => (
              <div key={o.title} className="px-5 py-2.5 rounded-2xl text-xs font-bold font-inter tracking-wide transition-all duration-300 hover:scale-105"
                style={{ background:o.bg, color:o.color, border:`1px solid ${o.border}` }}>
                {o.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomeCard({ outcome, vis, delay }: { outcome: typeof outcomes[0]; vis: boolean; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className={`group relative rounded-3xl p-8 border overflow-hidden cursor-default transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ background:outcome.bg, borderColor:outcome.border, transitionDelay:`${delay}ms`, borderTop:`2px solid ${outcome.color}` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background:`linear-gradient(90deg,transparent,${outcome.color},transparent)` }} />

      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="font-outfit font-black text-4xl lg:text-5xl" style={{ color:outcome.color }}>{outcome.stat}</div>
          <div className="text-slate-500 text-[10px] font-bold font-inter uppercase tracking-[0.2em] mt-0.5">{outcome.statLabel}</div>
        </div>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300"
          style={{ background:`${outcome.color}18`, border:`1px solid ${outcome.color}30`, transform: hov ? "rotate(12deg) scale(1.1)" : "none" }}>
          <outcome.Icon size={22} style={{ color:outcome.color }} />
        </div>
      </div>

      <h3 className="font-outfit font-bold text-xl text-white mb-3">{outcome.title}</h3>
      <p className="text-slate-400 text-sm font-inter leading-relaxed">{outcome.desc}</p>

      <div className="mt-6 h-0.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,.07)" }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: hov ? "100%" : "25%", background:outcome.color }} />
      </div>
    </div>
  );
}
