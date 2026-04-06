import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarifs Création Site Internet Seine-et-Marne | CC Création — Dès 490€",
  description:
    "Tarifs transparents pour la création de site internet en Seine-et-Marne. Site vitrine dès 490€, site premium dès 890€. Devis gratuit sous 24h. Pas de mauvaise surprise.",
  alternates: {
    canonical: "https://creationconcept.fr/tarifs",
  },
};

const PLANS = [
  {
    name: "Essentiel",
    price: "490€",
    unit: "TTC",
    delay: "Livré en 7 jours",
    featured: false,
    ideal: "Idéal pour : artisans, thérapeutes, freelances",
    features: [
      { label: "1 page landing complète", included: true },
      { label: "Design personnalisé à votre marque", included: true },
      { label: "Adapté mobile & tablette", included: true },
      { label: "Formulaire de contact", included: true },
      { label: "Hébergement 1 an inclus", included: true },
      { label: "SEO de base (balises, meta, vitesse)", included: true },
      { label: "Google Search Console configuré", included: true },
      { label: "Formation à la mise à jour", included: true },
      { label: "Blog intégré", included: false },
      { label: "Animations avancées", included: false },
      { label: "Support 3 mois", included: false },
    ],
    cta: "Démarrer — 490€",
    msg: "Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20plan%20Essentiel%20%C3%A0%20490%E2%82%AC.",
  },
  {
    name: "Premium",
    price: "890€",
    unit: "TTC",
    delay: "Livré en 2-3 semaines",
    featured: true,
    ideal: "Idéal pour : restaurants, pâtisseries, coachs, PME",
    features: [
      { label: "Jusqu'à 5 pages", included: true },
      { label: "Design sur mesure avec animations", included: true },
      { label: "Adapté mobile & tablette", included: true },
      { label: "Formulaire de contact + WhatsApp", included: true },
      { label: "Hébergement 1 an inclus", included: true },
      { label: "SEO avancé + mots-clés locaux", included: true },
      { label: "Google Search Console + Analytics", included: true },
      { label: "Formation complète", included: true },
      { label: "Blog intégré", included: true },
      { label: "Animations scroll & hover", included: true },
      { label: "Support prioritaire 3 mois", included: true },
    ],
    cta: "Démarrer — 890€",
    msg: "Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20plan%20Premium%20%C3%A0%20890%E2%82%AC.",
  },
  {
    name: "Sur Mesure",
    price: "Devis",
    unit: "gratuit",
    delay: "Délai selon projet",
    featured: false,
    ideal: "Idéal pour : e-commerce, plateformes, projets complexes",
    features: [
      { label: "Pages illimitées", included: true },
      { label: "E-commerce / boutique en ligne", included: true },
      { label: "Intégrations API & outils tiers", included: true },
      { label: "Back-office personnalisé", included: true },
      { label: "Hébergement premium inclus", included: true },
      { label: "Stratégie SEO complète", included: true },
      { label: "Tableau de bord Analytics avancé", included: true },
      { label: "Formation équipe", included: true },
      { label: "Blog + espace membres", included: true },
      { label: "Animations & expériences uniques", included: true },
      { label: "Support dédié mensuel", included: true },
    ],
    cta: "Demander un devis",
    msg: "Bonjour%2C%20j%27ai%20un%20projet%20complexe%20et%20je%20souhaite%20un%20devis%20personnalis%C3%A9.",
  },
];

const FAQS = [
  {
    q: "Y a-t-il des frais cachés ?",
    a: "Non. Le prix affiché est le prix final TTC. L'hébergement 1 an est inclus. Après la première année, le renouvellement d'hébergement est de 15€/mois — vous en êtes informé à l'avance.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "50% à la commande, 50% à la livraison. Vous ne payez jamais 100% à l'avance. Si vous n'êtes pas satisfait de la démo initiale, vous êtes remboursé intégralement.",
  },
  {
    q: "Que comprend exactement l'hébergement inclus ?",
    a: "Nom de domaine (.fr ou .com) + hébergement haute performance sur nos serveurs Vercel pour 1 an. Vitesse de chargement inférieure à 1 seconde garantie.",
  },
  {
    q: "Puis-je mettre à jour mon site moi-même ?",
    a: "Oui. Tous nos sites incluent une formation à la gestion du contenu. Vous pouvez modifier vos textes, vos photos, votre menu, vos prix — sans coder.",
  },
];

export default function PageTarifs() {
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
          href="https://wa.me/33621235008?text=Bonjour%2C%20je%20souhaite%20un%20devis."
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
        padding: "140px 24px 80px",
        textAlign: "center",
        borderBottom: "1px solid rgba(212,168,83,0.08)",
        background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.06) 0%, transparent 55%)",
      }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>
          Transparence totale
        </p>
        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)", fontWeight: 400, marginBottom: "20px", letterSpacing: "0.02em" }}>
          Des tarifs clairs,<br />
          <em style={{ color: "#d4a853" }}>sans mauvaise surprise</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", maxWidth: "520px", margin: "0 auto", fontSize: "1rem", lineHeight: 1.8, fontStyle: "italic" }}>
          Nous sommes le seul studio web de Seine-et-Marne à afficher ses prix.
          Parce que vous méritez de savoir ce que vous achetez avant de vous engager.
        </p>
      </section>

      {/* PRICING */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2px" }}>
            {PLANS.map((plan) => (
              <div key={plan.name} style={{
                padding: "44px 36px",
                border: plan.featured ? "1px solid #d4a853" : "1px solid rgba(212,168,83,0.15)",
                background: plan.featured ? "rgba(212,168,83,0.04)" : "rgba(255,255,255,0.01)",
                position: "relative",
                display: "flex", flexDirection: "column",
              }}>
                {plan.featured && (
                  <div style={{
                    position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)",
                    background: "#d4a853", color: "#060608",
                    padding: "5px 22px", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>
                    ✦ Le plus populaire
                  </div>
                )}

                <div style={{ marginBottom: "auto" }}>
                  <h2 style={{ fontSize: "0.72rem", letterSpacing: "0.35em", color: "#d4a853", textTransform: "uppercase", marginBottom: "20px" }}>
                    {plan.name}
                  </h2>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "6px" }}>
                    <span style={{ fontSize: "clamp(2.4rem, 5vw, 3.2rem)", fontWeight: 400 }}>{plan.price}</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>{plan.unit}</span>
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#d4a853", letterSpacing: "0.12em", marginBottom: "8px" }}>{plan.delay}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em", fontStyle: "italic", marginBottom: "36px" }}>
                    {plan.ideal}
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{
                        padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                        fontSize: "0.875rem",
                        display: "flex", alignItems: "center", gap: "12px",
                        color: f.included ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
                      }}>
                        <span style={{
                          color: f.included ? "#d4a853" : "rgba(255,255,255,0.15)",
                          fontSize: "0.6rem", flexShrink: 0,
                        }}>
                          {f.included ? "◆" : "○"}
                        </span>
                        {f.label}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/33621235008?text=${plan.msg}`}
                  style={{
                    display: "block", textAlign: "center",
                    padding: "16px 24px",
                    background: plan.featured ? "#d4a853" : "transparent",
                    border: plan.featured ? "1px solid #d4a853" : "1px solid rgba(212,168,83,0.35)",
                    color: plan.featured ? "#060608" : "#d4a853",
                    fontSize: "0.75rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase",
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIES */}
      <section style={{
        padding: "60px 24px",
        background: "rgba(212,168,83,0.03)",
        borderTop: "1px solid rgba(212,168,83,0.08)",
        borderBottom: "1px solid rgba(212,168,83,0.08)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 400, marginBottom: "48px" }}>
            Nos <em style={{ color: "#d4a853" }}>garanties</em>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2px" }}>
            {[
              { icon: "◆", title: "Démo avant engagement", desc: "Vous voyez votre site avant de payer." },
              { icon: "◆", title: "Paiement en 2 fois", desc: "50% au départ, 50% à la livraison." },
              { icon: "◆", title: "Livraison garantie", desc: "Délai contractuel respecté ou remboursé." },
              { icon: "◆", title: "Révisions illimitées", desc: "Jusqu'à validation complète." },
            ].map((g) => (
              <div key={g.title} style={{ padding: "28px 24px", border: "1px solid rgba(212,168,83,0.08)", textAlign: "center" }}>
                <div style={{ color: "#d4a853", marginBottom: "12px" }}>{g.icon}</div>
                <div style={{ fontSize: "0.9rem", marginBottom: "8px", letterSpacing: "0.04em" }}>{g.title}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{g.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400, marginBottom: "48px" }}>
            Questions sur nos <em style={{ color: "#d4a853" }}>tarifs</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {FAQS.map((f, i) => (
              <details key={i} style={{ border: "1px solid rgba(212,168,83,0.1)", background: "rgba(255,255,255,0.01)" }}>
                <summary style={{
                  padding: "20px 24px", cursor: "pointer",
                  fontSize: "0.95rem", color: "#fff",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px",
                  listStyle: "none",
                }}>
                  <span>{f.q}</span>
                  <span style={{ color: "#d4a853", flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: "0 24px 20px", fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 24px", textAlign: "center",
        background: "radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 60%)",
        borderTop: "1px solid rgba(212,168,83,0.08)",
      }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "20px" }}>
          Commençons votre<br />
          <em style={{ color: "#d4a853" }}>projet dès aujourd&apos;hui</em>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginBottom: "40px" }}>
          Devis gratuit · Réponse en 24h · Aucun engagement
        </p>
        <a
          href="https://wa.me/33621235008?text=Bonjour%2C%20je%20veux%20cr%C3%A9er%20mon%20site%20internet."
          style={{
            display: "inline-block", padding: "18px 44px",
            background: "#d4a853", color: "#060608",
            fontSize: "0.82rem", letterSpacing: "0.2em", textDecoration: "none", textTransform: "uppercase",
          }}
        >
          WhatsApp — Réponse immédiate
        </a>
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
          <Link href="/creation-site-internet-seine-et-marne" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.1em", textDecoration: "none" }}>Seine-et-Marne</Link>
          <Link href="/portfolio" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.1em", textDecoration: "none" }}>Portfolio</Link>
        </div>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.7rem" }}>© 2025 CC Création</span>
      </footer>

    </div>
  );
}
