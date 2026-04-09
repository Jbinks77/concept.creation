import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Création Site Web Seine-et-Marne (77) | CC Création — Devis Gratuit 24h",
  description:
    "Agence web locale en Seine-et-Marne (77). Création de sites internet pour artisans, restaurants et PME à partir de 490€. Voyez votre site avant de signer. Devis gratuit sous 24h — Melun, Meaux, Fontainebleau.",
  keywords: [
    "création site web Seine-et-Marne",
    "création site internet Seine-et-Marne",
    "agence web 77",
    "création site internet Melun",
    "site internet Seine-et-Marne",
    "agence web Seine-et-Marne",
    "création site web Melun",
    "site vitrine artisan 77",
    "creation site web Meaux",
    "site internet Fontainebleau",
    "CC Création",
  ],
  openGraph: {
    title: "Création Site Web Seine-et-Marne (77) | CC Création",
    description: "Agence web locale en Seine-et-Marne. Sites vitrines, restaurants, artisans. Devis gratuit sous 24h.",
    type: "website",
    url: "https://www.creationconcept.fr",
    siteName: "CC Création",
  },
  alternates: {
    canonical: "https://www.creationconcept.fr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "CC Création",
    "url": "https://www.creationconcept.fr",
    "logo": "https://www.creationconcept.fr/logo_CC.png",
    "image": "https://www.creationconcept.fr/logo_CC.png",
    "description": "Agence web locale spécialisée en création de sites internet en Seine-et-Marne (77). Sites vitrines, restaurants, artisans, coachs. Devis gratuit sous 24h — Melun, Meaux, Fontainebleau et tout le 77.",
    "priceRange": "€€",
    "telephone": "+33621235008",
    "email": "creation.concept@outlook.fr",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Seine-et-Marne",
      "addressRegion": "Île-de-France",
      "postalCode": "77",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.5398,
      "longitude": 2.6595
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Seine-et-Marne" },
      { "@type": "City", "name": "Melun" },
      { "@type": "City", "name": "Meaux" },
      { "@type": "City", "name": "Fontainebleau" },
      { "@type": "City", "name": "Montereau-Fault-Yonne" },
      { "@type": "City", "name": "Provins" },
      { "@type": "City", "name": "Nemours" },
      { "@type": "City", "name": "Lagny-sur-Marne" },
      { "@type": "City", "name": "Chelles" },
      { "@type": "City", "name": "Pontault-Combault" },
      { "@type": "City", "name": "Torcy" },
      { "@type": "City", "name": "Combs-la-Ville" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Création de sites internet",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Création site vitrine Seine-et-Marne", "description": "Site vitrine professionnel pour artisans et commerçants du 77" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Création site internet restaurant 77", "description": "Site web sur-mesure pour restaurants en Seine-et-Marne" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Refonte site web Seine-et-Marne", "description": "Modernisation et refonte complète de sites existants" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Référencement local SEO 77", "description": "Optimisation SEO local pour les entreprises de Seine-et-Marne" } }
      ]
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": []
  };

  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
