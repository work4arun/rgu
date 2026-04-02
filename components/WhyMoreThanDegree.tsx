"use client";
import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: "🌍",
    title: "Adapt",
    desc: "Navigate changing global landscapes with confidence and clarity.",
    color: "#660066",
  },
  {
    icon: "🚀",
    title: "Lead",
    desc: "Step into leadership roles from your very first semester.",
    color: "#006699",
  },
  {
    icon: "💬",
    title: "Communicate",
    desc: "Articulate ideas across cultures, languages, and contexts.",
    color: "#99cc33",
  },
  {
    icon: "⚡",
    title: "Perform",
    desc: "Deliver results in real-world environments and high-pressure situations.",
    color: "#660066",
  },
];

export default function WhyMoreThanDegree() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04000a 0%, #050010 50%, #04000a 100%)" }}
    >
      {/* Decorative orbs */}
      <div className="orb orb-blue w-72 h-72 bottom-0 right-0 opacity-30" />
      <div className="orb orb-green w-48 h-48 top-10 right-1/4 opacity-20" />

      {/* Vertical line decoration */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px opacity-10"
        style={{ background: "linear-gradient(to bottom, transparent, #99cc33, transparent)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#99cc33]" />
            <span className="text-xs font-inter font-medium text-white/60 tracking-widest uppercase">
              The Question
            </span>
          </div>

          <h2 className="font-outfit font-black text-4xl lg:text-6xl text-white leading-tight mb-6">
            Why do students need{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #cc44cc, #0099cc, #99cc33)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              more than just a degree?
            </span>
          </h2>

          <p className="font-inter text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            The future belongs to students who can{" "}
            <span className="text-white/90 font-semibold">adapt, lead, communicate,</span> and{" "}
            <span className="text-white/90 font-semibold">perform</span> in real environments.
            RGU Way is built to develop exactly that.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`glass-card rounded-3xl p-8 text-center card-hover dashing-card shine-effect transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                style={{
                  background: `linear-gradient(135deg, ${p.color}33, ${p.color}11)`,
                  border: `1px solid ${p.color}44`,
                  boxShadow: `0 0 20px ${p.color}22`,
                }}
              >
                {p.icon}
              </div>
              <h3
                className="font-outfit font-bold text-2xl mb-3"
                style={{
                  background: `linear-gradient(135deg, white, ${p.color}cc)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {p.title}
              </h3>
              <p className="font-inter text-white/55 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Wide quote banner */}
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-1000 delay-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{
            background: "linear-gradient(135deg, rgba(102,0,102,0.2), rgba(0,102,153,0.2))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Background text decoration */}
          <div
            className="absolute inset-0 flex items-center justify-center font-outfit font-black text-[120px] lg:text-[180px] leading-none select-none pointer-events-none opacity-[0.03] text-white"
          >
            RGU
          </div>

          <div className="relative z-10 p-10 lg:p-16 text-center">
            <p
              className="font-outfit font-bold text-2xl lg:text-4xl leading-relaxed text-white/90"
              style={{ textShadow: "0 0 40px rgba(153,204,51,0.3)" }}
            >
              "A degree opens the door.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #99cc33, #aade44)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                The RGU Way
              </span>{" "}
              makes you ready for what's on the other side."
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #660066)" }} />
              <span className="text-white/40 text-sm font-inter tracking-widest uppercase">Rathinam Global University</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #006699, transparent)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
