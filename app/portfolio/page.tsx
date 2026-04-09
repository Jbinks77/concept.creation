import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio — Nos Créations Web | CC Création Seine-et-Marne",
  description:
    "Découvrez nos réalisations web : sites pour pâtisseries, coachs sportifs, artisans. Démos interactives à tester sur votre mobile. Studio web Seine-et-Marne.",
  alternates: {
    canonical: "https://www.creationconcept.fr/portfolio",
  },
};

const PROJECTS = [
  {
    href: "/demo-patisserie2",
    category: "Pâtisserie · Luxe",
    title: "Maison Dorée — Scroll Animé",
    description:
      "Expérience immersive scroll-driven pour une pâtisserie artisanale. La vidéo avance au rythme du scroll. Quatre scènes narratives. CTA WhatsApp intégré. Design inspiré des grandes maisons parisiennes.",
    tech: ["Next.js", "Vidéo scrubbing", "CSS animations", "Mobile-first"],
    tag: "Premium",
    color: "#d4a853",
    img: "/card-patisserie.jpg",
  },
  {
    href: "/demo-patisserie",
    category: "Artisan · Vitrine",
    title: "Maison Dorée — Site Vitrine",
    description:
      "Site vitrine classique avec hero vidéo plein écran. Format universel applicable à tous les artisans et commerçants. Chargement optimisé, animations subtiles, call-to-action efficace.",
    tech: ["Next.js", "Vidéo hero", "SEO optimisé", "Responsive"],
    tag: "Essentiel",
    color: "#c8a96e",
    img: "/card-archi.jpg",
  },
  {
    href: "/demo-coach",
    category: "Coach Sportif · Impact",
    title: "Coach Sportif Pro",
    description:
      "Site haute-intensité pour coach sportif. Impact visuel maximal, vidéo immersive, typographie Bold. Présentation des programmes, résultats clients, prise de rendez-vous WhatsApp directe.",
    tech: ["Next.js", "Vidéo scrubbing", "Dark theme", "WhatsApp CTA"],
    tag: "Premium",
    color: "#3b82f6",
    img: "/card-coach.jpg",
  },
];

const STATS = [
  { n: "< 1s", label: "Temps de chargement" },
  { n: "100", label: "Score PageSpeed mobile" },
  { n: "100%", label: "Mobile-first" },
  { n: "A+", label: "Score SEO technique" },
];

export default function PagePortfolio() {
  return (
    <div style={{ background: "#060608", color: "#fff", fontFamily: "Georgia, serif", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "rgba(6,6,8,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(212,168,83,0.08)",
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ color: "#d4a853", letterSpacing: "0.22em", fontSize: "1rem" }}>CC</span>
          <span style={{ color: "#fff", letterSpacing: "0.22em", fontSize: "1rem", marginLeft: "6px" }}>CRÉATION</span>
        </Link>
        <a
          href="https://wa.me/33621235008?text=Bonjour%2C%20j%27ai%20vu%20votre%20portfolio%20et%20je%20voudrais%20un%20devis."
          style={{
            padding: "10px 24px", background: "#d4a853", color: "#060608",
            fontSize: "0.75rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase",
          }}
        >
          Devis Gratuit
        </a>
      </nav>

      {/* HERO */}
      <section style={{
        padding: "140px 24px 80px", textAlign: "center",
        borderBottom: "1px solid rgba(212,168,83,0.08)",
        background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.06) 0%, transparent 55%)",
      }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>
          Nos réalisations
        </p>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)", fontWeight: 400, marginBottom: "20px", letterSpacing: "0.02em" }}>
          Des sites qui<br />
          <em style={{ color: "#d4a853" }}>convertissent vraiment</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: "560px", margin: "0 auto 48px", fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic" }}>
          Chaque démo ci-dessous est un vrai site, navigable sur mobile.
          Ce n&apos;est pas une image — c&apos;est votre futur site, en mieux.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
          {STATS.map((s) => (
            <div key={s.n} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", color: "#d4a853" }}>{s.n}</div>
              <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2px" }}>
          {PROJECTS.map((p, i) => (
            <div key={p.href} style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
              gap: "0",
              border: "1px solid rgba(212,168,83,0.12)",
              overflow: "hidden",
            }}>
              {/* Image */}
              <div style={{
                order: i % 2 === 0 ? 0 : 1,
                minHeight: "360px",
                background: `url(${p.img}) center/cover no-repeat`,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(${i % 2 === 0 ? "to right" : "to left"}, rgba(6,6,8,0.3) 0%, transparent 50%)`,
                }} />
                <div style={{
                  position: "absolute", inset: 0, display: "flex", alignItems: "flex-end",
                  padding: "24px",
                }}>
                  <span style={{
                    background: p.color, color: p.color === "#3b82f6" ? "#fff" : "#060608",
                    padding: "5px 14px", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  }}>
                    {p.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div style={{
                order: i % 2 === 0 ? 1 : 0,
                padding: "48px 44px",
                background: "rgba(255,255,255,0.01)",
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.35em", color: p.color, textTransform: "uppercase", marginBottom: "12px" }}>
                  {p.category}
                </p>
                <h2 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 400, marginBottom: "20px", letterSpacing: "0.03em" }}>
                  {p.title}
                </h2>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: "28px" }}>
                  {p.description}
                </p>

                {/* Tech tags */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{
                      padding: "4px 12px",
                      border: "1px solid rgba(212,168,83,0.2)",
                      fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)",
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={p.href}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    padding: "14px 28px",
                    border: `1px solid ${p.color}`,
                    color: p.color,
                    fontSize: "0.72rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase",
                    width: "fit-content",
                  }}
                >
                  Voir la démo →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VOTRE SECTEUR */}
      <section style={{
        padding: "80px 24px",
        background: "rgba(212,168,83,0.03)",
        borderTop: "1px solid rgba(212,168,83,0.08)",
        borderBottom: "1px solid rgba(212,168,83,0.08)",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>
            Votre secteur n&apos;est pas listé ?
          </p>
          <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", fontWeight: 400, marginBottom: "20px" }}>
            Nous créons des sites pour<br />
            <em style={{ color: "#d4a853" }}>tous les secteurs d&apos;activité</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: "40px", fontSize: "0.95rem" }}>
            Boulangerie, cabinet médical, garage, salon de coiffure, agence immobilière,
            association, traiteur, photographe, architecte, électricien... Peu importe
            votre activité, nous créons une démo adaptée à votre métier en 24h.
          </p>
          <a
            href="https://wa.me/33621235008?text=Bonjour%2C%20je%20travaille%20dans%20[votre%20secteur]%20et%20j%27aimerais%20voir%20une%20d%C3%A9mo%20pour%20mon%20site."
            style={{
              display: "inline-block", padding: "16px 36px",
              background: "#d4a853", color: "#060608",
              fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
            }}
          >
            Demander une démo personnalisée
          </a>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "16px" }}>
          Votre site pourrait<br />
          <em style={{ color: "#d4a853" }}>être ici</em>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic", marginBottom: "36px" }}>
          Démo gratuite · Réponse en 24h · Aucun engagement
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/33621235008?text=Bonjour%2C%20j%27ai%20vu%20le%20portfolio%20et%20je%20voudrais%20une%20d%C3%A9mo%20pour%20mon%20site."
            style={{
              padding: "16px 36px", background: "#d4a853", color: "#060608",
              fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
            }}
          >
            Démo gratuite — WhatsApp
          </a>
          <Link
            href="/tarifs"
            style={{
              padding: "16px 36px",
              border: "1px solid rgba(212,168,83,0.35)", color: "#d4a853",
              fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
            }}
          >
            Voir les tarifs
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "32px 24px", borderTop: "1px solid rgba(212,168,83,0.08)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ color: "#d4a853", fontSize: "0.85rem", letterSpacing: "0.22em" }}>CC</span>
          <span style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "0.22em", marginLeft: "6px" }}>CRÉATION</span>
        </Link>
        <div style={{ display: "flex", gap: "20px" }}>
          <Link href="/creation-site-internet-seine-et-marne" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", textDecoration: "none" }}>Seine-et-Marne</Link>
          <Link href="/tarifs" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", textDecoration: "none" }}>Tarifs</Link>
        </div>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>© 2025 CC Création</span>
      </footer>

    </div>
  );
}
