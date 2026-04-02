"use client";
import { useEffect, useRef, useState } from "react";

const highlights = [
  { emoji: "🎓", label: "Academic Excellence", color: "#660066" },
  { emoji: "🌏", label: "Global Exposure", color: "#006699" },
  { emoji: "🎭", label: "Cultural Vibrancy", color: "#99cc33" },
  { emoji: "⚽", label: "Sports & Fitness", color: "#660066" },
  { emoji: "🤝", label: "Club & Societies", color: "#006699" },
  { emoji: "🍜", label: "Campus Living", color: "#99cc33" },
  { emoji: "🧪", label: "Innovation Labs", color: "#660066" },
  { emoji: "🎵", label: "Arts & Music", color: "#006699" },
];

const galleryItems = [
  { label: "Campus Life", sub: "Modern Spaces", color: "#660066", h: "h-64" },
  { label: "Labs & Studios", sub: "World-class Infrastructure", color: "#006699", h: "h-40" },
  { label: "Events & Fests", sub: "Always Happening", color: "#99cc33", h: "h-40" },
  { label: "Global Exchanges", sub: "Study Abroad", color: "#660066", h: "h-48" },
  { label: "Sports Complex", sub: "Champion Mindset", color: "#006699", h: "h-48" },
];

export default function LifeAtRGU() {
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
      id="life"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020008 0%, #000510 100%)" }}
    >
      {/* Orbs */}
      <div className="orb orb-purple w-96 h-96 top-0 left-[-10%] opacity-25" />
      <div className="orb orb-green w-72 h-72 bottom-[-10%] right-[10%] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`grid lg:grid-cols-2 gap-12 items-end mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#99cc33] animate-pulse" />
              <span className="text-xs font-inter font-medium text-white/60 tracking-widest uppercase">
                The Campus Experience
              </span>
            </div>
            <h2 className="font-outfit font-black text-5xl lg:text-7xl text-white leading-none">
              Life @{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #cc44cc, #0099cc, #99cc33)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                RGU
              </span>
            </h2>
          </div>
          <div>
            <p className="font-inter text-white/55 text-lg leading-relaxed">
              Life at RGU extends far beyond classrooms and lecture halls. It's a vibrant, global
              community where students learn, grow, explore, and lead — every single day.
            </p>
            <a
              href="#explore-campus"
              className="mt-6 inline-flex items-center gap-2 text-[#99cc33] font-inter font-semibold text-sm hover:gap-4 transition-all duration-300"
            >
              Explore Campus Life <span>→</span>
            </a>
          </div>
        </div>

        {/* Mosaic Gallery Placeholder */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-3 gap-4 mb-16 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          {/* Large card */}
          <div
            className="col-span-2 lg:col-span-1 row-span-2 h-64 lg:h-auto rounded-3xl overflow-hidden relative card-hover shine-effect"
            style={{
              background: "linear-gradient(135deg, rgba(102,0,102,0.3), rgba(0,102,153,0.3))",
              border: "1px solid rgba(255,255,255,0.07)",
              minHeight: "300px",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-5xl mb-4">🏛️</div>
              <h4 className="font-outfit font-bold text-2xl text-white mb-2">Campus Life</h4>
              <p className="font-inter text-white/50 text-sm">Modern Spaces & Vibrant Community</p>
              <div className="mt-4 px-4 py-1.5 rounded-full glass border border-white/10 text-white/40 text-xs font-inter">
                Photo Gallery
              </div>
            </div>
            {/* Placeholder grid pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "repeating-linear-gradient(45deg, #660066 0, #660066 1px, transparent 0, transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Medium cards */}
          {[
            { emoji: "🧪", label: "Innovation Labs", sub: "World-class Infrastructure", color: "#006699" },
            { emoji: "🎭", label: "Events & Fests", sub: "Always Happening", color: "#99cc33" },
            { emoji: "✈️", label: "Global Exchanges", sub: "Study Abroad", color: "#660066" },
            { emoji: "⚽", label: "Sports Complex", sub: "Champion Mindset", color: "#006699" },
          ].map((item, i) => (
            <div
              key={item.label}
              className="rounded-3xl overflow-hidden relative card-hover shine-effect"
              style={{
                background: `linear-gradient(135deg, ${item.color}22, ${item.color}08)`,
                border: `1px solid ${item.color}33`,
                height: i < 2 ? "160px" : "180px",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h4 className="font-outfit font-bold text-lg text-white mb-1">{item.label}</h4>
                <p className="font-inter text-white/40 text-xs">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Highlights marquee */}
        <div
          className={`relative transition-all duration-1000 delay-400 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="divider-gradient mb-8" />
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-[marquee_25s_linear_infinite]" style={{ width: "max-content" }}>
              {[...highlights, ...highlights].map((h, i) => (
                <div
                  key={`${h.label}-${i}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-card flex-shrink-0"
                  style={{ border: `1px solid ${h.color}33` }}
                >
                  <span className="text-xl">{h.emoji}</span>
                  <span className="font-inter font-medium text-sm text-white/70 whitespace-nowrap">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="divider-gradient mt-8" />
        </div>
      </div>
    </section>
  );
}
