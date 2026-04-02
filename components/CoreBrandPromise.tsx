"use client";
import { useEffect, useRef, useState } from "react";

const cards = [
  {
    icon: "🏆",
    title: "Global Certification",
    sub: "Every Semester",
    desc: "Students earn internationally recognised certifications each semester, building a verified global profile from Day 1.",
    color: "var(--rgu-purple)",
    rgb: "var(--rgu-purple-rgb)",
    delay: 0,
  },
  {
    icon: "💼",
    title: "Internship",
    sub: "Every Semester",
    desc: "Real-world work experience every semester — not just once. Students graduate with a rich, practice-based portfolio.",
    color: "var(--rgu-blue)",
    rgb: "var(--rgu-blue-rgb)",
    delay: 100,
  },
  {
    icon: "🌟",
    title: "Outbound Leadership",
    sub: "Every Year",
    desc: "Annual leadership programmes outside the campus — building resilience, teamwork, and executive presence.",
    color: "var(--rgu-green)",
    rgb: "var(--rgu-green-rgb)",
    delay: 200,
  },
  {
    icon: "🔭",
    title: "Field Exposure",
    sub: "Every Year",
    desc: "Industry visits, live projects, and on-ground learning experiences that connect classroom knowledge to the real world.",
    color: "var(--rgu-purple)",
    rgb: "var(--rgu-purple-rgb)",
    delay: 300,
  },
  {
    icon: "✈️",
    title: "Global Immersion",
    sub: "Programme",
    desc: "An international immersive experience exposing students to global campuses, cultures, and careers — broadening their worldview.",
    color: "var(--rgu-blue)",
    rgb: "var(--rgu-blue-rgb)",
    delay: 400,
  },
  {
    icon: "📊",
    title: "Measured Progress",
    sub: "Skill Passport + Growth Card",
    desc: "Every achievement is recorded, tracked, and certified through the Global Skill Passport and personal Growth Card.",
    color: "var(--rgu-green)",
    rgb: "var(--rgu-green-rgb)",
    delay: 500,
  },
];

export default function CoreBrandPromise() {
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
      id="core-promise"
      className="relative py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020008 0%, #040012 50%, #020008 100%)",
      }}
    >
      {/* Large decorative bg text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-outfit font-black text-[250px] lg:text-[400px] leading-none opacity-[0.02] text-white tracking-tighter"
        >
          GLOBAL
        </span>
      </div>

      {/* Orbs with brand colors */}
      <div className="orb orb-green w-[500px] h-[500px] top-[-5%] right-[10%] opacity-10 blur-[100px]" />
      <div className="orb orb-purple w-[450px] h-[450px] bottom-[5%] left-[5%] opacity-10 blur-[90px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header - High End Design */}
        <div
          className={`text-center mb-24 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-premium border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-rgu-purple animate-pulse shadow-[0_0_10px_rgba(var(--rgu-purple-rgb),0.8)]" />
            <span className="text-[10px] font-bold text-white/60 tracking-[0.3em] uppercase">
              The RGU Way
            </span>
          </div>

          <h2 className="font-outfit font-black text-5xl lg:text-7xl text-white leading-tight mb-8 tracking-tighter">
            Built for{" "}
            <span className="text-glow-purple"
              style={{
                background: "linear-gradient(to right, #ffffff, var(--rgu-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Global Readiness
            </span>
          </h2>
          <p className="font-inter text-white/55 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            RGU Way ensures that students begin building their profile from{" "}
            <span className="text-white font-bold underline decoration-rgu-blue decoration-2 underline-offset-4 px-1">semester one</span> — every element
            designed to stack, compound, and transform.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <DashingCard key={card.title} card={card} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DashingCard({
  card,
  visible,
  index,
}: {
  card: any;
  visible: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-[2.5rem] overflow-hidden glass-card transition-all duration-700 cursor-default group border border-white/5 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
      style={{
        transitionDelay: `${card.delay}ms`,
        boxShadow: hovered
          ? `0 30px 60px rgba(${card.rgb}, 0.15)`
          : "none",
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated dashing border - Fixed for SSR and dark mode */}
      <div
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none p-[1px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from var(--dash-angle, 0deg), ${card.color}, transparent 60%, ${card.color})`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          animation: "rotateBorder 4s linear infinite",
        }}
      />

      {/* Decorative background pulse */}
      <div 
        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-700" 
        style={{ from: card.color, to: "transparent" }} 
      />

      {/* Content */}
      <div className="relative z-10 p-10 h-full flex flex-col">
        <div className="flex justify-between items-start mb-8">
          {/* Icon Box */}
          <div
            className="w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-3xl glass border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
            style={{
              background: `linear-gradient(135deg, rgba(${card.rgb}, 0.2), transparent)`,
              boxShadow: hovered ? `0 0 25px rgba(${card.rgb}, 0.4)` : "none",
            }}
          >
            {card.icon}
          </div>
          
          {/* Timeline Badge */}
          <div 
            className="px-4 py-1.5 rounded-full text-[10px] font-bold font-inter tracking-widest uppercase glass border border-white/5"
            style={{ color: card.color }}
          >
            {card.sub}
          </div>
        </div>

        <h3 className="font-outfit font-black text-2xl text-white mb-4 group-hover:text-glow-purple transition-colors duration-300">
          {card.title}
        </h3>
        <p className="font-inter text-white/40 text-base leading-relaxed group-hover:text-white/60 transition-colors duration-300 flex-grow">
          {card.desc}
        </p>

        {/* Action / Detail indicator */}
        <div className="mt-8 flex items-center justify-between">
           <div className="h-[2px] rounded-full bg-white/5 flex-grow mr-4 overflow-hidden">
             <div 
               className="h-full transition-all duration-1000 ease-out"
               style={{ 
                 width: hovered ? "100%" : "20%",
                 background: card.color,
                 boxShadow: `0 0 10px ${card.color}`
               }}
             />
           </div>
           <span className="text-white/20 group-hover:text-white/60 transition-colors">→</span>
        </div>
      </div>
    </div>
  );
}
