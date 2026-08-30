"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuizConfig } from "@/lib/types";
import { scoreQuiz } from "@/lib/scoring";
import { encodeResult } from "@/lib/encode";

export default function QuizPlayer({ quiz }: { quiz: QuizConfig }) {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  );
  const [phase, setPhase] = useState<"intro" | "quiz" | "transition">("intro");

  const question = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;

  function selectAnswer(idx: number) {
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQ < quiz.questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        const result = scoreQuiz(quiz, newAnswers.map((a) => a ?? 0));
        const encoded = encodeResult(result, quiz);
        setPhase("transition");
        setTimeout(() => {
          router.push(`/quiz/${quiz.slug}/result/${encoded}`);
        }, 800);
      }
    }, 400);
  }

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center reveal-animation">
        <span className="text-6xl mb-6 block">{quiz.outcomes[0]?.theme.icon}</span>
        <h1
          className="text-3xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
        >
          {quiz.intro.headline}
        </h1>
        <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: "var(--theme-muted)" }}>
          {quiz.intro.subheading}
        </p>
        <button
          onClick={() => setPhase("quiz")}
          className="font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-text-on-accent)" }}
        >
          {quiz.intro.cta}
        </button>
        <p className="mt-6 text-sm" style={{ color: "var(--theme-muted)" }}>
          {quiz.questions.length} questions &middot; ~2 minutes
        </p>
      </div>
    );
  }

  if (phase === "transition") {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <div className="text-6xl animate-bounce mb-4">{quiz.outcomes[0]?.theme.icon}</div>
        <p className="text-lg" style={{ color: "var(--theme-muted)" }}>
          Calculating your result...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2" style={{ color: "var(--theme-muted)" }}>
          <span>Question {currentQ + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--theme-border)" }}
        >
          <div
            className="progress-bar-fill h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: "var(--theme-accent)" }}
          />
        </div>
      </div>

      {/* Question */}
      <div key={currentQ} className="reveal-animation">
        <h2
          className="text-2xl md:text-3xl font-bold mb-8"
          style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
        >
          {question.text}
        </h2>
        <div className="space-y-3">
          {question.answers.map((answer, idx) => {
            const isSelected = answers[currentQ] === idx;
            return (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 hover:border-[var(--theme-accent)]"
                style={{
                  borderColor: isSelected ? "var(--theme-accent)" : "var(--theme-border)",
                  backgroundColor: isSelected ? "color-mix(in srgb, var(--theme-accent) 10%, transparent)" : "var(--theme-surface)",
                  color: "var(--theme-text)",
                }}
              >
                <span className="font-medium">{answer.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
