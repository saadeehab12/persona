"use client";

import { useState, useCallback } from "react";
import {
  type GeneratorConfig,
  roastParts,
  complimentParts,
  superheroParts,
  excuseParts,
  kingdomParts,
} from "@/lib/generators/wordbanks";

interface GeneratorCardProps {
  config: GeneratorConfig;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOutput(type: GeneratorConfig["type"]): string {
  switch (type) {
    case "roast":
      return `${pick(roastParts.opening)} ${pick(roastParts.noun)} ${pick(roastParts.closer)}`;
    case "compliment":
      return `${pick(complimentParts.opener)} ${pick(complimentParts.middle)}. ${pick(complimentParts.closer)}`;
    case "superhero": {
      const adj = pick(superheroParts.adjective);
      const noun = pick(superheroParts.noun);
      return `${adj} ${noun}`;
    }
    case "excuse":
      return `${pick(excuseParts.opener)} ${pick(excuseParts.excuse)}. ${pick(excuseParts.closer)}`;
    case "kingdom": {
      const prefix = pick(kingdomParts.prefix);
      const suffix = pick(kingdomParts.suffix);
      const useEpithet = Math.random() > 0.4;
      return useEpithet
        ? `The ${prefix}${suffix} ${pick(kingdomParts.epithet)}`
        : `${prefix}${suffix}`;
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
    }, 600);
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
    <div
      className="rounded-2xl border p-6"
      style={{
        borderColor: "var(--theme-border)",
        backgroundColor: "var(--theme-surface)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{config.icon}</span>
        <div>
          <h3
            className="text-lg font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--theme-text)",
            }}
          >
            {config.name}
          </h3>
          <p className="text-xs" style={{ color: "var(--theme-muted)" }}>
            {config.description}
          </p>
        </div>
      </div>

      {/* Output area */}
      <div
        className={`min-h-[80px] rounded-xl p-4 mb-4 flex items-center justify-center text-center transition-all duration-300 ${
          isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{ backgroundColor: "var(--theme-surface-raised)" }}
      >
        {output ? (
          config.type === "superhero" ? (
            <p
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--theme-accent)",
              }}
            >
              {output}
            </p>
          ) : (
            <p className="text-sm" style={{ color: "var(--theme-text)" }}>
              {output}
            </p>
          )
        ) : (
          <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
            Tap generate to begin
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={generate}
          disabled={isRevealing}
          className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02] disabled:opacity-50"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          {isRevealing ? "Generating..." : output ? "Generate Again 🔄" : "Generate ✨"}
        </button>
        {output && (
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl font-bold text-sm border transition-all"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: copied ? "#4CAF5020" : "var(--theme-surface-raised)",
              color: copied ? "#4CAF50" : "var(--theme-text)",
            }}
          >
            {copied ? "✓" : "📋"}
          </button>
        )}
      </div>

      {/* History */}
      {history.length > 1 && (
        <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--theme-border)" }}>
          <p className="text-xs mb-2" style={{ color: "var(--theme-muted)" }}>
            Recent:
          </p>
          {history.slice(1, 4).map((h, i) => (
            <p
              key={i}
              className="text-xs truncate mb-1"
              style={{ color: "var(--theme-muted)", opacity: 1 - i * 0.2 }}
            >
              {h}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
