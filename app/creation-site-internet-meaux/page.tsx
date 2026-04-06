import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Création Site Internet Meaux (77) | CC Création — Devis Gratuit 24h",
  description:
    "Studio web à Meaux. Sites internet vitrine, restaurant, artisan à partir de 490€. Référencement local Google Meaux. Devis gratuit sous 24h.",
  keywords: ["création site internet Meaux", "agence web Meaux", "site internet Meaux 77", "site vitrine Meaux"],
  alternates: { canonical: "https://creationconcept.fr/creation-site-internet-meaux" },
};

export default function PageMeaux() {
  return (
    <div style={{ background: "#060608", color: "#fff", fontFamily: "Georgia, serif", minHeight: "100vh" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(6,6,8,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,168,83,0.08)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ color: "#d4a853", letterSpacing: "0.22em", fontSize: "1rem" }}>CC</span>
          <span style={{ color: "#fff", letterSpacing: "0.22em", fontSize: "1rem", marginLeft: "6px" }}>CRÉATION</span>
        </Link>
        <a href="https://wa.me/33600000000?text=Bonjour%2C%20je%20cherche%20un%20site%20internet%20%C3%A0%20Meaux." style={{ padding: "10px 24px", background: "#d4a853", color: "#060608", fontSize: "0.75rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase" }}>Devis Gratuit</a>
      </nav>

      <section style={{ padding: "140px 24px 80px", textAlign: "center", borderBottom: "1px solid rgba(212,168,83,0.08)", background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.06) 0%, transparent 55%)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>Studio Web · Meaux · 77100</p>
        <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", fontWeight: 400, marginBottom: "24px", letterSpacing: "0.02em" }}>
          Création de site internet<br />
          <em style={{ color: "#d4a853" }}>à Meaux</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "580px", margin: "0 auto 48px", fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic" }}>
          Meaux, deuxième ville de Seine-et-Marne, mérite des entreprises visibles sur Google.
          Nous créons des sites professionnels adaptés au marché briard — dès 490€, livrés en 7 jours.
        </p>
        <a href="https://wa.me/33600000000?text=Bonjour%2C%20je%20souhaite%20cr%C3%A9er%20un%20site%20internet%20%C3%A0%20Meaux." style={{ display: "inline-block", padding: "16px 40px", background: "#d4a853", color: "#060608", fontSize: "0.8rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>
          Devis Gratuit — 24h
        </a>
      </section>

      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, marginBottom: "32px" }}>
            Le marché web à Meaux :<br />
            <em style={{ color: "#d4a853" }}>une opportunité à saisir</em>
          </h2>
          <div style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: "0.95rem" }}>
            <p style={{ marginBottom: "20px" }}>
              Avec plus de 55 000 habitants, Meaux est la deuxième ville de Seine-et-Marne.
              Son tissu économique est varié : commerces de la rue piétonne, restaurants, artisans,
              professions libérales, PME industrielles. La ville est en plein développement avec
              l&apos;arrivée du Grand Paris Express qui va considérablement augmenter la population.
            </p>
            <p style={{ marginBottom: "20px" }}>
              C&apos;est le moment idéal pour investir dans votre présence numérique à Meaux.
              Les entreprises qui s&apos;installent sur Google maintenant capteront les clients
              qui arriveront avec le Grand Paris Express dans les prochaines années.
            </p>
            <p style={{ marginBottom: "20px" }}>
              Notre approche : nous analysons les recherches Google spécifiques à Meaux,
              identifions les mots-clés les moins concurrencés, et construisons votre site
              pour vous positionner dessus rapidement.
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 400, marginTop: "36px", marginBottom: "14px" }}>
              Zones couvertes autour de Meaux
            </h3>
            <p>
              Nous créons des sites pour les entreprises de Meaux et ses communes voisines :
              Nanteuil-lès-Meaux, Trilport, Isles-lès-Meldeuses, Saint-Soupplets, Dammartin-en-Goële,
              Claye-Souilly, et tout le pays de Meaux.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 24px", textAlign: "center", background: "rgba(212,168,83,0.03)", border: "1px solid rgba(212,168,83,0.08)" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", fontWeight: 400, marginBottom: "20px" }}>
          Visible sur Google Meaux<br />
          <em style={{ color: "#d4a853" }}>dès le premier mois</em>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "36px" }}>À partir de 490€ · Paiement en 2 fois · Démo gratuite</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/33600000000?text=Bonjour%2C%20je%20veux%20un%20site%20internet%20%C3%A0%20Meaux." style={{ padding: "16px 36px", background: "#d4a853", color: "#060608", fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>WhatsApp</a>
          <Link href="/tarifs" style={{ padding: "16px 36px", border: "1px solid rgba(212,168,83,0.35)", color: "#d4a853", fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>Voir les tarifs</Link>
        </div>
      </section>

      <section style={{ padding: "48px 24px", borderTop: "1px solid rgba(212,168,83,0.08)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Nous intervenons aussi à</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            {[{ name: "Melun", href: "/creation-site-internet-melun" }, { name: "Fontainebleau", href: "/creation-site-internet-fontainebleau" }, { name: "Seine-et-Marne (77)", href: "/creation-site-internet-seine-et-marne" }].map((c) => (
              <Link key={c.href} href={c.href} style={{ color: "#d4a853", fontSize: "0.8rem", textDecoration: "none", borderBottom: "1px solid rgba(212,168,83,0.3)", paddingBottom: "2px" }}>{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: "28px 24px", borderTop: "1px solid rgba(212,168,83,0.08)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <Link href="/" style={{ textDecoration: "none" }}><span style={{ color: "#d4a853", fontSize: "0.85rem", letterSpacing: "0.22em" }}>CC</span><span style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "0.22em", marginLeft: "6px" }}>CRÉATION</span></Link>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>© 2025 CC Création · Meaux · Seine-et-Marne</span>
      </footer>
    </div>
  );
}
