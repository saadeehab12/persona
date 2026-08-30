// ============================================================
// Persona — Tournament Character Draft Config
// ============================================================

export interface DraftOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** Stat bonuses: { statName: weight } */
  stats: Record<string, number>;
}

export interface DraftCategory {
  id: string;
  name: string;
  description: string;
  /** How many picks from this category */
  picks: number;
  options: DraftOption[];
}

export interface StatDefinition {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  maxValue: number;
}

export interface TournamentConfig {
  /** All stats used in the game */
  stats: StatDefinition[];
  /** Draft categories in order */
  categories: DraftCategory[];
  /** Bracket size (number of participants) */
  bracketSize: number;
  /** Base stats every character starts with */
  baseStats: Record<string, number>;
  /** Combat formula parameters */
  combat: {
    /** How much the random factor contributes (0-1) */
    randomnessFactor: number;
    /** Minimum roll */
    minRoll: number;
    /** Maximum roll */
    maxRoll: number;
  };
}

/** Opponent generation ranges per stat (min/max) */
export const opponentStatRanges: Record<string, { min: number; max: number }> = {};

export const tournamentConfig: TournamentConfig = {
  stats: [
    { id: "strength", name: "Strength", shortName: "STR", icon: "💪", color: "#E85D3A", maxValue: 100 },
    { id: "speed", name: "Speed", shortName: "SPD", icon: "⚡", color: "#FFB400", maxValue: 100 },
    { id: "durability", name: "Durability", shortName: "DUR", icon: "🛡️", color: "#4A90D9", maxValue: 100 },
    { id: "intelligence", name: "Intelligence", shortName: "INT", icon: "🧠", color: "#9B59B6", maxValue: 100 },
    { id: "special", name: "Special", shortName: "SPL", icon: "✨", color: "#2EC4B6", maxValue: 100 },
  ],
  categories: [
    // === CATEGORY 1: POWER SOURCE ===
    {
      id: "power",
      name: "Power Source",
      description: "Where does your strength come from?",
      picks: 1,
      options: [
        { id: "cosmic", name: "Cosmic Energy", description: "Harness the power of stars", icon: "🌌", stats: { strength: 8, speed: 5, durability: 3, intelligence: 2, special: 12 } },
        { id: "biological", name: "Biological Mutation", description: "Evolution pushed you beyond human limits", icon: "🧬", stats: { strength: 10, speed: 6, durability: 8, intelligence: 2, special: 4 } },
        { id: "technological", name: "Tech-Augmented", description: "Nanobots and neural implants power you", icon: "🤖", stats: { strength: 4, speed: 4, durability: 5, intelligence: 12, special: 5 } },
        { id: "arcane", name: "Arcane Magic", description: "Ancient forces bend to your will", icon: "🔮", stats: { strength: 3, speed: 3, durability: 2, intelligence: 8, special: 14 } },
        { id: "elemental", name: "Elemental Bond", description: "Fire, ice, earth, and storm flow through you", icon: "🌊", stats: { strength: 6, speed: 7, durability: 4, intelligence: 4, special: 9 } },
        { id: "psionic", name: "Psionic Mind", description: "Your mind is your greatest weapon", icon: "🌀", stats: { strength: 2, speed: 5, durability: 2, intelligence: 14, special: 7 } },
      ],
    },
    // === CATEGORY 2: RACE / SPECIES ===
    {
      id: "species",
      name: "Species",
      description: "What are you?",
      picks: 1,
      options: [
        { id: "human-evolved", name: "Evolved Human", description: "Peak of human potential", icon: "👤", stats: { strength: 5, speed: 5, durability: 5, intelligence: 5, special: 5 } },
        { id: "celestial", name: "Celestial Being", description: "Born from the fabric of space", icon: "⭐", stats: { strength: 4, speed: 6, durability: 4, intelligence: 4, special: 12 } },
        { id: "forgeborn", name: "Forgeborn", description: "Living metal and burning core", icon: "⚙️", stats: { strength: 10, speed: 2, durability: 12, intelligence: 3, special: 3 } },
        { id: "shadowkin", name: "Shadowkin", description: "Denizens of the dark between worlds", icon: "🌑", stats: { strength: 3, speed: 10, durability: 3, intelligence: 6, special: 8 } },
        { id: "verdant", name: "Verdant One", description: "Nature made sentient and powerful", icon: "🌿", stats: { strength: 7, speed: 3, durability: 10, intelligence: 4, special: 6 } },
        { id: "abyssal", name: "Abyssal", description: "Forged in the deepest trenches", icon: "🦑", stats: { strength: 8, speed: 5, durability: 8, intelligence: 5, special: 4 } },
      ],
    },
    // === CATEGORY 3: AGE / ERA ===
    {
      id: "era",
      name: "Age",
      description: "How ancient is your power?",
      picks: 1,
      options: [
        { id: "newborn", name: "Just Awakened", description: "Raw, untested, but bursting with potential", icon: "🌅", stats: { strength: 2, speed: 4, durability: 2, intelligence: 2, special: 3 } },
        { id: "young", name: "Young Warrior", description: "In your prime, hungry to prove yourself", icon: "🔥", stats: { strength: 5, speed: 6, durability: 4, intelligence: 3, special: 4 } },
        { id: "seasoned", name: "Battle-Tested", description: "Decades of combat have honed you", icon: "⚔️", stats: { strength: 5, speed: 4, durability: 6, intelligence: 5, special: 3 } },
        { id: "ancient", name: "Ancient One", description: "Centuries of knowledge and power", icon: "🏛️", stats: { strength: 4, speed: 2, durability: 8, intelligence: 10, special: 6 } },
        { id: "timeless", name: "Timeless", description: "Existed since before recorded history", icon: "⏳", stats: { strength: 6, speed: 4, durability: 7, intelligence: 8, special: 5 } },
      ],
    },
    // === CATEGORY 4: CLASS / ROLE ===
    {
      id: "role",
      name: "Class",
      description: "What is your combat role?",
      picks: 1,
      options: [
        { id: "vanguard", name: "Vanguard", description: "First into the fight, last to fall", icon: "🛡️", stats: { strength: 8, speed: 3, durability: 10, intelligence: 2, special: 2 } },
        { id: "striker", name: "Striker", description: "Speed and precision over brute force", icon: "🗡️", stats: { strength: 4, speed: 12, durability: 2, intelligence: 4, special: 4 } },
        { id: "tactician", name: "Tactician", description: "Outthink before you outfight", icon: "♟️", stats: { strength: 3, speed: 4, durability: 3, intelligence: 12, special: 5 } },
        { id: "berserker", name: "Berserker", description: "Unleash devastation without restraint", icon: "🪓", stats: { strength: 14, speed: 4, durability: 3, intelligence: 1, special: 4 } },
        { id: "mystic", name: "Mystic", description: "Channel forces beyond comprehension", icon: "🌀", stats: { strength: 2, speed: 3, durability: 2, intelligence: 6, special: 14 } },
        { id: "paladin", name: "Paladin", description: "Balance of might and magic", icon: "⚜️", stats: { strength: 6, speed: 4, durability: 6, intelligence: 4, special: 6 } },
      ],
    },
    // === CATEGORY 5: ORIGIN STORY ===
    {
      id: "origin",
      name: "Origin",
      description: "How did you get your powers?",
      picks: 1,
      options: [
        { id: "chosen", name: "Chosen One", description: "Destiny selected you", icon: "👑", stats: { strength: 3, speed: 3, durability: 3, intelligence: 3, special: 8 } },
        { id: "accident", name: "Freak Accident", description: "A lab experiment gone spectacular", icon: "💥", stats: { strength: 6, speed: 5, durability: 4, intelligence: 4, special: 5 } },
        { id: "training", name: "Relentless Training", description: "You earned every ounce of power", icon: "🏋️", stats: { strength: 8, speed: 6, durability: 6, intelligence: 4, special: 1 } },
        { id: "bloodline", name: "Ancient Bloodline", description: "Power runs in your veins", icon: "🩸", stats: { strength: 5, speed: 4, durability: 5, intelligence: 5, special: 7 } },
        { id: "rebirth", name: "Death and Rebirth", description: "What killed you made you stronger", icon: "🔥", stats: { strength: 6, speed: 5, durability: 8, intelligence: 3, special: 6 } },
        { id: "artifact", name: "Artifact Bond", description: "An ancient object chose you as its wielder", icon: "💎", stats: { strength: 4, speed: 4, durability: 4, intelligence: 6, special: 10 } },
      ],
    },
    // === CATEGORY 6: SPECIAL TRAIT ===
    {
      id: "trait",
      name: "Special Trait",
      description: "What makes you unique?",
      picks: 1,
      options: [
        { id: "adaptability", name: "Adaptability", description: "You evolve mid-battle", icon: "🦎", stats: { strength: 4, speed: 4, durability: 4, intelligence: 4, special: 6 } },
        { id: "regeneration", name: "Regeneration", description: "Wounds close in seconds", icon: "💚", stats: { strength: 2, speed: 2, durability: 14, intelligence: 1, special: 3 } },
        { id: "sensory", name: "Enhanced Senses", description: "Nothing escapes your perception", icon: "👁️", stats: { strength: 2, speed: 6, durability: 2, intelligence: 10, special: 4 } },
        { id: "shape-shifter", name: "Shape-Shifter", description: "Become anything you can imagine", icon: "🎭", stats: { strength: 5, speed: 5, durability: 4, intelligence: 5, special: 7 } },
        { id: "time-warp", name: "Time Manipulation", description: "Slow, stop, or reverse the flow of time", icon: "⏰", stats: { strength: 3, speed: 10, durability: 3, intelligence: 6, special: 8 } },
        { id: "void-walker", name: "Void Walker", description: "Step between dimensions at will", icon: "🕳️", stats: { strength: 4, speed: 8, durability: 3, intelligence: 5, special: 10 } },
      ],
    },
    // === CATEGORY 7: WEAKNESS (negative stat) ===
    {
      id: "weakness",
      name: "Weakness",
      description: "Every hero has a flaw — what's yours?",
      picks: 1,
      options: [
        { id: "reckless", name: "Recklessness", description: "You charge in without thinking", icon: "🎯", stats: { strength: 3, speed: 2, durability: -3, intelligence: -4, special: 2 } },
        { id: "cold-vulnerability", name: "Cold Vulnerability", description: "Extreme cold saps your power", icon: "❄️", stats: { strength: -2, speed: -1, durability: -6, intelligence: 1, special: 3 } },
        { id: "emotional", name: "Emotional Volatility", description: "Feelings make your power unstable", icon: "💔", stats: { strength: -1, speed: 3, durability: -2, intelligence: -3, special: 5 } },
        { id: "energy-hungry", name: "Energy Dependency", description: "You must consume energy to function", icon: "🔋", stats: { strength: 2, speed: 1, durability: -4, intelligence: 2, special: -2 } },
        { id: "isolation", name: "Isolation Weakness", description: "Your power diminishes without allies", icon: "🏝️", stats: { strength: -3, speed: -2, durability: -1, intelligence: 3, special: 1 } },
        { id: "overload", name: "Power Overload", description: "Push too hard and you burn out", icon: "⚡", stats: { strength: 4, speed: 3, durability: -5, intelligence: -2, special: 4 } },
      ],
    },
  ],
  bracketSize: 8,
  baseStats: { strength: 10, speed: 10, durability: 10, intelligence: 10, special: 10 },
  combat: {
    randomnessFactor: 0.25,
    minRoll: 75,
    maxRoll: 125,
  },
};

/** Human-readable bracket round names */
export const roundNames = [
  "Quarterfinals",
  "Semifinals",
  "Finals",
  "Champion",
];

/** Generate opponent stat ranges based on tournament bracket size */
export function computeOpponentRanges(): Record<string, { min: number; max: number }> {
  const ranges: Record<string, { min: number; max: number }> = {};
  for (const stat of tournamentConfig.stats) {
    // Opponents can range from 50% to 130% of the base stat
    const base = tournamentConfig.baseStats[stat.id] ?? 10;
    ranges[stat.id] = {
      min: Math.max(1, Math.floor(base * 0.5)),
      max: Math.floor(base * 1.3),
    };
  }
  return ranges;
}

// Pre-compute and export
Object.assign(opponentStatRanges, computeOpponentRanges());
