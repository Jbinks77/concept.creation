"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─── DATA ─── */

const PRESTATIONS = [
  {
    id: 1,
    nom: "Pose Gel Complète",
    desc: "Extension ou capsule, gel couleur ou french raffinée. Une pose pensée pour durer 4 à 6 semaines sans compromis esthétiques.",
    duree: "1h30 – 2h",
    prix: "À partir de 65€",
    tag: "Le plus demandé",
    gradient: "linear-gradient(145deg, #1a0e0a 0%, #5c3425 45%, #c9a96e 100%)",
  },
  {
    id: 2,
    nom: "Nail Art Sur-Mesure",
    desc: "Motifs floraux, effets chrome, 3D ou aquarelle. Chaque ongle devient une pièce unique, pensée pour votre personnalité.",
    duree: "2h – 3h",
    prix: "À partir de 85€",
    tag: "Notre signature",
    gradient: "linear-gradient(145deg, #0d0b14 0%, #2e1f4a 45%, #c9a96e 100%)",
  },
  {
    id: 3,
    nom: "Remplissage & Soin",
    desc: "Repousse corrigée, brillance retrouvée. Vos ongles aussi parfaits qu'au premier jour, en une séance d'une heure.",
    duree: "1h – 1h30",
    prix: "À partir de 45€",
    tag: "Fidélité",
    gradient: "linear-gradient(145deg, #080d08 0%, #1a3a28 45%, #a8c9b0 100%)",
  },
];

const DIFFERENCIATIONS = [
  { icon: "✦", titre: "Produits professionnels exclusifs", texte: "OPI, Gelish, NSI. Uniquement les meilleures marques professionnelles, sélectionnées pour leur tenue et leur sécurité." },
  { icon: "◆", titre: "Résultats qui durent", texte: "4 à 6 semaines garanties. Une technique maîtrisée, une pose irréprochable. Votre satisfaction est notre standard minimal." },
  { icon: "✦", titre: "Consultation incluse", texte: "Chaque séance commence par un échange : votre style de vie, vos envies, votre silhouette de main. Rien n'est standardisé." },
  { icon: "◆", titre: "Suivi après pose", texte: "Un souci après votre rendez-vous ? Nous répondons toujours. Votre confiance est ce que nous construisons, séance après séance." },
];

const AVIS = [
  {
    id: 1, nom: "Camille R.", depuis: "Cliente depuis 2 ans", note: 5,
    texte: "Je cherchais depuis des années une prothésiste qui comprenne vraiment mes envies. Vénera Studio a ce don rare de lire votre style avant même que vous l'exprimiez. Résultats bluffants, ambiance cosy.",
  },
  {
    id: 2, nom: "Sofia M.", depuis: "Cliente depuis 18 mois", note: 5,
    texte: "Mes ongles tiennent 5 semaines sans le moindre éclat. Et le nail art est d'un niveau que je ne pensais pas trouver à Melun. Vraiment exceptionnelle. Je ne changerais pour rien au monde.",
  },
  {
    id: 3, nom: "Léa T.", depuis: "Cliente depuis 8 mois", note: 5,
    texte: "Chaque rendez-vous est un moment que je m'accorde. L'atelier est magnifique, l'accueil chaleureux, le résultat toujours au-delà de mes attentes. Une vraie artiste.",
  },
];

const STATS = [
  { n: 127, label: "Avis 5 étoiles", suffix: "+" },
  { n: 450, label: "Clientes fidèles", suffix: "+" },
  { n: 8,   label: "Ans d'expertise", suffix: "" },
  { n: 100, label: "Satisfaction", suffix: "%" },
];

const GALERIE = [
  { gradient: "linear-gradient(145deg, #f0e6dc 0%, #d4a892 50%, #8b5a47 100%)", tall: true },
  { gradient: "linear-gradient(145deg, #1a0e0a 0%, #5c3425 50%, #c9a96e 100%)", tall: false },
  { gradient: "linear-gradient(145deg, #f5f0eb 0%, #e8d5c4 50%, #c9a96e 100%)", tall: false },
  { gradient: "linear-gradient(145deg, #0d0b14 0%, #2a1535 50%, #c4a0c4 100%)", tall: true },
  { gradient: "linear-gradient(145deg, #f2ece6 0%, #dcc4b4 50%, #8b6b5a 100%)", tall: false },
  { gradient: "linear-gradient(145deg, #0a0808 0%, #2a1010 50%, #9b2020 100%)", tall: false },
];

/* ─── CALENDAR HELPERS ─── */
const MONTH_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const DAY_FR   = ["L","M","M","J","V","S","D"];
const SLOTS_WEEK = ["9h00","10h30","12h00","14h00","15h30","17h00"];
const SLOTS_SAT  = ["9h00","10h30","12h00","14h00","15h30"];

function getSlots(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  const day = d.getDay();
  if (day === 0) return [];
  return day === 6 ? SLOTS_SAT : SLOTS_WEEK;
}
function slotAvail(dateStr: string, slot: string) {
  const h = (dateStr + slot).split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return h % 4 !== 0;
}
function fmtDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}
function isDateAvail(y: number, m: number, d: number) {
  const date = new Date(y, m, d);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff = Math.floor((date.getTime() - today.getTime()) / 86400000);
  const dow = date.getDay();
  return diff >= 1 && diff <= 45 && dow !== 0;
}
function isToday(y: number, m: number, d: number) {
  const t = new Date();
  return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d;
}
function fmtDateFR(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

/* ─── COMPONENT ─── */

export default function DemoNail() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const heroBgRef  = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [navScrolled, setNavScrolled]   = useState(false);
  const [calYear, setCalYear]           = useState(() => new Date().getFullYear());
  const [calMonth, setCalMonth]         = useState(() => new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  /* Calendar navigation */
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setSelectedDate(null); setSelectedSlot(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setSelectedDate(null); setSelectedSlot(null);
  };

  const firstDow = new Date(calYear, calMonth, 1).getDay();
  const calOffset = firstDow === 0 ? 6 : firstDow - 1;
  const daysInCal = new Date(calYear, calMonth + 1, 0).getDate();
  const slots = selectedDate ? getSlots(selectedDate) : [];

  const waMessage = selectedDate && selectedSlot
    ? encodeURIComponent(`Bonjour, je souhaite réserver une séance chez Vénera Studio le ${fmtDateFR(selectedDate)} à ${selectedSlot}. Pourriez-vous confirmer ma réservation ? Merci !`)
    : "";

  /* Canvas — poussière d'or */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    type Particle = { x: number; y: number; size: number; vy: number; vx: number; op: number; opS: number; };
    const pts: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 0.4 + Math.random() * 1.6,
      vy: -(0.08 + Math.random() * 0.35),
      vx: (Math.random() - 0.5) * 0.12,
      op: Math.random() * 0.55,
      opS: 0.002 + Math.random() * 0.003,
    }));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.y += p.vy; p.x += p.vx; p.op += p.opS;
        if (p.op > 0.65 || p.op < 0.02) p.opS *= -1;
        if (p.y < -8) { p.y = canvas.height + 8; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,169,110,${p.op})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  /* Nav scroll + parallax */
  useEffect(() => {
    const fn = () => {
      setNavScrolled(window.scrollY > 50);
      const bg = heroBgRef.current;
      if (bg && window.innerWidth >= 768) bg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal,.reveal-l,.reveal-r,.reveal-scale").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Counters */
  useEffect(() => {
    const bar = statsRef.current;
    if (!bar) return;
    let done = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done) return;
      done = true;
      STATS.forEach((stat, i) => {
        const el = bar.querySelectorAll<HTMLElement>(".snum")[i];
        if (!el) return;
        const t0 = Date.now(), dur = 1600;
        const step = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * stat.n) + stat.suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        step();
      });
    }, { threshold: 0.4 });
    io.observe(bar);
    return () => io.disconnect();
  }, []);

  return (
    <div style={{ background: "#0D0B0A", color: "#fff", fontFamily: "'DM Sans', -apple-system, sans-serif", overflowX: "hidden", minHeight: "100vh" }}>

      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        * { box-sizing: border-box; }

        .font-disp { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── REVEAL ── */
        .reveal       { opacity:0; transform:translateY(30px);  transition:opacity .85s ease,transform .85s ease; }
        .reveal-l     { opacity:0; transform:translateX(-40px); transition:opacity .85s ease,transform .85s ease; }
        .reveal-r     { opacity:0; transform:translateX(40px);  transition:opacity .85s ease,transform .85s ease; }
        .reveal-scale { opacity:0; transform:scale(0.93);       transition:opacity .7s ease, transform .7s ease; }
        .reveal.visible,.reveal-l.visible,.reveal-r.visible,.reveal-scale.visible { opacity:1; transform:none; }
        .d1{transition-delay:.08s!important} .d2{transition-delay:.18s!important}
        .d3{transition-delay:.28s!important} .d4{transition-delay:.38s!important}
        .d5{transition-delay:.48s!important}

        /* ── CTA ── */
        .btn-gold {
          display:inline-block; padding:16px 44px;
          background:linear-gradient(135deg,#C9A96E 0%,#E8D4A8 50%,#C9A96E 100%);
          background-size:200% auto;
          color:#0D0B0A; font-size:0.7rem; font-weight:600;
          letter-spacing:0.24em; text-transform:uppercase; text-decoration:none;
          transition:background-position .5s ease, box-shadow .3s ease;
        }
        .btn-gold:hover { background-position:right center; box-shadow:0 8px 36px rgba(201,169,110,0.4); }
        .btn-outline {
          display:inline-block; padding:15px 40px;
          border:1px solid rgba(201,169,110,0.4); color:#C9A96E;
          font-size:0.7rem; font-weight:500; letter-spacing:0.24em;
          text-transform:uppercase; text-decoration:none;
          transition:background .3s, border-color .3s;
        }
        .btn-outline:hover { background:rgba(201,169,110,0.07); border-color:#C9A96E; }

        /* ── NAV ── */
        .nav-scrolled {
          background: rgba(13,11,10,0.97) !important;
          backdrop-filter: blur(24px) !important;
          border-bottom: 1px solid rgba(201,169,110,0.14) !important;
        }
        .nav-link { color:rgba(255,255,255,0.5); text-decoration:none; font-size:0.68rem; letter-spacing:0.16em; text-transform:uppercase; transition:color .2s; }
        .nav-link:hover { color:#C9A96E; }

        /* ── CARDS ── */
        .presta-card { transition:transform .35s ease, box-shadow .35s ease; cursor:pointer; }
        .presta-card:hover { transform:translateY(-10px); box-shadow:0 40px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(201,169,110,0.15); }
        .avis-card { transition:transform .3s ease; }
        .avis-card:hover { transform:translateY(-5px); }

        /* ── GALLERY ── */
        .gallery-overlay { position:absolute; inset:0; background:rgba(13,11,10,0); transition:background .35s; display:flex; align-items:center; justify-content:center; }
        .gallery-item:hover .gallery-overlay { background:rgba(13,11,10,0.4); }
        .gallery-overlay-text { opacity:0; color:#C9A96E; font-size:0.62rem; letter-spacing:0.3em; text-transform:uppercase; transition:opacity .35s; }
        .gallery-item:hover .gallery-overlay-text { opacity:1; }

        /* ── GOLD LINE ── */
        @keyframes lineExpand { from{width:0} to{width:48px} }
        .gold-line { height:1px; width:48px; background:linear-gradient(90deg,#C9A96E,rgba(201,169,110,0.1)); }
        .gold-line-c { height:1px; width:48px; background:linear-gradient(90deg,transparent,#C9A96E,transparent); margin:0 auto; }

        /* ── SCROLL INDICATOR ── */
        @keyframes scrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        .scroll-ind { animation:scrollBounce 2.2s ease-in-out infinite; }

        /* ── DIFF SECTION ── */
        .diff-outer { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
        .diff-grid-desktop { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .diff-grid-mobile  { display:none; }
        .diff-card-desk {
          padding:28px 22px; background:#fff; border-bottom:2px solid rgba(201,169,110,0.3);
          transition:transform .25s, box-shadow .25s;
        }
        .diff-card-desk:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.08); }

        /* ── CALENDAR ── */
        .cal-wrap { max-width:560px; margin:0 auto; }
        .cal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:28px; }
        .cal-arrow {
          background:none; border:1px solid rgba(201,169,110,0.25); color:#C9A96E;
          width:40px; height:40px; cursor:pointer; font-size:1.1rem;
          transition:background .2s, border-color .2s;
          display:flex; align-items:center; justify-content:center;
        }
        .cal-arrow:hover { background:rgba(201,169,110,0.1); border-color:rgba(201,169,110,0.6); }
        .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:3px; }
        .cal-day-head {
          text-align:center; font-size:0.5rem; letter-spacing:0.18em;
          color:rgba(201,169,110,0.45); padding:10px 0 8px; text-transform:uppercase;
        }
        .cal-cell {
          aspect-ratio:1/1; display:flex; align-items:center; justify-content:center;
          font-size:0.72rem; font-weight:400; cursor:default;
          border:1px solid transparent; transition:all .18s; position:relative;
        }
        .cal-cell.avail {
          cursor:pointer; color:rgba(255,255,255,0.82);
          border-color:rgba(201,169,110,0.1);
        }
        .cal-cell.avail:hover {
          border-color:rgba(201,169,110,0.55); color:#C9A96E;
          background:rgba(201,169,110,0.07);
        }
        .cal-cell.sel {
          background:#C9A96E !important; color:#0D0B0A !important;
          border-color:#C9A96E !important; font-weight:700;
        }
        .cal-cell.past   { color:rgba(255,255,255,0.14); }
        .cal-cell.today-mark { color:#C9A96E; font-weight:600; }
        .cal-cell.today-mark::after {
          content:''; position:absolute; bottom:4px; left:50%; transform:translateX(-50%);
          width:3px; height:3px; background:#C9A96E; border-radius:50%;
        }
        .slots-wrap { margin-top:32px; }
        .slots-label {
          font-size:0.52rem; letter-spacing:0.28em; color:rgba(201,169,110,0.55);
          text-transform:uppercase; margin-bottom:14px;
        }
        .slots-grid { display:flex; flex-wrap:wrap; gap:10px; }
        .slot-pill {
          padding:11px 22px; border:1px solid rgba(201,169,110,0.2);
          font-size:0.65rem; letter-spacing:0.1em; color:rgba(255,255,255,0.35);
          cursor:not-allowed; transition:all .2s; font-weight:400;
        }
        .slot-pill.avail {
          color:rgba(255,255,255,0.75); border-color:rgba(201,169,110,0.35); cursor:pointer;
        }
        .slot-pill.avail:hover {
          border-color:#C9A96E; color:#C9A96E; background:rgba(201,169,110,0.07);
        }
        .slot-pill.taken {
          opacity:0.22; text-decoration:line-through; cursor:not-allowed;
          color:rgba(255,255,255,0.25);
        }
        .slot-pill.sel {
          background:#C9A96E; color:#0D0B0A; border-color:#C9A96E; font-weight:700; cursor:pointer;
        }
        .cal-confirm {
          margin-top:40px; padding:28px 32px;
          border:1px solid rgba(201,169,110,0.2);
          background:rgba(201,169,110,0.04);
          animation: fadeInUp .4s ease forwards;
        }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
        .cal-summary-date {
          font-family:'Cormorant Garamond',serif; font-style:italic;
          font-size:1.4rem; color:#C9A96E; margin-bottom:6px; font-weight:300;
        }
        .cal-summary-slot {
          font-size:0.68rem; letter-spacing:0.14em; color:rgba(255,255,255,0.45);
          text-transform:uppercase; margin-bottom:24px;
        }

        /* ── MOBILE ── */
        .hamburger { display:none; }
        .sticky-mobile { display:none; }

        @media(max-width:640px) {
          .nav-desktop { display:none !important; }
          .hamburger   { display:flex !important; }
          .presta-grid { grid-template-columns:1fr !important; }
          .diff-outer          { grid-template-columns:1fr !important; gap:0 !important; }
          .diff-grid-desktop   { display:none !important; }
          .diff-grid-mobile    { display:flex !important; flex-direction:column; gap:0; margin-top:32px; }
          .diff-card-mobile    {
            display:flex; align-items:flex-start; gap:16px;
            padding:20px 0;
            border-bottom:1px solid rgba(201,169,110,0.1);
          }
          .diff-mob-icon {
            flex-shrink:0; width:38px; height:38px; margin-top:2px;
            border:1px solid rgba(201,169,110,0.3);
            display:flex; align-items:center; justify-content:center;
          }
          .diff-intro-text { display:none; }
          .avis-grid   { grid-template-columns:1fr !important; }
          .gallery-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .gallery-tall{ grid-row:span 1 !important; }
          .stats-grid  { grid-template-columns:1fr 1fr !important; gap:0 !important; }
          .hero-title  { font-size:clamp(3.8rem,18vw,5.5rem) !important; line-height:0.88 !important; }
          .section-pad { padding:64px 20px !important; }
          .sticky-mobile {
            display:block; position:fixed; bottom:0; left:0; right:0; z-index:90;
            background:rgba(13,11,10,0.97); backdrop-filter:blur(16px);
            border-top:1px solid rgba(201,169,110,0.18); padding:14px 20px;
          }
          .sticky-mobile a { display:block; text-align:center; }
          .cta-row { display:none !important; }
          .scroll-ind { display:none !important; }
          .hero-bg { background-size: 110% !important; background-position: center 50% !important; }
          .cal-cell { font-size:0.65rem; }
          .slot-pill { padding:10px 16px; font-size:0.6rem; }
          .cal-confirm { padding:22px 20px; }
          .cal-summary-date { font-size:1.15rem; }
          .infos-grid { grid-template-columns:1fr !important; gap:28px !important; }
        }
      `}</style>

      {/* ── CANVAS ── */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* ── NAV ── */}
      <nav className={navScrolled ? "nav-scrolled" : ""} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: "68px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "transparent", transition: "background .4s, border .4s",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", border: "1px solid rgba(201,169,110,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#C9A96E", fontStyle: "italic" }}>V</span>
          </div>
          <div>
            <div style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.28em", color: "#fff" }}>VÉNERA STUDIO</div>
            <div style={{ fontSize: "0.48rem", color: "#C9A96E", letterSpacing: "0.22em", marginTop: "1px" }}>NAIL ARTIST · MELUN</div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {["Prestations", "Galerie", "À propos", "Avis"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace("à","a").replace(" ","-")}`} className="nav-link">{l}</a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a href="#reservation" className="btn-gold nav-desktop" style={{ padding: "10px 28px", fontSize: "0.62rem" }}>
          Réserver
        </a>

        {/* Mobile hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", padding: "6px" }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: "22px", height: "1px", background: "#C9A96E",
              transition: "transform .25s, opacity .25s",
              transform: i === 0 && menuOpen ? "rotate(45deg) translate(0,6px)" : i === 2 && menuOpen ? "rotate(-45deg) translate(0,-6px)" : "none",
              opacity: i === 1 && menuOpen ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* ── MENU MOBILE ── */}
      <div style={{
        position: "fixed", top: "68px", left: 0, right: 0, zIndex: 99,
        background: "rgba(8,6,5,0.98)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(201,169,110,0.12)",
        transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
        visibility: menuOpen ? "visible" : "hidden",
        transition: "transform .35s cubic-bezier(0.4,0,0.2,1), visibility .35s",
        pointerEvents: menuOpen ? "auto" : "none",
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {["Prestations", "Galerie", "À propos", "Avis", "Réservation"].map((item, i) => (
            <a key={item} href={`#${item.toLowerCase().replace("à","a").replace(" ","-").replace("é","e")}`}
              onClick={() => setMenuOpen(false)}
              style={{ padding: "18px 28px", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: i === 4 ? "#C9A96E" : "rgba(255,255,255,0.65)", textDecoration: "none", borderBottom: "1px solid rgba(201,169,110,0.06)" }}>
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section style={{ minHeight: "100dvh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "100px 32px 100px", overflow: "hidden" }}>

        {/* ── Photo hero ── */}
        <div ref={heroBgRef} className="hero-bg" style={{
          position: "absolute", inset: "-8%",
          backgroundImage: "url('/hero-nail.jpg')",
          backgroundSize: "75%",
          backgroundPosition: "center 55%",
          backgroundRepeat: "no-repeat",
          willChange: "transform",
        }} />
        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,6,5,0.55)", zIndex: 1 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(8,6,5,0.6) 0%, rgba(8,6,5,0.15) 50%, transparent 75%)", zIndex: 1 }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to bottom, rgba(8,6,5,0.8) 0%, transparent 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, #0D0B0A 0%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "760px" }}>
          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "32px" }} className="reveal">
            <div style={{ width: "28px", height: "1px", background: "#C9A96E" }} />
            <span style={{ fontSize: "0.58rem", letterSpacing: "0.45em", color: "#C9A96E", textTransform: "uppercase" }}>Atelier Nail Art · Melun · 77</span>
            <div style={{ width: "28px", height: "1px", background: "#C9A96E" }} />
          </div>

          {/* Main title */}
          <h1 className="hero-title font-disp reveal d1" style={{
            fontSize: "clamp(5rem, 10vw, 9rem)", fontWeight: 300, lineHeight: 0.88,
            letterSpacing: "-0.02em", color: "#fff", margin: "0 0 28px",
            fontStyle: "italic",
          }}>
            <span style={{ display: "block" }}>L&apos;art naît</span>
            <span style={{ display: "block", color: "#C9A96E" }}>au bout</span>
            <span style={{ display: "block" }}>des doigts.</span>
          </h1>

          {/* Separator */}
          <div className="reveal d2" style={{ display: "flex", justifyContent: "center", margin: "0 0 28px" }}>
            <div className="gold-line-c" />
          </div>

          {/* Subtitle */}
          <p className="reveal d2" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em", lineHeight: 1.9, marginBottom: "44px", fontWeight: 300 }}>
            Poses gel, nail art sur-mesure et soins premium.<br />
            Parce que vos mains méritent ce qu&apos;il y a de mieux.
          </p>

          {/* CTAs */}
          <div className="reveal cta-row d3" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#reservation" className="btn-gold">Réserver ma séance</a>
            <a href="#prestations" className="btn-outline">Découvrir les soins</a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-ind" style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #C9A96E, transparent)" }} />
          <span style={{ fontSize: "0.48rem", letterSpacing: "0.3em", color: "rgba(201,169,110,0.5)", textTransform: "uppercase" }}>Défiler</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════ */}
      <div ref={statsRef} style={{ background: "rgba(201,169,110,0.05)", borderTop: "1px solid rgba(201,169,110,0.12)", borderBottom: "1px solid rgba(201,169,110,0.12)" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: "900px", margin: "0 auto" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "28px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(201,169,110,0.08)" : "none" }}>
              <div className="snum font-disp" style={{ fontSize: "2rem", fontWeight: 400, color: "#C9A96E", lineHeight: 1, letterSpacing: "-0.02em" }}>0</div>
              <div style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "6px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          PRESTATIONS
      ═══════════════════════════════════════ */}
      <section id="prestations" className="section-pad" style={{ padding: "100px 40px", position: "relative" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div className="reveal" style={{ marginBottom: "72px" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.42em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "16px" }}>Ce que je fais pour vous</p>
            <h2 className="font-disp" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.01em", marginBottom: "0" }}>Des soins pensés<br />pour durer.</h2>
            <div className="gold-line" style={{ marginTop: "20px" }} />
          </div>

          <div className="presta-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
            {PRESTATIONS.map((p, i) => (
              <div key={p.id} className={`presta-card reveal d${i + 1}`}>
                {/* Visual */}
                <div style={{ height: "260px", background: p.gradient, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "16px", left: "16px", background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.35)", padding: "4px 12px", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A96E" }}>
                    {p.tag}
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                </div>
                {/* Content */}
                <div style={{ padding: "32px 28px 36px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderTop: "none" }}>
                  <h3 className="font-disp" style={{ fontSize: "1.5rem", fontWeight: 400, fontStyle: "italic", marginBottom: "14px", color: "#fff" }}>{p.nom}</h3>
                  <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: "24px", fontWeight: 300 }}>{p.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <span style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>⏱ {p.duree}</span>
                    <span style={{ fontSize: "1rem", fontWeight: 500, color: "#C9A96E", fontFamily: "'Cormorant Garamond', serif" }}>{p.prix}</span>
                  </div>
                  <a href="#reservation" className="btn-outline" style={{ display: "block", textAlign: "center", padding: "12px" }}>Réserver →</a>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="#reservation" style={{ fontSize: "0.68rem", color: "rgba(201,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid rgba(201,169,110,0.25)", paddingBottom: "2px" }}>
              Voir toutes les prestations →
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NOTRE ENGAGEMENT (fond ivoire)
      ═══════════════════════════════════════ */}
      <section style={{ background: "#F5F0EB", padding: "100px 40px" }} className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div className="diff-outer">

            {/* Left — intitulé + texte */}
            <div>
              <p className="reveal" style={{ fontSize: "0.58rem", letterSpacing: "0.42em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "16px" }}>Notre engagement</p>
              <h2 className="font-disp reveal d1" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300, fontStyle: "italic", color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: "20px" }}>
                Chaque ongle est<br />une signature.
              </h2>
              <div className="gold-line reveal d1" style={{ marginBottom: "28px" }} />
              <p className="reveal d2 diff-intro-text" style={{ fontSize: "0.85rem", color: "#6B6560", lineHeight: 1.85, fontWeight: 300 }}>
                Ici, rien n&apos;est standard. Chaque pose est pensée selon votre style, votre rythme de vie, votre silhouette de main. Nous travaillons avec les meilleures marques professionnelles. Nous prenons le temps. Toujours.
              </p>

              {/* ── Mobile : piliers en lignes ── */}
              <div className="diff-grid-mobile">
                {DIFFERENCIATIONS.map((d, i) => (
                  <div key={i} className={`diff-card-mobile reveal d${i + 1}`}>
                    <div className="diff-mob-icon">
                      <span style={{ fontSize: "0.7rem", color: "#C9A96E" }}>{d.icon}</span>
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1A1A1A", letterSpacing: "0.04em", marginBottom: "7px", lineHeight: 1.4 }}>{d.titre}</h4>
                      <p style={{ fontSize: "0.72rem", color: "#6B6560", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{d.texte}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — piliers 2×2 (desktop) */}
            <div className="diff-grid-desktop">
              {DIFFERENCIATIONS.map((d, i) => (
                <div key={i} className={`diff-card-desk reveal-scale d${i + 1}`} style={{ padding: "28px 22px", background: "#fff", borderBottom: "2px solid rgba(201,169,110,0.3)" }}>
                  <div style={{ fontSize: "0.75rem", color: "#C9A96E", marginBottom: "12px" }}>{d.icon}</div>
                  <h4 style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1A1A1A", letterSpacing: "0.04em", marginBottom: "10px", lineHeight: 1.4 }}>{d.titre}</h4>
                  <p style={{ fontSize: "0.72rem", color: "#6B6560", lineHeight: 1.7, fontWeight: 300 }}>{d.texte}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GALERIE
      ═══════════════════════════════════════ */}
      <section id="galerie" className="section-pad" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.42em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "16px" }}>Portfolio</p>
            <h2 className="font-disp" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.01em" }}>
              Ce que mes mains créent<br />pour les vôtres.
            </h2>
            <div className="gold-line-c" style={{ marginTop: "20px" }} />
          </div>

          <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
            {GALERIE.map((g, i) => (
              <div key={i} className={`gallery-item reveal-scale d${(i % 3) + 1}${g.tall ? " gallery-tall" : ""}`}
                style={{ background: g.gradient, aspectRatio: "1/1", position: "relative", overflow: "hidden", cursor: "pointer", ...(g.tall ? { gridRow: "span 2", aspectRatio: "unset" } : {}) }}>
                <div className="gallery-overlay">
                  <span className="gallery-overlay-text">✦ Voir</span>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ textAlign: "center", marginTop: "40px" }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "0.62rem", color: "rgba(201,169,110,0.6)", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ width: "28px", height: "1px", background: "#C9A96E", display: "inline-block" }} />
              Suivre @venerastudio
              <span style={{ width: "28px", height: "1px", background: "#C9A96E", display: "inline-block" }} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          AVIS (fond ivoire)
      ═══════════════════════════════════════ */}
      <section id="avis" style={{ background: "#F5F0EB", padding: "100px 40px" }} className="section-pad">
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.42em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "16px" }}>Témoignages</p>
            <h2 className="font-disp" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, fontStyle: "italic", color: "#1A1A1A", letterSpacing: "-0.01em" }}>
              Elles en parlent<br />mieux que moi.
            </h2>
            <div className="gold-line-c" style={{ marginTop: "20px" }} />
          </div>

          <div className="avis-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {AVIS.map((a, i) => (
              <div key={a.id} className={`avis-card reveal-scale d${i + 1}`} style={{
                background: "#fff", padding: "40px 32px",
                borderBottom: "2px solid rgba(201,169,110,0.25)",
              }}>
                {/* Stars */}
                <div style={{ display: "flex", gap: "3px", marginBottom: "20px" }}>
                  {Array.from({ length: a.note }).map((_, j) => (
                    <span key={j} style={{ color: "#C9A96E", fontSize: "0.7rem" }}>★</span>
                  ))}
                </div>
                {/* Quote */}
                <p style={{ fontSize: "0.85rem", color: "#3D3D3D", lineHeight: 1.85, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", marginBottom: "28px", fontWeight: 300 }}>
                  &ldquo;{a.texte}&rdquo;
                </p>
                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #e8d5c4, #c9a96e)", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#1A1A1A" }}>{a.nom}</div>
                    <div style={{ fontSize: "0.62rem", color: "#9B9693" }}>{a.depuis}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Google proof */}
          <div className="reveal" style={{ textAlign: "center", marginTop: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "12px 24px", border: "1px solid rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.04)" }}>
              <span style={{ color: "#C9A96E", fontSize: "0.75rem" }}>★★★★★</span>
              <span style={{ fontSize: "0.65rem", color: "#6B6560", letterSpacing: "0.08em" }}>127 avis 5 étoiles sur Google</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RÉSERVATION — CALENDRIER
      ═══════════════════════════════════════ */}
      <section id="reservation" style={{ padding: "120px 40px", position: "relative", overflow: "hidden" }} className="section-pad">

        {/* Radial ambiance */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>

          {/* Header */}
          <div className="reveal" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontSize: "0.58rem", letterSpacing: "0.42em", color: "#C9A96E", textTransform: "uppercase", marginBottom: "20px" }}>Réservation en ligne</p>
            <h2 className="font-disp" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, fontStyle: "italic", letterSpacing: "-0.01em", marginBottom: "18px" }}>
              Choisissez votre<br />créneau idéal.
            </h2>
            <div className="gold-line-c" style={{ marginBottom: "20px" }} />
            <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em", lineHeight: 1.8, fontWeight: 300 }}>
              Sélectionnez une date puis un horaire disponible.<br />
              La confirmation se fait par WhatsApp sous 2h.
            </p>
          </div>

          {/* ── CALENDAR WIDGET ── */}
          <div className="cal-wrap reveal d1">

            {/* Month navigation */}
            <div className="cal-header">
              <button className="cal-arrow" onClick={prevMonth}>‹</button>
              <div style={{ textAlign: "center" }}>
                <div className="font-disp" style={{ fontSize: "1.5rem", fontWeight: 300, fontStyle: "italic", color: "#fff", letterSpacing: "0.02em" }}>
                  {MONTH_FR[calMonth]}
                </div>
                <div style={{ fontSize: "0.5rem", color: "rgba(201,169,110,0.45)", letterSpacing: "0.3em", marginTop: "2px" }}>
                  {calYear}
                </div>
              </div>
              <button className="cal-arrow" onClick={nextMonth}>›</button>
            </div>

            {/* Top separator */}
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)", marginBottom: "16px" }} />

            {/* Day headers */}
            <div className="cal-grid" style={{ marginBottom: "4px" }}>
              {DAY_FR.map((d, i) => (
                <div key={i} className="cal-day-head">{d}</div>
              ))}
            </div>

            {/* Day cells */}
            <div className="cal-grid">
              {/* Empty cells before first day */}
              {Array.from({ length: calOffset }).map((_, i) => (
                <div key={`e-${i}`} className="cal-cell" />
              ))}
              {/* Day cells */}
              {Array.from({ length: daysInCal }).map((_, i) => {
                const day = i + 1;
                const dateStr = fmtDate(calYear, calMonth, day);
                const avail = isDateAvail(calYear, calMonth, day);
                const sel = selectedDate === dateStr;
                const today = isToday(calYear, calMonth, day);
                return (
                  <div
                    key={day}
                    className={`cal-cell${avail ? " avail" : " past"}${sel ? " sel" : ""}${today ? " today-mark" : ""}`}
                    onClick={() => {
                      if (!avail) return;
                      setSelectedDate(sel ? null : dateStr);
                      setSelectedSlot(null);
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Bottom separator */}
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.2), transparent)", marginTop: "16px" }} />

            {/* Légende */}
            <div style={{ display: "flex", gap: "24px", marginTop: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { color: "rgba(255,255,255,0.8)", label: "Disponible" },
                { color: "#C9A96E", label: "Sélectionné" },
                { color: "rgba(255,255,255,0.14)", label: "Indisponible" },
              ].map(l => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                  <div style={{ width: "8px", height: "8px", background: l.color, borderRadius: "1px" }} />
                  <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em" }}>{l.label}</span>
                </div>
              ))}
            </div>

            {/* ── TIME SLOTS ── */}
            {selectedDate && slots.length > 0 && (
              <div className="slots-wrap">
                <div className="slots-label">Créneaux disponibles · {fmtDateFR(selectedDate)}</div>
                <div className="slots-grid">
                  {slots.map(slot => {
                    const avail = slotAvail(selectedDate, slot);
                    const sel   = selectedSlot === slot;
                    return (
                      <div
                        key={slot}
                        className={`slot-pill${sel ? " sel" : avail ? " avail" : " taken"}`}
                        onClick={() => { if (avail) setSelectedSlot(sel ? null : slot); }}
                      >
                        {avail ? slot : `${slot} · complet`}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── CONFIRMATION ── */}
            {selectedDate && selectedSlot && (
              <div className="cal-confirm">
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
                  {/* Recap */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.5rem", letterSpacing: "0.28em", color: "rgba(201,169,110,0.5)", textTransform: "uppercase", marginBottom: "10px" }}>
                      Votre sélection
                    </div>
                    <div className="cal-summary-date font-disp">
                      {fmtDateFR(selectedDate)}
                    </div>
                    <div className="cal-summary-slot">à {selectedSlot}</div>
                    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                      {["✦ Confirmation sous 2h", "✦ Paiement sur place", "✦ Annulation libre"].map(r => (
                        <span key={r} style={{ fontSize: "0.55rem", color: "rgba(201,169,110,0.45)", letterSpacing: "0.1em" }}>{r}</span>
                      ))}
                    </div>
                  </div>
                  {/* CTA */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", minWidth: "180px" }}>
                    <a
                      href={`https://wa.me/33600000000?text=${waMessage}`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn-gold"
                      style={{ textAlign: "center", padding: "14px 24px", fontSize: "0.65rem", whiteSpace: "nowrap" }}
                    >
                      Confirmer sur WhatsApp
                    </a>
                    <button
                      onClick={() => { setSelectedDate(null); setSelectedSlot(null); }}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.55rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", padding: "6px 0" }}
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Autre moyen de contact */}
          <div className="reveal d3" style={{ textAlign: "center", marginTop: "56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", justifyContent: "center", marginBottom: "16px" }}>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(201,169,110,0.15))" }} />
              <span style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.22em" }}>OU</span>
              <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(201,169,110,0.15))" }} />
            </div>
            <a href="mailto:contact@venera-studio.fr"
              style={{ fontSize: "0.62rem", color: "rgba(201,169,110,0.45)", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid rgba(201,169,110,0.2)", paddingBottom: "2px" }}>
              Écrire par e-mail →
            </a>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          INFOS PRATIQUES
      ═══════════════════════════════════════ */}
      <section style={{ padding: "72px 40px", background: "rgba(201,169,110,0.04)", borderTop: "1px solid rgba(201,169,110,0.1)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="infos-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "48px", textAlign: "center" }}>
            {[
              { icon: "📍", label: "Adresse", val: "Melun, Seine-et-Marne · 77" },
              { icon: "🕐", label: "Horaires", val: "Mar–Sam · 9h00–19h00" },
              { icon: "📞", label: "Réservation", val: "Sur RDV uniquement" },
            ].map((info, i) => (
              <div key={i} className={`reveal-scale d${i + 1}`} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{info.icon}</div>
                <div style={{ fontSize: "0.52rem", color: "#C9A96E", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "7px" }}>{info.label}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>{info.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer style={{ padding: "36px 40px", background: "#080605", borderTop: "1px solid rgba(201,169,110,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "24px", border: "1px solid rgba(201,169,110,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: "#C9A96E", fontStyle: "italic" }}>V</span>
          </div>
          <span style={{ fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}>VÉNERA STUDIO</span>
        </div>
        <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
          © 2025 Vénera Studio · Melun, 77
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.2)" }}>Site créé par</span>
          <Link href="/" style={{ fontSize: "0.62rem", color: "#C9A96E", textDecoration: "none", letterSpacing: "0.1em" }}>CC Création</Link>
        </div>
      </footer>

      {/* ── MOBILE STICKY CTA ── */}
      <div className="sticky-mobile">
        <a href="#reservation" className="btn-gold" style={{ fontSize: "0.68rem", padding: "14px" }}>
          Réserver ma séance
        </a>
      </div>

    </div>
  );
}
