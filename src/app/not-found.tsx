import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <span className="text-6xl block mb-4">🔍</span>
      <h1
        className="text-3xl font-bold mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Page Not Found
      </h1>
      <p className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-8">
        This quiz does not exist yet. Try one of our available quizzes.
      </p>
      <Link
        href="/"
        className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Browse All Quizzes
      </Link>
    </div>
  );
}
