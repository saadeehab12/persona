import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { decodePickOneResult, getRoundName } from "@/lib/pickone/engine";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ encoded: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { encoded } = await params;
  const result = decodePickOneResult(encoded);
  if (!result) return { title: "Result | Persona" };

  return {
    title: `My Champion: ${result.champion.name}`,
    description: `I crowned ${result.champion.name} as the champion of ${result.bracket.title}!`,
    openGraph: {
      title: `My Champion: ${result.champion.name} — ${result.bracket.title}`,
      description: `I crowned ${result.champion.name} as the champion of ${result.bracket.title}!`,
    },
  };
}

export default async function PickOneResultPage({ params }: Props) {
  const { encoded } = await params;
  const result = decodePickOneResult(encoded);
  if (!result) notFound();

  return (
    <div className="py-8 max-w-lg mx-auto text-center">
      <div className="reveal-animation">
        <span className="text-6xl mb-4 block">👑</span>
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--theme-accent)",
          }}
        >
          {result.champion.name}
        </h1>
        <p className="text-lg mb-2" style={{ color: "var(--theme-muted)" }}>
          Crowned champion of {result.bracket.title}
        </p>
        {result.champion.description && (
          <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
            {result.champion.description}
          </p>
        )}
      </div>

      {/* Path */}
      {result.picks.length > 0 && (
        <div
          className="rounded-xl border p-4 my-6"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <h3
            className="text-sm font-bold mb-3 uppercase tracking-wider"
            style={{ color: "var(--theme-muted)" }}
          >
            Bracket Path
          </h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {result.picks.map((_, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  backgroundColor: "var(--theme-accent)20",
                  color: "var(--theme-accent)",
                }}
              >
                {getRoundName(i, result.picks.length + 1)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share */}
      <ShareButtons encoded={encoded} championName={result.champion.name} bracketTitle={result.bracket.title} />

      {/* CTAs */}
      <div className="flex gap-3 justify-center mt-8">
        <Link
          href={`/pickone/${result.bracket.slug}`}
          className="py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02] inline-block"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          Run It Back
        </Link>
        <Link
          href="/pickone"
          className="py-3 px-6 rounded-xl font-bold border transition-all hover:scale-[1.02] inline-block"
          style={{
            borderColor: "var(--theme-border)",
            color: "var(--theme-text)",
          }}
        >
          Another Bracket
        </Link>
      </div>
    </div>
  );
}
