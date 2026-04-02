"use client";
import { Globe, Mountain, Mic2, PartyPopper, Lightbulb, Plane } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const events = [
  { category: "Global Summit",       title: "International Career Conclave 2025",   desc: "Bringing together 200+ global recruiters, students, and industry leaders for a 3-day immersive career festival.",            date: "March 2025",    tag: "Annual Event", color: "#660066", bg: "#f5eaf5", Icon: Globe },
  { category: "Leadership",          title: "Outbound Leadership Expedition",        desc: "Students take on real-world leadership challenges in outdoor settings — building resilience, teamwork, and strategic thinking.", date: "Every Semester", tag: "Ongoing",      color: "#006699", bg: "#e6f2f8", Icon: Mountain },
  { category: "Industry Connect",    title: "CEO Masterclass Series",                desc: "Exclusive sessions with C-suite executives, startup founders, and global thought leaders sharing live insights.",              date: "Monthly",        tag: "Regular",      color: "#7aaa1f", bg: "#f0f7e3", Icon: Mic2 },
  { category: "Cultural Festival",   title: "Rathinam International Fest",           desc: "A celebration of global cultures, arts, music, and sports — connecting students across nationalities and disciplines.",         date: "February 2025", tag: "Annual",       color: "#660066", bg: "#f5eaf5", Icon: PartyPopper },
  { category: "Innovation",          title: "RGU Hackathon & Startup Showcase",      desc: "48-hour hackathon where students pitch, build, and demo solutions to real industry problems — with live mentorship.",          date: "Quarterly",      tag: "Regular",      color: "#006699", bg: "#e6f2f8", Icon: Lightbulb },
  { category: "Global Immersion",    title: "Study Abroad Week",                     desc: "Students travel internationally for immersive learning at partner universities — bridging cultures and careers.",                date: "Year 3",         tag: "Annual",       color: "#7aaa1f", bg: "#f0f7e3", Icon: Plane },
];

export default function HappeningAtRGU() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Annual Event", "Ongoing", "Regular", "Monthly"];

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === "All" ? events : events.filter((e) => e.tag === activeFilter);

  return (
    <section ref={sectionRef} id="happening" className="relative py-28 overflow-hidden bg-white">
      <div className="blob-blue   w-80 h-80 bottom-[-10%] right-[-10%] opacity-50" style={{ filter: "blur(80px)" }} />
      <div className="blob-purple w-64 h-64 top-[5%] right-[30%] opacity-30"      style={{ filter: "blur(70px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-end mb-14 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/[0.07] mb-6">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#ff4444" }} />
              <span className="text-xs font-inter font-semibold text-gray-500 tracking-widest uppercase">Live & Upcoming</span>
            </div>
            <h2 className="font-outfit font-black text-5xl lg:text-7xl text-gray-900 leading-none">
              Happening <span style={{ color: "#006699" }}>@ RGU</span>
            </h2>
          </div>
          <div>
            <p className="font-inter text-gray-500 text-lg leading-relaxed">
              At RGU, something is always happening. From global summits to hackathons, leadership expeditions to cultural fests — the campus is alive with opportunity.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-inter font-semibold transition-all duration-300"
                  style={activeFilter === f
                    ? { background: "#660066", color: "white", boxShadow: "0 4px 12px rgba(102,0,102,0.3)" }
                    : { background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", color: "#6b7280" }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event, i) => <EventCard key={event.title} event={event} visible={visible} index={i} />)}
        </div>

        {/* CTA Banner */}
        <div
          className={`mt-14 rounded-3xl overflow-hidden relative transition-all duration-1000 delay-600 glass-card ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{ border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 flex">
            <div className="flex-1" style={{ background: "#660066" }} />
            <div className="flex-1" style={{ background: "#006699" }} />
            <div className="flex-1" style={{ background: "#7aaa1f" }} />
          </div>
          <div className="p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-outfit font-bold text-2xl lg:text-3xl text-gray-900 mb-2">Never miss what&#39;s happening at RGU</h3>
              <p className="font-inter text-gray-500 text-sm max-w-lg">Get real-time updates on events, workshops, international opportunities, and announcements.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <input type="email" placeholder="your@email.com" className="input-light px-5 py-3 rounded-xl text-sm font-inter" style={{ minWidth: "220px" }} />
              <button className="btn-primary px-6 py-3 rounded-xl text-sm font-outfit font-semibold whitespace-nowrap">Stay Updated →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, visible, index }: { event: typeof events[0]; visible: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`relative rounded-3xl overflow-hidden card-hover dashing-card transition-all duration-700 glass-card ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 100}ms`, borderTop: `3px solid ${event.color}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-inter font-bold px-3 py-1 rounded-full" style={{ background: event.bg, color: event.color }}>{event.category}</span>
          <span className="text-gray-400 text-xs font-inter">{event.date}</span>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: event.bg }}>
            <event.Icon size={20} style={{ color: event.color }} />
          </div>
          <h3 className="font-outfit font-bold text-base text-gray-900 leading-snug">{event.title}</h3>
        </div>
        <p className="font-inter text-gray-500 text-sm leading-relaxed">{event.desc}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-inter font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-400">{event.tag}</span>
          <span className="text-xs font-inter font-semibold flex items-center gap-1 transition-all duration-200" style={{ color: event.color }}>
            Details <span style={{ transform: hovered ? "translateX(2px)" : "none", transition: "transform 0.2s" }}>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
