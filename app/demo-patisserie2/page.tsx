"use client";

import { useEffect, useRef } from "react";

const SCENES = [
  {
    from: -0.01, to: 0.20,
    title: null,
    label: "Artisan Pâtissier · Paris 6e · Depuis 1987",
    showScroll: true,
    cta: false,
  },
  {
    from: 0.24, to: 0.44,
    title: "Nos Créations",
    sub: "Tarte infiniment citron, Paris-Brest noisette,\néclair au chocolat Valrhona.",
    label: null,
    showScroll: false,
    cta: false,
  },
  {
    from: 0.48, to: 0.68,
    title: "Notre Philosophie",
    sub: "Beurre AOC, chocolats de grands crus,\nfruits sélectionnés au marché chaque matin.",
    label: null,
    showScroll: false,
    cta: false,
  },
  {
    from: 0.72, to: 1.0,
    title: "Commandez en ligne",
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
  const videoRef    = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sceneRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = "auto";

    // Mobile : force le chargement au premier touch/scroll
    let videoLoaded = false;
    const forceLoad = () => {
      if (videoLoaded) return;
      videoLoaded = true;
      video.play()
        .then(() => { video.pause(); video.currentTime = 0; })
        .catch(() => {});
    };
    document.addEventListener("touchstart", forceLoad, { once: true, passive: true });
    document.addEventListener("scroll",     forceLoad, { once: true, passive: true });

    // File d'attente de seek
    let isSeeking = false;
    let pendingTime: number | null = null;

    const seekTo = (time: number) => {
      if (isSeeking) { pendingTime = time; return; }
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

    const onScroll = () => {
      const scrollY   = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p         = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

      if (progressRef.current)
        progressRef.current.style.width = `${p * 100}%`;

      if (video.readyState >= 2 && video.duration)
        seekTo(p * video.duration);

      sceneRefs.current.forEach((el, i) => {
        if (!el) return;
        const opacity = getOpacity(p, SCENES[i].from, SCENES[i].to);
        el.style.opacity   = String(opacity);
        el.style.transform = `translateY(${(1 - opacity) * 18}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("seeked", onSeeked);
    };
  }, []);

  return (
    <>
      {/* ── CSS global pour mobile ── */}
      <style>{`
        html, body { margin: 0; padding: 0; background: #0a0704; }

        /* Hauteur correcte sur mobile (prend en compte la barre URL) */
        .dp2-sticky {
          height: 100vh;
          height: 100dvh;
        }

        /* Vidéo : moins zoomée sur mobile portrait */
        .dp2-video {
          object-fit: cover;
          object-position: center center;
        }
        @media (max-width: 768px) and (orientation: portrait) {
          .dp2-video {
            object-position: center 30%;
            transform: scale(0.85);
            transform-origin: center center;
          }
        }

        /* Texte : taille réduite sur mobile */
        .dp2-h1 { font-size: clamp(2.6rem, 7.5vw, 7rem); }
        .dp2-h2 { font-size: clamp(1.7rem, 4.5vw, 4.2rem); }
        @media (max-width: 480px) {
          .dp2-h1 { font-size: 2.4rem; }
          .dp2-h2 { font-size: 1.65rem; }
        }

        /* Badge mobile : repositionné */
        .dp2-badge {
          bottom: 20px; right: 12px;
        }
        @media (max-width: 480px) {
          .dp2-badge { bottom: 14px; right: 8px; padding: 5px 10px; }
        }

        /* Boutons CTA : colonne sur petit écran */
        .dp2-cta-row {
          display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-top: 10px;
        }
        @media (max-width: 480px) {
          .dp2-cta-row { flex-direction: column; align-items: center; gap: 10px; }
          .dp2-cta-row a { width: 240px; justify-content: center; }
        }

        /* Logo : un peu plus petit sur mobile */
        @media (max-width: 480px) {
          .dp2-logo { top: 18px !important; left: 20px !important; }
          .dp2-logo span { font-size: 0.82rem !important; }
        }
      `}</style>

      <div style={{ position: "relative", height: "500vh", background: "#0a0704" }}>

        {/* ── STICKY ── */}
        <div className="dp2-sticky" style={{
          position: "sticky", top: 0, overflow: "hidden",
          WebkitOverflowScrolling: "touch" as never,
        }}>

          {/* Vidéo — PAS de poster pour éviter la confusion avec demo-patisserie */}
          <video
            ref={videoRef}
            className="dp2-video"
            src="/patisserie-v2-scrub.mp4"
            muted
            playsInline
            preload="auto"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />

          {/* Fond noir qui disparaît une fois la vidéo chargée */}
          <div style={{
            position: "absolute", inset: 0,
            background: "#0a0704",
            pointerEvents: "none",
            zIndex: 0,
          }} />

          {/* Overlays */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
            background: "linear-gradient(to bottom, rgba(5,3,1,0.45) 0%, rgba(5,3,1,0.0) 25%, rgba(5,3,1,0.0) 65%, rgba(5,3,1,0.75) 100%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(5,3,1,0.38) 100%)",
          }} />

          {/* ── SCÈNES ── */}
          {SCENES.map((scene, i) => (
            <div
              key={i}
              ref={el => { sceneRefs.current[i] = el; }}
              style={{
                position: "absolute", inset: 0, zIndex: 2,
                display: "flex",
                alignItems: i === 0 ? "flex-end" : "center",
                justifyContent: i === 1 ? "flex-start" : "center",
                padding: i === 0
                  ? "0 40px 10vh 40px"
                  : i === 1
                    ? "0 7vw"
                    : "0 28px",
                textAlign: i === 1 ? "left" : "center",
                opacity: 0, transform: "translateY(18px)",
                willChange: "opacity, transform",
                pointerEvents: "none",
              }}
            >
              <div style={{ position: "relative" }}>
                {/* Backdrop glow */}
                <div style={{
                  position: "absolute", inset: "-28px -36px",
                  background: "radial-gradient(ellipse at center, rgba(5,3,1,0.6) 0%, transparent 72%)",
                  filter: "blur(22px)", pointerEvents: "none",
                }} />
                <div style={{ position: "relative" }}>

                  {/* Label doré */}
                  {(scene.label || scene.title) && (
                    <p style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "clamp(0.5rem, 1.1vw, 0.65rem)",
                      letterSpacing: "0.45em", color: "#d4a853",
                      textTransform: "uppercase", marginBottom: "14px",
                      textShadow: "0 1px 12px rgba(0,0,0,0.95)",
                    }}>
                      {scene.label || scene.title}
                    </p>
                  )}

                  {/* Titre principal */}
                  <h2 className={i === 0 ? "dp2-h1" : "dp2-h2"} style={{
                    fontFamily: "Georgia, serif", fontWeight: 400,
                    color: "#fff", lineHeight: 1.0, letterSpacing: "0.03em",
                    marginBottom: "20px",
                    textShadow: "0 2px 32px rgba(0,0,0,0.9), 0 4px 64px rgba(0,0,0,0.5)",
                  }}>
                    {i === 0 && (<>Maison<br /><em style={{ color: "#d4a853", fontStyle: "italic" }}>Dorée</em></>)}
                    {i === 1 && (<>Chaque pièce,<br />une <em style={{ color: "#d4a853", fontStyle: "italic" }}>signature</em>.</>)}
                    {i === 2 && (<>L&apos;excellence<br />dans chaque <em style={{ color: "#d4a853", fontStyle: "italic" }}>détail</em>.</>)}
                    {i === 3 && (<>Réservez votre<br /><em style={{ color: "#d4a853", fontStyle: "italic" }}>moment de douceur</em>.</>)}
                  </h2>

                  {/* Sous-titre */}
                  {scene.sub && (
                    <p style={{
                      fontFamily: "Georgia, serif", fontStyle: "italic",
                      fontSize: "clamp(0.78rem, 1.5vw, 0.95rem)",
                      color: "rgba(255,255,255,0.6)",
                      maxWidth: "400px", lineHeight: 1.9,
                      letterSpacing: "0.04em", whiteSpace: "pre-line",
                      textShadow: "0 1px 16px rgba(0,0,0,0.95)",
                    }}>
                      {scene.sub}
                    </p>
                  )}

                  {/* Scroll hint */}
                  {scene.showScroll && (
                    <div style={{
                      marginTop: "36px", display: "flex", alignItems: "center",
                      justifyContent: "center", gap: "10px",
                      color: "rgba(255,255,255,0.25)", fontSize: "0.58rem",
                      letterSpacing: "0.35em", fontFamily: "Georgia, serif",
                    }}>
                      <span>SCROLL</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M8 13l-3-3M8 13l3-3" stroke="rgba(212,168,83,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </div>
                  )}

                  {/* CTA */}
                  {scene.cta && (
                    <div className="dp2-cta-row" style={{ pointerEvents: "auto" }}>
                      <a href="https://wa.me/33600000000" style={{
                        display: "inline-flex", alignItems: "center", gap: "10px",
                        padding: "14px 32px", border: "1px solid #d4a853",
                        background: "#d4a853", color: "#0a0704",
                        fontFamily: "Georgia, serif", fontSize: "0.72rem",
                        letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
                      }}>WhatsApp</a>
                      <a href="mailto:contact@maisondoree.fr" style={{
                        display: "inline-flex", alignItems: "center", gap: "10px",
                        padding: "14px 32px", border: "1px solid rgba(212,168,83,0.5)",
                        background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", color: "#d4a853",
                        fontFamily: "Georgia, serif", fontSize: "0.72rem",
                        letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
                      }}>E-mail</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* ── Logo ── */}
          <div className="dp2-logo" style={{ position: "absolute", top: "28px", left: "32px", zIndex: 10 }}>
            <span style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.92rem", letterSpacing: "0.22em", color: "#d4a853" }}>MAISON</span>
            <span style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.92rem", letterSpacing: "0.22em", color: "#fff", marginTop: "-3px" }}>DORÉE</span>
          </div>

          {/* ── Barre de progression ── */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.06)", zIndex: 10 }}>
            <div ref={progressRef} style={{ height: "100%", width: "0%", background: "#d4a853", willChange: "width" }} />
          </div>

          {/* ── Badge CC Création ── */}
          <div className="dp2-badge" style={{
            position: "absolute", zIndex: 10,
            display: "flex", alignItems: "center", gap: "8px",
            background: "rgba(10,7,4,0.75)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(212,168,83,0.12)",
            borderRadius: "999px", padding: "7px 14px",
          }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#d4a853", flexShrink: 0 }} />
            <span style={{ fontFamily: "Georgia, serif", fontSize: "0.58rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Maquette réalisée par
            </span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "0.58rem", letterSpacing: "0.1em", color: "#d4a853", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              CC Création
            </span>
          </div>

        </div>
      </div>
    </>
  );
}
