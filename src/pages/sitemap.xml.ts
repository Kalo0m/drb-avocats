import type { APIRoute } from "astro";

const pages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/equipe", priority: "0.9", changefreq: "monthly" },
  { url: "/anne-rabaey", priority: "0.8", changefreq: "monthly" },
  { url: "/caroline-bot", priority: "0.8", changefreq: "monthly" },
  { url: "/honoraires", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.9", changefreq: "monthly" },
  { url: "/mentions-legales", priority: "0.3", changefreq: "yearly" },
  { url: "/politique-confidentialite", priority: "0.3", changefreq: "yearly" },
] as const;

export const GET: APIRoute = () => {
  const siteUrl = "https://www.drbavocatscherbourg.com";
  const lastmod = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
