import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://dotshef.com";

  return [
    {
      url: base,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/misefree`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/misefree/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}