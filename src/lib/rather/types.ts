// ============================================================
// Persona — Would You Rather Type Definitions
// ============================================================

/** A single "This or That" question pair */
export interface RatherQuestion {
  id: string;
  /** Option A (the "safe/boring" side) */
  optionA: string;
  /** Option B (the "wild/chaotic" side) */
  optionB: string;
  /** Which side is "wild" — "a" or "b" */
  wildSide: "a" | "b";
}

/** A themed deck of Would You Rather questions */
export interface RatherDeck {
  slug: string;
  title: string;
  description: string;
  icon: string;
  questions: RatherQuestion[];
  /** Summary labels for the results */
  summary: {
    /** Label when user picks mostly wild */
    wildTitle: string;
    wildDescription: string;
    /** Label when user picks mostly safe */
    safeTitle: string;
    safeDescription: string;
    /** Label when balanced */
    balancedTitle: string;
    balancedDescription: string;
  };
}

/** Encoded result for URL sharing */
export interface RatherResult {
  deckSlug: string;
  /** Array of "a" or "b" picks */
  picks: string[];
  /** Number of wild picks */
  wildCount: number;
  /** Total questions */
  total: number;
}
