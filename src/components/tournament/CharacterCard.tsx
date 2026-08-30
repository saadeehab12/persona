"use client";

import type { Character } from "@/lib/tournament/combat";
import { tournamentConfig } from "@/lib/tournament/config";

interface CharacterCardProps {
  character: Character;
  isPlayer?: boolean;
  compact?: boolean;
}

function PixelStatBar({
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
      <span className="w-5 text-center">{icon}</span>
      <span
        className="w-8 uppercase tracking-wider"
        style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", color: "var(--theme-muted)" }}
      >
        {label}
      </span>
      <div className="pixel-stat-bar flex-1">
        <div
          className="pixel-stat-fill"
          style={{
            backgroundColor: color,
            width: `${percentage}%`,
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
      <span
        className="w-7 text-right"
        style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}
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
      className={`pixel-card ${compact ? "max-w-xs" : "max-w-sm mx-auto"}`}
      style={{ boxShadow: isPlayer ? `0 0 0 2px var(--theme-accent), 4px 4px 0px var(--pixel-shadow)` : undefined }}
    >
      <div className="text-center mb-3">
        <h3
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "10px",
            color: isPlayer ? "var(--theme-accent)" : "var(--theme-text)",
            lineHeight: "1.8",
            letterSpacing: "1px",
          }}
        >
          {character.name}
        </h3>
        {isPlayer && (
          <span className="pixel-tag" style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-text-on-accent)", fontSize: "8px" }}>
            YOUR CHAMPION
          </span>
        )}
      </div>

      <div className="space-y-2">
        {tournamentConfig.stats.map((stat, i) => (
          <PixelStatBar
            key={stat.id}
            label={stat.shortName}
            icon={stat.icon}
            value={character.stats[stat.id] ?? 0}
            maxValue={stat.maxValue}
            color={stat.color}
            delay={i * 80}
          />
        ))}
      </div>

      <div
        className="mt-3 pt-3 flex justify-between items-center"
        style={{ borderTop: "2px solid var(--pixel-card-border)" }}
      >
        <span className="uppercase tracking-wider" style={{ fontFamily: "var(--font-pixel)", fontSize: "7px", color: "var(--theme-muted)", letterSpacing: "1px" }}>
          Total Power
        </span>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: "12px", color: "var(--theme-accent)" }}>
          {totalStats}
        </span>
      </div>
    </div>
  );
}
