import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { decodeRatherResult } from "@/lib/rather/engine";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ encoded: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { encoded } = await params;
  const result = decodeRatherResult(encoded);
  if (!result) return { title: "Result | Persona" };

  return {
    title: `I am "${result.title}" — ${result.deck.title}`,
    description: result.description,
    openGraph: {
      title: `I am "${result.title}" — ${result.deck.title}`,
      description: result.description,
    },
  };
}

export default async function RatherResultPage({ params }: Props) {
  const { encoded } = await params;
  const result = decodeRatherResult(encoded);
  if (!result) notFound();

  return (
    <div className="py-8 max-w-lg mx-auto text-center">
      <div className="reveal-animation">
        <span className="text-5xl mb-4 block">{result.deck.icon}</span>
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--theme-accent)",
          }}
        >
          {result.title}
        </h1>
        <p className="text-lg mb-6" style={{ color: "var(--theme-muted)" }}>
          {result.description}
        </p>
      </div>

      {/* Score */}
      <div
        className="rounded-2xl border p-6 mb-6"
        style={{
          borderColor: "var(--theme-border)",
          backgroundColor: "var(--theme-surface)",
        }}
      >
        <div className="h-4 rounded-full overflow-hidden flex mb-3"
          style={{ backgroundColor: "var(--theme-surface-raised)" }}
        >
          <div
            className="h-full"
            style={{
              width: `${((result.deck.questions.length - result.wildCount) / result.deck.questions.length) * 100}%`,
              backgroundColor: "var(--theme-accent)",
              opacity: 0.4,
            }}
          />
          <div
            className="h-full"
            style={{
              width: `${(result.wildCount / result.deck.questions.length) * 100}%`,
              backgroundColor: "var(--theme-accent)",
            }}
          />
        </div>
        <p className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>
          {result.wildCount} / {result.deck.questions.length} wild picks
        </p>
      </div>

      {/* Picks recap */}
      <div
        className="rounded-xl border p-4 mb-6"
        style={{
          borderColor: "var(--theme-border)",
          backgroundColor: "var(--theme-surface)",
        }}
      >
        <h3
          className="text-sm font-bold mb-3 uppercase tracking-wider"
          style={{ color: "var(--theme-muted)" }}
        >
          Your Picks
        </h3>
        <div className="space-y-2">
          {result.deck.questions.map((q, i) => {
            const pick = result.picks[i];
            return (
              <div key={q.id} className="flex items-center gap-2 text-sm">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{
                    backgroundColor:
                      pick === q.wildSide ? "var(--theme-accent)" : "var(--theme-surface-raised)",
                    color: pick === q.wildSide ? "white" : "var(--theme-muted)",
                  }}
                >
                  {pick === "a" ? "A" : "B"}
                </span>
                <span style={{ color: "var(--theme-muted)" }}>
                  {pick === "a" ? q.optionA : q.optionB}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Share */}
      <ShareButtons encoded={encoded} title={result.title} deckTitle={result.deck.title} />

      {/* CTAs */}
      <div className="flex gap-3 justify-center mt-8">
        <Link
          href={`/rather/${result.deck.slug}`}
          className="py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02] inline-block"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          Play Again
        </Link>
        <Link
          href="/rather"
          className="py-3 px-6 rounded-xl font-bold border transition-all hover:scale-[1.02] inline-block"
          style={{
            borderColor: "var(--theme-border)",
            color: "var(--theme-text)",
          }}
        >
          Another Deck
        </Link>
      </div>
    </div>
  );
}
