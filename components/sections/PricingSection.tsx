"use client";

import { useEffect, useRef } from "react";

const PLANS = [
  {
    name: "Essentiel",
    price: "490",
    desc: "Idéal pour lancer votre présence en ligne rapidement.",
    badge: null,
    accent: "rgba(148,163,184,0.8)",
    accentBg: "rgba(148,163,184,0.07)",
    accentBorder: "rgba(148,163,184,0.15)",
    features: [
      "Site 1 page (landing page)",
      "Design sur mesure",
      "100% responsive mobile",
      "Formulaire de contact",
      "Mise en ligne incluse",
      "Livraison en 7 jours",
    ],
    cta: "Démarrer",
  },
  {
    name: "Premium",
    price: "890",
    desc: "Pour une présence professionnelle qui convertit vraiment.",
    badge: "Le plus populaire",
    accent: "#3b82f6",
    accentBg: "rgba(59,130,246,0.08)",
    accentBorder: "rgba(59,130,246,0.3)",
    features: [
      "Jusqu'à 5 pages",
      "Design premium avec animations",
      "100% responsive mobile",
      "SEO optimisé",
      "Google Analytics intégré",
      "Mise en ligne incluse",
      "Livraison en 14 jours",
      "1 mois de support inclus",
    ],
    cta: "Choisir Premium",
  },
  {
    name: "Sur mesure",
    price: null,
    desc: "E-commerce, fonctionnalités spécifiques, redesign complet.",
    badge: null,
    accent: "rgba(212,168,83,0.9)",
    accentBg: "rgba(212,168,83,0.06)",
    accentBorder: "rgba(212,168,83,0.18)",
    features: [
      "Boutique en ligne",
      "Fonctionnalités sur mesure",
      "Intégrations tierces",
      "Design entièrement unique",
      "Accompagnement dédié",
      "Délai selon le projet",
    ],
    cta: "Demander un devis",
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
      <circle cx="7" cy="7" r="6.5" fill={color} fillOpacity="0.12" stroke={color} strokeOpacity="0.3" strokeWidth="1"/>
      <path d="M4.5 7l2 2 3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function PricingSection() {
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
    }, { threshold: 0.1 });

    if (title) observer.observe(title);
    cards.forEach((el, i) => setTimeout(() => observer.observe(el), i * 130));
    return () => observer.disconnect();
  }, []);

  const handleCTA = (plan: typeof PLANS[0]) => {
    const msg = plan.price
      ? `Bonjour, je suis intéressé par la formule ${plan.name} à ${plan.price}€. Pouvez-vous me donner plus d'informations ?`
      : `Bonjour, j'aimerais obtenir un devis pour un projet sur mesure. Pouvez-vous me contacter ?`;
    window.open(`https://wa.me/33621235008?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      id="tarifs"
      className="section-pad"
      style={{
        background: "#050710",
        padding: "100px 24px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "55%", height: "55%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Title */}
        <div ref={titleRef} style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "20px" }}>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
            <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.62rem", letterSpacing: "0.42em", color: "rgba(59,130,246,0.8)", textTransform: "uppercase" }}>Tarifs</span>
            <div style={{ width: "26px", height: "1px", background: "rgba(59,130,246,0.6)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair),Georgia,serif", fontWeight: 400, fontSize: "clamp(2rem,5vw,3.8rem)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1, letterSpacing: "0.02em" }}>
            Des formules{" "}
            <span style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}>claires</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>
            Sans surprise, sans frais cachés.
          </p>
        </div>

        {/* Cards */}
        <div
          className="cards-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "16px", alignItems: "start" }}
        >
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              ref={el => { cardsRef.current[i] = el; }}
              style={{
                position: "relative",
                borderRadius: "20px",
                border: `1px solid ${plan.accentBorder}`,
                background: plan.badge ? "rgba(59,130,246,0.06)" : "rgba(255,255,255,0.025)",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "0",
                transition: "border-color 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
                ...(plan.badge ? { boxShadow: "0 0 0 1px rgba(59,130,246,0.2), 0 20px 60px rgba(59,130,246,0.1)" } : {}),
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${plan.accentBorder}`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = plan.badge ? "0 0 0 1px rgba(59,130,246,0.2), 0 20px 60px rgba(59,130,246,0.1)" : "none";
              }}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div style={{
                  position: "absolute",
                  top: "-13px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  color: "#fff",
                  fontFamily: "var(--font-inter),sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  padding: "4px 16px",
                  borderRadius: "100px",
                  whiteSpace: "nowrap",
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.72rem", letterSpacing: "0.22em", color: plan.accent, textTransform: "uppercase", marginBottom: "12px" }}>
                {plan.name}
              </div>

              {/* Price */}
              <div style={{ marginBottom: "12px", display: "flex", alignItems: "flex-end", gap: "6px" }}>
                {plan.price ? (
                  <>
                    <span style={{ fontFamily: "var(--font-playfair),Georgia,serif", fontSize: "3.6rem", fontWeight: 400, color: "#fff", lineHeight: 1 }}>{plan.price}</span>
                    <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>€</span>
                  </>
                ) : (
                  <span style={{ fontFamily: "var(--font-playfair),Georgia,serif", fontSize: "2.2rem", fontWeight: 400, color: "#fff", lineHeight: 1, fontStyle: "italic" }}>Sur devis</span>
                )}
              </div>

              {/* Description */}
              <p style={{ fontFamily: "var(--font-inter),sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.6, marginBottom: "28px" }}>
                {plan.desc}
              </p>

              {/* Features */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px", flex: 1 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckIcon color={plan.accent} />
                    <span style={{ fontFamily: "var(--font-inter),sans-serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleCTA(plan)}
                style={{
                  width: "100%",
                  padding: "13px 20px",
                  borderRadius: "100px",
                  border: plan.badge ? "none" : `1px solid ${plan.accentBorder}`,
                  background: plan.badge ? "#3b82f6" : "transparent",
                  color: plan.badge ? "#fff" : plan.accent,
                  fontFamily: "var(--font-inter),sans-serif",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  if (plan.badge) { el.style.background = "#2563eb"; el.style.boxShadow = "0 0 30px rgba(59,130,246,0.4)"; }
                  else { el.style.background = plan.accentBg; }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  if (plan.badge) { el.style.background = "#3b82f6"; el.style.boxShadow = "none"; }
                  else { el.style.background = "transparent"; }
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: "center", fontFamily: "var(--font-inter),sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "rgba(255,255,255,0.22)", marginTop: "32px", letterSpacing: "0.04em" }}>
          Premier échange gratuit · Paiement en 2 fois possible · Devis sous 24h
        </p>
      </div>
    </section>
  );
}
