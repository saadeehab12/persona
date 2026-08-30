"use client";

import { useState } from "react";
import DecisionWheel from "@/components/decisions/DecisionWheel";
import YesNoOracle from "@/components/decisions/YesNoOracle";
import WhatToEat from "@/components/decisions/WhatToEat";

type Tool = "wheel" | "oracle" | "food";

const tools: { id: Tool; name: string; icon: string }[] = [
  { id: "wheel", name: "Decision Wheel", icon: "🎡" },
  { id: "oracle", name: "Yes/No Oracle", icon: "🔮" },
  { id: "food", name: "What to Eat", icon: "🍽️" },
];

export default function DecisionsHub() {
  const [active, setActive] = useState<Tool>("wheel");

  return (
    <div className="py-8">
      <section className="text-center mb-8">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
        >
          Quick Decisions
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--theme-muted)" }}>
          Can not decide? Let us help. Pick a tool above and let fate take the wheel.
        </p>
      </section>

      {/* Tool selector */}
      <div className="flex justify-center gap-2 mb-8">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: active === t.id ? "var(--theme-accent)" : "var(--theme-surface)",
              color: active === t.id ? "white" : "var(--theme-text)",
              border: `2px solid ${active === t.id ? "var(--theme-accent)" : "var(--theme-border)"}`,
            }}
          >
            {t.icon} {t.name}
          </button>
        ))}
      </div>

      {/* Active tool */}
      <div className="reveal-animation">
        {active === "wheel" && <DecisionWheel />}
        {active === "oracle" && <YesNoOracle />}
        {active === "food" && <WhatToEat />}
      </div>
    </div>
  );
}
