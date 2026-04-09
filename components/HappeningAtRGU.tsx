"use client";
import { Globe, Mountain, Mic2, PartyPopper, Lightbulb, Plane } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const events = [
  { category: "Global Summit",    title: "International Career Conclave 2025",   desc: "200+ global recruiters, students, and industry leaders for a 3-day immersive career festival.",                       date: "March 2025",     tag: "Annual Event", color: "#a855f7", Icon: Globe       },
  { category: "Leadership",       title: "Outbound Leadership Expedition",        desc: "Students take on real-world leadership challenges in outdoor settings — building resilience and strategic thinking.",   date: "Every Semester", tag: "Ongoing",      color: "#38bdf8", Icon: Mountain    },
  { category: "Industry Connect", title: "CEO Masterclass Series",                desc: "Exclusive sessions with C-suite executives, startup founders, and global thought leaders sharing live insights.",       date: "Monthly",        tag: "Regular",      color: "#a3e635", Icon: Mic2        },
  { category: "Cultural Fest",    title: "Rathinam International Fest",           desc: "A celebration of global cultures, arts, music, and sports — connecting students across nationalities.",                 date: "February 2025",  tag: "Annual",       color: "#f472b6", Icon: PartyPopper },
  { category: "Innovation",       title: "RGU Hackathon & Startup Showcase",      desc: "48-hour hackathon where students pitch, build, and demo solutions to real industry problems with live mentorship.",     date: "Quarterly",      tag: "Regular",      color: "#fb923c", Icon: Lightbulb   },
  { category: "Global Immersion", title: "Study Abroad Week",                     desc: "Students travel internationally for immersive learning at partner universities — bridging cultures and careers.",        date: "Year 3",         tag: "Annual",       color: "#34d399", Icon: Plane       },
];

const filters = ["All", "Annual Event", "Ongoing", "Regular", "Monthly"];

export default function HappeningAtRGU() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const [active, setActive] = useState("All");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = active === "All" ? events : events.filter((e) => e.tag === active);

  return (
    <section ref={ref} id="happening" className="relative py-32 overflow-hidden"
      style={{ background: "#080810" }}>

      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(56,189,248,.06) 0%,transparent 70%)", bottom:"-15%", right:"-10%", filter:"blur(70px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`grid lg:grid-cols-2 gap-12 items-end mb-14 transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-6"
              style={{ background:"rgba(239,68,68,.1)", borderColor:"rgba(239,68,68,.25)", color:"#f87171" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#ef4444" }} />
              <span className="text-[10px] font-inter font-bold tracking-[0.28em] uppercase">Live & Upcoming</span>
            </div>
            <h2 className="font-outfit font-black text-5xl lg:text-7xl leading-none text-white">
              Happening{" "}
              <span style={{ background:"linear-gradient(90deg,#38bdf8,#34d399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                @ RGU
              </span>
            </h2>
          </div>
          <div>
            <p className="text-slate-400 text-lg leading-relaxed font-inter mb-5">
              From global summits to hackathons, leadership expeditions to cultural fests — the campus is always alive with opportunity.
            </p>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button key={f} onClick={() => setActive(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-inter font-bold transition-all duration-300"
                  style={active === f ? {
                    background: "linear-gradient(90deg,#a855f7,#38bdf8)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(168,85,247,.35)",
                  } : {
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(255,255,255,.1)",
                    color: "rgba(255,255,255,.5)",
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Event cards */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {filtered.map((ev) => (
            <div key={ev.title}
              className="group rounded-3xl border p-7 relative overflow-hidden cursor-default transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              style={{ background:`${ev.color}07`, borderColor:`${ev.color}25` }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 20px 60px ${ev.color}18`)}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:`linear-gradient(90deg,transparent,${ev.color},transparent)` }} />

              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                  style={{ background:`${ev.color}15`, border:`1px solid ${ev.color}30` }}>
                  <ev.Icon size={20} style={{ color:ev.color }} />
                </div>
                <span className="text-[10px] font-inter font-bold px-2.5 py-1 rounded-full"
                  style={{ background:`${ev.color}15`, color:ev.color, border:`1px solid ${ev.color}30` }}>
                  {ev.tag}
                </span>
              </div>

              <p className="text-[10px] font-inter font-bold uppercase tracking-wider mb-2" style={{ color:ev.color }}>{ev.category}</p>
              <h4 className="font-outfit font-bold text-white text-lg leading-tight mb-3">{ev.title}</h4>
              <p className="text-slate-400 text-sm font-inter leading-relaxed">{ev.desc}</p>

              <div className="mt-5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background:ev.color }} />
                <span className="text-[11px] text-slate-500 font-inter font-semibold">{ev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
