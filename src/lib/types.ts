// ============================================================
// Freebuff — Quiz Engine Type Definitions
// ============================================================

/** A single answer option within a question */
export interface QuizAnswer {
  /** Display text shown to the user */
  label: string;
  /**
   * Weight map: keys are outcome type IDs, values are numeric weights.
   * When the user picks this answer, each listed outcome receives the weight.
   * Only outcomes that benefit from this choice need an entry.
   */
  weights: Record<string, number>;
}

/** A single quiz question */
export interface QuizQuestion {
  /** Unique ID for this question (stable across edits) */
  id: string;
  /** The question text displayed to the user */
  text: string;
  /** Available answer options (typically 3–5) */
  answers: QuizAnswer[];
  /** Optional image/icon URL for visual questions */
  image?: string;
}

/** Visual theme for an outcome type */
export interface OutcomeTheme {
  /** Primary accent color (hex, e.g. "#E85D3A") */
  accent: string;
  /** Background gradient CSS for the result card */
  gradient: string;
  /** Emoji or icon identifier */
  icon: string;
}

/** A possible result / outcome type */
export interface OutcomeType {
  /** Stable ID used in scoring and URL encoding */
  id: string;
  /** Short display name (e.g. "The Architect") */
  name: string;
  /** One-liner tagline */
  tagline: string;
  /** Full description shown on the results page (2-4 paragraphs) */
  description: string;
  /** Visual theme for this outcome */
  theme: OutcomeTheme;
}

/** Complete quiz configuration — one file per quiz */
export interface QuizConfig {
  /** URL-safe slug, e.g. "career-archetype" */
  slug: string;
  /** Display title */
  title: string;
  /** Short SEO meta description (max 155 chars) */
  metaDescription: string;
  /** Intro copy shown on the quiz start screen */
  intro: {
    headline: string;
    subheading: string;
    cta: string; // button text, e.g. "Start the Quiz"
  };
  /** All possible outcome types for this quiz */
  outcomes: OutcomeType[];
  /** Ordered list of questions */
  questions: QuizQuestion[];
  /** Slugs of related quizzes for "You might also like" */
  relatedSlugs: string[];
}

/** The computed result after scoring */
export interface QuizResult {
  /** The slug of the quiz */
  quizSlug: string;
  /** The winning outcome type ID */
  outcomeId: string;
  /** Per-outcome score breakdown (for encoding in URL) */
  scores: Record<string, number>;
}

/** Decoded result ready for display */
export interface DecodedResult {
  quiz: QuizConfig;
  outcome: OutcomeType;
  scores: Record<string, number>;
  percentage: Record<string, number>;
}
