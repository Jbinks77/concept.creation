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
  title: "CC Création — Sites Internet Seine-et-Marne | Devis Gratuit",
  description:
    "Studio web local en Seine-et-Marne (77). Création de sites internet vitrines, restaurants, artisans. Voyez votre site avant de signer. Devis gratuit sous 24h.",
  keywords: [
    "création site internet Seine-et-Marne",
    "agence web 77",
    "création site internet Melun",
    "site internet Seine-et-Marne",
    "CC Création",
    "site vitrine Seine-et-Marne",
  ],
  openGraph: {
    title: "CC Création — Sites Internet Seine-et-Marne",
    description: "Studio web local en Seine-et-Marne. Devis gratuit sous 24h.",
    type: "website",
    url: "https://creationconcept.fr",
    siteName: "CC Création",
  },
  alternates: {
    canonical: "https://creationconcept.fr",
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
    "@type": "LocalBusiness",
    "name": "CC Création",
    "url": "https://creationconcept.fr",
    "logo": "https://creationconcept.fr/logo_CC.png",
    "image": "https://creationconcept.fr/logo_CC.png",
    "description": "Studio web local spécialisé en création de sites internet en Seine-et-Marne (77). Sites vitrines, restaurants, artisans, coachs. Devis gratuit sous 24h.",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Seine-et-Marne",
      "postalCode": "77",
      "addressCountry": "FR"
    },
    "areaServed": [
      { "@type": "City", "name": "Melun" },
      { "@type": "City", "name": "Meaux" },
      { "@type": "City", "name": "Fontainebleau" },
      { "@type": "City", "name": "Montereau-Fault-Yonne" },
      { "@type": "City", "name": "Chelles" },
      { "@type": "City", "name": "Lagny-sur-Marne" },
      { "@type": "AdministrativeArea", "name": "Seine-et-Marne" }
    ],
    "knowsAbout": [
      "création site internet",
      "développement web",
      "site vitrine",
      "refonte site web",
      "site restaurant",
      "site artisan"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/cccreation77"
    ]
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
