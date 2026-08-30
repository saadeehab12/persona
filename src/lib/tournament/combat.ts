// ============================================================
// Persona — Tournament Combat Resolution Engine
// ============================================================

import { tournamentConfig, opponentStatRanges, type DraftOption } from "./config";

/** A character's final stat sheet */
export interface CharacterStats {
  strength: number;
  speed: number;
  durability: number;
  intelligence: number;
  special: number;
  [key: string]: number;
}

/** A character in the tournament */
export interface Character {
  name: string;
  stats: CharacterStats;
  /** Which draft options were selected */
  draftPicks: string[];
  /** Stats before final calculation */
  rawStats: Record<string, number>;
}

/** Result of a single combat encounter */
export interface CombatResult {
  winner: "player" | "opponent";
  /** Per-stat comparison showing which side won each */
  statBreakdown: Array<{
    statId: string;
    statName: string;
    playerValue: number;
    opponentValue: number;
    winner: "player" | "opponent" | "tie";
  }>;
  /** Final scores */
  playerScore: number;
  opponentScore: number;
  /** Random factor that was applied */
  randomRoll: number;
  /** Narrative text describing the outcome */
  narrative: string;
}

/**
 * Compute final stats from base stats + draft picks.
 * Sums all stat bonuses from selected options, then adds base stats.
 * Clamps to [1, maxValue].
 */
export function computeCharacterStats(selectedPicks: Record<string, DraftOption>): CharacterStats {
  const stats: CharacterStats = {
    strength: tournamentConfig.baseStats.strength,
    speed: tournamentConfig.baseStats.speed,
    durability: tournamentConfig.baseStats.durability,
    intelligence: tournamentConfig.baseStats.intelligence,
    special: tournamentConfig.baseStats.special,
  };

  // Sum all stat bonuses from selected picks
  for (const pick of Object.values(selectedPicks)) {
    for (const [statId, bonus] of Object.entries(pick.stats)) {
      if (stats[statId] !== undefined) {
        stats[statId] += bonus;
      }
    }
  }

  // Clamp to valid range
  for (const stat of tournamentConfig.stats) {
    const val = stats[stat.id];
    if (val !== undefined) {
      stats[stat.id] = Math.max(1, Math.min(stat.maxValue, val));
    }
  }

  return stats;
}

/**
 * Generate a seeded random number from a string seed.
 * Uses a simple hash function for deterministic randomness.
 */
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  // Map to 0-1 range
  return (Math.abs(hash) % 10000) / 10000;
}

/**
 * Generate an AI opponent with randomized stats.
 * Stats are within the opponent ranges, weighted to be competitive
 * with the player's character.
 */
export function generateOpponent(
  roundNumber: number,
  bracketSeed: number,
  playerStats?: CharacterStats
): Character {
  const seed = `opp-r${roundNumber}-s${bracketSeed}-${Date.now()}`;
  const rng = seededRandom(seed);

  const stats: CharacterStats = {
    strength: 10,
    speed: 10,
    durability: 10,
    intelligence: 10,
    special: 10,
  };

  // Scale opponent difficulty with round number (later rounds = stronger opponents)
  const difficultyScale = 0.8 + (roundNumber * 0.15);

  for (const stat of tournamentConfig.stats) {
    const range = opponentStatRanges[stat.id];
    if (range) {
      const base = range.min + (range.max - range.min) * rng;
      const scaled = base * difficultyScale;
      stats[stat.id] = Math.max(1, Math.min(stat.maxValue, Math.round(scaled)));
    }
  }

  // Generate a name from seed
  const prefixes = ["Shadow", "Storm", "Iron", "Crimson", "Frost", "Ember", "Void", "Blaze", "Rift", "Nova"];
  const suffixes = ["Fang", "Bane", "Walker", "Crown", "Shard", "Pulse", "Veil", "Forge", "Warden", "Sage"];
  const nameIdx = Math.floor(rng * prefixes.length);
  const sfxIdx = Math.floor(seededRandom(seed + "sfx") * suffixes.length);

  return {
    name: `${prefixes[nameIdx]} ${suffixes[sfxIdx]}`,
    stats,
    draftPicks: [],
    rawStats: { ...stats },
  };
}

/**
 * Resolve combat between two characters.
 * Uses weighted stat comparison + controlled randomness.
 *
 * ALGORITHM:
 * 1. For each stat, compare player vs opponent.
 * 2. Each stat contributes: (playerStat / (playerStat + opponentStat)) * statWeight
 * 3. Weight: STR/SPD/DUR = 1.0, INT = 0.8, SPL = 1.2
 * 4. Apply random roll within [minRoll, maxRoll] as percentage multiplier
 * 5. Final score = sum of weighted contributions * randomMultiplier
 * 6. Higher score wins
 */
export function resolveCombat(
  player: Character,
  opponent: Character,
  roundNumber: number
): CombatResult {
  const statWeights: Record<string, number> = {
    strength: 1.0,
    speed: 1.0,
    durability: 1.0,
    intelligence: 0.8,
    special: 1.2,
  };

  const statBreakdown: CombatResult["statBreakdown"] = [];
  let playerScore = 0;
  let opponentScore = 0;

  for (const stat of tournamentConfig.stats) {
    const pVal = player.stats[stat.id] ?? 1;
    const oVal = opponent.stats[stat.id] ?? 1;
    const weight = statWeights[stat.id] ?? 1.0;
    const total = pVal + oVal;

    const pContribution = (pVal / total) * weight;
    const oContribution = (oVal / total) * weight;

    playerScore += pContribution;
    opponentScore += oContribution;

    let winner: "player" | "opponent" | "tie" = "tie";
    if (pVal > oVal) winner = "player";
    else if (oVal > pVal) winner = "opponent";

    statBreakdown.push({
      statId: stat.id,
      statName: stat.name,
      playerValue: pVal,
      opponentValue: oVal,
      winner,
    });
  }

  // Apply randomness
  const seed = `combat-r${roundNumber}-${player.name}-${opponent.name}-${Date.now()}`;
  const rng = seededRandom(seed);
  const randomRoll =
    tournamentConfig.combat.minRoll +
    rng * (tournamentConfig.combat.maxRoll - tournamentConfig.combat.minRoll);
  const randomMultiplier = randomRoll / 100;

  playerScore *= randomMultiplier;
  // Opponent gets inverse randomness (if player got lucky, opponent gets less)
  const opponentMultiplier = (200 - randomRoll) / 100;
  opponentScore *= opponentMultiplier;

  const winner = playerScore >= opponentScore ? "player" : "opponent";

  // Generate narrative
  const narratives = winner === "player"
    ? [
        `A hard-fought victory! Your character's ${statBreakdown.find(s => s.winner === "player")?.statName ?? "power"} proved decisive.`,
        `You clinched it by a narrow margin — that ${statBreakdown[0]?.statName} advantage made all the difference.`,
        `Victory! Your strategic combination of stats overwhelmed the opponent.`,
        `An epic clash, but your character's versatility won the day.`,
      ]
    : [
        `A tough loss. Your opponent's stats were just too much this time.`,
        `So close! A different roll might have changed the outcome.`,
        `Defeated, but not without putting up a fierce fight.`,
        `Your opponent had the edge in a critical stat — that made the difference.`,
      ];

  const narrativeIdx = Math.floor(seededRandom(seed + "narrative") * narratives.length);

  return {
    winner,
    statBreakdown,
    playerScore: Math.round(playerScore * 100) / 100,
    opponentScore: Math.round(opponentScore * 100) / 100,
    randomRoll: Math.round(randomRoll),
    narrative: narratives[narrativeIdx],
  };
}

/** Generate a seeded opponent name for bracket display (deterministic) */
export function getOpponentName(roundNumber: number, slotIndex: number): string {
  const prefixes = ["Shadow", "Storm", "Iron", "Crimson", "Frost", "Ember", "Void", "Blaze", "Rift", "Nova"];
  const suffixes = ["Fang", "Bane", "Walker", "Crown", "Shard", "Pulse", "Veil", "Forge", "Warden", "Sage"];
  const seed = `name-r${roundNumber}-s${slotIndex}`;
  const pIdx = Math.floor(seededRandom(seed) * prefixes.length);
  const sIdx = Math.floor(seededRandom(seed + "x") * suffixes.length);
  return `${prefixes[pIdx]} ${suffixes[sIdx]}`;
}
