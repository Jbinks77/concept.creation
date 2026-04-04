"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const barRef      = useRef<HTMLDivElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const bar      = barRef.current;
    const wrapper  = wrapperRef.current;
    if (!bar || !wrapper) return;

    const DURATION = 2000; // ms
    const start    = performance.now();

    /* Animate progress bar */
    const tick = (now: number) => {
      const p      = Math.min((now - start) / DURATION, 1);
      const eased  = 1 - Math.pow(1 - p, 3); // ease-out cubic
      bar.style.width = `${eased * 100}%`;

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        /* Brief hold at 100%, then fade out */
        setTimeout(() => {
          wrapper.style.opacity   = "0";
          wrapper.style.transform = "scale(1.015)";
          setTimeout(() => {
            setGone(true);
            onDone();
          }, 700);
        }, 280);
      }
    };

    requestAnimationFrame(tick);
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      ref={wrapperRef}
      style={{
        position:   "fixed",
        inset:      0,
        zIndex:     9999,
        background: "#070c1a",
        display:    "flex",
        flexDirection: "column",
        alignItems:    "center",
        justifyContent:"center",
        gap:        "40px",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Ambient glow — brighter */}
      <div style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 40%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Image
          src="/logo_CC.png"
          alt="CC Creation"
          width={140}
          height={56}
          style={{ objectFit: "contain", opacity: 0.95 }}
          priority
        />
      </div>

      {/* Site name */}
      <div style={{
        position: "relative",
        zIndex: 1,
        marginTop: "-24px",
        fontFamily: "var(--font-inter),sans-serif",
        fontSize: "0.65rem",
        letterSpacing: "0.45em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
      }}>
        CC Création
      </div>

      {/* Progress bar */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "160px",
        height: "1px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "1px",
        overflow: "hidden",
      }}>
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg, rgba(59,130,246,0.6), #3b82f6)",
            boxShadow: "0 0 12px rgba(59,130,246,1)",
            borderRadius: "1px",
          }}
        />
      </div>
    </div>
  );
}
