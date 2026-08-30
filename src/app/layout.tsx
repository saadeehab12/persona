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

// Inline script to restore dark mode before first paint
const themeScript = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
        <header
          className="border-b"
          style={{ borderColor: "var(--theme-border)" }}
        >
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <span className="text-2xl">⚡</span>
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--theme-text)" }}
              >
                Freebuff
              </span>
            </a>
            <DarkModeToggle />
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer
          className="border-t mt-16"
          style={{ borderColor: "var(--theme-border)" }}
        >
          <div
            className="mx-auto max-w-5xl px-4 py-8 text-center text-sm"
            style={{ color: "var(--theme-muted)" }}
          >
            <p>Freebuff &copy; {new Date().getFullYear()}. Free personality quizzes.</p>
            <p className="mt-1">No accounts. No databases. Just quizzes.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
