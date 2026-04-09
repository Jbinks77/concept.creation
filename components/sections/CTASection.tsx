"use client";

import { useEffect, useRef } from "react";

export default function CTASection() {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.opacity   = "0";
    el.style.transform = "translateY(30px)";

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.style.transition = "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)";
      el.style.opacity    = "1";
      el.style.transform  = "translateY(0)";
      observer.disconnect();
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        background: "#030407",
        padding: "120px 24px 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top separator */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, rgba(59,130,246,0.35), transparent)" }} />

      {/* Glow center */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div
        ref={innerRef}
        style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
          <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
          <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.62rem", letterSpacing: "0.42em", color: "rgba(59,130,246,0.8)", textTransform: "uppercase" }}>Contact</span>
          <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "var(--font-playfair),Georgia,serif",
          fontWeight: 400,
          fontSize: "clamp(2.2rem,5.5vw,4.2rem)",
          color: "#fff",
          lineHeight: 1.1,
          letterSpacing: "0.02em",
          marginBottom: "20px",
        }}>
          Prêt à transformer{" "}
          <span style={{ fontStyle: "italic", color: "rgba(255,255,255,0.3)" }}>votre site</span>
          {" "}?
        </h2>

        <p style={{
          fontFamily: "var(--font-inter),sans-serif",
          fontWeight: 300,
          fontSize: "1rem",
          color: "rgba(255,255,255,0.38)",
          marginBottom: "48px",
          lineHeight: 1.7,
        }}>
          Un premier échange gratuit, sans engagement.<br />
          On fait le point sur votre projet en 30 minutes.<br />
          <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
            Intervention en Seine-et-Marne (77) — Melun, Meaux, Fontainebleau et alentours.
          </span>
        </p>

        {/* Buttons */}
        <div className="cta-buttons" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <CTAButton href="https://wa.me/33621235008" primary>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.529 5.855L.057 23.925l6.244-1.44A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.708.856.883-3.596-.234-.372A9.783 9.783 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
            </svg>
            Écrire sur WhatsApp
          </CTAButton>
          <CTAButton href="mailto:creation.concept@outlook.fr">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
            </svg>
            Envoyer un mail
          </CTAButton>
        </div>
      </div>

      {/* Bottom footer line */}
      <div style={{ position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)", textAlign: "center", whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.62rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.13)", textTransform: "uppercase" }}>
          CC Création · Agence web Seine-et-Marne (77) · © {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
}

function CTAButton({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex", alignItems: "center", gap: "9px",
        padding: "14px 28px", fontSize: "0.85rem", letterSpacing: "0.01em",
        textDecoration: "none", borderRadius: "100px",
        fontFamily: "var(--font-inter),sans-serif", fontWeight: 500,
        whiteSpace: "nowrap",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        ...(primary
          ? { background: "#fff", border: "1px solid transparent", color: "#050810" }
          : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.6)" }),
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-2px)";
        if (primary) { el.style.background = "#e2ebff"; el.style.boxShadow = "0 0 40px rgba(255,255,255,0.18)"; }
        else { el.style.background = "rgba(255,255,255,0.09)"; el.style.borderColor = "rgba(255,255,255,0.32)"; el.style.color = "#fff"; }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)"; el.style.boxShadow = "none";
        if (primary) { el.style.background = "#fff"; }
        else { el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.14)"; el.style.color = "rgba(255,255,255,0.6)"; }
      }}
    >{children}</a>
  );
}
