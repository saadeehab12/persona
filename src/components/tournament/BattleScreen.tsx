"use client";

import { useState, useEffect } from "react";
import type { Character, CombatResult } from "@/lib/tournament/combat";
import { tournamentConfig } from "@/lib/tournament/config";

interface BattleScreenProps {
  player: Character;
  opponent: Character;
  result: CombatResult;
  onContinue: () => void;
}

export default function BattleScreen({
  player,
  opponent,
  result,
  onContinue,
}: BattleScreenProps) {
  const [phase, setPhase] = useState<"intro" | "stats" | "result">("intro");

  // Phase progression with delays
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("stats"), 1000);
    const t2 = setTimeout(() => setPhase("result"), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const totalStats = tournamentConfig.stats.length;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Intro phase */}
      <div className="text-center mb-8">
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--theme-text)",
          }}
        >
          ⚔️ Battle!
        </h2>
      </div>

      {/* VS Header */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="text-right">
          <span
            className="text-sm font-bold block"
            style={{ color: "var(--theme-accent)" }}
          >
            {player.name}
          </span>
        </div>
        <div
          className="text-2xl font-bold px-4 py-2 rounded-xl"
          style={{
            backgroundColor: "var(--theme-surface-raised)",
            color: "var(--theme-text)",
          }}
        >
          VS
        </div>
        <div className="text-left">
          <span
            className="text-sm font-bold block"
            style={{ color: "var(--theme-text)" }}
          >
            {opponent.name}
          </span>
        </div>
      </div>

      {/* Stat comparison rows */}
      <div className="space-y-3 mb-8">
        {result.statBreakdown.map((stat, i) => {
          const statDef = tournamentConfig.stats.find((s) => s.id === stat.statId);
          const maxVal = statDef?.maxValue ?? 100;
          const playerPct = (stat.playerValue / maxVal) * 100;
          const opponentPct = (stat.opponentValue / maxVal) * 100;
          const showResult = phase === "stats" || phase === "result";
          const isWin = stat.winner === "player";
          const isTie = stat.winner === "tie";

          return (
            <div
              key={stat.statId}
              className={`transition-all duration-300 ${
                showResult ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{statDef?.icon}</span>
                <span
                  className="text-xs font-bold uppercase tracking-wider flex-1"
                  style={{ color: "var(--theme-muted)" }}
                >
                  {stat.statName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Player bar */}
                <div
                  className="flex-1 h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--theme-surface-raised)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${playerPct}%`,
                      backgroundColor: isWin ? "#4CAF50" : "var(--theme-accent)",
                      transitionDelay: `${i * 150 + 200}ms`,
                    }}
                  />
                </div>
                <span
                  className={`text-xs font-bold w-8 text-center ${
                    showResult && isWin ? "text-green-500" : ""
                  }`}
                  style={{ color: isWin && showResult ? "#4CAF50" : "var(--theme-text)" }}
                >
                  {stat.playerValue}
                </span>

                {/* VS indicator */}
                <span
                  className="text-xs w-6 text-center"
                  style={{
                    color: showResult
                      ? isWin
                        ? "#4CAF50"
                        : isTie
                        ? "var(--theme-muted)"
                        : "#E85D3A"
                      : "var(--theme-muted)",
                  }}
                >
                  {showResult ? (isWin ? "✓" : isTie ? "=" : "✗") : "—"}
                </span>

                <span
                  className={`text-xs font-bold w-8 text-center`}
                  style={{
                    color:
                      showResult && !isWin && !isTie ? "#E85D3A" : "var(--theme-text)",
                  }}
                >
                  {stat.opponentValue}
                </span>

                {/* Opponent bar */}
                <div
                  className="flex-1 h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--theme-surface-raised)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700 ml-auto"
                    style={{
                      width: `${opponentPct}%`,
                      backgroundColor: !isWin && !isTie ? "#4CAF50" : "var(--theme-muted)",
                      transitionDelay: `${i * 150 + 200}ms`,
                      float: "right",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result phase */}
      <div
        className={`text-center transition-all duration-500 ${
          phase === "result" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Final scores */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <div className="text-center">
            <span
              className="text-3xl font-bold block"
              style={{
                fontFamily: "var(--font-display)",
                color: result.winner === "player" ? "#4CAF50" : "var(--theme-text)",
              }}
            >
              {result.playerScore}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--theme-muted)" }}
            >
              {player.name}
            </span>
          </div>
          <span
            className="text-lg font-bold"
            style={{ color: "var(--theme-muted)" }}
          >
            —
          </span>
          <div className="text-center">
            <span
              className="text-3xl font-bold block"
              style={{
                fontFamily: "var(--font-display)",
                color: result.winner === "opponent" ? "#4CAF50" : "var(--theme-text)",
              }}
            >
              {result.opponentScore}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--theme-muted)" }}
            >
              {opponent.name}
            </span>
          </div>
        </div>

        {/* Winner announcement */}
        <div
          className={`text-4xl font-bold mb-4 ${
            result.winner === "player" ? "reveal-animation" : ""
          }`}
          style={{
            fontFamily: "var(--font-display)",
            color: result.winner === "player" ? "#4CAF50" : "#E85D3A",
          }}
        >
          {result.winner === "player" ? "🏆 Victory!" : "💀 Defeated!"}
        </div>

        {/* Narrative */}
        <p
          className="text-sm mb-6 max-w-md mx-auto"
          style={{ color: "var(--theme-muted)" }}
        >
          {result.narrative}
        </p>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className="py-3 px-8 rounded-xl font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
          style={{
            backgroundColor:
              result.winner === "player" ? "var(--theme-accent)" : "#E85D3A",
          }}
        >
          {result.winner === "player" ? "Next Round →" : "View Results"}
        </button>
      </div>
    </div>
  );
}
