// ============================================================
// Persona — Generator Word Banks
// ============================================================

export interface GeneratorConfig {
  slug: string;
  name: string;
  description: string;
  icon: string;
  type: "roast" | "compliment" | "superhero" | "excuse" | "kingdom";
}

export const generators: GeneratorConfig[] = [
  {
    slug: "roast",
    name: "Roast Generator",
    description: "Playful, never mean-spirited roasts",
    icon: "🔥",
    type: "roast",
  },
  {
    slug: "compliment",
    name: "Hype Generator",
    description: "Over-the-top compliments to boost anyone's day",
    icon: "✨",
    type: "compliment",
  },
  {
    slug: "superhero",
    name: "Superhero Name",
    description: "Your alter ego is waiting",
    icon: "🦸",
    type: "superhero",
  },
  {
    slug: "excuse",
    name: "Excuse Generator",
    description: "Creative reasons for being late/absent",
    icon: "😅",
    type: "excuse",
  },
  {
    slug: "kingdom",
    name: "Fantasy Kingdom",
    description: "Name your realm and rule it",
    icon: "🏰",
    type: "kingdom",
  },
];

// ========================
// ROAST GENERATOR
// ========================
export const roastParts = {
  opening: [
    "You are the human equivalent of",
    "Honestly, you give off the energy of",
    "If you were a thing, you would be",
    "Somewhere out there, a",
    "I would roast you harder, but",
    "You have the same energy as",
    "Let us be real — you are basically",
    "If being basic were an Olympic sport",
    "You are the type of person who",
    "The audacity you have is almost impressive, like",
  ],
  noun: [
    "a participation trophy",
    "a screensaver on a forgotten computer",
    "the last pickle in the jar",
    "a PDF of a JPEG",
    "a comma in a run-on sentence",
    "a participation ribbon at a spelling bee",
    "a USB that only fits on the third try",
    "a wifi signal with one bar",
    "a left shoe with no match",
    "a search result on page 47",
    "a bookmark in a book nobody reads",
    "the 'reply all' button in an email chain",
    "a typo in a tattoo",
    "a flat tire on a Segway",
    "a loading screen with no game behind it",
    "the hold music on a customer service line",
    "a penny on the ground that nobody picks up",
    "a typo in a formal document",
    "a wrong number that keeps calling",
    "a gift card with $0.03 left",
  ],
  closer: [
    "and honestly, that is okay.",
    "and yet here you are, thriving anyway.",
    "but you are still my favorite disaster.",
    "but hey, at least you are consistent.",
    "and I respect the commitment.",
    "but self-awareness is the first step.",
    "but you are cute enough to get away with it.",
    "but you own it, and that is what matters.",
    "but we love you anyway.",
    "but that is what makes you... you.",
  ],
};

// ========================
// COMPLIMENT / HYPE GENERATOR
// ========================
export const complimentParts = {
  opener: [
    "Let the record show that",
    "I just want to say that",
    "The world needs to know:",
    "This is your reminder that",
    "If nobody has told you today:",
    "Public service announcement:",
    "Breaking news:",
    "My analysis confirms that",
    "Statistically speaking,",
    "Every single person agrees that",
    "The data is clear:",
    "It has been scientifically proven that",
  ],
  middle: [
    "you are an absolute legend",
    "your existence is a gift to everyone around you",
    "you radiate main character energy",
    "you are the reason someone smiled today",
    "your vibe is unmatched",
    "you are carrying the entire room on your back",
    "you are proof that great things come in great packages",
    "you have the energy of a golden retriever at a beach",
    "you are the human equivalent of a warm blanket",
    "you could make a waiting room feel like a VIP lounge",
    "your face deserves its own fan club",
    "you have the kind of energy that makes plants grow",
    "you are the plot twist nobody expected but everyone needed",
    "you are what happens when awesome is distilled into a person",
    "you are proof that the universe has excellent taste",
    "your smile could power a small city",
    "you are the human version of finding money in your pocket",
    "you have the charisma of a thousand suns",
    "you are the person everyone wants at their party",
    "you are the upgrade everyone wishes they had",
  ],
  closer: [
    "Never forget that.",
    "And that is just facts.",
    "The world is better because you are in it.",
    "Keep being iconic.",
    "Now go conquer the day.",
    "Remember: you are the prize.",
    "Now go be amazing, you beautiful human.",
    "Bookmark this for when you need a boost.",
    "Screenshot this for emergencies.",
    "Read this every morning.",
  ],
};

// ========================
// SUPERHERO NAME GENERATOR
// ========================
export const superheroParts = {
  adjective: [
    "Quantum", "Phantom", "Crimson", "Solar", "Cosmic", "Velvet", "Neon",
    "Iron", "Shadow", "Golden", "Frozen", "Radiant", "Infinite", "Turbo",
    "Atomic", "Mystic", "Thunder", "Eclipse", "Crystal", "Hyper", "Nova",
    "Silent", "Blazing", "Steel", "Spectral", "Digital", "Primal", "Celestial",
    "Venom", "Toxic", "Magnetic", "Hollow", "Fractal", "Obsidian", "Emerald",
    "Violet", "Cobalt", "Copper", "Savage", "Eternal", "Vicious", "Rogue",
    "Absolute", "Desolate", "Magnificent", "Venomous", "Infinite", "Ultimate",
    "Wild", "Chaos", "Savage", "Savage", "Wicked", "Sinister", "Glorious",
    "Legendary", "Majestic", "Supreme", "Divine", "Noble", "Vibrant",
  ],
  noun: [
    "Phoenix", "Specter", "Viper", "Hawk", "Wolf", "Panther", "Cobra",
    "Falcon", "Storm", "Blaze", "Frost", "Shade", "Spark", "Pulse",
    "Raven", "Lynx", "Bolt", "Crusher", "Slayer", "Wraith", "Shard",
    "Titan", "Sentinel", "Guardian", "Reaper", "Striker", "Brawler",
    "Oracle", "Nexus", "Cipher", "Phantom", "Specter", "Ghost", "Shadow",
    "Vortex", "Cyclone", "Avalanche", "Tsunami", "Eclipse", "Horizon",
    "Paradox", "Anomaly", "Catalyst", "Vector", "Vertex", "Zenith",
    "Nomad", "Renegade", "Vagabond", "Wanderer", "Drifter", "Maverick",
  ],
};

// ========================
// EXCUSE GENERATOR
// ========================
export const excuseParts = {
  opener: [
    "So sorry, but",
    "I hate to say this, but",
    "Apologies in advance,",
    "I cannot make it because",
    "I am going to be late because",
    "I need to cancel because",
    "Something came up:",
    "Emergency situation:",
    "I just realized:",
    "Plot twist:",
  ],
  excuse: [
    "my cat staged a coup and locked me in the bathroom",
    "I got too invested in a documentary about cheese",
    "my houseplant asked for a pep talk and I could not say no",
    "I am waiting for a very important package that is 'out for delivery'",
    "my neighbor's dog is having a birthday party and I am the DJ",
    "I accidentally joined a cult meeting and now I am too deep to leave",
    "my GPS sent me to the wrong dimension",
    "I am having an existential crisis about socks",
    "I need to water my imaginary garden",
    "my phone is on 1% and I cannot find the charger",
    "I fell into a Wikipedia rabbit hole about ancient bread",
    "I am currently in a standoff with a squirrel on my balcony",
    "my robot vacuum gained sentience and I need to negotiate",
    "I got lost in my own neighborhood and now I am on an adventure",
    "I promised my goldfish a movie night",
    "I am training for a competitive yawning tournament",
    "I accidentally subscribed to too many newsletters and need to unsubscribe from all of them",
    "my plant is giving me the silent treatment and I need to make amends",
    "I am in the middle of a very intense staring contest with my reflection",
    "I need to reorganize my entire life by color",
  ],
  closer: [
    "I swear this is all true.",
    "You cannot make this stuff up.",
    "I know how it sounds.",
    "Believe me or not, it is happening.",
    "Life is unpredictable.",
    "Adulting is hard.",
    "I will explain more later.",
    "Trust me, you do not want the details.",
    "It is a long story.",
    "Maybe next time!",
  ],
};

// ========================
// FANTASY KINGDOM NAME GENERATOR
// ========================
export const kingdomParts = {
  prefix: [
    "Val", "Eld", "Kor", "Ash", "Drak", "Thorn", "Grim", "Iron",
    "Star", "Silver", "Crystal", "Shadow", "Dawn", "Ember", "Frost",
    "Moon", "Sun", "Wind", "Storm", "Fire", "Blood", "Bone",
    "Rune", "Sage", "Lore", "Myth", "Void", "Dusk", "Mist",
    "Blight", "Ruin", "Gale", "Bloom", "Root", "Stone", "Deep",
    "Dark", "Light", "Gold", "Rust", "Amber", "Jade", "Onyx",
    "Opal", "Ruby", "Pearl", "Flint", "Quartz", "Cobalt",
    "Wilder", "Fell", "Dread", "Gloom", "Hollow", "Rift",
  ],
  suffix: [
    "heim", "oria", "gard", "fell", "moor", "reach", "vale",
    "spire", "hollow", "keep", "haven", "crest", "thorn", "hold",
    "bane", "march", "ford", "shire", "dale", "den", "fell",
    "ridge", "gate", "ward", "bluff", "cliff", "glen", "marsh",
    "shore", "peak", "crag", "wood", "fen", "brook", "hearth",
    "forge", "tower", "crypt", "vault", "tomb", "altar",
    "crown", "throne", "blade", "shield", "banner", "sigil",
  ],
  epithet: [
    "the Eternal", "the Mighty", "the Forgotten", "the Ancient",
    "the Radiant", "the Shadowed", "the Eternal", "the Whispering",
    "the Crimson", "the Silver", "the Golden", "the Obsidian",
    "the Silent", "the Blazing", "the Frozen", "the Sacred",
    "the Lost", "the Shattered", "the Boundless", "the Fallen",
  ],
};
