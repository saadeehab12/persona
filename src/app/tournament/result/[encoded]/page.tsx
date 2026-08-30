import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { decodeTournamentResult } from "@/lib/tournament/encode";
import { tournamentConfig, roundNames } from "@/lib/tournament/config";
import Link from "next/link";
import CharacterCard from "@/components/tournament/CharacterCard";
import type { Character, CharacterStats } from "@/lib/tournament/combat";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ encoded: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { encoded } = await params;
  const result = decodeTournamentResult(encoded);

  if (!result) {
    return { title: "Tournament Result | Persona" };
  }

  const title =
    result.finalResult === "champion"
      ? `🏆 Tournament Champion! - Persona Arena`
      : `Eliminated in ${roundNames[result.eliminatedRound ?? 0]} - Persona Arena`;

  const description =
    result.finalResult === "champion"
      ? `This character became Tournament Champion! STR:${result.stats.strength} SPD:${result.stats.speed} DUR:${result.stats.durability} INT:${result.stats.intelligence} SPL:${result.stats.special}`
      : `Made it to ${roundNames[result.eliminatedRound ?? 0]} winning ${result.roundsWon} round${result.roundsWon !== 1 ? "s" : ""}. Can you do better?`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `/api/og/tournament?result=${encoded}`, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og/tournament?result=${encoded}`],
    },
  };
}

export default async function TournamentResultPage({ params }: Props) {
  const { encoded } = await params;
  const result = decodeTournamentResult(encoded);

  if (!result) {
    notFound();
  }

  // Reconstruct a Character from the decoded data
  const character: Character = {
    name: "Champion",
    stats: result.stats,
    draftPicks: Object.keys(result.draftPicks),
    rawStats: { ...result.stats },
  };

  // Reconstruct history from roundsWon
  const totalRounds = Math.log2(tournamentConfig.bracketSize);
  const history: Array<{ round: number; result: "win" | "loss" }> = [];
  for (let i = 0; i < result.roundsWon; i++) {
    history.push({ round: i, result: "win" });
  }
  if (result.finalResult === "eliminated") {
    history.push({ round: result.roundsWon, result: "loss" });
  }

  const pageTitle =
    result.finalResult === "champion"
      ? "🏆 Tournament Champion!"
      : `Eliminated in ${roundNames[result.eliminatedRound ?? 0]}`;

  return (
    <div className="py-8">
      {/* Result banner */}
      <div className="text-center mb-8 reveal-animation">
        <div className="text-5xl mb-4">
          {result.finalResult === "champion" ? "🏆" : "⚔️"}
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: result.finalResult === "champion" ? "var(--theme-accent)" : "var(--theme-text)",
          }}
        >
          {pageTitle}
        </h1>
        {result.finalResult === "eliminated" && (
          <p className="text-lg" style={{ color: "var(--theme-muted)" }}>
            You won {result.roundsWon} round{result.roundsWon !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Journey recap */}
      {history.length > 0 && (
        <div
          className="mb-8 p-4 rounded-xl border max-w-lg mx-auto"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <h3
            className="text-sm font-bold mb-3 uppercase tracking-wider text-center"
            style={{ color: "var(--theme-muted)" }}
          >
            Battle History
          </h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {history.map((h, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  backgroundColor: h.result === "win" ? "#4CAF5020" : "#E85D3A20",
                  color: h.result === "win" ? "#4CAF50" : "#E85D3A",
                }}
              >
                {h.result === "win" ? "✓" : "✗"} {roundNames[h.round]}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Character card */}
      <div className="mb-8 max-w-sm mx-auto">
        <CharacterCard character={character} isPlayer />
      </div>

      {/* Share */}
      <ShareButtons encoded={encoded} />

      {/* CTAs */}
      <div className="flex gap-3 justify-center mt-8">
        <Link
          href="/tournament"
          className="py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02] inline-block"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          Draft a New Character
        </Link>
        <Link
          href="/"
          className="py-3 px-6 rounded-xl font-bold border transition-all hover:scale-[1.02] inline-block"
          style={{
            borderColor: "var(--theme-border)",
            color: "var(--theme-text)",
          }}
        >
          Take a Quiz
        </Link>
      </div>
    </div>
  );
}
