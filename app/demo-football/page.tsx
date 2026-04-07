"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ─── DATA (viendra de Sanity CMS en production) ─── */

const PROCHAINS_MATCHS = [
  { id: 1, date: "Sam. 12 Avr.", heure: "15h00", adversaire: "AS Dammarie-les-Lys", lieu: "Stade Paul Doumer", domicile: true, competition: "District · Division 2" },
  { id: 2, date: "Mer. 16 Avr.", heure: "20h30", adversaire: "FC Melun SR", lieu: "Stade de Melun", domicile: false, competition: "Coupe de Seine-et-Marne" },
  { id: 3, date: "Sam. 26 Avr.", heure: "14h30", adversaire: "US Montereau", lieu: "Stade Paul Doumer", domicile: true, competition: "District · Division 2" },
];

const RESULTATS = [
  { id: 1, adversaire: "ES Maincy", score: "3 – 1", victoire: true, domicile: true, date: "05/04", buteurs: "Bakayoko 12', Martin 34', Diallo 78'" },
  { id: 2, adversaire: "FC Savigny", score: "1 – 1", victoire: null, domicile: false, date: "29/03", buteurs: "Touré 65'" },
  { id: 3, adversaire: "RC Combs-la-Ville", score: "2 – 0", victoire: true, domicile: true, date: "22/03", buteurs: "Ndiaye 8', Bakayoko 71'" },
  { id: 4, adversaire: "AS Lizy", score: "0 – 2", victoire: false, domicile: false, date: "15/03", buteurs: "—" },
  { id: 5, adversaire: "ES Le Mée-sur-Seine", score: "4 – 1", victoire: true, domicile: true, date: "08/03", buteurs: "Martin 5', 67', Diallo 33', Touré 88'" },
];

const CLASSEMENT = [
  { pos: 1, club: "FC Melun SR", pts: 52, j: 24, g: 16, n: 4, p: 4, diff: "+28", current: false },
  { pos: 2, club: "FC Vaux-le-Pénil", pts: 46, j: 24, g: 14, n: 4, p: 6, diff: "+18", current: true },
  { pos: 3, club: "AS Dammarie-les-Lys", pts: 40, j: 24, g: 12, n: 4, p: 8, diff: "+11", current: false },
  { pos: 4, club: "RC Combs-la-Ville", pts: 37, j: 24, g: 11, n: 4, p: 9, diff: "+7", current: false },
  { pos: 5, club: "US Montereau", pts: 34, j: 24, g: 10, n: 4, p: 10, diff: "+3", current: false },
  { pos: 6, club: "ES Maincy", pts: 29, j: 24, g: 8, n: 5, p: 11, diff: "-4", current: false },
];

const ACTUALITES = [
  {
    id: 1, date: "8 Avr. 2025", categorie: "Match",
    titre: "Victoire convaincante 3-1 face à Maincy",
    extrait: "Les seniors ont livré une belle performance au Stade Paul Doumer. Bakayoko, Martin et Diallo ont été les buteurs du soir devant 320 spectateurs.",
    img: "⚽",
  },
  {
    id: 2, date: "1 Avr. 2025", categorie: "Club",
    titre: "Ouverture des inscriptions Saison 2025-2026",
    extrait: "Les inscriptions pour la saison prochaine sont officiellement ouvertes. Toutes les catégories de U6 à Vétérans acceptent de nouveaux joueurs.",
    img: "📋",
  },
  {
    id: 3, date: "25 Mar. 2025", categorie: "Jeunes",
    titre: "Les U13 qualifiés pour la phase finale départementale",
    extrait: "Bravo à nos U13 qui se sont qualifiés pour la phase finale du championnat départemental après une saison remarquable à domicile.",
    img: "🏆",
  },
];

const EQUIPES = [
  { cat: "U6 – U7", label: "Éveil Football", nb: "2 équipes", couleur: "#3b82f6" },
  { cat: "U8 – U9", label: "Pré-École", nb: "2 équipes", couleur: "#3b82f6" },
  { cat: "U10 – U11", label: "Poussins", nb: "3 équipes", couleur: "#1d4ed8" },
  { cat: "U12 – U13", label: "Benjamins", nb: "3 équipes", couleur: "#1d4ed8" },
  { cat: "U14 – U15", label: "Minimes", nb: "2 équipes", couleur: "#1e3a8a" },
  { cat: "U16 – U17", label: "Cadets", nb: "2 équipes", couleur: "#1e3a8a" },
  { cat: "U18 – U19", label: "Juniors", nb: "1 équipe", couleur: "#172554" },
  { cat: "Séniors", label: "Division 2 — 3 équipes", nb: "Séniors A/B/C", couleur: "#0f172a" },
  { cat: "Féminines", label: "Division Féminine", nb: "2 équipes", couleur: "#7c3aed" },
  { cat: "Vétérans", label: "+35 / +45", nb: "2 équipes", couleur: "#064e3b" },
];

const CHIFFRES = [
  { n: "1971", label: "Année de création" },
  { n: "450+", label: "Licenciés" },
  { n: "20", label: "Équipes" },
  { n: "54", label: "Ans d'histoire" },
];

const SPONSORS = ["Mairie de Vaux-le-Pénil", "BNP Paribas", "Intersport Melun", "SFR Business", "Leclerc Melun Sud", "Décathlon Melun"];

/* ─── COMPONENT ─── */

export default function DemoFootball() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  // Ticker animation
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    let pos = 0;
    const speed = 0.5;
    const inner = ticker.querySelector(".ticker-inner") as HTMLElement;
    if (!inner) return;
    const clone = inner.cloneNode(true) as HTMLElement;
    ticker.appendChild(clone);
    let raf: number;
    const animate = () => {
      pos -= speed;
      if (Math.abs(pos) >= inner.offsetWidth) pos = 0;
      ticker.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Parallax château au scroll
  useEffect(() => {
    const bg = heroBgRef.current;
    if (!bg) return;
    const onScroll = () => {
      bg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: "#07090f", color: "#fff", fontFamily: "'Inter', -apple-system, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(7,9,15,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(59,130,246,0.15)",
        padding: "0 24px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo-vlp.png"
            alt="FC Vaux-le-Pénil"
            style={{ width: "40px", height: "40px", objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", lineHeight: 1 }}>FC VAUX-LE-PÉNIL</div>
            <div style={{ fontSize: "0.55rem", color: "#3b82f6", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px" }}>Fondé en 1971</div>
          </div>
        </div>

        {/* Nav links - desktop */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {["Le Club", "Équipes", "Résultats", "Actualités", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-").replace(/é/g, "e").replace(/à/g, "a")}`}
              style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#3b82f6")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="https://wa.me/33621235008?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20une%20d%C3%A9mo%20pour%20mon%20club%20de%20football."
          style={{
            padding: "9px 20px", background: "#2563eb", color: "#fff",
            fontSize: "0.68rem", letterSpacing: "0.14em", textDecoration: "none",
            textTransform: "uppercase", fontWeight: 700, borderRadius: "3px",
            whiteSpace: "nowrap",
          }}
        >
          Inscription
        </a>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100dvh", position: "relative", overflow: "hidden", paddingBottom: "72px" }}>

        <style>{`
          @keyframes heroLogoIn {
            0%   { opacity: 0; transform: scale(0.65); }
            65%  { transform: scale(1.06); filter: drop-shadow(0 0 40px rgba(59,130,246,0.9)); }
            100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 20px rgba(59,130,246,0.45)) drop-shadow(0 4px 20px rgba(0,0,0,0.7)); }
          }
          @keyframes heroTitleIn {
            0%   { opacity: 0; transform: translateY(36px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes heroBadgeIn {
            0%   { opacity: 0; transform: translateY(16px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes dotPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.8); }
            50%       { box-shadow: 0 0 0 7px rgba(59,130,246,0); }
          }
          @keyframes stripIn {
            0%   { opacity: 0; transform: scaleX(0.85); }
            100% { opacity: 1; transform: scaleX(1); }
          }

          /* ── MOBILE ── */
          @media (max-width: 600px) {
            .hero-logo { width: 90px !important; height: 90px !important; }
            .hero-logo-wrap { width: 90px !important; height: 90px !important; margin-bottom: 14px !important; }
            .hero-separator { gap: 8px !important; margin-bottom: 14px !important; }
            .hero-separator span { font-size: 0.5rem !important; letter-spacing: 0.3em !important; }
            .hero-separator .sep-line { width: 24px !important; }
            .hero-title { margin-bottom: 20px !important; }
            .hero-match-strip { flex-direction: column !important; border-left: none !important; border-top: 3px solid #3b82f6 !important; }
            .hero-match-label { flex-direction: row !important; padding: 8px 16px !important; gap: 8px !important; justify-content: center; }
            .hero-match-label span:last-child { writing-mode: horizontal-tb !important; }
            .hero-match-teams { padding: 12px 16px !important; width: 100%; box-sizing: border-box; }
            .hero-match-date { border-left: none !important; border-top: 1px solid rgba(59,130,246,0.2) !important; padding: 10px 16px !important; width: 100%; display: flex !important; justify-content: center; gap: 8px; align-items: center; }
            .hero-match-date div { display: inline !important; }
            .hero-badge { font-size: 0.58rem !important; padding: 6px 12px !important; margin-bottom: 20px !important; }
            .hero-ctas { gap: 8px !important; }
            .hero-ctas a { padding: 12px 20px !important; font-size: 0.65rem !important; letter-spacing: 0.1em !important; }
            .hero-stats-bar > div { padding: 10px 20px !important; }
            .hero-stats-bar .stat-num { font-size: 1.1rem !important; }
            .hero-stats-bar .stat-label { font-size: 0.45rem !important; }
            .hero-watermark { font-size: 52vw !important; transform: translate(-50%, -25%) !important; }
          }
        `}</style>

        {/* ── Fond château + parallax ── */}
        <div ref={heroBgRef} style={{
          position: "absolute", inset: "-15%",
          backgroundImage: "url('/hero-football-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
        }} />

        {/* Overlay 1 — assombrissement léger (château bien visible) */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(2,6,20,0.52)" }} />
        {/* Overlay 2 — teinte bleue gauche */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(5,40,160,0.55) 0%, rgba(5,40,160,0.1) 45%, transparent 70%)" }} />
        {/* Overlay 3 — fondu bas */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, #07090f 0%, transparent 100%)" }} />
        {/* Overlay 4 — fondu haut (derrière la nav) */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(to bottom, rgba(2,6,20,0.7) 0%, transparent 100%)" }} />

        {/* Liseré lumineux bleu sous la nav */}
        <div style={{
          position: "absolute", top: 64, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.35) 20%, rgba(59,130,246,0.7) 50%, rgba(59,130,246,0.35) 80%, transparent)",
        }} />

        {/* WATERMARK "1971" — calé derrière "ALLEZ VAUX" */}
        <div className="hero-watermark" style={{
          position: "absolute", zIndex: 1,
          fontSize: "clamp(11rem, 32vw, 30rem)",
          fontWeight: 900, letterSpacing: "-0.05em",
          color: "rgba(255,255,255,0.06)",
          lineHeight: 1,
          top: "50%", left: "50%",
          transform: "translate(-50%, -30%)",
          whiteSpace: "nowrap",
          userSelect: "none", pointerEvents: "none",
        }}>
          1971
        </div>

        {/* ── CONTENU CENTRÉ ── */}
        <div style={{
          position: "relative", zIndex: 2,
          minHeight: "100dvh",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          textAlign: "center",
          padding: "100px 24px 90px",
          gap: 0,
        }}>

          {/* Logo */}
          <div className="hero-logo-wrap" style={{
            position: "relative", width: "130px", height: "130px",
            marginBottom: "22px",
            animation: "heroLogoIn 1s cubic-bezier(0.34,1.4,0.64,1) 0.15s both",
          }}>
            <div style={{
              position: "absolute", inset: "-28px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(37,99,235,0.45) 0%, transparent 70%)",
              filter: "blur(18px)",
            }} />
            <img src="/logo-vlp.png" alt="FC Vaux-le-Pénil" className="hero-logo"
              style={{ width: "130px", height: "130px", objectFit: "contain", position: "relative", zIndex: 1 }}
            />
          </div>

          {/* Séparateur */}
          <div className="hero-separator" style={{
            display: "flex", alignItems: "center", gap: "14px",
            marginBottom: "22px",
            animation: "heroBadgeIn 0.6s ease 0.5s both",
          }}>
            <div className="sep-line" style={{ width: "50px", height: "1px", background: "linear-gradient(to right, transparent, rgba(59,130,246,0.8))" }} />
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.48em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
              Depuis 1971 · Vaux-le-Pénil · 77
            </span>
            <div className="sep-line" style={{ width: "50px", height: "1px", background: "linear-gradient(to left, transparent, rgba(59,130,246,0.8))" }} />
          </div>

          {/* Titre ALLEZ VAUX */}
          <h1 className="hero-title" style={{
            fontSize: "clamp(3.8rem, 13vw, 10.5rem)",
            fontWeight: 900, lineHeight: 0.84,
            letterSpacing: "-0.04em", textTransform: "uppercase",
            margin: "0 0 28px",
            animation: "heroTitleIn 0.85s ease 0.4s both",
          }}>
            <span style={{
              display: "block", color: "#fff",
              textShadow: "0 2px 40px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.5)",
            }}>ALLEZ</span>
            <span style={{
              display: "block",
              background: "linear-gradient(135deg, #60a5fa 0%, #e0eeff 40%, #93c5fd 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(59,130,246,0.5))",
            }}>VAUX</span>
          </h1>

          {/* ── BANDEAU PROCHAIN MATCH ── */}
          <div className="hero-match-strip" style={{
            display: "flex", alignItems: "stretch",
            background: "rgba(5,10,30,0.65)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(59,130,246,0.28)",
            borderLeft: "3px solid #3b82f6",
            padding: "0", marginBottom: "14px",
            overflow: "hidden",
            animation: "stripIn 0.7s ease 0.8s both",
            maxWidth: "540px", width: "100%",
          }}>
            {/* Label */}
            <div className="hero-match-label" style={{
              background: "#2563eb",
              padding: "12px 16px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px",
              flexShrink: 0,
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff", display: "block", animation: "dotPulse 2s infinite" }} />
              <span style={{ fontSize: "0.48rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.9)", textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap" }}>
                PROCHAIN
              </span>
            </div>

            {/* Équipes */}
            <div className="hero-match-teams" style={{ display: "flex", alignItems: "center", flex: 1, padding: "10px 16px", gap: "8px" }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, whiteSpace: "nowrap" }}>FC Vaux-le-Pénil</div>
                <div style={{ fontSize: "0.48rem", color: "#3b82f6", letterSpacing: "0.12em", textTransform: "uppercase" }}>Domicile</div>
              </div>
              <div style={{ fontSize: "0.7rem", fontWeight: 900, color: "#fff", padding: "5px 10px", border: "1px solid rgba(255,255,255,0.15)", flexShrink: 0 }}>VS</div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>AS Dammarie</div>
                <div style={{ fontSize: "0.48rem", color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase" }}>Extérieur</div>
              </div>
            </div>

            {/* Date */}
            <div className="hero-match-date" style={{ padding: "12px 14px", borderLeft: "1px solid rgba(59,130,246,0.2)", textAlign: "center", flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>12 Avr.</div>
              <div style={{ fontSize: "0.55rem", color: "#64748b" }}>15h00</div>
            </div>
          </div>

          {/* Badge dernier résultat */}
          <div className="hero-badge" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(21,128,61,0.12)",
            border: "1px solid rgba(21,128,61,0.3)",
            backdropFilter: "blur(8px)",
            padding: "7px 14px", marginBottom: "24px",
            fontSize: "0.62rem",
            animation: "heroBadgeIn 0.6s ease 1s both",
          }}>
            <span style={{ background: "#15803d", color: "#fff", padding: "2px 7px", fontSize: "0.48rem", fontWeight: 800, letterSpacing: "0.1em", whiteSpace: "nowrap" }}>VICTOIRE</span>
            <span style={{ color: "rgba(255,255,255,0.65)", whiteSpace: "nowrap" }}>VLP <strong style={{ color: "#fff" }}>3 – 1</strong> ES Maincy · 05 avr.</span>
          </div>

          {/* CTAs */}
          <div className="hero-ctas" style={{
            display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center",
            animation: "heroBadgeIn 0.6s ease 1.1s both",
          }}>
            <a href="#resultats" style={{
              padding: "13px 28px", background: "#2563eb", color: "#fff",
              fontSize: "0.72rem", letterSpacing: "0.16em", textDecoration: "none",
              textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap",
            }}>Résultats & Classement</a>
            <a href="#le-club" style={{
              padding: "13px 28px",
              border: "1px solid rgba(59,130,246,0.4)", color: "#93c5fd",
              background: "rgba(5,10,30,0.4)", backdropFilter: "blur(8px)",
              fontSize: "0.72rem", letterSpacing: "0.16em", textDecoration: "none",
              textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap",
            }}>Découvrir le club</a>
          </div>
        </div>

        {/* ── BARRE STATS BAS ── */}
        <div className="hero-stats-bar" style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3,
          background: "rgba(5,8,20,0.9)", backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(59,130,246,0.15)",
          display: "flex", justifyContent: "center", flexWrap: "nowrap",
        }}>
          {CHIFFRES.map((c, i) => (
            <div key={i} style={{
              padding: "12px 0", textAlign: "center",
              borderRight: "1px solid rgba(59,130,246,0.08)",
              flex: 1,
            }}>
              <div className="stat-num" style={{ fontSize: "1.3rem", fontWeight: 900, color: "#3b82f6", lineHeight: 1 }}>{c.n}</div>
              <div className="stat-label" style={{ fontSize: "0.5rem", color: "#475569", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "3px" }}>{c.label}</div>
            </div>
          ))}
        </div>

      </section>

      {/* ── TICKER ── */}
      <div style={{
        background: "#1e3a8a", padding: "12px 0", overflow: "hidden",
        borderTop: "2px solid #3b82f6", borderBottom: "1px solid rgba(59,130,246,0.3)",
      }}>
        <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
          <div ref={tickerRef} style={{ display: "inline-flex", gap: "0" }}>
            <div className="ticker-inner" style={{ display: "inline-flex", gap: "48px", paddingRight: "48px" }}>
              {RESULTATS.map((r) => (
                <span key={r.id} style={{
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
                  display: "inline-flex", alignItems: "center", gap: "12px",
                }}>
                  <span style={{
                    padding: "2px 8px", borderRadius: "2px", fontSize: "0.6rem",
                    background: r.victoire === true ? "#15803d" : r.victoire === false ? "#dc2626" : "#475569",
                    color: "#fff",
                  }}>
                    {r.victoire === true ? "V" : r.victoire === false ? "D" : "N"}
                  </span>
                  <span>{r.domicile ? `VLP ${r.score} ${r.adversaire}` : `${r.adversaire} ${r.score} VLP`}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>|</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── RÉSULTATS + CLASSEMENT ── */}
      <section id="resultats" style={{ padding: "80px 24px", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "12px" }}>Saison 2024-2025</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
              Résultats & Classement
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2px" }}>

            {/* Résultats */}
            <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(59,130,246,0.12)", padding: "32px" }}>
              <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "24px" }}>
                Derniers Résultats — Seniors A
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {RESULTATS.map((r) => (
                  <div key={r.id} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "14px 16px",
                    background: r.victoire === true ? "rgba(21,128,61,0.08)" : r.victoire === false ? "rgba(220,38,38,0.08)" : "rgba(71,85,105,0.1)",
                    border: `1px solid ${r.victoire === true ? "rgba(21,128,61,0.2)" : r.victoire === false ? "rgba(220,38,38,0.15)" : "rgba(71,85,105,0.2)"}`,
                  }}>
                    <span style={{ fontSize: "0.55rem", color: "#475569", width: "40px", flexShrink: 0 }}>{r.date}</span>
                    <span style={{
                      width: "22px", height: "22px", borderRadius: "2px", flexShrink: 0,
                      background: r.victoire === true ? "#15803d" : r.victoire === false ? "#dc2626" : "#475569",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.55rem", fontWeight: 800, color: "#fff",
                    }}>
                      {r.victoire === true ? "V" : r.victoire === false ? "D" : "N"}
                    </span>
                    <span style={{ flex: 1, fontSize: "0.8rem", fontWeight: 600 }}>
                      {r.domicile ? (
                        <><strong>VLP</strong> {r.score} {r.adversaire}</>
                      ) : (
                        <>{r.adversaire} {r.score} <strong>VLP</strong></>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Classement */}
            <div style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(59,130,246,0.12)", padding: "32px" }}>
              <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "24px" }}>
                Classement — District Division 2
              </h3>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 40px 40px 40px 40px 50px", gap: "4px", padding: "0 8px 8px", borderBottom: "1px solid rgba(59,130,246,0.1)", marginBottom: "4px" }}>
                {["#", "Club", "J", "G", "N", "P", "Pts"].map((h) => (
                  <span key={h} style={{ fontSize: "0.55rem", color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: h !== "Club" ? "center" : "left" }}>{h}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                {CLASSEMENT.map((row) => (
                  <div key={row.pos} style={{
                    display: "grid", gridTemplateColumns: "32px 1fr 40px 40px 40px 40px 50px",
                    gap: "4px", padding: "10px 8px",
                    background: row.current ? "rgba(37,99,235,0.12)" : "transparent",
                    border: row.current ? "1px solid rgba(59,130,246,0.25)" : "1px solid transparent",
                    alignItems: "center",
                  }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: row.current ? 800 : 400, color: row.current ? "#3b82f6" : "#64748b", textAlign: "center" }}>{row.pos}</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: row.current ? 800 : 500, color: row.current ? "#fff" : "rgba(255,255,255,0.8)", letterSpacing: "0.01em" }}>
                      {row.current ? "⚡ " : ""}{row.club}
                    </span>
                    {[row.j, row.g, row.n, row.p].map((v, i) => (
                      <span key={i} style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{v}</span>
                    ))}
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: row.current ? "#3b82f6" : "rgba(255,255,255,0.7)", textAlign: "center" }}>{row.pts}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROCHAINS MATCHS ── */}
      <section id="le-club" style={{ padding: "80px 24px", background: "rgba(30,58,138,0.05)", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "12px" }}>Agenda</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
              Prochains Matchs
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {PROCHAINS_MATCHS.map((match, i) => (
              <div key={match.id} style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr auto",
                gap: "16px", alignItems: "center",
                padding: "24px 28px",
                background: i === 0 ? "rgba(37,99,235,0.1)" : "rgba(15,23,42,0.5)",
                border: i === 0 ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(59,130,246,0.08)",
              }}>
                {/* Date */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.6rem", color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase" }}>{match.date.split(" ")[0]}</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, color: i === 0 ? "#3b82f6" : "#fff", lineHeight: 1 }}>
                    {match.date.split(" ").slice(1).join(" ")}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px" }}>{match.heure}</div>
                </div>

                {/* Équipes */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>FC Vaux-le-Pénil</span>
                    <span style={{ fontSize: "0.7rem", color: "#3b82f6", fontWeight: 700 }}>VS</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>{match.adversaire}</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "#475569", marginTop: "4px", letterSpacing: "0.05em" }}>
                    {match.competition} · {match.domicile ? "🏠 Domicile" : "✈ Extérieur"}
                  </div>
                </div>

                {/* Lieu */}
                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                  📍 {match.lieu}
                </div>

                {/* Badge */}
                {i === 0 && (
                  <div style={{
                    padding: "6px 14px",
                    background: "#2563eb", color: "#fff",
                    fontSize: "0.6rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", fontWeight: 700, borderRadius: "2px",
                    whiteSpace: "nowrap",
                  }}>
                    Prochain match
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTUALITÉS ── */}
      <section id="actualités" style={{ padding: "80px 24px", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "12px" }}>News</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
              Actualités du Club
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2px" }}>
            {ACTUALITES.map((actu) => (
              <article key={actu.id} style={{
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(59,130,246,0.1)",
                padding: "32px 28px",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(59,130,246,0.1)")}
              >
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{actu.img}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{
                    padding: "3px 10px", background: "rgba(37,99,235,0.15)",
                    border: "1px solid rgba(59,130,246,0.25)",
                    fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#93c5fd",
                    borderRadius: "2px",
                  }}>
                    {actu.categorie}
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "#475569" }}>{actu.date}</span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "12px", lineHeight: 1.4, letterSpacing: "0.01em" }}>
                  {actu.titre}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  {actu.extrait}
                </p>
                <div style={{ marginTop: "20px", fontSize: "0.68rem", color: "#3b82f6", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
                  Lire la suite →
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉQUIPES ── */}
      <section id="equipes" style={{ padding: "80px 24px", background: "rgba(30,58,138,0.04)", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "12px" }}>De 3 à 55 ans</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>
              Nos Équipes
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "2px" }}>
            {EQUIPES.map((eq) => (
              <div key={eq.cat} style={{
                padding: "22px 20px",
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(59,130,246,0.1)",
                cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(30,64,175,0.15)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(15,23,42,0.6)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.1)"; }}
              >
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: eq.couleur, marginBottom: "12px",
                }} />
                <div style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em", marginBottom: "4px" }}>{eq.cat}</div>
                <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: "4px" }}>{eq.label}</div>
                <div style={{ fontSize: "0.65rem", color: "#3b82f6", fontWeight: 600 }}>{eq.nb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section id="sponsors" style={{ padding: "60px 24px", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#475569", textTransform: "uppercase", marginBottom: "36px" }}>
            Partenaires & Sponsors
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px" }}>
            {SPONSORS.map((s) => (
              <div key={s} style={{
                padding: "14px 28px",
                border: "1px solid rgba(59,130,246,0.15)",
                background: "rgba(15,23,42,0.5)",
                fontSize: "0.75rem", fontWeight: 600,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.08em",
                borderRadius: "2px",
              }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / INSCRIPTION ── */}
      <section id="contact" style={{
        padding: "100px 24px", textAlign: "center",
        background: `
          radial-gradient(ellipse at center, rgba(30,64,175,0.15) 0%, transparent 60%),
          rgba(7,9,15,1)
        `,
      }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "20px" }}>Rejoignez-nous</p>
        <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "16px" }}>
          Prêt à jouer<br />pour Vaux ?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.35)", maxWidth: "480px", margin: "0 auto 48px", fontSize: "0.9rem", lineHeight: 1.8 }}>
          Inscriptions ouvertes pour toutes les catégories. Présentez-vous à l&apos;entraînement ou contactez-nous directement.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#" style={{
            padding: "16px 36px", background: "#2563eb", color: "#fff",
            fontSize: "0.78rem", letterSpacing: "0.15em", textDecoration: "none",
            textTransform: "uppercase", fontWeight: 700, borderRadius: "3px",
          }}>
            S&apos;inscrire en ligne
          </a>
          <a href="mailto:contact@fc-vauxlepenil.fr" style={{
            padding: "16px 36px",
            border: "1px solid rgba(59,130,246,0.35)", color: "#93c5fd",
            fontSize: "0.78rem", letterSpacing: "0.15em", textDecoration: "none",
            textTransform: "uppercase", fontWeight: 700, borderRadius: "3px",
          }}>
            Nous écrire
          </a>
        </div>

        {/* Infos pratiques */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "48px",
          marginTop: "64px", flexWrap: "wrap",
          padding: "32px",
          background: "rgba(15,23,42,0.6)",
          border: "1px solid rgba(59,130,246,0.1)",
          maxWidth: "700px", margin: "64px auto 0",
        }}>
          {[
            { icon: "📍", label: "Terrain", val: "Stade Paul Doumer, Vaux-le-Pénil" },
            { icon: "📅", label: "Entraînements", val: "Mer & Ven · 19h00" },
            { icon: "📧", label: "Contact", val: "contact@fc-vauxlepenil.fr" },
          ].map((info) => (
            <div key={info.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "6px" }}>{info.icon}</div>
              <div style={{ fontSize: "0.6rem", color: "#475569", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4px" }}>{info.label}</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{info.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "32px 24px",
        background: "#020408",
        borderTop: "1px solid rgba(59,130,246,0.1)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #1e3a8a, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 900 }}>VLP</div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }}>FC VAUX-LE-PÉNIL</span>
          <span style={{ color: "#1e3a8a", fontSize: "0.7rem" }}>· Fondé en 1971</span>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Facebook", "Instagram", "YouTube"].map((s) => (
            <a key={s} href="#" style={{ fontSize: "0.65rem", color: "#475569", textDecoration: "none", letterSpacing: "0.08em" }}>{s}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: "#1e3a8a", fontSize: "0.65rem" }}>Site créé par</span>
          <Link href="/" style={{ fontSize: "0.68rem", color: "#3b82f6", textDecoration: "none", fontWeight: 700, letterSpacing: "0.08em" }}>CC Création</Link>
        </div>
      </footer>

    </div>
  );
}
