// ============================================================
// Persona — Pick One Bracket Type Definitions
// ============================================================

/** A single item in the bracket */
export interface PickOneItem {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

/** A themed bracket config */
export interface PickOneBracket {
  slug: string;
  title: string;
  description: string;
  icon: string;
  /** Must be exactly 16 items */
  items: PickOneItem[];
}

/** A match in the bracket */
export interface BracketMatch {
  id: string;
  round: number;
  slotIndex: number;
  itemA: PickOneItem | null;
  itemB: PickOneItem | null;
  winner: PickOneItem | null;
}

/** Full bracket state */
export interface BracketState {
  rounds: BracketMatch[][];
  currentRound: number;
  currentMatchIndex: number;
  complete: boolean;
  champion: PickOneItem | null;
}
