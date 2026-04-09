"use client";
import { Globe, Rocket, MessageCircle, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const pillars = [
  { Icon: Globe,         title: "Adapt",       desc: "Navigate changing global landscapes with confidence and clarity.",                       color: "#a855f7", border: "rgba(168,85,247,.3)", bg: "rgba(168,85,247,.08)" },
  { Icon: Rocket,        title: "Lead",         desc: "Step into leadership roles from your very first semester.",                             color: "#38bdf8", border: "rgba(56,189,248,.3)",  bg: "rgba(56,189,248,.08)"  },
  { Icon: MessageCircle, title: "Communicate",  desc: "Articulate ideas across cultures, languages, and contexts.",                           color: "#a3e635", border: "rgba(163,230,53,.3)", bg: "rgba(163,230,53,.08)" },
  { Icon: Zap,           title: "Perform",      desc: "Deliver results in real-world environments and high-pressure situations.",             color: "#f472b6", border: "rgba(244,114,182,.3)", bg: "rgba(244,114,182,.08)" },
];

export default function WhyMoreThanDegree() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="why" className="relative py-28 overflow-hidden"
      style={{ background: "#080810" }}>

      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(56,189,248,.06) 0%,transparent 70%)", bottom:"0", right:"0", filter:"blur(60px)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-6"
            style={{ background:"rgba(168,85,247,.08)", borderColor:"rgba(168,85,247,.22)", color:"#a855f7" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background:"#a855f7" }} />
            <span className="text-[10px] font-inter font-bold tracking-[0.28em] uppercase">The Question</span>
          </div>
          <h2 className="font-outfit font-black text-4xl lg:text-6xl text-white leading-tight mb-6">
            Why do students need{" "}
            <span style={{ background:"linear-gradient(90deg,#a855f7,#f472b6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              more than just a degree?
            </span>
          </h2>
          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed font-inter">
            The future belongs to students who can{" "}
            <span className="text-white font-semibold">adapt, lead, communicate,</span> and{" "}
            <span className="text-white font-semibold">perform</span> in real environments.
            RGU Way is built to develop exactly that.
          </p>
        </div>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {pillars.map((p, i) => (
            <div key={p.title}
              className={`group rounded-3xl p-8 text-center border transition-all duration-700 hover:scale-[1.03] hover:-translate-y-1 cursor-default ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ background:p.bg, borderColor:p.border, borderTop:`2px solid ${p.color}`, transitionDelay:`${i * 120}ms` }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 20px 60px ${p.color}20`)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background:`${p.color}18`, border:`1px solid ${p.color}30` }}>
                <p.Icon size={30} style={{ color:p.color }} />
              </div>
              <h3 className="font-outfit font-black text-2xl mb-3" style={{ color:p.color }}>{p.title}</h3>
              <p className="text-slate-400 text-sm font-inter leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote banner */}
        <div className={`relative rounded-3xl overflow-hidden border transition-all duration-1000 delay-500 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ background:"rgba(255,255,255,.03)", borderColor:"rgba(255,255,255,.08)" }}>
          {/* BG text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-outfit font-black text-[120px] lg:text-[180px] leading-none text-white opacity-[0.022] tracking-tighter">RGU</span>
          </div>
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background:"linear-gradient(90deg,transparent,rgba(168,85,247,.5),rgba(56,189,248,.5),rgba(163,230,53,.5),transparent)" }} />
          <div className="relative z-10 p-10 lg:p-16 text-center">
            <p className="font-outfit font-bold text-2xl lg:text-4xl leading-relaxed text-white">
              "A degree opens the door.{" "}
              <span style={{ background:"linear-gradient(90deg,#a855f7,#38bdf8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                The RGU Way
              </span>{" "}
              makes you ready for what's on the other side."
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px w-16 rounded-full" style={{ background:"linear-gradient(90deg,transparent,#a855f7)" }} />
              <span className="text-slate-500 text-sm font-inter tracking-widest uppercase">Rathinam Global University</span>
              <div className="h-px w-16 rounded-full" style={{ background:"linear-gradient(90deg,#38bdf8,transparent)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
