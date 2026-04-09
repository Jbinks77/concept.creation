"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ─── PALETTE ─────────────────────────────────── */
const C = {
  bg:      "#080808",
  s1:      "#111111",
  s2:      "#181818",
  red:     "#E8350A",
  amber:   "#FF7A30",
  gold:    "#FFD166",
  cream:   "#F5EFE0",
  muted:   "rgba(245,239,224,0.38)",
};

/* ─── IMAGES (Unsplash, hotlinkable) ───────────── */
const IMG = {
  smash:    "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
  bacon:    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  spicy:    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
  chicken:  "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
  wings:    "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
  tenders:  "https://images.unsplash.com/photo-1562802378-063ec186a863?auto=format&fit=crop&w=800&q=80",
  fries:    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  shake:    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
};

/* ─── DATA ─────────────────────────────────────── */
const FEATURED = {
  nom: "THE OG SMASH",
  tag: "Notre signature",
  prix: "7,90 €",
  img: IMG.smash,
  desc: "Le burger qui a tout lancé. Double patty bœuf Angus smashé à la commande, cheddar américain fondu, sauce secrète maison, pickles croquants, oignons confits.",
  ingredients: ["Double bœuf Angus","Cheddar américain","Sauce secrète 77","Pickles bread & butter","Oignons confits","Brioche grillée"],
};

const MENU: Record<string, { nom:string; desc:string; prix:string; spicy?:boolean; nouveau?:boolean; img?:string }[]> = {
  "🍔 Burgers": [
    { nom:"The OG Smash",       desc:"Double bœuf Angus, cheddar, sauce secrète, pickles",    prix:"7,90€", nouveau:true, img:IMG.smash  },
    { nom:"Bacon Cheese Stack", desc:"Bacon croustillant, double cheddar, oignons confits",   prix:"8,50€",              img:IMG.bacon  },
    { nom:"BBQ Smoke",          desc:"Sauce BBQ fumée, emmental, salade, tomate fraîche",     prix:"7,50€",              img:IMG.bacon  },
    { nom:"Spicy Meltdown",     desc:"Nashville sauce, jalapeños, cheddar fondu",             prix:"8,90€", spicy:true,  img:IMG.spicy  },
    { nom:"Tower Crunch",       desc:"Hash brown, poulet croustillant, cheddar",              prix:"8,80€",              img:IMG.chicken},
    { nom:"Mushroom Swiss",     desc:"Champignons sautés, Swiss cheese, mayo truffe",         prix:"9,20€", nouveau:true, img:IMG.smash  },
  ],
  "🍗 Poulet": [
    { nom:"Nashville Sandwich", desc:"Poulet épicé Nashville, coleslaw maison, pickles",      prix:"8,50€", spicy:true, nouveau:true, img:IMG.chicken },
    { nom:"5 Tenders Crunch",   desc:"Blanc de poulet pané maison, sauce au choix",          prix:"6,10€",                           img:IMG.tenders },
    { nom:"8 Hot Wings",        desc:"Ailes marinées 12h, sauce buffalo ou BBQ",             prix:"6,95€", spicy:true,               img:IMG.wings   },
    { nom:"Crispy Strips x3",   desc:"Panure extra-croustillante, sauce colonel",            prix:"5,50€",                           img:IMG.tenders },
    { nom:"Poulet Brûlé",       desc:"Flambé cayenne, sauce yaourt citron",                  prix:"9,50€", spicy:true, nouveau:true, img:IMG.spicy   },
    { nom:"Bucket 16 Wings",    desc:"Le seau familial — 16 ailes + 2 sauces",              prix:"17,90€",                          img:IMG.wings   },
  ],
  "🍟 Sides": [
    { nom:"Frites Maison",      desc:"Frites coupées sur place, dorées au saindoux",         prix:"2,30€",              img:IMG.fries  },
    { nom:"Loaded Fries",       desc:"Cheddar fondu, bacon, sauce ranch",                    prix:"4,90€", nouveau:true, img:IMG.fries  },
    { nom:"Onion Rings x8",     desc:"Rondelles panées, sauce honey mustard",               prix:"3,50€",              img:IMG.fries  },
    { nom:"Coleslaw Maison",    desc:"Chou croquant, mayo légère, carottes",                prix:"2,00€"               },
  ],
  "🥤 Boissons": [
    { nom:"Milkshake Maison",   desc:"Vanille · Fraise · Oreo · Caramel salé",              prix:"4,50€", nouveau:true, img:IMG.shake  },
    { nom:"Pepsi 50cl",         desc:"Bien froide, comme il se doit",                       prix:"2,49€"               },
    { nom:"Lipton Ice Tea",     desc:"Pêche ou citron, 30cl",                               prix:"1,99€"               },
    { nom:"Eau Evian 50cl",     desc:"",                                                    prix:"1,50€"               },
  ],
  "🎁 Menus": [
    { nom:"Menu Smash",         desc:"Burger au choix + Frites + Boisson",                  prix:"10,90€", img:IMG.smash   },
    { nom:"Menu Chicken",       desc:"5 Tenders ou 8 Wings + Frites + Boisson",             prix:"11,45€", img:IMG.chicken },
    { nom:"Bucket Famille",     desc:"16 Wings + 4 Frites + 4 Boissons",                   prix:"39,90€", img:IMG.wings   },
  ],
};

const TABS = Object.keys(MENU);

const REVIEWS = [
  { name:"Ilyes B.", note:5, text:"Le OG Smash c'est une tuerie, meilleur burger de Melun sans hésiter 🔥", date:"il y a 2 jours" },
  { name:"Sarah M.", note:5, text:"La sauce secrète... je veux la recette 😭 Livraison ultra rapide aussi", date:"il y a 5 jours" },
  { name:"Kevin T.", note:5, text:"Les tenders sont incroyables, poulet vraiment croustillant comme à Nashville", date:"il y a 1 semaine" },
  { name:"Manon D.", note:5, text:"Y'a pas mieux en Seine-et-Marne, on revient chaque semaine 🙌", date:"il y a 2 semaines" },
  { name:"Théo L.", note:5, text:"Commande tous les jeudis soir, jamais déçu. Les loaded fries sont 🤌", date:"il y a 3 semaines" },
];

/* ─── COMPONENT ────────────────────────────────── */
export default function DemoFastFood() {
  const [tab, setTab]             = useState(TABS[0]);
  const [mobNav, setMobNav] = useState(false);
  const [loaded, setLoaded]       = useState(false);
  const [statsVisible, setStats]  = useState(false);
  const [countVal, setCount]      = useState(0);
  const [stickyBtn, setStickyBtn] = useState(false);
  const menuRef    = useRef<HTMLElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const heroSentinel = useRef<HTMLDivElement>(null);

  /* Mount + iOS video autoplay */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
    return () => clearTimeout(t);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("in"); }),
      { threshold: 0.07 }
    );
    document.querySelectorAll(".sr").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [tab]);

  /* Compteur */
  useEffect(() => {
    const el = document.getElementById("ctr");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect(); setStats(true);
      const t0 = Date.now(), dur = 2200, target = 48327;
      const step = () => {
        const p = Math.min((Date.now()-t0)/dur,1);
        setCount(Math.round((1-Math.pow(1-p,4))*target));
        if (p < 1) requestAnimationFrame(step);
      };
      step();
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Sticky CTA sentinel */
  useEffect(() => {
    const el = heroSentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStickyBtn(!e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const goMenu = useCallback(() => menuRef.current?.scrollIntoView({ behavior:"smooth" }), []);

  return (
    <div style={{ background:C.bg, color:C.cream, fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif", overflowX:"hidden" }}>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

      *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
      ::-webkit-scrollbar { width:2px; }
      ::-webkit-scrollbar-thumb { background:${C.red}; }

      /* ─ FONTS ─ */
      .bebas { font-family:'Bebas Neue',Impact,sans-serif; letter-spacing:.03em; }

      /* ─ GRAIN ─ */
      @keyframes g { 0%,100%{transform:translate(0,0)} 25%{transform:translate(-2%,2%)} 75%{transform:translate(2%,-2%)} }
      .grain {
        position:fixed; inset:-40%; width:180%; height:180%;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E");
        opacity:.032; pointer-events:none; z-index:9999; animation:g .6s steps(1) infinite;
      }

      /* ─ VIDEO KEN BURNS ─ */
      @keyframes kb { from{transform:scale(1.06)} to{transform:scale(1)} }
      .hero-vid { animation:kb 9s ease-out forwards; will-change:transform; }

      /* ─ TICKER ─ */
      @keyframes tk { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      .ticker { animation:tk 22s linear infinite; display:flex; width:max-content; }
      .ticker:hover { animation-play-state:paused; }

      /* ─ REVEAL ─ */
      .sr {
        opacity:0; transform:translateY(35px);
        transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .85s cubic-bezier(.16,1,.3,1);
      }
      .sr.in { opacity:1; transform:translateY(0); }
      .sr.from-left  { transform:translateX(-40px); }
      .sr.from-left.in  { transform:translateX(0); }
      .sr.from-right { transform:translateX(40px); }
      .sr.from-right.in { transform:translateX(0); }
      .d1{transition-delay:.1s!important}.d2{transition-delay:.2s!important}
      .d3{transition-delay:.3s!important}.d4{transition-delay:.4s!important}
      .d5{transition-delay:.5s!important}.d6{transition-delay:.6s!important}

      /* ─ HERO TEXT ENTRY ─ */
      .hl {
        opacity:0; transform:translateY(50px);
        transition:opacity .55s ease, transform .75s cubic-bezier(.16,1,.3,1);
      }
      .loaded .hl { opacity:1; transform:translateY(0); }

      /* ─ PULSE ─ */
      @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(232,53,10,.5)} 70%{box-shadow:0 0 0 12px rgba(232,53,10,0)} }
      .pulse { animation:pulse 2.2s ease-out infinite; }
      @keyframes blink { 50%{opacity:.25} }
      .blink { animation:blink 1.4s ease-in-out infinite; }

      /* ─ HOVER CARDS ─ */
      .mcard { transition:transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s ease; cursor:pointer; }
      .mcard:hover { transform:translateY(-5px) scale(1.015); box-shadow:0 24px 60px rgba(0,0,0,.5); }
      .feat-card { transition:transform .3s cubic-bezier(.16,1,.3,1); }
      .feat-card:hover { transform:scale(1.015); }

      /* ─ TABS ─ */
      .tab {
        padding:9px 18px; border:1px solid rgba(245,239,224,.12);
        background:transparent; color:${C.muted};
        font-size:.72rem; font-weight:600; letter-spacing:.08em;
        text-transform:uppercase; cursor:pointer; white-space:nowrap;
        transition:all .2s ease; font-family:inherit;
      }
      .tab:hover { border-color:rgba(245,239,224,.3); color:${C.cream}; }
      .tab.on { background:${C.red}; border-color:${C.red}; color:#fff; }

      /* ─ BTNS ─ */
      .btn-red {
        display:inline-flex; align-items:center; gap:8px;
        padding:15px 36px; background:${C.red}; color:#fff;
        font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:.1em;
        border:none; cursor:pointer; text-decoration:none;
        transition:background .2s, transform .2s, box-shadow .2s;
      }
      .btn-red:hover { background:#ff4d27; transform:scale(1.03); box-shadow:0 0 35px rgba(232,53,10,.45); }
      .btn-ghost {
        display:inline-flex; align-items:center; gap:8px;
        padding:14px 36px; border:1px solid rgba(245,239,224,.25); color:${C.cream};
        font-family:'Bebas Neue',sans-serif; font-size:1.1rem; letter-spacing:.1em;
        background:transparent; cursor:pointer; text-decoration:none;
        transition:border-color .2s, color .2s, transform .2s;
      }
      .btn-ghost:hover { border-color:${C.gold}; color:${C.gold}; transform:scale(1.03); }

      /* ─ DIAGONAL CUTS ─ */
      .diag-after {
        position:relative;
      }
      .diag-after::after {
        content:''; position:absolute; bottom:-28px; left:0; right:0; height:30px;
        background:inherit; clip-path:polygon(0 0, 100% 0, 100% 0, 0 100%);
        z-index:4; pointer-events:none;
      }
      .diag-before {
        position:relative;
      }
      .diag-before::before {
        content:''; position:absolute; top:-38px; left:0; right:0; height:40px;
        background:inherit; clip-path:polygon(0 100%, 100% 0, 100% 100%);
        z-index:4; pointer-events:none;
      }

      /* ─ STICKY CTA ─ */
      @keyframes slideUp { from{transform:translateY(80px) translateX(-50%); opacity:0} to{transform:translateY(0) translateX(-50%); opacity:1} }
      .sticky-cta {
        display:none;
        position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
        background:${C.red}; color:#fff;
        font-family:'Bebas Neue',sans-serif; font-size:1rem; letter-spacing:.14em;
        padding:14px 36px; border-radius:100px; border:none; cursor:pointer;
        box-shadow:0 8px 40px rgba(232,53,10,.55);
        z-index:500; white-space:nowrap;
        animation:slideUp .4s cubic-bezier(.16,1,.3,1) forwards;
        transition:transform .2s, box-shadow .2s;
      }
      .sticky-cta:hover { transform:translateX(-50%) scale(1.04); box-shadow:0 12px 50px rgba(232,53,10,.7); }

      /* ─ MOB NAV ─ */
      .mob-nav-overlay {
        position:fixed; inset:0; background:rgba(8,8,8,.96); z-index:300;
        display:flex; flex-direction:column; justify-content:center; align-items:center; gap:0;
        transform:translateX(100%); transition:transform .35s cubic-bezier(.16,1,.3,1);
      }
      .mob-nav-overlay.open { transform:translateX(0); }
      .mob-nav-link {
        font-family:'Bebas Neue',sans-serif; font-size:3rem; letter-spacing:.08em;
        color:rgba(245,239,224,.5); text-decoration:none; padding:12px 0;
        transition:color .2s, transform .2s;
      }
      .mob-nav-link:hover { color:#F5EFE0; transform:translateX(8px); }
      /* ─ OFFER BANNER ─ */
      @keyframes offerPulse { 0%,100%{opacity:1} 50%{opacity:.75} }
      .offer-pill { animation:offerPulse 2.5s ease-in-out infinite; }
      /* ─ REVIEWS ─ */
      .review-card { transition:transform .25s ease, box-shadow .25s ease; }
      .review-card:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,.15); }
      /* ─ STAR ─ */
      .star { color:#FFD166; font-size:.85rem; }

      /* ─ RESPONSIVE ─ */
      @media(max-width:768px) {
        .hide-mob  { display:none!important; }
        .mob-col   { flex-direction:column!important; }
        .mob-full  { width:100%!important; }
        .tabs-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:4px; }
        .menu-grid { grid-template-columns:1fr 1fr!important; gap:2px!important; }
        .feat-grid { grid-template-columns:1fr!important; }
        .info-grid { grid-template-columns:1fr!important; }
        .stats-grid{ grid-template-columns:1fr 1fr!important; }
        .sticky-cta { display:block; }

        /* Hero mobile */
        .hero-section { height:75vh!important; min-height:560px!important; }
        .hero-vid { object-position:50% 50%!important; transform:scale(0.82)!important; transform-origin:center center!important; }
        .hero-title { font-size:clamp(3.2rem,16vw,5.5rem)!important; }
        .hero-sub   { font-size:.76rem!important; }
        .hero-btns  { flex-direction:column!important; gap:8px!important; }
        .hero-btns a, .hero-btns button { width:100%!important; justify-content:center!important; box-sizing:border-box!important; }
        .hero-content { padding:0 5vw 60px!important; }

        /* Featured section */
        .feat-detail { padding:32px 24px!important; }

        /* Delivery cards */
        .delivery-card { padding:24px 20px!important; min-width:unset!important; width:100%!important; }

        /* Info cards */
        .info-card { padding:28px 24px!important; }

        /* Footer */
        .footer-inner { flex-direction:column!important; text-align:center!important; justifyContent:center!important; align-items:center!important; }

        /* Menu card image height on mobile */
        .mcard-img { height:130px!important; }
        .mob-ham { display:flex!important; }
        .hide-mob-nav { display:none!important; }
      }
    `}</style>

    {/* GRAIN */}
    <div className="grain" aria-hidden />

    {/* ══ NAV ══════════════════════════════════════ */}
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      height:"62px", padding:"0 5vw",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background:"rgba(8,8,8,0.92)", backdropFilter:"blur(16px) saturate(1.4)",
      borderBottom:`1px solid rgba(245,239,224,.06)`,
    }}>
      <div style={{ display:"flex", alignItems:"center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/smash77-logo.png" alt="77 SMASH" style={{ height:"42px", width:"auto", objectFit:"contain" }} />
      </div>

      <div className="hide-mob" style={{ display:"flex", gap:"32px" }}>
        {[["Menu","#menu"],["Signature","#featured"],["Infos","#infos"]].map(([l,h]) => (
          <a key={l} href={h} style={{ color:C.muted, textDecoration:"none", fontSize:".68rem", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", transition:"color .2s" }}
            onMouseEnter={e=>e.currentTarget.style.color=C.cream}
            onMouseLeave={e=>e.currentTarget.style.color=C.muted}
          >{l}</a>
        ))}
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="btn-red hide-mob" style={{ padding:"9px 22px", fontSize:".75rem" }}>
          Commander →
        </a>
        {/* Hamburger mobile */}
        <button className="mob-ham" onClick={() => setMobNav(true)} style={{
          display:"none", background:"none", border:"none", cursor:"pointer",
          padding:"6px", flexDirection:"column", gap:"5px",
        }}>
          <span style={{ display:"block", width:"22px", height:"2px", background:C.cream }} />
          <span style={{ display:"block", width:"22px", height:"2px", background:C.cream }} />
          <span style={{ display:"block", width:"14px", height:"2px", background:C.red }} />
        </button>
      </div>
    </nav>

    {/* Mobile nav overlay */}
    <div className={`mob-nav-overlay${mobNav ? " open" : ""}`}>
      <button onClick={() => setMobNav(false)} style={{
        position:"absolute", top:"20px", right:"5vw",
        background:"none", border:"none", cursor:"pointer",
        color:C.cream, fontSize:"1.8rem", lineHeight:1,
      }}>✕</button>
      {[["Menu","#menu"],["Signature","#featured"],["Avis","#reviews"],["Infos","#infos"]].map(([l,h]) => (
        <a key={l} href={h} className="mob-nav-link" onClick={() => setMobNav(false)}>{l}</a>
      ))}
      <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer"
        className="btn-red" style={{ marginTop:"32px", padding:"16px 48px", fontSize:"1.1rem" }}
        onClick={() => setMobNav(false)}
      >🍔 COMMANDER →</a>
    </div>

    {/* ══ HERO ═════════════════════════════════════ */}
    <section className="hero-section diag-after" style={{ position:"relative", height:"100dvh", overflow:"hidden", paddingTop:"62px", background:C.bg }}>

      {/* Vidéo full bleed */}
      <video ref={videoRef} className="hero-vid" autoPlay muted loop playsInline preload="auto"
        poster={IMG.smash}
        style={{
          position:"absolute", inset:0, width:"100%", height:"100%",
          objectFit:"cover", objectPosition:"center",
          filter:"saturate(1.35) contrast(1.1) brightness(.72)",
          zIndex:0,
        }}
      >
        <source src="/burger.mp4" type="video/mp4" />
      </video>

      {/* Overlays — warm fire atmosphere */}
      {/* Bottom: deep red/amber heat */}
      <div style={{ position:"absolute",inset:0,zIndex:1,
        background:"linear-gradient(to top, rgba(160,20,0,.92) 0%, rgba(220,80,10,.45) 28%, rgba(232,100,10,.1) 50%, transparent 70%)" }} />
      {/* Top: dark vignette */}
      <div style={{ position:"absolute",inset:0,zIndex:1,
        background:"linear-gradient(to bottom, rgba(8,8,8,.75) 0%, transparent 35%)" }} />
      {/* Left: depth */}
      <div style={{ position:"absolute",inset:0,zIndex:1,
        background:"linear-gradient(to right, rgba(8,8,8,.6) 0%, transparent 55%)" }} />

      {/* Giant "77" watermark */}
      <div aria-hidden style={{
        position:"absolute", bottom:"-2vw", left:"50%", transform:"translateX(-50%)",
        fontFamily:"'Bebas Neue',Impact,sans-serif",
        fontSize:"clamp(18rem,60vw,72rem)", lineHeight:1,
        color:"rgba(245,239,224,.045)",
        userSelect:"none", pointerEvents:"none",
        zIndex:1, letterSpacing:"-.04em", whiteSpace:"nowrap",
      }}>77</div>

      {/* Contenu */}
      <div className={`hero-content${loaded ? " loaded" : ""}`} style={{ position:"relative", zIndex:2, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 6vw 80px" }}>

        {/* Eyebrow */}
        <div className="hl" style={{ transitionDelay:".1s", display:"flex", alignItems:"center", gap:"12px", marginBottom:"20px" }}>
          <div className="blink" style={{ width:"7px", height:"7px", background:"#22c55e", borderRadius:"50%" }} />
          <span style={{ fontSize:".6rem", fontWeight:600, letterSpacing:".22em", textTransform:"uppercase", color:"rgba(245,239,224,.55)" }}>
            Ouvert maintenant &nbsp;·&nbsp; 11h – 23h
          </span>
        </div>

        {/* Titre */}
        <div className="hl" style={{ transitionDelay:".22s" }}>
          <h1 className="bebas hero-title" style={{ fontSize:"clamp(4.5rem,11vw,11rem)", lineHeight:.88, color:C.cream, marginBottom:"4px" }}>
            BURGERS
          </h1>
        </div>
        <div className="hl" style={{ transitionDelay:".34s" }}>
          <h1 className="bebas hero-title" style={{
            fontSize:"clamp(4.5rem,11vw,11rem)", lineHeight:.88, marginBottom:"4px",
            color:"transparent", WebkitTextStroke:`2px ${C.red}`,
          }}>
            &amp; POULET
          </h1>
        </div>
        <div className="hl" style={{ transitionDelay:".46s", marginBottom:"24px" }}>
          <h1 className="bebas hero-title" style={{ fontSize:"clamp(4.5rem,11vw,11rem)", lineHeight:.88, color:C.gold }}>
            À MELUN.
          </h1>
        </div>

        {/* Sous-titre */}
        <div className="hl" style={{ transitionDelay:".54s", marginBottom:"32px" }}>
          <p className="hero-sub" style={{ fontSize:".85rem", color:"rgba(245,239,224,.75)", fontWeight:400, lineHeight:1.7, maxWidth:"420px", letterSpacing:".04em" }}>
            Fait à la commande · Viande fraîche · Livraison 30 min
          </p>
        </div>

        {/* CTA unique */}
        <div className="hl hero-btns" style={{ transitionDelay:".62s", display:"flex", flexDirection:"column", gap:"14px", alignItems:"flex-start" }}>
          <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer"
            className="btn-red pulse"
            style={{ fontSize:"1.15rem", padding:"18px 48px", letterSpacing:".14em", boxShadow:"0 8px 40px rgba(232,53,10,.45)" }}
          >
            🍔 COMMANDER →
          </a>
          <button onClick={goMenu} style={{
            background:"none", border:"none", cursor:"pointer",
            color:"rgba(245,239,224,.6)", fontFamily:"'Plus Jakarta Sans',sans-serif",
            fontSize:".72rem", fontWeight:600, letterSpacing:".16em", textTransform:"uppercase",
            display:"flex", alignItems:"center", gap:"6px",
            transition:"color .2s",
            padding:0,
          }}
            onMouseEnter={e=>(e.currentTarget.style.color=C.cream)}
            onMouseLeave={e=>(e.currentTarget.style.color="rgba(245,239,224,.6)")}
          >
            Voir le menu ↓
          </button>
        </div>

        {/* Sentinel pour sticky CTA */}
        <div ref={heroSentinel} style={{ position:"absolute", bottom:0, height:"1px", width:"1px", opacity:0, pointerEvents:"none" }} />
      </div>

      {/* Badge prix — coin supérieur droit (desktop only) */}
      <div className={`hide-mob${loaded ? " loaded" : ""}`} style={{ position:"absolute", top:"90px", right:"6vw", zIndex:3, textAlign:"center" }}>
        <div className="hl" style={{ transitionDelay:".8s",
          background:C.gold, color:C.bg,
          padding:"20px 24px",
          transform:"rotate(5deg)",
          boxShadow:"0 8px 40px rgba(255,209,102,.25)",
        }}>
          <div style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".2em", textTransform:"uppercase", marginBottom:"4px", opacity:.7 }}>À partir de</div>
          <div className="bebas" style={{ fontSize:"3rem", lineHeight:1 }}>7,90€</div>
          <div style={{ fontSize:".55rem", fontWeight:600, letterSpacing:".15em", marginTop:"4px", opacity:.7 }}>LE BURGER</div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:"42px",
        background:C.red, overflow:"hidden", display:"flex", alignItems:"center", zIndex:3,
      }}>
        <div className="ticker">
          {[...Array(2)].map((_,k) => (
            <div key={k} style={{ display:"flex", alignItems:"center" }}>
              {["FAIT FRAIS CHAQUE JOUR","✦","BURGERS SMASHÉS","✦","POULET CROUSTILLANT","✦","LIVRAISON 30 MIN","✦","MELUN · SEINE-ET-MARNE","✦","SAUCE MAISON","✦","OUVERT 7J/7","✦"].map((t,i) => (
                <span key={i} className="bebas" style={{
                  fontSize:".9rem", letterSpacing:".18em", padding:"0 22px", whiteSpace:"nowrap",
                  color: t==="✦" ? "rgba(255,255,255,.35)" : "#fff",
                }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ OFFRE DU MOMENT ══════════════════════════ */}
    <div style={{ background:`linear-gradient(135deg, #1a0a00, #2a0f00)`, borderTop:`1px solid rgba(232,53,10,.3)`, borderBottom:`1px solid rgba(232,53,10,.2)`, padding:"18px 6vw", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
        <div className="offer-pill" style={{ background:C.red, padding:"4px 12px", borderRadius:"100px" }}>
          <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:".72rem", letterSpacing:".15em", color:"#fff" }}>⚡ OFFRE DU JEUDI</span>
        </div>
        <span className="bebas" style={{ fontSize:"1.1rem", color:C.cream, letterSpacing:".06em" }}>
          Menu Smash + Loaded Fries + Boisson
        </span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <span style={{ textDecoration:"line-through", color:"rgba(245,239,224,.3)", fontFamily:"'Bebas Neue',sans-serif", fontSize:".95rem" }}>13,90€</span>
        <span className="bebas" style={{ fontSize:"1.6rem", color:C.gold, letterSpacing:".04em" }}>9,90€</span>
        <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" style={{ background:C.gold, color:C.bg, padding:"8px 18px", fontFamily:"'Bebas Neue',sans-serif", fontSize:".8rem", letterSpacing:".12em", textDecoration:"none", whiteSpace:"nowrap" }}>
          J&apos;en profite →
        </a>
      </div>
    </div>

    {/* ══ STATS ════════════════════════════════════ */}
    <div id="ctr" className="diag-after" style={{ background:C.s1, borderTop:`2px solid ${C.red}`, borderBottom:`1px solid rgba(245,239,224,.06)` }}>
      <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", maxWidth:"1100px", margin:"0 auto" }}>
        {[
          { val: countVal.toLocaleString("fr-FR"), label:"clients servis", accent:C.cream },
          { val:"4.8 ⭐", label:"note Google", accent:C.gold },
          { val:"30 min", label:"livraison moyenne", accent:C.amber },
          { val:"100%", label:"frais · chaque jour", accent:C.cream },
        ].map((s,i) => (
          <div key={i} style={{ padding:"44px 20px", textAlign:"center", borderRight:i<3?`1px solid rgba(245,239,224,.06)`:"none" }}>
            <div className="bebas" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", color:s.accent, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:".52rem", fontWeight:700, letterSpacing:".22em", textTransform:"uppercase", color:C.muted, marginTop:"10px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* ══ FEATURED ═════════════════════════════════ */}
    <section id="featured" className="diag-after" style={{ padding:"100px 6vw 120px", background:C.bg, position:"relative", overflow:"hidden" }}>
      <div className="hide-mob" style={{ position:"absolute", right:"-3vw", top:"50%", transform:"translateY(-50%)", fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(10rem,22vw,26rem)", color:"rgba(245,239,224,.025)", lineHeight:1, userSelect:"none", pointerEvents:"none", letterSpacing:"-.02em" }}>
        SMASH
      </div>

      <div className="sr" style={{ marginBottom:"56px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
          <div style={{ width:"32px", height:"2px", background:C.red }} />
          <span style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:C.red }}>Notre Signature</span>
        </div>
        <h2 className="bebas" style={{ fontSize:"clamp(2.4rem,5vw,5rem)", color:C.cream, lineHeight:1 }}>Le burger qui fait l&apos;unanimité</h2>
      </div>

      <div className="feat-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3px", maxWidth:"1100px" }}>
        {/* Visuel — vraie photo */}
        <div className="feat-card sr from-left d1" style={{ position:"relative", overflow:"hidden", minHeight:"480px" }}>
          {/* Photo */}
          <img
            src={FEATURED.img} alt={FEATURED.nom}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", filter:"saturate(1.2) contrast(1.08) brightness(.8)" }}
          />
          {/* Overlays */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(8,8,8,.92) 0%, rgba(8,8,8,.35) 55%, transparent 100%)", zIndex:1 }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, transparent 50%, rgba(8,8,8,.4) 100%)", zIndex:1 }} />
          {/* Badge coin */}
          <div style={{ position:"absolute", top:"20px", left:"20px", zIndex:3, background:C.red, padding:"5px 14px" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:".8rem", color:"#fff", letterSpacing:".15em" }}>⭐ SIGNATURE</span>
          </div>
          {/* Texte bas */}
          <div style={{ position:"absolute", bottom:"28px", left:"28px", right:"28px", zIndex:2 }}>
            <div style={{ fontSize:".52rem", fontWeight:700, letterSpacing:".3em", textTransform:"uppercase", color:C.amber, marginBottom:"8px" }}>{FEATURED.tag}</div>
            <div className="bebas" style={{ fontSize:"clamp(2rem,3.5vw,3rem)", color:C.cream, lineHeight:1, marginBottom:"8px" }}>{FEATURED.nom}</div>
            <div className="bebas" style={{ fontSize:"2.2rem", color:C.gold }}>{FEATURED.prix}</div>
          </div>
        </div>

        {/* Détail */}
        <div className="feat-detail sr from-right d2" style={{ background:C.s1, padding:"48px 44px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
          <div>
            <p style={{ fontSize:"1rem", color:"rgba(245,239,224,.55)", lineHeight:1.9, fontWeight:300, marginBottom:"40px" }}>
              {FEATURED.desc}
            </p>
            <div style={{ marginBottom:"40px" }}>
              <div style={{ fontSize:".52rem", fontWeight:700, letterSpacing:".3em", textTransform:"uppercase", color:C.red, marginBottom:"16px" }}>Ce qu&apos;il contient</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                {FEATURED.ingredients.map((ing,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <div style={{ width:"5px", height:"5px", background:C.amber, flexShrink:0, borderRadius:"50%" }} />
                    <span style={{ fontSize:".78rem", color:"rgba(245,239,224,.65)", fontWeight:400 }}>{ing}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <button onClick={goMenu} className="btn-red" style={{ cursor:"pointer" }}>Commander</button>
            <button onClick={goMenu} className="btn-ghost" style={{ cursor:"pointer" }}>Voir le menu</button>
          </div>
        </div>
      </div>
    </section>

    {/* ══ MENU ═════════════════════════════════════ */}
    <section ref={menuRef} id="menu" className="diag-after" style={{ padding:"80px 6vw 120px", background:C.s1 }}>
      <div className="sr" style={{ marginBottom:"44px" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"20px", marginBottom:"28px" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
              <div style={{ width:"32px", height:"2px", background:C.red }} />
              <span style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:C.red }}>La carte complète</span>
            </div>
            <h2 className="bebas" style={{ fontSize:"clamp(2rem,4.5vw,4.5rem)", color:C.cream, lineHeight:1 }}>Le Menu</h2>
          </div>
        </div>
        {/* Tabs */}
        <div className="tabs-wrap" style={{ display:"flex", gap:"6px" }}>
          {TABS.map(t => (
            <button key={t} className={`tab${tab===t?" on":""}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="menu-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:"3px" }}>
        {MENU[tab].map((item,i) => (
          <div key={`${tab}-${i}`} className={`mcard sr d${Math.min(i+1,6)}`}
            style={{ background:C.s2, position:"relative", overflow:"hidden", display:"flex", flexDirection:"column" }}
          >
            {/* Photo */}
            {item.img && (
              <div className="mcard-img" style={{ position:"relative", height:"170px", overflow:"hidden", flexShrink:0 }}>
                <img
                  src={item.img} alt={item.nom}
                  style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", filter:"saturate(1.15) brightness(.82)", transition:"transform .4s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform="scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform="scale(1)")}
                />
                {/* Overlay dégradé */}
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(24,24,24,.85) 0%, transparent 55%)" }} />
                {/* Prix flottant sur la photo */}
                <div className="bebas" style={{ position:"absolute", bottom:"10px", right:"12px", fontSize:"1.4rem", color:C.gold, letterSpacing:".04em", textShadow:"0 2px 8px rgba(0,0,0,.8)" }}>
                  {item.prix}
                </div>
                {/* Badges sur la photo */}
                <div style={{ position:"absolute", top:"10px", left:"10px", display:"flex", gap:"5px" }}>
                  {item.spicy  && <span style={{ fontSize:".5rem", fontWeight:700, padding:"3px 8px", background:C.red, color:"#fff" }}>🔥 ÉPICÉ</span>}
                  {item.nouveau && <span style={{ fontSize:".5rem", fontWeight:700, padding:"3px 8px", background:C.gold, color:C.bg }}>✦ NEW</span>}
                </div>
              </div>
            )}

            {/* Texte */}
            <div style={{ padding:"16px 18px", flex:1, display:"flex", flexDirection:"column", gap:"6px" }}>
              {/* Accent line (seulement si pas d'image) */}
              {!item.img && (
                <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px",
                  background: item.spicy ? `linear-gradient(90deg,${C.red},${C.amber})` : item.nouveau ? `linear-gradient(90deg,${C.gold},${C.amber})` : "transparent"
                }} />
              )}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px" }}>
                <div style={{ fontWeight:700, fontSize:".88rem", color:C.cream, lineHeight:1.25, flex:1 }}>{item.nom}</div>
                {!item.img && (
                  <div className="bebas" style={{ fontSize:"1.3rem", color:item.spicy?C.red:C.gold, letterSpacing:".04em", flexShrink:0 }}>{item.prix}</div>
                )}
              </div>
              {item.desc && <p style={{ fontSize:".68rem", color:"rgba(245,239,224,.38)", lineHeight:1.65 }}>{item.desc}</p>}
              {/* Badges (si pas d'image) */}
              {!item.img && (
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"4px" }}>
                  {item.spicy  && <span style={{ fontSize:".5rem", fontWeight:700, letterSpacing:".06em", padding:"3px 8px", background:"rgba(232,53,10,.15)", color:C.red, border:`1px solid rgba(232,53,10,.3)` }}>🔥 ÉPICÉ</span>}
                  {item.nouveau && <span style={{ fontSize:".5rem", fontWeight:700, letterSpacing:".06em", padding:"3px 8px", background:"rgba(255,209,102,.12)", color:C.gold, border:`1px solid rgba(255,209,102,.3)` }}>✦ NOUVEAU</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ══ VIBE ═════════════════════════════════════ */}
    <section className="diag-after" style={{ padding:"100px 6vw 130px", background:"#0e0a09", position:"relative", overflow:"hidden" }}>
      {/* Fond texturé — chaleur rouge profonde */}
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 90% at 15% 60%, rgba(232,53,10,.13) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 85% 20%, rgba(255,122,48,.07) 0%, transparent 55%)`, pointerEvents:"none" }} />
      {/* Grain chaud */}
      <div style={{ position:"absolute", inset:0, background:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")", opacity:.04, pointerEvents:"none" }} />
      {/* Ligne rouge gauche */}
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"3px", background:`linear-gradient(to bottom, transparent, ${C.red}, transparent)`, opacity:.6 }} />
      <div style={{ maxWidth:"700px", position:"relative", zIndex:1 }}>
        <div className="sr" style={{ marginBottom:"20px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"32px", height:"2px", background:C.red }} />
            <span style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:C.red }}>Notre philosophie</span>
          </div>
        </div>
        <h2 className="bebas sr d1" style={{ fontSize:"clamp(2.5rem,6vw,6rem)", lineHeight:.9, color:C.cream, marginBottom:"32px" }}>
          PAS DE LAMPE<br/>
          <span style={{ color:C.red }}>CHAUFFANTE.</span><br/>
          PAS DE BATCH.<br/>
          <span style={{ color:C.gold }}>JUSTE DU VRAI.</span>
        </h2>
        <p className="sr d2" style={{ fontSize:".9rem", color:"rgba(245,239,224,.45)", lineHeight:2, fontWeight:300, marginBottom:"40px" }}>
          Viande fraîche livrée chaque matin par notre boucher local. Poulet mariné 12h minimum. Frites coupées à la main sur place. Sauces préparées en cuisine — jamais en pot. C&apos;est ça, 77 SMASH.
        </p>
        <div className="sr d3" style={{ display:"flex", gap:"28px", flexWrap:"wrap" }}>
          {["🥩 Boucher local","🐓 Marinade 12h","🍟 Frites maison","🫙 Sauces maison"].map(t => (
            <div key={t} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ fontSize:".78rem", color:"rgba(245,239,224,.6)", fontWeight:500 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ AVIS ═════════════════════════════════════ */}
    <section id="reviews" style={{ padding:"80px 6vw 90px", background:C.cream, position:"relative", overflow:"hidden" }}>
      {/* Grain léger sur fond clair */}
      <div style={{ position:"absolute", inset:0, background:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E\")", opacity:.03, pointerEvents:"none" }} />

      <div className="sr" style={{ marginBottom:"40px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
          <div style={{ width:"32px", height:"2px", background:C.red }} />
          <span style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:C.red }}>Ce qu&apos;ils disent</span>
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:"16px", flexWrap:"wrap" }}>
          <h2 className="bebas" style={{ fontSize:"clamp(2rem,5vw,4rem)", color:C.bg, lineHeight:1 }}>4.8 sur Google</h2>
          <div style={{ display:"flex", gap:"3px" }}>
            {"★★★★★".split("").map((s,i) => <span key={i} className="star">{s}</span>)}
          </div>
          <span style={{ fontSize:".72rem", color:"rgba(8,8,8,.4)", fontWeight:500 }}>127 avis</span>
        </div>
      </div>

      {/* Carousel scroll horizontal */}
      <div style={{ display:"flex", gap:"14px", overflowX:"auto", paddingBottom:"12px", scrollSnapType:"x mandatory", WebkitOverflowScrolling:"touch", msOverflowStyle:"none" }}>
        {REVIEWS.map((r,i) => (
          <div key={i} className={`review-card sr d${Math.min(i+1,5)}`} style={{
            background:"#fff", padding:"24px", minWidth:"260px", maxWidth:"280px",
            flexShrink:0, scrollSnapAlign:"start",
            borderBottom:`3px solid ${C.red}`,
            boxShadow:"0 4px 24px rgba(8,8,8,.08)",
          }}>
            <div style={{ display:"flex", gap:"3px", marginBottom:"12px" }}>
              {"★★★★★".split("").map((s,j) => <span key={j} className="star">{s}</span>)}
            </div>
            <p style={{ fontSize:".82rem", color:"rgba(8,8,8,.75)", lineHeight:1.7, fontWeight:400, marginBottom:"16px" }}>&ldquo;{r.text}&rdquo;</p>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:`linear-gradient(135deg,${C.red},${C.amber})`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <span style={{ fontSize:".7rem", fontWeight:700, color:"#fff" }}>{r.name[0]}</span>
                </div>
                <span style={{ fontSize:".72rem", fontWeight:600, color:"rgba(8,8,8,.7)" }}>{r.name}</span>
              </div>
              <span style={{ fontSize:".6rem", color:"rgba(8,8,8,.35)" }}>{r.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Google badge */}
      <div className="sr" style={{ marginTop:"28px", display:"flex", alignItems:"center", gap:"10px" }}>
        <span style={{ fontSize:".6rem", fontWeight:600, color:"rgba(8,8,8,.4)", letterSpacing:".1em", textTransform:"uppercase" }}>Avis vérifiés sur</span>
        <span style={{ fontSize:".75rem", fontWeight:700, color:"rgba(8,8,8,.5)" }}>Google Maps</span>
        <div style={{ width:"16px", height:"16px", borderRadius:"50%", background:"linear-gradient(135deg,#4285F4,#EA4335,#FBBC04,#34A853)", display:"inline-block", verticalAlign:"middle" }} />
      </div>
    </section>

    {/* ══ LIVRAISON ════════════════════════════════ */}
    <section style={{ padding:"70px 6vw", background:C.bg, borderTop:`1px solid rgba(245,239,224,.05)` }}>
      <div className="sr" style={{ textAlign:"center", marginBottom:"40px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", marginBottom:"12px", justifyContent:"center" }}>
          <div style={{ width:"24px", height:"2px", background:C.red }} />
          <span style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:C.red }}>Commande en ligne</span>
          <div style={{ width:"24px", height:"2px", background:C.red }} />
        </div>
        <h2 className="bebas" style={{ fontSize:"clamp(1.8rem,4vw,3.2rem)", color:C.cream }}>Livré chez toi en 30 min</h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px", maxWidth:"700px", margin:"0 auto" }}>
        {[
          { name:"Uber Eats", color:"#06C167", label:"Disponible", icon:"🛵" },
          { name:"Deliveroo", color:"#00CCBC", label:"Disponible", icon:"🛵" },
          { name:"Click & Collect", color:C.gold, label:"Sur place", icon:"⚡" },
        ].map((p,i) => (
          <a key={i} href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer"
            className={`sr d${i+1}`}
            style={{
              display:"block", textDecoration:"none",
              background:C.s1, padding:"24px 16px", textAlign:"center",
              borderTop:`2px solid ${p.color}`,
              transition:"background .2s, transform .2s",
            }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background=C.s2;(e.currentTarget as HTMLElement).style.transform="translateY(-3px)"}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background=C.s1;(e.currentTarget as HTMLElement).style.transform="translateY(0)"}}
          >
            <div style={{ fontSize:"1.6rem", marginBottom:"10px" }}>{p.icon}</div>
            <div style={{ fontWeight:700, fontSize:".75rem", color:C.cream, letterSpacing:".06em", marginBottom:"4px" }}>{p.name}</div>
            <div style={{ fontSize:".55rem", color:p.color, fontWeight:600, letterSpacing:".15em", textTransform:"uppercase" }}>{p.label} →</div>
          </a>
        ))}
      </div>
      <p className="sr" style={{ textAlign:"center", marginTop:"24px", fontSize:".65rem", color:"rgba(245,239,224,.25)", letterSpacing:".08em" }}>
        Livraison disponible dans un rayon de 5km autour de Melun centre
      </p>
    </section>

    {/* ══ INFOS ════════════════════════════════════ */}
    <section id="infos" style={{ padding:"80px 6vw", background:C.s1 }}>
      <div className="sr" style={{ marginBottom:"40px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
          <div style={{ width:"32px", height:"2px", background:C.red }} />
          <span style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:C.red }}>Venir nous voir</span>
        </div>
        <h2 className="bebas" style={{ fontSize:"clamp(2rem,4vw,3.5rem)", color:C.cream }}>On est à Melun</h2>
      </div>

      {/* Map placeholder + info */}
      <div className="feat-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2px", maxWidth:"1100px" }}>
        {/* Map visuel */}
        <div className="sr from-left d1" style={{ position:"relative", minHeight:"280px", overflow:"hidden", background:"#0d1117" }}>
          {/* Simulated map dark */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#0d1117 0%,#111a22 50%,#0d1117 100%)" }} />
          {/* Grid lines */}
          {[...Array(8)].map((_,i) => (
            <div key={i} style={{ position:"absolute", left:0, right:0, top:`${i*14}%`, height:"1px", background:"rgba(255,255,255,.04)" }} />
          ))}
          {[...Array(8)].map((_,i) => (
            <div key={i} style={{ position:"absolute", top:0, bottom:0, left:`${i*14}%`, width:"1px", background:"rgba(255,255,255,.04)" }} />
          ))}
          {/* Center pin */}
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-60%)", textAlign:"center" }}>
            <div style={{ width:"16px", height:"16px", background:C.red, borderRadius:"50%", margin:"0 auto 4px", boxShadow:`0 0 0 6px rgba(232,53,10,.2), 0 0 0 12px rgba(232,53,10,.08)` }} />
            <div style={{ background:"rgba(8,8,8,.9)", padding:"6px 12px", whiteSpace:"nowrap", border:`1px solid rgba(232,53,10,.4)` }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:".85rem", color:C.cream, letterSpacing:".1em" }}>77 SMASH</div>
              <div style={{ fontSize:".55rem", color:C.muted, marginTop:"1px" }}>Melun, Seine-et-Marne</div>
            </div>
          </div>
          {/* Open in maps */}
          <a href="https://maps.google.com/?q=Melun+77000" target="_blank" rel="noopener noreferrer"
            style={{ position:"absolute", bottom:"16px", right:"16px", background:C.red, padding:"8px 14px", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:".7rem", color:"#fff", letterSpacing:".12em" }}>OUVRIR MAPS →</span>
          </a>
        </div>

        {/* Info cards */}
        <div className="sr from-right d2" style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
          {[
            { icon:"📍", titre:"Adresse",  lines:["12 Rue du Marché","77000 Melun","Centre commercial Grand Melun"] },
            { icon:"🕐", titre:"Horaires", lines:["Lun – Sam : 11h → 23h","Dim & Fériés : 12h → 22h"] },
            { icon:"📲", titre:"Réseaux",  lines:["@77smash sur Instagram","@77smash sur TikTok","contact@77smash.fr"] },
          ].map((c,i) => (
            <div key={i} className="info-card" style={{ background:C.s2, padding:"20px 24px", display:"flex", gap:"16px", alignItems:"flex-start", borderLeft:`2px solid ${i===0?C.red:i===1?C.amber:C.gold}` }}>
              <span style={{ fontSize:"1.2rem", flexShrink:0 }}>{c.icon}</span>
              <div>
                <div style={{ fontSize:".5rem", fontWeight:700, letterSpacing:".28em", textTransform:"uppercase", color:i===0?C.red:i===1?C.amber:C.gold, marginBottom:"6px" }}>{c.titre}</div>
                {c.lines.map((l,j) => (
                  <div key={j} style={{ fontSize:".78rem", color:"rgba(245,239,224,.55)", lineHeight:1.8, fontWeight:300 }}>{l}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ FOOTER ═══════════════════════════════════ */}
    <footer style={{ background:"#050505", borderTop:`2px solid rgba(232,53,10,.2)` }}>
      {/* Top strip */}
      <div style={{ padding:"32px 6vw", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"20px", borderBottom:`1px solid rgba(245,239,224,.04)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/smash77-logo.png" alt="77 SMASH" style={{ height:"36px", width:"auto", opacity:.8 }} />
        <div style={{ display:"flex", gap:"16px" }}>
          {["Instagram","TikTok","UberEats"].map(s => (
            <a key={s} href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer"
              style={{ fontSize:".58rem", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(245,239,224,.3)", textDecoration:"none", transition:"color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.color=C.cream}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(245,239,224,.3)"}
            >{s}</a>
          ))}
        </div>
      </div>
      {/* Bottom strip */}
      <div className="footer-inner" style={{ padding:"16px 6vw", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px" }}>
        <span style={{ fontSize:".5rem", color:"rgba(245,239,224,.12)", letterSpacing:".1em" }}>© 2025 77 SMASH · Melun · Seine-et-Marne</span>
        <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
          <span style={{ fontSize:".5rem", color:"rgba(245,239,224,.1)" }}>Site par</span>
          <Link href="/" style={{ fontSize:".58rem", color:`rgba(232,53,10,.5)`, textDecoration:"none", fontWeight:600, letterSpacing:".08em" }}>CC Création</Link>
        </div>
      </div>
    </footer>

    {/* ══ STICKY CTA MOBILE ════════════════════════ */}
    {stickyBtn && (
      <a
        href="https://www.ubereats.com"
        target="_blank"
        rel="noopener noreferrer"
        className="sticky-cta"
      >
        🍔 COMMANDER →
      </a>
    )}

    </div>
  );
}
