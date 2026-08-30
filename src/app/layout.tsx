import type { Metadata } from "next";
import "./globals.css";
import ClientNav from "@/components/scene/ClientNav";

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
        <ClientNav />
        <main>{children}</main>
        <footer
          className="pb-24 pt-12"
          style={{
            backgroundColor: "var(--pixel-chrome)",
            borderTop: "3px solid var(--pixel-card-border)",
          }}
        >
          <div className="pixel-dither-border" />
          <div
            className="mx-auto max-w-5xl px-4 py-8 text-center"
            style={{ color: "var(--pixel-cream)" }}
          >
            <p style={{ fontFamily: "var(--font-pixel)", fontSize: "8px", letterSpacing: "2px", lineHeight: "1.8" }}>
              PERSONA &copy; {new Date().getFullYear()}
            </p>
            <p className="mt-2" style={{ fontFamily: "var(--font-pixel-body)", fontSize: "16px", color: "var(--pixel-cream)", opacity: 0.6 }}>
              No accounts. No databases. Just fun.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
