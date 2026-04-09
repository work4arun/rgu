"use client";
import { useEffect, useRef, useState } from "react";

const years = [
  {
    sem: "Year 1", title: "Foundation",
    items: ["Global Certification I", "Internship I", "Field Exposure I"],
    color: "#a855f7", border: "rgba(168,85,247,.35)", bg: "rgba(168,85,247,.08)",
  },
  {
    sem: "Year 2", title: "Exposure",
    items: ["Global Certification II & III", "Internship II & III", "Outbound Leadership I"],
    color: "#38bdf8", border: "rgba(56,189,248,.35)", bg: "rgba(56,189,248,.08)",
  },
  {
    sem: "Year 3", title: "Mastery",
    items: ["Global Immersion Programme", "Internship IV+", "Leadership II", "Skill Passport"],
    color: "#a3e635", border: "rgba(163,230,53,.35)", bg: "rgba(163,230,53,.08)",
  },
];

export default function WhatIsRGUWay() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="rgu-way" className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#0c0c18 0%,#0f0f1e 100%)" }}>

      {/* Background accent blobs */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(168,85,247,.08) 0%,transparent 70%)", top:"-10%", left:"-8%", filter:"blur(60px)" }} />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(163,230,53,.06) 0%,transparent 70%)", bottom:"0", right:"-5%", filter:"blur(60px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className={`mb-20 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-6"
            style={{ background:"rgba(168,85,247,.1)", borderColor:"rgba(168,85,247,.25)", color:"#a855f7" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#a855f7" }} />
            <span className="text-[10px] font-inter font-bold tracking-[0.28em] uppercase">The Ecosystem</span>
          </div>
          <h2 className="font-outfit font-black text-4xl lg:text-6xl xl:text-7xl leading-tight"
            style={{ color:"#f8fafc" }}>
            What makes{" "}
            <span style={{ background:"linear-gradient(90deg,#38bdf8,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              RGU Way
            </span>{" "}different?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left – text */}
          <div className={`space-y-8 transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <p className="text-slate-400 text-lg leading-relaxed font-inter">
              The higher education market is crowded with similar claims. Most institutions communicate
              global exposure and internships as{" "}
              <span className="text-slate-200 font-semibold">separate, disconnected features.</span>
            </p>
            <p className="text-slate-400 text-lg leading-relaxed font-inter">
              RGU Way presents them as one{" "}
              <span className="font-bold" style={{ color:"#a3e635" }}>integrated transformation ecosystem</span>{" "}
              — shifting the conversation from what the university offers to what the student becomes.
            </p>

            {/* FROM → TO card */}
            <div className="rounded-2xl p-6 border"
              style={{ background:"rgba(255,255,255,.03)", borderColor:"rgba(255,255,255,.08)" }}>
              <p className="text-slate-500 text-[10px] font-inter tracking-[0.28em] uppercase mb-5 font-bold">The Shift</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 p-4 rounded-xl text-center border"
                  style={{ background:"rgba(168,85,247,.07)", borderColor:"rgba(168,85,247,.18)" }}>
                  <p className="text-[10px] text-slate-500 font-inter mb-2 font-bold uppercase tracking-wider">FROM</p>
                  <p className="font-outfit font-semibold text-slate-300 text-sm">"What the university offers"</p>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-black text-base"
                  style={{ background:"linear-gradient(135deg,#a855f7,#38bdf8)" }}>→</div>
                <div className="flex-1 p-4 rounded-xl text-center border"
                  style={{ background:"rgba(163,230,53,.07)", borderColor:"rgba(163,230,53,.2)" }}>
                  <p className="text-[10px] font-inter mb-2 font-bold uppercase tracking-wider" style={{ color:"#a3e635" }}>TO</p>
                  <p className="font-outfit font-bold text-sm" style={{ color:"#a3e635" }}>"What the student becomes"</p>
                </div>
              </div>
            </div>

            <p className="text-slate-400 text-base leading-relaxed font-inter">
              Every semester adds <span className="text-slate-200 font-semibold">measurable value</span> — globally ready, career ready, and future ready.
            </p>
          </div>

          {/* Right – year timeline */}
          <div className={`relative pl-8 transition-all duration-1000 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            {/* vertical spine */}
            <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
              style={{ background:"linear-gradient(to bottom,#a855f7,#38bdf8,#a3e635)" }} />

            {years.map((yr, i) => (
              <div key={yr.sem} className="relative mb-7 last:mb-0">
                {/* dot */}
                <div className="absolute -left-[34px] w-4 h-4 rounded-full border-2 border-[#0f0f1e]"
                  style={{ background:yr.color, top:"12px", boxShadow:`0 0 0 3px ${yr.color}30` }} />

                <div className="rounded-2xl p-6 ml-4 border transition-all duration-300 hover:scale-[1.01]"
                  style={{ background:yr.bg, borderColor:yr.border, borderLeft:`3px solid ${yr.color}` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-inter font-bold px-2.5 py-1.5 rounded-full"
                      style={{ background:`${yr.color}20`, color:yr.color, border:`1px solid ${yr.color}40` }}>
                      {yr.sem}
                    </span>
                    <h4 className="font-outfit font-bold text-slate-100 text-lg">{yr.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {yr.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-400 font-inter">
                        <span style={{ color:yr.color }}>✦</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
