import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Création Site Internet Melun (77) | CC Création — Devis Gratuit 24h",
  description:
    "Studio web local à Melun. Création de sites internet vitrine, restaurant, artisan à partir de 490€. Référencement local Google. Devis gratuit sous 24h.",
  keywords: [
    "création site internet Melun",
    "agence web Melun",
    "site internet Melun 77",
    "site vitrine Melun",
    "refonte site Melun",
  ],
  alternates: {
    canonical: "https://www.creationconcept.fr/creation-site-internet-melun",
  },
};

export default function PageMelun() {
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
        <a href="https://wa.me/33621235008?text=Bonjour%2C%20je%20cherche%20un%20site%20internet%20%C3%A0%20Melun." style={{ padding: "10px 24px", background: "#d4a853", color: "#060608", fontSize: "0.75rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase" }}>Devis Gratuit</a>
      </nav>

      {/* HERO */}
      <section style={{ padding: "140px 24px 80px", textAlign: "center", borderBottom: "1px solid rgba(212,168,83,0.08)", background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.06) 0%, transparent 55%)" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>Studio Web · Melun · 77000</p>
        <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 4rem)", fontWeight: 400, marginBottom: "24px", letterSpacing: "0.02em" }}>
          Création de site internet<br />
          <em style={{ color: "#d4a853" }}>à Melun</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: "580px", margin: "0 auto 48px", fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic" }}>
          Votre entreprise mérite un site qui attire des clients à Melun et dans
          tout le bassin melunais. Nous créons des sites professionnels, rapides et
          visibles sur Google — dès 490€, livrés en 7 jours.
        </p>
        <a href="https://wa.me/33621235008?text=Bonjour%2C%20je%20souhaite%20cr%C3%A9er%20un%20site%20internet%20%C3%A0%20Melun." style={{ display: "inline-block", padding: "16px 40px", background: "#d4a853", color: "#060608", fontSize: "0.8rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>
          Devis Gratuit — Réponse en 24h
        </a>
      </section>

      {/* CONTENU SEO */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, marginBottom: "32px" }}>
            Pourquoi votre entreprise de Melun<br />
            <em style={{ color: "#d4a853" }}>a besoin d&apos;un site professionnel ?</em>
          </h2>
          <div style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: "0.95rem" }}>
            <p style={{ marginBottom: "20px" }}>
              Melun, préfecture de la Seine-et-Marne, est un bassin économique dynamique avec
              une population de plus de 40 000 habitants et un tissu commercial dense. Les consommateurs
              melunais utilisent massivement Google pour trouver des prestataires locaux : plombier,
              restaurant, coiffeur, médecin, coach sportif...
            </p>
            <p style={{ marginBottom: "20px" }}>
              Sans site internet professionnel, votre entreprise est invisible pour ces clients.
              Avec un site optimisé pour les recherches locales (&quot;plombier Melun&quot;, &quot;restaurant Melun
              centre&quot;, &quot;coach Melun&quot;...), vous captez ces clients avant vos concurrents.
            </p>
            <p style={{ marginBottom: "20px" }}>
              CC Création vous propose des sites web <strong style={{ color: "#fff" }}>conçus spécifiquement pour le marché melunais</strong>.
              Nous connaissons les quartiers, la concurrence locale, les habitudes de vos clients.
              Notre objectif : vous positionner sur Google pour les requêtes de vos futurs clients à Melun.
            </p>

            <h3 style={{ color: "#fff", fontSize: "1.05rem", fontWeight: 400, marginTop: "36px", marginBottom: "14px" }}>
              Nos clients à Melun et alentours
            </h3>
            <p style={{ marginBottom: "16px" }}>
              Nous intervenons pour tous types d&apos;entreprises dans l&apos;agglomération melunaise :
            </p>
            <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
              {["Artisans (plombiers, électriciens, menuisiers, peintres)", "Restaurants, cafés, traiteurs", "Commerces de proximité", "Professions libérales (médecins, avocats, comptables)", "Coachs sportifs et thérapeutes", "Agences immobilières", "PME et sociétés de services"].map((item) => (
                <li key={item} style={{ marginBottom: "10px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ color: "#d4a853", fontSize: "0.6rem", marginTop: "6px", flexShrink: 0 }}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA CENTRAL */}
      <section style={{ padding: "60px 24px", textAlign: "center", background: "rgba(212,168,83,0.03)", border: "1px solid rgba(212,168,83,0.08)" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", fontWeight: 400, marginBottom: "20px" }}>
          Prêt à dominer Google<br />
          <em style={{ color: "#d4a853" }}>sur Melun ?</em>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "36px" }}>
          Démo gratuite en 24h · À partir de 490€ · Paiement en 2 fois
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/33621235008?text=Bonjour%2C%20je%20veux%20un%20site%20internet%20%C3%A0%20Melun." style={{ padding: "16px 36px", background: "#d4a853", color: "#060608", fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>WhatsApp</a>
          <Link href="/tarifs" style={{ padding: "16px 36px", border: "1px solid rgba(212,168,83,0.35)", color: "#d4a853", fontSize: "0.78rem", letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase" }}>Voir les tarifs</Link>
        </div>
      </section>

      {/* LIENS VILLES */}
      <section style={{ padding: "60px 24px", borderTop: "1px solid rgba(212,168,83,0.08)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>Nous intervenons aussi à</p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { name: "Meaux", href: "/creation-site-internet-meaux" },
              { name: "Fontainebleau", href: "/creation-site-internet-fontainebleau" },
              { name: "Seine-et-Marne", href: "/creation-site-internet-seine-et-marne" },
            ].map((c) => (
              <Link key={c.href} href={c.href} style={{ color: "#d4a853", fontSize: "0.8rem", letterSpacing: "0.1em", textDecoration: "none", borderBottom: "1px solid rgba(212,168,83,0.3)", paddingBottom: "2px" }}>{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "28px 24px", borderTop: "1px solid rgba(212,168,83,0.08)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ color: "#d4a853", fontSize: "0.85rem", letterSpacing: "0.22em" }}>CC</span>
          <span style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "0.22em", marginLeft: "6px" }}>CRÉATION</span>
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>© 2025 CC Création · Melun · Seine-et-Marne</span>
      </footer>
    </div>
  );
}
