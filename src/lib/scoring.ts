import type { QuizConfig, QuizResult } from "./types";

/**
 * Score a quiz given an array of selected answer indices.
 * Algorithm:
 *  1. Start with zero scores for all outcome types.
 *  2. For each answer selected, add its weight to the corresponding outcomes.
 *  3. The outcome with the highest total score wins.
 *  4. Tie-break: pick the outcome that appears first in the config's outcomes array.
 */
export function scoreQuiz(
  config: QuizConfig,
  selectedAnswerIndices: number[]
): QuizResult {
  const scores: Record<string, number> = {};
  for (const outcome of config.outcomes) {
    scores[outcome.id] = 0;
  }

  config.questions.forEach((question, qIndex) => {
    const answerIdx = selectedAnswerIndices[qIndex];
    if (answerIdx === undefined || answerIdx === null) return;
    const answer = question.answers[answerIdx];
    if (!answer) return;

    for (const [outcomeId, weight] of Object.entries(answer.weights)) {
      if (scores[outcomeId] !== undefined) {
        scores[outcomeId] += weight;
      }
    }
  });

  // Find winning outcome (highest score; ties broken by config order)
  let bestOutcomeId = config.outcomes[0].id;
  let bestScore = -Infinity;
  for (const outcome of config.outcomes) {
    const s = scores[outcome.id] ?? 0;
    if (s > bestScore) {
      bestScore = s;
      bestOutcomeId = outcome.id;
    }
  }

  return {
    quizSlug: config.slug,
    outcomeId: bestOutcomeId,
    scores,
  };
}
