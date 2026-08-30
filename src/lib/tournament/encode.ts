// ============================================================
// Persona — Tournament Result Encoding/Decoding
// ============================================================

import type { CharacterStats, Character } from "./combat";
import type { TournamentBracket } from "./bracket";

/** Encoded tournament result for URL sharing */
export interface EncodedTournamentResult {
  /** Character stats */
  s: number[];
  /** Character draft picks (category id -> option id) */
  p: Record<string, string>;
  /** Final result */
  r: "champion" | "eliminated";
  /** Round eliminated (if applicable) */
  e?: number;
  /** Player path (round -> result) */
  h: Array<[number, "w" | "l"]>;
}

/** Full decoded result ready for display */
export interface DecodedTournamentResult {
  stats: CharacterStats;
  draftPicks: Record<string, string>;
  finalResult: "champion" | "eliminated";
  eliminatedRound?: number;
  roundsWon: number;
}

/** URL-safe Base64 encoding (RFC 4648 5) */
function b64urlEncode(data: string): string {
  const bytes = new TextEncoder().encode(data);
  let binary = "";
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Encode a tournament result into a URL-safe string.
 */
export function encodeTournamentResult(
  stats: CharacterStats,
  draftPicks: Record<string, string>,
  finalResult: "champion" | "eliminated",
  eliminatedRound: number | undefined,
  history: Array<{ round: number; result: "win" | "loss" }>
): string {
  const payload: EncodedTournamentResult = {
    s: [
      stats.strength,
      stats.speed,
      stats.durability,
      stats.intelligence,
      stats.special,
    ],
    p: draftPicks,
    r: finalResult,
    e: eliminatedRound,
    h: history.map(h => [h.round, h.result === "win" ? "w" : "l"]),
  };

  return b64urlEncode(JSON.stringify(payload));
}

/**
 * Decode a URL-safe result string back into a DecodedTournamentResult.
 */
export function decodeTournamentResult(encoded: string): DecodedTournamentResult | null {
  try {
    const json = b64urlDecode(encoded);
    const payload = JSON.parse(json) as EncodedTournamentResult;

    if (!payload.s || !Array.isArray(payload.s) || payload.s.length !== 5) return null;
    if (!payload.r || (payload.r !== "champion" && payload.r !== "eliminated")) return null;

    const stats: CharacterStats = {
      strength: payload.s[0],
      speed: payload.s[1],
      durability: payload.s[2],
      intelligence: payload.s[3],
      special: payload.s[4],
    };

    return {
      stats,
      draftPicks: payload.p ?? {},
      finalResult: payload.r,
      eliminatedRound: payload.e,
      roundsWon: payload.h?.filter(h => h[1] === "w").length ?? 0,
    };
  } catch {
    return null;
  }
}
