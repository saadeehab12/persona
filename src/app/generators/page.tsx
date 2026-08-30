"use client";

import { generators } from "@/lib/generators/wordbanks";
import GeneratorCard from "@/components/generators/GeneratorCard";

export default function GeneratorsHub() {
  return (
    <div className="py-8">
      <section className="text-center mb-12">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
        >
          Generators
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--theme-muted)" }}>
          Tap generate. Get something fun. Repeat forever.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {generators.map((gen) => (
          <GeneratorCard key={gen.slug} config={gen} />
        ))}
      </section>
    </div>
  );
}
