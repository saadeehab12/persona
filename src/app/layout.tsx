import type { Metadata } from "next";
import DarkModeToggle from "@/components/DarkModeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Freebuff - Free Personality Quizzes",
    template: "%s | Freebuff",
  },
  description:
    "Discover your personality, career archetype, and creative DNA with Freebuff's free, beautifully designed quizzes. No signup required.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Freebuff",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <header className="border-b border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">⚡</span>
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Freebuff
              </span>
            </a>
            <DarkModeToggle />
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] mt-16">
          <div className="mx-auto max-w-5xl px-4 py-8 text-center text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            <p>Freebuff &copy; {new Date().getFullYear()}. Free personality quizzes.</p>
            <p className="mt-1">No accounts. No databases. Just quizzes.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
