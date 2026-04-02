"use client";

const links = {
  "The RGU Way": ["Global Certification", "Internship Programme", "Outbound Leadership", "Global Immersion", "Skill Passport", "Growth Card"],
  "Programmes": ["Undergraduate", "Postgraduate", "Diploma Courses", "Certificate Programmes", "Online Learning", "Executive Education"],
  "Campus Life": ["Clubs & Societies", "Sports & Fitness", "Cultural Events", "Student Housing", "International Students", "Scholarships"],
  "Connect": ["About Us", "Faculty", "Research", "News & Media", "Alumni Network", "Contact"],
};

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020008 0%, #000005 100%)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Top gradient line */}
      <div
        className="h-0.5 w-full"
        style={{
          background: "linear-gradient(90deg, #660066, #006699, #99cc33, #660066)",
        }}
      />

      {/* Orb */}
      <div className="orb orb-purple w-96 h-96 bottom-0 left-1/2 opacity-10 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="py-16 grid lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Logo - High End Design */}
            <div className="flex items-center gap-4 group">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shine-effect glass-premium overflow-hidden border border-white/20"
                style={{
                  boxShadow: "0 0 30px rgba(var(--rgu-purple-rgb), 0.3)",
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
              <div>
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
            </div>

            <p className="font-inter text-white/40 text-sm leading-relaxed">
              Deemed to be University. Designed for the world. The RGU Way — Career Readiness +
              Global Readiness.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {["𝕏", "in", "f", "▶"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 transition-all duration-300 text-sm font-bold"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Accreditation badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-inter"
              style={{
                background: "rgba(153,204,51,0.08)",
                border: "1px solid rgba(153,204,51,0.2)",
                color: "rgba(153,204,51,0.7)",
              }}
            >
              <span>🎓</span>
              <span>Deemed to be University</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section} className="space-y-5">
              <h4
                className="font-outfit font-bold text-sm tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-inter text-sm text-white/40 hover:text-white/80 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span
                        className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "#99cc33" }}
                      />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div
          className="py-8 grid md:grid-cols-3 gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { icon: "📍", label: "Address", value: "Rathinam College Campus, Coimbatore, Tamil Nadu - 641021" },
            { icon: "📞", label: "Phone", value: "+91 422 000 0000" },
            { icon: "📧", label: "Email", value: "admissions@rgu.edu.in" },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3">
              <span className="text-lg mt-0.5">{c.icon}</span>
              <div>
                <div className="text-white/35 text-xs font-inter mb-1 tracking-wide uppercase">{c.label}</div>
                <div className="text-white/65 text-sm font-inter">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="py-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="font-inter text-white/25 text-xs">
            © {new Date().getFullYear()} Rathinam Global University. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((l) => (
              <a key={l} href="#" className="font-inter text-white/25 text-xs hover:text-white/50 transition-colors">
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#99cc33" }}
            />
            <span className="font-inter text-white/25 text-xs">The RGU Way</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
