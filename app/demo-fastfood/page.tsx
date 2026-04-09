"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ─── DATA ─── */
const MENU = {
  burgers: [
    { nom:"The OG Smash",       desc:"Double bœuf, cheddar fondu, sauce secrète, pickles",        prix:"7,90 €", cal:"680 kcal", hot:false, new:true },
    { nom:"Bacon Cheese Stack", desc:"Bacon croustillant, double cheddar, oignons caramélisés",   prix:"8,50 €", cal:"720 kcal", hot:false, new:false },
    { nom:"BBQ Smoke",          desc:"Sauce BBQ fumée, emmental, salade, tomate",                  prix:"7,50 €", cal:"640 kcal", hot:false, new:false },
    { nom:"Spicy Meltdown",     desc:"Sauce piquante Nashville, jalapeños, cheddar",               prix:"8,90 €", cal:"700 kcal", hot:true,  new:false },
    { nom:"Tower Crunch",       desc:"Galette hash brown, poulet croustillant, cheddar",           prix:"8,80 €", cal:"750 kcal", hot:false, new:false },
    { nom:"Mushroom Swiss",     desc:"Champignons sautés, Swiss cheese, mayo truffe",              prix:"9,20 €", cal:"660 kcal", hot:false, new:true },
  ],
  chicken: [
    { nom:"5 Tenders Crunch",   desc:"Blanc de poulet pané maison, sauce au choix",               prix:"6,10 €", cal:"380 kcal", hot:false, new:false },
    { nom:"8 Hot Wings",        desc:"Ailes marinées 12h, sauce buffalo ou BBQ",                  prix:"6,95 €", cal:"450 kcal", hot:true,  new:false },
    { nom:"Nashville Sandwich", desc:"Poulet épicé Nashville, coleslaw maison, pickles",          prix:"8,50 €", cal:"620 kcal", hot:true,  new:true },
    { nom:"Crispy Strips x3",   desc:"Panure extra-croustillante, sauce colonel",                 prix:"5,50 €", cal:"310 kcal", hot:false, new:false },
    { nom:"Bucket 16 Wings",    desc:"Le seau familial — 16 ailes + 2 sauces",                   prix:"17,90 €",cal:"900 kcal", hot:false, new:false },
    { nom:"Poulet Brûlé",       desc:"Poulet flambé au piment de cayenne, sauce yaourt-citron",  prix:"9,50 €", cal:"580 kcal", hot:true,  new:true },
  ],
  sides: [
    { nom:"Frites Moyennes",    desc:"Frites maison dorées au saindoux",                          prix:"2,30 €", cal:"280 kcal", hot:false, new:false },
    { nom:"Loaded Fries",       desc:"Frites + cheddar fondu + bacon + sauce ranch",             prix:"4,90 €", cal:"520 kcal", hot:false, new:true },
    { nom:"Onion Rings x8",     desc:"Rondelles d'oignon panées, sauce honey mustard",           prix:"3,50 €", cal:"320 kcal", hot:false, new:false },
    { nom:"Coleslaw Maison",    desc:"Chou croquant, mayonnaise légère, carottes",               prix:"2,00 €", cal:"180 kcal", hot:false, new:false },
  ],
  boissons: [
    { nom:"Pepsi 50cl",         desc:"La classique bien froide",                                  prix:"2,49 €", cal:"215 kcal", hot:false, new:false },
    { nom:"Lipton Ice Tea 30cl",desc:"Pêche ou citron",                                           prix:"1,99 €", cal:"90 kcal",  hot:false, new:false },
    { nom:"Milkshake Maison",   desc:"Vanille / Fraise / Oreo / Caramel",                        prix:"4,50 €", cal:"420 kcal", hot:false, new:true },
    { nom:"Eau minérale 50cl",  desc:"Evian",                                                     prix:"1,50 €", cal:"0 kcal",   hot:false, new:false },
  ],
  menus: [
    { nom:"Menu Smash",         desc:"Burger au choix + Frites + Boisson",                       prix:"10,90 €",cal:"",        hot:false, new:false },
    { nom:"Menu Chicken",       desc:"5 Tenders ou 8 Wings + Frites + Boisson",                  prix:"11,45 €",cal:"",        hot:false, new:false },
    { nom:"Bucket Famille",     desc:"16 Wings + 4 Frites + 4 Boissons",                        prix:"39,90 €",cal:"",        hot:false, new:false },
  ],
};

const BESTSELLERS = [
  { nom:"The OG Smash",       tag:"#1 BEST SELLER", prix:"7,90 €", gradient:"linear-gradient(135deg,#1a0800 0%,#3d1200 40%,#8b2800 70%,#e8260a 100%)" },
  { nom:"8 Hot Wings",        tag:"🔥 FIRE PICK",   prix:"6,95 €", gradient:"linear-gradient(135deg,#1a0d00 0%,#3d2000 40%,#8b4500 70%,#ffd100 100%)" },
  { nom:"Nashville Sandwich", tag:"⚡ NOUVEAU",      prix:"8,50 €", gradient:"linear-gradient(135deg,#0d0d1a 0%,#1a1a40 40%,#3a3a8b 70%,#5555e8 100%)" },
];

const TABS = ["burgers","chicken","sides","boissons","menus"] as const;
type Tab = typeof TABS[number];
const TAB_LABELS: Record<Tab, string> = {
  burgers:"🍔 Burgers", chicken:"🍗 Poulet", sides:"🍟 Sides", boissons:"🥤 Boissons", menus:"🎁 Menus"
};

export default function DemoFastFood() {
  const [tab, setTab] = useState<Tab>("burgers");
  const [heroVisible, setHeroVisible] = useState(false);
  const [count, setCount] = useState(0);
  const menuRef = useRef<HTMLElement>(null);

  /* ── Hero intro ── */
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* ── Compteur clients servis ── */
  useEffect(() => {
    const target = 48327;
    const dur = 2500;
    const t0 = Date.now();
    const step = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); step(); } }, { threshold: 0.3 });
    const el = document.getElementById("stats-section");
    if (el) io.observe(el);
    return () => io.disconnect();
  }, []);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("ffd-in"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".ffd-reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [tab]);

  const scrollToMenu = useCallback(() => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const items = MENU[tab];

  return (
    <div style={{ background:"#0D0D0D",color:"#fff",fontFamily:"system-ui,-apple-system,sans-serif",overflowX:"hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;900&display=swap');

        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:#E8260A; }

        .anton { font-family:'Anton',Impact,sans-serif; }

        /* ── REVEAL ── */
        .ffd-reveal {
          opacity:0; transform:translateY(40px);
          transition:opacity .7s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1);
        }
        .ffd-reveal.ffd-in { opacity:1; transform:translateY(0); }
        .d1{transition-delay:.08s!important} .d2{transition-delay:.16s!important}
        .d3{transition-delay:.24s!important} .d4{transition-delay:.32s!important}
        .d5{transition-delay:.40s!important} .d6{transition-delay:.48s!important}

        /* ── HERO ANIM ── */
        .hero-line {
          opacity:0; transform:translateY(60px);
          transition:opacity .6s ease, transform .8s cubic-bezier(0.16,1,0.3,1);
        }
        .hero-active .hero-line { opacity:1; transform:translateY(0); }

        /* ── GLOW PULSE ── */
        @keyframes glowPulse {
          0%,100% { box-shadow:0 0 20px rgba(232,38,10,0.4); }
          50%      { box-shadow:0 0 50px rgba(232,38,10,0.8), 0 0 80px rgba(255,209,0,0.3); }
        }
        .glow-pulse { animation:glowPulse 2.5s ease-in-out infinite; }

        /* ── BADGE OUVERT ── */
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .dot-live { animation:blink 1.5s ease-in-out infinite; }

        /* ── CARD HOVER ── */
        .menu-card {
          transition:transform .25s cubic-bezier(0.16,1,0.3,1), box-shadow .25s ease;
          cursor:pointer;
        }
        .menu-card:hover { transform:translateY(-6px) scale(1.02); box-shadow:0 20px 60px rgba(232,38,10,0.2); }

        /* ── BESTSELLER CARD ── */
        .bs-card {
          transition:transform .3s cubic-bezier(0.16,1,0.3,1), box-shadow .3s ease;
          cursor:pointer;
        }
        .bs-card:hover { transform:translateY(-10px) scale(1.03); box-shadow:0 30px 80px rgba(0,0,0,0.5); }

        /* ── TAB BTN ── */
        .tab-btn {
          padding:10px 20px; border:none; cursor:pointer;
          font-size:.75rem; font-weight:700; letter-spacing:.08em;
          border-radius:100px;
          transition:all .2s ease;
          white-space:nowrap;
        }
        .tab-active { background:#E8260A !important; color:#fff !important; }

        /* ── CTA BTN ── */
        .cta-red {
          display:inline-block; padding:16px 40px;
          background:#E8260A; color:#fff;
          font-family:'Anton',sans-serif; font-size:1rem; letter-spacing:.1em; text-decoration:none;
          text-transform:uppercase;
          transition:background .2s, transform .2s, box-shadow .2s;
        }
        .cta-red:hover { background:#ff3d1a; transform:scale(1.04); box-shadow:0 0 40px rgba(232,38,10,0.5); }

        .cta-outline {
          display:inline-block; padding:16px 40px;
          border:2px solid rgba(255,255,255,0.3); color:#fff;
          font-family:'Anton',sans-serif; font-size:1rem; letter-spacing:.1em; text-decoration:none;
          text-transform:uppercase;
          transition:border-color .2s, background .2s, transform .2s;
        }
        .cta-outline:hover { border-color:#FFD100; color:#FFD100; transform:scale(1.04); }

        @media(max-width:768px) {
          .hide-mob { display:none !important; }
          .nav-links { display:none !important; }
          .bs-grid { grid-template-columns:1fr !important; }
          .menu-grid { grid-template-columns:1fr !important; }
          .stats-row { grid-template-columns:1fr 1fr !important; }
          .info-grid { grid-template-columns:1fr !important; }
          .tabs-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
        }
      `}</style>

      {/* ══════════════════════════════════
          NAV
      ══════════════════════════════════ */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        height:"64px",padding:"0 5vw",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background:"rgba(13,13,13,0.92)",backdropFilter:"blur(12px)",
        borderBottom:"1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
          <div style={{
            width:"36px",height:"36px",background:"#E8260A",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontFamily:"Anton,sans-serif",fontSize:"1.1rem",color:"#fff",
          }}>77</div>
          <div>
            <div style={{ fontFamily:"Anton,sans-serif",fontSize:"1rem",letterSpacing:".05em",color:"#fff",lineHeight:1 }}>SMASH</div>
            <div style={{ fontSize:"0.42rem",color:"rgba(255,255,255,0.35)",letterSpacing:".2em",textTransform:"uppercase" }}>Burgers & Poulet · Melun</div>
          </div>
        </div>

        <div className="nav-links" style={{ display:"flex",gap:"28px" }}>
          {["Menu","Bestsellers","Infos"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color:"rgba(255,255,255,0.45)",textDecoration:"none",fontSize:"0.7rem",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",transition:"color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#fff"}
              onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.45)"}
            >{l}</a>
          ))}
        </div>

        <a href="#menu" className="cta-red" style={{ padding:"10px 24px",fontSize:"0.68rem" }}>
          Commander →
        </a>
      </nav>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <section style={{ minHeight:"100dvh",paddingTop:"64px",position:"relative",display:"flex",flexDirection:"column",justifyContent:"center",padding:"100px 5vw 60px",overflow:"hidden" }}>

        {/* BG gradient blobs */}
        <div style={{ position:"absolute",top:"-10%",right:"-5%",width:"50vw",height:"70vh",background:"radial-gradient(ellipse,rgba(232,38,10,0.15) 0%,transparent 65%)",pointerEvents:"none",zIndex:0 }} />
        <div style={{ position:"absolute",bottom:"-10%",left:"10%",width:"40vw",height:"50vh",background:"radial-gradient(ellipse,rgba(255,209,0,0.08) 0%,transparent 65%)",pointerEvents:"none",zIndex:0 }} />

        {/* OUVERT badge */}
        <div className={`hero-active`} style={{ position:"relative",zIndex:1,marginBottom:"32px" }}>
          <div className="hero-line" style={{ transitionDelay:".1s",display:"inline-flex",alignItems:"center",gap:"8px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",padding:"7px 16px",borderRadius:"100px" }}>
            <div className="dot-live" style={{ width:"7px",height:"7px",background:"#00E676",borderRadius:"50%" }} />
            <span style={{ fontSize:"0.65rem",fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:"rgba(255,255,255,0.7)" }}>Ouvert maintenant — 11h → 23h</span>
          </div>
        </div>

        <div className={heroVisible ? "hero-active" : ""} style={{ position:"relative",zIndex:1,maxWidth:"900px" }}>
          <div className="hero-line" style={{ transitionDelay:".2s" }}>
            <h1 className="anton" style={{ fontSize:"clamp(3.5rem,12vw,10rem)",lineHeight:.9,letterSpacing:".02em",marginBottom:"8px" }}>
              <span style={{ color:"#E8260A" }}>BURGERS</span>
            </h1>
          </div>
          <div className="hero-line" style={{ transitionDelay:".35s" }}>
            <h1 className="anton" style={{ fontSize:"clamp(3.5rem,12vw,10rem)",lineHeight:.9,letterSpacing:".02em",marginBottom:"8px",WebkitTextStroke:"2px rgba(255,255,255,0.15)",color:"transparent" }}>
              &amp; POULET
            </h1>
          </div>
          <div className="hero-line" style={{ transitionDelay:".5s" }}>
            <h1 className="anton" style={{ fontSize:"clamp(3.5rem,12vw,10rem)",lineHeight:.9,letterSpacing:".02em",marginBottom:"40px" }}>
              À <span style={{ color:"#FFD100" }}>MELUN.</span>
            </h1>
          </div>

          <div className="hero-line" style={{ transitionDelay:".65s",display:"flex",gap:"16px",flexWrap:"wrap" }}>
            <button onClick={scrollToMenu} className="cta-red glow-pulse">
              Voir le menu ↓
            </button>
            <a href="https://www.ubereats.com" target="_blank" rel="noopener noreferrer" className="cta-outline">
              Commander en ligne
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute",bottom:"32px",right:"5vw",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",opacity:.4 }}>
          <div style={{ width:"1px",height:"40px",background:"linear-gradient(to bottom,#E8260A,transparent)" }} />
          <span style={{ fontSize:"0.4rem",letterSpacing:".3em",textTransform:"uppercase",writingMode:"vertical-rl" }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════
          STATS
      ══════════════════════════════════ */}
      <div id="stats-section" style={{ background:"#E8260A",padding:"0" }}>
        <div className="stats-row" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",maxWidth:"1200px",margin:"0 auto" }}>
          {[
            { n: count.toLocaleString("fr-FR"), label:"clients servis" },
            { n:"4.8⭐",                        label:"note Google" },
            { n:"30 min",                        label:"livraison moy." },
            { n:"100%",                          label:"fraîcheur quotidienne" },
          ].map((s,i) => (
            <div key={i} style={{ padding:"28px 16px",textAlign:"center",borderRight:i<3?"1px solid rgba(255,255,255,0.2)":"none" }}>
              <div className="anton" style={{ fontSize:"clamp(1.4rem,3vw,2.2rem)",color:"#fff",lineHeight:1 }}>{s.n}</div>
              <div style={{ fontSize:"0.55rem",fontWeight:600,letterSpacing:".15em",textTransform:"uppercase",color:"rgba(255,255,255,0.7)",marginTop:"6px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          BESTSELLERS
      ══════════════════════════════════ */}
      <section id="bestsellers" style={{ padding:"100px 5vw" }}>
        <div className="ffd-reveal" style={{ marginBottom:"48px" }}>
          <p style={{ fontSize:".55rem",fontWeight:700,letterSpacing:".4em",color:"#E8260A",textTransform:"uppercase",marginBottom:"12px" }}>— Les incontournables —</p>
          <h2 className="anton" style={{ fontSize:"clamp(2rem,5vw,4rem)",lineHeight:1,letterSpacing:".02em" }}>
            Top du moment
          </h2>
        </div>

        <div className="bs-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px" }}>
          {BESTSELLERS.map((b,i) => (
            <div key={i} className={`bs-card ffd-reveal d${i+1}`}>
              {/* Visual */}
              <div style={{ height:"220px",background:b.gradient,position:"relative",overflow:"hidden" }}>
                <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(13,13,13,0.7) 0%,transparent 50%)" }} />
                <div style={{ position:"absolute",top:"16px",left:"16px",background:"#E8260A",padding:"4px 12px",borderRadius:"100px" }}>
                  <span style={{ fontSize:".6rem",fontWeight:700,letterSpacing:".1em" }}>{b.tag}</span>
                </div>
                <div style={{ position:"absolute",bottom:"16px",left:"16px",right:"16px" }}>
                  <div className="anton" style={{ fontSize:"1.5rem",lineHeight:1 }}>{b.nom}</div>
                </div>
              </div>
              {/* Footer */}
              <div style={{ background:"#141414",padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <span style={{ fontSize:".75rem",color:"rgba(255,255,255,0.45)" }}>À partir de</span>
                <span className="anton" style={{ fontSize:"1.3rem",color:"#FFD100",letterSpacing:".03em" }}>{b.prix}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          MENU
      ══════════════════════════════════ */}
      <section ref={menuRef} id="menu" style={{ padding:"80px 5vw 100px",background:"#0A0A0A" }}>

        <div className="ffd-reveal" style={{ marginBottom:"40px" }}>
          <p style={{ fontSize:".55rem",fontWeight:700,letterSpacing:".4em",color:"#E8260A",textTransform:"uppercase",marginBottom:"12px" }}>— Notre carte —</p>
          <h2 className="anton" style={{ fontSize:"clamp(2rem,5vw,4rem)",lineHeight:1,letterSpacing:".02em",marginBottom:"32px" }}>
            Le Menu Complet
          </h2>

          {/* Tabs */}
          <div className="tabs-wrap" style={{ display:"flex",gap:"8px",paddingBottom:"4px" }}>
            {TABS.map(t => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? "tab-active" : ""}`}
                onClick={() => setTab(t)}
                style={{ background: tab===t ? "#E8260A" : "rgba(255,255,255,0.07)", color: tab===t ? "#fff" : "rgba(255,255,255,0.55)" }}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <div className="menu-grid" style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"12px" }}>
          {items.map((item, i) => (
            <div
              key={`${tab}-${i}`}
              className={`menu-card ffd-reveal d${Math.min(i+1,6)}`}
              style={{ background:"#141414",border:"1px solid rgba(255,255,255,0.06)",padding:"20px",position:"relative",overflow:"hidden" }}
            >
              {/* Badges */}
              <div style={{ position:"absolute",top:"14px",right:"14px",display:"flex",gap:"6px",flexWrap:"wrap",justifyContent:"flex-end" }}>
                {item.hot && <span style={{ background:"#E8260A",color:"#fff",fontSize:".52rem",fontWeight:700,padding:"3px 8px",borderRadius:"100px",letterSpacing:".05em" }}>🔥 SPICY</span>}
                {item.new && <span style={{ background:"#FFD100",color:"#0D0D0D",fontSize:".52rem",fontWeight:700,padding:"3px 8px",borderRadius:"100px",letterSpacing:".05em" }}>✨ NEW</span>}
              </div>

              <div style={{ marginBottom:"8px" }}>
                <div style={{ fontWeight:700,fontSize:".95rem",marginBottom:"6px",paddingRight:"60px",lineHeight:1.2 }}>{item.nom}</div>
                <div style={{ fontSize:".72rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6 }}>{item.desc}</div>
              </div>

              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"16px",paddingTop:"14px",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                <div>
                  <div className="anton" style={{ fontSize:"1.3rem",color:"#E8260A",letterSpacing:".03em" }}>{item.prix}</div>
                  {item.cal && <div style={{ fontSize:".52rem",color:"rgba(255,255,255,0.2)",marginTop:"2px" }}>{item.cal}</div>}
                </div>
                <button style={{
                  background:"rgba(232,38,10,0.12)",border:"1px solid rgba(232,38,10,0.35)",
                  color:"#E8260A",padding:"8px 16px",fontSize:".65rem",fontWeight:700,
                  letterSpacing:".08em",cursor:"pointer",
                  transition:"background .2s",
                }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(232,38,10,0.25)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(232,38,10,0.12)"}
                >
                  + Ajouter
                </button>
              </div>

              {/* Hover accent line */}
              <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg,#E8260A,#FFD100,#E8260A)",transform:"scaleX(0)",transition:"transform .25s ease",transformOrigin:"left" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform="scaleX(1)"}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform="scaleX(0)"}}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          VIBE SECTION
      ══════════════════════════════════ */}
      <section style={{ padding:"100px 5vw",background:"#E8260A",position:"relative",overflow:"hidden" }}>
        <div className="hide-mob" style={{ position:"absolute",right:"-2vw",top:"50%",transform:"translateY(-50%)",fontFamily:"Anton,sans-serif",fontSize:"clamp(8rem,20vw,22rem)",fontWeight:700,color:"rgba(0,0,0,0.12)",lineHeight:1,userSelect:"none" }}>SMASH</div>

        <div style={{ position:"relative",zIndex:1,maxWidth:"700px" }}>
          <div className="ffd-reveal">
            <p style={{ fontSize:".55rem",fontWeight:700,letterSpacing:".4em",color:"rgba(255,255,255,0.6)",textTransform:"uppercase",marginBottom:"16px" }}>Notre philosophie</p>
            <h2 className="anton ffd-reveal d1" style={{ fontSize:"clamp(2rem,5vw,4.5rem)",lineHeight:.95,letterSpacing:".02em",marginBottom:"28px" }}>
              NO CAP —<br />C&apos;EST BON.
            </h2>
            <p className="ffd-reveal d2" style={{ fontSize:".92rem",color:"rgba(255,255,255,0.8)",lineHeight:1.9,fontWeight:300,maxWidth:"520px",marginBottom:"36px" }}>
              Chez 77 SMASH, on prépare tout à la commande. Viande fraîche livrée chaque matin, sauce maison, frites coupées sur place. Pas de lampes chauffantes, pas de batch cooking. Juste du vrai.
            </p>
            <div className="ffd-reveal d3" style={{ display:"flex",gap:"32px",flexWrap:"wrap" }}>
              {["Tout frais, chaque jour","Fait maison","Livraison 30 min"].map(t => (
                <div key={t} style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                  <div style={{ width:"5px",height:"5px",background:"#FFD100",borderRadius:"50%",flexShrink:0 }} />
                  <span style={{ fontSize:".72rem",fontWeight:600,color:"rgba(255,255,255,0.85)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LIVRAISON
      ══════════════════════════════════ */}
      <section style={{ padding:"80px 5vw",background:"#111" }}>
        <div className="ffd-reveal" style={{ textAlign:"center",marginBottom:"48px" }}>
          <p style={{ fontSize:".55rem",fontWeight:700,letterSpacing:".4em",color:"#E8260A",textTransform:"uppercase",marginBottom:"12px" }}>— Commande en ligne —</p>
          <h2 className="anton" style={{ fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:".02em" }}>Livré chez toi en 30 min</h2>
        </div>

        <div style={{ display:"flex",gap:"20px",justifyContent:"center",flexWrap:"wrap" }}>
          {[
            { name:"Uber Eats",     bg:"#06C167", text:"#fff", emoji:"🟢" },
            { name:"Deliveroo",     bg:"#00CCBC", text:"#fff", emoji:"🩵" },
            { name:"Click & Collect", bg:"#FFD100", text:"#0D0D0D", emoji:"🏃" },
          ].map((p,i) => (
            <div key={i} className={`ffd-reveal d${i+1}`} style={{
              background:"#1A1A1A",border:`2px solid ${p.bg}`,
              padding:"28px 40px",textAlign:"center",minWidth:"200px",
              transition:"transform .25s",cursor:"pointer",
            }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.transform="scale(1.05)"}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.transform="scale(1)"}
            >
              <div style={{ fontSize:"2rem",marginBottom:"10px" }}>{p.emoji}</div>
              <div style={{ fontWeight:700,fontSize:".9rem",letterSpacing:".05em" }}>{p.name}</div>
              <div style={{ fontSize:".6rem",color:p.bg,fontWeight:600,marginTop:"4px",letterSpacing:".08em" }}>COMMANDER →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          INFOS
      ══════════════════════════════════ */}
      <section id="infos" style={{ padding:"100px 5vw",background:"#0D0D0D" }}>
        <div className="ffd-reveal" style={{ marginBottom:"48px" }}>
          <p style={{ fontSize:".55rem",fontWeight:700,letterSpacing:".4em",color:"#E8260A",textTransform:"uppercase",marginBottom:"12px" }}>— Nous trouver —</p>
          <h2 className="anton" style={{ fontSize:"clamp(1.8rem,4vw,3rem)",letterSpacing:".02em" }}>Infos pratiques</h2>
        </div>

        <div className="info-grid" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"2px" }}>
          {[
            { icon:"📍", titre:"Adresse",   lignes:["12 Rue du Marché","77000 Melun","(Centre commercial Grand Melun)"] },
            { icon:"🕐", titre:"Horaires",  lignes:["Lun – Sam : 11h → 23h","Dimanche : 12h → 22h","Jours fériés : 12h → 22h"] },
            { icon:"📞", titre:"Contact",   lignes:["01 64 XX XX XX","contact@77smash.fr","Instagram : @77smash"] },
          ].map((c,i) => (
            <div key={i} className={`ffd-reveal d${i+1}`} style={{ background:"#141414",padding:"36px 28px" }}>
              <div style={{ fontSize:"2rem",marginBottom:"16px" }}>{c.icon}</div>
              <div style={{ fontWeight:700,fontSize:".75rem",letterSpacing:".2em",textTransform:"uppercase",color:"#E8260A",marginBottom:"16px" }}>{c.titre}</div>
              {c.lignes.map((l,j) => (
                <div key={j} style={{ fontSize:".82rem",color:"rgba(255,255,255,0.55)",lineHeight:1.8 }}>{l}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          FOOTER
      ══════════════════════════════════ */}
      <footer style={{ padding:"32px 5vw",background:"#080808",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px" }}>
        <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
          <div style={{ width:"28px",height:"28px",background:"#E8260A",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Anton,sans-serif",fontSize:".8rem",color:"#fff" }}>77</div>
          <span style={{ fontSize:".6rem",letterSpacing:".15em",color:"rgba(255,255,255,0.25)",textTransform:"uppercase" }}>77 Smash · Melun · Burgers & Poulet</span>
        </div>
        <span style={{ fontSize:".5rem",color:"rgba(255,255,255,0.15)" }}>© 2025 77 SMASH</span>
        <div style={{ display:"flex",gap:"12px",alignItems:"center" }}>
          <span style={{ fontSize:".5rem",color:"rgba(255,255,255,0.15)" }}>Site réalisé par</span>
          <Link href="/" style={{ fontSize:".6rem",color:"rgba(232,38,10,0.6)",textDecoration:"none",letterSpacing:".08em",fontWeight:600 }}>CC Création</Link>
        </div>
      </footer>

    </div>
  );
}
