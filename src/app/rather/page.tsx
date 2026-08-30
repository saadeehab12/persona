"use client";

import Link from "next/link";
import { ratherDecks } from "@/lib/rather/decks";

export default function RatherHub() {
  return (
    <div className="py-8">
      <section className="text-center mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
        >
          Would You Rather?
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--theme-muted)" }}>
          Pick one. No take-backs. Discover what your choices say about you.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {ratherDecks.map((deck) => (
          <Link
            key={deck.slug}
            href={`/rather/${deck.slug}`}
            className="quiz-card block rounded-2xl border p-6 hover:border-[var(--theme-accent)]"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
            }}
          >
            <span className="text-4xl mb-3 block">{deck.icon}</span>
            <h2
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
            >
              {deck.title}
            </h2>
            <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
              {deck.description}
            </p>
            <div className="mt-3">
              <span
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--theme-surface-raised)",
                  color: "var(--theme-accent)",
                }}
              >
                {deck.questions.length} questions
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
