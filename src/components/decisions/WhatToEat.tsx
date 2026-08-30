"use client";

import { useState } from "react";

interface FoodSuggestion {
  name: string;
  icon: string;
  description: string;
  cuisine: string;
  mood: string;
}

const foodPool: FoodSuggestion[] = [
  { name: "Sushi Bowl", icon: "🍣", description: "Fresh, light, and satisfying", cuisine: "Japanese", mood: "healthy" },
  { name: "Margherita Pizza", icon: "🍕", description: "Classic comfort food", cuisine: "Italian", mood: "comfort" },
  { name: "Pad Thai", icon: "🍜", description: "Sweet, sour, and savory perfection", cuisine: "Thai", mood: "adventurous" },
  { name: "Caesar Salad", icon: "🥗", description: "Crisp and refreshing", cuisine: "American", mood: "healthy" },
  { name: "Butter Chicken", icon: "🍛", description: "Rich, creamy, and warming", cuisine: "Indian", mood: "comfort" },
  { name: "Tacos", icon: "🌮", description: "Street food vibes, any day", cuisine: "Mexican", mood: "fun" },
  { name: "Pho", icon: "🍜", description: "Soul-warming noodle soup", cuisine: "Vietnamese", mood: "comfort" },
  { name: "Burger and Fries", icon: "🍔", description: "Sometimes you just need a classic", cuisine: "American", mood: "indulgent" },
  { name: "Mediterranean Bowl", icon: "🥙", description: "Hummus, falafel, and fresh veggies", cuisine: "Mediterranean", mood: "healthy" },
  { name: "Ramen", icon: "🍜", description: "Rich broth, perfect noodles", cuisine: "Japanese", mood: "comfort" },
  { name: "Chicken Wings", icon: "🍗", description: "Crispy, saucy, and shareable", cuisine: "American", mood: "fun" },
  { name: "Green Smoothie Bowl", icon: "🥣", description: "Energizing and refreshing", cuisine: "Health", mood: "healthy" },
  { name: "Pasta Carbonara", icon: "🍝", description: "Creamy, cheesy, and indulgent", cuisine: "Italian", mood: "indulgent" },
  { name: "Korean BBQ", icon: "🥩", description: "Grill your own feast", cuisine: "Korean", mood: "adventurous" },
  { name: "Falafel Wrap", icon: "🧆", description: "Crispy chickpea goodness", cuisine: "Mediterranean", mood: "healthy" },
  { name: "Ice Cream Sundae", icon: "🍦", description: "Because you deserve it", cuisine: "Dessert", mood: "indulgent" },
  { name: "Gnocchi", icon: "🥔", description: "Pillowy potato pasta perfection", cuisine: "Italian", mood: "comfort" },
  { name: "Acai Bowl", icon: "🫐", description: "Berry blast with crunchy toppings", cuisine: "Health", mood: "healthy" },
  { name: "Burrito Bowl", icon: "🌯", description: "All the burrito fixings, no wrapper", cuisine: "Mexican", mood: "fun" },
  { name: "Shakshuka", icon: "🍳", description: "Spicy eggs in tomato sauce", cuisine: "Middle Eastern", mood: "adventurous" },
];

const cuisineFilters = ["All", "Italian", "Japanese", "Mexican", "Indian", "American", "Mediterranean", "Thai", "Korean", "Health", "Dessert"];
const moodFilters = ["All", "comfort", "healthy", "adventurous", "fun", "indulgent"];

export default function WhatToEat() {
  const [cuisine, setCuisine] = useState("All");
  const [mood, setMood] = useState("All");
  const [suggestion, setSuggestion] = useState<FoodSuggestion | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const filtered = foodPool.filter((f) => {
    if (cuisine !== "All" && f.cuisine !== cuisine) return false;
    if (mood !== "All" && f.mood !== mood) return false;
    return true;
  });

  const roll = () => {
    if (filtered.length === 0 || isRevealing) return;
    setIsRevealing(true);
    setSuggestion(null);

    setTimeout(() => {
      const pick = filtered[Math.floor(Math.random() * filtered.length)];
      setSuggestion(pick);
      setIsRevealing(false);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Filters */}
      <div className="mb-4">
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--theme-muted)" }}>
          Cuisine
        </p>
        <div className="flex flex-wrap gap-1.5">
          {cuisineFilters.map((c) => (
            <button
              key={c}
              onClick={() => { setCuisine(c); setSuggestion(null); }}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: cuisine === c ? "var(--theme-accent)" : "var(--theme-surface-raised)",
                color: cuisine === c ? "white" : "var(--theme-text)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--theme-muted)" }}>
          Mood
        </p>
        <div className="flex flex-wrap gap-1.5">
          {moodFilters.map((m) => (
            <button
              key={m}
              onClick={() => { setMood(m); setSuggestion(null); }}
              className="px-3 py-1 rounded-full text-xs font-medium capitalize transition-all"
              style={{
                backgroundColor: mood === m ? "var(--theme-accent)" : "var(--theme-surface-raised)",
                color: mood === m ? "white" : "var(--theme-text)",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Roll button */}
      <div className="text-center mb-6">
        {filtered.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
            No foods match those filters. Try a different combo!
          </p>
        ) : (
          <button
            onClick={roll}
            disabled={isRevealing}
            className="py-3 px-8 rounded-xl font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            {isRevealing ? "Rolling..." : `What Should I Eat? 🍽️`}
          </button>
        )}
      </div>

      {/* Result */}
      {suggestion && (
        <div
          className="rounded-2xl border-2 p-6 text-center reveal-animation"
          style={{
            borderColor: "var(--theme-accent)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <span className="text-5xl block mb-3">{suggestion.icon}</span>
          <h3
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--theme-text)",
            }}
          >
            {suggestion.name}
          </h3>
          <p className="text-sm mb-2" style={{ color: "var(--theme-muted)" }}>
            {suggestion.description}
          </p>
          <div className="flex justify-center gap-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-text)" }}
            >
              {suggestion.cuisine}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full capitalize"
              style={{ backgroundColor: "var(--theme-accent)20", color: "var(--theme-accent)" }}
            >
              {suggestion.mood}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
