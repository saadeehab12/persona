"use client";

import { useEffect, useRef, useState } from "react";
import PixelCanvas, { type SceneTheme } from "./PixelCanvas";

export type SceneVariant =
  | "hero"
  | "quizzes"
  | "arena"
  | "decisions"
  | "generators"
  | "life"
  | "pickone"
  | "rather";

interface PixelSceneProps {
  variant: SceneVariant;
  height?: number;
  parallax?: boolean;
  children?: React.ReactNode;
}

/**
 * Illustrated pixel art nature scene wrapper.
 * Uses PixelCanvas for the actual rendering, adds parallax and children overlay.
 */
export default function PixelScene({
  variant,
  height = 400,
  parallax = true,
  children,
}: PixelSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState<SceneTheme>("sunny");

  // Sync with site theme
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "moonlight" : "sunny");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Parallax scroll
  useEffect(() => {
    if (!parallax) return;
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setScrollY(-rect.top);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax]);

  const parallaxOffset = parallax ? scrollY * 0.15 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      {/* Canvas scene with parallax */}
      <div
        style={{
          transform: `translateY(${parallaxOffset}px)`,
          height: `${height + 60}px`,
          marginTop: "-30px",
        }}
      >
        <PixelCanvas
          theme={theme}
          width={800}
          height={height + 60}
        />
      </div>

      {/* Children overlay */}
      {children && (
        <div className="absolute inset-0 z-10 flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
}
