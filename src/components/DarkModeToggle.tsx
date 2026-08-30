"use client";

export default function DarkModeToggle() {
  return (
    <button
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        document.body.classList.toggle("dark");
      }}
      className="dark-toggle rounded-full p-2 hover:bg-[var(--color-border)] dark:hover:bg-[var(--color-border-dark)] transition-colors"
      aria-label="Toggle dark mode"
    >
      <span className="text-lg">🌙</span>
    </button>
  );
}
