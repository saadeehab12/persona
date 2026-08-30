// ============================================================
// Persona — Pick One Bracket Engine
// ============================================================

import type { PickOneBracket, PickOneItem, BracketMatch, BracketState } from "./types";
import { getBracketBySlug } from "./brackets";

/** URL-safe Base64 encoding */
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
 * Generate a fresh bracket state from a config.
 * Round 0 has 8 matches (16 items → 8), then 4, 2, 1.
 */
export function generateBracket(config: PickOneBracket): BracketState {
  const items = [...config.items];
  const rounds: BracketMatch[][] = [];
  let roundItems = items;

  let slotIdx = 0;
  while (roundItems.length >= 2) {
    const matches: BracketMatch[] = [];
    for (let i = 0; i < roundItems.length; i += 2) {
      matches.push({
        id: `r${rounds.length}-m${Math.floor(i / 2)}`,
        round: rounds.length,
        slotIndex: Math.floor(i / 2),
        itemA: roundItems[i] ?? null,
        itemB: roundItems[i + 1] ?? null,
        winner: null,
      });
    }
    rounds.push(matches);
    roundItems = [];
    slotIdx = 0;
  }

  return {
    rounds,
    currentRound: 0,
    currentMatchIndex: 0,
    complete: false,
    champion: null,
  };
}

/**
 * Get the current active match.
 */
export function getCurrentMatch(state: BracketState): BracketMatch | null {
  if (state.complete) return null;
  const round = state.rounds[state.currentRound];
  if (!round) return null;
  return round[state.currentMatchIndex] ?? null;
}

/**
 * Pick a winner in the current match and advance the bracket.
 */
export function pickWinner(
  state: BracketState,
  winnerId: string
): BracketState {
  const newRound = state.rounds.map((r) => r.map((m) => ({ ...m })));
  const match = newRound[state.currentRound]?.[state.currentMatchIndex];
  if (!match) return state;

  const winner =
    match.itemA?.id === winnerId ? match.itemA : match.itemB?.id === winnerId ? match.itemB : null;
  if (!winner) return state;

  match.winner = winner;

  // Advance to next match or next round
  let newMatchIdx = state.currentMatchIndex + 1;
  let newRoundIdx = state.currentRound;

  const currentRoundMatches = newRound[state.currentRound] ?? [];
  if (newMatchIdx >= currentRoundMatches.length) {
    // Move to next round
    newRoundIdx = state.currentRound + 1;
    newMatchIdx = 0;

    // Place winners in next round
    if (newRoundIdx < newRound.length) {
      const nextRound = newRound[newRoundIdx];
      for (let i = 0; i < currentRoundMatches.length; i += 2) {
        const nextMatchIdx = Math.floor(i / 2);
        if (nextRound[nextMatchIdx]) {
          nextRound[nextMatchIdx].itemA = currentRoundMatches[i]?.winner ?? null;
          nextRound[nextMatchIdx].itemB = currentRoundMatches[i + 1]?.winner ?? null;
        }
      }
    }
  }

  const complete = newRoundIdx >= newRound.length;
  const champion = complete
    ? newRound[newRound.length - 1]?.[0]?.winner ?? null
    : null;

  return {
    rounds: newRound,
    currentRound: newRoundIdx,
    currentMatchIndex: newMatchIdx,
    complete,
    champion,
  };
}

/**
 * Get the round name.
 */
export function getRoundName(roundIndex: number, totalRounds: number): string {
  const roundsLeft = totalRounds - roundIndex;
  if (roundsLeft === 1) return "Finals";
  if (roundsLeft === 2) return "Semifinals";
  if (roundsLeft === 3) return "Quarterfinals";
  return `Round ${roundIndex + 1}`;
}

/**
 * Encode the full bracket path into a shareable URL.
 */
export function encodePickOneResult(
  bracketSlug: string,
  champion: PickOneItem,
  path: Array<{ round: number; pick: string }>
): string {
  const payload = {
    b: bracketSlug,
    c: champion.id,
    n: champion.name,
    i: champion.icon,
    p: path.map((h) => h.pick),
  };
  return b64urlEncode(JSON.stringify(payload));
}

/**
 * Decode a shareable result.
 */
export function decodePickOneResult(encoded: string): {
  bracket: PickOneBracket;
  champion: PickOneItem;
  picks: string[];
} | null {
  try {
    const json = b64urlDecode(encoded);
    const payload = JSON.parse(json) as {
      b: string;
      c: string;
      n: string;
      i: string;
      p: string[];
    };
    if (!payload.b || !payload.c) return null;

    const bracket = getBracketBySlug(payload.b);
    if (!bracket) return null;

    const champion: PickOneItem = {
      id: payload.c,
      name: payload.n,
      icon: payload.i,
    };

    return { bracket, champion, picks: payload.p ?? [] };
  } catch {
    return null;
  }
}
