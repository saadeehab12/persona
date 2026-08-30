import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { decodeLifeResult, computeLifeSummary } from "@/lib/life/engine";
import { lifeConfig } from "@/lib/life/config";
import ShareButtons from "./ShareButtons";

interface Props {
  params: Promise<{ encoded: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { encoded } = await params;
  const picks = decodeLifeResult(encoded);
  if (!picks) return { title: "Life Result | Persona" };

  const summary = computeLifeSummary(picks);
  return {
    title: `I became a ${summary.career.name} — Life Simulator`,
    description: `${summary.trait.name} at heart, ${summary.career.name} by trade. What would your life look like?`,
  };
}

export default async function LifeResultPage({ params }: Props) {
  const { encoded } = await params;
  const picks = decodeLifeResult(encoded);
  if (!picks) notFound();

  const summary = computeLifeSummary(picks);

  return (
    <div className="py-8 max-w-lg mx-auto text-center">
      <div className="reveal-animation">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--theme-accent)",
          }}
        >
          {summary.outcome?.title ?? "A Life Well Lived"}
        </h1>
        <p className="text-lg mb-8" style={{ color: "var(--theme-muted)" }}>
          {summary.outcome?.description ?? "Your choices painted a unique picture."}
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-4 mb-8 text-left">
        {lifeConfig.stages.map((stage, i) => {
          const pickId = picks[i];
          const choice = stage.choices.find((c) => c.id === pickId);
          return (
            <div key={stage.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="text-lg">{stage.icon}</span>
                {i < lifeConfig.stages.length - 1 && (
                  <div className="w-0.5 flex-1 mt-1" style={{ backgroundColor: "var(--theme-border)" }} />
                )}
              </div>
              <div className="pb-4">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--theme-muted)" }}>
                  {stage.name}
                </p>
                <p className="text-sm font-medium" style={{ color: "var(--theme-text)" }}>
                  {choice?.text ?? "Skipped"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results */}
      <div
        className="rounded-2xl border p-6 mb-6 text-left"
        style={{
          borderColor: "var(--theme-border)",
          backgroundColor: "var(--theme-surface)",
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--theme-muted)" }}>
              Career
            </p>
            <div className="flex items-center gap-2">
              <span className="text-lg">{summary.career.icon}</span>
              <span className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
                {summary.career.name}
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--theme-muted)" }}>
              Core Trait
            </p>
            <div className="flex items-center gap-2">
              <span className="text-lg">{summary.trait.icon}</span>
              <span className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
                {summary.trait.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Share */}
      <ShareButtons encoded={encoded} />

      {/* CTAs */}
      <div className="flex gap-3 justify-center mt-8">
        <Link
          href="/life"
          className="py-3 px-6 rounded-xl font-bold text-white transition-all hover:scale-[1.02] inline-block"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          Live Again 🔄
        </Link>
      </div>
    </div>
  );
}
