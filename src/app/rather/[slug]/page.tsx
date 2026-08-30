import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDeckBySlug, getAllDeckSlugs } from "@/lib/rather/decks";
import RatherGame from "@/components/rather/RatherGame";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDeckSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);
  if (!deck) return { title: "Deck Not Found" };

  return {
    title: deck.title,
    description: deck.description,
    openGraph: {
      title: `${deck.title} — Would You Rather`,
      description: deck.description,
    },
  };
}

export default async function RatherDeckPage({ params }: Props) {
  const { slug } = await params;
  const deck = getDeckBySlug(slug);
  if (!deck) notFound();

  return (
    <div className="py-8">
      <RatherGame deck={deck} />
    </div>
  );
}
