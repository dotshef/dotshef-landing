import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/request", "/estimate"],
    },
    sitemap: "https://dotshef.com/sitemap.xml",
    host: "https://dotshef.com",
  };
}