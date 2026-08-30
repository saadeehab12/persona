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
    { text: "Even the silence says YES.", flavor: "Sometimes quiet is the loudest answer." },
    { text: "The oracle nods with conviction. YES.", flavor: "Certainty is a gift." },
  ],
  no: [
    { text: "The winds say NO.", flavor: "Sometimes the best move is no move." },
    { text: "Absolutely not. NO.", flavor: "Your instincts are protecting you." },
    { text: "The answer is a firm, cosmic NO.", flavor: "Not every door is meant to open." },
    { text: "The oracle shakes its head. NO.", flavor: "There is wisdom in walking away." },
    { text: "The universe whispers: not this time. NO.", flavor: "Better things await your attention." },
    { text: "The stars say steer clear. NO.", flavor: "Redirect that energy elsewhere." },
    { text: "Even the silence screams NO.", flavor: "When in doubt, sit it out." },
    { text: "The pendulum swings away. NO.", flavor: "Some questions are already answered." },
    { text: "The cards reveal a closed door. NO.", flavor: "Closed doors protect, not punish." },
    { text: "The oracle is unmoved. NO.", flavor: "Stillness is its own answer." },
  ],
  maybe: [
    { text: "The answer is... MAYBE.", flavor: "The universe enjoys keeping you guessing." },
    { text: "Hmm... ask again later. MAYBE.", flavor: "Timing is everything." },
    { text: "The oracle shrugs. MAYBE.", flavor: "Some questions need more time." },
    { text: "The winds are uncertain. MAYBE.", flavor: "Ambiguity is its own truth." },
  ],
};

export default function YesNoOracle() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<{
    text: string;
    flavor: string;
    type: "yes" | "no" | "maybe";
  } | null>(null);
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
      {/* Question input */}
      <div className="mb-6">
        <input
          type="text"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            setAnswer(null);
          }}
          onKeyDown={(e) => e.key === "Enter" && consult()}
          placeholder="Ask your question..."
          className="w-full px-4 py-3 rounded-xl border text-center text-lg outline-none"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
            color: "var(--theme-text)",
            fontFamily: "var(--font-display)",
          }}
        />
      </div>

      {/* Oracle eye */}
      <div className="mb-6">
        <div
          className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl"
          style={{
            backgroundColor: "var(--theme-surface-raised)",
            border: `3px solid ${isRevealing ? "var(--theme-accent)" : "var(--theme-border)"}`,
            transition: "all 0.3s",
            transform: isRevealing ? "scale(1.1)" : "scale(1)",
          }}
        >
          {isRevealing ? "🔮" : "👁️"}
        </div>
      </div>

      {/* Consult button */}
      <button
        onClick={consult}
        disabled={!question.trim() || isRevealing}
        className="py-3 px-8 rounded-xl font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
        style={{ backgroundColor: "var(--theme-accent)" }}
      >
        {isRevealing ? "Consulting..." : "Ask the Oracle 🔮"}
      </button>

      {/* Answer */}
      {answer && (
        <div className="mt-8 reveal-animation">
          <p
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color:
                answer.type === "yes"
                  ? "#4CAF50"
                  : answer.type === "no"
                  ? "#E85D3A"
                  : "var(--theme-accent)",
            }}
          >
            {answer.text}
          </p>
          <p className="text-sm italic" style={{ color: "var(--theme-muted)" }}>
            {answer.flavor}
          </p>
        </div>
      )}
    </div>
  );
}
