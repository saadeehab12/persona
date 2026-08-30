import { getAllQuizzes } from "@/lib/registry";
import Link from "next/link";

export default function HomePage() {
  const quizzes = getAllQuizzes();

  return (
    <div className="py-8">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
        >
          Know Yourself
        </h1>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "var(--theme-muted)" }}
        >
          Free personality quizzes designed to help you understand your
          strengths, style, and superpowers. No signup. No catch.
        </p>
      </section>

      {/* Tournament Arena CTA */}
      <section className="mb-16">
        <Link
          href="/tournament"
          className="quiz-card block rounded-2xl border-2 p-8 text-center hover:border-[var(--theme-accent)] transition-all"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <span className="text-5xl mb-4 block">⚔️</span>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)", color: "var(--theme-accent)" }}
          >
            Tournament Arena
          </h2>
          <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
            Build a superhuman champion. Battle AI opponents. Become legendary.
          </p>
          <div
            className="mt-4 inline-block px-6 py-2 rounded-xl font-bold text-white"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            Enter the Arena
          </div>
        </Link>
      </section>

      {/* Quiz Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Link
            key={quiz.slug}
            href={`/quiz/${quiz.slug}`}
            className="quiz-card block rounded-2xl border p-6 hover:border-[var(--theme-accent)]"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{quiz.outcomes[0]?.theme.icon}</span>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--theme-accent)" }}
              >
                {quiz.questions.length} questions
              </span>
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
            >
              {quiz.title}
            </h2>
            <p
              className="text-sm line-clamp-2"
              style={{ color: "var(--theme-muted)" }}
            >
              {quiz.intro.subheading}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {quiz.outcomes.slice(0, 3).map((o) => (
                <span
                  key={o.id}
                  className="text-xs px-2 py-1 rounded-full border"
                  style={{ borderColor: "var(--theme-border)", color: "var(--theme-text)" }}
                >
                  {o.theme.icon} {o.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      {/* SEO content */}
      <section
        className="mt-16 max-w-2xl mx-auto text-center text-sm"
        style={{ color: "var(--theme-muted)" }}
      >
        <p>
          Freebuff offers free personality quizzes covering career archetypes,
          personality types, communication styles, creative identity, leadership
          styles, and spirit creatures. Each quiz takes under 2 minutes and
          delivers a personalized result you can share with anyone.
        </p>
      </section>
    </div>
  );
}
