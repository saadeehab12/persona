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
        <div className="pixel-card p-8">
          <span className="text-5xl mb-4 block">{quiz.outcomes[0]?.theme.icon}</span>
          <h1
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "clamp(12px, 3vw, 18px)",
              color: "var(--theme-text)",
              lineHeight: "1.8",
              letterSpacing: "1px",
            }}
          >
            {quiz.intro.headline}
          </h1>
          <p className="mt-4 mb-8 max-w-lg mx-auto" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "20px", color: "var(--theme-muted)" }}>
            {quiz.intro.subheading}
          </p>
          <button onClick={() => setPhase("quiz")} className="pixel-btn">
            {quiz.intro.cta}
          </button>
          <p className="mt-6" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>
            {quiz.questions.length} questions &middot; ~2 minutes
          </p>
        </div>
      </div>
    );
  }

  if (phase === "transition") {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <div className="text-5xl pixel-flash mb-4">{quiz.outcomes[0]?.theme.icon}</div>
        <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "20px", color: "var(--theme-muted)" }}>
          Calculating your result...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Pixel progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>
          <span>Question {currentQ + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="pixel-progress">
          <div
            className="pixel-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div key={currentQ} className="reveal-animation">
        <div className="pixel-card p-6 mb-6">
          <h2
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "clamp(10px, 2.5vw, 14px)",
              color: "var(--theme-text)",
              lineHeight: "2",
              letterSpacing: "0.5px",
            }}
          >
            {question.text}
          </h2>
        </div>

        {/* Answer options */}
        <div className="space-y-3">
          {question.answers.map((answer, idx) => {
            const isSelected = answers[currentQ] === idx;
            return (
              <button
                key={idx}
                onClick={() => selectAnswer(idx)}
                className="w-full text-left pixel-card p-4"
                style={{
                  borderColor: isSelected ? "var(--theme-accent)" : undefined,
                  backgroundColor: isSelected ? "var(--theme-accent-glow)" : undefined,
                }}
              >
                <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "20px", color: "var(--theme-text)" }}>
                  {answer.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
