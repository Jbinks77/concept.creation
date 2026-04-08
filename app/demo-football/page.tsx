"use client";

import { useEffect, useRef, useState } from "react";
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
    id: 1, date: "8 Avr. 2025", categorie: "Match", categorieColor: "#3b82f6",
    titre: "Victoire convaincante 3-1 face à Maincy",
    extrait: "Les seniors ont livré une belle performance au Stade Paul Doumer. Bakayoko, Martin et Diallo ont été les buteurs du soir devant 320 spectateurs.",
    img: "⚽",
  },
  {
    id: 2, date: "1 Avr. 2025", categorie: "Club", categorieColor: "#f59e0b",
    titre: "Ouverture des inscriptions Saison 2025-2026",
    extrait: "Les inscriptions pour la saison prochaine sont officiellement ouvertes. Toutes les catégories de U6 à Vétérans acceptent de nouveaux joueurs.",
    img: "📋",
  },
  {
    id: 3, date: "25 Mar. 2025", categorie: "Jeunes", categorieColor: "#10b981",
    titre: "Les U13 qualifiés pour la phase finale départementale",
    extrait: "Bravo à nos U13 qui se sont qualifiés pour la phase finale du championnat départemental après une saison remarquable à domicile.",
    img: "🏆",
  },
];

const EQUIPES = [
  { cat: "U6 – U7", label: "Éveil Football", nb: "2 équipes", couleur: "#60a5fa" },
  { cat: "U8 – U9", label: "Pré-École", nb: "2 équipes", couleur: "#60a5fa" },
  { cat: "U10 – U11", label: "Poussins", nb: "3 équipes", couleur: "#3b82f6" },
  { cat: "U12 – U13", label: "Benjamins", nb: "3 équipes", couleur: "#3b82f6" },
  { cat: "U14 – U15", label: "Minimes", nb: "2 équipes", couleur: "#2563eb" },
  { cat: "U16 – U17", label: "Cadets", nb: "2 équipes", couleur: "#2563eb" },
  { cat: "U18 – U19", label: "Juniors", nb: "1 équipe", couleur: "#1d4ed8" },
  { cat: "Séniors", label: "Division 2 — 3 équipes", nb: "Séniors A/B/C", couleur: "#1e40af" },
  { cat: "Féminines", label: "Division Féminine", nb: "2 équipes", couleur: "#7c3aed" },
  { cat: "Vétérans", label: "+35 / +45", nb: "2 équipes", couleur: "#059669" },
];

const CHIFFRES = [
  { n: "1974", label: "Année de création" },
  { n: "450+", label: "Licenciés" },
  { n: "20", label: "Équipes" },
  { n: "54", label: "Ans d'histoire" },
];

const SPONSORS = ["Mairie de Vaux-le-Pénil", "BNP Paribas", "Intersport Melun", "SFR Business", "Leclerc Melun Sud", "Décathlon Melun"];

/* ─── COMPONENT ─── */

export default function DemoFootball() {
  const tickerRef    = useRef<HTMLDivElement>(null);
  const heroBgRef    = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);
  const statsBarRef  = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Parallax château au scroll (desktop uniquement)
  useEffect(() => {
    const bg = heroBgRef.current;
    if (!bg) return;
    if (window.innerWidth < 768) return;
    const onScroll = () => {
      bg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Canvas hexagones flottants (motif ballon de foot)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    type Hex = { x: number; y: number; size: number; speed: number; rot: number; rotS: number; op: number; drift: number; };
    const hexs: Hex[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 2,
      size: 12 + Math.random() * 40,
      speed: 0.12 + Math.random() * 0.3,
      rot: Math.random() * Math.PI * 2,
      rotS: (Math.random() - 0.5) * 0.007,
      op: 0.025 + Math.random() * 0.055,
      drift: (Math.random() - 0.5) * 0.25,
    }));
    const drawHex = (x: number, y: number, r: number, rot: number, op: number) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        i === 0 ? ctx.moveTo(r * Math.cos(a), r * Math.sin(a)) : ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(59,130,246,${op})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    };
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hexs.forEach(h => {
        h.y -= h.speed; h.x += h.drift; h.rot += h.rotS;
        if (h.y < -h.size * 2) { h.y = canvas.height + h.size; h.x = Math.random() * canvas.width; }
        drawHex(h.x, h.y, h.size, h.rot, h.op);
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // ── Countdown live — prochain dimanche à 15h heure Paris
  useEffect(() => {
    // Renvoie le timestamp UTC du prochain dimanche 15h Paris
    const getNextSunday15h = (): number => {
      const now = new Date();
      for (let i = 0; i <= 7; i++) {
        const probe = new Date(now.getTime() + i * 86400000);
        // Jour de la semaine à Paris
        const wd = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", weekday: "short" }).format(probe);
        if (wd !== "Sun") continue;
        // Date locale Paris (YYYY-MM-DD)
        const dateStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(probe);
        // Chercher le bon timestamp UTC : Paris = UTC+1 ou UTC+2
        for (const utcH of [13, 14]) {
          const ts = new Date(`${dateStr}T${String(utcH).padStart(2, "0")}:00:00Z`).getTime();
          const parisH = parseInt(new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Paris", hour: "numeric", hour12: false }).format(new Date(ts)));
          if (parisH === 15 && ts > now.getTime()) return ts;
        }
      }
      return now.getTime() + 7 * 86400000;
    };

    const update = () => {
      const el = countdownRef.current;
      if (!el) return;
      const diff = getNextSunday15h() - Date.now();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const items = el.querySelectorAll<HTMLElement>("[data-cd]");
      if (items[0]) items[0].textContent = String(d).padStart(2, "0");
      if (items[1]) items[1].textContent = String(h).padStart(2, "0");
      if (items[2]) items[2].textContent = String(m).padStart(2, "0");
      if (items[3]) items[3].textContent = String(s).padStart(2, "0");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Compteurs animés dans la stats bar
  useEffect(() => {
    const bar = statsBarRef.current;
    if (!bar) return;
    const targets = [1974, 450, 20, 54];
    const durations = [1800, 1400, 1000, 1200];
    let started = false;
    const animate = () => {
      if (started) return;
      started = true;
      targets.forEach((target, i) => {
        const el = bar.querySelectorAll<HTMLElement>(".stat-num")[i];
        if (!el) return;
        const suffix = el.dataset.suffix || "";
        const start = Date.now();
        const dur = durations[i];
        const step = () => {
          const p = Math.min((Date.now() - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        step();
      });
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) animate(); }, { threshold: 0.5 });
    io.observe(bar);
    return () => io.disconnect();
  }, []);

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal, .reveal-l, .reveal-r, .reveal-scale").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ background: "#07090f", color: "#fff", fontFamily: "'Inter', -apple-system, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── CANVAS HEXAGONES FLOTTANTS ── */}
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0, zIndex: 0,
        pointerEvents: "none", mixBlendMode: "screen",
      }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(7,9,15,0.95)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(59,130,246,0.15)",
        padding: "0 24px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
      }}>
        {/* Logo + nom club */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/fff.png" alt="FFF" style={{ width: "80px", height: "80px", objectFit: "contain", flexShrink: 0 }} />
          <div className="nav-text">
            <div style={{ fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", lineHeight: 1 }}>FC VAUX-LE-PÉNIL</div>
            <div style={{ fontSize: "0.55rem", color: "#3b82f6", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2px" }}>Fondé en 1974</div>
          </div>
        </div>

        {/* Liens desktop */}
        <div className="nav-links" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {["Le Club", "Équipes", "Résultats", "Actualités", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "-").replace(/é/g, "e").replace(/à/g, "a")}`}
              style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#3b82f6")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >{item}</a>
          ))}
        </div>

        {/* Desktop : bouton inscription */}
        <a href="https://wa.me/33621235008?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20une%20d%C3%A9mo%20pour%20mon%20club%20de%20football."
          className="nav-links"
          style={{ padding: "9px 20px", background: "#2563eb", color: "#fff", fontSize: "0.68rem", letterSpacing: "0.14em", textDecoration: "none", textTransform: "uppercase", fontWeight: 700, borderRadius: "3px", whiteSpace: "nowrap" }}>
          Inscription
        </a>

        {/* Mobile : hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{ display: "none", flexDirection: "column", justifyContent: "center", gap: "5px", background: "none", border: "none", cursor: "pointer", padding: "6px", width: "36px", height: "36px" }}
          aria-label="Menu"
        >
          <span style={{ display: "block", width: "22px", height: "2px", background: "#fff", transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "rotate(45deg) translate(0, 7px)" : "none" }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "#fff", transition: "opacity 0.25s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "22px", height: "2px", background: "#fff", transition: "transform 0.25s", transform: menuOpen ? "rotate(-45deg) translate(0, -7px)" : "none" }} />
        </button>
      </nav>

      {/* ── MENU MOBILE DÉROULANT ── */}
      <div style={{
        position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99,
        background: "rgba(5,8,20,0.98)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(59,130,246,0.15)",
        transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: menuOpen ? "auto" : "none",
      }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "8px 0 16px" }}>
          {["Le Club", "Équipes", "Résultats", "Actualités", "Contact"].map((item, i) => (
            <a key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-").replace(/é/g, "e").replace(/à/g, "a")}`}
              onClick={() => setMenuOpen(false)}
              style={{ padding: "16px 28px", fontSize: "0.85rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", textDecoration: "none", borderBottom: "1px solid rgba(59,130,246,0.06)", display: "flex", alignItems: "center", gap: "14px" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = "rgba(37,99,235,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
              {item}
            </a>
          ))}
          <div style={{ padding: "16px 28px 4px" }}>
            <a href="https://wa.me/33621235008?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20une%20d%C3%A9mo%20pour%20mon%20club%20de%20football."
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "14px", background: "#2563eb", color: "#fff", textAlign: "center", fontSize: "0.78rem", letterSpacing: "0.16em", textDecoration: "none", textTransform: "uppercase", fontWeight: 700, borderRadius: "3px" }}>
              S&apos;inscrire
            </a>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ minHeight: "100dvh", position: "relative", overflow: "hidden", paddingBottom: "72px" }}>

        <style>{`
          @keyframes heroLogoIn {
            0%   { opacity: 0; transform: scale(0.65); }
            65%  { transform: scale(1.06); }
            100% { opacity: 1; transform: scale(1); }
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
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
          }
          @keyframes victGlow {
            0%, 100% { box-shadow: inset 3px 0 0 #15803d, 0 0 0 rgba(21,128,61,0); }
            50%       { box-shadow: inset 3px 0 0 #15803d, 0 0 18px rgba(21,128,61,0.2); }
          }
          @keyframes scanline {
            0%   { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
          @keyframes borderGlow {
            0%, 100% { border-color: rgba(59,130,246,0.3); }
            50%       { border-color: rgba(59,130,246,0.7); box-shadow: 0 0 20px rgba(59,130,246,0.15); }
          }

          /* ── ORBES AURORA PREMIUM ── */
          @keyframes orb1 {
            0%   { transform: translate(0%, 0%)   scale(1);    }
            35%  { transform: translate(7%, -10%) scale(1.15); }
            65%  { transform: translate(-5%, 7%)  scale(0.90); }
            100% { transform: translate(0%, 0%)   scale(1);    }
          }
          @keyframes orb2 {
            0%   { transform: translate(0%, 0%)   scale(1);    }
            40%  { transform: translate(-9%, 6%)  scale(1.18); }
            72%  { transform: translate(6%, -7%)  scale(0.85); }
            100% { transform: translate(0%, 0%)   scale(1);    }
          }
          @keyframes orb3 {
            0%   { transform: translate(0%, 0%)   scale(1);    }
            50%  { transform: translate(5%, 9%)   scale(1.10); }
            100% { transform: translate(0%, 0%)   scale(1);    }
          }
          @keyframes orbPulse {
            0%, 100% { transform: scale(1);    opacity: 0.55; }
            50%       { transform: scale(1.12); opacity: 0.80; }
          }

          /* ── COUNTDOWN ── */
          @keyframes cdPulse {
            0%, 100% { border-color: rgba(59,130,246,0.25); }
            50%       { border-color: rgba(59,130,246,0.6); box-shadow: 0 0 16px rgba(59,130,246,0.15); }
          }
          .cd-block { animation: cdPulse 2s ease-in-out infinite; }
          .cd-block:nth-child(4) { animation-delay: 0s; }
          .cd-block:nth-child(3) { animation-delay: 0.5s; }
          .cd-block:nth-child(2) { animation-delay: 1s; }
          .cd-block:nth-child(1) { animation-delay: 1.5s; }

          /* ── SCROLL REVEAL ── */
          .reveal       { opacity:0; transform:translateY(32px);  transition:opacity .7s ease, transform .7s ease; }
          .reveal-l     { opacity:0; transform:translateX(-44px); transition:opacity .7s ease, transform .7s ease; }
          .reveal-r     { opacity:0; transform:translateX(44px);  transition:opacity .7s ease, transform .7s ease; }
          .reveal-scale { opacity:0; transform:scale(0.9);        transition:opacity .55s ease, transform .55s ease; }
          .reveal.visible, .reveal-l.visible, .reveal-r.visible, .reveal-scale.visible {
            opacity:1; transform:none;
          }
          .d1{transition-delay:.08s!important} .d2{transition-delay:.16s!important}
          .d3{transition-delay:.24s!important} .d4{transition-delay:.32s!important}
          .d5{transition-delay:.4s!important}  .d6{transition-delay:.48s!important}
          .d7{transition-delay:.56s!important} .d8{transition-delay:.64s!important}

          /* ── SECTION ACCENT LINE ── */
          .accent-line {
            height: 2px; width: 0;
            background: linear-gradient(90deg, #3b82f6 0%, rgba(59,130,246,0.1) 100%);
            transition: width 1s ease .35s;
            margin-top: 14px;
          }
          .visible .accent-line { width: 64px; }

          /* ── SCORE CARD ── */
          .score-v { animation: victGlow 3s ease-in-out infinite; }

          /* ── MATCH CARD HOVER ── */
          .match-card {
            transition: transform .2s ease, box-shadow .2s ease !important;
          }
          .match-card:hover {
            transform: translateX(4px) !important;
            box-shadow: -4px 0 0 #3b82f6 !important;
          }

          /* ── ACTU CARD ── */
          .actu-card { transition: transform .25s ease, box-shadow .25s ease !important; }
          .actu-card:hover { transform: translateY(-6px) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important; }

          /* ── EQUIPE CARD ── */
          .eq-card { transition: transform .2s ease, background .2s ease !important; }
          .eq-card:hover { transform: translateY(-3px) !important; }

          /* ── SPONSOR PILL ── */
          .sponsor-pill {
            transition: color .2s, border-color .2s, background .2s !important;
          }
          .sponsor-pill:hover {
            color: rgba(255,255,255,0.85) !important;
            border-color: rgba(59,130,246,0.45) !important;
            background: rgba(30,64,175,0.18) !important;
          }

          /* ════════════════════════════════════════
             MOBILE — refonte complète ≤ 640px
             ════════════════════════════════════════ */
          @media (max-width: 640px) {

            /* ── NAVBAR ── */
            .nav-links     { display: none !important; }
            .nav-text      { display: none !important; }
            .nav-hamburger { display: flex !important; }
            .hero-bg       { inset: 0 !important; }

            /* ── TICKER FIXÉ EN BAS ── */
            .ticker-bar {
              position: fixed !important;
              bottom: 0 !important; left: 0 !important; right: 0 !important;
              z-index: 50 !important;
              border-top: 2px solid #3b82f6 !important;
              border-bottom: none !important;
            }

            /* ── HERO ── */
            .hero-section  { min-height: 100dvh !important; }
            .hero-content  { min-height: 100dvh !important; padding: 72px 20px 100px !important; }
            .hero-bg       { background-size: 160% !important; background-position: center 30% !important; }
            .hero-logo     { width: 150px !important; height: 150px !important; }
            .hero-logo-wrap{ width: 150px !important; height: 150px !important; margin-bottom: 14px !important; }
            .hero-separator{ gap: 8px !important; margin-bottom: 10px !important; }
            .hero-separator span { font-size: 0.58rem !important; letter-spacing: 0.25em !important; }
            .hero-separator .sep-line { width: 20px !important; }
            .hero-title    { margin-bottom: 22px !important; }
            .hero-match-strip { display: none !important; }
            .hero-badge    { display: none !important; }
            .hero-mobile-info { display: none !important; }
            .hero-badge    { display: none !important; }
            .hero-ctas     { display: none !important; }

            /* ── BANDE MOBILE SOUS LE HERO ── */
            .hero-mobile-band {
              display: flex !important;
              flex-direction: column !important;
              gap: 10px !important;
              padding: 16px 18px 14px !important;
              background: rgba(5,8,20,0.97) !important;
              border-bottom: 1px solid rgba(59,130,246,0.15) !important;
            }
            .hero-mobile-band-pill {
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .hero-mobile-band-ctas {
              display: flex !important;
              gap: 8px !important;
            }
            .hero-mobile-band-ctas a {
              flex: 1 !important;
              padding: 13px 0 !important;
              font-size: 0.68rem !important;
              letter-spacing: 0.1em !important;
              text-align: center !important;
              box-sizing: border-box !important;
            }
            .hero-watermark{ display: none !important; }

            /* ── STATS BAR — 2 stats seulement ── */
            .hero-stats-bar > div { padding: 12px 0 !important; }
            .hero-stats-bar .stat-num   { font-size: 1.25rem !important; }
            .hero-stats-bar .stat-label { font-size: 0.5rem !important; letter-spacing: 0.1em !important; }
            .stat-hide-mobile { display: none !important; }

            /* ── SECTIONS — padding réduit ── */
            .section-mobile { padding: 52px 18px !important; }

            /* ── TITRES SECTIONS ── */
            .section-label  { font-size: 0.65rem !important; letter-spacing: 0.3em !important; }
            .section-h2     { font-size: 1.65rem !important; }

            /* ── RÉSULTATS ── */
            .score-date     { display: none !important; }
            .score-label    { width: 26px !important; height: 26px !important; font-size: 0.65rem !important; }
            .score-text     { font-size: 0.9rem !important; }
            .score-row      { padding: 12px 14px !important; gap: 10px !important; }

            /* ── CLASSEMENT ── */
            .classement-header,
            .classement-row { grid-template-columns: 28px 1fr 32px 44px !important; }
            .classement-col-hide { display: none !important; }
            .classement-club { font-size: 0.82rem !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 130px; }
            .classement-num  { font-size: 0.82rem !important; }
            .classement-pts  { font-size: 0.92rem !important; }

            /* ── PROCHAINS MATCHS — swipe horizontal ── */
            .matchs-scroll { display: flex !important; overflow-x: auto !important; gap: 12px !important; padding-bottom: 8px !important; scroll-snap-type: x mandatory !important; -webkit-overflow-scrolling: touch !important; }
            .matchs-scroll::-webkit-scrollbar { display: none !important; }
            .matchs-list   { display: none !important; }
            .match-card-h  { min-width: 240px !important; scroll-snap-align: start !important; display: flex !important; flex-direction: column !important; }

            /* ── COUNTDOWN ── */
            .cd-num  { font-size: 2rem !important; }
            .cd-unit { font-size: 0.55rem !important; }
            .cd-wrap { gap: 6px !important; }
            .cd-label{ font-size: 0.65rem !important; }
            .cd-info { font-size: 0.65rem !important; gap: 4px !important; flex-direction: column !important; }

            /* ── ACTUALITÉS — pleine largeur ── */
            .actu-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
            .actu-card { padding: 24px 20px !important; }
            .actu-titre{ font-size: 1.05rem !important; }
            .actu-texte{ font-size: 0.88rem !important; line-height: 1.65 !important; }
            .actu-emoji{ font-size: 2rem !important; margin-bottom: 14px !important; }

            /* ── ÉQUIPES ── */
            .eq-grid { grid-template-columns: 1fr 1fr !important; gap: 2px !important; }
            .eq-cat  { font-size: 0.85rem !important; }
            .eq-label{ font-size: 0.75rem !important; }
            .eq-nb   { font-size: 0.7rem !important; }

            /* ── CONTACT ── */
            .contact-section { padding: 64px 18px !important; }
            .contact-h2   { font-size: 2rem !important; }
            .contact-desc { font-size: 0.88rem !important; }
            .contact-ctas { flex-direction: column !important; gap: 10px !important; }
            .contact-ctas a { padding: 15px !important; width: 100% !important; box-sizing: border-box !important; text-align: center !important; font-size: 0.78rem !important; }
            .contact-info { gap: 24px !important; padding: 24px 18px !important; }
            .contact-info-val { font-size: 0.82rem !important; }
          }
        `}</style>

        {/* ── Fond château + parallax ── */}
        <div ref={heroBgRef} className="hero-bg" style={{
          position: "absolute", inset: "-15%",
          backgroundImage: "url('/hero-football-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(2,6,20,0.38)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(5,40,160,0.35) 0%, rgba(5,40,160,0.08) 45%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, #07090f 0%, rgba(7,9,15,0.7) 40%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "20%", background: "linear-gradient(to bottom, rgba(2,6,20,0.7) 0%, transparent 100%)" }} />
        <div style={{ position: "absolute", top: 64, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.35) 20%, rgba(59,130,246,0.7) 50%, rgba(59,130,246,0.35) 80%, transparent)" }} />

        {/* ── ORBES LUMINEUX AURORA ── */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1, pointerEvents: "none" }}>
          {/* Orbe centre — halo pulsant derrière le logo */}
          <div style={{
            position: "absolute", top: "5%", left: "50%",
            transform: "translateX(-50%)",
            width: "55vw", height: "55vw", maxWidth: "580px", maxHeight: "580px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(59,130,246,0.55) 0%, rgba(37,99,235,0.22) 40%, transparent 70%)",
            filter: "blur(30px)",
            animation: "orbPulse 6s ease-in-out infinite",
          }} />
          {/* Orbe 1 — bleu électrique, haut gauche */}
          <div style={{
            position: "absolute", top: "-15%", left: "-8%",
            width: "60vw", height: "60vw", maxWidth: "650px", maxHeight: "650px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(37,99,235,0.65) 0%, rgba(37,99,235,0.22) 45%, transparent 70%)",
            filter: "blur(22px)",
            animation: "orb1 18s ease-in-out infinite",
          }} />
          {/* Orbe 2 — violet, droite */}
          <div style={{
            position: "absolute", top: "0%", right: "-12%",
            width: "50vw", height: "50vw", maxWidth: "550px", maxHeight: "550px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(109,40,217,0.55) 0%, rgba(99,60,220,0.18) 45%, transparent 70%)",
            filter: "blur(28px)",
            animation: "orb2 24s ease-in-out infinite",
          }} />
          {/* Orbe 3 — cyan, bas */}
          <div style={{
            position: "absolute", bottom: "0%", left: "25%",
            width: "45vw", height: "45vw", maxWidth: "480px", maxHeight: "480px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(6,182,212,0.42) 0%, rgba(14,116,144,0.14) 45%, transparent 70%)",
            filter: "blur(32px)",
            animation: "orb3 30s ease-in-out infinite",
          }} />
        </div>

        {/* WATERMARK "1974" — bas droite */}
        <div className="hero-watermark" style={{
          position: "absolute", zIndex: 1,
          fontSize: "clamp(7rem, 22vw, 20rem)", fontWeight: 900, letterSpacing: "-0.05em",
          color: "rgba(255,255,255,0.055)", lineHeight: 1,
          bottom: "72px", right: "-0.02em",
          whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none",
        }}>1974</div>

        {/* ── CONTENU CENTRÉ ── */}
        <div className="hero-content" style={{
          position: "relative", zIndex: 2, minHeight: "100dvh",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          textAlign: "center", padding: "80px 24px 90px", gap: 0,
        }}>

          {/* Logo */}
          <div className="hero-logo-wrap" style={{ position: "relative", marginBottom: "20px", animation: "heroLogoIn 1s cubic-bezier(0.34,1.4,0.64,1) 0.15s both" }}>
            <div style={{ position: "absolute", inset: "-32px", borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)", filter: "blur(22px)", pointerEvents: "none" }} />
            <img
              src="/logo2-removebg-preview.png"
              alt="FC Vaux-le-Pénil"
              className="hero-logo"
              style={{ width: "200px", height: "200px", objectFit: "contain", position: "relative", zIndex: 1, filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.7))" }}
            />
          </div>

          {/* Séparateur */}
          <div className="hero-separator" style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", animation: "heroBadgeIn 0.6s ease 0.5s both" }}>
            <div className="sep-line" style={{ width: "50px", height: "1px", background: "linear-gradient(to right, transparent, rgba(59,130,246,0.8))" }} />
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.48em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Depuis 1974 · Vaux-le-Pénil · 77</span>
            <div className="sep-line" style={{ width: "50px", height: "1px", background: "linear-gradient(to left, transparent, rgba(59,130,246,0.8))" }} />
          </div>

          {/* ── PILL INFO (desktop : badge victoire / mobile : info compacte) ── */}
          <div style={{ animation: "heroBadgeIn 0.6s ease 0.85s both", marginBottom: "24px" }}>
            {/* Desktop — badge victoire */}
            <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", padding: "9px 18px", borderRadius: "100px", fontSize: "0.68rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#15803d", color: "#fff", padding: "3px 9px", fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.1em", borderRadius: "4px" }}>
                <span>✓</span> VICTOIRE
              </span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.55rem" }}>|</span>
              <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>VLP <strong style={{ color: "#fff" }}>3 – 1</strong> ES Maincy</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.55rem" }}>|</span>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>Prochain <strong style={{ color: "#60a5fa" }}>12 Avr.</strong> · 15h</span>
            </div>
            {/* Mobile — pill compacte */}
            <div className="hero-mobile-info" style={{ display: "none", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", padding: "8px 16px", borderRadius: "100px" }}>
              <span style={{ background: "#15803d", color: "#fff", padding: "2px 8px", fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.08em", borderRadius: "3px" }}>V 3–1</span>
              <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
              <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
                Prochain <strong style={{ color: "#fff" }}>12 Avr. · 15h</strong>
              </span>
            </div>
          </div>

          {/* ── CTAs ── */}
          <div className="hero-ctas" style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center", animation: "heroBadgeIn 0.6s ease 1s both" }}>
            <a href="#resultats" style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
              color: "#fff", fontSize: "0.72rem", letterSpacing: "0.16em",
              textDecoration: "none", textTransform: "uppercase", fontWeight: 700,
              whiteSpace: "nowrap", borderRadius: "3px",
              boxShadow: "0 4px 24px rgba(37,99,235,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}>Résultats & Classement</a>
            <a href="#le-club" style={{
              padding: "14px 28px",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.85)",
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              fontSize: "0.72rem", letterSpacing: "0.16em",
              textDecoration: "none", textTransform: "uppercase", fontWeight: 600,
              whiteSpace: "nowrap", borderRadius: "3px",
            }}>Le club ↓</a>
          </div>
        </div>

        {/* ── BARRE STATS BAS ── */}
        <div ref={statsBarRef} className="hero-stats-bar" style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, background: "rgba(5,8,20,0.9)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(59,130,246,0.15)", display: "flex", justifyContent: "center", flexWrap: "nowrap" }}>
          {CHIFFRES.map((c, i) => (
            <div key={i} className={i === 0 || i === 3 ? "stat-hide-mobile" : undefined} style={{ padding: "12px 0", textAlign: "center", borderRight: "1px solid rgba(59,130,246,0.08)", flex: 1 }}>
              <div className="stat-num" data-suffix={c.n.includes("+") ? "+" : ""} style={{ fontSize: "1.3rem", fontWeight: 900, color: "#3b82f6", lineHeight: 1 }}>0</div>
              <div className="stat-label" style={{ fontSize: "0.5rem", color: "#475569", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: "3px" }}>{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BANDE MOBILE : pill + CTAs sous le hero ── */}
      <div className="hero-mobile-band" style={{ display: "none" }}>
        <div className="hero-mobile-band-pill">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", padding: "8px 16px", borderRadius: "100px" }}>
            <span style={{ background: "#15803d", color: "#fff", padding: "2px 8px", fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.08em", borderRadius: "3px" }}>V 3–1</span>
            <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.6)", whiteSpace: "nowrap" }}>
              Prochain <strong style={{ color: "#fff" }}>12 Avr. · 15h</strong>
            </span>
          </div>
        </div>
        <div className="hero-mobile-band-ctas">
          <a href="#resultats" style={{
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "#fff", textDecoration: "none", textTransform: "uppercase", fontWeight: 700,
            borderRadius: "3px", boxShadow: "0 4px 18px rgba(37,99,235,0.4)",
          }}>Résultats & Classement</a>
          <a href="#le-club" style={{
            border: "1px solid rgba(255,255,255,0.18)",
            color: "rgba(255,255,255,0.85)",
            background: "rgba(255,255,255,0.06)",
            textDecoration: "none", textTransform: "uppercase", fontWeight: 600,
            borderRadius: "3px",
          }}>Le club ↓</a>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="ticker-bar" style={{ background: "#1e3a8a", padding: "12px 0", overflow: "hidden", borderTop: "2px solid #3b82f6", borderBottom: "1px solid rgba(59,130,246,0.3)" }}>
        <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
          <div ref={tickerRef} style={{ display: "inline-flex", gap: "0" }}>
            <div className="ticker-inner" style={{ display: "inline-flex", gap: "48px", paddingRight: "48px" }}>
              {RESULTATS.map((r) => (
                <span key={r.id} style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", display: "inline-flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ padding: "2px 8px", borderRadius: "2px", fontSize: "0.6rem", background: r.victoire === true ? "#15803d" : r.victoire === false ? "#dc2626" : "#475569", color: "#fff" }}>
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

      {/* ── COUNTDOWN PROCHAIN MATCH ── */}
      <div ref={countdownRef} style={{
        background: "linear-gradient(90deg, #020510 0%, #050d20 50%, #020510 100%)",
        borderBottom: "1px solid rgba(59,130,246,0.1)",
        padding: "28px 24px",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "24px", flexWrap: "wrap",
      }}>
        <div className="cd-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", animation: "dotPulse 1.5s infinite" }} />
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.35em", color: "#475569", textTransform: "uppercase" }}>Prochain match dans</span>
        </div>
        <div className="cd-wrap" style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {[["jours", "0"], ["h", "1"], ["min", "2"], ["sec", "3"]].map(([unit, idx]) => (
            <div key={unit} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
              <div className="cd-block" style={{
                minWidth: "52px", padding: "8px 10px",
                background: "rgba(37,99,235,0.08)",
                border: "1px solid rgba(59,130,246,0.25)",
                textAlign: "center",
              }}>
                <span data-cd={idx} className="cd-num" style={{ fontSize: "1.5rem", fontWeight: 900, color: "#fff", fontVariantNumeric: "tabular-nums", display: "block", lineHeight: 1 }}>00</span>
              </div>
              <span className="cd-unit" style={{ fontSize: "0.48rem", color: "#334155", letterSpacing: "0.18em", textTransform: "uppercase" }}>{unit}</span>
            </div>
          ))}
        </div>
        <div className="cd-info" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>
          Match du dimanche <span style={{ color: "#3b82f6", margin: "0 4px" }}>·</span> Coup d&apos;envoi 15h00 <span style={{ color: "#3b82f6", margin: "0 4px" }}>·</span> Heure de Paris
        </div>
      </div>

      {/* ── RÉSULTATS + CLASSEMENT ── */}
      {/* Identité : fond très sombre #04060c, grille de points en bg, accent vert/rouge */}
      <section id="resultats" className="section-mobile" style={{
        padding: "100px 24px",
        background: "radial-gradient(ellipse at 85% 40%, rgba(37,99,235,0.07) 0%, transparent 55%), #04060c",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grille de points décorative */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(59,130,246,0.08) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p className="section-label" style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "12px" }}>Saison 2024-2025</p>
            <h2 className="section-h2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>Résultats & Classement</h2>
            <div className="accent-line" style={{ margin: "14px auto 0" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>

            {/* Résultats */}
            <div className="reveal-l" style={{ background: "rgba(10,14,28,0.9)", border: "1px solid rgba(59,130,246,0.12)", padding: "32px", backdropFilter: "blur(8px)" }}>
              <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ display: "inline-block", width: "8px", height: "8px", background: "#3b82f6", borderRadius: "50%" }} />
                Derniers Résultats — Seniors A
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                {RESULTATS.map((r, i) => (
                  <div key={r.id} className={`score-row reveal d${i + 1} ${r.victoire === true ? "score-v" : ""}`} style={{
                    display: "flex", alignItems: "center", gap: "12px",
                    padding: "13px 16px",
                    background: r.victoire === true ? "rgba(21,128,61,0.07)" : r.victoire === false ? "rgba(220,38,38,0.07)" : "rgba(71,85,105,0.08)",
                    borderLeft: `3px solid ${r.victoire === true ? "#15803d" : r.victoire === false ? "#dc2626" : "#475569"}`,
                  }}>
                    <span className="score-date" style={{ fontSize: "0.55rem", color: "#475569", width: "40px", flexShrink: 0 }}>{r.date}</span>
                    <span className="score-label" style={{ width: "22px", height: "22px", borderRadius: "2px", flexShrink: 0, background: r.victoire === true ? "#15803d" : r.victoire === false ? "#dc2626" : "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 800, color: "#fff" }}>
                      {r.victoire === true ? "V" : r.victoire === false ? "D" : "N"}
                    </span>
                    <span className="score-text" style={{ flex: 1, fontSize: "0.8rem", fontWeight: 600 }}>
                      {r.domicile ? <><strong>VLP</strong> {r.score} {r.adversaire}</> : <>{r.adversaire} {r.score} <strong>VLP</strong></>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Classement */}
            <div className="reveal-r" style={{ background: "rgba(10,14,28,0.9)", border: "1px solid rgba(59,130,246,0.12)", padding: "32px", backdropFilter: "blur(8px)" }}>
              <h3 style={{ fontSize: "0.65rem", letterSpacing: "0.35em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ display: "inline-block", width: "8px", height: "8px", background: "#3b82f6", borderRadius: "50%" }} />
                Classement — District Division 2
              </h3>
              <div className="classement-header" style={{ display: "grid", gridTemplateColumns: "32px 1fr 40px 40px 40px 40px 50px", gap: "4px", padding: "0 8px 10px", borderBottom: "1px solid rgba(59,130,246,0.12)", marginBottom: "4px" }}>
                {["#", "Club", "J", "G", "N", "P", "Pts"].map((h) => (
                  <span key={h} className={["G","N","P"].includes(h) ? "classement-col-hide" : undefined} style={{ fontSize: "0.55rem", color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: h !== "Club" ? "center" : "left" }}>{h}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                {CLASSEMENT.map((row, i) => (
                  <div key={row.pos} className={`classement-row reveal d${i + 1}`} style={{
                    display: "grid", gridTemplateColumns: "32px 1fr 40px 40px 40px 40px 50px",
                    gap: "4px", padding: "10px 8px",
                    background: row.current ? "rgba(37,99,235,0.15)" : "transparent",
                    borderLeft: row.current ? "3px solid #3b82f6" : "3px solid transparent",
                    alignItems: "center",
                    transition: "background 0.2s",
                  }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: row.current ? 800 : 400, color: row.current ? "#3b82f6" : "#64748b", textAlign: "center" }}>{row.pos}</span>
                    <span className="classement-club" style={{ fontSize: "0.82rem", fontWeight: row.current ? 800 : 500, color: row.current ? "#fff" : "rgba(255,255,255,0.75)" }}>{row.current ? "⚡ " : ""}{row.club}</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{row.j}</span>
                    <span className="classement-col-hide" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{row.g}</span>
                    <span className="classement-col-hide" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{row.n}</span>
                    <span className="classement-col-hide" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textAlign: "center" }}>{row.p}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: row.current ? "#3b82f6" : "rgba(255,255,255,0.65)", textAlign: "center" }}>{row.pts}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROCHAINS MATCHS ── */}
      {/* Identité : ambiance stade la nuit, projecteur depuis le haut */}
      <section id="le-club" className="section-mobile" style={{
        padding: "100px 24px",
        background: `
          radial-gradient(ellipse at 50% -5%, rgba(37,99,235,0.22) 0%, transparent 52%),
          linear-gradient(180deg, #080d1a 0%, #060810 100%)
        `,
        position: "relative", overflow: "hidden",
      }}>
        {/* Lignes de terrain horizontales décoratives */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {[15, 35, 65, 85].map(pct => (
            <div key={pct} style={{ position: "absolute", top: `${pct}%`, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.025)" }} />
          ))}
        </div>

        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p className="section-label" style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "12px" }}>Agenda</p>
            <h2 className="section-h2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>Prochains Matchs</h2>
            <div className="accent-line" style={{ margin: "14px auto 0" }} />
          </div>

          {/* Desktop : liste verticale */}
          <div className="matchs-list" style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {PROCHAINS_MATCHS.map((match, i) => (
              <div key={match.id} className={`match-card match-row reveal d${i + 1}`} style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr auto",
                gap: "16px", alignItems: "center",
                padding: "24px 28px",
                background: i === 0 ? "rgba(37,99,235,0.12)" : "rgba(255,255,255,0.025)",
                border: i === 0 ? "1px solid rgba(59,130,246,0.35)" : "1px solid rgba(255,255,255,0.05)",
                backdropFilter: "blur(6px)",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.6rem", color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase" }}>{match.date.split(" ")[0]}</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900, color: i === 0 ? "#3b82f6" : "#fff", lineHeight: 1 }}>{match.date.split(" ").slice(1).join(" ")}</div>
                  <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "2px" }}>{match.heure}</div>
                </div>
                <div className="match-teams">
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700 }}>FC Vaux-le-Pénil</span>
                    <span style={{ fontSize: "0.7rem", color: "#3b82f6", fontWeight: 700 }}>VS</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>{match.adversaire}</span>
                  </div>
                  <div className="match-meta" style={{ fontSize: "0.65rem", color: "#475569", marginTop: "4px", letterSpacing: "0.05em" }}>
                    {match.competition} · {match.domicile ? "🏠 Domicile" : "✈ Extérieur"}
                  </div>
                </div>
                <div className="match-lieu" style={{ fontSize: "0.72rem", color: "#64748b" }}>📍 {match.lieu}</div>
                {i === 0 && (
                  <div className="match-badge" style={{ padding: "6px 14px", background: "#2563eb", color: "#fff", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, borderRadius: "2px", whiteSpace: "nowrap" }}>
                    Prochain match
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile : swipe horizontal */}
          <div className="matchs-scroll" style={{ display: "none" }}>
            {PROCHAINS_MATCHS.map((match, i) => (
              <div key={match.id} className="match-card-h" style={{
                padding: "20px 18px",
                background: i === 0 ? "rgba(37,99,235,0.14)" : "rgba(255,255,255,0.03)",
                border: i === 0 ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "4px",
                gap: "12px",
              }}>
                {/* Top : badge + date */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontSize: "0.52rem", letterSpacing: "0.18em", color: "#475569", textTransform: "uppercase" }}>{match.competition}</span>
                  {i === 0 && <span style={{ padding: "3px 8px", background: "#2563eb", color: "#fff", fontSize: "0.52rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px" }}>Prochain</span>}
                </div>
                {/* Date + heure */}
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "0.92rem", fontWeight: 800, color: i === 0 ? "#3b82f6" : "#fff" }}>{match.date}</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>{match.heure} · {match.domicile ? "Domicile" : "Extérieur"}</div>
                </div>
                {/* VS */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700 }}>VLP</span>
                  <span style={{ fontSize: "0.6rem", color: "#3b82f6", fontWeight: 700 }}>VS</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{match.adversaire}</span>
                </div>
                {/* Lieu */}
                <div style={{ fontSize: "0.65rem", color: "#475569" }}>📍 {match.lieu}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTUALITÉS ── */}
      {/* Identité : teinte verte très subtile (gazon), cards avec top border colorée */}
      <section id="actualités" className="section-mobile" style={{
        padding: "100px 24px",
        background: `
          radial-gradient(ellipse at 15% 60%, rgba(16,64,32,0.14) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 20%, rgba(16,64,32,0.08) 0%, transparent 40%),
          #060810
        `,
        position: "relative",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p className="section-label" style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "12px" }}>News</p>
            <h2 className="section-h2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>Actualités du Club</h2>
            <div className="accent-line" style={{ margin: "14px auto 0" }} />
          </div>

          <div className="actu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
            {ACTUALITES.map((actu, i) => (
              <article key={actu.id} className={`actu-card reveal-scale d${i + 1}`} style={{
                background: "rgba(8,12,24,0.95)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTop: `3px solid ${actu.categorieColor}`,
                padding: "32px 28px",
                cursor: "pointer",
              }}>
                <div className="actu-emoji" style={{ fontSize: "2.5rem", marginBottom: "20px", lineHeight: 1 }}>{actu.img}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ padding: "3px 10px", background: `${actu.categorieColor}1a`, border: `1px solid ${actu.categorieColor}40`, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: actu.categorieColor, borderRadius: "2px" }}>
                    {actu.categorie}
                  </span>
                  <span style={{ fontSize: "0.65rem", color: "#475569" }}>{actu.date}</span>
                </div>
                <h3 className="actu-titre" style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "12px", lineHeight: 1.4 }}>{actu.titre}</h3>
                <p className="actu-texte" style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: "20px" }}>{actu.extrait}</p>
                <div style={{ fontSize: "0.68rem", color: actu.categorieColor, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Lire la suite →</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÉQUIPES ── */}
      {/* Identité : dégradé bleu nuit profond, cards avec bande colorée à gauche */}
      <section id="equipes" className="section-mobile" style={{
        padding: "100px 24px",
        background: "linear-gradient(160deg, #040810 0%, #07101e 40%, #060c18 70%, #040810 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Diagonale décorative */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "linear-gradient(135deg, transparent 60%, rgba(37,99,235,0.04) 100%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p className="section-label" style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "12px" }}>De 3 à 55 ans</p>
            <h2 className="section-h2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em" }}>Nos Équipes</h2>
            <div className="accent-line" style={{ margin: "14px auto 0" }} />
          </div>

          <div className="eq-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: "3px" }}>
            {EQUIPES.map((eq, i) => (
              <div key={eq.cat} className={`eq-card reveal d${(i % 5) + 1}`} style={{
                padding: "22px 20px",
                background: "rgba(255,255,255,0.02)",
                borderLeft: `3px solid ${eq.couleur}`,
                border: "1px solid rgba(255,255,255,0.05)",
                borderLeftColor: eq.couleur,
                cursor: "pointer",
              }}>
                <div className="eq-cat" style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.05em", marginBottom: "5px", color: "#fff" }}>{eq.cat}</div>
                <div className="eq-label" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", marginBottom: "6px" }}>{eq.label}</div>
                <div className="eq-nb" style={{ fontSize: "0.65rem", color: eq.couleur, fontWeight: 700, letterSpacing: "0.05em" }}>{eq.nb}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      {/* Identité : très épuré, quasi noir, mise en avant sobre */}
      <section id="sponsors" style={{ padding: "72px 24px", background: "#020408", borderTop: "1px solid rgba(59,130,246,0.06)", borderBottom: "1px solid rgba(59,130,246,0.06)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p className="reveal" style={{ fontSize: "0.6rem", letterSpacing: "0.45em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: "40px" }}>
            Partenaires & Sponsors
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
            {SPONSORS.map((s, i) => (
              <div key={s} className={`sponsor-pill reveal d${(i % 4) + 1}`} style={{
                padding: "13px 26px",
                border: "1px solid rgba(59,130,246,0.12)",
                background: "rgba(15,23,42,0.4)",
                fontSize: "0.72rem", fontWeight: 600,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
                cursor: "default",
              }}>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / INSCRIPTION ── */}
      {/* Identité : climax dramatique, grand radial bleu centré */}
      <section id="contact" className="contact-section" style={{
        padding: "120px 24px",
        textAlign: "center",
        background: `
          radial-gradient(ellipse at center 40%, rgba(30,64,175,0.22) 0%, transparent 60%),
          #07090f
        `,
        position: "relative", overflow: "hidden",
      }}>
        {/* Liseré lumineux haut */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5) 30%, rgba(59,130,246,0.9) 50%, rgba(59,130,246,0.5) 70%, transparent)" }} />

        <p className="reveal" style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "#3b82f6", textTransform: "uppercase", marginBottom: "20px" }}>Rejoignez-nous</p>
        <h2 className="contact-h2 reveal" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "16px" }}>
          Prêt à jouer<br />pour Vaux ?
        </h2>
        <p className="contact-desc reveal d1" style={{ color: "rgba(255,255,255,0.35)", maxWidth: "480px", margin: "0 auto 48px", fontSize: "0.9rem", lineHeight: 1.8 }}>
          Inscriptions ouvertes pour toutes les catégories. Présentez-vous à l&apos;entraînement ou contactez-nous directement.
        </p>
        <div className="contact-ctas reveal d2" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#" style={{ padding: "16px 36px", background: "#2563eb", color: "#fff", fontSize: "0.78rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase", fontWeight: 700, borderRadius: "3px" }}>S&apos;inscrire en ligne</a>
          <a href="mailto:contact@fc-vauxlepenil.fr" style={{ padding: "16px 36px", border: "1px solid rgba(59,130,246,0.35)", color: "#93c5fd", fontSize: "0.78rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase", fontWeight: 700, borderRadius: "3px" }}>Nous écrire</a>
        </div>

        {/* Infos pratiques */}
        <div className="contact-info reveal d3" style={{ display: "flex", justifyContent: "center", gap: "48px", marginTop: "64px", flexWrap: "wrap", padding: "36px 32px", background: "rgba(10,14,28,0.7)", border: "1px solid rgba(59,130,246,0.12)", backdropFilter: "blur(12px)", maxWidth: "720px", margin: "64px auto 0" }}>
          {[
            { icon: "📍", label: "Terrain", val: "Stade Paul Doumer, Vaux-le-Pénil" },
            { icon: "📅", label: "Entraînements", val: "Mer & Ven · 19h00" },
            { icon: "📧", label: "Contact", val: "contact@fc-vauxlepenil.fr" },
          ].map((info, i) => (
            <div key={info.label} className={`reveal-scale d${i + 1}`} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px" }}>{info.icon}</div>
              <div style={{ fontSize: "0.6rem", color: "#475569", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "5px" }}>{info.label}</div>
              <div className="contact-info-val" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{info.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "32px 24px", background: "#020408", borderTop: "1px solid rgba(59,130,246,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #1e3a8a, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 900 }}>VLP</div>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em" }}>FC VAUX-LE-PÉNIL</span>
          <span style={{ color: "#1e3a8a", fontSize: "0.7rem" }}>· Fondé en 1974</span>
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
