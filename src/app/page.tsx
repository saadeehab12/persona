"use client";

import { getAllQuizzes } from "@/lib/registry";
import { ratherDecks } from "@/lib/rather/decks";
import { pickOneBrackets } from "@/lib/pickone/brackets";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setQuizzes(getAllQuizzes());
    setMounted(true);
  }, []);

  return (
    <div className="py-8">
      {/* ============================================
          PIXEL ART HERO BANNER
          ============================================ */}
      <section className="mb-12 pixel-card relative overflow-hidden" style={{ padding: 0 }}>
        {/* Pixel art scene rendered via CSS */}
        <div
          className="relative w-full"
          style={{
            minHeight: "240px",
            background: "linear-gradient(180deg, #D4C4A8 0%, #E8D5C0 30%, #C4B8A8 60%, #8B7355 100%)",
            imageRendering: "pixelated",
          }}
        >
          {/* Pixel mountains */}
          <div className="absolute bottom-0 left-0 right-0" style={{ height: "160px" }}>
            {/* Mountain layer 1 - back */}
            <svg className="absolute bottom-8 left-0 w-full" viewBox="0 0 400 80" preserveAspectRatio="none" style={{ imageRendering: "pixelated" }}>
              <polygon points="0,80 40,30 80,50 120,15 160,45 200,10 240,40 280,20 320,50 360,25 400,80" fill="var(--pixel-forest-dark)" opacity="0.5" />
            </svg>
            {/* Mountain layer 2 - mid */}
            <svg className="absolute bottom-4 left-0 w-full" viewBox="0 0 400 60" preserveAspectRatio="none" style={{ imageRendering: "pixelated" }}>
              <polygon points="0,60 50,20 100,40 150,10 200,35 250,15 300,40 350,20 400,60" fill="var(--pixel-forest-mid)" opacity="0.7" />
            </svg>
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: "32px", backgroundColor: "var(--pixel-green)" }} />
            {/* Pixel trees */}
            <div className="absolute bottom-8 left-[10%] text-2xl" style={{ imageRendering: "pixelated" }}>🌲</div>
            <div className="absolute bottom-8 left-[25%] text-3xl" style={{ imageRendering: "pixelated" }}>🌳</div>
            <div className="absolute bottom-8 right-[15%] text-2xl" style={{ imageRendering: "pixelated" }}>🌲</div>
            <div className="absolute bottom-8 right-[30%] text-xl" style={{ imageRendering: "pixelated" }}>🌳</div>
            {/* Pixel cottage */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl" style={{ imageRendering: "pixelated" }}>🏡</div>
          </div>

          {/* Title overlay */}
          <div className="relative z-10 text-center pt-8 pb-16 px-4">
            <p
              className="mb-2"
              style={{
                fontFamily: "var(--font-pixel-body)",
                fontSize: "16px",
                color: "var(--pixel-forest-dark)",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Welcome to
            </p>
            <h1
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "clamp(16px, 4vw, 28px)",
                color: "var(--pixel-forest-dark)",
                textShadow: "2px 2px 0px var(--pixel-cream)",
                lineHeight: "1.6",
              }}
            >
              PERSONA
            </h1>
            <p
              className="mt-3 max-w-lg mx-auto"
              style={{
                fontFamily: "var(--font-pixel-body)",
                fontSize: "20px",
                color: "var(--pixel-forest-mid)",
              }}
            >
              Quizzes, games, decisions &amp; generators — all free, no signup.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION: WOULD YOU RATHER (above the fold)
          ============================================ */}
      <SectionHeader icon="🎲" title="Would You Rather" badge="Popular" badgeColor="var(--pixel-terracotta)" />
      <p className="text-sm mb-4" style={{ color: "var(--theme-muted)", fontFamily: "var(--font-pixel-body)" }}>
        Pick one. No take-backs. Discover what your choices say about you.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
        {ratherDecks.map((deck) => (
          <Link
            key={deck.slug}
            href={`/rather/${deck.slug}`}
            className="pixel-card block p-4"
          >
            <span className="text-2xl mb-2 block">{deck.icon}</span>
            <h3
              className="mb-1"
              style={{
                fontFamily: "var(--font-pixel-body)",
                fontSize: "18px",
                color: "var(--theme-text)",
                fontWeight: 700,
              }}
            >
              {deck.title}
            </h3>
            <span className="pixel-tag" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-accent)" }}>
              {deck.questions.length} Qs
            </span>
          </Link>
        ))}
      </div>

      {/* ============================================
          SECTION: QUICK DECISIONS
          ============================================ */}
      <SectionHeader icon="⚡" title="Quick Decisions" badge="Fast" badgeColor="var(--pixel-green)" />
      <p className="text-sm mb-4" style={{ color: "var(--theme-muted)", fontFamily: "var(--font-pixel-body)" }}>
        Can not decide? Let us help. One tap and done.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-12">
        {[
          { href: "/decisions", icon: "🎡", title: "Decision Wheel", desc: "Add options, spin, let fate decide" },
          { href: "/decisions", icon: "🔮", title: "Yes/No Oracle", desc: "Dramatic, theatrical answers" },
          { href: "/decisions", icon: "🍽️", title: "What Should I Eat", desc: "Food suggestions by mood" },
        ].map((item) => (
          <Link key={item.title} href={item.href} className="pixel-card block p-4">
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <h3 style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>
              {item.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* ============================================
          SECTION: PICK ONE
          ============================================ */}
      <SectionHeader icon="👑" title="Pick One" badge="Bracket" badgeColor="#9B59B6" />
      <p className="text-sm mb-4" style={{ color: "var(--theme-muted)", fontFamily: "var(--font-pixel-body)" }}>
        Narrow 16 contenders down to 1 champion through head-to-head matchups.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {pickOneBrackets.map((b) => (
          <Link key={b.slug} href={`/pickone/${b.slug}`} className="pixel-card block p-4">
            <span className="text-2xl mb-2 block">{b.icon}</span>
            <h3 style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>
              {b.title}
            </h3>
            <span className="pixel-tag" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-muted)" }}>
              {b.items.length} items
            </span>
          </Link>
        ))}
      </div>

      {/* ============================================
          SECTION: BATTLE ARENA (featured)
          ============================================ */}
      <Link href="/tournament" className="block mb-12">
        <div className="pixel-card p-8 text-center relative overflow-hidden">
          <div className="pixel-dither-border mb-4" />
          <span className="text-5xl mb-4 block">⚔️</span>
          <h2
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "14px",
              color: "var(--theme-accent)",
              lineHeight: "1.8",
              letterSpacing: "2px",
            }}
          >
            BATTLE ARENA
          </h2>
          <p className="mt-2 mb-4" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>
            Build a superhuman champion. Battle AI opponents. Become legendary.
          </p>
          <div className="pixel-btn inline-block">Enter the Arena</div>
          <div className="pixel-dither-border mt-4" />
        </div>
      </Link>

      {/* ============================================
          SECTION: LIFE SIMULATOR
          ============================================ */}
      <Link href="/life" className="block mb-12">
        <div className="pixel-card p-6 flex items-center gap-4">
          <span className="text-4xl">🌅</span>
          <div>
            <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "11px", color: "var(--theme-text)", lineHeight: "1.8" }}>
              LIFE SIMULATOR
            </h2>
            <p className="mt-1" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>
              Live a whole life in 7 choices. See where your decisions take you.
            </p>
          </div>
        </div>
      </Link>

      {/* ============================================
          SECTION: GENERATORS
          ============================================ */}
      <SectionHeader icon="✨" title="Generators" />
      <p className="text-sm mb-4" style={{ color: "var(--theme-muted)", fontFamily: "var(--font-pixel-body)" }}>
        Tap generate. Get something fun. Repeat forever.
      </p>
      <Link href="/generators" className="pixel-card inline-flex items-center gap-3 p-4 mb-12">
        <span className="text-2xl">🔥</span>
        <span style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>
          Roast, Hype, Superhero, Excuse &amp; Fantasy Kingdom
        </span>
        <span style={{ color: "var(--theme-muted)" }}>→</span>
      </Link>

      {/* ============================================
          SECTION: PERSONALITY QUIZZES
          ============================================ */}
      <SectionHeader icon="🧩" title="Personality Quizzes" />
      <p className="text-sm mb-4" style={{ color: "var(--theme-muted)", fontFamily: "var(--font-pixel-body)" }}>
        Deep-dive quizzes that reveal your archetype, style, and strengths.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {quizzes.map((quiz: any) => (
          <Link key={quiz.slug} href={`/quiz/${quiz.slug}`} className="pixel-card block p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{quiz.outcomes[0]?.theme.icon}</span>
              <span className="pixel-tag" style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-text-on-accent)" }}>
                {quiz.questions.length} Qs
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-pixel-body)", fontSize: "20px", color: "var(--theme-text)", fontWeight: 700 }}>
              {quiz.title}
            </h3>
            <p className="line-clamp-2 mt-1" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>
              {quiz.intro.subheading}
            </p>
          </Link>
        ))}
      </div>

      {/* SEO footer text */}
      <section className="mt-16 max-w-2xl mx-auto text-center">
        <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>
          Persona offers free personality quizzes, Would You Rather games, bracket-style
          Pick One eliminations, decision tools, generators, and a life simulator.
          Everything runs in your browser — no accounts, no databases, no catch.
        </p>
      </section>
    </div>
  );
}

/** Pixel-art section header with icon and optional badge */
function SectionHeader({
  icon,
  title,
  badge,
  badgeColor,
}: {
  icon: string;
  title: string;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xl">{icon}</span>
      <h2
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "12px",
          color: "var(--theme-text)",
          letterSpacing: "1px",
          lineHeight: "1.6",
        }}
      >
        {title.toUpperCase()}
      </h2>
      {badge && (
        <span
          className="pixel-tag"
          style={{
            backgroundColor: badgeColor ?? "var(--theme-accent)",
            color: "var(--pixel-cream)",
            fontSize: "10px",
          }}
        >
          {badge}
        </span>
      )}
    </div>
  );
}
