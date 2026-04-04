"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* ── Project card with full-bleed photo ── */
function ProjectCard({ title, tag, result, accent, img, delay = 0 }: {
  title: string; tag: string; result: string; accent: string;
  img: string; delay?: number;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el  = e.currentTarget;
    const img = imgRef.current;
    el.style.transform = "translateY(-10px)";
    el.style.boxShadow = `0 40px 80px rgba(0,0,0,0.75), 0 0 0 1px ${accent}55, 0 0 60px ${accent}22`;
    if (img) img.style.transform = "scale(1.07)";
  };
  const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el  = e.currentTarget;
    const img = imgRef.current;
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)";
    if (img) img.style.transform = "scale(1)";
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s ease",
        cursor: "pointer",
        background: "#0d0f18",
      }}
    >
      {/* Photo area */}
      <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>
        {/* Full-bleed photo */}
        <div
          ref={imgRef}
          style={{
            position: "absolute", inset: 0,
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform",
          }}
        >
          <Image
            src={img}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Dark gradient overlay — lighter at top for browser chrome legibility */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)",
          zIndex: 1,
        }} />

        {/* Fake browser chrome on top of photo */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 2,
          background: "rgba(10,12,20,0.72)",
          backdropFilter: "blur(6px)",
          padding: "8px 14px",
          display: "flex", alignItems: "center", gap: "10px",
          borderBottom: `1px solid ${accent}22`,
        }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {["#ff5f57","#ffbd2e","#28c840"].map(c => (
              <div key={c} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{ flex: 1, height: "14px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }} />
        </div>

        {/* Bottom accent line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", zIndex: 2,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.6,
        }} />
      </div>

      {/* Info bar */}
      <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "0.88rem", fontWeight: 500, color: "#fff", fontFamily: "var(--font-inter),sans-serif", marginBottom: "3px" }}>{title}</div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontFamily: "var(--font-inter),sans-serif" }}>{tag}</div>
        </div>
        <div style={{
          fontSize: "0.7rem", fontFamily: "var(--font-inter),sans-serif",
          color: accent, background: `${accent}18`,
          border: `1px solid ${accent}40`,
          padding: "5px 12px", borderRadius: "100px",
          whiteSpace: "nowrap",
        }}>{result}</div>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function CreationsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [titleRef.current, gridRef.current].filter(Boolean) as HTMLElement[];
    els.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(36px)"; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.style.transition = "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)";
        el.style.opacity    = "1";
        el.style.transform  = "translateY(0)";
        observer.unobserve(el);
      });
    }, { threshold: 0.1 });

    els.forEach((el, i) => setTimeout(() => observer.observe(el), i * 120));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="nos-creations"
      className="section-pad"
      style={{
        background: "#030407",
        padding: "120px 24px 140px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Separator top */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.4), transparent)" }} />

      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "40%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "72px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
            <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.62rem", letterSpacing: "0.42em", color: "rgba(59,130,246,0.8)", textTransform: "uppercase" }}>Portfolio</span>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair),Georgia,serif", fontWeight: 400, fontSize: "clamp(2rem,5vw,3.8rem)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "0.02em" }}>
            Nos{" "}
            <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>créations</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
            Des transformations qui parlent d'elles-mêmes.
          </p>
        </div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="cards-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}
        >
          <ProjectCard
            title="Maison Dorée"
            tag="Pâtisserie artisanale"
            result="+310% commandes"
            accent="#d4a853"
            img="/card-patisserie.jpg"
            delay={0}
          />
          <ProjectCard
            title="ÉliteSport Coaching"
            tag="Coach sportif"
            result="+280% de leads"
            accent="#f97316"
            img="/card-coach.jpg"
            delay={80}
          />
          <ProjectCard
            title="Moreau Architectes"
            tag="Cabinet d'architecture"
            result="+190% de visibilité"
            accent="#94a3b8"
            img="/card-archi.jpg"
            delay={160}
          />
        </div>
      </div>
    </section>
  );
}
