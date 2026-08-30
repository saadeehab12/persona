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
        if (nextIdx >= deck.questions.length) setShowResult(true);
      }, 300);
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

  if (showResult || isComplete) {
    const result = scoreDeck(deck, picks);
    const encoded = encodeRatherResult(deck.slug, picks, result.wildCount);
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/rather/result/${encoded}` : "";

    return (
      <div className="max-w-lg mx-auto text-center reveal-animation">
        <div className="pixel-card p-8 mb-6">
          <span className="text-4xl mb-3 block">{deck.icon}</span>
          <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: "var(--theme-accent)", lineHeight: "1.8" }}>
            {result.title.toUpperCase()}
          </h2>
          <p className="mt-2 mb-4" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>
            {result.description}
          </p>
          <div className="pixel-progress mb-2" style={{ display: "flex" }}>
            <div style={{ width: `${((result.total - result.wildCount) / result.total) * 100}%`, backgroundColor: "var(--theme-accent)", opacity: 0.4, height: "100%" }} />
            <div style={{ width: `${(result.wildCount / result.total) * 100}%`, backgroundColor: "var(--theme-accent)", height: "100%" }} />
          </div>
          <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-text)", fontWeight: 700 }}>
            {result.wildCount} / {result.total} wild picks
          </p>
        </div>

        <div className="pixel-card p-4 mb-6">
          <p className="mb-3" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>Share your result</p>
          <ShareCopyButton url={shareUrl} />
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={handleRestart} className="pixel-btn">Play Again</button>
          <a href="/rather" className="pixel-btn-secondary inline-block">Another Deck</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Exit button */}
      <a href="/rather" className="inline-block mb-4 pixel-tag" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-muted)", cursor: "pointer" }}>
        ← Exit Deck
      </a>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "var(--theme-muted)" }}>{deck.title.toUpperCase()}</span>
          <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-text)" }}>{currentIndex + 1} / {deck.questions.length}</span>
        </div>
        <div className="pixel-progress">
          <div className="pixel-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {currentQuestion && (
        <div className={`transition-all duration-200 ${exitDir === "left" ? "opacity-0 -translate-x-full" : exitDir === "right" ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"}`}>
          <div className="text-center mb-3">
            <span className="pixel-tag" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-muted)" }}>
              WOULD YOU RATHER
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => handlePick("a")} disabled={animating} className="pixel-card p-5 text-left min-h-[100px] flex items-center">
              <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "20px", color: "var(--theme-text)", fontWeight: 700 }}>
                {currentQuestion.optionA}
              </p>
            </button>
            <button onClick={() => handlePick("b")} disabled={animating} className="pixel-card p-5 text-left min-h-[100px] flex items-center" style={{ borderColor: "var(--theme-accent)" }}>
              <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "20px", color: "var(--theme-accent)", fontWeight: 700 }}>
                {currentQuestion.optionB}
              </p>
            </button>
          </div>
          <p className="text-center mt-3" style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "var(--theme-muted)" }}>TAP YOUR CHOICE</p>
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
    <div className="flex gap-3 justify-center">
      <button onClick={handleCopy} className="pixel-btn-secondary" style={{ fontSize: "16px" }}>
        {copied ? "✓ Copied!" : "📋 Copy Link"}
      </button>
    </div>
  );
}
