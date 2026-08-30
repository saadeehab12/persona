"use client";

import { useState, useCallback } from "react";
import { lifeConfig } from "@/lib/life/config";
import { computeLifeSummary, encodeLifeResult } from "@/lib/life/engine";

export default function LifeSimGame() {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const [showResult, setShowResult] = useState(false);

  const stages = lifeConfig.stages;
  const currentStage = stages[currentStageIdx];
  const isComplete = currentStageIdx >= stages.length;
  const progress = ((currentStageIdx) / stages.length) * 100;

  const handlePick = useCallback(
    (choiceId: string) => {
      if (animating) return;
      setAnimating(true);
      setExitDir(Math.random() > 0.5 ? "left" : "right");

      const newPicks = [...picks, choiceId];
      setPicks(newPicks);

      setTimeout(() => {
        const nextIdx = currentStageIdx + 1;
        setCurrentStageIdx(nextIdx);
        setExitDir(null);
        setAnimating(false);
        if (nextIdx >= stages.length) {
          setShowResult(true);
        }
      }, 500);
    },
    [animating, picks, currentStageIdx, stages.length]
  );

  const handleRestart = () => {
    setCurrentStageIdx(0);
    setPicks([]);
    setAnimating(false);
    setExitDir(null);
    setShowResult(false);
  };

  // Result screen
  if (showResult || isComplete) {
    const summary = computeLifeSummary(picks);
    const encoded = encodeLifeResult(picks);
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/life/result/${encoded}`
        : "";

    return (
      <div className="max-w-lg mx-auto text-center reveal-animation">
        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--theme-accent)",
          }}
        >
          Your Life Story
        </h2>
        <p className="text-sm mb-8" style={{ color: "var(--theme-muted)" }}>
          Here is how your life turned out
        </p>

        {/* Timeline */}
        <div className="space-y-4 mb-8 text-left">
          {stages.map((stage, i) => {
            const pickId = picks[i];
            const choice = stage.choices.find((c) => c.id === pickId);
            return (
              <div
                key={stage.id}
                className="flex gap-3"
                style={{ opacity: 1 - i * 0.05 }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-lg">{stage.icon}</span>
                  {i < stages.length - 1 && (
                    <div
                      className="w-0.5 flex-1 mt-1"
                      style={{ backgroundColor: "var(--theme-border)" }}
                    />
                  )}
                </div>
                <div className="pb-4">
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--theme-muted)" }}>
                    {stage.name}
                  </p>
                  <p className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>
                    {choice?.text ?? "Skipped"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Results card */}
        <div
          className="rounded-2xl border-2 p-6 mb-6 text-left"
          style={{
            borderColor: "var(--theme-accent)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          {summary.outcome && (
            <div className="mb-4 pb-4 border-b" style={{ borderColor: "var(--theme-border)" }}>
              <span className="text-3xl block mb-1">{summary.outcome.icon}</span>
              <h3
                className="text-xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--theme-accent)",
                }}
              >
                {summary.outcome.title}
              </h3>
              <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
                {summary.outcome.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--theme-muted)" }}>
                Career
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{summary.career.icon}</span>
                <span className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
                  {summary.career.name}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--theme-muted)" }}>
                Core Trait
              </p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{summary.trait.icon}</span>
                <span className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
                  {summary.trait.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Share */}
        <div
          className="rounded-xl border p-4 mb-6"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <p className="text-sm mb-3" style={{ color: "var(--theme-muted)" }}>
            Share your life story
          </p>
          <ShareLifeButton url={shareUrl} />
        </div>

        {/* CTAs */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02]"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            Live Again 🔄
          </button>
        </div>
      </div>
    );
  }

  // Active stage
  return (
    <div className="max-w-lg mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: "var(--theme-muted)" }}>
            Life Simulator
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>
            {currentStageIdx + 1} / {stages.length}
          </span>
        </div>
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: "var(--theme-surface-raised)" }}
        >
          <div
            className="h-full rounded-full progress-bar-fill"
            style={{
              backgroundColor: "var(--theme-accent)",
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Stage */}
      {currentStage && (
        <div
          className={`transition-all duration-400 ${
            exitDir === "left"
              ? "opacity-0 -translate-x-full"
              : exitDir === "right"
              ? "opacity-0 translate-x-full"
              : "opacity-100 translate-x-0"
          }`}
        >
          <div className="text-center mb-6">
            <span className="text-4xl mb-2 block">{currentStage.icon}</span>
            <h2
              className="text-2xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--theme-text)",
              }}
            >
              {currentStage.name}
            </h2>
            <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
              {currentStage.description}
            </p>
          </div>

          <div className="space-y-3">
            {currentStage.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handlePick(choice.id)}
                disabled={animating}
                className="w-full text-left p-4 rounded-xl border-2 transition-all hover:scale-[1.01] hover:shadow-md cursor-pointer"
                style={{
                  borderColor: "var(--theme-border)",
                  backgroundColor: "var(--theme-surface)",
                }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--theme-text)" }}
                >
                  {choice.text}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ShareLifeButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={handleCopy}
        className="share-btn px-4 py-2 rounded-lg font-medium text-sm border transition-all"
        style={{
          borderColor: "var(--theme-border)",
          backgroundColor: copied ? "#4CAF5020" : "var(--theme-surface-raised)",
          color: copied ? "#4CAF50" : "var(--theme-text)",
        }}
      >
        {copied ? "✓ Copied!" : "📋 Copy Link"}
      </button>
      {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
        <button
          onClick={() => navigator.share({ title: "My Life Simulator Result!", url })}
          className="share-btn px-4 py-2 rounded-lg font-medium text-sm text-white"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          📤 Share
        </button>
      )}
    </div>
  );
}
