"use client";

import { useState, useRef, useCallback } from "react";

export default function DecisionWheel() {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const addOption = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !options.includes(trimmed) && options.length < 12) {
      setOptions([...options, trimmed]);
      setInputValue("");
      setResult(null);
    }
  };

  const removeOption = (idx: number) => {
    setOptions(options.filter((_, i) => i !== idx));
    setResult(null);
  };

  const spin = useCallback(() => {
    if (options.length < 2 || spinning) return;
    setSpinning(true);
    setResult(null);

    const selectedIndex = Math.floor(Math.random() * options.length);
    const segmentAngle = 360 / options.length;
    const targetAngle = 360 - selectedIndex * segmentAngle - segmentAngle / 2;
    const totalRotation = rotation + 1440 + targetAngle; // 4 full spins + target

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(options[selectedIndex]);
    }, 3500);
  }, [options, spinning, rotation]);

  const segmentAngle = options.length > 0 ? 360 / options.length : 0;
  const colors = [
    "#E85D3A", "#FFB400", "#4A90D9", "#2EC4B6", "#9B59B6",
    "#FF6B6B", "#4CAF50", "#FF9800", "#607D8B", "#E91E63",
    "#00BCD4", "#8BC34A",
  ];

  return (
    <div className="max-w-md mx-auto">
      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addOption()}
          placeholder="Type an option and press Enter"
          className="flex-1 px-4 py-2 rounded-xl border text-sm outline-none"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
            color: "var(--theme-text)",
          }}
        />
        <button
          onClick={addOption}
          className="px-4 py-2 rounded-xl font-bold text-sm text-white"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          Add
        </button>
      </div>

      {/* Option list */}
      {options.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {options.map((opt, i) => (
            <span
              key={i}
              onClick={() => removeOption(i)}
              className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: `${colors[i % colors.length]}20`,
                color: colors[i % colors.length],
              }}
            >
              {opt} ✕
            </span>
          ))}
        </div>
      )}

      {/* Wheel */}
      {options.length >= 2 && (
        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Pointer */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 z-10"
            style={{
              clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
              backgroundColor: "var(--theme-text)",
            }}
          />

          {/* Wheel */}
          <div
            ref={wheelRef}
            className="w-full h-full rounded-full border-4 overflow-hidden"
            style={{
              borderColor: "var(--theme-border)",
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
                : "none",
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {options.map((opt, i) => {
                const startAngle = i * segmentAngle;
                const endAngle = (i + 1) * segmentAngle;
                const startRad = (startAngle - 90) * (Math.PI / 180);
                const endRad = (endAngle - 90) * (Math.PI / 180);
                const x1 = 100 + 100 * Math.cos(startRad);
                const y1 = 100 + 100 * Math.sin(startRad);
                const x2 = 100 + 100 * Math.cos(endRad);
                const y2 = 100 + 100 * Math.sin(endRad);
                const largeArc = segmentAngle > 180 ? 1 : 0;
                const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
                const textX = 100 + 60 * Math.cos(midAngle);
                const textY = 100 + 60 * Math.sin(midAngle);

                return (
                  <g key={i}>
                    <path
                      d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                      fill={colors[i % colors.length]}
                      opacity={0.85}
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize="9"
                      fontWeight="bold"
                      transform={`rotate(${(startAngle + endAngle) / 2}, ${textX}, ${textY})`}
                    >
                      {opt.length > 12 ? opt.slice(0, 11) + "…" : opt}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Spin button */}
      <div className="text-center">
        {options.length < 2 ? (
          <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
            Add at least 2 options to spin
          </p>
        ) : (
          <button
            onClick={spin}
            disabled={spinning}
            className="py-3 px-8 rounded-xl font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            {spinning ? "Spinning..." : "Spin! 🎡"}
          </button>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="text-center mt-6 reveal-animation">
          <p className="text-sm mb-1" style={{ color: "var(--theme-muted)" }}>
            The wheel has spoken:
          </p>
          <p
            className="text-2xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--theme-accent)",
            }}
          >
            {result}
          </p>
        </div>
      )}
    </div>
  );
}
