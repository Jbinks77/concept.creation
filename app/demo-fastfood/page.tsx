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

/* ─── COMPONENT ────────────────────────────────── */
export default function DemoFastFood() {
  const [tab, setTab]             = useState(TABS[0]);
  const [loaded, setLoaded]       = useState(false);
  const [statsVisible, setStats]  = useState(false);
  const [countVal, setCount]      = useState(0);
  const menuRef  = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

      /* ─ RESPONSIVE ─ */
      @media(max-width:768px) {
        .hide-mob  { display:none!important; }
        .mob-col   { flex-direction:column!important; }
        .mob-full  { width:100%!important; }
        .tabs-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:4px; }
        .menu-grid { grid-template-columns:1fr!important; }
        .feat-grid { grid-template-columns:1fr!important; }
        .info-grid { grid-template-columns:1fr!important; }
        .stats-grid{ grid-template-columns:1fr 1fr!important; }

        /* Hero mobile */
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
        .footer-inner { flex-direction:column!important; text-align:center!important; justify-content:center!important; align-items:center!important; }
      }
    `}</style>

    {/* GRAIN */}
    <div className="grain" aria-hidden />

    {/* ══ NAV ══════════════════════════════════════ */}
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:200,
      height:"62px", padding:"0 5vw",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background:"rgba(8,8,8,0.88)", backdropFilter:"blur(16px) saturate(1.4)",
      borderBottom:`1px solid rgba(245,239,224,.06)`,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <div className="pulse" style={{
          width:"38px", height:"38px", background:C.red,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <span className="bebas" style={{ fontSize:"1rem", color:"#fff", lineHeight:1 }}>77</span>
        </div>
        <div>
          <div className="bebas" style={{ fontSize:"1.15rem", color:C.cream, lineHeight:1, letterSpacing:".06em" }}>SMASH</div>
          <div style={{ fontSize:".4rem", color:C.muted, letterSpacing:".28em", textTransform:"uppercase", marginTop:"1px" }}>Burgers & Poulet · Melun</div>
        </div>
      </div>

      <div className="hide-mob" style={{ display:"flex", gap:"32px" }}>
        {[["Menu","#menu"],["Signature","#featured"],["Infos","#infos"]].map(([l,h]) => (
          <a key={l} href={h} style={{ color:C.muted, textDecoration:"none", fontSize:".68rem", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", transition:"color .2s" }}
            onMouseEnter={e=>e.currentTarget.style.color=C.cream}
            onMouseLeave={e=>e.currentTarget.style.color=C.muted}
          >{l}</a>
        ))}
      </div>

      <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="btn-red" style={{ padding:"9px 22px", fontSize:".75rem" }}>
        Commander →
      </a>
    </nav>

    {/* ══ HERO ═════════════════════════════════════ */}
    <section style={{ position:"relative", height:"100dvh", overflow:"hidden", paddingTop:"62px" }}>

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

      {/* Overlays */}
      <div style={{ position:"absolute",inset:0,zIndex:1,
        background:"linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,.65) 35%, rgba(8,8,8,.15) 65%, rgba(8,8,8,.4) 100%)" }} />
      <div style={{ position:"absolute",inset:0,zIndex:1,
        background:"linear-gradient(to right, rgba(8,8,8,.7) 0%, transparent 50%)" }} />

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
        <div className="hl" style={{ transitionDelay:".54s", marginBottom:"28px" }}>
          <p className="hero-sub" style={{ fontSize:".85rem", color:"rgba(245,239,224,.5)", fontWeight:300, lineHeight:1.7, maxWidth:"420px" }}>
            Fait à la commande · Viande fraîche · Livraison 30 min
          </p>
        </div>

        {/* CTAs */}
        <div className="hl hero-btns" style={{ transitionDelay:".62s", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <button onClick={goMenu} className="btn-red pulse" style={{ cursor:"pointer" }}>
            Voir le menu
          </button>
          <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Commander →
          </a>
        </div>
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

    {/* ══ STATS ════════════════════════════════════ */}
    <div id="ctr" style={{ background:C.s1, borderBottom:`1px solid rgba(245,239,224,.06)` }}>
      <div className="stats-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", maxWidth:"1100px", margin:"0 auto" }}>
        {[
          { val: countVal.toLocaleString("fr-FR"), label:"clients servis" },
          { val:"4.8 ⭐", label:"note Google" },
          { val:"30 min", label:"livraison moyenne" },
          { val:"100%", label:"frais · chaque jour" },
        ].map((s,i) => (
          <div key={i} style={{ padding:"30px 16px", textAlign:"center", borderRight:i<3?`1px solid rgba(245,239,224,.06)`:"none" }}>
            <div className="bebas" style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", color:C.cream, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:".52rem", fontWeight:600, letterSpacing:".2em", textTransform:"uppercase", color:C.muted, marginTop:"7px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* ══ FEATURED ═════════════════════════════════ */}
    <section id="featured" style={{ padding:"100px 6vw", background:C.bg, position:"relative", overflow:"hidden" }}>
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
    <section ref={menuRef} id="menu" style={{ padding:"80px 6vw 100px", background:C.s1 }}>
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
              <div style={{ position:"relative", height:"170px", overflow:"hidden", flexShrink:0 }}>
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
    <section style={{ padding:"100px 6vw", background:C.bg, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 60% 80% at 80% 50%, rgba(232,53,10,.07) 0%, transparent 65%)`, pointerEvents:"none" }} />
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

    {/* ══ LIVRAISON ════════════════════════════════ */}
    <section style={{ padding:"80px 6vw", background:C.s1, borderTop:`1px solid rgba(245,239,224,.05)` }}>
      <div className="sr" style={{ textAlign:"center", marginBottom:"48px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", marginBottom:"12px", justifyContent:"center" }}>
          <div style={{ width:"24px", height:"2px", background:C.red }} />
          <span style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:C.red }}>Commande en ligne</span>
          <div style={{ width:"24px", height:"2px", background:C.red }} />
        </div>
        <h2 className="bebas" style={{ fontSize:"clamp(1.8rem,4vw,3.5rem)", color:C.cream }}>Livré chez toi en 30 min</h2>
      </div>
      <div style={{ display:"flex", gap:"3px", justifyContent:"center", flexWrap:"wrap" }}>
        {[
          { name:"Uber Eats",       color:"#06C167", bg:"rgba(6,193,103,.08)",   emoji:"🟢" },
          { name:"Deliveroo",       color:"#00CCBC", bg:"rgba(0,204,188,.08)",   emoji:"🩵" },
          { name:"Click & Collect", color:C.gold,   bg:`rgba(255,209,102,.08)`, emoji:"⚡" },
        ].map((p,i) => (
          <div key={i} className={`delivery-card mcard sr d${i+1}`} style={{
            background:p.bg, border:`1px solid ${p.color}22`,
            padding:"32px 48px", textAlign:"center", minWidth:"200px",
          }}>
            <div style={{ fontSize:"2rem", marginBottom:"12px" }}>{p.emoji}</div>
            <div style={{ fontWeight:700, fontSize:".9rem", color:C.cream, letterSpacing:".06em", marginBottom:"6px" }}>{p.name}</div>
            <div className="bebas" style={{ fontSize:".85rem", color:p.color, letterSpacing:".15em" }}>COMMANDER →</div>
          </div>
        ))}
      </div>
    </section>

    {/* ══ INFOS ════════════════════════════════════ */}
    <section id="infos" style={{ padding:"100px 6vw", background:C.bg }}>
      <div className="sr" style={{ marginBottom:"48px" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
          <div style={{ width:"32px", height:"2px", background:C.red }} />
          <span style={{ fontSize:".55rem", fontWeight:700, letterSpacing:".4em", textTransform:"uppercase", color:C.red }}>Nous trouver</span>
        </div>
        <h2 className="bebas" style={{ fontSize:"clamp(2rem,4vw,4rem)", color:C.cream }}>Infos pratiques</h2>
      </div>
      <div className="info-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"3px" }}>
        {[
          { icon:"📍", titre:"Adresse",  lines:["12 Rue du Marché","77000 Melun","Centre commercial Grand Melun"] },
          { icon:"🕐", titre:"Horaires", lines:["Lun – Sam : 11h → 23h","Dimanche : 12h → 22h","Jours fériés : 12h → 22h"] },
          { icon:"📞", titre:"Contact",  lines:["01 64 XX XX XX","contact@77smash.fr","@77smash"] },
        ].map((c,i) => (
          <div key={i} className={`info-card sr d${i+1}`} style={{ background:C.s1, padding:"36px 32px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:`linear-gradient(90deg,${C.red},transparent)` }} />
            <div style={{ fontSize:"2rem", marginBottom:"20px" }}>{c.icon}</div>
            <div style={{ fontSize:".52rem", fontWeight:700, letterSpacing:".28em", textTransform:"uppercase", color:C.red, marginBottom:"16px" }}>{c.titre}</div>
            {c.lines.map((l,j) => (
              <div key={j} style={{ fontSize:".82rem", color:"rgba(245,239,224,.5)", lineHeight:2, fontWeight:300 }}>{l}</div>
            ))}
          </div>
        ))}
      </div>
    </section>

    {/* ══ FOOTER ═══════════════════════════════════ */}
    <footer className="footer-inner" style={{ padding:"28px 6vw", background:"#050505", borderTop:`1px solid rgba(245,239,224,.05)`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
        <div style={{ width:"30px", height:"30px", background:C.red, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span className="bebas" style={{ fontSize:".85rem", color:"#fff" }}>77</span>
        </div>
        <span style={{ fontSize:".55rem", letterSpacing:".2em", color:"rgba(245,239,224,.2)", textTransform:"uppercase" }}>77 Smash · Burgers & Poulet · Melun 77</span>
      </div>
      <span style={{ fontSize:".5rem", color:"rgba(245,239,224,.12)" }}>© 2025 77 SMASH</span>
      <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
        <span style={{ fontSize:".5rem", color:"rgba(245,239,224,.12)" }}>Site réalisé par</span>
        <Link href="/" style={{ fontSize:".58rem", color:`rgba(232,53,10,.55)`, textDecoration:"none", fontWeight:600, letterSpacing:".08em" }}>CC Création</Link>
      </div>
    </footer>

    </div>
  );
}
