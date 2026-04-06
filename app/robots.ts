import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://creationconcept.fr/sitemap.xml",
    host: "https://creationconcept.fr",
  };
}
