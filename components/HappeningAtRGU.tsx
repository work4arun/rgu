"use client";
import { useEffect, useRef, useState } from "react";

const events = [
  {
    category: "Global Summit",
    title: "International Career Conclave 2025",
    desc: "Bringing together 200+ global recruiters, students, and industry leaders for a 3-day immersive career festival.",
    date: "March 2025",
    tag: "Annual Event",
    color: "#660066",
    emoji: "🌍",
  },
  {
    category: "Leadership Programme",
    title: "Outbound Leadership Expedition",
    desc: "Students take on real-world leadership challenges in outdoor settings — building resilience, teamwork, and strategic thinking.",
    date: "Every Semester",
    tag: "Ongoing",
    color: "#006699",
    emoji: "🏔️",
  },
  {
    category: "Industry Connect",
    title: "CEO Masterclass Series",
    desc: "Exclusive sessions with C-suite executives, startup founders, and global thought leaders sharing live insights.",
    date: "Monthly",
    tag: "Regular",
    color: "#99cc33",
    emoji: "🎤",
  },
  {
    category: "Cultural Festival",
    title: "Rathinam International Fest",
    desc: "A celebration of global cultures, arts, music, and sports — connecting students across nationalities and disciplines.",
    date: "February 2025",
    tag: "Annual",
    color: "#660066",
    emoji: "🎊",
  },
  {
    category: "Innovation",
    title: "RGU Hackathon & Startup Showcase",
    desc: "48-hour hackathon where students pitch, build, and demo solutions to real industry problems — with live mentorship.",
    date: "Quarterly",
    tag: "Regular",
    color: "#006699",
    emoji: "💡",
  },
  {
    category: "Global Immersion",
    title: "Study Abroad Week",
    desc: "Students travel internationally for immersive learning at partner universities — bridging cultures and careers.",
    date: "Year 3",
    tag: "Annual",
    color: "#99cc33",
    emoji: "✈️",
  },
];

export default function HappeningAtRGU() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Annual Event", "Ongoing", "Regular", "Monthly"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === "All" ? events : events.filter((e) => e.tag === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="happening"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000510 0%, #020008 100%)" }}
    >
      {/* Orbs */}
      <div className="orb orb-blue w-96 h-96 bottom-[-10%] right-[-10%] opacity-25" />
      <div className="orb orb-purple w-72 h-72 top-[5%] right-[30%] opacity-15" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`grid lg:grid-cols-2 gap-12 items-end mb-14 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#ff4444" }}
              />
              <span className="text-xs font-inter font-medium text-white/60 tracking-widest uppercase">
                Live & Upcoming
              </span>
            </div>
            <h2 className="font-outfit font-black text-5xl lg:text-7xl text-white leading-none">
              Happening{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #cc44cc, #0099cc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                @ RGU
              </span>
            </h2>
          </div>
          <div>
            <p className="font-inter text-white/55 text-lg leading-relaxed">
              At RGU, something is always happening. From global summits to hackathons, leadership
              expeditions to cultural fests — the campus is alive with opportunity.
            </p>
            {/* Filter pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-4 py-1.5 rounded-full text-xs font-inter font-semibold transition-all duration-300"
                  style={{
                    background:
                      activeFilter === f
                        ? "linear-gradient(135deg, #660066, #006699)"
                        : "rgba(255,255,255,0.04)",
                    border: activeFilter === f ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                    color: activeFilter === f ? "white" : "rgba(255,255,255,0.5)",
                    boxShadow: activeFilter === f ? "0 0 20px rgba(102,0,102,0.4)" : "none",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event, i) => (
            <EventCard key={event.title} event={event} visible={visible} index={i} />
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className={`mt-16 rounded-3xl overflow-hidden relative transition-all duration-1000 delay-600 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          style={{
            background: "linear-gradient(135deg, rgba(102,0,102,0.2), rgba(0,102,153,0.2), rgba(153,204,51,0.1))",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: "linear-gradient(90deg, #660066, #006699, #99cc33)",
            }}
          />
          <div className="p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-outfit font-bold text-2xl lg:text-3xl text-white mb-3">
                Never miss what's happening at RGU
              </h3>
              <p className="font-inter text-white/50 text-sm max-w-lg">
                Get real-time updates on events, workshops, international opportunities, and
                announcements — straight to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-5 py-3 rounded-xl text-sm font-inter text-white placeholder-white/30 outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  minWidth: "220px",
                }}
              />
              <button
                className="btn-primary px-6 py-3 rounded-xl text-sm font-outfit font-semibold text-white whitespace-nowrap"
              >
                Stay Updated →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventCard({
  event,
  visible,
  index,
}: {
  event: (typeof events)[0];
  visible: boolean;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-3xl overflow-hidden card-hover dashing-card transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        background: `linear-gradient(135deg, ${event.color}18, ${event.color}06)`,
        border: `1px solid ${event.color}33`,
        boxShadow: hovered ? `0 20px 60px ${event.color}28` : "none",
        transition: "all 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top color bar */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${event.color}, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}
      />

      <div className="p-7">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="text-xs font-inter font-bold px-3 py-1 rounded-full"
            style={{
              background: `${event.color}22`,
              color: event.color,
              border: `1px solid ${event.color}44`,
            }}
          >
            {event.category}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: event.tag === "Ongoing" ? "#99cc33" : event.color, opacity: 0.7 }}
            />
            <span className="text-white/35 text-xs font-inter">{event.date}</span>
          </div>
        </div>

        {/* Emoji + Title */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: `${event.color}22`,
              border: `1px solid ${event.color}33`,
            }}
          >
            {event.emoji}
          </div>
          <h3 className="font-outfit font-bold text-lg text-white leading-snug">{event.title}</h3>
        </div>

        <p className="font-inter text-white/50 text-sm leading-relaxed">{event.desc}</p>

        {/* Bottom row */}
        <div className="mt-6 flex items-center justify-between">
          <span
            className="text-xs font-inter font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {event.tag}
          </span>
          <button
            className="text-xs font-inter font-semibold flex items-center gap-1 transition-all duration-300"
            style={{ color: event.color }}
          >
            Details <span className={hovered ? "translate-x-1" : ""} style={{ transition: "transform 0.2s" }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
