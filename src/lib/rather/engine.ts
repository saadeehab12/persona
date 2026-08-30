// ============================================================
// Persona — Would You Rather Engine
// ============================================================

import type { RatherDeck, RatherQuestion, RatherResult } from "./types";
import { getDeckBySlug } from "./decks";

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
 * Score a Would You Rather run: count wild picks.
 */
export function scoreDeck(
  deck: RatherDeck,
  picks: ("a" | "b")[]
): { wildCount: number; total: number; title: string; description: string } {
  let wildCount = 0;
  picks.forEach((pick, i) => {
    const q = deck.questions[i];
    if (q && q.wildSide === pick) {
      wildCount++;
    }
  });

  const total = deck.questions.length;
  const ratio = wildCount / total;

  let title: string;
  let description: string;
  if (ratio >= 0.6) {
    title = deck.summary.wildTitle;
    description = deck.summary.wildDescription;
  } else if (ratio <= 0.4) {
    title = deck.summary.safeTitle;
    description = deck.summary.safeDescription;
  } else {
    title = deck.summary.balancedTitle;
    description = deck.summary.balancedDescription;
  }

  return { wildCount, total, title, description };
}

/**
 * Encode a Would You Rather result into a URL-safe string.
 */
export function encodeRatherResult(
  deckSlug: string,
  picks: ("a" | "b")[],
  wildCount: number
): string {
  const payload = { d: deckSlug, p: picks, w: wildCount };
  return b64urlEncode(JSON.stringify(payload));
}

/**
 * Decode a URL-safe result string back into a RatherResult.
 */
export function decodeRatherResult(encoded: string): {
  deck: RatherDeck;
  picks: ("a" | "b")[];
  wildCount: number;
  title: string;
  description: string;
} | null {
  try {
    const json = b64urlDecode(encoded);
    const payload = JSON.parse(json) as {
      d: string;
      p: string[];
      w: number;
    };
    if (!payload.d || !Array.isArray(payload.p)) return null;

    const deck = getDeckBySlug(payload.d);
    if (!deck) return null;

    const picks = payload.p as ("a" | "b")[];
    const result = scoreDeck(deck, picks);

    return {
      deck,
      picks,
      wildCount: payload.w ?? result.wildCount,
      title: result.title,
      description: result.description,
    };
  } catch {
    return null;
  }
}
