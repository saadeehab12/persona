"use client";

import { useState, useCallback } from "react";
import type { PickOneBracket, BracketMatch } from "@/lib/pickone/types";
import {
  generateBracket,
  getCurrentMatch,
  pickWinner,
  getRoundName,
} from "@/lib/pickone/engine";
import type { BracketState } from "@/lib/pickone/types";
import { encodePickOneResult } from "@/lib/pickone/engine";

interface PickOneGameProps {
  bracket: PickOneBracket;
}

export default function PickOneGame({ bracket }: PickOneGameProps) {
  const [state, setState] = useState<BracketState>(() =>
    generateBracket(bracket)
  );
  const [pickHistory, setPickHistory] = useState<Array<{ round: number; pick: string }>>([]);
  const [animating, setAnimating] = useState(false);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentMatch = getCurrentMatch(state);
  const roundName = getRoundName(state.currentRound, state.rounds.length);
  const totalRounds = state.rounds.length;
  const progress = state.complete
    ? 100
    : ((state.currentRound * 8 + state.currentMatchIndex) /
        (bracket.items.length - 1)) *
      100;

  const handlePick = useCallback(
    (itemId: string) => {
      if (animating || !currentMatch) return;
      setAnimating(true);
      setExitDir(itemId === currentMatch.itemA?.id ? "left" : "right");

      const newState = pickWinner(state, itemId);
      setPickHistory((prev) => [
        ...prev,
        { round: state.currentRound, pick: itemId },
      ]);

      setTimeout(() => {
        setState(newState);
        setExitDir(null);
        setAnimating(false);
        if (newState.complete) {
          setShowResult(true);
        }
      }, 500);
    },
    [animating, currentMatch, state]
  );

  const handleRestart = () => {
    setState(generateBracket(bracket));
    setPickHistory([]);
    setAnimating(false);
    setExitDir(null);
    setShowResult(false);
  };

  // Result screen
  if (showResult && state.champion) {
    const champion = state.champion;
    const encoded = encodePickOneResult(bracket.slug, champion, pickHistory);
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/pickone/result/${encoded}`
        : "";

    return (
      <div className="max-w-lg mx-auto text-center reveal-animation">
        <div
          className="rounded-2xl border-2 p-8 mb-6"
          style={{
            borderColor: "var(--theme-accent)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <span className="text-6xl mb-4 block">👑</span>
          <h2
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--theme-accent)",
            }}
          >
            Your Champion
          </h2>
          <div className="my-6">
            <span className="text-5xl block mb-2">{champion.icon}</span>
            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--theme-text)",
              }}
            >
              {champion.name}
            </h3>
            {champion.description && (
              <p className="text-sm mt-1" style={{ color: "var(--theme-muted)" }}>
                {champion.description}
              </p>
            )}
          </div>
        </div>

        {/* Path recap */}
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
            Your Path
          </h3>
          <div className="flex justify-center gap-2 flex-wrap">
            {pickHistory.map((h, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-bold"
                style={{
                  backgroundColor: "var(--theme-accent)20",
                  color: "var(--theme-accent)",
                }}
              >
                {getRoundName(h.round, totalRounds)}
              </div>
            ))}
          </div>
        </div>

        {/* Share */}
        <div
          className="rounded-xl border p-4 mb-6"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <p className="text-sm mb-3" style={{ color: "var(--theme-muted)" }}>
            Share your champion
          </p>
          <SharePickButton url={shareUrl} />
        </div>

        {/* CTAs */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02]"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            Run It Back
          </button>
          <a
            href="/pickone"
            className="py-3 px-6 rounded-xl font-bold border transition-all hover:scale-[1.02] inline-block"
            style={{
              borderColor: "var(--theme-border)",
              color: "var(--theme-text)",
            }}
          >
            Another Bracket
          </a>
        </div>
      </div>
    );
  }

  // Active matchup
  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: "var(--theme-muted)" }}>
            {roundName}
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>
            {bracket.title}
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--theme-surface-raised)" }}
        >
          <div
            className="h-full rounded-full progress-bar-fill"
            style={{
              backgroundColor: "var(--theme-accent)",
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Bracket view (compact) */}
      <div
        className="rounded-xl border p-3 mb-6 overflow-x-auto"
        style={{
          borderColor: "var(--theme-border)",
          backgroundColor: "var(--theme-surface)",
        }}
      >
        <div className="flex gap-4 min-w-max">
          {state.rounds.map((round: BracketMatch[], rIdx: number) => (
            <div key={rIdx} className="flex flex-col gap-1">
              <span
                className="text-xs font-bold text-center mb-1 uppercase tracking-wider"
                style={{ color: "var(--theme-muted)" }}
              >
                {getRoundName(rIdx, totalRounds)}
              </span>
              {round.map((m: BracketMatch) => (
                <div
                  key={m.id}
                  className="px-2 py-1 rounded text-xs whitespace-nowrap"
                  style={{
                    backgroundColor:
                      m.id === currentMatch?.id
                        ? "var(--theme-accent)20"
                        : "var(--theme-surface-raised)",
                    color: m.winner
                      ? "var(--theme-text)"
                      : "var(--theme-muted)",
                    border:
                      m.id === currentMatch?.id
                        ? `1px solid var(--theme-accent)`
                        : "1px solid transparent",
                  }}
                >
                  {m.winner
                    ? `${m.winner.icon} ${m.winner.name}`
                    : m.itemA && m.itemB
                    ? `${m.itemA.icon} vs ${m.itemB.icon}`
                    : "TBD"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Current matchup */}
      {currentMatch && currentMatch.itemA && currentMatch.itemB && (
        <div
          className={`transition-all duration-300 ${
            exitDir === "left"
              ? "opacity-0 -translate-x-full"
              : exitDir === "right"
              ? "opacity-0 translate-x-full"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="text-center mb-4">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                backgroundColor: "var(--theme-surface-raised)",
                color: "var(--theme-muted)",
              }}
            >
              Pick One
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handlePick(currentMatch.itemA!.id)}
              disabled={animating}
              className="p-6 rounded-2xl border-2 text-center transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              <span className="text-4xl block mb-2">{currentMatch.itemA.icon}</span>
              <p
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--theme-text)",
                }}
              >
                {currentMatch.itemA.name}
              </p>
              {currentMatch.itemA.description && (
                <p className="text-xs mt-1" style={{ color: "var(--theme-muted)" }}>
                  {currentMatch.itemA.description}
                </p>
              )}
            </button>

            <button
              onClick={() => handlePick(currentMatch.itemB!.id)}
              disabled={animating}
              className="p-6 rounded-2xl border-2 text-center transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              style={{
                borderColor: "var(--theme-accent)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              <span className="text-4xl block mb-2">{currentMatch.itemB.icon}</span>
              <p
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--theme-accent)",
                }}
              >
                {currentMatch.itemB.name}
              </p>
              {currentMatch.itemB.description && (
                <p className="text-xs mt-1" style={{ color: "var(--theme-muted)" }}>
                  {currentMatch.itemB.description}
                </p>
              )}
            </button>
          </div>

          <p
            className="text-center text-xs mt-4"
            style={{ color: "var(--theme-muted)" }}
          >
            Tap to crown a winner
          </p>
        </div>
      )}
    </div>
  );
}

function SharePickButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={handleCopy}
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
          onClick={() => navigator.share({ title: "My Pick One Champion!", url })}
          className="share-btn px-4 py-2 rounded-lg font-medium text-sm text-white"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          📤 Share
        </button>
      )}
    </div>
  );
}
