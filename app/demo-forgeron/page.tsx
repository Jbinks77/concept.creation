"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ─── DATA ─── */
const CREATIONS = [
  { nom: "Damas Seigneur", matiere: "Acier damas 256 couches", manche: "Loupe de noyer stabilisée", lg: "22 cm", gradient: "linear-gradient(135deg,#0a0604 0%,#3d1f0a 40%,#8b4513 70%,#c4622d 100%)" },
  { nom: "Lame de Chef", matiere: "Acier carbone XC75", manche: "Olivier d'Italie", lg: "24 cm", gradient: "linear-gradient(135deg,#060a0a 0%,#0a2030 40%,#1a4060 70%,#2d6080 100%)" },
  { nom: "Chasseur Noir", matiere: "Acier inox N690", manche: "Corne de buffle", lg: "19 cm", gradient: "linear-gradient(135deg,#060606 0%,#1a1a1a 40%,#2d2d2d 70%,#404040 100%)" },
  { nom: "Pliant Damascus", matiere: "Damas twist 128 couches", manche: "G10 fibres de carbone", lg: "18 cm (fermé)", gradient: "linear-gradient(135deg,#08060a 0%,#200a30 40%,#4a1060 70%,#7a2090 100%)" },
  { nom: "Collection Solstice", matiere: "Acier forgé à la main", manche: "Bois de cerf gravé", lg: "26 cm", gradient: "linear-gradient(135deg,#0a0806 0%,#3a1a08 40%,#7a3810 70%,#c47020 100%)" },
];

const STATS = [
  { n: 24, suffix: " ans", label: "de forge" },
  { n: 1200, suffix: "+", label: "lames créées" },
  { n: 3, suffix: "", label: "prix nationaux" },
  { n: 18, suffix: "", label: "pays livrés" },
];

const PROCESS = [
  { num: "01", titre: "La commande", texte: "Échange de 45 minutes pour définir l'usage, l'esthétique, les matériaux. Chaque lame commence par une conversation." },
  { num: "02", titre: "La forge", texte: "Chauffage à 950°C, martelage, mise en forme. L'acier révèle son caractère sous les coups répétés de l'enclume." },
  { num: "03", titre: "La trempe", texte: "Plongée dans l'huile à 800°C. C'est ici que l'acier acquiert sa dureté définitive. Un instant critique, irréversible." },
  { num: "04", titre: "La finition", texte: "Affûtage à la pierre japonaise, polissage, montage du manche. 12 à 40 heures selon la complexité de la pièce." },
];

/* ─── COMPONENT ─── */
export default function DemoForgeron() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const cursorDotRef  = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const scrollRef     = useRef<HTMLDivElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);
  const num01Ref      = useRef<HTMLDivElement>(null);
  const num02Ref      = useRef<HTMLDivElement>(null);
  const num03Ref      = useRef<HTMLDivElement>(null);
  const num04Ref      = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [introPhase, setIntroPhase] = useState(0); // 0=black, 1=title, 2=exit
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [activeProcess, setActiveProcess] = useState(0);
  const rafCursor = useRef(0);
  const mouseX = useRef(0); const mouseY = useRef(0);
  const ringX = useRef(0);  const ringY = useRef(0);

  /* ── INTRO CINÉMATIQUE ── */
  useEffect(() => {
    const t1 = setTimeout(() => setIntroPhase(1), 300);
    const t2 = setTimeout(() => setIntroPhase(2), 2200);
    const t3 = setTimeout(() => setIntroDone(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  /* ── CANVAS ÉTINCELLES ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Spark = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string; };
    const sparks: Spark[] = [];
    const colors = ["#E8A94A","#C4622D","#FF8C42","#FFD166","#FF6B35"];

    const spawnSpark = () => {
      const x = canvas.width * 0.3 + Math.random() * canvas.width * 0.4;
      const y = canvas.height + 10;
      sparks.push({
        x, y,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -(1.5 + Math.random() * 3.5),
        life: 0,
        maxLife: 60 + Math.random() * 80,
        size: 0.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    let frame = 0;
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 3 === 0) spawnSpark();
      frame++;

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy;
        s.vy += 0.04; // gravity
        s.vx += (Math.random() - 0.5) * 0.15;
        s.life++;
        const progress = s.life / s.maxLife;
        const alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha) * 0.85;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.restore();

        if (s.life >= s.maxLife || s.y < -20) sparks.splice(i, 1);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  /* ── CURSEUR MAGNÉTIQUE ── */
  useEffect(() => {
    const dot  = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => { mouseX.current = e.clientX; mouseY.current = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      dot.style.transform  = `translate(${mouseX.current - 4}px, ${mouseY.current - 4}px)`;
      ring.style.transform = `translate(${ringX.current - 20}px, ${ringY.current - 20}px)`;
      rafCursor.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafCursor.current); };
  }, []);

  /* ── SCROLL REVEAL ── */
  useEffect(() => {
    if (!introDone) return;
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add("in-view"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal,.wipe,.scale-in,.char-reveal,.curtain,.line-reveal,.section-sweep").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [introDone]);

  /* ── COMPTEURS ── */
  useEffect(() => {
    if (!introDone) return;
    const bar = statsRef.current;
    if (!bar) return;
    let done = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done) return;
      done = true;
      STATS.forEach((s, i) => {
        const el = bar.querySelectorAll<HTMLElement>(".snum")[i];
        if (!el) return;
        const t0 = Date.now(), dur = 2000;
        const step = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * s.n) + s.suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        step();
      });
    }, { threshold: 0.4 });
    io.observe(bar);
    return () => io.disconnect();
  }, [introDone]);

  /* ── PROCESS AUTO ── */
  useEffect(() => {
    const t = setInterval(() => setActiveProcess(p => (p + 1) % 4), 3500);
    return () => clearInterval(t);
  }, []);

  /* ── PARALLAX SCROLL sur numéros de fond ── */
  useEffect(() => {
    if (!introDone) return;
    const onScroll = () => {
      const y = window.scrollY;
      const refs = [num01Ref, num02Ref, num03Ref, num04Ref];
      const factors = [0.18, -0.12, 0.15, -0.10];
      refs.forEach((r, i) => {
        if (r.current) r.current.style.transform = `translateY(calc(-50% + ${y * factors[i]}px))`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [introDone]);

  const prev = useCallback(() => setCarouselIdx(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setCarouselIdx(i => Math.min(CREATIONS.length - 1, i + 1)), []);

  return (
    <>
      {/* ── CUSTOM CURSOR ── */}
      <div ref={cursorDotRef}  style={{ position:"fixed",top:0,left:0,width:8,height:8,background:"#E8A94A",borderRadius:"50%",zIndex:9999,pointerEvents:"none",mixBlendMode:"difference" }} />
      <div ref={cursorRingRef} style={{ position:"fixed",top:0,left:0,width:40,height:40,border:"1px solid rgba(232,169,74,0.6)",borderRadius:"50%",zIndex:9998,pointerEvents:"none",transition:"opacity .3s" }} />

      {/* ── INTRO ── */}
      {!introDone && (
        <div style={{
          position:"fixed",inset:0,zIndex:10000,background:"#050302",
          display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",
          opacity: introPhase === 2 ? 0 : 1,
          transition: introPhase === 2 ? "opacity .8s cubic-bezier(0.16,1,0.3,1)" : "none",
        }}>
          <div style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"clamp(1.8rem,6vw,4rem)",
            letterSpacing:"0.45em",
            color:"#fff",
            textTransform:"uppercase",
            opacity: introPhase >= 1 ? 1 : 0,
            transform: introPhase >= 1 ? "translateY(0)" : "translateY(30px)",
            transition:"opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
          }}>FORGE DAMPIERRE</div>
          <div style={{
            width: introPhase >= 1 ? "120px" : "0px",
            height:"1px",
            background:"linear-gradient(90deg,transparent,#E8A94A,transparent)",
            marginTop:"16px",
            transition:"width 1.2s cubic-bezier(0.16,1,0.3,1) .4s",
          }} />
          <div style={{
            fontFamily:"system-ui,sans-serif",fontSize:"0.6rem",letterSpacing:"0.4em",
            color:"rgba(232,169,74,0.6)",textTransform:"uppercase",marginTop:"14px",
            opacity: introPhase >= 1 ? 1 : 0, transition:"opacity .8s ease .8s",
          }}>Coutelier artisan · Fontainebleau</div>
        </div>
      )}

      <div style={{ background:"#050302",color:"#fff",fontFamily:"system-ui,-apple-system,sans-serif",overflowX:"hidden",cursor:"none" }}>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,300;1,400&display=swap');
          * { box-sizing:border-box; margin:0; padding:0; }

          .font-pl { font-family:'Playfair Display',Georgia,serif; }

          /* ══ CINEMATIC REVEAL — blur + rise ══ */
          .reveal {
            opacity:0;
            transform:translateY(70px);
            filter:blur(8px);
            transition:
              opacity   1.4s cubic-bezier(0.16,1,0.3,1),
              transform 1.6s cubic-bezier(0.16,1,0.3,1),
              filter    1.2s cubic-bezier(0.16,1,0.3,1);
          }
          .reveal.in-view { opacity:1; transform:translateY(0); filter:blur(0px); }

          /* ══ WIPE — balayage diagonal gauche→droite ══ */
          .wipe {
            clip-path:polygon(0 0, 0 0, 0 110%, 0 110%);
            transition:clip-path 1.8s cubic-bezier(0.76,0,0.24,1);
          }
          .wipe.in-view { clip-path:polygon(0 0, 100% 0, 100% 110%, 0 110%); }

          /* ══ SCALE-IN — zoom + blur ══ */
          .scale-in {
            opacity:0;
            transform:scale(0.84) translateY(40px);
            filter:blur(6px);
            transition:
              opacity   1.4s cubic-bezier(0.16,1,0.3,1),
              transform 1.6s cubic-bezier(0.16,1,0.3,1),
              filter    1.2s cubic-bezier(0.16,1,0.3,1);
          }
          .scale-in.in-view { opacity:1; transform:scale(1) translateY(0); filter:blur(0px); }

          /* ══ CURTAIN — rideau de bas en haut ══ */
          .curtain {
            clip-path:inset(0 0 100% 0);
            transition:clip-path 1.6s cubic-bezier(0.76,0,0.24,1);
          }
          .curtain.in-view { clip-path:inset(0 0 0% 0); }

          /* ══ LINE REVEAL — montée + fade par ligne ══ */
          .line-reveal {
            display:block;
            opacity:0;
            transform:translateY(0.9em);
            transition:
              opacity   1s   cubic-bezier(0.16,1,0.3,1),
              transform 1.5s cubic-bezier(0.76,0,0.24,1);
          }
          .line-reveal.in-view { opacity:1; transform:translateY(0); }

          /* ── DELAYS ── */
          .d1{transition-delay:.15s!important} .d2{transition-delay:.3s!important}
          .d3{transition-delay:.45s!important} .d4{transition-delay:.6s!important}
          .d5{transition-delay:.75s!important}

          /* ── FIRE GLOW ── */
          @keyframes fireGlow {
            0%,100% { text-shadow:0 0 20px rgba(232,169,74,0.4),0 0 60px rgba(196,98,45,0.2); }
            50%      { text-shadow:0 0 40px rgba(232,169,74,0.8),0 0 80px rgba(196,98,45,0.4); }
          }
          .fire-glow { animation:fireGlow 3s ease-in-out infinite; }

          /* ── LINE DRAW ── */
          @keyframes lineDraw { from{width:0} to{width:100%} }
          .line-draw.in-view { animation:lineDraw 1.6s cubic-bezier(0.16,1,0.3,1) forwards; }
          .line-draw { width:0; height:1px; background:linear-gradient(90deg,#E8A94A,rgba(232,169,74,0.1)); }

          /* ── PROCESS LINE ── */
          @keyframes processLine { from{transform:scaleY(0)} to{transform:scaleY(1)} }
          .process-line { transform-origin:top; animation:processLine 1.5s cubic-bezier(0.16,1,0.3,1) .3s forwards; }

          /* ── SCROLL BOUNCE ── */
          @keyframes scrollBounce {
            0%,100% { transform:scaleY(1); opacity:1; }
            50%      { transform:scaleY(0.6); opacity:0.4; }
          }

          /* ── EMBER PULSE ── */
          @keyframes emberPulse {
            0%,100% { box-shadow:0 0 20px rgba(196,98,45,0.3); }
            50%      { box-shadow:0 0 60px rgba(232,169,74,0.6),0 0 100px rgba(196,98,45,0.3); }
          }
          .ember-pulse { animation:emberPulse 4s ease-in-out infinite; }

          /* ══ SECTION SWEEP LINE ══ */
          .section-sweep {
            position:relative;
            overflow:hidden;
          }
          .section-sweep::before {
            content:'';
            position:absolute;
            top:0; left:-100%; right:100%; height:1px;
            background:linear-gradient(90deg,transparent,rgba(232,169,74,0.6),transparent);
            z-index:10;
            transition:left 1.8s cubic-bezier(0.76,0,0.24,1), right 1.8s cubic-bezier(0.76,0,0.24,1);
          }
          .section-sweep.in-view::before {
            left:0; right:0;
          }

          /* ── NAV ── */
          .nav-link { color:rgba(255,255,255,0.4); text-decoration:none; font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase; transition:color .2s; }
          .nav-link:hover { color:#E8A94A; }

          /* ── CAROUSEL ── */
          .carousel-card { cursor:pointer; transition:transform .6s cubic-bezier(0.16,1,0.3,1), opacity .6s ease; }

          /* ── SCROLLBAR ── */
          ::-webkit-scrollbar { width:3px; }
          ::-webkit-scrollbar-track { background:#050302; }
          ::-webkit-scrollbar-thumb { background:#E8A94A; }

          @media(max-width:768px) {
            .hide-mobile { display:none !important; }
            .stats-row { grid-template-columns:1fr 1fr !important; }
            .process-layout { flex-direction:column !important; }
            .split-layout { flex-direction:column !important; }
          }
        `}</style>

        {/* ── CANVAS ÉTINCELLES ── */}
        <canvas ref={canvasRef} style={{ position:"fixed",inset:0,zIndex:1,pointerEvents:"none",mixBlendMode:"screen" }} />

        {/* ══════════════════════════════════
            NAV
        ══════════════════════════════════ */}
        <nav style={{
          position:"fixed",top:0,left:0,right:0,zIndex:100,
          padding:"0 48px",height:"72px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          background:"linear-gradient(to bottom,rgba(5,3,2,0.9),transparent)",
        }}>
          <div style={{ display:"flex",alignItems:"center",gap:"12px" }}>
            <div style={{ width:"34px",height:"34px",border:"1px solid rgba(232,169,74,0.5)",display:"flex",alignItems:"center",justifyContent:"center",transform:"rotate(45deg)" }}>
              <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:"#E8A94A",transform:"rotate(-45deg)",display:"block" }}>F</span>
            </div>
            <div>
              <div style={{ fontSize:"0.58rem",fontWeight:600,letterSpacing:"0.3em",color:"#fff" }}>FORGE DAMPIERRE</div>
              <div style={{ fontSize:"0.44rem",color:"rgba(232,169,74,0.6)",letterSpacing:"0.2em",marginTop:"1px" }}>COUTELIER ARTISAN · FONTAINEBLEAU</div>
            </div>
          </div>

          <div className="hide-mobile" style={{ display:"flex",gap:"32px" }}>
            {["Savoir-faire","Créations","Processus","Commande"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            ))}
          </div>

          <a href="#commande" style={{
            padding:"9px 22px",border:"1px solid rgba(232,169,74,0.4)",
            color:"#E8A94A",fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",textDecoration:"none",
            transition:"background .3s,border-color .3s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(232,169,74,0.12)"; e.currentTarget.style.borderColor="#E8A94A"; }}
          onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(232,169,74,0.4)"; }}
          >Commander</a>
        </nav>

        {/* ══════════════════════════════════
            HERO
        ══════════════════════════════════ */}
        <section style={{
          minHeight:"100dvh",position:"relative",
          display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",
          padding:"120px 10vw 80px",overflow:"hidden",
        }}>
          {/* ── VIDEO BACKGROUND ── */}
          <video
            autoPlay muted loop playsInline
            style={{
              position:"absolute",inset:0,width:"100%",height:"100%",
              objectFit:"cover",zIndex:0,
              opacity:0.55,
              filter:"saturate(0.65) brightness(0.75) contrast(1.05)",
            }}
          >
            {/* Forgeron qui frappe une lame sur l'enclume */}
            <source src="https://assets.mixkit.co/videos/13173/13173-720.mp4" type="video/mp4" />
            {/* Métal incandescent en forge */}
            <source src="https://assets.mixkit.co/videos/13163/13163-720.mp4" type="video/mp4" />
            {/* Métal liquide + vapeur industrielle */}
            <source src="https://assets.mixkit.co/videos/17024/17024-720.mp4" type="video/mp4" />
          </video>

          {/* Background radial fire (sur la vidéo) */}
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 30% 60%,rgba(196,98,45,0.18) 0%,transparent 60%)",pointerEvents:"none",zIndex:1 }} />
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"50%",background:"linear-gradient(to top,#050302 20%,transparent)",pointerEvents:"none",zIndex:2 }} />
          <div style={{ position:"absolute",inset:0,background:"rgba(5,3,2,0.25)",pointerEvents:"none",zIndex:1 }} />

          {/* Ligne verticale gauche */}
          <div style={{ position:"absolute",left:"6vw",top:"15%",bottom:"15%",width:"1px",background:"linear-gradient(to bottom,transparent,rgba(232,169,74,0.3),transparent)" }} />

          <div style={{ position:"relative",zIndex:3,maxWidth:"800px" }}>
            {/* Eyebrow */}
            <div className="reveal" style={{ display:"flex",alignItems:"center",gap:"14px",marginBottom:"36px" }}>
              <div style={{ width:"40px",height:"1px",background:"#E8A94A" }} />
              <span style={{ fontSize:"0.55rem",letterSpacing:"0.5em",color:"rgba(232,169,74,0.7)",textTransform:"uppercase" }}>Fontainebleau · Seine-et-Marne · Depuis 2001</span>
            </div>

            {/* Title — révélation ligne par ligne */}
            <h1 className="font-pl fire-glow" style={{
              fontSize:"clamp(3.5rem,9vw,9rem)",fontWeight:400,lineHeight:0.95,
              letterSpacing:"-0.02em",color:"#fff",marginBottom:"32px",fontStyle:"italic",
            }}>
              <span className="line-reveal d1" style={{ fontStyle:"normal",fontWeight:700,color:"rgba(255,255,255,0.08)",WebkitTextStroke:"1px rgba(232,169,74,0.3)",fontSize:"0.65em" }}>L&apos;ACIER</span>
              <span className="line-reveal d2">naît sous</span>
              <span className="line-reveal d3" style={{ color:"#E8A94A" }}>le feu.</span>
            </h1>

            {/* Separator */}
            <div className="wipe reveal d2" style={{ height:"1px",background:"linear-gradient(90deg,#E8A94A,transparent)",width:"200px",marginBottom:"28px" }} />

            {/* Subtitle */}
            <p className="reveal d2" style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.35)",lineHeight:1.9,marginBottom:"48px",fontWeight:300,letterSpacing:"0.04em",maxWidth:"460px" }}>
              Chaque lame est forgée à la main, pièce unique.<br />
              Aciers nobles, manches d&apos;exception.<br />
              Livraison dans 18 pays.
            </p>

            {/* CTAs */}
            <div className="reveal d3" style={{ display:"flex",gap:"16px",flexWrap:"wrap" }}>
              <a href="#creations" style={{
                padding:"16px 40px",background:"#E8A94A",color:"#050302",
                fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",textDecoration:"none",
                transition:"background .3s,box-shadow .3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background="#FFD166"; e.currentTarget.style.boxShadow="0 0 40px rgba(232,169,74,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="#E8A94A"; e.currentTarget.style.boxShadow="none"; }}
              >Voir les lames</a>
              <a href="#processus" style={{
                padding:"16px 40px",border:"1px solid rgba(232,169,74,0.35)",color:"rgba(232,169,74,0.8)",
                fontSize:"0.68rem",letterSpacing:"0.22em",textTransform:"uppercase",textDecoration:"none",
                transition:"background .3s",
              }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(232,169,74,0.08)"}
              onMouseLeave={e => e.currentTarget.style.background="transparent"}
              >La forge</a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="reveal d5" style={{ position:"absolute",bottom:"40px",right:"8vw",zIndex:3,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px" }}>
            <div style={{ width:"1px",height:"60px",background:"linear-gradient(to bottom,#E8A94A,transparent)",animation:"scrollBounce 2s ease-in-out infinite" }} />
            <span style={{ fontSize:"0.44rem",letterSpacing:"0.35em",color:"rgba(232,169,74,0.4)",textTransform:"uppercase",writingMode:"vertical-rl" }}>Défiler</span>
          </div>

          {/* Numéro de section — parallax */}
          <div ref={num01Ref} className="hide-mobile" style={{ position:"absolute",right:"5vw",top:"50%",transform:"translateY(-50%)",fontSize:"clamp(6rem,15vw,18rem)",fontWeight:700,color:"rgba(232,169,74,0.05)",fontFamily:"'Playfair Display',serif",pointerEvents:"none",userSelect:"none",zIndex:1,transition:"transform 0.1s linear",willChange:"transform" }}>
            01
          </div>
        </section>

        {/* ══════════════════════════════════
            STATS
        ══════════════════════════════════ */}
        <div ref={statsRef} style={{ borderTop:"1px solid rgba(232,169,74,0.1)",borderBottom:"1px solid rgba(232,169,74,0.1)",background:"rgba(232,169,74,0.03)",position:"relative",zIndex:5 }}>
          <div className="stats-row" style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",maxWidth:"1000px",margin:"0 auto" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ padding:"36px 20px",textAlign:"center",borderRight:i<3?"1px solid rgba(232,169,74,0.08)":"none" }}>
                <div className="snum font-pl" style={{ fontSize:"2.8rem",fontWeight:400,color:"#E8A94A",lineHeight:1,letterSpacing:"-0.02em" }}>0{s.suffix}</div>
                <div style={{ fontSize:"0.48rem",color:"rgba(255,255,255,0.3)",letterSpacing:"0.25em",textTransform:"uppercase",marginTop:"8px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
            SAVOIR-FAIRE
        ══════════════════════════════════ */}
        <section id="savoir-faire" className="section-sweep" style={{ padding:"140px 10vw",position:"relative",overflow:"hidden" }}>
          <div ref={num02Ref} className="hide-mobile" style={{ position:"absolute",right:"4vw",top:"50%",transform:"translateY(-50%)",fontSize:"clamp(6rem,15vw,18rem)",fontWeight:700,color:"rgba(232,169,74,0.04)",fontFamily:"'Playfair Display',serif",pointerEvents:"none",userSelect:"none",willChange:"transform" }}>02</div>

          <div className="split-layout" style={{ display:"flex",gap:"80px",alignItems:"center" }}>
            {/* Left */}
            <div style={{ flex:1,minWidth:0 }}>
              <p className="reveal" style={{ fontSize:"0.52rem",letterSpacing:"0.45em",color:"rgba(232,169,74,0.6)",textTransform:"uppercase",marginBottom:"20px" }}>Savoir-faire</p>
              <h2 className="font-pl" style={{ fontSize:"clamp(2.2rem,4.5vw,4rem)",fontWeight:400,fontStyle:"italic",lineHeight:1.15,letterSpacing:"-0.01em",marginBottom:"24px" }}>
                <span className="line-reveal d1">Une lame prend</span>
                <span className="line-reveal d2" style={{ color:"#E8A94A" }}>une vie entière</span>
                <span className="line-reveal d3">à maîtriser.</span>
              </h2>
              <div className="line-draw reveal d1" style={{ marginBottom:"32px" }} />
              <p className="reveal d2" style={{ fontSize:"0.88rem",color:"rgba(255,255,255,0.4)",lineHeight:2,fontWeight:300,marginBottom:"40px" }}>
                Compagnon du devoir depuis 2001, Marc Dampierre forge chaque lame
                dans son atelier de Fontainebleau. Aciers techniques, damas artisanaux,
                manches rares. Aucune série. Aucun compromis.
              </p>
              <div className="reveal d3" style={{ display:"flex",gap:"32px",flexWrap:"wrap" }}>
                {["Acier forgé à la main","Trempe contrôlée","Finition miroir"].map(t => (
                  <div key={t} style={{ display:"flex",alignItems:"center",gap:"10px" }}>
                    <div style={{ width:"4px",height:"4px",background:"#E8A94A",transform:"rotate(45deg)",flexShrink:0 }} />
                    <span style={{ fontSize:"0.68rem",color:"rgba(255,255,255,0.5)",letterSpacing:"0.08em" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visual block */}
            <div className="scale-in d2 hide-mobile" style={{ flexShrink:0,width:"420px",position:"relative" }}>
              {/* Main block */}
              <div className="ember-pulse" style={{
                width:"100%",aspectRatio:"3/4",
                background:"linear-gradient(145deg,#0a0604 0%,#2d1206 30%,#5c2810 60%,#8b4010 80%,#c4622d 100%)",
                position:"relative",overflow:"hidden",
              }}>
                {/* Overlay texture */}
                <div style={{ position:"absolute",inset:0,background:"repeating-linear-gradient(45deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)" }} />
                {/* Glow center */}
                <div style={{ position:"absolute",bottom:"-20%",left:"50%",transform:"translateX(-50%)",width:"80%",height:"60%",background:"radial-gradient(ellipse,rgba(232,169,74,0.3) 0%,transparent 70%)" }} />
                {/* Label */}
                <div style={{ position:"absolute",bottom:"24px",left:"24px",right:"24px" }}>
                  <div style={{ fontSize:"0.5rem",letterSpacing:"0.35em",color:"rgba(232,169,74,0.6)",textTransform:"uppercase",marginBottom:"8px" }}>Atelier · Fontainebleau</div>
                  <div className="font-pl" style={{ fontSize:"1.4rem",fontStyle:"italic",color:"rgba(255,255,255,0.9)" }}>La forge, c&apos;est l&apos;acier<br />qui parle à l&apos;artisan.</div>
                </div>
              </div>
              {/* Decorative offset box */}
              <div style={{ position:"absolute",top:"-16px",right:"-16px",width:"80px",height:"80px",border:"1px solid rgba(232,169,74,0.25)" }} />
              <div style={{ position:"absolute",bottom:"-16px",left:"-16px",width:"60px",height:"60px",background:"rgba(232,169,74,0.08)",border:"1px solid rgba(232,169,74,0.2)" }} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            CRÉATIONS — CAROUSEL
        ══════════════════════════════════ */}
        <section id="creations" className="section-sweep" style={{ padding:"120px 0",background:"rgba(0,0,0,0.3)",position:"relative",overflow:"hidden" }}>
          <div ref={num03Ref} className="hide-mobile" style={{ position:"absolute",left:"3vw",top:"50%",transform:"translateY(-50%)",fontSize:"clamp(6rem,15vw,18rem)",fontWeight:700,color:"rgba(232,169,74,0.04)",fontFamily:"'Playfair Display',serif",pointerEvents:"none",userSelect:"none",willChange:"transform" }}>03</div>

          <div style={{ padding:"0 10vw",marginBottom:"60px" }}>
            <p className="reveal" style={{ fontSize:"0.52rem",letterSpacing:"0.45em",color:"rgba(232,169,74,0.6)",textTransform:"uppercase",marginBottom:"20px" }}>Portfolio</p>
            <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"20px" }}>
              <h2 className="font-pl" style={{ fontSize:"clamp(2rem,4vw,3.5rem)",fontWeight:400,fontStyle:"italic",lineHeight:1.15 }}>
                <span className="line-reveal d1">Pièces uniques,</span>
                <span className="line-reveal d2" style={{ color:"#E8A94A" }}>âmes singulières.</span>
              </h2>
              <div className="reveal d2" style={{ display:"flex",gap:"12px" }}>
                <button onClick={prev} disabled={carouselIdx===0} style={{
                  width:"48px",height:"48px",border:"1px solid rgba(232,169,74,0.3)",background:"transparent",
                  color:carouselIdx===0?"rgba(232,169,74,0.2)":"#E8A94A",cursor:carouselIdx===0?"default":"pointer",
                  fontSize:"1.2rem",transition:"all .2s",
                }} onMouseEnter={e=>{ if(carouselIdx>0) e.currentTarget.style.background="rgba(232,169,74,0.1)"; }} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>‹</button>
                <button onClick={next} disabled={carouselIdx===CREATIONS.length-1} style={{
                  width:"48px",height:"48px",border:"1px solid rgba(232,169,74,0.3)",background:"transparent",
                  color:carouselIdx===CREATIONS.length-1?"rgba(232,169,74,0.2)":"#E8A94A",cursor:carouselIdx===CREATIONS.length-1?"default":"pointer",
                  fontSize:"1.2rem",transition:"all .2s",
                }} onMouseEnter={e=>{ if(carouselIdx<CREATIONS.length-1) e.currentTarget.style.background="rgba(232,169,74,0.1)"; }} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>›</button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div style={{ display:"flex",gap:"20px",padding:"0 10vw",transition:"transform .7s cubic-bezier(0.16,1,0.3,1)" }}>
            {CREATIONS.map((c, i) => {
              const dist = Math.abs(i - carouselIdx);
              return (
                <div
                  key={i}
                  className="carousel-card scale-in"
                  onClick={() => setCarouselIdx(i)}
                  style={{
                    flexShrink:0,
                    width: dist === 0 ? "340px" : dist === 1 ? "280px" : "200px",
                    opacity: dist === 0 ? 1 : dist === 1 ? 0.55 : 0.25,
                    transform: dist === 0 ? "scale(1)" : `scale(${1 - dist * 0.06})`,
                  }}
                >
                  {/* Visual */}
                  <div style={{ aspectRatio:"2/3",background:c.gradient,position:"relative",overflow:"hidden",marginBottom:"16px" }}>
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(5,3,2,0.8) 0%,transparent 50%)" }} />
                    {dist === 0 && (
                      <div style={{ position:"absolute",bottom:"20px",left:"20px",right:"20px" }}>
                        <div className="font-pl" style={{ fontSize:"1.3rem",fontStyle:"italic",color:"#fff",marginBottom:"4px" }}>{c.nom}</div>
                        <div style={{ fontSize:"0.5rem",color:"rgba(232,169,74,0.7)",letterSpacing:"0.15em" }}>{c.matiere}</div>
                      </div>
                    )}
                    {/* Corner accent */}
                    <div style={{ position:"absolute",top:"12px",right:"12px",width:"20px",height:"20px",borderTop:"1px solid rgba(232,169,74,0.4)",borderRight:"1px solid rgba(232,169,74,0.4)" }} />
                  </div>
                  {dist === 0 && (
                    <div>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px" }}>
                        <span style={{ fontSize:"0.62rem",color:"rgba(255,255,255,0.5)",letterSpacing:"0.08em" }}>Manche</span>
                        <span style={{ fontSize:"0.62rem",color:"rgba(255,255,255,0.5)",letterSpacing:"0.08em" }}>Longueur</span>
                      </div>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                        <span style={{ fontSize:"0.75rem",color:"#E8A94A" }}>{c.manche}</span>
                        <span style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.8)",fontFamily:"'Playfair Display',serif" }}>{c.lg}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dots */}
          <div style={{ display:"flex",gap:"8px",justifyContent:"center",marginTop:"40px" }}>
            {CREATIONS.map((_,i) => (
              <div key={i} onClick={() => setCarouselIdx(i)} style={{
                width: i===carouselIdx ? "24px" : "6px", height:"6px",
                background: i===carouselIdx ? "#E8A94A" : "rgba(232,169,74,0.2)",
                transition:"width .4s cubic-bezier(0.16,1,0.3,1),background .4s",
                cursor:"pointer",
              }} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            PROCESSUS
        ══════════════════════════════════ */}
        <section id="processus" className="section-sweep" style={{ padding:"140px 10vw",position:"relative" }}>
          <div ref={num04Ref} className="hide-mobile" style={{ position:"absolute",right:"3vw",top:"50%",transform:"translateY(-50%)",fontSize:"clamp(6rem,15vw,18rem)",fontWeight:700,color:"rgba(232,169,74,0.04)",fontFamily:"'Playfair Display',serif",pointerEvents:"none",userSelect:"none",willChange:"transform" }}>04</div>

          <p className="reveal" style={{ fontSize:"0.52rem",letterSpacing:"0.45em",color:"rgba(232,169,74,0.6)",textTransform:"uppercase",marginBottom:"20px" }}>Processus</p>
          <h2 className="font-pl" style={{ fontSize:"clamp(2rem,4vw,3.5rem)",fontWeight:400,fontStyle:"italic",marginBottom:"80px",lineHeight:1.15 }}>
            <span className="line-reveal d1">De la forge</span>
            <span className="line-reveal d2" style={{ color:"#E8A94A" }}>à la main.</span>
          </h2>

          <div className="process-layout" style={{ display:"flex",gap:"48px" }}>
            {/* Steps nav */}
            <div style={{ display:"flex",flexDirection:"column",gap:"0",width:"220px",flexShrink:0 }}>
              {PROCESS.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setActiveProcess(i)}
                  style={{
                    padding:"20px 24px",cursor:"pointer",
                    borderLeft:`2px solid ${i===activeProcess ? "#E8A94A" : "rgba(232,169,74,0.1)"}`,
                    background: i===activeProcess ? "rgba(232,169,74,0.06)" : "transparent",
                    transition:"all .4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div style={{ fontSize:"0.48rem",letterSpacing:"0.3em",color:i===activeProcess?"#E8A94A":"rgba(255,255,255,0.2)",marginBottom:"4px",textTransform:"uppercase" }}>{p.num}</div>
                  <div style={{ fontSize:"0.8rem",color:i===activeProcess?"#fff":"rgba(255,255,255,0.35)",fontWeight:500,transition:"color .4s" }}>{p.titre}</div>
                </div>
              ))}
            </div>

            {/* Content */}
            <div style={{ flex:1,padding:"24px 0" }}>
              <div style={{
                fontSize:"clamp(3rem,8vw,7rem)",fontFamily:"'Playfair Display',serif",
                fontWeight:700,color:"rgba(232,169,74,0.06)",lineHeight:1,marginBottom:"-20px",
                transition:"all .6s cubic-bezier(0.16,1,0.3,1)",
              }}>
                {PROCESS[activeProcess].num}
              </div>
              <h3 className="font-pl" style={{ fontSize:"2.2rem",fontWeight:400,fontStyle:"italic",color:"#fff",marginBottom:"24px",transition:"all .6s" }}>
                {PROCESS[activeProcess].titre}
              </h3>
              <div style={{ width:"48px",height:"1px",background:"#E8A94A",marginBottom:"24px" }} />
              <p style={{ fontSize:"0.92rem",color:"rgba(255,255,255,0.45)",lineHeight:2,fontWeight:300,maxWidth:"500px",transition:"all .6s" }}>
                {PROCESS[activeProcess].texte}
              </p>
              {/* Temperature indicator */}
              {activeProcess === 1 && (
                <div style={{ marginTop:"32px",display:"flex",alignItems:"center",gap:"16px" }}>
                  <div style={{ width:"60px",height:"2px",background:"linear-gradient(90deg,#C4622D,#E8A94A,#FFD166)" }} />
                  <span style={{ fontSize:"0.65rem",color:"rgba(232,169,74,0.6)",letterSpacing:"0.15em" }}>950°C · Chaude orange</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            MATIÈRES
        ══════════════════════════════════ */}
        <section className="section-sweep" style={{ padding:"100px 10vw",background:"rgba(0,0,0,0.4)",borderTop:"1px solid rgba(232,169,74,0.06)" }}>
          <p className="reveal" style={{ fontSize:"0.52rem",letterSpacing:"0.45em",color:"rgba(232,169,74,0.6)",textTransform:"uppercase",marginBottom:"20px" }}>Matériaux</p>
          <h2 className="font-pl" style={{ fontSize:"clamp(2rem,4vw,3.5rem)",fontWeight:400,fontStyle:"italic",marginBottom:"60px",lineHeight:1.15 }}>
            <span className="line-reveal d1">L&apos;acier choisit</span>
            <span className="line-reveal d2" style={{ color:"#E8A94A" }}>son artisan.</span>
          </h2>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"2px" }}>
            {[
              { nom:"Damas artisanal",desc:"256 couches pliées",couleur:"linear-gradient(135deg,#2d1206,#8b4010,#c4622d)" },
              { nom:"XC75 Carbone",desc:"Dureté 62 HRC",couleur:"linear-gradient(135deg,#0a0a0a,#1a1a1a,#333)" },
              { nom:"N690 Inox",desc:"Résistance à la corrosion",couleur:"linear-gradient(135deg,#0a1a2d,#1a3a5c,#2d6080)" },
              { nom:"Acier Böhler",desc:"Tenue de tranchant",couleur:"linear-gradient(135deg,#1a1206,#3d2810,#6b4020)" },
            ].map((m,i) => (
              <div key={i} className={`scale-in d${i+1}`} style={{ position:"relative",overflow:"hidden" }}
                onMouseEnter={e => { const el = e.currentTarget.querySelector<HTMLElement>(".mat-overlay"); if(el) el.style.opacity="1"; }}
                onMouseLeave={e => { const el = e.currentTarget.querySelector<HTMLElement>(".mat-overlay"); if(el) el.style.opacity="0"; }}
              >
                <div style={{ height:"200px",background:m.couleur,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"20px" }}>
                  <div style={{ fontSize:"0.85rem",fontWeight:600,color:"#fff",marginBottom:"4px" }}>{m.nom}</div>
                  <div style={{ fontSize:"0.55rem",color:"rgba(232,169,74,0.6)",letterSpacing:"0.15em",textTransform:"uppercase" }}>{m.desc}</div>
                </div>
                <div className="mat-overlay" style={{ position:"absolute",inset:0,border:"1px solid rgba(232,169,74,0.5)",opacity:0,transition:"opacity .3s",pointerEvents:"none" }} />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════
            COMMANDE — CTA
        ══════════════════════════════════ */}
        <section id="commande" style={{ padding:"160px 10vw",position:"relative",overflow:"hidden",textAlign:"center" }}>
          {/* Glow */}
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 60% at 50% 50%,rgba(196,98,45,0.1) 0%,transparent 65%)",pointerEvents:"none" }} />
          <div style={{ position:"absolute",top:0,left:"20%",right:"20%",height:"1px",background:"linear-gradient(90deg,transparent,rgba(232,169,74,0.4),transparent)" }} />

          <div style={{ position:"relative",zIndex:1 }}>
            <p className="reveal" style={{ fontSize:"0.52rem",letterSpacing:"0.45em",color:"rgba(232,169,74,0.6)",textTransform:"uppercase",marginBottom:"24px" }}>Pièce sur commande</p>
            <h2 className="font-pl fire-glow" style={{ fontSize:"clamp(2.5rem,6vw,5.5rem)",fontWeight:400,fontStyle:"italic",lineHeight:1.15,marginBottom:"24px" }}>
              <span className="line-reveal d1">Votre lame vous</span>
              <span className="line-reveal d2">attend dans l&apos;acier.</span>
            </h2>
            <div style={{ width:"60px",height:"1px",background:"linear-gradient(90deg,transparent,#E8A94A,transparent)",margin:"0 auto 32px" }} />
            <p className="reveal d2" style={{ fontSize:"0.85rem",color:"rgba(255,255,255,0.35)",lineHeight:2,marginBottom:"56px",fontWeight:300,maxWidth:"480px",margin:"0 auto 56px" }}>
              Délai de fabrication : 6 à 14 semaines.<br />
              Acompte 30% à la commande. Livraison mondiale.<br />
              Chaque pièce livrée avec certificat d&apos;authenticité.
            </p>

            <div className="reveal d3" style={{ display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap" }}>
              <a href="https://wa.me/33600000000" target="_blank" rel="noopener noreferrer" style={{
                padding:"18px 48px",background:"#E8A94A",color:"#050302",
                fontSize:"0.68rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",textDecoration:"none",
                transition:"all .3s",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#FFD166"; e.currentTarget.style.boxShadow="0 0 50px rgba(232,169,74,0.4)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#E8A94A"; e.currentTarget.style.boxShadow="none"; }}
              >Commander une lame</a>
              <a href="mailto:contact@forgedampierre.fr" style={{
                padding:"18px 48px",border:"1px solid rgba(232,169,74,0.35)",
                color:"rgba(232,169,74,0.8)",fontSize:"0.68rem",letterSpacing:"0.22em",textTransform:"uppercase",textDecoration:"none",
                transition:"background .3s",
              }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(232,169,74,0.08)"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >Poser une question</a>
            </div>

            <div className="reveal d4" style={{ display:"flex",gap:"40px",justifyContent:"center",marginTop:"56px",flexWrap:"wrap" }}>
              {["✦ Pièce unique garantie","✦ Livraison 18 pays","✦ Certificat d'authenticité"].map(r => (
                <span key={r} style={{ fontSize:"0.55rem",color:"rgba(232,169,74,0.35)",letterSpacing:"0.15em" }}>{r}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════
            FOOTER
        ══════════════════════════════════ */}
        <footer style={{ padding:"36px 10vw",borderTop:"1px solid rgba(232,169,74,0.08)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px",background:"#030201" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
            <div style={{ width:"26px",height:"26px",border:"1px solid rgba(232,169,74,0.3)",display:"flex",alignItems:"center",justifyContent:"center",transform:"rotate(45deg)" }}>
              <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"0.8rem",color:"#E8A94A",transform:"rotate(-45deg)",display:"block" }}>F</span>
            </div>
            <span style={{ fontSize:"0.58rem",letterSpacing:"0.22em",color:"rgba(255,255,255,0.3)" }}>FORGE DAMPIERRE · FONTAINEBLEAU 77</span>
          </div>
          <span style={{ fontSize:"0.52rem",color:"rgba(255,255,255,0.15)",letterSpacing:"0.1em" }}>© 2025 Forge Dampierre</span>
          <div style={{ display:"flex",gap:"16px",alignItems:"center" }}>
            <span style={{ fontSize:"0.5rem",color:"rgba(255,255,255,0.15)" }}>Site réalisé par</span>
            <Link href="/" style={{ fontSize:"0.58rem",color:"rgba(232,169,74,0.5)",textDecoration:"none",letterSpacing:"0.1em" }}>CC Création</Link>
          </div>
        </footer>

      </div>
    </>
  );
}
