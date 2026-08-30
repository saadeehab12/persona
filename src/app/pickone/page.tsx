"use client";

import Link from "next/link";
import { pickOneBrackets } from "@/lib/pickone/brackets";

export default function PickOneHub() {
  return (
    <div className="py-8">
      <section className="text-center mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
        >
          Pick One
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--theme-muted)" }}>
          Narrow 16 contenders down to 1 champion. One matchup at a time.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {pickOneBrackets.map((b) => (
          <Link
            key={b.slug}
            href={`/pickone/${b.slug}`}
            className="quiz-card block rounded-2xl border p-6 hover:border-[var(--theme-accent)]"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
            }}
          >
            <span className="text-4xl mb-3 block">{b.icon}</span>
            <h2
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
            >
              {b.title}
            </h2>
            <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
              {b.description}
            </p>
            <div className="mt-3">
              <span
                className="text-xs font-medium px-2 py-1 rounded-full"
                style={{
                  backgroundColor: "var(--theme-surface-raised)",
                  color: "var(--theme-accent)",
                }}
              >
                {b.items.length} items
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
