// ============================================================
// Persona — Life Simulator Engine
// ============================================================

import { lifeConfig, type LifeOutcome } from "./config";

/** URL-safe Base64 encoding */
function b64urlEncode(data: string): string {
  const bytes = new TextEncoder().encode(data);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

/** Compute tag totals from picks */
export function computeTags(picks: string[]): Record<string, number> {
  const tags: Record<string, number> = {};
  picks.forEach((pickId, stageIdx) => {
    const stage = lifeConfig.stages[stageIdx];
    if (!stage) return;
    const choice = stage.choices.find((c) => c.id === pickId);
    if (!choice) return;
    for (const [tag, val] of Object.entries(choice.tags)) {
      tags[tag] = (tags[tag] ?? 0) + val;
    }
  });
  return tags;
}

/** Find the best matching career */
export function findCareer(tags: Record<string, number>) {
  let best = lifeConfig.careers[0];
  let bestScore = -Infinity;
  for (const career of lifeConfig.careers) {
    let score = 0;
    for (const [tag, weight] of Object.entries(career.tags)) {
      score += (tags[tag] ?? 0) * weight;
    }
    // Add a small random factor for variety
    score += Math.random() * 2;
    if (score > bestScore) {
      bestScore = score;
      best = career;
    }
  }
  return best;
}

/** Find the best matching trait */
export function findTrait(tags: Record<string, number>) {
  let best = lifeConfig.traits[0];
  let bestScore = -Infinity;
  for (const trait of lifeConfig.traits) {
    let score = 0;
    for (const [tag, weight] of Object.entries(trait.tags)) {
      score += (tags[tag] ?? 0) * weight;
    }
    score += Math.random() * 2;
    if (score > bestScore) {
      bestScore = score;
      best = trait;
    }
  }
  return best;
}

/** Find the life outcome (if any) */
export function findOutcome(tags: Record<string, number>): LifeOutcome | null {
  let best: LifeOutcome | null = null;
  let bestScore = 0;

  for (const outcome of lifeConfig.outcomes) {
    let score = 0;
    for (const [tag, weight] of Object.entries(outcome.requiredTags)) {
      if ((tags[tag] ?? 0) >= weight) score += weight;
    }
    if (score > bestScore) {
      bestScore = score;
      best = outcome;
    }
  }

  // Only return if tags are strong enough (at least 2 categories hit)
  return bestScore >= 4 ? best : null;
}

/** Compute the life summary from picks */
export function computeLifeSummary(picks: string[]) {
  const tags = computeTags(picks);
  const career = findCareer(tags);
  const trait = findTrait(tags);
  const outcome = findOutcome(tags);
  return { tags, career, trait, outcome };
}

/** Encode life result for URL sharing */
export function encodeLifeResult(picks: string[]): string {
  return b64urlEncode(JSON.stringify({ p: picks }));
}

/** Decode life result from URL */
export function decodeLifeResult(encoded: string): string[] | null {
  try {
    const json = b64urlDecode(encoded);
    const payload = JSON.parse(json) as { p: string[] };
    if (!Array.isArray(payload.p)) return null;
    return payload.p;
  } catch {
    return null;
  }
}
