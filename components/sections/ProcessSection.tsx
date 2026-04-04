"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Échange & Analyse",
    desc: "On commence par un appel gratuit. Je comprends votre activité, vos objectifs et votre cible pour construire une vision claire du projet.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Conception & Maquette",
    desc: "Je conçois votre site de A à Z — design, structure, contenu. Vous validez la maquette avant le moindre développement.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Livraison & Suivi",
    desc: "Votre site est mis en ligne, optimisé et prêt à convertir. Je reste disponible pour tout ajustement post-lancement.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = stepsRef.current.filter(Boolean) as HTMLDivElement[];
    els.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(32px)"; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const idx = els.indexOf(el as HTMLDivElement);
        setTimeout(() => {
          el.style.transition = "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)";
          el.style.opacity    = "1";
          el.style.transform  = "translateY(0)";
        }, idx * 150);
        observer.unobserve(el);
      });
    }, { threshold: 0.15 });

    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-pad"
      style={{
        background: "#050710",
        padding: "120px 24px 140px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top separator */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)" }} />

      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
            <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.62rem", letterSpacing: "0.42em", color: "rgba(59,130,246,0.8)", textTransform: "uppercase" }}>Processus</span>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair),Georgia,serif", fontWeight: 400, fontSize: "clamp(2rem,5vw,3.8rem)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>
            Comment ça{" "}
            <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>marche</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
            Simple, rapide, sans surprise.
          </p>
        </div>

        {/* Steps */}
        <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2px", position: "relative" }}>
          {STEPS.map((step, i) => (
            <div
              key={i}
              ref={el => { stepsRef.current[i] = el; }}
              style={{ position: "relative" }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block" style={{
                  position: "absolute",
                  top: "36px",
                  right: "-1px",
                  width: "2px",
                  height: "1px",
                  zIndex: 0,
                }} />
              )}

              <div style={{
                padding: "36px 32px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.02)",
                height: "100%",
                position: "relative",
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(59,130,246,0.25)";
                  el.style.background  = "rgba(59,130,246,0.04)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(255,255,255,0.05)";
                  el.style.background  = "rgba(255,255,255,0.02)";
                }}
              >
                {/* Step number */}
                <div style={{
                  fontFamily: "var(--font-playfair),Georgia,serif",
                  fontSize: "3rem",
                  fontWeight: 400,
                  color: "rgba(59,130,246,0.12)",
                  lineHeight: 1,
                  marginBottom: "20px",
                  letterSpacing: "-0.02em",
                }}>{step.num}</div>

                {/* Icon */}
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(59,130,246,0.8)",
                  marginBottom: "20px",
                }}>{step.icon}</div>

                <h3 style={{
                  fontFamily: "var(--font-inter),sans-serif",
                  fontWeight: 500,
                  fontSize: "1rem",
                  color: "#fff",
                  marginBottom: "12px",
                  letterSpacing: "0.01em",
                }}>{step.title}</h3>

                <p style={{
                  fontFamily: "var(--font-inter),sans-serif",
                  fontWeight: 300,
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.65,
                }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
