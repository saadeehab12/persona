// ============================================================
// Persona — Life Simulator Config
// ============================================================

export interface LifeChoice {
  id: string;
  text: string;
  /** Weighted tags that influence outcomes */
  tags: Record<string, number>;
}

export interface LifeStage {
  id: string;
  name: string;
  icon: string;
  description: string;
  choices: LifeChoice[];
}

export interface LifeOutcome {
  id: string;
  /** Which tags cause this outcome to appear */
  requiredTags: Record<string, number>;
  title: string;
  description: string;
  icon: string;
}

export interface LifeSimConfig {
  stages: LifeStage[];
  outcomes: LifeOutcome[];
  /** Career outcomes mapped to tag combinations */
  careers: Array<{
    id: string;
    name: string;
    icon: string;
    tags: Record<string, number>;
  }>;
  /** Personality traits derived from tag totals */
  traits: Array<{
    id: string;
    name: string;
    icon: string;
    tags: Record<string, number>;
  }>;
}

export const lifeConfig: LifeSimConfig = {
  stages: [
    {
      id: "childhood",
      name: "Childhood",
      icon: "🧒",
      description: "You are 10 years old. What do you spend your time doing?",
      choices: [
        { id: "c_explore", text: "Exploring the neighborhood and getting into trouble", tags: { adventure: 2, social: 1 } },
        { id: "c_books", text: "Reading books and learning everything I can", tags: { knowledge: 2, introvert: 1 } },
        { id: "c_sports", text: "Playing sports with the kids on the block", tags: { physical: 2, social: 1 } },
        { id: "c_creative", text: "Drawing, building, and creating things", tags: { creative: 2, focus: 1 } },
        { id: "c_tech", text: "Figuring out how things work and taking them apart", tags: { tech: 2, knowledge: 1 } },
      ],
    },
    {
      id: "teen",
      name: "Teenage Years",
      icon: "🎒",
      description: "High school. What is your defining trait?",
      choices: [
        { id: "t_popular", text: "Social butterfly — I knew everyone", tags: { social: 3, adventure: 1 } },
        { id: "t_hacker", text: "Quiet genius — always in the computer lab", tags: { tech: 3, focus: 1 } },
        { id: "t_artist", text: "Creative soul — art class was my sanctuary", tags: { creative: 3, introvert: 1 } },
        { id: "t_athlete", text: "Star athlete — nothing else mattered", tags: { physical: 3, social: 1 } },
        { id: "t_rebel", text: "Rule breaker — authority was just a suggestion", tags: { adventure: 3, risk: 1 } },
      ],
    },
    {
      id: "college",
      name: "College / Trade",
      icon: "🎓",
      description: "What path do you choose after school?",
      choices: [
        { id: "co_cs", text: "Computer science — the future is code", tags: { tech: 3, knowledge: 1 } },
        { id: "co_art", text: "Fine arts — follow the passion", tags: { creative: 3, risk: 1 } },
        { id: "co_biz", text: "Business — learn to hustle", tags: { social: 2, risk: 2 } },
        { id: "co_trade", text: "Trade school — practical skills beat theory", tags: { physical: 2, focus: 2 } },
        { id: "co_travel", text: "Gap year travel — see the world first", tags: { adventure: 3, social: 1 } },
      ],
    },
    {
      id: "firstjob",
      name: "First Job",
      icon: "💼",
      description: "Your first real job. How does it go?",
      choices: [
        { id: "f_climb", text: "I work twice as hard to climb the ladder", tags: { focus: 3, social: 1 } },
        { id: "f_side", text: "I start a side project on the side", tags: { creative: 2, risk: 2, tech: 1 } },
        { id: "f_social", text: "I make friends with everyone in the office", tags: { social: 3, adventure: 1 } },
        { id: "f_leave", text: "I quit after 6 months — this is not for me", tags: { risk: 3, adventure: 1 } },
        { id: "f_study", text: "I keep studying and upskilling in my free time", tags: { knowledge: 3, focus: 1 } },
      ],
    },
    {
      id: "love",
      name: "Love Life",
      icon: "❤️",
      description: "Romance enters the picture. What happens?",
      choices: [
        { id: "l_forever", text: "I meet someone and it just clicks forever", tags: { social: 2, focus: 1 } },
        { id: "l_dating", text: "I date around — the world is my oyster", tags: { adventure: 2, social: 2 } },
        { id: "l_focus", text: "Love can wait — my career comes first", tags: { focus: 3, introvert: 1 } },
        { id: "l_surprise", text: "It happens when I least expect it", tags: { creative: 1, risk: 1, social: 1 } },
      ],
    },
    {
      id: "midlife",
      name: "Midlife Crossroads",
      icon: "🌅",
      description: "You are 40. What do you want most?",
      choices: [
        { id: "m_stability", text: "Stability — I have earned my peace", tags: { focus: 3, introvert: 1 } },
        { id: "m_change", text: "A complete reinvention — it is never too late", tags: { risk: 3, adventure: 1 } },
        { id: "m_giveback", text: "To give back — mentoring and teaching others", tags: { social: 3, knowledge: 1 } },
        { id: "m_adventure", text: "Adventure — there is still so much world to see", tags: { adventure: 3, risk: 1 } },
        { id: "m_legacy", text: "To build something that outlasts me", tags: { creative: 2, focus: 2 } },
      ],
    },
    {
      id: "golden",
      name: "Golden Years",
      icon: "🌅",
      description: "You are 70. How do you spend your days?",
      choices: [
        { id: "g_garden", text: "In the garden, at peace with nature", tags: { focus: 2, introvert: 2 } },
        { id: "g_writes", text: "Writing my memoir — what a story it is", tags: { creative: 2, knowledge: 2 } },
        { id: "g_travel", text: "Traveling to places I only dreamed of", tags: { adventure: 3, social: 1 } },
        { id: "g_family", text: "Surrounded by family and grandchildren", tags: { social: 3, focus: 1 } },
        { id: "g_mentor", text: "Mentoring the next generation", tags: { knowledge: 2, social: 2 } },
      ],
    },
  ],

  outcomes: [
    { id: "o_legend", requiredTags: { adventure: 6 }, title: "The Legend", description: "Your life was anything but ordinary. People still tell stories about you.", icon: "⭐" },
    { id: "o_mastermind", requiredTags: { knowledge: 6 }, title: "The Mastermind", description: "Your mind was your superpower. You solved problems others did not even see.", icon: "🧠" },
    { id: "o_creator", requiredTags: { creative: 6 }, title: "The Creator", description: "You left behind a body of work that changed how people see the world.", icon: "🎨" },
    { id: "o_connector", requiredTags: { social: 6 }, title: "The Connector", description: "You knew everyone, and everyone knew you. Your network was your legacy.", icon: "🤝" },
    { id: "o_warrior", requiredTags: { physical: 6 }, title: "The Warrior", description: "You pushed your body to its limits and inspired others to do the same.", icon: "💪" },
    { id: "o_pioneer", requiredTags: { tech: 6 }, title: "The Pioneer", description: "You saw the future before anyone else and helped build it.", icon: "🚀" },
  ],

  careers: [
    { id: "career_entrepreneur", name: "Entrepreneur", icon: "🏢", tags: { risk: 3, social: 2 } },
    { id: "career_artist", name: "Artist", icon: "🎭", tags: { creative: 3, risk: 1 } },
    { id: "career_scientist", name: "Scientist", icon: "🔬", tags: { knowledge: 3, focus: 2 } },
    { id: "career_leader", name: "Community Leader", icon: "🏛️", tags: { social: 3, knowledge: 1 } },
    { id: "career_explorer", name: "World Traveler", icon: "🌍", tags: { adventure: 3, risk: 1 } },
    { id: "career_mentor", name: "Teacher/Mentor", icon: "📚", tags: { social: 2, knowledge: 2 } },
    { id: "career_inventor", name: "Inventor", icon: "💡", tags: { tech: 2, creative: 2 } },
    { id: "career_writer", name: "Writer", icon: "✍️", tags: { creative: 2, knowledge: 2 } },
  ],

  traits: [
    { id: "trait_fearless", name: "Fearless", icon: "🦁", tags: { risk: 4, adventure: 2 } },
    { id: "trait_wise", name: "Wise Beyond Years", icon: "🦉", tags: { knowledge: 4, focus: 2 } },
    { id: "trait_charming", name: "Irresistibly Charming", icon: "😊", tags: { social: 4, creative: 1 } },
    { id: "trait_resilient", name: "Unbreakable", icon: "🛡️", tags: { focus: 3, physical: 2 } },
    { id: "trait_visionary", name: "Visionary", icon: "🔭", tags: { tech: 2, creative: 2, risk: 2 } },
    { id: "trait_free", name: "Free Spirit", icon: "🦋", tags: { adventure: 4, risk: 1 } },
  ],
};
