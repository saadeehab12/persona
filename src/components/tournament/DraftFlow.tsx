"use client";

import { useState } from "react";
import {
  tournamentConfig,
  type DraftCategory,
  type DraftOption,
} from "@/lib/tournament/config";
import CharacterCard from "./CharacterCard";
import { computeCharacterStats, type Character } from "@/lib/tournament/combat";

interface DraftFlowProps {
  onComplete: (character: Character, picks: Record<string, string>) => void;
}

export default function DraftFlow({ onComplete }: DraftFlowProps) {
  const [currentCategoryIdx, setCurrentCategoryIdx] = useState(0);
  const [selectedPicks, setSelectedPicks] = useState<Record<string, DraftOption>>({});
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const categories = tournamentConfig.categories;
  const currentCategory: DraftCategory | undefined = categories[currentCategoryIdx];
  const isComplete = currentCategoryIdx >= categories.length;

  const draftStats = computeCharacterStats(selectedPicks);

  const handleSelect = (option: DraftOption) => {
    if (isRevealing) return;
    setIsRevealing(true);
    setTimeout(() => {
      setSelectedPicks((prev) => ({ ...prev, [currentCategory.id]: option }));
      setIsRevealing(false);
      if (currentCategoryIdx < categories.length - 1) {
        setCurrentCategoryIdx((prev) => prev + 1);
      } else {
        setCurrentCategoryIdx(categories.length);
      }
    }, 400);
  };

  const handleStartTournament = () => {
    const character: Character = {
      name: "Your Champion",
      stats: draftStats,
      draftPicks: Object.keys(selectedPicks),
      rawStats: { ...draftStats },
    };
    const picks: Record<string, string> = {};
    for (const [catId, pick] of Object.entries(selectedPicks)) {
      picks[catId] = pick.id;
    }
    onComplete(character, picks);
  };

  const progress = Math.min(100, ((currentCategoryIdx) / categories.length) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Exit button */}
      <a href="/tournament" className="inline-block mb-4 pixel-tag" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-muted)", cursor: "pointer" }}>
        ← Exit Draft
      </a>

      {/* Pixel progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "var(--theme-muted)" }}>DRAFT PHASE</span>
          <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-text)" }}>
            {Math.min(currentCategoryIdx + 1, categories.length)} / {categories.length}
          </span>
        </div>
        <div className="pixel-progress">
          <div className="pixel-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {!isComplete && currentCategory && (
        <div className={`transition-all duration-200 ${isRevealing ? "opacity-0" : "opacity-100"}`}>
          <div className="text-center mb-4">
            <span className="text-3xl mb-2 block">{currentCategory.options[0]?.icon ?? "🎯"}</span>
            <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: "var(--theme-text)", lineHeight: "1.8" }}>
              {currentCategory.name.toUpperCase()}
            </h2>
            <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>
              {currentCategory.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {currentCategory.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                className="text-left pixel-card p-4"
                style={{
                  borderColor: hoveredOption === option.id ? "var(--theme-accent)" : undefined,
                }}
              >
                <span className="text-2xl mb-2 block">{option.icon}</span>
                <h3 style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>
                  {option.name}
                </h3>
                <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "14px", color: "var(--theme-muted)" }}>
                  {option.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {Object.entries(option.stats).map(([statId, val]) => {
                    const stat = tournamentConfig.stats.find((s) => s.id === statId);
                    if (!stat || val === 0) return null;
                    return (
                      <span
                        key={statId}
                        className="pixel-tag"
                        style={{
                          backgroundColor: val > 0 ? `${stat.color}30` : "var(--theme-surface-raised)",
                          color: val > 0 ? stat.color : "var(--theme-muted)",
                          fontSize: "10px",
                        }}
                      >
                        {val > 0 ? "+" : ""}{val} {stat.shortName}
                      </span>
                    );
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {isComplete && (
        <div className="reveal-animation text-center">
          <span className="text-4xl mb-3 block">🎉</span>
          <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: "var(--theme-text)", lineHeight: "1.8", marginBottom: "8px" }}>
            YOUR CHAMPION IS READY
          </h2>
          <CharacterCard
            character={{
              name: "Your Champion",
              stats: draftStats,
              draftPicks: Object.keys(selectedPicks),
              rawStats: { ...draftStats },
            }}
            isPlayer
          />
          <div className="pixel-card p-4 mt-4 text-left">
            <h4 style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "var(--theme-muted)", letterSpacing: "1px", marginBottom: "8px" }}>
              BUILD SUMMARY
            </h4>
            <div className="space-y-1">
              {Object.entries(selectedPicks).map(([catId, pick]) => {
                const cat = categories.find((c) => c.id === catId);
                return (
                  <div key={catId} className="flex justify-between" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px" }}>
                    <span style={{ color: "var(--theme-muted)" }}>{cat?.name}</span>
                    <span style={{ color: "var(--theme-text)", fontWeight: 700 }}>{pick.icon} {pick.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={handleStartTournament} className="pixel-btn mt-6">
            Enter the Arena ⚔️
          </button>
        </div>
      )}
    </div>
  );
}
