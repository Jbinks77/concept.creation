"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PRODUITS = [
  {
    nom: "Tarte Infiniment Citron",
    prix: "7,50 €",
    desc: "Crème citron de Menton, meringue italienne flambée, zestes confits.",
    tag: "Signature",
    img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=85",
  },
  {
    nom: "Éclair Grand Cru",
    prix: "6,80 €",
    desc: "Ganache pure origine Madagascar 75%, pâte à choux croustillante.",
    tag: "Best-seller",
    img: "https://images.unsplash.com/photo-1702993041651-7d5d0a43cd97?w=600&q=85",
  },
  {
    nom: "Paris-Brest Noisette",
    prix: "8,20 €",
    desc: "Praliné feuilletine, crème mousseline noisette du Piémont.",
    tag: "Tradition",
    img: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&q=85",
  },
  {
    nom: "Mille-Feuille Vanille",
    prix: "7,80 €",
    desc: "Pâte feuilletée inversée, crème diplomate vanille de Tahiti.",
    tag: "Classique",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=85",
  },
  {
    nom: "Macaron Framboise",
    prix: "3,20 €",
    desc: "Ganache framboise fraîche, cœur de confiture artisanale.",
    tag: "Incontournable",
    img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=85",
  },
  {
    nom: "Entremets Chocolat",
    prix: "9,50 €",
    desc: "Mousse Valrhona Guanaja, insert caramel beurre salé, glaçage miroir.",
    tag: "Prestige",
    img: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&q=85",
  },
];

export default function DemoPatisserie() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "translateY(0)";
      }
    }, 200);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#0a0704", minHeight: "100vh", color: "#fff", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "68px", display: "flex", alignItems: "center", padding: "0 40px",
        justifyContent: "space-between",
        background: scrolled ? "rgba(8,5,3,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,168,83,0.12)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", letterSpacing: "0.22em", color: "#d4a853", fontWeight: 400 }}>MAISON</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", letterSpacing: "0.22em", color: "#fff", fontWeight: 400, marginTop: "-4px" }}>DORÉE</span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "36px", position: "absolute", left: "50%", transform: "translateX(-50%)" }}
          className="nav-links-desktop">
          {["La Maison", "Créations", "Commander", "Contact"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase().replace("é","e").replace(" ","-"))}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Times New Roman', Georgia, serif", fontSize: "0.78rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", transition: "color 0.2s ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d4a853")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >{l}</button>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => scrollTo("commander")}
            className="nav-cta-desktop"
            style={{ padding: "9px 22px", borderRadius: "0", border: "1px solid rgba(212,168,83,0.5)", background: "transparent", color: "#d4a853", fontFamily: "Georgia, serif", fontSize: "0.72rem", letterSpacing: "0.18em", cursor: "pointer", textTransform: "uppercase", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#d4a853"; e.currentTarget.style.color = "#0a0704"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d4a853"; }}
          >Commander</button>

          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)}
            style={{ display: "none", flexDirection: "column", gap: "5px", background: "none", border: "1px solid rgba(212,168,83,0.3)", borderRadius: "6px", padding: "8px 10px", cursor: "pointer" }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: "18px", height: "1px", background: "#d4a853",
                transition: "all 0.3s ease",
                transform: menuOpen && i === 0 ? "translateY(6px) rotate(45deg)" : menuOpen && i === 2 ? "translateY(-6px) rotate(-45deg)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="nav-mobile-menu" style={{
        position: "fixed", top: "68px", left: 0, right: 0, zIndex: 99,
        background: "rgba(8,5,3,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212,168,83,0.1)",
        padding: "24px 32px 32px",
        display: "flex", flexDirection: "column", gap: "4px",
        transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
        opacity: menuOpen ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
        pointerEvents: menuOpen ? "auto" : "none",
      }}>
        {["La Maison", "Créations", "Commander", "Contact"].map((l, i, arr) => (
          <button key={l} onClick={() => scrollTo(l.toLowerCase().replace("é","e").replace(" ","-"))}
            style={{ background: "none", border: "none", borderBottom: i < arr.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "1rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", textAlign: "left", padding: "14px 0", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#d4a853")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          >{l}</button>
        ))}
        <button onClick={() => scrollTo("commander")} style={{ marginTop: "16px", padding: "13px", border: "1px solid #d4a853", background: "transparent", color: "#d4a853", fontFamily: "Georgia, serif", fontSize: "0.85rem", letterSpacing: "0.15em", cursor: "pointer", textTransform: "uppercase" }}>
          Commander en ligne
        </button>
      </div>

      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100svh", overflow: "hidden" }}>
        <Image src="/card-patisserie.jpg" alt="Maison Dorée" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />

        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,3,1,0.55) 0%, rgba(5,3,1,0.2) 40%, rgba(5,3,1,0.75) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,3,1,0.4) 100%)" }} />

        {/* Hero content */}
        <div ref={titleRef} style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px",
          opacity: 0, transform: "translateY(24px)",
          transition: "opacity 1.2s ease, transform 1.2s cubic-bezier(0.22,1,0.36,1)",
        }}>
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, rgba(212,168,83,0.6))", marginBottom: "28px" }} />

          <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.6rem,1.5vw,0.75rem)", letterSpacing: "0.55em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>
            Artisan Pâtissier · Paris 6e · Depuis 1987
          </div>

          <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(3rem,8vw,7rem)", color: "#fff", lineHeight: 0.95, letterSpacing: "0.04em", marginBottom: "28px" }}>
            Maison<br />
            <em style={{ color: "#d4a853", fontStyle: "italic" }}>Dorée</em>
          </h1>

          <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "clamp(0.85rem,2vw,1.1rem)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", marginBottom: "44px", maxWidth: "480px", lineHeight: 1.7 }}>
            L'art de la pâtisserie française portée<br />à son plus haut niveau d'exigence.
          </p>

          <button
            onClick={() => scrollTo("créations")}
            style={{
              padding: "15px 40px", border: "1px solid rgba(212,168,83,0.6)", background: "transparent",
              color: "#d4a853", fontFamily: "Georgia, serif", fontSize: "0.75rem", letterSpacing: "0.25em",
              cursor: "pointer", textTransform: "uppercase", transition: "all 0.4s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#d4a853"; e.currentTarget.style.color = "#0a0704"; e.currentTarget.style.borderColor = "#d4a853"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d4a853"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.6)"; }}
          >
            Découvrir nos créations
          </button>

          <div style={{ width: "1px", height: "60px", background: "linear-gradient(to top, transparent, rgba(212,168,83,0.4))", marginTop: "44px" }} />
        </div>
      </section>

      {/* ── LA MAISON ── */}
      <section id="la-maison" style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,168,83,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
          className="cards-grid">
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>Notre histoire</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", lineHeight: 1.15, marginBottom: "28px", letterSpacing: "0.02em" }}>
              Une passion<br /><em style={{ color: "rgba(255,255,255,0.35)" }}>transmise</em><br />depuis 1987.
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#d4a853", marginBottom: "28px", opacity: 0.6 }} />
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginBottom: "20px" }}>
              Fondée par Jean-Pierre Moreau, Meilleur Ouvrier de France 1994, la Maison Dorée perpétue l'excellence de la pâtisserie française dans un écrin discret du 6e arrondissement.
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.85 }}>
              Chaque pièce est façonnée à la main, avec des ingrédients sélectionnés aux quatre coins du monde — vanille de Tahiti, chocolat Valrhona, noisettes du Piémont.
            </p>
          </div>

          <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: "2px", overflow: "hidden" }}>
            <Image src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=85" alt="Artisan pâtissier" fill style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,7,4,0.6) 0%, transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: "20px", left: "20px", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
              Jean-Pierre Moreau, M.O.F. 1994
            </div>
          </div>
        </div>

        {/* Chiffres */}
        <div style={{ maxWidth: "960px", margin: "80px auto 0", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
          {[["37", "Ans d'excellence"], ["4", "Récompenses nationales"], ["120", "Créations par saison"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center", padding: "40px 20px", border: "1px solid rgba(212,168,83,0.1)" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "3rem", fontWeight: 400, color: "#d4a853", letterSpacing: "-0.02em", lineHeight: 1 }}>{v}</div>
              <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginTop: "8px", letterSpacing: "0.08em" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CRÉATIONS ── */}
      <section id="créations" style={{ padding: "100px 24px 120px", background: "#070503" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "0.62rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "16px" }}>Saison Printemps 2025</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "0.03em" }}>
              Nos <em style={{ color: "rgba(255,255,255,0.3)" }}>créations</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px,1fr))", gap: "2px" }}>
            {PRODUITS.map(p => (
              <ProduitCard key={p.nom} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMANDER ── */}
      <section id="commander" style={{ padding: "120px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/card-patisserie.jpg" alt="bg" fill style={{ objectFit: "cover", opacity: 0.15 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a0704 0%, rgba(10,7,4,0.7) 50%, #0a0704 100%)" }} />
        </div>

        <div style={{ position: "relative", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, rgba(212,168,83,0.5))", margin: "0 auto 32px" }} />
          <div style={{ fontFamily: "Georgia, serif", fontSize: "0.62rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>Commander</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: "clamp(2rem,5vw,3.8rem)", color: "#fff", lineHeight: 1.1, marginBottom: "20px" }}>
            Réservez vos<br /><em style={{ color: "rgba(255,255,255,0.3)" }}>pâtisseries</em>
          </h2>
          <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "48px" }}>
            Commandes en ligne disponibles 7j/7.<br />Retrait en boutique ou livraison à domicile<br />dans tout Paris (8h–20h).
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+33142345678" style={{
              padding: "15px 36px", border: "1px solid #d4a853", background: "#d4a853",
              color: "#0a0704", fontFamily: "Georgia, serif", fontSize: "0.78rem", letterSpacing: "0.2em",
              cursor: "pointer", textTransform: "uppercase", textDecoration: "none", display: "inline-block",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#d4a853"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#d4a853"; (e.currentTarget as HTMLAnchorElement).style.color = "#0a0704"; }}
            >
              01 42 34 56 78
            </a>
            <a href="mailto:bonjour@maisondoree.fr" style={{
              padding: "15px 36px", border: "1px solid rgba(212,168,83,0.35)", background: "transparent",
              color: "rgba(212,168,83,0.7)", fontFamily: "Georgia, serif", fontSize: "0.78rem", letterSpacing: "0.2em",
              cursor: "pointer", textTransform: "uppercase", textDecoration: "none", display: "inline-block",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#d4a853"; (e.currentTarget as HTMLAnchorElement).style.color = "#d4a853"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(212,168,83,0.35)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(212,168,83,0.7)"; }}
            >
              Commande en ligne
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" style={{ borderTop: "1px solid rgba(212,168,83,0.1)", padding: "48px 32px", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", letterSpacing: "0.22em", color: "#d4a853" }}>MAISON DORÉE</div>
          <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginTop: "4px" }}>12 rue de Buci, Paris 6e · Ouvert mar–dim 9h–19h</div>
        </div>
        <div style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.7rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} Maison Dorée · Tous droits réservés
        </div>
      </footer>

      {/* Bandeau "Site démo" discret */}
      <div style={{
        position: "fixed", bottom: "20px", right: "20px", zIndex: 200,
        background: "rgba(5,7,16,0.9)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(59,130,246,0.3)", borderRadius: "100px",
        padding: "8px 18px",
        fontFamily: "system-ui, sans-serif", fontSize: "0.7rem",
        color: "rgba(255,255,255,0.5)",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6", animation: "pulse 2s infinite" }} />
        Maquette réalisée par{" "}
        <a href="https://conceptcreation.chagnat.fr" target="_blank" style={{ color: "rgba(59,130,246,0.8)", textDecoration: "none", fontWeight: 600 }}>
          CC Création
        </a>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function ProduitCard({ nom, prix, desc, tag, img }: typeof PRODUITS[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => { if (ref.current) ref.current.style.borderColor = "rgba(212,168,83,0.3)"; if (imgRef.current) imgRef.current.style.transform = "scale(1.07)"; }}
      onMouseLeave={() => { if (ref.current) ref.current.style.borderColor = "rgba(255,255,255,0.05)"; if (imgRef.current) imgRef.current.style.transform = "scale(1)"; }}
      style={{ border: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", overflow: "hidden", transition: "border-color 0.4s ease" }}
    >
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
        <div ref={imgRef} style={{ position: "absolute", inset: 0, transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1)" }}>
          <Image src={img} alt={nom} fill style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 33vw" />
        </div>
        <div style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(10,7,4,0.75)", backdropFilter: "blur(6px)", border: "1px solid rgba(212,168,83,0.25)", padding: "4px 12px", fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.68rem", color: "#d4a853", letterSpacing: "0.06em" }}>{tag}</div>
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#fff", letterSpacing: "0.02em" }}>{nom}</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: "#d4a853" }}>{prix}</span>
        </div>
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.65 }}>{desc}</p>
      </div>
    </div>
  );
}
