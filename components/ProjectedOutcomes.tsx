"use client";
import { useEffect, useRef, useState } from "react";

const outcomes = [
  {
    icon: "🌍",
    title: "Globally Ready",
    desc: "Equipped with international certifications, global immersion experience, and cross-cultural communication skills to thrive anywhere in the world.",
    color: "var(--rgu-purple)",
    rgb: "var(--rgu-purple-rgb)",
    stat: "40+",
    statLabel: "Global Partners",
  },
  {
    icon: "💼",
    title: "Career Ready",
    desc: "Armed with multiple internship experiences, industry connections, and job-ready skills from semester one — not just at graduation.",
    color: "var(--rgu-blue)",
    rgb: "var(--rgu-blue-rgb)",
    stat: "95%",
    statLabel: "Placement Rate",
  },
  {
    icon: "⚡",
    title: "Practical & Confident",
    desc: "Real-world exposure through field visits, hands-on projects, and live environments — so students perform, not just know.",
    color: "var(--rgu-green)",
    rgb: "var(--rgu-green-rgb)",
    stat: "6+",
    statLabel: "Real Projects / Year",
  },
  {
    icon: "🚀",
    title: "Leadership Oriented",
    desc: "Annual outbound leadership programmes and cross-functional challenges that build executive presence and strategic thinking.",
    color: "var(--rgu-purple)",
    rgb: "var(--rgu-purple-rgb)",
    stat: "2×",
    statLabel: "Leadership Tracks",
  },
  {
    icon: "🔮",
    title: "Future Ready",
    desc: "A student who graduates with the RGU Way is not just qualified — they are adaptable, resilient, and prepared for careers that don't yet exist.",
    color: "var(--rgu-blue)",
    rgb: "var(--rgu-blue-rgb)",
    stat: "∞",
    statLabel: "Possibilities",
  },
];

export default function ProjectedOutcomes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="outcomes"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #040016 0%, #020008 100%)" }}
    >
      {/* Premium background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-blue w-[600px] h-[600px] top-[-10%] right-[-5%] opacity-10 blur-[120px]" />
        <div className="orb orb-green w-[500px] h-[500px] bottom-[-10%] left-[-5%] opacity-10 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header - High End Design */}
        <div
          className={`text-center mb-24 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-premium border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-rgu-blue animate-pulse shadow-[0_0_10px_rgba(var(--rgu-blue-rgb),0.8)]" />
            <span className="text-[10px] font-bold text-white/60 tracking-[0.3em] uppercase">
              Transformation Agenda
            </span>
          </div>

          <h2 className="font-outfit font-black text-5xl lg:text-7xl text-white leading-tight mb-8 tracking-tighter">
            Projected{" "}
            <span className="text-glow-purple"
              style={{
                background: "linear-gradient(to right, #ffffff, var(--rgu-green))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Outcomes
            </span>
          </h2>
          <p className="font-inter text-white/50 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            The RGU Way doesn't just prepare you for a job. It prepares you for a life of
            <span className="text-white font-bold px-1">impact, leadership</span>, and <span className="text-rgu-green font-bold">global significance.</span>
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-6 lg:grid-cols-12 gap-8 mb-12">
          {outcomes.map((o, i) => {
            const isWide = i < 3;
            const colSpan = isWide ? "md:col-span-2 lg:col-span-4" : "md:col-span-3 lg:col-span-6";
            return (
              <div key={o.title} className={colSpan}>
                <OutcomeCard outcome={o} visible={visible} delay={i * 150} />
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div
          className={`mt-20 rounded-[2.5rem] p-10 lg:p-16 transition-all duration-1000 delay-1000 glass-premium overflow-hidden border border-white/10 relative group ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
           {/* Animated background highlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-rgu-purple/5 via-rgu-blue/5 to-rgu-green/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 text-center">
            <h3 className="font-outfit font-black text-3xl lg:text-5xl text-white mb-6 tracking-tight">
              One Journey. <span className="text-rgu-green">Five Transformations.</span>
            </h3>
            <p className="font-inter text-white/40 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Every element of the RGU Way is designed to compound — creating a graduate who is comprehensively ready for the world.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {outcomes.map((o) => (
                <div
                  key={o.title}
                  className="px-6 py-3 rounded-2xl text-xs font-bold font-inter tracking-widest uppercase glass group/chip overflow-hidden border border-white/5 transition-all hover:scale-105"
                  style={{ color: "white" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover/chip:opacity-10 transition-opacity" style={{ background: o.color }} />
                  {o.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomeCard({
  outcome,
  visible,
  delay,
}: {
  outcome: any;
  visible: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative h-full rounded-[2rem] p-10 overflow-hidden glass-card transition-all duration-700 border border-white/10 group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        boxShadow: hovered ? `0 30px 60px rgba(${outcome.rgb}, 0.15)` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Decorative corner glow */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 group-hover:opacity-30 blur-3xl transition-opacity duration-500"
        style={{ background: outcome.color }}
      />

      <div className="flex justify-between items-start mb-8">
        {/* Metric / Stat */}
        <div className="relative group/stat">
          <div
             className="font-outfit font-black text-4xl lg:text-5xl tracking-tighter transition-all duration-500 group-hover:scale-110"
             style={{ 
               color: "white",
               textShadow: `0 0 20px rgba(${outcome.rgb}, 0.4)`
             }}
          >
            {outcome.stat}
          </div>
          <div className="text-white/30 text-[10px] font-bold font-inter uppercase tracking-[0.2em] mt-1 group-hover:text-white/60 transition-colors">
            {outcome.statLabel}
          </div>
        </div>
        
        {/* Dynamic Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl glass border border-white/10 transition-all duration-500 group-hover:rotate-[15deg] group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, rgba(${outcome.rgb}, 0.2), transparent)`,
          }}
        >
          {outcome.icon}
        </div>
      </div>

      <h3 className="font-outfit font-black text-2xl text-white mb-4 group-hover:text-glow-purple transition-all duration-300">
        {outcome.title}
      </h3>
      <p className="font-inter text-white/40 text-base leading-relaxed group-hover:text-white/60 transition-colors duration-300">
        {outcome.desc}
      </p>

      {/* Progress handle */}
      <div className="mt-10 relative">
        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <div 
             className="h-full transition-all duration-1000 ease-out"
             style={{ 
               width: hovered ? "100%" : "20%",
               background: `linear-gradient(90deg, ${outcome.color}, transparent)`,
               boxShadow: `0 0 10px ${outcome.color}`
             }}
          />
        </div>
        <div 
          className="absolute -top-1 w-2 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            left: hovered ? "100%" : "20%",
            background: outcome.color,
            boxShadow: `0 0 10px ${outcome.color}`,
            transform: "translateX(-50%)"
          }}
        />
      </div>
    </div>
  );
}
