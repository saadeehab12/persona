"use client";

import { useState, useCallback } from "react";
import type { PickOneBracket, BracketMatch, BracketState } from "@/lib/pickone/types";
import {
  generateBracket,
  getCurrentMatch,
  pickWinner,
  getRoundName,
  encodePickOneResult,
} from "@/lib/pickone/engine";

interface PickOneGameProps {
  bracket: PickOneBracket;
}

export default function PickOneGame({ bracket }: PickOneGameProps) {
  const [state, setState] = useState<BracketState>(() => generateBracket(bracket));
  const [pickHistory, setPickHistory] = useState<Array<{ round: number; pick: string }>>([]);
  const [animating, setAnimating] = useState(false);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentMatch = getCurrentMatch(state);
  const totalRounds = state.rounds.length;
  const progress = state.complete ? 100 : ((state.currentRound * 8 + state.currentMatchIndex) / (bracket.items.length - 1)) * 100;

  const handlePick = useCallback(
    (itemId: string) => {
      if (animating || !currentMatch) return;
      setAnimating(true);
      setExitDir(itemId === currentMatch.itemA?.id ? "left" : "right");
      const newState = pickWinner(state, itemId);
      setPickHistory((prev) => [...prev, { round: state.currentRound, pick: itemId }]);
      setTimeout(() => {
        setState(newState);
        setExitDir(null);
        setAnimating(false);
        if (newState.complete) setShowResult(true);
      }, 400);
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

  if (showResult && state.champion) {
    const champion = state.champion;
    const encoded = encodePickOneResult(bracket.slug, champion, pickHistory);
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/pickone/result/${encoded}` : "";

    return (
      <div className="max-w-lg mx-auto text-center reveal-animation">
        <div className="pixel-card p-8 mb-6">
          <span className="text-5xl mb-3 block">👑</span>
          <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: "var(--theme-accent)", lineHeight: "1.8" }}>YOUR CHAMPION</h2>
          <span className="text-4xl block my-4">{champion.icon}</span>
          <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: "12px", color: "var(--theme-text)", lineHeight: "1.8" }}>{champion.name.toUpperCase()}</h3>
          {champion.description && <p className="mt-1" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>{champion.description}</p>}
        </div>
        <div className="pixel-card p-4 mb-6">
          <p className="mb-2" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>Share your champion</p>
          <SharePickButton url={shareUrl} />
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={handleRestart} className="pixel-btn">Run It Back</button>
          <a href="/pickone" className="pixel-btn-secondary inline-block">Another Bracket</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "var(--theme-muted)" }}>{getRoundName(state.currentRound, totalRounds).toUpperCase()}</span>
          <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-text)" }}>{bracket.title}</span>
        </div>
        <div className="pixel-progress">
          <div className="pixel-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Bracket overview */}
      <div className="pixel-card p-3 mb-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {state.rounds.map((round: BracketMatch[], rIdx: number) => (
            <div key={rIdx} className="flex flex-col gap-1">
              <span style={{ fontFamily: "var(--font-pixel)", fontSize: "6px", color: "var(--theme-muted)", letterSpacing: "1px", textAlign: "center", marginBottom: "4px" }}>
                {getRoundName(rIdx, totalRounds).toUpperCase()}
              </span>
              {round.map((m: BracketMatch) => (
                <div
                  key={m.id}
                  className="px-2 py-1 text-xs whitespace-nowrap"
                  style={{
                    border: `1px solid ${m.id === currentMatch?.id ? "var(--theme-accent)" : "var(--pixel-card-border)"}`,
                    backgroundColor: m.id === currentMatch?.id ? "var(--theme-accent-glow)" : "var(--theme-surface-raised)",
                    fontFamily: "var(--font-pixel-body)",
                    fontSize: "14px",
                    color: m.winner ? "var(--theme-text)" : "var(--theme-muted)",
                  }}
                >
                  {m.winner ? `${m.winner.icon} ${m.winner.name}` : m.itemA && m.itemB ? `${m.itemA.icon} vs ${m.itemB.icon}` : "TBD"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Current matchup */}
      {currentMatch && currentMatch.itemA && currentMatch.itemB && (
        <div className={`transition-all duration-200 ${exitDir === "left" ? "opacity-0 -translate-x-full" : exitDir === "right" ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}`}>
          <div className="text-center mb-3">
            <span className="pixel-tag" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-muted)" }}>PICK ONE</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handlePick(currentMatch.itemA!.id)} disabled={animating} className="pixel-card p-5 text-center">
              <span className="text-3xl block mb-2">{currentMatch.itemA.icon}</span>
              <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>{currentMatch.itemA.name}</p>
            </button>
            <button onClick={() => handlePick(currentMatch.itemB!.id)} disabled={animating} className="pixel-card p-5 text-center" style={{ borderColor: "var(--theme-accent)" }}>
              <span className="text-3xl block mb-2">{currentMatch.itemB.icon}</span>
              <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-accent)", fontWeight: 700 }}>{currentMatch.itemB.name}</p>
            </button>
          </div>
          <p className="text-center mt-3" style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "var(--theme-muted)" }}>TAP TO CROWN A WINNER</p>
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
      <button onClick={handleCopy} className="pixel-btn-secondary" style={{ fontSize: "16px" }}>
        {copied ? "✓ Copied!" : "📋 Copy Link"}
      </button>
    </div>
  );
}
