"use client";
import { Globe, Rocket, MessageCircle, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const pillars = [
  { Icon: Globe,         title: "Adapt",       desc: "Navigate changing global landscapes with confidence and clarity.",                                    color: "#660066", bg: "#f5eaf5" },
  { Icon: Rocket,        title: "Lead",        desc: "Step into leadership roles from your very first semester.",                                          color: "#006699", bg: "#e6f2f8" },
  { Icon: MessageCircle, title: "Communicate", desc: "Articulate ideas across cultures, languages, and contexts.",                                         color: "#7aaa1f", bg: "#f0f7e3" },
  { Icon: Zap,           title: "Perform",     desc: "Deliver results in real-world environments and high-pressure situations.",                           color: "#006699", bg: "#e6f2f8" },
];

export default function WhyMoreThanDegree() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="relative py-28 overflow-hidden bg-white">
      <div className="blob-blue w-64 h-64 bottom-0 right-0 opacity-60" style={{ filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/[0.07] mb-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7aaa1f" }} />
            <span className="text-xs font-inter font-semibold text-gray-500 tracking-widest uppercase">The Question</span>
          </div>
          <h2 className="font-outfit font-black text-4xl lg:text-6xl text-gray-900 leading-tight mb-6">
            Why do students need{" "}
            <span style={{ color: "#660066" }}>more than just a degree?</span>
          </h2>
          <p className="font-inter text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            The future belongs to students who can{" "}
            <span className="text-gray-800 font-semibold">adapt, lead, communicate,</span> and{" "}
            <span className="text-gray-800 font-semibold">perform</span> in real environments.
            RGU Way is built to develop exactly that.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className={`glass-card rounded-3xl p-8 text-center card-hover dashing-card shine-effect transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 120}ms`, borderTop: `3px solid ${p.color}` }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5" style={{ background: p.bg }}>
                <p.Icon size={32} style={{ color: p.color }} />
              </div>
              <h3 className="font-outfit font-bold text-2xl mb-3" style={{ color: p.color }}>{p.title}</h3>
              <p className="font-inter text-gray-500 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className={`relative rounded-3xl overflow-hidden transition-all duration-1000 delay-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ background: "#f6f7f9", border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-outfit font-black text-[120px] lg:text-[180px] leading-none text-gray-900 opacity-[0.025] tracking-tighter">RGU</span>
          </div>
          <div className="relative z-10 p-10 lg:p-16 text-center">
            <p className="font-outfit font-bold text-2xl lg:text-4xl leading-relaxed text-gray-800">
              "A degree opens the door.{" "}
              <span style={{ color: "#660066" }}>The RGU Way</span>{" "}
              makes you ready for what&#39;s on the other side."
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #660066)" }} />
              <span className="text-gray-400 text-sm font-inter tracking-widest uppercase">Rathinam Global University</span>
              <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #006699, transparent)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
