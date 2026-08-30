"use client";

import { useState } from "react";
import type { Character, CharacterStats } from "@/lib/tournament/combat";
import { roundNames, tournamentConfig } from "@/lib/tournament/config";
import CharacterCard from "./CharacterCard";
import { encodeTournamentResult } from "@/lib/tournament/encode";

interface ResultsScreenProps {
  character: Character;
  draftPicks: Record<string, string>;
  finalResult: "champion" | "eliminated";
  eliminatedRound?: number;
  roundsWon: number;
  history: Array<{ round: number; result: "win" | "loss" }>;
  onRestart: () => void;
}

export default function ResultsScreen({
  character,
  draftPicks,
  finalResult,
  eliminatedRound,
  roundsWon,
  history,
  onRestart,
}: ResultsScreenProps) {
  const [copied, setCopied] = useState(false);

  const encoded = encodeTournamentResult(
    character.stats,
    draftPicks,
    finalResult,
    eliminatedRound,
    history
  );

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/tournament/result/${encoded}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: finalResult === "champion"
          ? `I won the Tournament! - Persona Arena`
          : `I was eliminated in ${roundNames[eliminatedRound ?? 0]} - Persona Arena`,
        text: finalResult === "champion"
          ? `🏆 I became Tournament Champion with ${character.name}! Can you beat my run?`
          : `I made it to ${roundNames[eliminatedRound ?? 0]} in the Persona Arena! Can you go further?`,
        url: shareUrl,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Championship banner */}
      <div className="mb-8 reveal-animation">
        {finalResult === "champion" ? (
          <>
            <div className="text-6xl mb-4">🏆</div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--theme-accent)",
              }}
            >
              Tournament Champion!
            </h1>
            <p
              className="text-lg"
              style={{ color: "var(--theme-muted)" }}
            >
              Your character conquered all {roundNames.length} rounds
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-4">
              {eliminatedRound === 0 ? "⚔️" : eliminatedRound === 1 ? "🥈" : "🥉"}
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--theme-text)",
              }}
            >
              Eliminated in {roundNames[eliminatedRound ?? 0]}
            </h1>
            <p
              className="text-lg"
              style={{ color: "var(--theme-muted)" }}
            >
              You won {roundsWon} round{roundsWon !== 1 ? "s" : ""} before falling
            </p>
          </>
        )}
      </div>

      {/* Journey recap */}
      <div
        className="mb-8 p-4 rounded-xl border"
        style={{
          borderColor: "var(--theme-border)",
          backgroundColor: "var(--theme-surface)",
        }}
      >
        <h3
          className="text-sm font-bold mb-3 uppercase tracking-wider"
          style={{ color: "var(--theme-muted)" }}
        >
          Your Journey
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

      {/* Character card */}
      <div className="mb-8">
        <CharacterCard character={character} isPlayer />
      </div>

      {/* Share section */}
      <div
        className="mb-8 p-6 rounded-xl border"
        style={{
          borderColor: "var(--theme-border)",
          backgroundColor: "var(--theme-surface)",
        }}
      >
        <h3
          className="text-sm font-bold mb-3 uppercase tracking-wider"
          style={{ color: "var(--theme-muted)" }}
        >
          Share Your Result
        </h3>

        {/* OG Image preview */}
        <div className="mb-4 rounded-lg overflow-hidden border" style={{ borderColor: "var(--theme-border)" }}>
          <img
            src={`/api/og/tournament?result=${encoded}`}
            alt="Tournament Result Card"
            className="w-full h-auto"
            style={{ backgroundColor: "var(--theme-surface-raised)" }}
          />
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleCopyLink}
            className="share-btn px-4 py-2 rounded-lg font-medium text-sm border transition-all"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: copied ? "#4CAF5020" : "var(--theme-surface-raised)",
              color: copied ? "#4CAF50" : "var(--theme-text)",
            }}
          >
            {copied ? "✓ Copied!" : "📋 Copy Link"}
          </button>

          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              onClick={handleShare}
              className="share-btn px-4 py-2 rounded-lg font-medium text-sm text-white transition-all"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              📤 Share
            </button>
          )}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onRestart}
          className="py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02]"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          Draft a New Character
        </button>
        <a
          href="/"
          className="py-3 px-6 rounded-xl font-bold border transition-all hover:scale-[1.02] inline-block"
          style={{
            borderColor: "var(--theme-border)",
            color: "var(--theme-text)",
          }}
        >
          Take a Quiz
        </a>
      </div>
    </div>
  );
}
