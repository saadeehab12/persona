import type { Metadata } from "next";
import DarkModeToggle from "@/components/DarkModeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Persona — Free Boredom Busters",
    template: "%s | Persona",
  },
  description:
    "Quizzes, games, decisions, and generators — all free, no signup required. Pixel-perfect entertainment.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Persona",
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
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        {/* Pixel-art header bar */}
        <header
          className="sticky top-0 z-50"
          style={{
            backgroundColor: "var(--pixel-chrome)",
            borderBottom: "3px solid var(--pixel-card-border)",
          }}
        >
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              {/* Pixel tree sprite */}
              <span className="text-xl" style={{ imageRendering: "pixelated" }}>🌲</span>
              <span
                className="text-sm md:text-base tracking-wider"
                style={{
                  fontFamily: "var(--font-pixel)",
                  color: "var(--pixel-cream)",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                PERSONA
              </span>
            </a>
            <nav className="flex items-center gap-3">
              <a
                href="/rather"
                className="text-xs hover:opacity-80 transition-opacity hidden md:block"
                style={{
                  fontFamily: "var(--font-pixel-body)",
                  color: "var(--pixel-cream)",
                  fontSize: "16px",
                }}
              >
                🎲 Rather
              </a>
              <a
                href="/pickone"
                className="text-xs hover:opacity-80 transition-opacity hidden md:block"
                style={{
                  fontFamily: "var(--font-pixel-body)",
                  color: "var(--pixel-cream)",
                  fontSize: "16px",
                }}
              >
                👑 Pick One
              </a>
              <a
                href="/tournament"
                className="text-xs hover:opacity-80 transition-opacity"
                style={{
                  fontFamily: "var(--font-pixel-body)",
                  color: "var(--pixel-terracotta)",
                  fontSize: "16px",
                }}
              >
                ⚔️ Arena
              </a>
              <DarkModeToggle />
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        {/* Pixel-art footer */}
        <footer
          className="mt-16"
          style={{
            backgroundColor: "var(--pixel-chrome)",
            borderTop: "3px solid var(--pixel-card-border)",
          }}
        >
          {/* Dithered separator */}
          <div className="pixel-dither-border" />
          <div
            className="mx-auto max-w-5xl px-4 py-8 text-center"
            style={{ color: "var(--pixel-cream)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "8px",
                letterSpacing: "2px",
                lineHeight: "1.8",
              }}
            >
              PERSONA &copy; {new Date().getFullYear()}
            </p>
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-pixel-body)",
                fontSize: "16px",
                color: "var(--pixel-cream)",
                opacity: 0.6,
              }}
            >
              No accounts. No databases. Just fun.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
