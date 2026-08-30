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
        if (nextIdx >= stages.length) setShowResult(true);
      }, 400);
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

  if (showResult || isComplete) {
    const summary = computeLifeSummary(picks);
    const encoded = encodeLifeResult(picks);
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/life/result/${encoded}` : "";

    return (
      <div className="max-w-lg mx-auto text-center reveal-animation">
        <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "16px", color: "var(--theme-accent)", lineHeight: "1.8" }}>YOUR LIFE STORY</h2>
        <p className="mb-6" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>Here is how your life turned out</p>

        {/* Timeline */}
        <div className="space-y-3 mb-6 text-left">
          {stages.map((stage, i) => {
            const pickId = picks[i];
            const choice = stage.choices.find((c) => c.id === pickId);
            return (
              <div key={stage.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="text-lg">{stage.icon}</span>
                  {i < stages.length - 1 && <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: "var(--pixel-card-border)" }} />}
                </div>
                <div className="pb-3">
                  <p style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "var(--theme-muted)", letterSpacing: "1px" }}>{stage.name.toUpperCase()}</p>
                  <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)" }}>{choice?.text ?? "Skipped"}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Results */}
        <div className="pixel-card p-5 mb-6 text-left">
          {summary.outcome && (
            <div className="mb-4 pb-4" style={{ borderBottom: "2px solid var(--pixel-card-border)" }}>
              <span className="text-2xl block mb-1">{summary.outcome.icon}</span>
              <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: "11px", color: "var(--theme-accent)", lineHeight: "1.6" }}>{summary.outcome.title.toUpperCase()}</h3>
              <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>{summary.outcome.description}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "var(--theme-muted)", letterSpacing: "1px", marginBottom: "4px" }}>CAREER</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{summary.career.icon}</span>
                <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>{summary.career.name}</span>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "var(--theme-muted)", letterSpacing: "1px", marginBottom: "4px" }}>CORE TRAIT</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{summary.trait.icon}</span>
                <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>{summary.trait.name}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pixel-card p-4 mb-6">
          <p className="mb-3" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>Share your life story</p>
          <ShareLifeButton url={shareUrl} />
        </div>

        <button onClick={handleRestart} className="pixel-btn">Live Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Exit button */}
      <a href="/" className="inline-block mb-4 pixel-tag" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-muted)", cursor: "pointer" }}>
        ← Exit Simulator
      </a>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "var(--theme-muted)" }}>LIFE SIMULATOR</span>
          <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-text)" }}>{currentStageIdx + 1} / {stages.length}</span>
        </div>
        <div className="pixel-progress">
          <div className="pixel-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {currentStage && (
        <div className={`transition-all duration-200 ${exitDir === "left" ? "opacity-0 -translate-x-full" : exitDir === "right" ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}`}>
          <div className="text-center mb-4">
            <span className="text-3xl mb-2 block">{currentStage.icon}</span>
            <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: "var(--theme-text)", lineHeight: "1.8" }}>{currentStage.name.toUpperCase()}</h2>
            <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>{currentStage.description}</p>
          </div>
          <div className="space-y-3">
            {currentStage.choices.map((choice) => (
              <button key={choice.id} onClick={() => handlePick(choice.id)} disabled={animating} className="w-full text-left pixel-card p-4">
                <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>{choice.text}</p>
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
      <button onClick={handleCopy} className="pixel-btn-secondary" style={{ fontSize: "16px" }}>{copied ? "✓ Copied!" : "📋 Copy Link"}</button>
    </div>
  );
}
