"use client";
import { useEffect, useState, useRef } from "react";
import { Globe, Briefcase, Plus, Equal, Sparkles, GraduationCap } from "lucide-react";

const stats = [
  { value: 6, suffix: "", label: "Global Certifications", sub: "Validate your skills worldwide", color: "#660066" },
  { value: 2, suffix: "", label: "Internships / Degree", sub: "Experience, not just knowledge", color: "#006699" },
  { value: 100, suffix: "%", label: "Career Readiness", sub: "Industry-ready from Day One", color: "#7aaa1f" },
  { value: 40, suffix: "+", label: "Global Partners", sub: "Connect with world leaders", color: "#660066" },
];

function CountingNumber({ target, suffix, color, mounted }: { target: number; suffix: string; color: string; mounted: boolean }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!mounted || started.current) return;
    started.current = true;
    const duration = 1600;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [mounted, target]);

  return (
    <div className="font-outfit font-black text-4xl mb-1" style={{ color }}>
      {count}{suffix}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #faf5fa 0%, #f0f4fa 45%, #f5fae8 100%)" }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes spinCW  { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
        @keyframes spinCCW { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
        @keyframes bobA    { 0%,100% { transform: translate(-50%,-50%) translateY(0px);   } 50% { transform: translate(-50%,-50%) translateY(-8px);  } }
        @keyframes bobB    { 0%,100% { transform: translate(-50%,-50%) translateY(0px);   } 50% { transform: translate(-50%,-50%) translateY(-10px); } }
        @keyframes bobC    { 0%,100% { transform: translate(-50%,-50%) translateY(0px);   } 50% { transform: translate(-50%,-50%) translateY(-6px);  } }
        @keyframes bobD    { 0%,100% { transform: translate(-50%,-50%) translateY(0px);   } 50% { transform: translate(-50%,-50%) translateY(-9px);  } }
        @keyframes breathe { 0%,100% { box-shadow: 0 12px 36px rgba(102,0,102,0.28), 0 0 0 0px rgba(102,0,102,0.15); }
                             50%     { box-shadow: 0 12px 48px rgba(102,0,102,0.4),  0 0 0 8px rgba(102,0,102,0.05); } }
        @keyframes pulseRing { 0%,100% { opacity: 0.10; transform: scale(1);    }
                                50%    { opacity: 0.22; transform: scale(1.015); } }
        @keyframes arcGlow { 0%,100% { filter: drop-shadow(0 0 4px rgba(102,0,102,0.3));  }
                              50%    { filter: drop-shadow(0 0 10px rgba(102,0,102,0.6)); } }
        @keyframes arcGlowBlue { 0%,100% { filter: drop-shadow(0 0 4px rgba(0,102,153,0.3));  }
                                  50%    { filter: drop-shadow(0 0 10px rgba(0,102,153,0.6)); } }
      `}</style>

      {/* Background blobs */}
      <div className="blob-purple w-[600px] h-[600px] top-[-10%] left-[-8%]" style={{ filter: "blur(80px)" }} />
      <div className="blob-blue   w-[500px] h-[500px] top-[5%] right-[-5%]" style={{ filter: "blur(90px)" }} />
      <div className="blob-green  w-[400px] h-[400px] bottom-[0%] left-[30%]" style={{ filter: "blur(100px)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(#660066 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Left: Text ── */}
          <div className={`space-y-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/[0.06]">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#7aaa1f" }} />
              <span className="text-xs font-inter font-semibold tracking-widest uppercase text-gray-500">Deemed to be University</span>
            </div>
            <div>
              <h1 className="font-outfit font-black leading-tight">
                <span className="block text-5xl lg:text-7xl text-gray-900 mb-2">The</span>
                <span className="block text-6xl lg:text-8xl" style={{ color: "#660066" }}>RGU Way</span>
              </h1>
              <div className="mt-5 flex items-center gap-3">
                <div className="h-0.5 w-10 rounded-full" style={{ background: "#660066" }} />
                <p className="font-inter font-semibold text-base text-gray-500 tracking-wide">Career Readiness + Global Readiness</p>
                <div className="h-0.5 w-10 rounded-full" style={{ background: "#7aaa1f" }} />
              </div>
            </div>
            <p className="font-inter text-gray-500 text-lg leading-relaxed max-w-xl">
              Rathinam Global University&#39;s signature student transformation model — a structured
              pathway where every semester adds{" "}
              <span className="text-gray-900 font-semibold">measurable value</span> to your journey.
              Not just a degree. A transformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#rgu-way" className="btn-outline-purple px-8 py-4 rounded-2xl text-base font-outfit font-semibold inline-flex items-center gap-2">
                Explore <span>→</span>
              </a>
              <a href="#apply" className="btn-primary px-8 py-4 rounded-2xl text-base font-outfit font-semibold inline-flex items-center gap-2 group">
                Apply Now
                <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </a>
            </div>
            {/* Brand equation — inline teaser */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="font-inter text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-md"
                style={{ background: "#e6f2f8", color: "#006699", letterSpacing: "0.08em" }}
              >
                Global Readiness
              </span>
              <span className="font-outfit font-black text-lg leading-none" style={{ color: "#d1d5db" }}>+</span>
              <span
                className="font-inter text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-md"
                style={{ background: "#f5eaf5", color: "#660066", letterSpacing: "0.08em" }}
              >
                Career Readiness
              </span>
              <span className="font-outfit font-black text-lg leading-none" style={{ color: "#d1d5db" }}>=</span>
              <span className="font-outfit font-black text-sm" style={{ color: "#660066" }}>The RGU Way</span>
            </div>
          </div>

          {/* ── Right: Animated Badge ── */}
          <div className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="relative">

              {/* ── Ring 1: Outermost green pulse ring ── */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-72px",
                  border: "1.5px solid rgba(122,170,31,0.25)",
                  animation: "pulseRing 4s ease-in-out infinite",
                }}
              />

              {/* ── Ring 2: Purple outer dashed ring + orbiting dot ── */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-50px",
                  border: "2px dashed rgba(102,0,102,0.28)",
                }}
              />
              {/* Purple orbiting dot container */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-50px",
                  borderRadius: "50%",
                  animation: "spinCW 16s linear infinite",
                }}
              >
                {/* Leading dot */}
                <div style={{
                  position: "absolute",
                  width: "12px", height: "12px",
                  borderRadius: "50%",
                  background: "#660066",
                  top: "-6px",
                  left: "calc(50% - 6px)",
                  boxShadow: "0 0 0 3px rgba(102,0,102,0.15), 0 0 12px rgba(102,0,102,0.5)",
                }} />
                {/* Trailing glow */}
                <div style={{
                  position: "absolute",
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: "rgba(102,0,102,0.4)",
                  top: "6px",
                  left: "calc(50% - 3px)",
                  boxShadow: "0 0 8px rgba(102,0,102,0.3)",
                  transform: "rotate(8deg) translateX(18px)",
                }} />
              </div>

              {/* ── Ring 3: Blue inner dashed ring + reverse orbiting dot ── */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-26px",
                  border: "2px dashed rgba(0,102,153,0.22)",
                }}
              />
              {/* Blue orbiting dot — reverse */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-26px",
                  borderRadius: "50%",
                  animation: "spinCCW 11s linear infinite",
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "10px", height: "10px",
                  borderRadius: "50%",
                  background: "#006699",
                  bottom: "-5px",
                  left: "calc(50% - 5px)",
                  boxShadow: "0 0 0 2.5px rgba(0,102,153,0.15), 0 0 10px rgba(0,102,153,0.5)",
                }} />
              </div>

              {/* ── Main Glass Circle ── */}
              <div
                className="relative w-[320px] h-[320px] lg:w-[410px] lg:h-[410px] rounded-full glass-premium flex flex-col items-center justify-center overflow-hidden"
                style={{ border: "1.5px solid rgba(255,255,255,0.95)" }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0" style={{
                  background: "radial-gradient(circle at 35% 35%, rgba(102,0,102,0.06), transparent 55%), radial-gradient(circle at 70% 70%, rgba(0,102,153,0.05), transparent 55%)",
                }} />

                {/* ── Rectangular Logo Piece ── */}
                <div
                  className="relative w-[98%] h-[20%] rounded-3xl flex items-center justify-center glass-flash overflow-hidden"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: "0 12px 64px rgba(0,0,0,0.15)",
                  }}
                >
                  <img src="/rgu.png" alt="RGU Logo" className="w-[94%] h-[94%] object-contain" />
                </div>

                {/* ── Floating keyword pills ── */}
                {[
                  { label: "Global Cert", angle: -35, color: "#660066", bg: "#f5eaf5", anim: "bobA 3.2s ease-in-out infinite" },
                  { label: "Internship", angle: 25, color: "#006699", bg: "#e6f2f8", anim: "bobB 3.8s ease-in-out infinite 0.4s" },
                  { label: "Leadership", angle: 145, color: "#660066", bg: "#f5eaf5", anim: "bobC 4.1s ease-in-out infinite 0.8s" },
                  { label: "Immersion", angle: 215, color: "#7aaa1f", bg: "#f0f7e3", anim: "bobD 3.5s ease-in-out infinite 1.2s" },
                ].map(({ label, angle, color, bg, anim }) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + Math.cos(rad) * 43;
                  const y = 50 + Math.sin(rad) * 43;
                  return (
                    <div
                      key={label}
                      className="absolute text-[10px] lg:text-xs font-inter font-bold px-3 py-1.5 rounded-full"
                      style={{
                        left: `${x}%`, top: `${y}%`,
                        transform: "translate(-50%,-50%)",
                        color, background: bg,
                        border: `1px solid ${color}22`,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        whiteSpace: "nowrap",
                        animation: anim,
                      }}
                    >✦ {label}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats with counting numbers ── */}
        <div className={`mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {stats.map((s, i) => (
            <div key={s.label} className="glass-card rounded-3xl p-6 text-center card-hover dashing-card flex flex-col items-center justify-center min-h-[160px] group transition-all duration-300">
              <CountingNumber target={s.value} suffix={s.suffix} color={s.color} mounted={mounted} />
              <div className="font-outfit text-base font-bold text-gray-900 tracking-tight leading-tight group-hover:scale-105 transition-transform duration-300">{s.label}</div>
              <div className="font-inter text-xs text-gray-400 mt-2 leading-relaxed max-w-[150px] mx-auto">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BRAND EQUATION BANNER — full width ── */}
      <div
        className={`relative w-full mt-16 transition-all duration-1000 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        {/* Three-segment split */}
        <div className="flex flex-col lg:flex-row">

          {/* Segment 1 — Globally Ready */}
          <div
            className="flex-1 flex items-center gap-5 px-10 py-8 group cursor-default transition-all duration-300"
            style={{ background: "rgba(122,170,31,0.05)", borderBottom: "3px solid #7aaa1f" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ background: "#f0f7e3" }}
            >
              <Globe className="w-7 h-7" style={{ color: "#7aaa1f" }} />
            </div>
            <div>
              <div className="font-outfit font-black text-xl text-gray-900 mb-0.5" style={{ letterSpacing: "-0.02em" }}>
                Globally Ready
              </div>
              <div className="font-inter text-xs text-gray-400 leading-relaxed">
                International certifications · Global immersion · Cross-cultural fluency
              </div>
            </div>
            <div
              className="ml-auto flex items-center justify-center hidden lg:flex"
              style={{ color: "rgba(122,170,31,0.2)" }}
            >
              <Plus className="w-8 h-8 stroke-[3]" />
            </div>
          </div>

          {/* Segment 2 — Career Ready */}
          <div
            className="flex-1 flex items-center gap-5 px-10 py-8 group cursor-default transition-all duration-300"
            style={{ background: "rgba(0,102,153,0.05)", borderBottom: "3px solid #006699" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ background: "#e6f2f8" }}
            >
              <Briefcase className="w-7 h-7" style={{ color: "#006699" }} />
            </div>
            <div>
              <div className="font-outfit font-black text-xl text-gray-900 mb-0.5" style={{ letterSpacing: "-0.02em" }}>
                Career Ready
              </div>
              <div className="font-inter text-xs text-gray-400 leading-relaxed">
                Industry internships · Job-ready skills · Real-world portfolios
              </div>
            </div>
            <div
              className="ml-auto flex items-center justify-center hidden lg:flex"
              style={{ color: "rgba(0,102,153,0.2)" }}
            >
              <Equal className="w-8 h-8 stroke-[3]" />
            </div>
          </div>

          {/* Result — THE RGU WAY */}
          <div
            className="flex items-center gap-5 px-10 py-8 relative overflow-hidden group cursor-default"
            style={{ background: "#660066", minWidth: "260px", borderBottom: "3px solid #7aaa1f" }}
          >
            {/* Shine sweep */}
            <div className="shine-effect absolute inset-0 pointer-events-none" />
            {/* Subtle green glow top-right */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 pointer-events-none" style={{ background: "#7aaa1f", filter: "blur(30px)" }} />

            <div className="relative z-10">
              <div className="font-inter text-xs text-white/50 tracking-[0.25em] uppercase font-semibold mb-1">
                The result
              </div>
              <div className="font-outfit font-black text-2xl text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
                THE RGU WAY
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#7aaa1f" }} />
                <span className="font-inter text-xs text-white/55">Your complete transformation</span>
              </div>
            </div>

            <div
              className="relative z-10 ml-auto w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-12"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              <span className="text-white text-sm font-outfit font-black">✦</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="py-6 flex flex-col items-center gap-2 z-10">
        <span className="text-gray-400 text-xs font-inter tracking-widest uppercase">Scroll</span>
        <div className="w-0.5 h-8 rounded-full animate-pulse" style={{ background: "#7aaa1f" }} />
      </div>
    </section>
  );
}
