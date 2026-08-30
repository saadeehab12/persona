import type { QuizConfig, DecodedResult, QuizResult } from "./types";
import { getQuizBySlug } from "./registry";

/**
 * URL-safe Base64 encoding (RFC 4648 5).
 * Works in both browser and Node.js.
 */
function b64urlEncode(data: string): string {
  // Use TextEncoder + btoa for browser compat
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
 * Encode a quiz result into a URL-safe string.
 * Format: base64url(JSON({ o: outcomeId, s: scores[] }))
 */
export function encodeResult(result: QuizResult, config: QuizConfig): string {
  const orderedScores = config.outcomes.map((o) => result.scores[o.id] ?? 0);
  const payload = { o: result.outcomeId, s: orderedScores };
  return b64urlEncode(JSON.stringify(payload));
}

/**
 * Decode a URL-safe result string back into a DecodedResult.
 * Purely deterministic — no server lookup needed.
 */
export function decodeResult(slug: string, encoded: string): DecodedResult | null {
  try {
    const config = getQuizBySlug(slug);
    if (!config) return null;

    const json = b64urlDecode(encoded);
    const payload = JSON.parse(json) as { o: string; s: number[] };
    if (!payload.o || !Array.isArray(payload.s)) return null;

    const outcome = config.outcomes.find((o) => o.id === payload.o);
    if (!outcome) return null;

    const scores: Record<string, number> = {};
    const totalScore = payload.s.reduce((a, b) => a + b, 0);
    config.outcomes.forEach((o, i) => {
      scores[o.id] = payload.s[i] ?? 0;
    });

    const percentage: Record<string, number> = {};
    for (const [id, score] of Object.entries(scores)) {
      percentage[id] = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
    }

    return { quiz: config, outcome, scores, percentage };
  } catch {
    return null;
  }
}
