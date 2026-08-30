"use client";

import { useState, useCallback } from "react";

export default function DecisionWheel() {
  const [options, setOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);

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
    setRotation(rotation + 1440 + targetAngle);
    setTimeout(() => {
      setSpinning(false);
      setResult(options[selectedIndex]);
    }, 3500);
  }, [options, spinning, rotation]);

  const segmentAngle = options.length > 0 ? 360 / options.length : 0;
  const colors = ["#C45C3C", "#E07A4F", "#2D6A4F", "#4A8A6C", "#8B7355", "#D4C4A8", "#9B59B6", "#4A90D9", "#FF6B6B", "#FFB400", "#607D8B", "#E91E63"];

  return (
    <div className="max-w-md mx-auto">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addOption()}
          placeholder="Type an option..."
          className="flex-1 pixel-card px-4 py-2"
          style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", outline: "none" }}
        />
        <button onClick={addOption} className="pixel-btn" style={{ padding: "8px 16px" }}>Add</button>
      </div>

      {options.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {options.map((opt, i) => (
            <span key={i} onClick={() => removeOption(i)} className="pixel-tag cursor-pointer hover:opacity-80" style={{ backgroundColor: `${colors[i % colors.length]}30`, color: colors[i % colors.length] }}>
              {opt} ✕
            </span>
          ))}
        </div>
      )}

      {options.length >= 2 && (
        <div className="relative w-64 h-64 mx-auto mb-6">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 z-10" style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)", backgroundColor: "var(--theme-text)" }} />
          <div
            className="w-full h-full rounded-full overflow-hidden"
            style={{
              border: "3px solid var(--pixel-card-border)",
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 3.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
              imageRendering: "pixelated",
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
                    <path d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`} fill={colors[i % colors.length]} opacity={0.85} />
                    <text x={textX} y={textY} textAnchor="middle" dominantBaseline="central" fill="white" fontSize="9" fontWeight="bold" transform={`rotate(${(startAngle + endAngle) / 2}, ${textX}, ${textY})`}>
                      {opt.length > 12 ? opt.slice(0, 11) + "…" : opt}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      <div className="text-center">
        {options.length < 2 ? (
          <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>Add at least 2 options to spin</p>
        ) : (
          <button onClick={spin} disabled={spinning} className="pixel-btn">
            {spinning ? "Spinning..." : "Spin! 🎡"}
          </button>
        )}
      </div>

      {result && (
        <div className="text-center mt-6 reveal-animation">
          <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>The wheel has spoken:</p>
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: "14px", color: "var(--theme-accent)", lineHeight: "1.8" }}>{result.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
}
