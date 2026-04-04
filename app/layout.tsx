import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
  title: "CC Creation — Redesign. Création. Impact.",
  description:
    "Studio de création et redesign de sites web premium pour marques, indépendants et entreprises.",
  keywords: ["création site web", "redesign", "agence web", "CC Creation"],
  openGraph: {
    title: "CC Creation — Redesign. Création. Impact.",
    description: "Studio de création et redesign de sites web premium.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
