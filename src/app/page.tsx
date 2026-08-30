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
          style={{ fontFamily: "var(--font-display)" }}
        >
          Know Yourself
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] max-w-2xl mx-auto">
          Free personality quizzes designed to help you understand your
          strengths, style, and superpowers. No signup. No catch.
        </p>
      </section>

      {/* Quiz Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Link
            key={quiz.slug}
            href={`/quiz/${quiz.slug}`}
            className="quiz-card block rounded-2xl border border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] p-6 hover:border-[var(--color-accent)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{quiz.outcomes[0]?.theme.icon}</span>
              <span className="text-sm font-medium text-[var(--color-accent)]">
                {quiz.questions.length} questions
              </span>
            </div>
            <h2
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {quiz.title}
            </h2>
            <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] line-clamp-2">
              {quiz.intro.subheading}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {quiz.outcomes.slice(0, 3).map((o) => (
                <span
                  key={o.id}
                  className="text-xs px-2 py-1 rounded-full border border-[var(--color-border)] dark:border-[var(--color-border-dark)]"
                >
                  {o.theme.icon} {o.name}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>

      {/* SEO content */}
      <section className="mt-16 max-w-2xl mx-auto text-center text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
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
