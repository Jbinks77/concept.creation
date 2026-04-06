import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Création Site Internet Seine-et-Marne (77) | CC Création — Devis Gratuit",
  description:
    "Studio web local en Seine-et-Marne. Création de sites internet vitrines, restaurants, artisans à partir de 490€. Voyez votre site avant de signer. Devis gratuit sous 24h.",
  keywords: [
    "création site internet Seine-et-Marne",
    "agence web 77",
    "site internet Melun",
    "création site web Seine-et-Marne",
    "site vitrine artisan 77",
    "refonte site internet Seine-et-Marne",
  ],
  alternates: {
    canonical: "https://creationconcept.fr/creation-site-internet-seine-et-marne",
  },
  openGraph: {
    title: "Création Site Internet Seine-et-Marne | CC Création",
    description: "Studio web local — devis gratuit sous 24h. À partir de 490€.",
    url: "https://creationconcept.fr/creation-site-internet-seine-et-marne",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    q: "Combien coûte la création d'un site internet en Seine-et-Marne ?",
    a: "Nos tarifs démarrent à 490€ pour un site vitrine essentiel (1 page, livré en 7 jours). Un site professionnel complet avec animations et référencement est à 890€. Pour des projets sur mesure (e-commerce, intégrations spécifiques), nous établissons un devis personnalisé. Tous nos prix sont affichés en toute transparence sur notre page tarifs.",
  },
  {
    q: "Combien de temps faut-il pour créer mon site internet ?",
    a: "Un site essentiel est livré en 7 jours ouvrés. Un site professionnel prend 2 à 3 semaines selon la complexité. La particularité de CC Création : vous voyez une démo de votre site avant même de valider le projet — aucune mauvaise surprise.",
  },
  {
    q: "Pourquoi choisir un studio local en Seine-et-Marne plutôt qu'une grande agence parisienne ?",
    a: "Un studio local connaît votre marché, vos clients, votre concurrence locale. Vous avez un interlocuteur unique, disponible, qui comprend les enjeux d'une PME ou d'un artisan du 77. Les grandes agences parisiennes facturent le même projet 3 à 5 fois plus cher avec beaucoup moins d'attention.",
  },
  {
    q: "Avec quels types d'entreprises travaillez-vous ?",
    a: "Artisans, commerçants, restaurants, pâtisseries, coachs sportifs, consultants, professions libérales, PME locales... Toute entreprise en Seine-et-Marne qui a besoin d'une présence web professionnelle pour attirer des clients.",
  },
  {
    q: "Mon site sera-t-il optimisé pour Google (SEO) ?",
    a: "Oui. Tous nos sites incluent l'optimisation SEO de base : balises meta, structure H1/H2, vitesse de chargement, mobile-first, Google Search Console configuré. Le plan Premium inclut en plus une stratégie de mots-clés locaux pour vous positionner sur votre zone géographique.",
  },
  {
    q: "Est-ce que mon site fonctionnera sur mobile et tablette ?",
    a: "Absolument. Tous nos sites sont développés en mobile-first — le design est conçu d'abord pour smartphone, puis adapté aux grands écrans. Plus de 60% des visites web se font sur mobile en 2025.",
  },
  {
    q: "Pouvez-vous refaire mon site existant ?",
    a: "C'est même notre spécialité. Nous analysons votre site actuel, identifions ce qui freine vos conversions, et créons un nouveau site qui convertit réellement. Nous pouvons aussi vous montrer une maquette de la refonte avant de commencer.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "50% à la commande, 50% à la livraison. Nous n'encaissons jamais 100% à l'avance — votre investissement est sécurisé. Paiement par virement bancaire ou CB.",
  },
];

const CITIES = [
  { name: "Melun", slug: "melun", desc: "Préfecture de Seine-et-Marne" },
  { name: "Meaux", slug: "meaux", desc: "2ème ville du département" },
  { name: "Fontainebleau", slug: "fontainebleau", desc: "Ville royale du 77" },
  { name: "Chelles", slug: "chelles", desc: "Commune de l'Est parisien" },
  { name: "Lagny-sur-Marne", slug: "lagny-sur-marne", desc: "Bassin économique dynamique" },
  { name: "Montereau-Fault-Yonne", slug: "montereau", desc: "Confluent Seine-Yonne" },
  { name: "Dammarie-les-Lys", slug: "dammarie-les-lys", desc: "Agglomération melunaise" },
  { name: "Savigny-le-Temple", slug: "savigny-le-temple", desc: "Grand Melun Seine" },
];

const SERVICES = [
  {
    icon: "◈",
    title: "Site Vitrine Artisan",
    desc: "Plombier, électricien, menuisier, peintre... Un site professionnel qui génère des appels entrants dans les 30 premiers jours.",
  },
  {
    icon: "◉",
    title: "Site Restaurant & Pâtisserie",
    desc: "Menu en ligne, photos de vos créations, réservation WhatsApp. Les clients trouvent votre restaurant avant vos concurrents.",
  },
  {
    icon: "◈",
    title: "Site Coach Sportif",
    desc: "Présentez vos programmes, vos résultats, vos témoignages. Attirez des clients qui cherchent un coach dans votre ville.",
  },
  {
    icon: "◉",
    title: "Site Professionnel Liberal",
    desc: "Médecin, avocat, comptable, consultant... Une présence digitale qui inspire confiance et rassure avant le premier contact.",
  },
  {
    icon: "◈",
    title: "Refonte de Site Existant",
    desc: "Votre site actuel ne convertit pas ? Nous l'analysons, identifions les blocages, et livrons une version qui performe.",
  },
  {
    icon: "◉",
    title: "Site E-commerce",
    desc: "Boutique en ligne complète avec paiement sécurisé, gestion des stocks, et optimisation pour Google Shopping.",
  },
];

const PROCESS = [
  { n: "01", title: "Démo en 24h", desc: "Vous parlez de votre projet. Nous vous montrons une maquette de votre futur site le lendemain. Aucun engagement." },
  { n: "02", title: "Validation", desc: "Vous validez la direction créative. Ajustements illimités jusqu'à ce que ce soit parfait. Vous payez 50% seulement." },
  { n: "03", title: "Développement", desc: "Votre site est développé avec les dernières technologies web. Rapide, sécurisé, optimisé SEO, mobile-first." },
  { n: "04", title: "Mise en ligne", desc: "Votre site est publié. Formation incluse pour le gérer. Support réactif inclus les 3 premiers mois." },
];

export default function PagePilierSeineMarne() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Création de site internet en Seine-et-Marne",
    "provider": {
      "@type": "LocalBusiness",
      "name": "CC Création",
      "url": "https://creationconcept.fr",
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Seine-et-Marne",
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Site Essentiel",
        "price": "490",
        "priceCurrency": "EUR",
      },
      {
        "@type": "Offer",
        "name": "Site Premium",
        "price": "890",
        "priceCurrency": "EUR",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div style={{ background: "#060608", color: "#fff", fontFamily: "Georgia, serif", minHeight: "100vh" }}>

        {/* ── NAV ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "18px 40px", display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(6,6,8,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212,168,83,0.08)",
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "1rem", letterSpacing: "0.22em", color: "#d4a853" }}>CC</span>
            <span style={{ fontFamily: "Georgia, serif", fontSize: "1rem", letterSpacing: "0.22em", color: "#fff", marginLeft: "6px" }}>CRÉATION</span>
          </Link>
          <a
            href="https://wa.me/33621235008?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20mon%20site%20internet."
            style={{
              padding: "10px 24px",
              background: "#d4a853", color: "#060608",
              fontFamily: "Georgia, serif", fontSize: "0.75rem",
              letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase",
            }}
          >
            Devis Gratuit
          </a>
        </nav>

        {/* ── HERO ── */}
        <section style={{
          paddingTop: "140px", paddingBottom: "100px",
          textAlign: "center", padding: "140px 24px 100px",
          background: "radial-gradient(ellipse at 50% 40%, rgba(212,168,83,0.07) 0%, transparent 60%)",
          borderBottom: "1px solid rgba(212,168,83,0.08)",
        }}>
          <p style={{
            fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853",
            textTransform: "uppercase", marginBottom: "24px",
          }}>
            Studio Web · Seine-et-Marne (77) · Depuis 2023
          </p>
          <h1 style={{
            fontSize: "clamp(2.2rem, 6vw, 4.8rem)", fontWeight: 400,
            lineHeight: 1.05, letterSpacing: "0.02em",
            marginBottom: "28px", maxWidth: "900px", margin: "0 auto 28px",
          }}>
            Création de site internet<br />
            <em style={{ color: "#d4a853", fontStyle: "italic" }}>en Seine-et-Marne</em>
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.55)",
            maxWidth: "620px", margin: "0 auto 48px", lineHeight: 1.8,
            fontStyle: "italic",
          }}>
            Le seul studio web du 77 qui vous montre votre futur site<br />
            avant même que vous ne signiez quoi que ce soit.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/33621235008?text=Bonjour%2C%20je%20souhaite%20un%20devis%20gratuit."
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 36px", background: "#d4a853", color: "#060608",
                fontFamily: "Georgia, serif", fontSize: "0.8rem",
                letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
              }}
            >
              Devis Gratuit — 24h
            </a>
            <a
              href="#demos"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "16px 36px",
                border: "1px solid rgba(212,168,83,0.4)", color: "#d4a853",
                background: "transparent",
                fontFamily: "Georgia, serif", fontSize: "0.8rem",
                letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
              }}
            >
              Voir les démos ↓
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "60px", marginTop: "80px",
            flexWrap: "wrap",
          }}>
            {[
              { n: "490€", l: "À partir de" },
              { n: "7j", l: "Délai de livraison" },
              { n: "100%", l: "Mobile-first" },
              { n: "24h", l: "Réponse garantie" },
            ].map((s) => (
              <div key={s.n} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", color: "#d4a853", fontWeight: 400, letterSpacing: "0.05em" }}>{s.n}</div>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: "6px" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INTRO TEXTE ── */}
        <section style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px" }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", fontWeight: 400,
            marginBottom: "32px", letterSpacing: "0.02em",
          }}>
            Pourquoi votre entreprise de Seine-et-Marne<br />
            <em style={{ color: "#d4a853" }}>mérite mieux qu&apos;un site générique</em>
          </h2>
          <div style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.9, fontSize: "1rem" }}>
            <p style={{ marginBottom: "20px" }}>
              En Seine-et-Marne, des milliers d&apos;artisans, commerçants et entrepreneurs ont un site internet
              qui n&apos;attire aucun client. Soit parce qu&apos;il est invisible sur Google, soit parce qu&apos;il n&apos;inspire
              pas confiance, soit parce qu&apos;il n&apos;est pas adapté au mobile.
            </p>
            <p style={{ marginBottom: "20px" }}>
              Le résultat ? Des clients potentiels qui cherchent vos services sur Google et qui finissent chez
              votre concurrent — parce que son site était simplement plus professionnel, plus rapide, plus rassurant.
            </p>
            <p style={{ marginBottom: "20px" }}>
              CC Création est un studio web implanté en Seine-et-Marne. Nous créons des sites qui <strong style={{ color: "#fff" }}>convertissent
              réellement</strong> : des visiteurs anonymes en clients qui appellent, qui réservent, qui achètent.
            </p>
            <p>
              Notre différence ? Avant même de vous demander un centime, nous vous montrons à quoi ressemblera
              votre site. Une démo live, navigable, que vous pouvez tester sur votre téléphone.
              Vous voyez, vous validez, vous signez — ou pas, c&apos;est vous qui décidez.
            </p>
          </div>
        </section>

        {/* ── DÉMOS ── */}
        <section id="demos" style={{
          padding: "80px 24px",
          background: "rgba(212,168,83,0.03)",
          borderTop: "1px solid rgba(212,168,83,0.08)",
          borderBottom: "1px solid rgba(212,168,83,0.08)",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "16px" }}>
                Exemples réels
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 400, letterSpacing: "0.02em" }}>
                Nos Créations pour les<br />
                <em style={{ color: "#d4a853" }}>entreprises du 77</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "16px", fontSize: "0.9rem", fontStyle: "italic" }}>
                Cliquez sur chaque démo — ce sont de vrais sites naviguables, pas des images.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {[
                {
                  href: "/demo-patisserie2",
                  img: "/card-patisserie.jpg",
                  cat: "Pâtisserie · Restauration",
                  title: "Maison Dorée",
                  desc: "Site scroll-animé pour une pâtisserie artisanale parisienne. Vidéo immersive, textures luxueuses, CTA WhatsApp.",
                  tag: "Scroll-animé",
                },
                {
                  href: "/demo-coach",
                  img: "/card-coach.jpg",
                  cat: "Coach Sportif · Bien-être",
                  title: "Coach Sportif Pro",
                  desc: "Site impact pour coach en salle ou à domicile. Présentation des programmes, résultats clients, prise de RDV directe.",
                  tag: "High-impact",
                },
                {
                  href: "/demo-patisserie",
                  img: "/card-archi.jpg",
                  cat: "Artisan · Vitrine",
                  title: "Site Vitrine Classic",
                  desc: "Site vitrine élégant avec hero vidéo. Format parfait pour artisans, commerçants, professions libérales.",
                  tag: "Vitrine",
                },
              ].map((demo) => (
                <Link
                  key={demo.href}
                  href={demo.href}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <article style={{
                    border: "1px solid rgba(212,168,83,0.12)",
                    background: "rgba(255,255,255,0.02)",
                    overflow: "hidden",
                    transition: "border-color 0.3s",
                  }}>
                    <div style={{
                      height: "220px",
                      background: `url(${demo.img}) center/cover no-repeat`,
                      position: "relative",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to bottom, transparent 50%, rgba(6,6,8,0.85) 100%)",
                      }} />
                      <span style={{
                        position: "absolute", top: "14px", right: "14px",
                        background: "#d4a853", color: "#060608",
                        padding: "4px 12px", fontSize: "0.6rem",
                        letterSpacing: "0.18em", textTransform: "uppercase",
                        fontFamily: "Georgia, serif",
                      }}>
                        {demo.tag}
                      </span>
                    </div>
                    <div style={{ padding: "24px 28px 28px" }}>
                      <p style={{ fontSize: "0.62rem", letterSpacing: "0.3em", color: "#d4a853", textTransform: "uppercase", marginBottom: "8px" }}>
                        {demo.cat}
                      </p>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 400, marginBottom: "12px", letterSpacing: "0.05em" }}>
                        {demo.title}
                      </h3>
                      <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
                        {demo.desc}
                      </p>
                      <p style={{ marginTop: "20px", fontSize: "0.72rem", letterSpacing: "0.2em", color: "#d4a853", textTransform: "uppercase" }}>
                        Voir la démo →
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "16px" }}>
                Nos expertises
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 400 }}>
                Un site adapté à<br />
                <em style={{ color: "#d4a853" }}>votre activité</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px" }}>
              {SERVICES.map((s, i) => (
                <div key={i} style={{
                  padding: "32px 28px",
                  background: i % 2 === 0 ? "rgba(212,168,83,0.03)" : "rgba(255,255,255,0.01)",
                  border: "1px solid rgba(212,168,83,0.08)",
                }}>
                  <div style={{ fontSize: "1.2rem", color: "#d4a853", marginBottom: "16px" }}>{s.icon}</div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: "12px", letterSpacing: "0.04em" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section style={{
          padding: "80px 24px",
          background: "rgba(212,168,83,0.03)",
          borderTop: "1px solid rgba(212,168,83,0.08)",
          borderBottom: "1px solid rgba(212,168,83,0.08)",
        }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "16px" }}>
                Comment ça marche
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 400 }}>
                De votre idée à votre site<br />
                <em style={{ color: "#d4a853" }}>en 4 étapes</em>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px" }}>
              {PROCESS.map((step) => (
                <div key={step.n} style={{ textAlign: "center" }}>
                  <div style={{
                    width: "56px", height: "56px", border: "1px solid #d4a853",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: "0.72rem", letterSpacing: "0.1em", color: "#d4a853",
                  }}>
                    {step.n}
                  </div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 400, marginBottom: "12px" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="tarifs" style={{ padding: "80px 24px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "16px" }}>
                Transparence totale
              </p>
              <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 400 }}>
                Nos Tarifs<br />
                <em style={{ color: "#d4a853" }}>sans mauvaise surprise</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "16px", fontSize: "0.9rem", fontStyle: "italic" }}>
                Contrairement à la plupart des agences web, nous affichons nos prix.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px" }}>
              {[
                {
                  name: "Essentiel",
                  price: "490€",
                  delay: "7 jours",
                  featured: false,
                  features: [
                    "1 page complète (landing page)",
                    "Design personnalisé",
                    "Optimisé mobile",
                    "Formulaire de contact",
                    "Hébergement 1 an inclus",
                    "SEO de base",
                    "Livraison en 7 jours",
                  ],
                },
                {
                  name: "Premium",
                  price: "890€",
                  delay: "2-3 semaines",
                  featured: true,
                  features: [
                    "Jusqu&apos;à 5 pages",
                    "Animations & effets visuels",
                    "SEO avancé + Search Console",
                    "Blog intégré",
                    "Google Analytics",
                    "Hébergement 1 an inclus",
                    "Support 3 mois inclus",
                    "Formation à la gestion",
                  ],
                },
                {
                  name: "Sur Mesure",
                  price: "Sur devis",
                  delay: "Variable",
                  featured: false,
                  features: [
                    "E-commerce / boutique en ligne",
                    "Intégrations API tierces",
                    "Back-office personnalisé",
                    "Design haut de gamme",
                    "SEO complet + stratégie",
                    "Maintenance mensuelle",
                    "Support dédié prioritaire",
                  ],
                },
              ].map((plan) => (
                <div
                  key={plan.name}
                  style={{
                    padding: "40px 32px",
                    border: plan.featured ? "1px solid #d4a853" : "1px solid rgba(212,168,83,0.15)",
                    background: plan.featured ? "rgba(212,168,83,0.05)" : "rgba(255,255,255,0.01)",
                    position: "relative",
                  }}
                >
                  {plan.featured && (
                    <div style={{
                      position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
                      background: "#d4a853", color: "#060608",
                      padding: "4px 20px", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}>
                      Le plus populaire
                    </div>
                  )}
                  <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#d4a853", marginBottom: "16px" }}>
                    {plan.name}
                  </h3>
                  <div style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 400, marginBottom: "6px" }}>
                    {plan.price}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "32px" }}>
                    Livraison : {plan.delay}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px" }}>
                    {plan.features.map((f, fi) => (
                      <li key={fi} style={{
                        padding: "8px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        fontSize: "0.875rem", color: "rgba(255,255,255,0.65)",
                        display: "flex", alignItems: "center", gap: "10px",
                      }}>
                        <span style={{ color: "#d4a853", fontSize: "0.6rem" }}>◆</span>
                        <span dangerouslySetInnerHTML={{ __html: f }} />
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/33621235008?text=Bonjour%2C%20je%20souhaite%20le%20plan%20${plan.name}%20pour%20mon%20site.`}
                    style={{
                      display: "block", textAlign: "center",
                      padding: "14px 24px",
                      background: plan.featured ? "#d4a853" : "transparent",
                      border: plan.featured ? "1px solid #d4a853" : "1px solid rgba(212,168,83,0.4)",
                      color: plan.featured ? "#060608" : "#d4a853",
                      fontFamily: "Georgia, serif", fontSize: "0.72rem",
                      letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
                    }}
                  >
                    {plan.price === "Sur devis" ? "Demander un devis" : "Démarrer ce plan"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ZONES D'INTERVENTION ── */}
        <section style={{
          padding: "80px 24px",
          background: "rgba(212,168,83,0.03)",
          borderTop: "1px solid rgba(212,168,83,0.08)",
        }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "16px" }}>
                Présence locale
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", fontWeight: 400 }}>
                Nous intervenons dans<br />
                <em style={{ color: "#d4a853" }}>tout le département 77</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "16px", fontSize: "0.9rem", lineHeight: 1.7, fontStyle: "italic", maxWidth: "600px", margin: "16px auto 0" }}>
                Studio basé en Seine-et-Marne, nous accompagnons les entreprises locales
                de Melun à Meaux, de Fontainebleau à Chelles — et partout entre les deux.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2px" }}>
              {CITIES.map((city) => (
                <div key={city.slug} style={{
                  padding: "20px 24px",
                  border: "1px solid rgba(212,168,83,0.08)",
                  background: "rgba(255,255,255,0.01)",
                }}>
                  <div style={{ fontSize: "0.95rem", letterSpacing: "0.05em", marginBottom: "4px" }}>{city.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>{city.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTENU SEO LONG-FORM ── */}
        <section style={{ padding: "80px 24px", borderTop: "1px solid rgba(212,168,83,0.08)" }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <h2 style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 400,
              marginBottom: "32px", letterSpacing: "0.02em",
            }}>
              Création de site internet en Seine-et-Marne :<br />
              <em style={{ color: "#d4a853" }}>tout ce que vous devez savoir</em>
            </h2>

            <div style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: "0.95rem" }}>
              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 400, marginTop: "40px", marginBottom: "16px", letterSpacing: "0.04em" }}>
                Le marché web en Seine-et-Marne en 2025
              </h3>
              <p style={{ marginBottom: "20px" }}>
                La Seine-et-Marne (77) est l&apos;un des départements les plus dynamiques d&apos;Île-de-France en termes
                de création d&apos;entreprises. Avec des pôles économiques à Melun, Meaux, Fontainebleau et
                Montereau-Fault-Yonne, le tissu local compte des milliers de TPE et PME dans tous les secteurs :
                artisanat, restauration, commerce de proximité, services aux entreprises.
              </p>
              <p style={{ marginBottom: "20px" }}>
                Pourtant, une étude récente révèle que <strong style={{ color: "#fff" }}>plus de 60% de ces entreprises
                n&apos;ont pas de site internet</strong> — ou possèdent un site daté qui n&apos;attire aucun visiteur.
                Dans un contexte où 97% des consommateurs recherchent une entreprise locale sur Google avant de se déplacer,
                l&apos;absence de présence web est une opportunité manquée chaque jour.
              </p>

              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 400, marginTop: "40px", marginBottom: "16px", letterSpacing: "0.04em" }}>
                Que recherchent vos clients sur Google ?
              </h3>
              <p style={{ marginBottom: "20px" }}>
                Les habitants de Seine-et-Marne tapent chaque mois des milliers de requêtes comme :
                &quot;plombier Melun&quot;, &quot;restaurant Fontainebleau ouvert dimanche&quot;, &quot;coach sportif Meaux&quot;,
                &quot;boulangerie artisanale 77&quot;... Ces requêtes ont une forte intention d&apos;achat immédiate.
                L&apos;entreprise qui apparaît en premier sur Google capte la majorité des appels et des visites.
              </p>
              <p style={{ marginBottom: "20px" }}>
                Un site bien construit et bien référencé peut générer des leads automatiquement, 24h/24, 7j/7,
                sans aucune dépense publicitaire. C&apos;est l&apos;investissement le plus rentable qu&apos;une petite
                entreprise puisse faire.
              </p>

              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 400, marginTop: "40px", marginBottom: "16px", letterSpacing: "0.04em" }}>
                Pourquoi CC Création plutôt qu&apos;un autre prestataire ?
              </h3>
              <p style={{ marginBottom: "16px" }}>
                Il existe plusieurs types de prestataires pour créer un site internet en Seine-et-Marne :
              </p>
              <ul style={{ paddingLeft: "24px", marginBottom: "20px" }}>
                <li style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#d4a853" }}>Wix / Squarespace :</strong> rapide mais générique, peu optimisé SEO,
                  aspect amateur pour une entreprise sérieuse. Vos clients le voient immédiatement.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#d4a853" }}>Agences parisiennes :</strong> professionnelles mais coûteuses (5 000€ - 30 000€),
                  peu disponibles, peu investies dans votre projet spécifique.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#d4a853" }}>Freelances génériques :</strong> tarifs variables, qualité inconstante,
                  pas de garantie sur les délais ni sur le résultat.
                </li>
                <li style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#d4a853" }}>CC Création :</strong> studio local spécialisé, tarifs transparents,
                  démo avant engagement, livraison garantie, support inclus.
                </li>
              </ul>
              <p style={{ marginBottom: "20px" }}>
                Notre avantage unique : nous construisons une démo de votre site en 24h, vous la montrons,
                vous permettons de tester sur mobile, et vous ne payez qu&apos;après validation. Aucun autre
                prestataire en Seine-et-Marne ne propose cela.
              </p>

              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 400, marginTop: "40px", marginBottom: "16px", letterSpacing: "0.04em" }}>
                Technologies utilisées
              </h3>
              <p style={{ marginBottom: "20px" }}>
                Nous utilisons les technologies web les plus modernes : Next.js pour la performance et le SEO,
                React pour les animations fluides, hébergement Vercel pour une vitesse de chargement maximale.
                Vos pages se chargent en moins d&apos;une seconde — un facteur critique pour le référencement Google
                et pour convertir les visiteurs impatients.
              </p>
              <p>
                Contrairement aux sites WordPress classiques qui accumulent plugins et ralentissements,
                nos sites sont construits sur mesure, sans code inutile, pour une performance optimale
                sur tous les appareils.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{
          padding: "80px 24px",
          background: "rgba(212,168,83,0.03)",
          borderTop: "1px solid rgba(212,168,83,0.08)",
          borderBottom: "1px solid rgba(212,168,83,0.08)",
        }}>
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "16px" }}>
                Questions fréquentes
              </p>
              <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.4rem)", fontWeight: 400 }}>
                <em style={{ color: "#d4a853" }}>Tout ce que vous</em><br />
                voulez savoir
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} style={{
                  border: "1px solid rgba(212,168,83,0.12)",
                  background: "rgba(255,255,255,0.01)",
                }}>
                  <summary style={{
                    padding: "22px 28px",
                    cursor: "pointer",
                    fontSize: "0.95rem", fontWeight: 400,
                    color: "#fff", letterSpacing: "0.02em",
                    listStyle: "none",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    gap: "16px",
                  }}>
                    <span>{item.q}</span>
                    <span style={{ color: "#d4a853", flexShrink: 0, fontSize: "1.2rem", lineHeight: 1 }}>+</span>
                  </summary>
                  <div style={{
                    padding: "0 28px 24px",
                    fontSize: "0.9rem", color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.85,
                  }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section style={{
          padding: "100px 24px",
          textAlign: "center",
          background: "radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.08) 0%, transparent 65%)",
        }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.45em", color: "#d4a853", textTransform: "uppercase", marginBottom: "24px" }}>
            Prêt à commencer ?
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 400, marginBottom: "20px", letterSpacing: "0.02em" }}>
            Obtenez votre démo<br />
            <em style={{ color: "#d4a853" }}>dans les 24 heures</em>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.4)", fontSize: "1rem", fontStyle: "italic",
            maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.8,
          }}>
            Dites-nous ce que vous faites. Nous vous montrons votre futur site demain.
            Sans engagement. Sans avance.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/33621235008?text=Bonjour%2C%20je%20souhaite%20cr%C3%A9er%20un%20site%20internet%20pour%20mon%20entreprise%20en%20Seine-et-Marne."
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                padding: "18px 40px", background: "#d4a853", color: "#060608",
                fontFamily: "Georgia, serif", fontSize: "0.82rem",
                letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
              }}
            >
              ✉ Démarrer sur WhatsApp
            </a>
            <a
              href="mailto:creation.concept@outlook.fr"
              style={{
                display: "inline-flex", alignItems: "center",
                padding: "18px 40px",
                border: "1px solid rgba(212,168,83,0.4)", color: "#d4a853",
                fontFamily: "Georgia, serif", fontSize: "0.82rem",
                letterSpacing: "0.18em", textDecoration: "none", textTransform: "uppercase",
              }}
            >
              E-mail
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          padding: "40px 24px",
          borderTop: "1px solid rgba(212,168,83,0.08)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <span style={{ color: "#d4a853", fontSize: "0.85rem", letterSpacing: "0.22em" }}>CC</span>
            <span style={{ color: "#fff", fontSize: "0.85rem", letterSpacing: "0.22em", marginLeft: "6px" }}>CRÉATION</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", marginLeft: "16px" }}>
              Studio web · Seine-et-Marne (77)
            </span>
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase" }}>Accueil</Link>
            <Link href="/tarifs" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase" }}>Tarifs</Link>
            <Link href="/portfolio" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.15em", textDecoration: "none", textTransform: "uppercase" }}>Portfolio</Link>
          </div>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>
            © 2025 CC Création · creationconcept.fr
          </div>
        </footer>

      </div>
    </>
  );
}
