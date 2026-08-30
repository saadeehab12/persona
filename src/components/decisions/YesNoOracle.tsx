"use client";

import { useState } from "react";

const responses = {
  yes: [
    { text: "The stars align — YES!", flavor: "The universe has spoken clearly." },
    { text: "Without hesitation. YES!", flavor: "Your gut already knew the answer." },
    { text: "A thousand times YES!", flavor: "This is the way forward." },
    { text: "The oracle sees a bright path ahead. YES.", flavor: "Trust what you already feel." },
    { text: "The answer echoes through eternity: YES.", flavor: "Some questions answer themselves." },
    { text: "Absolutely. The cards don't lie.", flavor: "Fortune favors this choice." },
    { text: "The cosmos whispers a resounding YES.", flavor: "Alignment is rare. Seize it." },
    { text: "The pendulum swings firmly toward YES.", flavor: "Momentum is on your side." },
  ],
  no: [
    { text: "The winds say NO.", flavor: "Sometimes the best move is no move." },
    { text: "Absolutely not. NO.", flavor: "Your instincts are protecting you." },
    { text: "The oracle shakes its head. NO.", flavor: "There is wisdom in walking away." },
    { text: "The universe whispers: not this time. NO.", flavor: "Better things await your attention." },
    { text: "The stars say steer clear. NO.", flavor: "Redirect that energy elsewhere." },
    { text: "The cards reveal a closed door. NO.", flavor: "Closed doors protect, not punish." },
    { text: "The pendulum swings away. NO.", flavor: "Some questions are already answered." },
  ],
  maybe: [
    { text: "The answer is... MAYBE.", flavor: "The universe enjoys keeping you guessing." },
    { text: "Hmm... ask again later. MAYBE.", flavor: "Timing is everything." },
    { text: "The oracle shrugs. MAYBE.", flavor: "Some questions need more time." },
  ],
};

export default function YesNoOracle() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<{ text: string; flavor: string; type: "yes" | "no" | "maybe" } | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const consult = () => {
    if (!question.trim() || isRevealing) return;
    setIsRevealing(true);
    setAnswer(null);
    setTimeout(() => {
      const rand = Math.random();
      let type: "yes" | "no" | "maybe";
      if (rand < 0.45) type = "yes";
      else if (rand < 0.9) type = "no";
      else type = "maybe";
      const pool = responses[type];
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setAnswer({ ...pick, type });
      setIsRevealing(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-6">
        <input
          type="text"
          value={question}
          onChange={(e) => { setQuestion(e.target.value); setAnswer(null); }}
          onKeyDown={(e) => e.key === "Enter" && consult()}
          placeholder="Ask your question..."
          className="w-full pixel-card px-4 py-3 text-center"
          style={{ fontFamily: "var(--font-pixel-body)", fontSize: "22px", color: "var(--theme-text)", outline: "none" }}
        />
      </div>

      <div className="mb-6">
        <div
          className="w-20 h-20 mx-auto flex items-center justify-center text-3xl"
          style={{
            border: `3px solid ${isRevealing ? "var(--theme-accent)" : "var(--pixel-card-border)"}`,
            backgroundColor: "var(--theme-surface-raised)",
            transition: "all 0.15s steps(3)",
            transform: isRevealing ? "scale(1.1)" : "scale(1)",
          }}
        >
          {isRevealing ? "🔮" : "👁️"}
        </div>
      </div>

      <button onClick={consult} disabled={!question.trim() || isRevealing} className="pixel-btn">
        {isRevealing ? "Consulting..." : "Ask the Oracle 🔮"}
      </button>

      {answer && (
        <div className="mt-8 reveal-animation">
          <p style={{ fontFamily: "var(--font-pixel)", fontSize: "16px", color: answer.type === "yes" ? "var(--pixel-green)" : answer.type === "no" ? "var(--pixel-terracotta)" : "var(--theme-accent)", lineHeight: "1.8" }}>
            {answer.text}
          </p>
          <p className="mt-2 italic" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>
            {answer.flavor}
          </p>
        </div>
      )}
    </div>
  );
}
