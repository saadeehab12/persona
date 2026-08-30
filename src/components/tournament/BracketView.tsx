"use client";

import type { TournamentBracket } from "@/lib/tournament/bracket";
import { roundNames } from "@/lib/tournament/config";

interface BracketViewProps {
  bracket: TournamentBracket;
  playerName: string;
}

export default function BracketView({ bracket, playerName }: BracketViewProps) {
  return (
    <div className="w-full overflow-x-auto">
      {/* Desktop wide bracket */}
      <div className="hidden md:block min-w-[700px]">
        <div className="flex items-start gap-0">
          {bracket.rounds.map((round, roundIdx) => (
            <div key={roundIdx} className="flex flex-col" style={{ flex: `1 1 ${100 / bracket.rounds.length}%` }}>
              <div className="text-center mb-3 px-2">
                <span style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "var(--theme-muted)", letterSpacing: "1px" }}>
                  {(roundNames[roundIdx] ?? `Round ${roundIdx + 1}`).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col justify-around gap-2" style={{ minHeight: `${round.length * 100}px` }}>
                {round.map((match) => (
                  <MatchCard key={match.id} match={match} playerName={playerName} isCurrentRound={roundIdx === bracket.currentRound} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical view */}
      <div className="md:hidden space-y-3">
        {bracket.rounds.map((round, roundIdx) => (
          <div key={roundIdx}>
            <div className="mb-2 pl-2" style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "var(--theme-muted)", letterSpacing: "1px" }}>
              {(roundNames[roundIdx] ?? `Round ${roundIdx + 1}`).toUpperCase()}
            </div>
            <div className="space-y-2">
              {round.map((match) => (
                <MatchCard key={match.id} match={match} playerName={playerName} isCurrentRound={roundIdx === bracket.currentRound} compact />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchCard({
  match,
  playerName,
  isCurrentRound,
  compact = false,
}: {
  match: { playerHere: boolean; opponentName: string; result?: "win" | "loss"; played: boolean };
  playerName: string;
  isCurrentRound: boolean;
  compact?: boolean;
}) {
  const isActive = isCurrentRound && match.playerHere && !match.played;
  const borderColor = isActive
    ? "var(--theme-accent)"
    : match.played && match.result === "win"
    ? "var(--pixel-green)"
    : match.played && match.result === "loss"
    ? "var(--pixel-terracotta)"
    : "var(--pixel-card-border)";

  return (
    <div
      className={`rounded-none ${compact ? "p-2" : "p-3"}`}
      style={{
        border: `2px solid ${borderColor}`,
        boxShadow: isActive ? `3px 3px 0px var(--pixel-shadow)` : "none",
        backgroundColor: "var(--pixel-card-bg)",
      }}
    >
      {match.playerHere ? (
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: compact ? "14px" : "16px", color: "var(--theme-accent)", fontWeight: 700 }}>
            {playerName}
          </span>
          {match.played && (
            <span className="pixel-tag" style={{ backgroundColor: match.result === "win" ? "var(--pixel-green)" : "var(--pixel-terracotta)", color: "var(--pixel-cream)", fontSize: "8px" }}>
              {match.result === "win" ? "W" : "L"}
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: compact ? "14px" : "16px", color: "var(--theme-muted)" }}>?</span>
        </div>
      )}

      <div className="my-1 text-center" style={{ fontFamily: "var(--font-pixel)", fontSize: "6px", color: "var(--theme-muted)" }}>VS</div>

      <div className="flex items-center justify-between">
        <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: compact ? "14px" : "16px", color: "var(--theme-text)" }}>
          {match.opponentName}
        </span>
        {match.played && match.playerHere && (
          <span className="pixel-tag" style={{ backgroundColor: match.result === "win" ? "var(--pixel-terracotta)" : "var(--pixel-green)", color: "var(--pixel-cream)", fontSize: "8px" }}>
            {match.result === "win" ? "L" : "W"}
          </span>
        )}
      </div>
    </div>
  );
}
