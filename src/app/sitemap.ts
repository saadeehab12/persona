import { MetadataRoute } from "next";
import { getAllQuizSlugs } from "@/lib/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://freebuff.vercel.app";
  const quizzPages = getAllQuizSlugs().map((slug) => ({
    url: `${base}/quiz/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/tournament`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...quizzPages,
  ];
}
