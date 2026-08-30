// ============================================================
// Persona — Tournament Bracket Logic
// ============================================================

import { tournamentConfig, roundNames } from "./config";
import { getOpponentName } from "./combat";

export interface BracketMatch {
  id: string;
  round: number;
  slotIndex: number;
  /** Player name if they've reached this match */
  playerHere: boolean;
  /** Opponent name */
  opponentName: string;
  /** Result once resolved */
  result?: "win" | "loss";
  /** Whether this match has been played */
  played: boolean;
}

export interface TournamentBracket {
  /** All rounds, each containing matches */
  rounds: BracketMatch[][];
  /** Current round number (0-indexed) */
  currentRound: number;
  /** Player's progression path */
  playerPath: Array<{ round: number; result: "win" | "loss" }>;
  /** Whether tournament is complete */
  complete: boolean;
  /** Final result if complete */
  finalResult?: "champion" | "eliminated";
  /** Round where eliminated (if applicable) */
  eliminatedRound?: number;
}

/**
 * Generate a tournament bracket for the given size.
 * Player always starts in round 0, slot 0.
 */
export function generateBracket(): TournamentBracket {
  const totalRounds = Math.log2(tournamentConfig.bracketSize);
  const rounds: BracketMatch[][] = [];

  for (let round = 0; round < totalRounds; round++) {
    const matchesInRound = tournamentConfig.bracketSize / Math.pow(2, round + 1);
    const roundMatches: BracketMatch[] = [];

    for (let slot = 0; slot < matchesInRound; slot++) {
      const isPlayerSlot = round === 0 && slot === 0;
      roundMatches.push({
        id: `r${round}-m${slot}`,
        round,
        slotIndex: slot,
        playerHere: isPlayerSlot,
        opponentName: getOpponentName(round, slot),
        played: false,
      });
    }

    rounds.push(roundMatches);
  }

  return {
    rounds,
    currentRound: 0,
    playerPath: [],
    complete: false,
  };
}

/**
 * Advance the bracket after a match result.
 * If player won, they move to the next round.
 * If player lost, tournament is over.
 */
export function advanceBracket(
  bracket: TournamentBracket,
  result: "win" | "loss"
): TournamentBracket {
  const newBracket = { ...bracket };
  newBracket.rounds = bracket.rounds.map(r => r.map(m => ({ ...m })));
  newBracket.playerPath = [...bracket.playerPath];

  const currentRound = bracket.rounds[bracket.currentRound];
  if (!currentRound) return newBracket;

  // Mark current match as played
  const playerMatch = currentRound.find(m => m.playerHere);
  if (playerMatch) {
    playerMatch.played = true;
    playerMatch.result = result;
  }

  newBracket.playerPath.push({
    round: bracket.currentRound,
    result,
  });

  if (result === "loss") {
    newBracket.complete = true;
    newBracket.finalResult = "eliminated";
    newBracket.eliminatedRound = bracket.currentRound;
    return newBracket;
  }

  // Player won — move to next round
  const nextRoundIdx = bracket.currentRound + 1;
  newBracket.currentRound = nextRoundIdx;

  if (nextRoundIdx >= bracket.rounds.length) {
    // Won the finals!
    newBracket.complete = true;
    newBracket.finalResult = "champion";
    return newBracket;
  }

  // Place player in next round
  if (playerMatch) {
    const nextRound = newBracket.rounds[nextRoundIdx];
    const playerSlot = Math.floor(playerMatch.slotIndex / 2);
    if (nextRound[playerSlot]) {
      nextRound[playerSlot].playerHere = true;
    }
  }

  return newBracket;
}

/**
 * Get the current active match for the player.
 */
export function getCurrentMatch(bracket: TournamentBracket): BracketMatch | null {
  if (bracket.complete) return null;
  const round = bracket.rounds[bracket.currentRound];
  if (!round) return null;
  return round.find(m => m.playerHere) ?? null;
}

/**
 * Get a human-readable description of the bracket state.
 */
export function getBracketStatusText(bracket: TournamentBracket): string {
  if (bracket.complete) {
    if (bracket.finalResult === "champion") return "🏆 Tournament Champion!";
    return `Eliminated in ${roundNames[bracket.eliminatedRound ?? 0]}`;
  }
  const roundName = roundNames[bracket.currentRound] ?? `Round ${bracket.currentRound + 1}`;
  return `${roundName} — ${bracket.rounds[bracket.currentRound]?.length ?? 0} matches remaining`;
}
