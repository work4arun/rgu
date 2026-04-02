"use client";
import { useEffect, useRef, useState } from "react";
import { Globe, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function SkillPassportBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skill-passport" className="relative py-24 overflow-hidden" style={{ background: "#f6f7f9" }}>
      <div className="blob-blue  w-72 h-72 bottom-[-10%] right-[-5%] opacity-60" style={{ filter: "blur(70px)" }} />
      <div className="blob-green w-56 h-56 top-[-10%] left-[20%]  opacity-50" style={{ filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/[0.07] mb-4">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#7aaa1f" }} />
            <span className="text-xs font-inter font-semibold text-gray-500 tracking-widest uppercase">Track. Prove. Grow.</span>
          </div>
          <h2 className="font-outfit font-black text-4xl lg:text-5xl text-gray-900">Your RGU Journey, Measured.</h2>
        </div>

        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-1000 glass-premium ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 12px 48px rgba(0,0,0,0.07)" }}
        >
          {/* Top color stripe — three separate stripes */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1" style={{ background: "#660066" }} />
            <div className="flex-1" style={{ background: "#006699" }} />
            <div className="flex-1" style={{ background: "#7aaa1f" }} />
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Global Skill Passport */}
            <div className="p-10 lg:p-14 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shine-effect" style={{ background: "#660066", boxShadow: "0 6px 20px rgba(102,0,102,0.25)" }}>
                  <Globe className="text-white w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-3xl text-gray-900">Global Skill Passport</h3>
                </div>
              </div>
              <div className="rounded-2xl p-5 mb-6" style={{ background: "#f5eaf5", border: "1px dashed rgba(102,0,102,0.2)" }}>
                <div className="space-y-4">
                  {[
                    { label: "SSCP (Semester Skill Certification Programme)", pct: 20 },
                    { label: "SIIP (Semester Industry Immersion Programme)", pct: 20 },
                    { label: "OLT (Outbound Leadership Training)",           pct: 20 },
                    { label: "FEP (Field Exposure Programme)",               pct: 20 },
                    { label: "GIP (Global Immersion Programme)",             pct: 20 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] font-bold font-inter mb-1.5 uppercase tracking-wider" style={{ color: "#660066" }}>
                        <span>{item.label}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: visible ? `${item.pct}%` : "0%", background: "#660066" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-inter text-gray-500 text-sm leading-relaxed">
                Your Global Skill Passport is a living digital credential — recording every certification, internship, exposure, and milestone accumulated throughout your RGU journey.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-inter font-semibold" style={{ color: "#660066" }}>
                <span>Learn more</span><span>→</span>
              </div>
            </div>

            {/* Growth Card */}
            <div className="p-10 lg:p-14">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shine-effect" style={{ background: "#7aaa1f", boxShadow: "0 6px 20px rgba(122,170,31,0.28)" }}>
                  <BarChart3 className="text-white w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-outfit font-black text-3xl text-gray-900">Growth Card</h3>
                </div>
              </div>
              <div className="rounded-2xl p-6 mb-6" style={{ background: "#f0f7e3", border: "1px solid rgba(122,170,31,0.18)" }}>
                <div className="flex items-center justify-between mb-5">
                  <div className="text-xs font-bold tracking-[0.2em] uppercase font-inter" style={{ color: "#7aaa1f" }}>Metrics Tracking</div>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#7aaa1f" }} />
                </div>
                <div className="space-y-4">
                  {[
                    { label: "RAALE Growth (Foundation)",         pct: 40, color: "#660066" },
                    { label: "Centre of Excellence Growth (Specialization)", pct: 25, color: "#006699" },
                    { label: "Communication Growth",               pct: 25, color: "#7aaa1f" },
                    { label: "Social & Leadership Growth",         pct: 10, color: "#660066" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs font-semibold font-inter mb-1.5">
                        <span className="text-gray-600">{bar.label}</span>
                        <span style={{ color: bar.color }}>{bar.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: visible ? `${bar.pct}%` : "0%", background: bar.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-inter text-gray-500 text-sm leading-relaxed">
                The <span className="font-bold" style={{ color: "#7aaa1f" }}>Growth Card</span> is your personal progress tracker — a semester-by-semester snapshot measuring how far you&#39;ve come.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-inter font-semibold" style={{ color: "#7aaa1f" }}>
                <span>Explore Metrics</span><span>→</span>
              </div>
            </div>
          </div>

          <div className="px-10 lg:px-14 py-5 flex items-center justify-between" style={{ background: "rgba(0,0,0,0.02)", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
            <p className="text-gray-400 text-xs font-inter">Together, the Skill Passport and Growth Card form your complete RGU transformation record.</p>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: "#660066" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#006699" }} />
              <div className="w-2 h-2 rounded-full" style={{ background: "#7aaa1f" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
