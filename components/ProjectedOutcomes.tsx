"use client";
import { Globe, Briefcase, Zap, Rocket, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const outcomes = [
  { icon: <Globe />,      title: "Globally Ready",         desc: "Equipped with international certifications, global immersion experience, and cross-cultural communication skills to thrive anywhere in the world.", color: "#660066", bg: "#f5eaf5", stat: "40+", statLabel: "Global Partners" },
  { icon: <Briefcase />,  title: "Career Ready",            desc: "Armed with multiple internship experiences, industry connections, and job-ready skills from semester one — not just at graduation.",               color: "#006699", bg: "#e6f2f8", stat: "95%", statLabel: "Placement Rate" },
  { icon: <Zap />,        title: "Practical & Confident",   desc: "Real-world exposure through field visits, hands-on projects, and live environments — so students perform, not just know.",                       color: "#7aaa1f", bg: "#f0f7e3", stat: "6+",  statLabel: "Real Projects/Year" },
  { icon: <Rocket />,     title: "Leadership Oriented",     desc: "Annual outbound leadership programmes and cross-functional challenges that build executive presence and strategic thinking.",                     color: "#660066", bg: "#f5eaf5", stat: "2×",  statLabel: "Leadership Tracks" },
  { icon: <Sparkles />,   title: "Future Ready",            desc: "A student who graduates with the RGU Way is not just qualified — they are adaptable, resilient, and prepared for careers that don't yet exist.",  color: "#006699", bg: "#e6f2f8", stat: "∞",   statLabel: "Possibilities" },
];

export default function ProjectedOutcomes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="outcomes" className="relative py-32 overflow-hidden bg-white">
      <div className="blob-blue  w-[500px] h-[500px] top-[-10%] right-[-5%] opacity-40" style={{ filter: "blur(100px)" }} />
      <div className="blob-green w-[400px] h-[400px] bottom-[-10%] left-[-5%] opacity-40" style={{ filter: "blur(90px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`text-center mb-24 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/[0.07] mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#006699" }} />
            <span className="text-xs font-bold text-gray-500 tracking-[0.25em] uppercase font-inter">Transformation Agenda</span>
          </div>
          <h2 className="font-outfit font-black text-5xl lg:text-7xl text-gray-900 leading-tight mb-8 tracking-tighter">
            Projected <span style={{ color: "#7aaa1f" }}>Outcomes</span>
          </h2>
          <p className="font-inter text-gray-500 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            The RGU Way doesn&#39;t just prepare you for a job. It prepares you for a life of
            <span className="text-gray-800 font-semibold"> impact, leadership</span>, and
            <span className="font-semibold" style={{ color: "#7aaa1f" }}> global significance.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-6 lg:grid-cols-12 gap-6 mb-12">
          {outcomes.map((o, i) => {
            const isWide = i < 3;
            const colSpan = isWide ? "md:col-span-2 lg:col-span-4" : "md:col-span-3 lg:col-span-6";
            return (
              <div key={o.title} className={colSpan}>
                <OutcomeCard outcome={o} visible={visible} delay={i * 120} />
              </div>
            );
          })}
        </div>

        <div className={`mt-20 rounded-3xl p-10 lg:p-14 transition-all duration-1000 delay-700 glass-card overflow-hidden border border-black/[0.06] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="text-center">
            <h3 className="font-outfit font-black text-3xl lg:text-5xl text-gray-900 mb-5 tracking-tight">
              One Journey. <span style={{ color: "#7aaa1f" }}>Five Transformations.</span>
            </h3>
            <p className="font-inter text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Every element of the RGU Way is designed to compound — creating a graduate who is comprehensively ready for the world.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {outcomes.map((o) => (
                <div key={o.title} className="px-5 py-2.5 rounded-2xl text-xs font-bold font-inter tracking-wide card-hover" style={{ background: o.bg, color: o.color, border: `1px solid ${o.color}20` }}>
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

function OutcomeCard({ outcome, visible, delay }: { outcome: typeof outcomes[0]; visible: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative h-full rounded-3xl p-8 overflow-hidden glass-card card-hover transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${delay}ms`, borderTop: `3px solid ${outcome.color}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="font-outfit font-black text-4xl lg:text-5xl tracking-tighter" style={{ color: outcome.color }}>{outcome.stat}</div>
          <div className="text-gray-400 text-[10px] font-bold font-inter uppercase tracking-[0.2em] mt-1">{outcome.statLabel}</div>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-400" style={{ background: outcome.bg, transform: hovered ? "rotate(12deg) scale(1.1)" : "none" }}>
          {outcome.icon}
        </div>
      </div>
      <h3 className="font-outfit font-black text-xl text-gray-900 mb-3">{outcome.title}</h3>
      <p className="font-inter text-gray-500 text-sm leading-relaxed">{outcome.desc}</p>
      <div className="mt-8 relative h-0.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: hovered ? "100%" : "20%", background: outcome.color }} />
      </div>
    </div>
  );
}
