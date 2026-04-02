import { Twitter, Linkedin, Facebook, Youtube, GraduationCap, MapPin, Phone, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = {
  "The RGU Way": ["Global Certification", "Internship Programme", "Outbound Leadership", "Global Immersion", "Skill Passport", "Growth Card"],
  "Programmes":  ["Undergraduate", "Postgraduate", "Diploma Courses", "Certificate Programmes", "Online Learning", "Executive Education"],
  "Campus Life": ["Clubs & Societies", "Sports & Fitness", "Cultural Events", "Student Housing", "International Students", "Scholarships"],
  "Connect":     ["About Us", "Faculty", "Research", "News & Media", "Alumni Network", "Contact"],
};

export default function Footer() {
  const socialIcons = [
    { Icon: Twitter,  label: "𝕏" },
    { Icon: Linkedin, label: "in" },
    { Icon: Facebook, label: "f" },
    { Icon: Youtube,  label: "▶" },
  ];

  return (
    <footer id="contact" className="relative overflow-hidden" style={{ background: "#111827", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Top three-color stripe */}
      <div className="h-1 w-full flex">
        <div className="flex-1" style={{ background: "#660066" }} />
        <div className="flex-1" style={{ background: "#006699" }} />
        <div className="flex-1" style={{ background: "#7aaa1f" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main content */}
        <div className="py-16 grid lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-6">
            <a href="#" className="flex items-center group">
              <div className="w-40 h-12 rounded-xl flex items-center justify-center glass-flash overflow-hidden flex-shrink-0" style={{ background: "#ffffff", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
                <img src="/logo.png" alt="RGU" className="w-[85%] h-[85%] object-contain" />
              </div>
            </a>
            <p className="font-inter text-white/40 text-sm leading-relaxed">
              Deemed to be University. Designed for the world. The RGU Way — Career Readiness + Global Readiness.
            </p>
            <div className="flex gap-2.5">
              {socialIcons.map((social, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 group" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <social.Icon size={16} className="transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-inter" style={{ background: "rgba(122,170,31,0.1)", border: "1px solid rgba(122,170,31,0.2)", color: "rgba(122,170,31,0.8)" }}>
              <GraduationCap size={14} /><span>Deemed to be University</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="space-y-5">
              <h4 className="font-outfit font-bold text-sm tracking-widest uppercase text-white/50">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-inter text-sm text-white/35 hover:text-white/70 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "#7aaa1f" }} />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="py-8 grid md:grid-cols-3 gap-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {[
            { Icon: MapPin, label: "Address", value: "Rathinam College Campus, Coimbatore, Tamil Nadu - 641021" },
            { Icon: Phone,  label: "Phone",   value: "+91 422 000 0000" },
            { Icon: Mail,   label: "Email",   value: "admissions@rgu.edu.in" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3">
              <c.Icon size={20} className="text-white/30 mt-0.5" />
              <div>
                <div className="text-white/30 text-xs font-inter mb-1 tracking-wide uppercase font-semibold">{c.label}</div>
                <div className="text-white/60 text-sm font-inter">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="font-inter text-white/25 text-xs">© {new Date().getFullYear()} Rathinam Global University. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
              <a key={l} href="#" className="font-inter text-white/25 text-xs hover:text-white/50 transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#7aaa1f" }} />
            <span className="font-inter text-white/25 text-xs">The RGU Way</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
