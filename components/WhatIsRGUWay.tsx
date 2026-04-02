"use client";
import { useEffect, useRef, useState } from "react";

export default function WhatIsRGUWay() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const shiftItems = [
    {
      from: "\"What the university offers\"",
      to: "\"What the student becomes\"",
      color: "#660066",
      toColor: "#99cc33",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="rgu-way"
      className="relative py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #04000a 0%, #020008 100%)" }}
    >
      {/* Orbs */}
      <div className="orb orb-purple w-96 h-96 top-0 left-[-10%] opacity-25" />
      <div className="orb orb-blue w-64 h-64 bottom-0 right-[-5%] opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <div
          className={`flex items-center gap-4 mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
        >
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(90deg, transparent, #660066)" }} />
          <span className="text-xs font-inter font-semibold text-[#660066] tracking-widest uppercase">
            The Ecosystem
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            <h2 className="font-outfit font-black text-4xl lg:text-6xl text-white leading-tight">
              What makes{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #cc44cc, #0099cc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                RGU Way
              </span>{" "}
              <br />different?
            </h2>

            <p className="font-inter text-white/60 text-lg leading-relaxed">
              The higher education market is crowded with similar claims around placements,
              internships, and exposure. Most institutions communicate these as{" "}
              <span className="text-white/80 font-semibold">separate features</span>.
            </p>

            <p className="font-inter text-white/60 text-lg leading-relaxed">
              RGU Way positions RGU differently by presenting them as one{" "}
              <span
                className="font-bold"
                style={{
                  background: "linear-gradient(90deg, #99cc33, #aade44)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                integrated transformation ecosystem
              </span>
              . This shifts the conversation entirely.
            </p>

            {/* Shift banner */}
            <div
              className="rounded-2xl p-6 space-y-4"
              style={{
                background: "linear-gradient(135deg, rgba(102,0,102,0.15), rgba(0,102,153,0.15))",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-white/40 text-xs font-inter tracking-widest uppercase mb-4">The Shift</p>
              <div className="flex items-center gap-4">
                <div
                  className="flex-1 p-4 rounded-xl text-center"
                  style={{
                    background: "rgba(102,0,102,0.2)",
                    border: "1px solid rgba(102,0,102,0.3)",
                  }}
                >
                  <p className="text-xs text-white/40 font-inter mb-2">FROM</p>
                  <p className="font-outfit font-semibold text-white/70 text-sm">
                    "What the university offers"
                  </p>
                </div>
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #660066, #006699)" }}
                >
                  →
                </div>
                <div
                  className="flex-1 p-4 rounded-xl text-center"
                  style={{
                    background: "rgba(153,204,51,0.12)",
                    border: "1px solid rgba(153,204,51,0.25)",
                  }}
                >
                  <p className="text-xs text-[#99cc33]/70 font-inter mb-2">TO</p>
                  <p className="font-outfit font-bold text-[#99cc33] text-sm">
                    "What the student becomes"
                  </p>
                </div>
              </div>
            </div>

            <p className="font-inter text-white/55 text-base leading-relaxed">
              RGU Way is not a collection of isolated benefits. It is a structured pathway where
              every semester and every year adds{" "}
              <span className="text-white/85 font-semibold">measurable value</span> to the student
              journey — globally ready, career ready, and future ready.
            </p>
          </div>

          {/* Right: Visual timeline */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            {/* Semester journey */}
            <div className="relative pl-8">
              {/* Vertical line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                style={{
                  background: "linear-gradient(to bottom, #660066, #006699, #99cc33)",
                }}
              />

              {[
                { sem: "Year 1", title: "Foundation", items: ["Global Certification I", "Internship I", "Field Exposure I"], color: "#660066" },
                { sem: "Year 2", title: "Exposure", items: ["Global Certification II & III", "Internship II & III", "Outbound Leadership I"], color: "#006699" },
                { sem: "Year 3", title: "Mastery", items: ["Global Immersion Programme", "Internship IV+", "Leadership II", "Skill Passport Review"], color: "#99cc33" },
              ].map((yr, i) => (
                <div key={yr.sem} className="relative mb-10 last:mb-0">
                  {/* Dot */}
                  <div
                    className="absolute -left-[38px] w-4 h-4 rounded-full border-2 border-white/20"
                    style={{ background: yr.color, top: "6px", boxShadow: `0 0 12px ${yr.color}88` }}
                  />
                  <div
                    className="glass-card rounded-2xl p-6 ml-4 card-hover"
                    style={{ borderLeft: `2px solid ${yr.color}44` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-xs font-inter font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${yr.color}22`, color: yr.color, border: `1px solid ${yr.color}44` }}
                      >
                        {yr.sem}
                      </span>
                      <h4 className="font-outfit font-bold text-white text-lg">{yr.title}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {yr.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-white/60 font-inter">
                          <span style={{ color: yr.color }}>✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
