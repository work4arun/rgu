"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "6+", label: "Global Certifications", sub: "per year" },
  { value: "6+", label: "Internships", sub: "per year" },
  { value: "100%", label: "Career Ready", sub: "graduates" },
  { value: "40+", label: "Global Partners", sub: "worldwide" },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number; y: number; size: number;
      speedX: number; speedY: number; color: string; opacity: number;
    }[] = [];

    const colors = ["#660066", "#006699", "#99cc33"];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(153,204,51,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden mesh-bg">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Glowing orbs */}
      <div className="orb orb-purple w-96 h-96 top-[-10%] left-[-5%] z-0" style={{ animationDelay: "0s" }} />
      <div className="orb orb-blue w-80 h-80 top-[10%] right-[5%] z-0" style={{ animationDelay: "2s" }} />
      <div className="orb orb-green w-64 h-64 bottom-[10%] left-[30%] z-0" style={{ animationDelay: "4s" }} />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(153,204,51,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(153,204,51,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#99cc33" }}
              />
              <span className="text-xs font-inter font-medium tracking-widest uppercase text-white/70">
                Deemed to be University
              </span>
            </div>

            {/* Main heading */}
            <div>
              <h1 className="font-outfit font-black leading-tight">
                <span className="block text-5xl lg:text-7xl text-white mb-2">The</span>
                <span
                  className="block text-6xl lg:text-8xl"
                  style={{
                    background: "linear-gradient(135deg, #cc44cc 0%, #0099cc 50%, #99cc33 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  RGU Way
                </span>
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-0.5 w-12 rounded-full" style={{ background: "#660066" }} />
                <p className="font-inter font-medium text-lg text-white/60 tracking-wide">
                  Career Readiness + Global Readiness
                </p>
                <div className="h-0.5 w-12 rounded-full" style={{ background: "#99cc33" }} />
              </div>
            </div>

            {/* Description */}
            <p className="font-inter text-white/65 text-lg leading-relaxed max-w-xl">
              Rathinam Global University's signature student transformation model — a structured
              pathway where every semester adds{" "}
              <span className="text-white/90 font-semibold">measurable value</span> to your journey.
              Not just a degree. A transformation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#rgu-way"
                className="btn-outline px-8 py-4 rounded-2xl text-base font-outfit font-semibold inline-flex items-center gap-2"
              >
                Explore
                <span className="text-lg">→</span>
              </a>
              <a
                href="#apply"
                className="btn-primary px-8 py-4 rounded-2xl text-base font-outfit font-semibold text-white inline-flex items-center gap-2 group"
              >
                Apply Now
                <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </a>
            </div>

            {/* Mini tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["Globally Ready", "Career Ready", "Future Ready"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-inter font-semibold glass border border-white/10 text-white/60"
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Floating Visual */}
          <div
            className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Right: Floating Visual - Premium Logo Badge */}
            <div
              className={`relative flex justify-center items-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="relative">
                {/* Outer rotating rings with brand colors */}
                <div
                  className="absolute inset-[-60px] rounded-full opacity-20 animate-spin-slow"
                  style={{
                    border: "2px dashed rgba(var(--rgu-green-rgb), 0.3)",
                  }}
                />
                <div
                  className="absolute inset-[-30px] rounded-full opacity-10"
                  style={{
                    border: "2px dashed rgba(var(--rgu-blue-rgb), 0.4)",
                    animation: "spin 12s linear infinite reverse",
                  }}
                />

                {/* Main glass circle badge */}
                <div
                  className="relative w-80 h-80 lg:w-[450px] lg:h-[450px] rounded-full glass-premium flex flex-col items-center justify-center overflow-hidden border border-white/10"
                  style={{
                    boxShadow: 
                      "0 0 80px rgba(var(--rgu-purple-rgb), 0.2), 0 0 120px rgba(var(--rgu-blue-rgb), 0.15), inset 0 0 60px rgba(255,255,255,0.02)",
                  }}
                >
                  {/* Dynamic background for the badge */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rgu-purple/20 via-transparent to-rgu-green/10 animate-pulse-slow" />
                  
                  {/* Logo Centerpiece */}
                  <div
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-[2.5rem] mb-6 flex items-center justify-center shine-effect glass-premium border-2 border-white/20 relative z-10"
                    style={{
                      boxShadow: "0 0 40px rgba(var(--rgu-purple-rgb), 0.5)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-rgu-purple via-rgu-blue to-rgu-green opacity-40" />
                    <div className="z-10 flex flex-col items-center">
                      <span className="text-white font-black text-4xl lg:text-5xl font-outfit leading-none mb-1 tracking-tighter">RG</span>
                      <span className="text-rgu-green font-bold text-xs lg:text-sm font-outfit leading-none tracking-[0.3em] uppercase">University</span>
                    </div>
                  </div>

                  <div className="text-center px-10 relative z-10">
                    <h3
                      className="font-outfit font-black text-3xl lg:text-4xl text-glow-purple mb-2"
                      style={{
                        background: "linear-gradient(to right, #ffffff, #99cc33)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Rathinam Global
                    </h3>
                    <p className="font-inter text-sm lg:text-base text-white/40 tracking-[0.4em] uppercase font-bold">
                      Deemed to be University
                    </p>
                  </div>

                  {/* Floating keywords with updated styles */}
                  {[
                    { label: "Global Cert", angle: -30, color: "var(--rgu-green)" },
                    { label: "Internship", angle: 30, color: "var(--rgu-blue)" },
                    { label: "Leadership", angle: 150, color: "var(--rgu-purple)" },
                    { label: "Immersion", angle: 210, color: "var(--rgu-green)" },
                  ].map(({ label, angle, color }) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + Math.cos(rad) * 44;
                    const y = 50 + Math.sin(rad) * 44;
                    return (
                      <div
                        key={label}
                        className="absolute text-[10px] lg:text-xs font-inter font-bold px-3 py-1.5 rounded-full glass border border-white/10"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          color: color,
                          boxShadow: `0 0 15px ${color}33`,
                        }}
                      >
                        ✦ {label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className={`mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="glass-card rounded-2xl p-5 text-center card-hover dashing-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="font-outfit font-black text-4xl mb-1"
                style={{
                  background: i % 3 === 0 ? "linear-gradient(135deg,#cc44cc,#006699)" : i % 3 === 1 ? "linear-gradient(135deg,#006699,#99cc33)" : "linear-gradient(135deg,#99cc33,#cc44cc)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div className="font-inter text-sm font-semibold text-white/80">{s.label}</div>
              <div className="font-inter text-xs text-white/40 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-white/30 text-xs font-inter tracking-widest uppercase">Scroll</span>
        <div
          className="w-0.5 h-10 rounded-full animate-pulse"
          style={{ background: "linear-gradient(to bottom, #99cc33, transparent)" }}
        />
      </div>
    </section>
  );
}
