"use client";

import { useEffect, useRef } from "react";

const SCENES = [
  {
    from: -0.01, to: 0.20,
    title: null,
    big: "Maison\u00A0Dorée",
    sub: "L\u2019art de la pâtisserie française portée\nà son plus haut niveau d\u2019exigence.",
    label: "Artisan Pâtissier · Paris 6e · Depuis 1987",
    showScroll: true,
    cta: false,
  },
  {
    from: 0.24, to: 0.44,
    title: "Nos Créations",
    big: "Chaque pièce,\nune signature.",
    sub: "Tarte infiniment citron, Paris-Brest noisette,\néclair au chocolat Valrhona.",
    label: null,
    showScroll: false,
    cta: false,
  },
  {
    from: 0.48, to: 0.68,
    title: "Notre Philosophie",
    big: "L\u2019excellence\ndans chaque détail.",
    sub: "Beurre AOC, chocolats de grands crus,\nfruits sélectionnés au marché chaque matin.",
    label: null,
    showScroll: false,
    cta: false,
  },
  {
    from: 0.72, to: 1.0,
    title: "Commandez en ligne",
    big: "Réservez votre\nmoment de douceur.",
    sub: null,
    label: null,
    showScroll: false,
    cta: true,
  },
];

function getOpacity(p: number, from: number, to: number): number {
  const fade = 0.05;
  if (p < from || p > to) return 0;
  if (p < from + fade) return (p - from) / fade;
  if (p > to - fade) return (to - p) / fade;
  return 1;
}

export default function DemoPatisserie2() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";

    // File d'attente de seek — évite les chevauchements
    let isSeeking = false;
    let pendingTime: number | null = null;

    const seekTo = (time: number) => {
      if (isSeeking) {
        pendingTime = time; // on mémorise le dernier temps demandé
        return;
      }
      isSeeking = true;
      video.currentTime = time;
    };

    const onSeeked = () => {
      isSeeking = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        seekTo(t);
      }
    };

    video.addEventListener("seeked", onSeeked);

    const updateScenes = (p: number) => {
      if (progressRef.current) {
        progressRef.current.style.width = `${p * 100}%`;
      }
      sceneRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = SCENES[i];
        const opacity = getOpacity(p, s.from, s.to);
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(1 - opacity) * 18}px)`;
      });
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

      updateScenes(p);

      if (video.readyState >= 2 && video.duration) {
        seekTo(p * video.duration);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("seeked", onSeeked);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "500vh", background: "#0a0704" }}>

      {/* ── STICKY CONTAINER ── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Vidéo */}
        <video
          ref={videoRef}
          src="/patisserie-v2-scrub.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
          }}
        />

        {/* Overlays */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(5,3,1,0.4) 0%, rgba(5,3,1,0.0) 25%, rgba(5,3,1,0.0) 70%, rgba(5,3,1,0.7) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,3,1,0.35) 100%)",
        }} />

        {/* ── SCÈNES ── */}
        {SCENES.map((scene, i) => (
          <div
            key={i}
            ref={el => { sceneRefs.current[i] = el; }}
            style={{
              position: "absolute", inset: 0,
              display: "flex",
              alignItems: i === 0 ? "flex-end" : i === 3 ? "center" : "center",
              justifyContent: i === 1 ? "flex-start" : "center",
              padding: i === 0 ? "0 48px 12vh 48px" : i === 1 ? "0 7vw" : "0 32px",
              textAlign: i === 1 ? "left" : "center",
              opacity: 0, transform: "translateY(18px)",
              willChange: "opacity, transform",
              pointerEvents: "none",
            }}
          >
            {/* Backdrop flou derrière le texte */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", inset: "-28px -36px",
                background: "radial-gradient(ellipse at center, rgba(5,3,1,0.55) 0%, transparent 75%)",
                filter: "blur(20px)",
                pointerEvents: "none",
              }} />

              <div style={{ position: "relative" }}>
                {scene.label && (
                  <p style={{
                    fontFamily: "Georgia, serif", fontSize: "clamp(0.55rem,1.1vw,0.68rem)",
                    letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase",
                    marginBottom: "14px",
                    textShadow: "0 1px 12px rgba(0,0,0,0.9)",
                  }}>
                    {scene.label}
                  </p>
                )}
                {scene.title && (
                  <p style={{
                    fontFamily: "Georgia, serif", fontSize: "clamp(0.55rem,1.1vw,0.68rem)",
                    letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase",
                    marginBottom: "14px",
                    textShadow: "0 1px 12px rgba(0,0,0,0.9)",
                  }}>
                    {scene.title}
                  </p>
                )}
                <h2 style={{
                  fontFamily: "Georgia, serif", fontWeight: 400,
                  fontSize: i === 0 ? "clamp(3rem,7.5vw,7rem)" : "clamp(2rem,4.5vw,4.2rem)",
                  color: "#fff", lineHeight: 1.0, letterSpacing: "0.03em",
                  marginBottom: "20px",
                  textShadow: "0 2px 30px rgba(0,0,0,0.85), 0 4px 60px rgba(0,0,0,0.5)",
                }}>
                  {i === 0 ? (<>Maison<br /><em style={{ color: "#d4a853", fontStyle: "italic" }}>Dorée</em></>) :
                   i === 1 ? (<>Chaque pièce,<br />une <em style={{ color: "#d4a853", fontStyle: "italic" }}>signature</em>.</>) :
                   i === 2 ? (<>L&apos;excellence<br />dans chaque <em style={{ color: "#d4a853", fontStyle: "italic" }}>détail</em>.</>) :
                   (<>Réservez votre<br /><em style={{ color: "#d4a853", fontStyle: "italic" }}>moment de douceur</em>.</>)}
                </h2>
                {scene.sub && (
                  <p style={{
                    fontFamily: "Georgia, serif", fontStyle: "italic",
                    fontSize: "clamp(0.8rem,1.5vw,0.95rem)", color: "rgba(255,255,255,0.6)",
                    maxWidth: i === 1 ? "380px" : "400px", lineHeight: 1.9,
                    letterSpacing: "0.04em", whiteSpace: "pre-line",
                    textShadow: "0 1px 16px rgba(0,0,0,0.9)",
                  }}>
                    {scene.sub}
                  </p>
                )}
                {scene.showScroll && (
                  <div style={{ marginTop: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", letterSpacing: "0.3em", fontFamily: "Georgia, serif" }}>
                    <span>SCROLL</span>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M8 3v10M8 13l-3-3M8 13l3-3" stroke="rgba(212,168,83,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                )}
                {scene.cta && (
                  <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "10px", pointerEvents: "auto" }}>
                    <a href="https://wa.me/33600000000" style={{
                      display: "inline-flex", alignItems: "center", gap: "10px",
                      padding: "14px 34px", border: "1px solid #d4a853",
                      background: "#d4a853", color: "#0a0704",
                      fontFamily: "Georgia, serif", fontSize: "0.72rem", letterSpacing: "0.18em",
                      textDecoration: "none", textTransform: "uppercase",
                    }}>WhatsApp</a>
                    <a href="mailto:contact@maisondoree.fr" style={{
                      display: "inline-flex", alignItems: "center", gap: "10px",
                      padding: "14px 34px", border: "1px solid rgba(212,168,83,0.5)",
                      background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", color: "#d4a853",
                      fontFamily: "Georgia, serif", fontSize: "0.72rem", letterSpacing: "0.18em",
                      textDecoration: "none", textTransform: "uppercase",
                    }}>E-mail</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* ── Logo ── */}
        <div style={{ position: "absolute", top: "28px", left: "36px" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", letterSpacing: "0.22em", color: "#d4a853" }}>MAISON</div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", letterSpacing: "0.22em", color: "#fff", marginTop: "-3px" }}>DORÉE</div>
        </div>

        {/* ── Barre de progression ── */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.06)" }}>
          <div ref={progressRef} style={{ height: "100%", width: "0%", background: "#d4a853", willChange: "width" }} />
        </div>

        {/* Badge */}
        <div style={{
          position: "absolute", bottom: "20px", right: "20px",
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(10,7,4,0.7)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(212,168,83,0.12)",
          borderRadius: "999px", padding: "7px 14px",
        }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#d4a853" }} />
          <span style={{ fontFamily: "Georgia, serif", fontSize: "0.6rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Maquette réalisée par</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#d4a853", textTransform: "uppercase" }}>CC Création</span>
        </div>

      </div>
    </div>
  );
}
