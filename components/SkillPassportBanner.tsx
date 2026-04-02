"use client";
import { useEffect, useRef, useState } from "react";

export default function SkillPassportBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skill-passport"
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020008 0%, #040016 100%)" }}
    >
      {/* Decorative orbs */}
      <div className="orb orb-green w-80 h-80 bottom-[-20%] right-[-5%] opacity-30" />
      <div className="orb orb-purple w-60 h-60 top-[-10%] left-[20%] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#99cc33] animate-pulse" />
            <span className="text-xs font-inter font-medium text-white/60 tracking-widest uppercase">
              Track. Prove. Grow.
            </span>
          </div>
        </div>

        {/* Main Banner */}
        <div
          className={`relative rounded-[2rem] overflow-hidden transition-all duration-1000 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{
            background: "linear-gradient(135deg, rgba(102,0,102,0.2) 0%, rgba(0,102,153,0.15) 50%, rgba(153,204,51,0.1) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 80px rgba(102,0,102,0.2), 0 0 160px rgba(0,102,153,0.1)",
          }}
        >
          {/* Animated gradient top border */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: "linear-gradient(90deg, #660066, #006699, #99cc33, #660066)",
              backgroundSize: "200%",
              animation: "progressShimmer 3s linear infinite",
            }}
          />

          {/* Big bg text */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
            aria-hidden
          >
            <span className="font-outfit font-black text-[100px] lg:text-[160px] leading-none opacity-[0.03] text-white whitespace-nowrap">
              PASSPORT
            </span>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-0">
            {/* Global Skill Passport */}
            <div
              className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-start gap-5 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shine-effect"
                  style={{
                    background: "linear-gradient(135deg, rgba(102,0,102,0.5), rgba(0,102,153,0.5))",
                    border: "1px solid rgba(102,0,102,0.5)",
                    boxShadow: "0 0 30px rgba(102,0,102,0.4)",
                  }}
                >
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <div
                    className="text-xs font-inter font-bold tracking-widest uppercase mb-1"
                    style={{ color: "#660066" }}
                  >
                    Coming Soon — Details Ahead
                  </div>
                  <h3 className="font-outfit font-black text-3xl lg:text-4xl text-white">
                    Global Skill Passport
                  </h3>
                </div>
              </div>

              {/* Placeholder content area */}
              <div
                className="rounded-2xl p-6 mb-6"
                style={{
                  background: "rgba(102,0,102,0.1)",
                  border: "1px dashed rgba(102,0,102,0.3)",
                }}
              >
                <p className="text-white/40 text-sm font-inter text-center italic">
                  ✦ Detailed content will be added soon ✦
                </p>
                <div className="mt-4 space-y-2">
                  {["Certification Records", "Internship Log", "Leadership Achievements", "Global Exposure"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#660066]/50" />
                      <div className="h-2 rounded-full flex-1 bg-white/5" />
                      <span className="text-white/30 text-xs font-inter">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-inter text-white/45 text-sm leading-relaxed">
                Your Global Skill Passport is a living digital credential — recording every
                certification, internship, exposure, and milestone accumulated throughout your
                RGU journey. A verified proof of who you've become.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-inter font-semibold" style={{ color: "#660066" }}>
                <span>Learn more</span>
                <span>→</span>
              </div>
            </div>

            {/* Growth Card */}
            <div className="p-10 lg:p-14">
              <div className="flex items-start gap-5 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shine-effect"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,102,153,0.5), rgba(153,204,51,0.4))",
                    border: "1px solid rgba(153,204,51,0.4)",
                    boxShadow: "0 0 30px rgba(153,204,51,0.3)",
                  }}
                >
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <div
                    className="text-xs font-inter font-bold tracking-widest uppercase mb-1"
                    style={{ color: "#99cc33" }}
                  >
                    Coming Soon — Details Ahead
                  </div>
                  <h3 className="font-outfit font-black text-3xl lg:text-4xl text-white">
                    Growth Card
                  </h3>
                </div>
              </div>

              {/* Placeholder growth card visual - Premium Refinement */}
              <div
                className="rounded-2xl p-8 mb-6 glass-premium"
                style={{
                  border: "1px solid rgba(var(--rgu-green-rgb), 0.2)",
                  boxShadow: "0 0 30px rgba(var(--rgu-green-rgb), 0.05)",
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-[10px] font-bold text-rgu-green tracking-[0.2em] uppercase">Metrics Tracking</div>
                  <div className="w-2 h-2 rounded-full bg-rgu-green animate-pulse" />
                </div>
                
                <div className="space-y-5">
                  {[
                    { label: "Career Readiness", pct: 75, color: "var(--rgu-blue)" },
                    { label: "Global Exposure", pct: 60, color: "var(--rgu-purple)" },
                    { label: "Leadership Score", pct: 85, color: "var(--rgu-green)" },
                  ].map((bar) => (
                    <div key={bar.label} className="group/bar">
                      <div className="flex justify-between text-xs font-bold font-inter mb-2">
                        <span className="text-white/60 group-hover/bar:text-white transition-colors">{bar.label}</span>
                        <span style={{ color: bar.color }}>{bar.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden p-[1px]">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: visible ? `${bar.pct}%` : "0%",
                            background: bar.color,
                            boxShadow: `0 0 10px ${bar.color}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-inter text-white/50 text-sm leading-relaxed">
                The <span className="text-rgu-green font-bold">Growth Card</span> is your personal progress tracker — a semester-by-semester snapshot measuring how far you've come across career readiness, global exposure, leadership, and practical skills.
              </p>

              <div className="mt-8 transition-transform hover:translate-x-2 duration-300">
                <a href="#details" className="inline-flex items-center gap-2 text-sm font-bold font-inter uppercase tracking-widest text-rgu-green">
                  <span>Explore Metrics</span>
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom animated footer strip */}
          <div
            className="px-10 lg:px-14 py-5 flex items-center justify-between"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <p className="text-white/30 text-xs font-inter tracking-wide">
              Together, the Skill Passport and Growth Card form your complete RGU transformation record.
            </p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#660066]/60" />
              <div className="w-2 h-2 rounded-full bg-[#006699]/60" />
              <div className="w-2 h-2 rounded-full bg-[#99cc33]/60" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
