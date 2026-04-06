import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Création Site Internet Fontainebleau (77) | CC Création — Devis 24h",
  description:
    "Studio web à Fontainebleau. Sites internet pour restaurants, hôtels, artisans, commerces. À partir de 490€. Référencement local Google. Devis gratuit sous 24h.",
  keywords: ["création site internet Fontainebleau", "agence web Fontainebleau", "site internet Fontainebleau 77", "site vitrine Fontainebleau"],
  alternates: { canonical: "https://creationconcept.fr/creation-site-internet-fontainebleau" },
};

export default function PageFontainebleau() {
  return (
    <div style={{ background: "#060608", color: "#fff", fontFamily: "Georgia, serif", minHeight: "100vh" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(6,6,8,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,168,83,0.08)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ color: "#d4a853", letterSpacing: "0.22em", fontSize: "1rem" }}>CC</span>
          <span style={{ color: "#fff", letterSpacing: "0.22em", fontSize: "1rem", marginLeft: "6px" }}>CRÉATION</span>
        </Link>
        <a href="https://wa.me/33600000000?text=Bonjour%2C%20je%20cherche%20un%20site%20internet%20%C3%A0%20Fontainebleau." style={{ padding: "10px 24px", background: "#d4a853", color: "#060608", fontSize: "0.75rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase" }}>Devis Gratuit</a>
      </nav>

      <section style={{ padding: "140px 24px 80px", textAlign: "center", borderBottom: "1px solid rgba(212,168,83,0.08)", background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.06) 0%, transparent 55%)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>Studio Web · Fontainebleau · 77300</p>
        <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", fontWeight: 400, marginBottom: "24px", letterSpacing: "0.02em" }}>
          Création de site internet<br />
          <em style={{ color: "#d4a853" }}>à Fontainebleau</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "600px", margin: "0 auto 48px", fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic" }}>
          Ville royale, ville touristique, ville économique. Fontainebleau attire
          des milliers de visiteurs chaque année. Votre entreprise doit être visible
          aussi bien pour les locaux que pour les touristes qui cherchent sur Google.
        </p>
        <a href="https://wa.me/33600000000?text=Bonjour%2C%20je%20souhaite%20cr%C3%A9er%20un%20site%20internet%20%C3%A0%20Fontainebleau." style={{ display: "inline-block", padding: "16px 40px", background: "#d4a853", color: "#060608", fontSize: "0.8rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>
          Devis Gratuit — 24h
        </a>
      </section>

      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, marginBottom: "32px" }}>
            Fontainebleau : un marché touristique<br />
            <em style={{ color: "#d4a853" }}>à capter sur Google</em>
          </h2>
          <div style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: "0.95rem" }}>
            <p style={{ marginBottom: "20px" }}>
              Fontainebleau accueille chaque année des centaines de milliers de visiteurs
              venus pour le Château, la forêt, et l&apos;escalade en Bouleau. Ces touristes
              cherchent sur Google : hôtels, restaurants, activités, commerces, services.
              Si votre entreprise n&apos;est pas visible sur Google, vous perdez ces clients.
            </p>
            <p style={{ marginBottom: "20px" }}>
              Mais Fontainebleau, c&apos;est aussi une ville avec un tissu économique solide :
              commerces de luxe, restaurants gastronomiques, artisans, professions libérales,
              qui servent une clientèle aisée, exigeante, habituée à la qualité.
            </p>
            <p style={{ marginBottom: "20px" }}>
              Votre site doit refléter ce positionnement premium. CC Création crée des sites
              au niveau d&apos;exigence de votre clientèle fontainebleauenne — avec le même
              soin apporté aux détails que vous apportez à votre activité.
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 400, marginTop: "36px", marginBottom: "14px" }}>
              Secteurs phares à Fontainebleau
            </h3>
            <ul style={{ paddingLeft: "20px" }}>
              {["Hôtellerie & restaurants (clientèle touristique premium)", "Commerces de centre-ville (rue Grande, place Napoléon Bonaparte)", "Activités outdoor (escalade Bouleau, randonnée forêt)", "Professions libérales (cabinet médical, avocat, notaire)", "Artisans & décoration intérieure (clientèle résidentielle aisée)"].map((item) => (
                <li key={item} style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "#d4a853", fontSize: "0.6rem", marginTop: "6px", flexShrink: 0 }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 24px", textAlign: "center", background: "rgba(212,168,83,0.03)", border: "1px solid rgba(212,168,83,0.08)" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", fontWeight: 400, marginBottom: "20px" }}>
          Un site à la hauteur<br />
          <em style={{ color: "#d4a853" }}>de Fontainebleau</em>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "36px" }}>À partir de 490€ · Démo gratuite · Réponse en 24h</p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/33600000000?text=Bonjour%2C%20je%20veux%20un%20site%20internet%20%C3%A0%20Fontainebleau." style={{ padding: "16px 36px", background: "#d4a853", color: "#060608", fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>WhatsApp</a>
          <Link href="/portfolio" style={{ padding: "16px 36px", border: "1px solid rgba(212,168,83,0.35)", color: "#d4a853", fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>Voir les démos</Link>
        </div>
      </section>

      <section style={{ padding: "48px 24px", borderTop: "1px solid rgba(212,168,83,0.08)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "16px" }}>Nous intervenons aussi à</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            {[{ name: "Melun", href: "/creation-site-internet-melun" }, { name: "Meaux", href: "/creation-site-internet-meaux" }, { name: "Seine-et-Marne (77)", href: "/creation-site-internet-seine-et-marne" }].map((c) => (
              <Link key={c.href} href={c.href} style={{ color: "#d4a853", fontSize: "0.8rem", textDecoration: "none", borderBottom: "1px solid rgba(212,168,83,0.3)", paddingBottom: "2px" }}>{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ padding: "28px 24px", borderTop: "1px solid rgba(212,168,83,0.08)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <Link href="/" style={{ textDecoration: "none" }}><span style={{ color: "#d4a853", fontSize: "0.85rem", letterSpacing: "0.22em" }}>CC</span><span style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "0.22em", marginLeft: "6px" }}>CRÉATION</span></Link>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>© 2025 CC Création · Fontainebleau · Seine-et-Marne</span>
      </footer>
    </div>
  );
}
