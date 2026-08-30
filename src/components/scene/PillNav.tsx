"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/rather", label: "🎲", name: "Rather" },
  { href: "/pickone", label: "👑", name: "Pick One" },
  { href: "/decisions", label: "⚡", name: "Decide" },
  { href: "/tournament", label: "⚔️", name: "Arena" },
  { href: "/generators", label: "✨", name: "Generate" },
  { href: "/life", label: "🌅", name: "Life Sim" },
  { href: "/", label: "🧩", name: "Quizzes" },
];

export default function PillNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top bar — logo + dark mode, always visible */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
        style={{
          background: scrolled ? "rgba(17, 24, 22, 0.95)" : "transparent",
          transition: "background 0.2s steps(3)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🌲</span>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "10px",
              color: "#E8DED0",
              letterSpacing: "2px",
            }}
          >
            PERSONA
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <DarkModeToggleSmall />
        </div>
      </header>

      {/* Bottom pill nav — floating, overlaid on scene */}
      <nav
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-full"
        style={{
          backgroundColor: "rgba(17, 24, 22, 0.92)",
          backdropFilter: "blur(8px)",
          border: "2px solid rgba(232, 222, 208, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full transition-all hover:bg-white/10"
            style={{ color: "#E8DED0" }}
            title={link.name}
          >
            <span className="text-sm">{link.label}</span>
            <span
              className="hidden md:inline"
              style={{
                fontFamily: "var(--font-pixel-body)",
                fontSize: "14px",
              }}
            >
              {link.name}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}

function DarkModeToggleSmall() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center"
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: "2px solid rgba(232, 222, 208, 0.3)",
        backgroundColor: dark ? "#1B4332" : "#5A6A7A",
        cursor: "pointer",
      }}
      aria-label="Toggle dark mode"
    >
      <span style={{ fontSize: "14px" }}>{dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
