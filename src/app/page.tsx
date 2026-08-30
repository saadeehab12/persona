import { getAllQuizzes } from "@/lib/registry";
import { ratherDecks } from "@/lib/rather/decks";
import { pickOneBrackets } from "@/lib/pickone/brackets";
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
          Never Be Bored Again
        </h1>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto"
          style={{ color: "var(--theme-muted)" }}
        >
          Quizzes, games, decisions, and generators — all free, no signup required.
        </p>
      </section>

      {/* ============================================
          SECTION 1: MOST REPLAYABLE (above the fold)
          ============================================ */}

      {/* Would You Rather */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎲</span>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
          >
            Would You Rather
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "var(--theme-accent)20", color: "var(--theme-accent)" }}
          >
            Popular
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--theme-muted)" }}>
          Pick one. No take-backs. Discover what your choices say about you.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {ratherDecks.map((deck) => (
            <Link
              key={deck.slug}
              href={`/rather/${deck.slug}`}
              className="quiz-card block rounded-xl border p-4 hover:border-[var(--theme-accent)]"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              <span className="text-2xl mb-2 block">{deck.icon}</span>
              <h3 className="text-sm font-bold mb-1" style={{ color: "var(--theme-text)" }}>
                {deck.title}
              </h3>
              <span className="text-xs" style={{ color: "var(--theme-muted)" }}>
                {deck.questions.length} Qs
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Decisions */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⚡</span>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
          >
            Quick Decisions
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#4CAF5020", color: "#4CAF50" }}
          >
            Fast
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--theme-muted)" }}>
          Can not decide? Let us help. One tap and done.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            href="/decisions"
            className="quiz-card block rounded-xl border p-4 hover:border-[var(--theme-accent)]"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
            }}
          >
            <span className="text-2xl mb-2 block">🎡</span>
            <h3 className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
              Decision Wheel
            </h3>
            <p className="text-xs" style={{ color: "var(--theme-muted)" }}>
              Add options, spin, let fate decide
            </p>
          </Link>
          <Link
            href="/decisions"
            className="quiz-card block rounded-xl border p-4 hover:border-[var(--theme-accent)]"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
            }}
          >
            <span className="text-2xl mb-2 block">🔮</span>
            <h3 className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
              Yes/No Oracle
            </h3>
            <p className="text-xs" style={{ color: "var(--theme-muted)" }}>
              Dramatic, theatrical answers
            </p>
          </Link>
          <Link
            href="/decisions"
            className="quiz-card block rounded-xl border p-4 hover:border-[var(--theme-accent)]"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: "var(--theme-surface)",
            }}
          >
            <span className="text-2xl mb-2 block">🍽️</span>
            <h3 className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
              What Should I Eat
            </h3>
            <p className="text-xs" style={{ color: "var(--theme-muted)" }}>
              Food suggestions by mood and cuisine
            </p>
          </Link>
        </div>
      </section>

      {/* Pick One */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">👑</span>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
          >
            Pick One
          </h2>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#9B59B620", color: "#9B59B6" }}
          >
            Bracket
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--theme-muted)" }}>
          Narrow 16 contenders down to 1 champion through head-to-head matchups.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pickOneBrackets.map((b) => (
            <Link
              key={b.slug}
              href={`/pickone/${b.slug}`}
              className="quiz-card block rounded-xl border p-4 hover:border-[var(--theme-accent)]"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              <span className="text-2xl mb-2 block">{b.icon}</span>
              <h3 className="text-sm font-bold mb-1" style={{ color: "var(--theme-text)" }}>
                {b.title}
              </h3>
              <span className="text-xs" style={{ color: "var(--theme-muted)" }}>
                {b.items.length} items
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================
          SECTION 2: DEEPER ENGAGEMENT
          ============================================ */}

      {/* Battle Arena */}
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
            Battle Arena
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--theme-muted)" }}>
            Build a superhuman champion. Battle AI opponents. Become legendary.
          </p>
          <div
            className="inline-block px-6 py-2 rounded-xl font-bold text-white"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            Enter the Arena
          </div>
        </Link>
      </section>

      {/* Life Simulator */}
      <section className="mb-16">
        <Link
          href="/life"
          className="quiz-card block rounded-2xl border p-6 md:p-8 hover:border-[var(--theme-accent)] transition-all"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">🌅</span>
            <div>
              <h2
                className="text-xl font-bold mb-1"
                style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
              >
                Life Simulator
              </h2>
              <p className="text-sm" style={{ color: "var(--theme-muted)" }}>
                Live a whole life in 7 choices. See where your decisions take you.
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* ============================================
          SECTION 3: GENERATORS & QUIZZES
          ============================================ */}

      {/* Generators */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">✨</span>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
          >
            Generators
          </h2>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--theme-muted)" }}>
          Tap generate. Get something fun. Repeat forever.
        </p>
        <Link
          href="/generators"
          className="quiz-card inline-flex items-center gap-3 rounded-xl border p-4 hover:border-[var(--theme-accent)]"
          style={{
            borderColor: "var(--theme-border)",
            backgroundColor: "var(--theme-surface)",
          }}
        >
          <span className="text-2xl">🔥</span>
          <span className="text-sm font-bold" style={{ color: "var(--theme-text)" }}>
            Roast, Hype, Superhero, Excuse & Fantasy Kingdom Generators
          </span>
          <span className="text-xs" style={{ color: "var(--theme-muted)" }}>→</span>
        </Link>
      </section>

      {/* Personality Quizzes */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🧩</span>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
          >
            Personality Quizzes
          </h2>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--theme-muted)" }}>
          Deep-dive quizzes that reveal your archetype, style, and strengths.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.slug}
              href={`/quiz/${quiz.slug}`}
              className="quiz-card block rounded-xl border p-4 hover:border-[var(--theme-accent)]"
              style={{
                borderColor: "var(--theme-border)",
                backgroundColor: "var(--theme-surface)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{quiz.outcomes[0]?.theme.icon}</span>
                <span className="text-xs font-medium" style={{ color: "var(--theme-accent)" }}>
                  {quiz.questions.length} questions
                </span>
              </div>
              <h3
                className="text-base font-bold mb-1"
                style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
              >
                {quiz.title}
              </h3>
              <p className="text-xs line-clamp-2" style={{ color: "var(--theme-muted)" }}>
                {quiz.intro.subheading}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO footer */}
      <section
        className="mt-16 max-w-2xl mx-auto text-center text-sm"
        style={{ color: "var(--theme-muted)" }}
      >
        <p>
          Persona offers free personality quizzes, Would You Rather games, bracket-style
          Pick One eliminations, decision tools, generators, and a life simulator.
          Everything runs in your browser — no accounts, no databases, no catch.
        </p>
      </section>
    </div>
  );
}
