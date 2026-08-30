"use client";

import { useState, useCallback } from "react";
import { type GeneratorConfig, roastParts, complimentParts, superheroParts, excuseParts, kingdomParts } from "@/lib/generators/wordbanks";

interface GeneratorCardProps { config: GeneratorConfig; }

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function generateOutput(type: GeneratorConfig["type"]): string {
  switch (type) {
    case "roast": return `${pick(roastParts.opening)} ${pick(roastParts.noun)} ${pick(roastParts.closer)}`;
    case "compliment": return `${pick(complimentParts.opener)} ${pick(complimentParts.middle)}. ${pick(complimentParts.closer)}`;
    case "superhero": return `${pick(superheroParts.adjective)} ${pick(superheroParts.noun)}`;
    case "excuse": return `${pick(excuseParts.opener)} ${pick(excuseParts.excuse)}. ${pick(excuseParts.closer)}`;
    case "kingdom": {
      const prefix = pick(kingdomParts.prefix);
      const suffix = pick(kingdomParts.suffix);
      return Math.random() > 0.4 ? `The ${prefix}${suffix} ${pick(kingdomParts.epithet)}` : `${prefix}${suffix}`;
    }
  }
}

export default function GeneratorCard({ config }: GeneratorCardProps) {
  const [output, setOutput] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generate = useCallback(() => {
    if (isRevealing) return;
    setIsRevealing(true);
    setOutput(null);
    setTimeout(() => {
      const result = generateOutput(config.type);
      setOutput(result);
      setHistory((prev) => [result, ...prev].slice(0, 5));
      setIsRevealing(false);
    }, 400);
  }, [config.type, isRevealing]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = output;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pixel-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <h3 style={{ fontFamily: "var(--font-pixel)", fontSize: "9px", color: "var(--theme-text)", lineHeight: "1.6" }}>{config.name.toUpperCase()}</h3>
          <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "14px", color: "var(--theme-muted)" }}>{config.description}</p>
        </div>
      </div>

      <div className={`min-h-[60px] p-3 mb-3 flex items-center justify-center text-center ${isRevealing ? "opacity-0" : "opacity-100"}`} style={{ backgroundColor: "var(--theme-surface-raised)", border: "2px solid var(--pixel-card-border)" }}>
        {output ? (
          config.type === "superhero" ? (
            <p style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: "var(--theme-accent)", lineHeight: "1.8" }}>{output}</p>
          ) : (
            <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)" }}>{output}</p>
          )
        ) : (
          <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>Tap generate to begin</p>
        )}
      </div>

      <div className="flex gap-2">
        <button onClick={generate} disabled={isRevealing} className="pixel-btn flex-1" style={{ padding: "8px 16px" }}>
          {isRevealing ? "Generating..." : output ? "Generate Again 🔄" : "Generate ✨"}
        </button>
        {output && (
          <button onClick={handleCopy} className="pixel-btn-secondary" style={{ padding: "8px 12px" }}>
            {copied ? "✓" : "📋"}
          </button>
        )}
      </div>

      {history.length > 1 && (
        <div className="mt-3 pt-3" style={{ borderTop: "2px solid var(--pixel-card-border)" }}>
          {history.slice(1, 4).map((h, i) => (
            <p key={i} className="truncate" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "14px", color: "var(--theme-muted)", opacity: 1 - i * 0.2, marginBottom: "4px" }}>{h}</p>
          ))}
        </div>
      )}
    </div>
  );
}
