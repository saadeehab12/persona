"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function RegularNav() {
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
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--pixel-chrome)",
        borderBottom: "3px solid var(--pixel-card-border)",
      }}
    >
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg">🌲</span>
          <span
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "9px",
              color: "var(--pixel-cream)",
              letterSpacing: "2px",
            }}
          >
            PERSONA
          </span>
        </Link>
        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--pixel-terracotta)" }}
          >
            ← Home
          </Link>
          <button
            onClick={toggle}
            className="flex items-center justify-center"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "2px solid var(--pixel-card-border)",
              backgroundColor: dark ? "var(--pixel-forest-dark)" : "#5A6A7A",
              cursor: "pointer",
            }}
            aria-label="Toggle dark mode"
          >
            <span style={{ fontSize: "14px" }}>{dark ? "☀️" : "🌙"}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
