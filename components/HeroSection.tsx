"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";


/* ─────────────────────────────────────────────
   FAUX ANCIEN SITE — 100% HTML/CSS réaliste
───────────────────────────────────────────── */
function OldSiteMockup() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#fff",
      width: "100%",
      fontSize: "11px",
      lineHeight: 1.4,
      color: "#333",
      overflow: "hidden",
    }}>
      {/* Nav bar */}
      <div style={{
        background: "linear-gradient(to bottom, #1a6ab1, #1557a0)",
        padding: "8px 14px",
        display: "flex",
        gap: "14px",
        alignItems: "center",
        borderBottom: "2px solid #0e3f7a",
      }}>
        {["Accueil","À propos","Services","Tarifs","Contact"].map(l => (
          <span key={l} style={{ color: "#fff", fontSize: "10px", cursor: "pointer", whiteSpace: "nowrap" }}>{l}</span>
        ))}
      </div>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "14px 20px 10px", borderBottom: "1px solid #ddd" }}>
        <div style={{ fontSize: "18px", fontWeight: "bold", color: "#1a6ab1", marginBottom: "4px" }}>
          COACH SPORTIF PERSONNEL
        </div>
        <div style={{ fontSize: "12px", fontWeight: "bold", color: "#c0392b", marginBottom: "6px" }}>
          Perdez du poids rapidement et durablement !
        </div>
        <div style={{ color: "#f39c12", fontSize: "14px", letterSpacing: "2px" }}>★★★★★</div>
        <div style={{ fontSize: "9px", color: "#888", marginTop: "2px" }}>Plus de 200 clients satisfaits</div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", gap: "10px", padding: "10px 14px" }}>
        {/* Main */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: "11px", color: "#1a6ab1", marginBottom: "5px", borderBottom: "1px solid #1a6ab1", paddingBottom: "2px" }}>
            Mes Services
          </div>
          {[
            "Perte de poids et remise en forme",
            "Coaching nutrition personnalisé",
            "Suivi hebdomadaire et bilan mensuel",
            "Séances en salle ou à domicile",
            "Programme sur mesure 3 mois",
          ].map(s => (
            <div key={s} style={{ fontSize: "10px", marginBottom: "3px", display: "flex", alignItems: "flex-start", gap: "4px" }}>
              <span style={{ color: "#1a6ab1", flexShrink: 0 }}>•</span> {s}
            </div>
          ))}

          <div style={{ fontWeight: "bold", fontSize: "11px", color: "#1a6ab1", marginBottom: "4px", borderBottom: "1px solid #1a6ab1", paddingBottom: "2px", marginTop: "8px" }}>
            Témoignages clients
          </div>
          <div style={{ background: "#f5f5f5", border: "1px solid #ddd", padding: "5px 7px", borderRadius: "3px", marginBottom: "5px", fontSize: "9px", fontStyle: "italic" }}>
            "J'ai perdu 12 kg en 3 mois grâce à ce programme. Je recommande vraiment !" — <strong>Sophie M.</strong>
          </div>
          <div style={{ background: "#f5f5f5", border: "1px solid #ddd", padding: "5px 7px", borderRadius: "3px", fontSize: "9px", fontStyle: "italic" }}>
            "Enfin un coach à l'écoute, les résultats sont là dès la première semaine." — <strong>Karim B.</strong>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: "90px", flexShrink: 0 }}>
          <div style={{ background: "#1a6ab1", color: "#fff", fontSize: "9px", fontWeight: "bold", padding: "4px 6px", textAlign: "center", marginBottom: "5px" }}>
            Me contacter
          </div>
          <div style={{ fontSize: "9px", marginBottom: "3px" }}>📞 06 12 34 56 78</div>
          <div style={{ fontSize: "9px", marginBottom: "6px", wordBreak: "break-all" }}>✉ coach.dupont<br />@gmail.com</div>
          <div style={{ background: "#f39c12", color: "#fff", fontSize: "9px", fontWeight: "bold", padding: "4px", textAlign: "center", borderRadius: "2px", cursor: "pointer" }}>
            DEVIS GRATUIT
          </div>
          <div style={{ marginTop: "8px", fontSize: "9px", fontWeight: "bold", color: "#1a6ab1", borderBottom: "1px solid #ccc", paddingBottom: "2px", marginBottom: "4px" }}>
            Mes tarifs
          </div>
          <div style={{ fontSize: "9px", marginBottom: "2px" }}>Séance solo : <strong>45 €</strong></div>
          <div style={{ fontSize: "9px", marginBottom: "2px" }}>Pack 10 séances : <strong>400 €</strong></div>
          <div style={{ fontSize: "9px" }}>Suivi mensuel : <strong>120 €</strong></div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#1a6ab1", color: "rgba(255,255,255,0.7)", fontSize: "8px", padding: "5px 14px", textAlign: "center" }}>
        © 2012 Coach Dupont — Tous droits réservés — Création site : monsite.fr
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TILT MOCKUP WRAPPER — 3D magnetic tilt + shine
───────────────────────────────────────────── */
function TiltMockup({
  children,
  label,
  labelColor,
  baseTransform,
  liftTransform,
  baseZ,
  width,
  transformOrigin,
  className,
}: {
  children: React.ReactNode;
  label: string;
  labelColor: string;
  baseTransform: string;
  liftTransform: string;
  baseZ: number;
  width: string;
  transformOrigin: string;
  className?: string;
}) {
  const outerRef  = useRef<HTMLDivElement>(null);
  const innerRef  = useRef<HTMLDivElement>(null);
  const shineRef  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef(0);
  const hovered   = useRef(false);
  const curRX     = useRef(0);
  const curRY     = useRef(0);
  const tgtRX     = useRef(0);
  const tgtRY     = useRef(0);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const shine = shineRef.current;
    if (!outer || !inner) return;

    const tick = () => {
      const dX = tgtRX.current - curRX.current;
      const dY = tgtRY.current - curRY.current;
      curRX.current += dX * 0.1;
      curRY.current += dY * 0.1;
      inner.style.transform =
        `perspective(700px) rotateX(${curRX.current}deg) rotateY(${curRY.current}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      hovered.current = true;
      outer.style.transform = liftTransform;
      outer.style.zIndex    = "8";
      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      if (!hovered.current) return;
      const rect = outer.getBoundingClientRect();
      const nx = (e.clientX - rect.left)  / rect.width  - 0.5; // -0.5→+0.5
      const ny = (e.clientY - rect.top)   / rect.height - 0.5;
      tgtRX.current = -ny * 18;   // pitch
      tgtRY.current =  nx * 22;   // yaw
      if (shine) {
        const px = ((e.clientX - rect.left) / rect.width)  * 100;
        const py = ((e.clientY - rect.top)  / rect.height) * 100;
        shine.style.background =
          `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.09) 0%, transparent 65%)`;
        shine.style.opacity = "1";
      }
    };

    const onLeave = () => {
      hovered.current = false;
      outer.style.transform = baseTransform;
      outer.style.zIndex    = String(baseZ);
      tgtRX.current = 0;
      tgtRY.current = 0;
      if (shine) shine.style.opacity = "0";
      // tick keeps lerping back to 0
    };

    outer.addEventListener("mouseenter", onEnter);
    outer.addEventListener("mousemove",  onMove);
    outer.addEventListener("mouseleave", onLeave);

    return () => {
      outer.removeEventListener("mouseenter", onEnter);
      outer.removeEventListener("mousemove",  onMove);
      outer.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [baseTransform, liftTransform, baseZ]);

  return (
    <div
      ref={outerRef}
      className={className}
      style={{
        width,
        flexShrink: 0,
        position: "relative",
        transform: baseTransform,
        transformOrigin,
        zIndex: baseZ,
        cursor: "pointer",
        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      }}
    >
      {/* Label */}
      <div style={{
        position: "absolute",
        top: "-26px",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "0.58rem",
        letterSpacing: "0.35em",
        color: labelColor,
        textTransform: "uppercase",
        fontFamily: "var(--font-inter),sans-serif",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>{label}</div>

      {/* Inner tilt layer */}
      <div
        ref={innerRef}
        style={{ willChange: "transform", transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* Shine overlay */}
        <div
          ref={shineRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            opacity: 0,
            pointerEvents: "none",
            borderRadius: "10px",
            transition: "opacity 0.4s ease",
          }}
        />
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   BROWSER MOCKUP COMPONENT
───────────────────────────────────────────── */
function BrowserMockup({
  src,
  alt,
  url,
  faded = false,
  children,
}: {
  src?: string;
  alt?: string;
  url: string;
  faded?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: faded
          ? "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
          : "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(59,130,246,0.18), 0 0 60px rgba(59,130,246,0.08)",
        width: "100%",
        flexShrink: 0,
        transition: "box-shadow 0.55s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = faded
          ? "0 28px 70px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.12)"
          : "0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(59,130,246,0.45), 0 0 90px rgba(59,130,246,0.22)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = faded
          ? "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)"
          : "0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(59,130,246,0.18), 0 0 60px rgba(59,130,246,0.08)";
      }}
    >
      {/* Browser chrome bar */}
      <div style={{
        background: faded ? "#1a1a1a" : "#141820",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        borderBottom: faded ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(59,130,246,0.12)",
      }}>
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: "9px", height: "9px", borderRadius: "50%",
              background: faded ? "#3a3a3a" : ["#ff5f57","#ffbd2e","#28c840"][i],
              opacity: faded ? 0.4 : 0.7,
            }} />
          ))}
        </div>
        {/* URL bar — no real URL shown */}
        <div style={{
          flex: 1, background: faded ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)",
          borderRadius: "4px", padding: "5px 10px", display: "flex", alignItems: "center", gap: "6px",
        }}>
          <svg width="8" height="8" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
            <rect x="1" y="1" width="10" height="10" rx="2" stroke={faded ? "rgba(255,255,255,0.15)" : "rgba(59,130,246,0.4)"} strokeWidth="1.5"/>
            <path d="M4 6h4M6 4v4" stroke={faded ? "rgba(255,255,255,0.12)" : "rgba(59,130,246,0.45)"} strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <div style={{ flex: 1, height: "5px", background: faded ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.09)", borderRadius: "3px" }} />
        </div>
      </div>

      {/* Content: either children (HTML mockup) or image */}
      {children ? (
        <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
          <div style={{ transform: "scale(1)", transformOrigin: "top left", width: "100%", height: "100%" }}>
            {children}
          </div>
        </div>
      ) : src ? (
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <Image
            src={src} alt={alt ?? ""} fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {!faded && (
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />
          )}
        </div>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function HeroSection() {
  const contentRef  = useRef<HTMLDivElement>(null);
  const mockupsRef  = useRef<HTMLDivElement>(null);
  const [showAvant, setShowAvant] = React.useState(false);

  /* Fade-in on mount */
  useEffect(() => {
    const t = setTimeout(() => {
      [contentRef, mockupsRef].forEach((r) => {
        if (r.current) {
          r.current.style.opacity = "1";
          r.current.style.transform = "translateY(0)";
        }
      });
    }, 80);
    return () => clearTimeout(t);
  }, []);

  /* Subtle parallax on mockups */
  useEffect(() => {
    const el = mockupsRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 → +1
      const dy = (e.clientY - cy) / cy;
      el.style.transform = `translateY(0px) translate(${dx * -6}px, ${dy * -4}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translateY(0px) translate(0px, 0px)";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        background: "#03040a",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* ══ BACKGROUND atmosphere ══ */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        {/* Blue radial bloom — top center */}
        <div style={{
          position: "absolute",
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "60%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.13) 0%, transparent 70%)",
        }} />
        {/* Subtle blue bottom left */}
        <div style={{
          position: "absolute",
          bottom: "-5%",
          left: "-5%",
          width: "45%",
          height: "45%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }} />
        {/* Bottom right warm accent */}
        <div style={{
          position: "absolute",
          bottom: "0",
          right: "-5%",
          width: "35%",
          height: "35%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)",
          opacity: 0.6,
        }} />
      </div>


      {/* ══ MAIN CONTENT ══ */}
      <div
        className="hero-padding-top"
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "88px 24px 60px",
          gap: "0px",
        }}
      >

        {/* Text block */}
        <div
          ref={contentRef}
          style={{
            textAlign: "center",
            opacity: 0,
            transform: "translateY(18px)",
            transition: "opacity 1s ease 0.2s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.2s",
            marginBottom: "52px",
          }}
        >
          {/* Eyebrow */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            marginBottom: "22px",
          }}>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
            <span style={{
              fontFamily: "var(--font-inter),sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.42em",
              color: "rgba(59,130,246,0.8)",
              textTransform: "uppercase",
            }}>Studio Web Premium</span>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
          </div>

          {/* Main title — H1 avec mot-clé géographique */}
          <h1 style={{
            fontFamily: "var(--font-playfair),Georgia,serif",
            fontWeight: 400,
            fontSize: "clamp(2.4rem,6.5vw,5.6rem)",
            lineHeight: 1.08,
            letterSpacing: "0.03em",
            color: "#fff",
            marginBottom: "20px",
          }}>
            Création site web{" "}
            <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>
              Seine-et-Marne.
            </span>{" "}
            <span style={{ WebkitTextStroke: "1px rgba(59,130,246,0.85)", color: "transparent" }}>
              Impact.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "var(--font-inter),sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.75rem,1.6vw,0.92rem)",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}>
            Artisans · restaurants · PME du 77 — devis gratuit sous 24h
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <GlowButton href="https://wa.me/33621235008" primary>WhatsApp</GlowButton>
            <GlowButton href="mailto:creation.concept@outlook.fr">Mail</GlowButton>
          </div>
        </div>

        {/* ── MOBILE BEFORE/AFTER TOGGLE ── */}
        <div className="hero-mobile-toggle" style={{ display: "none", width: "100%", flexDirection: "column", alignItems: "center", gap: "20px" }}>
          {/* Pill toggle */}
          <div style={{
            display: "flex",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "100px",
            padding: "4px",
            gap: "2px",
          }}>
            {(["Avant", "Après"] as const).map((label) => {
              const active = label === "Avant" ? showAvant : !showAvant;
              return (
                <button
                  key={label}
                  onClick={() => setShowAvant(label === "Avant")}
                  style={{
                    padding: "8px 28px",
                    borderRadius: "100px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-inter),sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                    background: active ? "#fff" : "transparent",
                    color: active ? "#050810" : "rgba(255,255,255,0.45)",
                    boxShadow: active ? "0 2px 12px rgba(0,0,0,0.3)" : "none",
                  }}
                >{label}</button>
              );
            })}
          </div>

          {/* Mockup display */}
          <div style={{ position: "relative", width: "92%" }}>
            {/* APRÈS */}
            <div style={{
              opacity: showAvant ? 0 : 1,
              transition: "opacity 0.5s ease",
              position: showAvant ? "absolute" : "relative",
              top: 0, left: 0, right: 0,
              pointerEvents: showAvant ? "none" : "auto",
            }}>
              <BrowserMockup src="/after.jpg" alt="Après — nouveau site coach sportif" url="" faded={false} />
            </div>
            {/* AVANT */}
            <div style={{
              opacity: showAvant ? 1 : 0,
              transition: "opacity 0.5s ease",
              position: showAvant ? "relative" : "absolute",
              top: 0, left: 0, right: 0,
              pointerEvents: showAvant ? "auto" : "none",
            }}>
              <BrowserMockup url="" faded>
                <OldSiteMockup />
              </BrowserMockup>
            </div>
          </div>
        </div>

        {/* ── MOCKUPS DESKTOP ── */}
        <div
          ref={mockupsRef}
          className="hero-mockups-wrap"
          style={{
            width: "100%",
            maxWidth: "1100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
            position: "relative",
            opacity: 0,
            transform: "translateY(28px)",
            transition: "opacity 1.1s ease 0.45s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.45s",
            willChange: "transform",
          }}
        >

          {/* AVANT — behind left */}
          <TiltMockup
            label="Avant"
            labelColor="rgba(255,255,255,0.22)"
            width="48%"
            baseTransform="perspective(1400px) rotateY(14deg) rotateX(4deg) scale(0.84) translateX(6%)"
            liftTransform="perspective(1400px) rotateY(6deg) rotateX(2deg) scale(0.94) translateX(6%) translateY(-16px)"
            baseZ={1}
            transformOrigin="right center"
            className="hero-mockup-avant"
          >
            <BrowserMockup url="coachsportif-dupont.fr" faded>
              <OldSiteMockup />
            </BrowserMockup>
          </TiltMockup>

          {/* Arrow between */}
          <div className="hero-mockup-arrow" style={{
            flexShrink: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            padding: "0 12px",
            position: "relative",
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.4)",
              boxShadow: "0 0 20px rgba(59,130,246,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="rgba(59,130,246,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* APRÈS — front right */}
          <TiltMockup
            label="Après"
            labelColor="rgba(59,130,246,0.8)"
            width="52%"
            baseTransform="perspective(1400px) rotateY(-8deg) rotateX(2deg) translateX(-4%)"
            liftTransform="perspective(1400px) rotateY(-3deg) rotateX(1deg) translateX(-4%) translateY(-16px) scale(1.04)"
            baseZ={3}
            transformOrigin="left center"
            className="hero-mockup-apres"
          >
            <BrowserMockup
              src="/after.jpg"
              alt="Après — nouveau site coach sportif"
              url="coachsportif-pro.fr"
              faded={false}
            />
          </TiltMockup>
        </div>

        {/* Bottom gradient fade to black */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "160px",
          background: "linear-gradient(to bottom, transparent, #03040a)",
          pointerEvents: "none",
          zIndex: 20,
        }} />
      </div>

    </section>
  );
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.529 5.855L.057 23.925l6.244-1.44A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.708.856.883-3.596-.234-.372A9.783 9.783 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182S21.818 6.578 21.818 12 17.422 21.818 12 21.818z"/>
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   BUTTONS
───────────────────────────────────────────── */
function GlowButton({
  children,
  href,
  primary = false,
}: {
  children: string;
  href: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        padding: "13px 26px",
        fontSize: "0.82rem",
        letterSpacing: "0.01em",
        textDecoration: "none",
        borderRadius: "100px",
        fontFamily: "var(--font-inter),sans-serif",
        fontWeight: 500,
        whiteSpace: "nowrap",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        ...(primary
          ? {
              background: "#ffffff",
              border: "1px solid transparent",
              color: "#050810",
            }
          : {
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.55)",
            }),
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        if (primary) {
          el.style.background  = "#e2ebff";
          el.style.boxShadow   = "0 0 40px rgba(255,255,255,0.2), 0 8px 24px rgba(0,0,0,0.3)";
          el.style.transform   = "translateY(-2px)";
        } else {
          el.style.background  = "rgba(255,255,255,0.09)";
          el.style.borderColor = "rgba(255,255,255,0.32)";
          el.style.color       = "rgba(255,255,255,0.9)";
          el.style.transform   = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
        if (primary) {
          el.style.background  = "#ffffff";
        } else {
          el.style.background  = "rgba(255,255,255,0.04)";
          el.style.borderColor = "rgba(255,255,255,0.14)";
          el.style.color       = "rgba(255,255,255,0.55)";
        }
      }}
    >
      {primary ? <IconWhatsApp /> : <IconMail />}
      {children}
    </a>
  );
}
