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

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("stats"), 1000);
    const t2 = setTimeout(() => setPhase("result"), 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: "var(--theme-text)", lineHeight: "1.8" }}>
          ⚔️ BATTLE!
        </h2>
      </div>

      {/* VS Header */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-accent)", fontWeight: 700 }}>
          {player.name}
        </span>
        <div
          className="pixel-tag"
          style={{ backgroundColor: "var(--pixel-chrome)", color: "var(--pixel-cream)" }}
        >
          VS
        </div>
        <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>
          {opponent.name}
        </span>
      </div>

      {/* Stat comparison rows */}
      <div className="space-y-2 mb-6">
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
              className={`transition-all duration-200 ${showResult ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span>{statDef?.icon}</span>
                <span style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "var(--theme-muted)", letterSpacing: "1px" }}>
                  {stat.statName.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="pixel-stat-bar flex-1">
                  <div
                    className="pixel-stat-fill"
                    style={{
                      width: `${playerPct}%`,
                      backgroundColor: isWin ? "var(--pixel-green)" : "var(--theme-accent)",
                      transitionDelay: `${i * 100 + 100}ms`,
                    }}
                  />
                </div>
                <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: isWin && showResult ? "var(--pixel-green)" : "var(--theme-text)", fontWeight: 700 }}>
                  {stat.playerValue}
                </span>
                <span style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: showResult ? (isWin ? "var(--pixel-green)" : isTie ? "var(--theme-muted)" : "var(--pixel-terracotta)") : "var(--theme-muted)" }}>
                  {showResult ? (isWin ? "✓" : isTie ? "=" : "✗") : "—"}
                </span>
                <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: !isWin && !isTie && showResult ? "var(--pixel-terracotta)" : "var(--theme-text)", fontWeight: 700 }}>
                  {stat.opponentValue}
                </span>
                <div className="pixel-stat-bar flex-1">
                  <div
                    className="pixel-stat-fill"
                    style={{
                      width: `${opponentPct}%`,
                      backgroundColor: !isWin && !isTie ? "var(--pixel-green)" : "var(--theme-muted)",
                      transitionDelay: `${i * 100 + 100}ms`,
                      marginLeft: "auto",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result phase */}
      <div className={`text-center transition-all duration-300 ${phase === "result" ? "opacity-100" : "opacity-0"}`}>
        <div className="flex items-center justify-center gap-8 mb-4">
          <div className="text-center">
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "16px", color: result.winner === "player" ? "var(--pixel-green)" : "var(--theme-text)" }}>
              {result.playerScore}
            </span>
            <span className="block" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "14px", color: "var(--theme-muted)" }}>
              {player.name}
            </span>
          </div>
          <span style={{ color: "var(--theme-muted)" }}>—</span>
          <div className="text-center">
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "16px", color: result.winner === "opponent" ? "var(--pixel-green)" : "var(--theme-text)" }}>
              {result.opponentScore}
            </span>
            <span className="block" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "14px", color: "var(--theme-muted)" }}>
              {opponent.name}
            </span>
          </div>
        </div>

        <div className="mb-4 reveal-animation" style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: result.winner === "player" ? "var(--pixel-green)" : "var(--pixel-terracotta)", lineHeight: "1.8" }}>
          {result.winner === "player" ? "🏆 VICTORY!" : "💀 DEFEATED!"}
        </div>

        <p className="mb-6" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>
          {result.narrative}
        </p>

        <button onClick={onContinue} className="pixel-btn">
          {result.winner === "player" ? "Next Round →" : "View Results"}
        </button>
      </div>
    </div>
  );
}
