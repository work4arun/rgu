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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-black/[0.06] py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center group">
          <div className="w-40 h-12 rounded-xl flex items-center justify-center glass-flash overflow-hidden flex-shrink-0" style={{ background: "#ffff", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 14px rgba(0,0,0,0.05)" }}>
            <img src="/logo.png" alt="RGU" className="w-[85%] h-[85%] object-contain" />
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="px-4 py-2 text-sm font-inter font-medium text-gray-600 hover:text-gray-900 rounded-lg transition-all duration-200 hover:bg-black/[0.04] relative group"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 group-hover:w-4 transition-all duration-300 rounded-full" style={{ background: "#ffffffff" }} />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="#explore" className="btn-outline-purple px-5 py-2.5 rounded-xl text-sm font-semibold font-inter">Explore</a>
          <a href="#apply" className="btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold font-inter">Apply Now →</a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2 rounded-lg glass border border-black/[0.06]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} className="text-gray-700" /> : <Menu size={20} className="text-gray-700" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-black/[0.06] px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="block px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-black/[0.03] rounded-lg transition-all" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-3">
            <a href="#explore" className="flex-1 text-center btn-outline-purple px-4 py-2.5 rounded-xl text-sm font-semibold">Explore</a>
            <a href="#apply" className="flex-1 text-center btn-primary px-4 py-2.5 rounded-xl text-sm font-semibold">Apply Now</a>
          </div>
        </div>
      )}
    </nav>
  );
}
