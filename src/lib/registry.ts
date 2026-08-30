import type { QuizConfig } from "./types";

// Import all quiz config files
import { quiz as careerArchetype } from "./quizzes/career-archetype";
import { quiz as personalityArchetype } from "./quizzes/personality-archetype";
import { quiz as whichCreature } from "./quizzes/which-creature";
import { quiz as communicationStyle } from "./quizzes/communication-style";
import { quiz as creativeDNA } from "./quizzes/creative-dna";
import { quiz as leadershipStyle } from "./quizzes/leadership-style";

/** All quizzes registered here — adding a new quiz = add import + entry */
const allQuizzes: QuizConfig[] = [
  careerArchetype,
  personalityArchetype,
  whichCreature,
  communicationStyle,
  creativeDNA,
  leadershipStyle,
];

/** Lookup by slug */
export function getQuizBySlug(slug: string): QuizConfig | undefined {
  return allQuizzes.find((q) => q.slug === slug);
}

/** Get all quizzes for the homepage grid */
export function getAllQuizzes(): QuizConfig[] {
  return allQuizzes;
}

/** Get related quizzes for a given quiz */
export function getRelatedQuizzes(slug: string): QuizConfig[] {
  const quiz = getQuizBySlug(slug);
  if (!quiz) return [];
  return quiz.relatedSlugs
    .map((s) => getQuizBySlug(s))
    .filter((q): q is QuizConfig => q !== undefined);
}

/** Get all slugs for static generation */
export function getAllQuizSlugs(): string[] {
  return allQuizzes.map((q) => q.slug);
}
