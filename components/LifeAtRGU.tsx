"use client";
import { GraduationCap, Globe, Theater, Trophy, Users, Utensils, FlaskConical, Music, Plane, School } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const highlights = [
  { Icon: GraduationCap, label: "Academic Excellence",  color: "#660066", bg: "#f5eaf5" },
  { Icon: Globe,         label: "Global Exposure",       color: "#006699", bg: "#e6f2f8" },
  { Icon: Theater,       label: "Cultural Vibrancy",     color: "#7aaa1f", bg: "#f0f7e3" },
  { Icon: Trophy,        label: "Sports & Fitness",      color: "#660066", bg: "#f5eaf5" },
  { Icon: Users,         label: "Clubs & Societies",     color: "#006699", bg: "#e6f2f8" },
  { Icon: Utensils,      label: "Campus Living",         color: "#7aaa1f", bg: "#f0f7e3" },
  { Icon: FlaskConical,  label: "Innovation Labs",       color: "#660066", bg: "#f5eaf5" },
  { Icon: Music,         label: "Arts & Music",          color: "#006699", bg: "#e6f2f8" },
];

const galleryItems = [
  { Icon: FlaskConical, label: "Innovation Labs",   sub: "World-class Infrastructure", color: "#006699", bg: "#e6f2f8" },
  { Icon: Theater,      label: "Events & Fests",    sub: "Always Happening",           color: "#7aaa1f", bg: "#f0f7e3" },
  { Icon: Plane,        label: "Global Exchanges",  sub: "Study Abroad",               color: "#660066", bg: "#f5eaf5" },
  { Icon: Trophy,       label: "Sports Complex",    sub: "Champion Mindset",           color: "#006699", bg: "#e6f2f8" },
];

export default function LifeAtRGU() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="life" className="relative py-28 overflow-hidden" style={{ background: "#f6f7f9" }}>
      <div className="blob-purple w-80 h-80 top-0 left-[-10%] opacity-50"   style={{ filter: "blur(70px)" }} />
      <div className="blob-green  w-64 h-64 bottom-[-10%] right-[10%] opacity-50" style={{ filter: "blur(70px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-end mb-16 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/[0.07] mb-6">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#7aaa1f" }} />
              <span className="text-xs font-inter font-semibold text-gray-500 tracking-widest uppercase">The Campus Experience</span>
            </div>
            <h2 className="font-outfit font-black text-5xl lg:text-7xl text-gray-900 leading-none">
              Life @{" "}<span style={{ color: "#660066" }}>RGU</span>
            </h2>
          </div>
          <div>
            <p className="font-inter text-gray-500 text-lg leading-relaxed">
              Life at RGU extends far beyond classrooms. It&#39;s a vibrant, global community where students learn, grow, explore, and lead — every single day.
            </p>
            <a href="#explore-campus" className="mt-5 inline-flex items-center gap-2 font-inter font-semibold text-sm hover:gap-4 transition-all duration-300" style={{ color: "#7aaa1f" }}>
              Explore Campus Life <span>→</span>
            </a>
          </div>
        </div>

        <div className={`grid grid-cols-2 lg:grid-cols-3 gap-4 mb-14 transition-all duration-1000 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* Large card */}
          <div className="col-span-2 lg:col-span-1 row-span-2 rounded-3xl overflow-hidden relative card-hover shine-effect glass-card" style={{ minHeight: "300px" }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-4" style={{ background: "#f5eaf5" }}>
                <School size={40} style={{ color: "#660066" }} />
              </div>
              <h4 className="font-outfit font-bold text-2xl text-gray-900 mb-2">Campus Life</h4>
              <p className="font-inter text-gray-500 text-sm mb-4">Modern Spaces & Vibrant Community</p>
              <div className="px-4 py-1.5 rounded-full glass border border-black/[0.07] text-gray-400 text-xs font-inter font-medium">Photo Gallery</div>
            </div>
          </div>

          {galleryItems.map((item, i) => (
            <div
              key={item.label}
              className="rounded-3xl overflow-hidden relative card-hover glass-card"
              style={{ height: i < 2 ? "160px" : "180px" }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ background: item.bg }}>
                  <item.Icon size={24} style={{ color: item.color }} />
                </div>
                <h4 className="font-outfit font-bold text-base text-gray-900 mb-1">{item.label}</h4>
                <p className="font-inter text-gray-400 text-xs">{item.sub}</p>
              </div>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: item.color }} />
            </div>
          ))}
        </div>

        {/* Highlights marquee */}
        <div className={`relative transition-all duration-1000 delay-400 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="h-px bg-gray-200 mb-8" />
          <div className="overflow-hidden marquee-wrapper">
            <div className="marquee-content gap-4">
              {[...highlights, ...highlights].map((h, i) => (
                <div
                  key={`${h.label}-${i}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl flex-shrink-0 glass-card mr-4"
                  style={{ border: `1px solid ${h.color}18` }}
                >
                  <h.Icon size={18} style={{ color: h.color }} />
                  <span className="font-inter font-semibold text-sm text-gray-600 whitespace-nowrap">{h.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-gray-200 mt-8" />
        </div>
      </div>
    </section>
  );
}
