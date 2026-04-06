import { MetadataRoute } from "next";

const BASE = "https://creationconcept.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${BASE}/creation-site-internet-seine-et-marne`, priority: 0.95, changeFrequency: "monthly" as const },
    { url: `${BASE}/tarifs`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${BASE}/portfolio`, priority: 0.85, changeFrequency: "weekly" as const },
    { url: `${BASE}/creation-site-internet-melun`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE}/creation-site-internet-meaux`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE}/creation-site-internet-fontainebleau`, priority: 0.85, changeFrequency: "monthly" as const },
    { url: `${BASE}/demo-patisserie`, priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE}/demo-patisserie2`, priority: 0.7, changeFrequency: "yearly" as const },
    { url: `${BASE}/demo-coach`, priority: 0.7, changeFrequency: "yearly" as const },
  ];

  return staticPages.map((page) => ({
    ...page,
    lastModified: now,
  }));
}
