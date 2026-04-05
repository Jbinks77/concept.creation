"use client";

import { useEffect, useRef } from "react";

const GOLD = "#c8a96e";
const BLUE = "#3b82f6";

const SCENES = [
  {
    from: -0.01, to: 0.20,
    label: "Coach Personnel · Paris & Île-de-France",
    big: ["Transformez", "votre ", "corps."],
    goldWord: "corps.",
    sub: "Un suivi sur-mesure, des résultats\nprouvés en 90 jours ou remboursé.",
    showScroll: true,
    cta: false,
    align: "bottom" as const,
    side: "center" as const,
  },
  {
    from: 0.24, to: 0.44,
    label: "Méthode",
    big: ["Chaque séance,", "un ", "dépassement."],
    goldWord: "dépassement.",
    sub: "Programmes 100% personnalisés.\nNutrition, force, cardio — tout est calibré pour toi.",
    showScroll: false,
    cta: false,
    align: "center" as const,
    side: "left" as const,
  },
  {
    from: 0.48, to: 0.68,
    label: "Résultats",
    big: ["Pas d'excuse.", "Juste des ", "résultats."],
    goldWord: "résultats.",
    sub: "+200 clients transformés.\nPerte de poids, prise de masse, performance.",
    showScroll: false,
    cta: false,
    align: "center" as const,
    side: "center" as const,
  },
  {
    from: 0.72, to: 1.0,
    label: "Première séance offerte",
    big: ["Commence", "aujourd'", "hui."],
    goldWord: "hui.",
    sub: null,
    showScroll: false,
    cta: true,
    align: "center" as const,
    side: "center" as const,
  },
];

function getOpacity(p: number, from: number, to: number): number {
  const fade = 0.05;
  if (p < from || p > to) return 0;
  if (p < from + fade) return (p - from) / fade;
  if (p > to - fade) return (to - p) / fade;
  return 1;
}

export default function DemoCoach() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Sur mobile, forcer le chargement au premier touch/scroll
    let videoLoaded = false;
    const forceLoad = () => {
      if (videoLoaded) return;
      videoLoaded = true;
      video.play().then(() => { video.pause(); video.currentTime = 0; }).catch(() => {});
    };
    document.addEventListener("touchstart", forceLoad, { once: true, passive: true });
    document.addEventListener("scroll", forceLoad, { once: true, passive: true });

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
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

      if (progressRef.current) progressRef.current.style.width = `${p * 100}%`;

      if (video.readyState >= 2 && video.duration) seekTo(p * video.duration);

      sceneRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = SCENES[i];
        const opacity = getOpacity(p, s.from, s.to);
        el.style.opacity = String(opacity);
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
    <div style={{ position: "relative", height: "500vh", background: "#060608" }}>

      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Vidéo */}
        <video
          ref={videoRef}
          src="/coach-hero-scrub.mp4"
          muted
          playsInline
          preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />

        {/* Overlay permanent */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(to bottom, rgba(6,6,8,0.5) 0%, rgba(6,6,8,0.1) 30%, rgba(6,6,8,0.1) 65%, rgba(6,6,8,0.75) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at center, transparent 40%, rgba(6,6,8,0.4) 100%)" }} />

        {/* Scènes */}
        {SCENES.map((scene, i) => {
          const isBottom = scene.align === "bottom";
          const isLeft = scene.side === "left";
          return (
            <div
              key={i}
              ref={el => { sceneRefs.current[i] = el; }}
              style={{
                position: "absolute", inset: 0,
                display: "flex",
                alignItems: isBottom ? "flex-end" : "center",
                justifyContent: isLeft ? "flex-start" : "center",
                padding: isBottom ? "0 52px 10vh 52px" : isLeft ? "0 8vw" : "0 32px",
                textAlign: isLeft ? "left" : "center",
                opacity: 0, transform: "translateY(18px)",
                willChange: "opacity, transform",
                pointerEvents: "none",
              }}
            >
              <div style={{ position: "relative" }}>
                {/* Backdrop glow */}
                <div style={{
                  position: "absolute", inset: "-32px -44px",
                  background: "radial-gradient(ellipse at center, rgba(6,6,8,0.65) 0%, transparent 70%)",
                  filter: "blur(24px)", pointerEvents: "none",
                }} />

                <div style={{ position: "relative" }}>
                  {/* Label */}
                  {scene.label && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: isLeft ? "flex-start" : "center", marginBottom: "16px" }}>
                      <div style={{ width: "24px", height: "1px", background: BLUE }} />
                      <p style={{
                        fontFamily: "Inter, sans-serif", fontSize: "0.6rem",
                        letterSpacing: "0.4em", color: BLUE, textTransform: "uppercase",
                        textShadow: "0 0 20px rgba(59,130,246,0.5)",
                      }}>{scene.label}</p>
                      <div style={{ width: "24px", height: "1px", background: BLUE }} />
                    </div>
                  )}

                  {/* Titre */}
                  <h2 style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                    fontWeight: 900,
                    fontSize: i === 0 ? "clamp(3rem,8vw,7.5rem)" : "clamp(2rem,5vw,4.5rem)",
                    color: "#fff",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    marginBottom: "22px",
                    textShadow: "0 2px 40px rgba(0,0,0,0.9), 0 0 80px rgba(0,0,0,0.5)",
                  }}>
                    {scene.big.map((word, wi) =>
                      word === scene.goldWord
                        ? <span key={wi} style={{ color: GOLD, display: "block" }}>{word}</span>
                        : wi === scene.big.length - 2
                          ? <span key={wi}>{word}</span>
                          : <span key={wi} style={{ display: wi === 0 ? "block" : "inline" }}>{word}</span>
                    )}
                  </h2>

                  {/* Sous-titre */}
                  {scene.sub && (
                    <p style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(0.8rem,1.5vw,0.95rem)",
                      color: "rgba(255,255,255,0.5)",
                      maxWidth: "400px",
                      lineHeight: 1.85,
                      letterSpacing: "0.02em",
                      whiteSpace: "pre-line",
                      textShadow: "0 1px 16px rgba(0,0,0,0.9)",
                    }}>{scene.sub}</p>
                  )}

                  {/* Scroll hint */}
                  {scene.showScroll && (
                    <div style={{ marginTop: "36px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "rgba(255,255,255,0.2)", fontSize: "0.58rem", letterSpacing: "0.35em", fontFamily: "Inter, sans-serif" }}>
                      <span>SCROLL</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M8 13l-3-3M8 13l3-3" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                      </svg>
                    </div>
                  )}

                  {/* CTA */}
                  {scene.cta && (
                    <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", marginTop: "12px", pointerEvents: "auto" }}>
                      <a href="https://wa.me/33600000000" style={{
                        display: "inline-flex", alignItems: "center", gap: "10px",
                        padding: "16px 38px",
                        background: BLUE, border: `1px solid ${BLUE}`, color: "#fff",
                        fontFamily: "Inter, sans-serif", fontWeight: 700,
                        fontSize: "0.72rem", letterSpacing: "0.12em",
                        textDecoration: "none", textTransform: "uppercase",
                      }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Séance gratuite
                      </a>
                      <a href="mailto:contact@coach.fr" style={{
                        display: "inline-flex", alignItems: "center", gap: "10px",
                        padding: "16px 38px",
                        background: "rgba(6,6,8,0.4)", backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)",
                        fontFamily: "Inter, sans-serif", fontWeight: 600,
                        fontSize: "0.72rem", letterSpacing: "0.12em",
                        textDecoration: "none", textTransform: "uppercase",
                      }}>En savoir plus</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Logo */}
        <div style={{ position: "absolute", top: "28px", left: "36px" }}>
          <div style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "0.85rem", fontWeight: 900, letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>APEX</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.55rem", letterSpacing: "0.35em", color: BLUE, textTransform: "uppercase", marginTop: "2px" }}>COACHING</div>
        </div>

        {/* Barre de progression */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.05)" }}>
          <div ref={progressRef} style={{ height: "100%", width: "0%", background: `linear-gradient(to right, ${BLUE}, ${GOLD})`, willChange: "width" }} />
        </div>

        {/* Badge CC Création */}
        <div style={{
          position: "absolute", bottom: "20px", right: "20px",
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(6,6,8,0.75)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "999px", padding: "7px 14px",
        }}>
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: BLUE }} />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Maquette réalisée par</span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", color: BLUE, textTransform: "uppercase" }}>CC Création</span>
        </div>

      </div>
    </div>
  );
}
