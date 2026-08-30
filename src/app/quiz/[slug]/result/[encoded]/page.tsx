import { getQuizBySlug, getAllQuizSlugs, getRelatedQuizzes } from "@/lib/registry";
import { decodeResult } from "@/lib/encode";
import { notFound } from "next/navigation";
import Link from "next/link";
import ShareButtons from "./ShareButtons";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string; encoded: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, encoded } = await params;
  const result = decodeResult(slug, encoded);
  if (!result) return {};
  return {
    title: `I am ${result.outcome.name} | ${result.quiz.title}`,
    description: `${result.outcome.tagline} Take ${result.quiz.title} and find your result.`,
    openGraph: {
      title: `${result.outcome.theme.icon} I am ${result.outcome.name}`,
      description: result.outcome.tagline,
      type: "website",
      images: [{ url: `/api/og?slug=${slug}&outcome=${result.outcome.id}`, width: 1200, height: 630 }],
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { slug, encoded } = await params;
  const result = decodeResult(slug, encoded);
  if (!result) notFound();

  const { quiz, outcome, scores, percentage } = result;
  const related = getRelatedQuizzes(slug);

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Result Card — gradient bg + white text is correct here (contrast on colored bg) */}
      <div
        className="rounded-3xl p-8 md:p-12 text-center text-white mb-8 reveal-animation"
        style={{ background: outcome.theme.gradient, color: "#FFFFFF" }}
      >
        <span className="text-7xl mb-4 block stagger-1">{outcome.theme.icon}</span>
        <h1
          className="text-3xl md:text-5xl font-bold mb-2 stagger-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {outcome.name}
        </h1>
        <p className="text-lg md:text-xl opacity-90 stagger-3">{outcome.tagline}</p>
      </div>

      {/* Description */}
      <div className="mb-8 stagger-4">
        {outcome.description.split("\n\n").map((para, i) => (
          <p key={i} className="mb-4 leading-relaxed" style={{ color: "var(--theme-text)" }}>
            {para}
          </p>
        ))}
      </div>

      {/* Score Breakdown */}
      <div
        className="mb-8 rounded-2xl border p-6"
        style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}
      >
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
        >
          Your Score Breakdown
        </h2>
        <div className="space-y-3">
          {quiz.outcomes
            .slice()
            .sort((a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0))
            .map((o) => (
              <div key={o.id}>
                <div className="flex justify-between text-sm mb-1" style={{ color: "var(--theme-text)" }}>
                  <span>{o.theme.icon} {o.name}</span>
                  <span className="font-medium">{percentage[o.id]}%</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--theme-border)" }}
                >
                  <div
                    className="score-bar h-full rounded-full"
                    style={{ width: `${percentage[o.id]}%`, backgroundColor: o.theme.accent }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Share Buttons */}
      <ShareButtons quizSlug={quiz.slug} outcomeName={outcome.name} outcomeIcon={outcome.theme.icon} quizTitle={quiz.title} />

      {/* Pro Tier CTA (Future) */}
      <div
        className="mt-8 rounded-2xl border p-6 text-center"
        style={{ backgroundColor: "var(--theme-surface)", borderColor: "var(--theme-border)" }}
      >
        <p className="text-sm mb-2" style={{ color: "var(--theme-muted)" }}>
          Want the full personality report?
        </p>
        <button
          disabled
          className="font-semibold px-6 py-3 rounded-xl cursor-not-allowed"
          style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-muted)" }}
        >
          Coming Soon: Pro Report
        </button>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={`/quiz/${quiz.slug}`}
          className="text-center font-semibold px-6 py-3 rounded-xl transition-colors"
          style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-text-on-accent)" }}
        >
          Retake Quiz
        </Link>
        <Link
          href="/"
          className="text-center border-2 font-semibold px-6 py-3 rounded-xl hover:border-[var(--theme-accent)] transition-colors"
          style={{ borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
        >
          Try Another Quiz
        </Link>
      </div>

      {/* Related Quizzes */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
          >
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((q) => (
              <Link
                key={q.slug}
                href={`/quiz/${q.slug}`}
                className="quiz-card block rounded-xl border p-4 hover:border-[var(--theme-accent)]"
                style={{ borderColor: "var(--theme-border)", backgroundColor: "var(--theme-surface)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{q.outcomes[0]?.theme.icon}</span>
                  <span className="font-bold" style={{ color: "var(--theme-text)" }}>{q.title}</span>
                </div>
                <p className="text-sm mt-1 line-clamp-1" style={{ color: "var(--theme-muted)" }}>
                  {q.intro.subheading}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            name: quiz.title,
            description: quiz.metaDescription,
            about: { "@type": "Thing", name: outcome.name, description: outcome.tagline },
          }),
        }}
      />
    </div>
  );
}
