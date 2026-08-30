"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
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
      className="dark-toggle relative flex items-center justify-center"
      style={{
        width: "36px",
        height: "36px",
        border: "2px solid var(--pixel-card-border)",
        boxShadow: "2px 2px 0px var(--pixel-shadow)",
        backgroundColor: dark ? "var(--pixel-forest-dark)" : "var(--pixel-sky)",
        cursor: "pointer",
        imageRendering: "pixelated",
      }}
      aria-label="Toggle dark mode"
    >
      <span style={{ fontSize: "16px", lineHeight: 1 }}>
        {dark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
