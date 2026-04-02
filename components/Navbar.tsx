"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "The RGU Way", href: "#rgu-way" },
  { label: "Programs", href: "#programs" },
  { label: "Life @ RGU", href: "#life" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-4 group">
          {/* Logo - High End Design */}
          <div className="relative">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shine-effect glass-premium overflow-hidden border border-white/20"
              style={{
                boxShadow: "0 0 30px rgba(var(--rgu-purple-rgb), 0.4)",
              }}
            >
              {/* Abstract RGU Logo Concept */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-rgu-purple via-rgu-blue to-rgu-green opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="z-10 flex flex-col items-center">
                  <span className="text-white font-black text-xl font-outfit leading-none mb-0.5 tracking-tighter">RG</span>
                  <span className="text-rgu-green font-bold text-[10px] font-outfit leading-none tracking-[0.2em] uppercase">University</span>
                </div>
              </div>
            </div>
            {/* Pulsing ring */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm"
              style={{
                background: "linear-gradient(135deg, #660066, #006699, #99cc33)",
              }}
            />
          </div>

          <div className="hidden sm:block">
            <div
              className="font-outfit font-black text-2xl tracking-tight leading-none text-glow-purple"
              style={{
                background: "linear-gradient(to right, #ffffff 30%, #99cc33 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              RGU
            </div>
            <div className="text-[10px] text-white/40 font-inter tracking-[0.3em] mt-0.5 font-bold uppercase">
              Rathinam Global
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-5 py-2 text-sm font-inter font-semibold text-white/60 hover:text-white rounded-xl transition-all duration-300 hover:bg-white/5 relative group"
            >
              {link.label}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 group-hover:w-3/4 transition-all duration-500 rounded-full blur-[1px]"
                style={{ background: "linear-gradient(90deg, #660066, #006699, #99cc33)" }}
              />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#explore"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold font-inter text-white/90 glass border border-white/15 hover:border-white/30 transition-all duration-300 hover:bg-white/5"
          >
            Explore
          </a>
          <a
            href="#apply"
            className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold font-inter text-white"
          >
            Apply Now →
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg glass border border-white/10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-white/10 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3">
            <a href="#explore" className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-semibold glass border border-white/15 text-white/80">
              Explore
            </a>
            <a href="#apply" className="flex-1 text-center btn-primary px-4 py-2.5 rounded-lg text-sm font-semibold text-white">
              Apply Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
