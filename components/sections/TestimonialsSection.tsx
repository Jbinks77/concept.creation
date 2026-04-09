"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Thomas Renard",
    role: "Artisan plombier",
    company: "Renard Plomberie — Melun (77)",
    date: "il y a 2 semaines",
    text: "En tant qu'artisan à Melun, j'avais besoin d'un site simple et efficace pour me trouver sur Google. JB a tout géré rapidement, le résultat est professionnel et depuis je reçois des demandes de devis chaque semaine. Je recommande à tous les artisans du 77.",
    photo: null,
    initials: "TR",
    avatarColor: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    rating: 5,
  },
  {
    name: "Sophie Marchand",
    role: "Gérante",
    company: "Maison Dorée — Fontainebleau (77)",
    date: "il y a 1 mois",
    text: "Je suis bluffée par le résultat. JB a su retranscrire l'univers de notre boutique en quelques jours seulement. Depuis la mise en ligne, nos commandes en ligne ont plus que triplé. Sérieux, réactif et vraiment à l'écoute.",
    photo: "/avatar-sophie.jpg",
    photoPos: "50% 10%",
    rating: 5,
  },
  {
    name: "Karim Benali",
    role: "Coach sportif indépendant",
    company: "ÉliteSport — Meaux (77)",
    date: "il y a 2 mois",
    text: "Mon ancien site me faisait honte. Aujourd'hui mes clients me complimentent dessus avant même qu'on parle de coaching. Les demandes de contact ont doublé en moins de deux mois. Je recommande sans hésiter.",
    photo: null,
    initials: "KB",
    avatarColor: "linear-gradient(135deg, #f97316, #ea580c)",
    rating: 5,
  },
  {
    name: "Isabelle Moreau",
    role: "Directrice associée",
    company: "Moreau Architectes — Montereau (77)",
    date: "il y a 3 mois",
    text: "Travail soigné, livré dans les délais et sans aller-retours inutiles. On a validé la maquette dès le premier essai. Notre cabinet a gagné en crédibilité auprès de nos prospects — le site reflète enfin ce qu'on fait vraiment.",
    photo: null,
    initials: "IM",
    avatarColor: "linear-gradient(135deg, #64748b, #94a3b8)",
    rating: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function TestimonialsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (title) { title.style.opacity = "0"; title.style.transform = "translateY(28px)"; }
    cards.forEach(el => { el.style.opacity = "0"; el.style.transform = "translateY(32px)"; });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.style.transition = "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.unobserve(el);
      });
    }, { threshold: 0.12 });

    if (title) observer.observe(title);
    cards.forEach((el, i) => setTimeout(() => observer.observe(el), i * 130));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="temoignages"
      className="section-pad"
      style={{
        background: "#030407",
        padding: "100px 24px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Separator */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)" }} />

      {/* Glow */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
            <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.62rem", letterSpacing: "0.42em", color: "rgba(59,130,246,0.8)", textTransform: "uppercase" }}>Témoignages</span>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair),Georgia,serif", fontWeight: 400, fontSize: "clamp(2rem,5vw,3.8rem)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "0.02em" }}>
            Ils nous font{" "}
            <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>confiance</span>
          </h2>

          {/* Google rating aggregate */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "100px", padding: "8px 18px", marginTop: "8px" }}>
            <GoogleIcon />
            <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#fff" }}>5,0</span>
            <Stars n={5} />
            <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>· 12 avis Google</span>
          </div>
        </div>

        {/* Cards */}
        <div className="cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.14)";
                el.style.background  = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.background  = "rgba(255,255,255,0.025)";
              }}
            >
              {/* Top row: avatar + name + Google icon */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {/* Avatar */}
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt={t.name}
                      fill
                      style={{ objectFit: "cover", objectPosition: t.photoPos }}
                    />
                  ) : (
                    <div style={{
                      width: "100%", height: "100%",
                      background: t.avatarColor,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-inter),sans-serif",
                      fontWeight: 600, fontSize: "0.85rem", color: "#fff",
                    }}>{t.initials}</div>
                  )}
                </div>

                {/* Name + role */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 600, fontSize: "0.88rem", color: "#fff", marginBottom: "2px" }}>{t.name}</div>
                  <div style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 300, fontSize: "0.72rem", color: "rgba(255,255,255,0.38)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.role} · {t.company}</div>
                </div>

                {/* Google icon top right */}
                <div style={{ opacity: 0.6, flexShrink: 0 }}>
                  <GoogleIcon />
                </div>
              </div>

              {/* Stars + date */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Stars n={t.rating} />
                <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.68rem", color: "rgba(255,255,255,0.25)" }}>{t.date}</span>
              </div>

              {/* Text */}
              <p style={{
                fontFamily: "var(--font-inter),sans-serif",
                fontWeight: 300,
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                margin: 0,
              }}>
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
