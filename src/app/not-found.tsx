import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <span className="text-6xl block mb-4">🔍</span>
      <h1
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
      >
        Page Not Found
      </h1>
      <p className="mb-8" style={{ color: "var(--theme-muted)" }}>
        This quiz does not exist yet. Try one of our available quizzes.
      </p>
      <Link
        href="/"
        className="font-semibold px-6 py-3 rounded-xl transition-colors"
        style={{ backgroundColor: "var(--theme-accent)", color: "var(--theme-text-on-accent)" }}
      >
        Browse All Quizzes
      </Link>
    </div>
  );
}
