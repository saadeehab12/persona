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
      {/* Desktop wide bracket view */}
      <div className="hidden md:block min-w-[700px]">
        <div className="flex items-start gap-0">
          {bracket.rounds.map((round, roundIdx) => (
            <div
              key={roundIdx}
              className="flex flex-col"
              style={{ flex: `1 1 ${100 / bracket.rounds.length}%` }}
            >
              {/* Round header */}
              <div
                className="text-center mb-4 px-2"
              >
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: "var(--theme-muted)" }}
                >
                  {roundNames[roundIdx] ?? `Round ${roundIdx + 1}`}
                </span>
              </div>

              {/* Matches */}
              <div
                className="flex flex-col justify-around gap-2"
                style={{ minHeight: `${round.length * 120}px` }}
              >
                {round.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    playerName={playerName}
                    isCurrentRound={roundIdx === bracket.currentRound}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical stepped view */}
      <div className="md:hidden space-y-4">
        {bracket.rounds.map((round, roundIdx) => (
          <div key={roundIdx}>
            <div
              className="text-xs font-bold uppercase tracking-wider mb-2 pl-4"
              style={{ color: "var(--theme-muted)" }}
            >
              {roundNames[roundIdx] ?? `Round ${roundIdx + 1}`}
            </div>
            <div className="space-y-2">
              {round.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  playerName={playerName}
                  isCurrentRound={roundIdx === bracket.currentRound}
                  compact
                />
              ))}
            </div>
            {roundIdx < bracket.rounds.length - 1 && (
              <div className="flex justify-center my-2">
                <div
                  className="w-0.5 h-4"
                  style={{ backgroundColor: "var(--theme-border)" }}
                />
              </div>
            )}
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
    ? "#4CAF50"
    : match.played && match.result === "loss"
    ? "#E85D3A"
    : "var(--theme-border)";

  return (
    <div
      className={`rounded-xl border-2 ${compact ? "p-3" : "p-3"} transition-all ${
        isActive ? "shadow-lg" : ""
      }`}
      style={{
        borderColor,
        backgroundColor: "var(--theme-surface)",
        opacity: match.played && !match.playerHere && !isActive ? 0.5 : 1,
      }}
    >
      {/* Player slot */}
      {match.playerHere ? (
        <div className="flex items-center justify-between">
          <span
            className={`font-bold ${compact ? "text-xs" : "text-sm"}`}
            style={{ color: "var(--theme-accent)" }}
          >
            {playerName}
          </span>
          {match.played && (
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                match.result === "win" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: match.result === "win" ? "#4CAF50" : "#E85D3A",
                color: "white",
              }}
            >
              {match.result === "win" ? "W" : "L"}
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span
            className={`${compact ? "text-xs" : "text-sm"}`}
            style={{ color: "var(--theme-muted)" }}
          >
            ?
          </span>
          {match.played && (
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
              }}
            >
              W
            </span>
          )}
        </div>
      )}

      {/* VS divider */}
      <div
        className="my-1 text-center text-xs font-bold"
        style={{ color: "var(--theme-muted)" }}
      >
        vs
      </div>

      {/* Opponent slot */}
      <div className="flex items-center justify-between">
        <span
          className={`${compact ? "text-xs" : "text-sm"}`}
          style={{ color: "var(--theme-text)" }}
        >
          {match.opponentName}
        </span>
        {match.played && match.playerHere && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: match.result === "win" ? "#E85D3A" : "#4CAF50",
              color: "white",
            }}
          >
            {match.result === "win" ? "L" : "W"}
          </span>
        )}
      </div>
    </div>
  );
}
