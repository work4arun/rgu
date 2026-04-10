"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",       href: "#about"    },
  { label: "The RGU Way", href: "#rgu-way"  },
  { label: "Programs",    href: "#programs" },
  { label: "Life @ RGU",  href: "#life"     },
  { label: "Contact",     href: "#contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={scrolled ? {
        background: "rgba(8,8,16,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "10px 0",
      } : {
        background: "transparent",
        padding: "20px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center flex-shrink-0 transition-all duration-300">
          <img src="/logo.png" alt="RGU" className="h-10 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform" />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="relative px-4 py-2 text-sm font-inter font-medium rounded-lg transition-colors duration-200 group"
              style={{ color: "rgba(255,255,255,0.68)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.68)")}
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-5 transition-all duration-300 rounded-full"
                style={{ background: "#a3e635" }} />
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#explore"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold font-inter border transition-all duration-300 hover:bg-white/10"
            style={{ borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.75)" }}>
            Explore
          </a>
          <a href="#apply"
            className="px-6 py-2.5 rounded-xl text-sm font-bold font-inter text-black transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
            style={{ background: "linear-gradient(90deg,#a3e635,#34d399)", boxShadow: "0 4px 16px rgba(163,230,53,.30)" }}>
            Apply Now →
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg border transition-all duration-200 hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden px-6 py-4 space-y-1 border-t"
          style={{ background: "rgba(8,8,16,0.96)", backdropFilter: "blur(24px)", borderColor: "rgba(255,255,255,0.08)" }}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="block px-4 py-3 text-sm rounded-xl transition-all duration-200 hover:bg-white/[0.06]"
              style={{ color: "rgba(255,255,255,0.7)" }}
              onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3">
            <a href="#explore"
              className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.8)" }}>
              Explore
            </a>
            <a href="#apply"
              className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-bold text-black"
              style={{ background: "linear-gradient(90deg,#a3e635,#34d399)" }}>
              Apply Now →
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
