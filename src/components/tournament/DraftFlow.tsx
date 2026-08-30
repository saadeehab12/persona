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

  // Compute intermediate stats for preview
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
    }, 600);
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
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--theme-muted)" }}
          >
            Draft Phase
          </span>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--theme-text)" }}
          >
            {Math.min(currentCategoryIdx + 1, categories.length)} / {categories.length}
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

      {/* Draft category cards */}
      {!isComplete && currentCategory && (
        <div className={`transition-all duration-300 ${isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          {/* Category header */}
          <div className="text-center mb-6">
            <span className="text-3xl mb-2 block">
              {currentCategory.options[0]?.icon ?? "🎯"}
            </span>
            <h2
              className="text-2xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--theme-text)",
              }}
            >
              {currentCategory.name}
            </h2>
            <p
              className="text-sm"
              style={{ color: "var(--theme-muted)" }}
            >
              {currentCategory.description}
            </p>
          </div>

          {/* Option cards grid */}
          <div className="grid grid-cols-2 gap-3">
            {currentCategory.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
                className="text-left p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
                style={{
                  borderColor:
                    hoveredOption === option.id
                      ? "var(--theme-accent)"
                      : "var(--theme-border)",
                  backgroundColor: "var(--theme-surface)",
                }}
              >
                <span className="text-2xl mb-2 block">{option.icon}</span>
                <h3
                  className="font-bold text-sm mb-1"
                  style={{ color: "var(--theme-text)" }}
                >
                  {option.name}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "var(--theme-muted)" }}
                >
                  {option.description}
                </p>

                {/* Stat preview */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {Object.entries(option.stats).map(([statId, val]) => {
                    const stat = tournamentConfig.stats.find((s) => s.id === statId);
                    if (!stat || val === 0) return null;
                    return (
                      <span
                        key={statId}
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor:
                            val > 0
                              ? `${stat.color}20`
                              : "var(--theme-surface-raised)",
                          color: val > 0 ? stat.color : "var(--theme-muted)",
                        }}
                      >
                        {val > 0 ? "+" : ""}
                        {val} {stat.shortName}
                      </span>
                    );
                  })}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Completion screen — show final character card */}
      {isComplete && (
        <div className="reveal-animation">
          <div className="text-center mb-6">
            <span className="text-4xl mb-3 block">🎉</span>
            <h2
              className="text-3xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--theme-text)",
              }}
            >
              Your Champion is Ready
            </h2>
            <p
              className="text-sm"
              style={{ color: "var(--theme-muted)" }}
            >
              Review your build and enter the arena
            </p>
          </div>

          <CharacterCard
            character={{
              name: "Your Champion",
              stats: draftStats,
              draftPicks: Object.keys(selectedPicks),
              rawStats: { ...draftStats },
            }}
            isPlayer
          />

          {/* Draft summary */}
          <div
            className="mt-6 p-4 rounded-xl border"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
            }}
          >
            <h4
              className="text-sm font-bold mb-2"
              style={{ color: "var(--theme-text)" }}
            >
              Build Summary
            </h4>
            <div className="space-y-1">
              {Object.entries(selectedPicks).map(([catId, pick]) => {
                const cat = categories.find((c) => c.id === catId);
                return (
                  <div key={catId} className="flex justify-between text-xs">
                    <span style={{ color: "var(--theme-muted)" }}>
                      {cat?.name}
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: "var(--theme-text)" }}
                    >
                      {pick.icon} {pick.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleStartTournament}
            className="mt-6 w-full py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02] hover:shadow-lg"
            style={{
              backgroundColor: "var(--theme-accent)",
            }}
          >
            Enter the Arena ⚔️
          </button>
        </div>
      )}
    </div>
  );
}
