"use client";

import { getAllQuizzes } from "@/lib/registry";
import { ratherDecks } from "@/lib/rather/decks";
import { pickOneBrackets } from "@/lib/pickone/brackets";
import Link from "next/link";
import { useState, useEffect } from "react";
import PixelScene from "@/components/scene/PixelScene";

export default function HomePage() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setQuizzes(getAllQuizzes());
    setMounted(true);
  }, []);

  return (
    <div className="pb-24">
      {/* ============================================
          PIXEL ART HERO — Full illustrated nature scene
          ============================================ */}
      <PixelScene variant="hero" height={480} parallax>
        {/* Hero content overlaid on the scene */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-16">
          <p
            style={{
              fontFamily: "var(--font-pixel-body)",
              fontSize: "18px",
              color: "#E8DED0",
              letterSpacing: "4px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            WELCOME TO
          </p>
          <h1
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "clamp(20px, 5vw, 36px)",
              color: "#FFF8F0",
              textShadow: "3px 3px 0px rgba(0,0,0,0.4)",
              lineHeight: "1.6",
              marginTop: "8px",
            }}
          >
            PERSONA
          </h1>
          <p
            className="mt-3 max-w-lg"
            style={{
              fontFamily: "var(--font-pixel-body)",
              fontSize: "22px",
              color: "#E8DED0",
              textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            Quizzes, games, decisions &amp; generators — all free, no signup.
          </p>
        </div>
      </PixelScene>

      {/* ============================================
          CONTENT AREA — Clean pixel-UI on solid background
          ============================================ */}
      <div className="max-w-5xl mx-auto px-4">

        {/* Would You Rather */}
        <SectionBanner variant="rather" title="Would You Rather" badge="Popular" badgeColor="var(--pixel-terracotta)" />
        <p className="text-sm mb-4" style={{ color: "var(--theme-muted)", fontFamily: "var(--font-pixel-body)" }}>
          Pick one. No take-backs. Discover what your choices say about you.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {ratherDecks.map((deck) => (
            <Link key={deck.slug} href={`/rather/${deck.slug}`} className="pixel-card block p-4">
              <span className="text-2xl mb-2 block">{deck.icon}</span>
              <h3 style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>{deck.title}</h3>
              <span className="pixel-tag mt-2 inline-block" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-accent)" }}>{deck.questions.length} Qs</span>
            </Link>
          ))}
        </div>

        {/* Quick Decisions */}
        <SectionBanner variant="decisions" title="Quick Decisions" badge="Fast" badgeColor="var(--pixel-green)" />
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
              <h3 style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>{item.title}</h3>
              <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>{item.desc}</p>
            </Link>
          ))}
        </div>

        {/* Pick One */}
        <SectionBanner variant="pickone" title="Pick One" badge="Bracket" badgeColor="#9B59B6" />
        <p className="text-sm mb-4" style={{ color: "var(--theme-muted)", fontFamily: "var(--font-pixel-body)" }}>
          Narrow 16 contenders down to 1 champion through head-to-head matchups.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {pickOneBrackets.map((b) => (
            <Link key={b.slug} href={`/pickone/${b.slug}`} className="pixel-card block p-4">
              <span className="text-2xl mb-2 block">{b.icon}</span>
              <h3 style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-text)", fontWeight: 700 }}>{b.title}</h3>
              <span className="pixel-tag mt-2 inline-block" style={{ backgroundColor: "var(--theme-surface-raised)", color: "var(--theme-muted)" }}>{b.items.length} items</span>
            </Link>
          ))}
        </div>

        {/* Battle Arena */}
        <SectionBanner variant="arena" title="Battle Arena" />
        <Link href="/tournament" className="block mb-12">
          <div className="pixel-card p-6 text-center">
            <span className="text-4xl mb-3 block">⚔️</span>
            <p className="mb-4" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>
              Build a superhuman champion. Battle AI opponents. Become legendary.
            </p>
            <div className="pixel-btn inline-block">Enter the Arena</div>
          </div>
        </Link>

        {/* Life Simulator */}
        <SectionBanner variant="life" title="Life Simulator" />
        <Link href="/life" className="block mb-12">
          <div className="pixel-card p-5 flex items-center gap-4">
            <span className="text-3xl">🌅</span>
            <div>
              <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "10px", color: "var(--theme-text)", lineHeight: "1.8" }}>LIFE SIMULATOR</h2>
              <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "18px", color: "var(--theme-muted)" }}>Live a whole life in 7 choices.</p>
            </div>
          </div>
        </Link>

        {/* Generators */}
        <SectionBanner variant="generators" title="Generators" />
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

        {/* Quizzes */}
        <SectionBanner variant="quizzes" title="Personality Quizzes" />
        <p className="text-sm mb-4" style={{ color: "var(--theme-muted)", fontFamily: "var(--font-pixel-body)" }}>
          Deep-dive quizzes that reveal your archetype, style, and strengths.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {quizzes.map((quiz: any) => (
            <Link key={quiz.slug} href={`/quiz/${quiz.slug}`} className="pixel-card block p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{quiz.outcomes[0]?.theme.icon}</span>
                <span className="pixel-tag" style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-text-on-accent)" }}>{quiz.questions.length} Qs</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-pixel-body)", fontSize: "20px", color: "var(--theme-text)", fontWeight: 700 }}>{quiz.title}</h3>
              <p className="line-clamp-2 mt-1" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>{quiz.intro.subheading}</p>
            </Link>
          ))}
        </div>

        <section className="mt-16 max-w-2xl mx-auto text-center">
          <p style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--theme-muted)" }}>
            Persona offers free personality quizzes, Would You Rather games, bracket-style
            Pick One eliminations, decision tools, generators, and a life simulator.
            Everything runs in your browser — no accounts, no databases, no catch.
          </p>
        </section>
      </div>
    </div>
  );
}

/**
 * Section banner — small illustrated scene for each category.
 * Uses PixelScene with reduced height.
 */
function SectionBanner({
  variant,
  title,
  badge,
  badgeColor,
}: {
  variant: any;
  title: string;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div className="mb-4 -mx-4">
      <PixelScene variant={variant} height={120} parallax={false}>
        <div className="flex items-end h-full px-6 pb-3">
          <div className="flex items-center gap-3">
            <h2
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "14px",
                color: "#FFF8F0",
                textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
                lineHeight: "1.6",
                letterSpacing: "1px",
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
                  fontSize: "9px",
                }}
              >
                {badge}
              </span>
            )}
          </div>
        </div>
      </PixelScene>
    </div>
  );
}
