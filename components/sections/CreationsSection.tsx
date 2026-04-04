"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* ── Fake site overlays on top of photos ── */

function PatisserieOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2, fontFamily: "Georgia, serif", fontSize: "9px", display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ background: "rgba(20,12,4,0.82)", backdropFilter: "blur(6px)", padding: "7px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(212,168,83,0.2)" }}>
        <span style={{ color: "#d4a853", fontSize: "10px", fontWeight: "bold", letterSpacing: "0.18em" }}>MAISON DORÉE</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Boutique","Créations","Événements","Contact"].map(l => (
            <span key={l} style={{ color: "rgba(255,255,255,0.6)", fontSize: "7.5px", letterSpacing: "0.05em" }}>{l}</span>
          ))}
        </div>
      </div>
      {/* Hero content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "14px 18px", background: "linear-gradient(to right, rgba(10,6,2,0.75) 0%, rgba(10,6,2,0.2) 60%, transparent 100%)" }}>
        <div style={{ fontSize: "6.5px", letterSpacing: "0.38em", color: "#d4a853", marginBottom: "7px", fontFamily: "system-ui, sans-serif" }}>ARTISAN PÂTISSIER — PARIS 6e</div>
        <div style={{ fontSize: "20px", color: "#fff", fontWeight: "normal", lineHeight: 1.1, marginBottom: "10px" }}>Pâtisseries<br /><em style={{ color: "rgba(255,255,255,0.8)" }}>d'exception</em></div>
        <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.55)", fontFamily: "system-ui, sans-serif", marginBottom: "12px", lineHeight: 1.5 }}>Chaque création est façonnée<br />à la main avec passion.</div>
        <div style={{ background: "#d4a853", color: "#1a1208", fontSize: "6.5px", padding: "5px 14px", letterSpacing: "0.15em", fontFamily: "system-ui, sans-serif", fontWeight: "bold" }}>COMMANDER EN LIGNE</div>
      </div>
    </div>
  );
}

function CoachOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2, fontFamily: "system-ui, sans-serif", fontSize: "9px", display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ background: "rgba(4,6,14,0.78)", backdropFilter: "blur(6px)", padding: "7px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(249,115,22,0.18)" }}>
        <span style={{ color: "#fff", fontSize: "10px", fontWeight: "700", letterSpacing: "0.05em" }}>ÉLITE<span style={{ color: "#f97316" }}>SPORT</span></span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Programme","Résultats","Témoignages","Contact"].map(l => (
            <span key={l} style={{ color: "rgba(255,255,255,0.45)", fontSize: "7.5px" }}>{l}</span>
          ))}
        </div>
      </div>
      {/* Hero content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "14px 18px", background: "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)" }}>
        <div style={{ fontSize: "6.5px", letterSpacing: "0.3em", color: "#f97316", marginBottom: "8px" }}>COACHING D'ÉLITE — PARIS</div>
        <div style={{ fontSize: "22px", fontWeight: "800", color: "#fff", lineHeight: 1.0, marginBottom: "8px", textTransform: "uppercase" }}>Transformez<br />votre corps.</div>
        <div style={{ fontSize: "7.5px", color: "rgba(255,255,255,0.5)", marginBottom: "12px", lineHeight: 1.5 }}>Programme sur mesure · Résultats<br />garantis en 90 jours</div>
        <div style={{ background: "#f97316", color: "#fff", fontSize: "6.5px", padding: "5px 14px", borderRadius: "100px", letterSpacing: "0.1em", fontWeight: "700" }}>COMMENCER MAINTENANT</div>
      </div>
    </div>
  );
}

function ArchiOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 2, fontFamily: "system-ui, sans-serif", fontSize: "9px", display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)", padding: "7px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <span style={{ fontSize: "9px", fontWeight: "300", letterSpacing: "0.25em", color: "#222", textTransform: "uppercase" }}>Moreau <strong style={{ fontWeight: "600" }}>Architectes</strong></span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["Projets","Studio","Approche","Contact"].map(l => (
            <span key={l} style={{ color: "#999", fontSize: "7.5px", letterSpacing: "0.08em" }}>{l}</span>
          ))}
        </div>
      </div>
      {/* Hero content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-start", padding: "14px 18px 18px", background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}>
        <div style={{ fontSize: "6px", letterSpacing: "0.4em", color: "rgba(255,255,255,0.55)", marginBottom: "7px" }}>CABINET D'ARCHITECTURE — BORDEAUX</div>
        <div style={{ fontSize: "19px", fontWeight: "200", color: "#fff", lineHeight: 1.15, marginBottom: "10px", letterSpacing: "0.02em" }}>Concevoir<br />l'essentiel.</div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", fontSize: "6.5px", padding: "4px 12px", letterSpacing: "0.15em" }}>NOS PROJETS</div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "7px" }}>→ Prendre contact</div>
        </div>
      </div>
    </div>
  );
}

/* ── Project card ── */
function ProjectCard({ title, tag, result, accent, img, overlay, delay = 0 }: {
  title: string; tag: string; result: string; accent: string;
  img: string; overlay: React.ReactNode; delay?: number;
}) {
  const imgRef = useRef<HTMLDivElement>(null);

  const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el  = e.currentTarget;
    const img = imgRef.current;
    el.style.transform = "translateY(-10px)";
    el.style.boxShadow = `0 40px 80px rgba(0,0,0,0.75), 0 0 0 1px ${accent}55, 0 0 60px ${accent}22`;
    if (img) img.style.transform = "scale(1.06)";
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
      {/* Mockup area */}
      <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden" }}>

        {/* Browser chrome */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 3,
          background: "rgba(10,12,20,0.75)",
          backdropFilter: "blur(6px)",
          padding: "6px 12px",
          display: "flex", alignItems: "center", gap: "8px",
          borderBottom: `1px solid ${accent}22`,
        }}>
          <div style={{ display: "flex", gap: "4px" }}>
            {["#ff5f57","#ffbd2e","#28c840"].map(c => (
              <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c, opacity: 0.85 }} />
            ))}
          </div>
          <div style={{ flex: 1, height: "13px", background: "rgba(255,255,255,0.06)", borderRadius: "4px" }} />
        </div>

        {/* Photo background */}
        <div
          ref={imgRef}
          style={{
            position: "absolute", inset: 0,
            marginTop: "25px",
            transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)",
            willChange: "transform",
          }}
        >
          <Image src={img} alt={title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
        </div>

        {/* Site overlay */}
        <div style={{ position: "absolute", inset: 0, marginTop: "25px", zIndex: 2 }}>
          {overlay}
        </div>

        {/* Bottom accent line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", zIndex: 4,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.5,
        }} />
      </div>

      {/* Info bar */}
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.4), transparent)" }} />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "60%", height: "40%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
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
            overlay={<PatisserieOverlay />}
            delay={0}
          />
          <ProjectCard
            title="ÉliteSport Coaching"
            tag="Coach sportif"
            result="+280% de leads"
            accent="#f97316"
            img="/card-coach.jpg"
            overlay={<CoachOverlay />}
            delay={80}
          />
          <ProjectCard
            title="Moreau Architectes"
            tag="Cabinet d'architecture"
            result="+190% de visibilité"
            accent="#94a3b8"
            img="/card-archi.jpg"
            overlay={<ArchiOverlay />}
            delay={160}
          />
        </div>
      </div>
    </section>
  );
}
