import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBracketBySlug, getAllBracketSlugs } from "@/lib/pickone/brackets";
import PickOneGame from "@/components/pickone/PickOneGame";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBracketSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bracket = getBracketBySlug(slug);
  if (!bracket) return { title: "Bracket Not Found" };

  return {
    title: bracket.title,
    description: bracket.description,
    openGraph: {
      title: `${bracket.title} — Pick One`,
      description: bracket.description,
    },
  };
}

export default async function PickOneBracketPage({ params }: Props) {
  const { slug } = await params;
  const bracket = getBracketBySlug(slug);
  if (!bracket) notFound();

  return (
    <div className="py-8">
      <PickOneGame bracket={bracket} />
    </div>
  );
}
