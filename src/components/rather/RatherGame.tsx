"use client";

import { useState, useCallback } from "react";
import type { RatherDeck } from "@/lib/rather/types";
import { scoreDeck, encodeRatherResult } from "@/lib/rather/engine";

interface RatherGameProps {
  deck: RatherDeck;
}

export default function RatherGame({ deck }: RatherGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [picks, setPicks] = useState<("a" | "b")[]>([]);
  const [animating, setAnimating] = useState(false);
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isComplete = currentIndex >= deck.questions.length;
  const currentQuestion = deck.questions[currentIndex];
  const progress = ((currentIndex) / deck.questions.length) * 100;

  const handlePick = useCallback(
    (side: "a" | "b") => {
      if (animating || showResult) return;
      setAnimating(true);
      setExitDir(side === "a" ? "left" : "right");

      const newPicks = [...picks, side];
      setPicks(newPicks);

      setTimeout(() => {
        const nextIdx = currentIndex + 1;
        setCurrentIndex(nextIdx);
        setExitDir(null);
        setAnimating(false);

        if (nextIdx >= deck.questions.length) {
          setShowResult(true);
        }
      }, 400);
    },
    [animating, showResult, picks, currentIndex, deck.questions.length]
  );

  const handleRestart = () => {
    setCurrentIndex(0);
    setPicks([]);
    setAnimating(false);
    setExitDir(null);
    setShowResult(false);
  };

  // Result screen
  if (showResult || isComplete) {
    const result = scoreDeck(deck, picks);
    const encoded = encodeRatherResult(deck.slug, picks, result.wildCount);
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/rather/result/${encoded}`
        : "";

    return (
      <div className="max-w-lg mx-auto text-center reveal-animation">
        {/* Result card */}
        <div
          className="rounded-2xl border-2 p-8 mb-6"
          style={{
            borderColor: "var(--theme-accent)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <span className="text-5xl mb-4 block">{deck.icon}</span>
          <h2
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--theme-accent)",
            }}
          >
            {result.title}
          </h2>
          <p
            className="text-lg mb-6"
            style={{ color: "var(--theme-muted)" }}
          >
            {result.description}
          </p>

          {/* Score bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span style={{ color: "var(--theme-muted)" }}>Safe picks</span>
              <span style={{ color: "var(--theme-muted)" }}>Wild picks</span>
            </div>
            <div
              className="h-4 rounded-full overflow-hidden flex"
              style={{ backgroundColor: "var(--theme-surface-raised)" }}
            >
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${((result.total - result.wildCount) / result.total) * 100}%`,
                  backgroundColor: "var(--theme-accent)",
                  opacity: 0.4,
                }}
              />
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${(result.wildCount / result.total) * 100}%`,
                  backgroundColor: "var(--theme-accent)",
                }}
              />
            </div>
            <p
              className="text-sm mt-2 font-medium"
              style={{ color: "var(--theme-text)" }}
            >
              {result.wildCount} / {result.total} wild picks
            </p>
          </div>
        </div>

        {/* Share section */}
        <div
          className="rounded-xl border p-4 mb-6"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <p className="text-sm mb-3" style={{ color: "var(--theme-muted)" }}>
            Share your result
          </p>
          <div className="flex gap-3 justify-center">
            <ShareCopyButton url={shareUrl} />
            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
              <button
                onClick={() =>
                  navigator.share({
                    title: `I am "${result.title}" — ${deck.title}`,
                    text: result.description,
                    url: shareUrl,
                  })
                }
                className="share-btn px-4 py-2 rounded-lg font-medium text-sm text-white"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                📤 Share
              </button>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRestart}
            className="py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02]"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            Play Again
          </button>
          <a
            href="/rather"
            className="py-3 px-6 rounded-xl font-bold border transition-all hover:scale-[1.02] inline-block"
            style={{
              borderColor: "var(--theme-border)",
              color: "var(--theme-text)",
            }}
          >
            Another Deck
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: "var(--theme-muted)" }}>
            {deck.title}
          </span>
          <span className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>
            {currentIndex + 1} / {deck.questions.length}
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

      {/* Card */}
      {currentQuestion && (
        <div
          className={`transition-all duration-300 ${
            exitDir === "left"
              ? "opacity-0 -translate-x-full"
              : exitDir === "right"
              ? "opacity-0 translate-x-full"
              : "opacity-100 translate-x-0"
          }`}
        >
          {/* VS indicator */}
          <div className="text-center mb-4">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                backgroundColor: "var(--theme-surface-raised)",
                color: "var(--theme-muted)",
              }}
            >
              Would you rather
            </span>
          </div>

          {/* Two options */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handlePick("a")}
              disabled={animating}
              className="p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer min-h-[120px] flex items-center"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              <p
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--theme-text)",
                }}
              >
                {currentQuestion.optionA}
              </p>
            </button>

            <button
              onClick={() => handlePick("b")}
              disabled={animating}
              className="p-6 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer min-h-[120px] flex items-center"
              style={{
                borderColor: "var(--theme-accent)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              <p
                className="text-lg font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--theme-accent)",
                }}
              >
                {currentQuestion.optionB}
              </p>
            </button>
          </div>

          {/* Tap hint */}
          <p
            className="text-center text-xs mt-4"
            style={{ color: "var(--theme-muted)" }}
          >
            Tap your choice
          </p>
        </div>
      )}
    </div>
  );
}

function ShareCopyButton({ url }: { url: string }) {
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
  );
}
