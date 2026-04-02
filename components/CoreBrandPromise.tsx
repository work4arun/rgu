"use client";
import { Trophy, Briefcase, Star, Search, Plane, BarChart3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const cards = [
  { icon: <Trophy />,   title: "Global Certification", sub: "Every Semester",       desc: "Students earn internationally recognised certifications each semester, building a verified global profile from Day 1.",                                                          color: "#660066", bg: "#f5eaf5", delay: 0   },
  { icon: <Briefcase />,title: "Internship",            sub: "Every Semester",       desc: "Real-world work experience every semester — not just once. Students graduate with a rich, practice-based portfolio.",                                                               color: "#006699", bg: "#e6f2f8", delay: 100 },
  { icon: <Star />,     title: "Outbound Leadership",   sub: "Every Year",           desc: "Annual leadership programmes outside the campus — building resilience, teamwork, and executive presence.",                                                                           color: "#7aaa1f", bg: "#f0f7e3", delay: 200 },
  { icon: <Search />,   title: "Field Exposure",        sub: "Every Year",           desc: "Industry visits, live projects, and on-ground learning experiences that connect classroom knowledge to the real world.",                                                             color: "#660066", bg: "#f5eaf5", delay: 300 },
  { icon: <Plane />,    title: "Global Immersion",      sub: "Programme",            desc: "An international immersive experience exposing students to global campuses, cultures, and careers.",                                                                                 color: "#006699", bg: "#e6f2f8", delay: 400 },
  { icon: <BarChart3 />,title: "Measured Progress",     sub: "Skill Passport + Growth Card", desc: "Every achievement is recorded, tracked, and certified through the Global Skill Passport and personal Growth Card.",                                                                 color: "#7aaa1f", bg: "#f0f7e3", delay: 500 },
];

export default function CoreBrandPromise() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="core-promise" className="relative py-32 overflow-hidden bg-white">
      <div className="blob-purple w-[400px] h-[400px] top-[-5%] right-[5%] opacity-50" style={{ filter: "blur(80px)" }} />
      <div className="blob-green  w-[350px] h-[350px] bottom-[5%] left-[5%] opacity-50" style={{ filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-24 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/[0.07] mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#660066" }} />
            <span className="text-xs font-semibold text-gray-500 tracking-[0.25em] uppercase font-inter">The RGU Way</span>
          </div>
          <h2 className="font-outfit font-black text-5xl lg:text-7xl text-gray-900 leading-tight mb-8 tracking-tighter">
            Built for{" "}
            <span style={{ color: "#006699" }}>Global Readiness</span>
          </h2>
          <p className="font-inter text-gray-500 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            RGU Way ensures students begin building their profile from{" "}
            <span className="font-bold" style={{ color: "#660066" }}>semester one</span> — every element designed to stack, compound, and transform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => <CoreCard key={card.title} card={card} visible={visible} />)}
        </div>
      </div>
    </section>
  );
}

function CoreCard({ card, visible }: { card: typeof cards[0]; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-3xl overflow-hidden glass-card card-hover dashing-card transition-all duration-700 cursor-default ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}
      style={{ transitionDelay: `${card.delay}ms`, boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px ${card.color}18` : undefined }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="h-1 w-full" style={{ background: card.color }} />
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110" style={{ background: card.bg }}>
            {card.icon}
          </div>
          <span className="text-xs font-inter font-bold px-3 py-1.5 rounded-full" style={{ background: card.bg, color: card.color }}>{card.sub}</span>
        </div>
        <h3 className="font-outfit font-black text-xl text-gray-900 mb-3">{card.title}</h3>
        <p className="font-inter text-gray-500 text-sm leading-relaxed">{card.desc}</p>
        <div className="mt-6 h-0.5 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: hovered ? "100%" : "20%", background: card.color }} />
        </div>
      </div>
    </div>
  );
}
