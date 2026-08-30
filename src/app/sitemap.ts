import { MetadataRoute } from "next";
import { getAllQuizSlugs } from "@/lib/registry";
import { getAllDeckSlugs } from "@/lib/rather/decks";
import { getAllBracketSlugs } from "@/lib/pickone/brackets";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://freebuff.vercel.app";

  const quizPages = getAllQuizSlugs().map((slug) => ({
    url: `${base}/quiz/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const ratherPages = getAllDeckSlugs().map((slug) => ({
    url: `${base}/rather/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const pickonePages = getAllBracketSlugs().map((slug) => ({
    url: `${base}/pickone/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/tournament`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/rather`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/pickone`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/decisions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/generators`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/life`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...quizPages,
    ...ratherPages,
    ...pickonePages,
  ];
}
