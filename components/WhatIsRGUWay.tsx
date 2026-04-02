"use client";
import { useEffect, useRef, useState } from "react";

export default function WhatIsRGUWay() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="rgu-way" className="relative py-28 overflow-hidden" style={{ background: "#f6f7f9" }}>
      <div className="blob-purple w-80 h-80 top-0 left-[-10%] opacity-50" style={{ filter: "blur(70px)" }} />
      <div className="blob-green  w-64 h-64 bottom-0 right-[-5%] opacity-50" style={{ filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
          <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(90deg, transparent, #660066)" }} />
          <span className="text-xs font-inter font-semibold tracking-widest uppercase" style={{ color: "#660066" }}>The Ecosystem</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <h2 className="font-outfit font-black text-4xl lg:text-6xl text-gray-900 leading-tight">
              What makes <span style={{ color: "#006699" }}>RGU Way</span> different?
            </h2>
            <p className="font-inter text-gray-500 text-lg leading-relaxed">
              The higher education market is crowded with similar claims around placements, internships, and exposure.
              Most institutions communicate these as <span className="text-gray-800 font-semibold">separate features</span>.
            </p>
            <p className="font-inter text-gray-500 text-lg leading-relaxed">
              RGU Way positions RGU differently by presenting them as one{" "}
              <span className="font-bold" style={{ color: "#7aaa1f" }}>integrated transformation ecosystem</span>.
              This shifts the conversation entirely.
            </p>

            <div className="rounded-2xl p-6 glass-card border border-black/[0.06]">
              <p className="text-gray-400 text-xs font-inter tracking-widest uppercase mb-5 font-semibold">The Shift</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 p-4 rounded-xl text-center" style={{ background: "#f5eaf5", border: "1px solid rgba(102,0,102,0.12)" }}>
                  <p className="text-xs text-gray-400 font-inter mb-2 font-semibold uppercase tracking-wide">FROM</p>
                  <p className="font-outfit font-semibold text-gray-600 text-sm">"What the university offers"</p>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg" style={{ background: "#660066" }}>→</div>
                <div className="flex-1 p-4 rounded-xl text-center" style={{ background: "#f0f7e3", border: "1px solid rgba(122,170,31,0.18)" }}>
                  <p className="text-xs font-inter mb-2 font-semibold uppercase tracking-wide" style={{ color: "#7aaa1f" }}>TO</p>
                  <p className="font-outfit font-bold text-sm" style={{ color: "#7aaa1f" }}>"What the student becomes"</p>
                </div>
              </div>
            </div>

            <p className="font-inter text-gray-500 text-base leading-relaxed">
              RGU Way is not a collection of isolated benefits. It is a structured pathway where every semester
              adds <span className="text-gray-800 font-semibold">measurable value</span> — globally ready, career ready, and future ready.
            </p>
          </div>

          <div className={`relative transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full" style={{ background: "linear-gradient(to bottom, #660066, #006699, #7aaa1f)" }} />
              {[
                { sem: "Year 1", title: "Foundation", items: ["Global Certification I", "Internship I", "Field Exposure I"],                                     color: "#660066", bg: "#f5eaf5" },
                { sem: "Year 2", title: "Exposure",   items: ["Global Certification II & III", "Internship II & III", "Outbound Leadership I"],                  color: "#006699", bg: "#e6f2f8" },
                { sem: "Year 3", title: "Mastery",    items: ["Global Immersion Programme", "Internship IV+", "Leadership II", "Skill Passport Review"],         color: "#7aaa1f", bg: "#f0f7e3" },
              ].map((yr, i) => (
                <div key={yr.sem} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[38px] w-4 h-4 rounded-full border-2 border-white" style={{ background: yr.color, top: "10px", boxShadow: `0 0 0 3px ${yr.color}30` }} />
                  <div className="glass-card rounded-2xl p-6 ml-4 card-hover" style={{ borderLeft: `3px solid ${yr.color}` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-inter font-bold px-2.5 py-1 rounded-full" style={{ background: yr.bg, color: yr.color }}>{yr.sem}</span>
                      <h4 className="font-outfit font-bold text-gray-900 text-lg">{yr.title}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {yr.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-500 font-inter">
                          <span style={{ color: yr.color }}>✦</span> {item}
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
