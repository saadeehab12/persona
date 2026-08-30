"use client";

import type { Character, CharacterStats } from "@/lib/tournament/combat";
import { tournamentConfig } from "@/lib/tournament/config";

interface CharacterCardProps {
  character: Character;
  /** Whether to show as "your" character (accent border) */
  isPlayer?: boolean;
  /** Compact mode for battle view */
  compact?: boolean;
}

/** Stat bar component with animation */
function StatBar({
  label,
  icon,
  value,
  maxValue,
  color,
  delay = 0,
}: {
  label: string;
  icon: string;
  value: number;
  maxValue: number;
  color: string;
  delay?: number;
}) {
  const percentage = Math.min(100, (value / maxValue) * 100);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm w-5 text-center">{icon}</span>
      <span
        className="text-xs font-medium w-8 uppercase tracking-wider"
        style={{ color: "var(--theme-muted)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--theme-surface-raised)" }}
      >
        <div
          className="h-full rounded-full score-bar"
          style={{
            backgroundColor: color,
            width: `${percentage}%`,
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
      <span
        className="text-xs font-bold w-7 text-right"
        style={{ color: "var(--theme-text)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function CharacterCard({
  character,
  isPlayer = false,
  compact = false,
}: CharacterCardProps) {
  const totalStats = Object.values(character.stats).reduce((a, b) => a + b, 0);

  return (
    <div
      className={`rounded-2xl border-2 p-4 ${
        compact ? "max-w-xs" : "max-w-sm mx-auto"
      } ${isPlayer ? "ring-2 ring-[var(--theme-accent)]" : ""}`}
      style={{
        borderColor: isPlayer ? "var(--theme-accent)" : "var(--theme-border)",
        backgroundColor: "var(--theme-surface)",
      }}
    >
      {/* Character name */}
      <div className="text-center mb-3">
        <h3
          className="font-bold text-lg"
          style={{
            fontFamily: "var(--font-display)",
            color: isPlayer ? "var(--theme-accent)" : "var(--theme-text)",
          }}
        >
          {character.name}
        </h3>
        {isPlayer && (
          <span
            className="text-xs uppercase tracking-widest font-medium"
            style={{ color: "var(--theme-muted)" }}
          >
            Your Champion
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="space-y-2">
        {tournamentConfig.stats.map((stat, i) => (
          <StatBar
            key={stat.id}
            label={stat.shortName}
            icon={stat.icon}
            value={character.stats[stat.id] ?? 0}
            maxValue={stat.maxValue}
            color={stat.color}
            delay={i * 100}
          />
        ))}
      </div>

      {/* Total power */}
      <div
        className="mt-3 pt-3 border-t flex justify-between items-center"
        style={{ borderColor: "var(--theme-border)" }}
      >
        <span
          className="text-xs uppercase tracking-wider font-medium"
          style={{ color: "var(--theme-muted)" }}
        >
          Total Power
        </span>
        <span
          className="text-lg font-bold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--theme-accent)",
          }}
        >
          {totalStats}
        </span>
      </div>
    </div>
  );
}
