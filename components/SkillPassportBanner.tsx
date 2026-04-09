"use client";
import { useEffect, useRef, useState } from "react";
import { Globe, BarChart3 } from "lucide-react";

const passportBars = [
  { label: "SSCP – Semester Skill Certification", pct: 20, color: "#a855f7" },
  { label: "SIIP – Semester Industry Immersion",  pct: 20, color: "#38bdf8" },
  { label: "OLT – Outbound Leadership Training",  pct: 20, color: "#a3e635" },
  { label: "FEP – Field Exposure Programme",      pct: 20, color: "#f472b6" },
  { label: "GIP – Global Immersion Programme",    pct: 20, color: "#fb923c" },
];

const growthBars = [
  { label: "RAALE Growth (Foundation)",            pct: 40, color: "#a855f7" },
  { label: "Centre of Excellence (Specialization)", pct: 25, color: "#38bdf8" },
  { label: "Communication Growth",                  pct: 25, color: "#a3e635" },
  { label: "Social & Leadership Growth",            pct: 10, color: "#f472b6" },
];

export default function SkillPassportBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="skill-passport" className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#0c0c18 0%,#080810 100%)" }}>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-6"
            style={{ background:"rgba(163,230,53,.08)", borderColor:"rgba(163,230,53,.22)", color:"#a3e635" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#a3e635" }} />
            <span className="text-[10px] font-inter font-bold tracking-[0.28em] uppercase">Track · Prove · Grow</span>
          </div>
          <h2 className="font-outfit font-black text-4xl lg:text-5xl text-white">Your RGU Journey, Measured.</h2>
        </div>

        {/* Two-panel card */}
        <div className={`rounded-3xl border overflow-hidden transition-all duration-1000 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ background:"rgba(255,255,255,.03)", borderColor:"rgba(255,255,255,.08)", boxShadow:"0 32px 80px rgba(0,0,0,.4)" }}>

          {/* Top accent stripe */}
          <div className="h-1 flex">
            {["#a855f7","#38bdf8","#a3e635","#f472b6","#fb923c"].map((c) => (
              <div key={c} className="flex-1" style={{ background:c }} />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Global Skill Passport */}
            <div className="p-10 lg:p-12 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor:"rgba(255,255,255,.07)" }}>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background:"linear-gradient(135deg,#a855f7,#6d28d9)", boxShadow:"0 8px 24px rgba(168,85,247,.35)" }}>
                  <Globe className="text-white w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-2xl text-white leading-tight">Global Skill Passport</h3>
                  <span className="text-lg font-black" style={{ color:"#a855f7" }}>100%</span>
                </div>
              </div>

              <div className="rounded-2xl p-5 mb-6 border space-y-4"
                style={{ background:"rgba(168,85,247,.06)", borderColor:"rgba(168,85,247,.18)" }}>
                {passportBars.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-[10px] font-bold font-inter mb-1.5 tracking-wider"
                      style={{ color:"rgba(255,255,255,.5)" }}>
                      <span>{bar.label}</span>
                      <span style={{ color:bar.color }}>{bar.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,.08)" }}>
                      <div className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: vis ? `${bar.pct}%` : "0%", background:bar.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-400 text-sm font-inter leading-relaxed">
                A living digital credential — recording every certification, internship, exposure, and milestone accumulated throughout your RGU journey.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-inter font-bold" style={{ color:"#a855f7" }}>
                Learn more →
              </div>
            </div>

            {/* Growth Card */}
            <div className="p-10 lg:p-12">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background:"linear-gradient(135deg,#a3e635,#16a34a)", boxShadow:"0 8px 24px rgba(163,230,53,.30)" }}>
                  <BarChart3 className="text-white w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-2xl text-white leading-tight">Growth Card</h3>
                  <span className="text-lg font-black" style={{ color:"#a3e635" }}>100%</span>
                </div>
              </div>

              <div className="rounded-2xl p-5 mb-6 border space-y-4"
                style={{ background:"rgba(163,230,53,.05)", borderColor:"rgba(163,230,53,.18)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-inter" style={{ color:"#a3e635" }}>Metrics Tracking</span>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#a3e635" }} />
                </div>
                {growthBars.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-[10px] font-bold font-inter mb-1.5">
                      <span className="text-slate-400">{bar.label}</span>
                      <span style={{ color:bar.color }}>{bar.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,.08)" }}>
                      <div className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: vis ? `${bar.pct}%` : "0%", background:bar.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-slate-400 text-sm font-inter leading-relaxed">
                Your personal progress tracker — a semester-by-semester snapshot measuring how far you've come and where you're headed.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-inter font-bold" style={{ color:"#a3e635" }}>
                Explore Metrics →
              </div>
            </div>
          </div>

          <div className="px-10 lg:px-12 py-5 flex items-center justify-between border-t"
            style={{ background:"rgba(255,255,255,.02)", borderColor:"rgba(255,255,255,.06)" }}>
            <p className="text-slate-500 text-xs font-inter">Together, the Skill Passport and Growth Card form your complete RGU transformation record.</p>
            <div className="flex gap-2">
              {["#a855f7","#38bdf8","#a3e635"].map((c) => (
                <div key={c} className="w-2 h-2 rounded-full" style={{ background:c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
