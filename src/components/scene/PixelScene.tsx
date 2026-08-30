"use client";

import { useEffect, useRef, useState } from "react";

export type SceneVariant =
  | "hero"        // Main homepage: cottage, trees, mountains, dusk sky
  | "quizzes"     // Forest clearing, warm afternoon
  | "arena"       // Castle/towers, dramatic sky
  | "decisions"   // Mountain path, crossroads
  | "generators"  // Wizard tower, mystical
  | "life"        // River valley, sunrise/sunset
  | "pickone"     // Tournament grounds, flags
  | "rather";     // Village market, cozy

interface PixelSceneProps {
  variant: SceneVariant;
  /** Height of the scene container */
  height?: number;
  /** Enable parallax on scroll */
  parallax?: boolean;
  /** Children rendered on top of the scene */
  children?: React.ReactNode;
}

/**
 * Layered pixel art nature scene with parallax depth.
 * Uses CSS transforms driven by scroll position for a subtle 2.5D effect.
 * Each scene variant has its own color palette and composition but shares
 * the same layered structure: sky → mountains → mid-ground → foreground → overlay.
 */
export default function PixelScene({
  variant,
  height = 400,
  parallax = true,
  children,
}: PixelSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!parallax) return;
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offset = -rect.top;
        setScrollY(offset);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax]);

  const scene = scenes[variant] ?? scenes.hero;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        height: `${height}px`,
        imageRendering: "pixelated",
      }}
    >
      {/* Layer 0: Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: scene.skyGradient,
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Layer 0.5: Stars/dots (dithered sky texture) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: scene.starPattern,
          backgroundSize: "4px 4px",
          opacity: scene.starOpacity,
          transform: `translateY(${scrollY * 0.02}px)`,
        }}
      />

      {/* Layer 1: Far mountains */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "70%",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <svg
          viewBox="0 0 800 280"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ imageRendering: "pixelated" }}
        >
          {scene.farMountains}
        </svg>
      </div>

      {/* Layer 2: Near mountains */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "55%",
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      >
        <svg
          viewBox="0 0 800 220"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ imageRendering: "pixelated" }}
        >
          {scene.nearMountains}
        </svg>
      </div>

      {/* Layer 3: Mid-ground trees/buildings */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "45%",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <svg
          viewBox="0 0 800 180"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ imageRendering: "pixelated" }}
        >
          {scene.midGround}
        </svg>
      </div>

      {/* Layer 4: Foreground elements */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "35%",
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <svg
          viewBox="0 0 800 140"
          className="absolute bottom-0 w-full"
          preserveAspectRatio="none"
          style={{ imageRendering: "pixelated" }}
        >
          {scene.foreground}
        </svg>
      </div>

      {/* Layer 5: Ground */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "12%",
          backgroundColor: scene.groundColor,
          transform: `translateY(${scrollY * 0.35}px)`,
        }}
      />

      {/* Dithered edge at bottom for smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "20px",
          backgroundImage: `linear-gradient(to bottom, transparent, ${scene.groundColor})`,
        }}
      />

      {/* Children overlay */}
      {children && (
        <div className="absolute inset-0 z-10 flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
}

// ============================================================
// SCENE DEFINITIONS
// Each variant defines its own color palette, mountain shapes,
// tree placements, and atmospheric elements.
// ============================================================

interface SceneDef {
  skyGradient: string;
  starPattern: string;
  starOpacity: number;
  farMountains: React.ReactNode;
  nearMountains: React.ReactNode;
  midGround: React.ReactNode;
  foreground: React.ReactNode;
  groundColor: string;
}

const scenes: Record<string, SceneDef> = {
  // ============================================
  // HERO: Warm dusk scene with cottage and trees
  // ============================================
  hero: {
    skyGradient: "linear-gradient(180deg, #2D3A4A 0%, #5A6B5A 25%, #C4956A 55%, #E8C49A 80%, #F0D8B0 100%)",
    starPattern: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
    starOpacity: 0.15,
    farMountains: (
      <>
        {/* Far mountain range - muted blue/grey */}
        <polygon points="0,280 0,160 40,140 80,120 120,150 160,100 200,130 240,90 280,110 320,80 360,100 400,70 440,90 480,60 520,85 560,75 600,95 640,80 680,110 720,90 760,100 800,120 800,280" fill="#4A5A6A" opacity="0.6" />
        <polygon points="0,280 0,180 60,160 120,140 180,165 240,130 300,155 360,120 420,145 480,110 540,135 600,120 660,140 720,125 780,135 800,140 800,280" fill="#5A6A7A" opacity="0.5" />
      </>
    ),
    nearMountains: (
      <>
        {/* Near mountains - green/teal */}
        <polygon points="0,220 0,140 60,100 120,120 180,80 240,110 300,70 360,100 420,60 480,90 540,50 600,80 660,60 720,85 780,70 800,75 800,220" fill="#2D5A44" />
        <polygon points="0,220 0,160 80,130 160,150 240,110 320,140 400,100 480,130 560,90 640,120 720,100 800,115 800,220" fill="#3A6A54" opacity="0.8" />
      </>
    ),
    midGround: (
      <>
        {/* Tree line - mixed forest */}
        {/* Left cluster */}
        <polygon points="40,180 55,100 70,180" fill="#1B4332" />
        <polygon points="60,180 75,80 90,180" fill="#2D6A4F" />
        <polygon points="80,180 95,90 110,180" fill="#1B4332" />
        <polygon points="100,180 115,70 130,180" fill="#2D5A44" />

        {/* Autumn tree - left */}
        <polygon points="150,180 165,60 180,180" fill="#8B4513" />
        <polygon points="140,140 165,50 190,140" fill="#C45C3C" opacity="0.8" />
        <polygon points="145,120 165,55 185,120" fill="#D46A4A" opacity="0.7" />

        {/* Right cluster */}
        <polygon points="650,180 665,90 680,180" fill="#1B4332" />
        <polygon points="670,180 685,75 700,180" fill="#2D6A4F" />
        <polygon points="690,180 705,85 720,180" fill="#1B4332" />
        <polygon points="710,180 725,65 740,180" fill="#2D5A44" />

        {/* Autumn tree - right */}
        <polygon points="750,180 765,55 780,180" fill="#8B4513" />
        <polygon points="740,130 765,45 790,130" fill="#C45C3C" opacity="0.8" />

        {/* Cottage silhouette in center */}
        <rect x="340" y="130" width="120" height="50" fill="#5A4A3A" />
        <polygon points="330,130 400,80 470,130" fill="#8B4513" />
        <rect x="370" y="145" width="20" height="35" fill="#3A2A1A" />
        <rect x="410" y="140" width="15" height="20" fill="#E8C49A" opacity="0.6" />
        {/* Chimney */}
        <rect x="430" y="85" width="12" height="45" fill="#6A5A4A" />
        {/* Window glow */}
        <rect x="355" y="142" width="12" height="12" fill="#FFE4B5" opacity="0.7" />
      </>
    ),
    foreground: (
      <>
        {/* Foreground grass tufts */}
        <rect x="0" y="120" width="800" height="20" fill="#2D6A4F" opacity="0.9" />
        {/* Small bushes */}
        <ellipse cx="100" cy="125" rx="30" ry="15" fill="#1B4332" />
        <ellipse cx="700" cy="125" rx="35" ry="15" fill="#1B4332" />
        {/* Path to cottage */}
        <polygon points="380,140 400,140 420,140 440,140 430,120 410,120 390,120" fill="#8B7355" opacity="0.5" />
      </>
    ),
    groundColor: "#1B4332",
  },

  // ============================================
  // QUIZZES: Forest clearing, warm afternoon
  // ============================================
  quizzes: {
    skyGradient: "linear-gradient(180deg, #4A6A5A 0%, #7A9A7A 30%, #C4B89A 60%, #E8D8B8 85%, #F0E8D0 100%)",
    starPattern: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
    starOpacity: 0.05,
    farMountains: (
      <>
        <polygon points="0,280 0,180 100,140 200,160 300,120 400,150 500,100 600,130 700,110 800,140 800,280" fill="#3A5A4A" opacity="0.5" />
      </>
    ),
    nearMountains: (
      <>
        <polygon points="0,220 0,150 120,120 240,140 360,100 480,130 600,110 720,125 800,120 800,220" fill="#2D5A44" />
      </>
    ),
    midGround: (
      <>
        {/* Dense forest clearing */}
        <polygon points="0,180 20,100 40,180" fill="#1B4332" />
        <polygon points="30,180 50,80 70,180" fill="#2D6A4F" />
        <polygon points="60,180 80,90 100,180" fill="#1B4332" />
        <polygon points="90,180 110,70 130,180" fill="#2D5A44" />
        <polygon points="120,180 140,85 160,180" fill="#1B4332" />

        {/* Clearing in center */}
        <rect x="200" y="160" width="400" height="20" fill="#4A7A5A" opacity="0.3" />

        <polygon points="600,180 620,75 640,180" fill="#1B4332" />
        <polygon points="630,180 650,90 670,180" fill="#2D6A4F" />
        <polygon points="660,180 680,70 700,180" fill="#1B4332" />
        <polygon points="690,180 710,85 730,180" fill="#2D5A44" />
        <polygon points="720,180 740,95 760,180" fill="#1B4332" />
        <polygon points="750,180 770,80 790,180" fill="#2D6A4F" />
      </>
    ),
    foreground: (
      <>
        <rect x="0" y="120" width="800" height="20" fill="#2D6A4F" opacity="0.9" />
        <ellipse cx="150" cy="125" rx="25" ry="12" fill="#1B4332" />
        <ellipse cx="650" cy="125" rx="30" ry="12" fill="#1B4332" />
      </>
    ),
    groundColor: "#2D5A44",
  },

  // ============================================
  // ARENA: Castle/towers, dramatic sky
  // ============================================
  arena: {
    skyGradient: "linear-gradient(180deg, #1A2A3A 0%, #3A4A5A 25%, #5A6A7A 50%, #8A7A6A 75%, #C4A888 100%)",
    starPattern: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
    starOpacity: 0.2,
    farMountains: (
      <>
        <polygon points="0,280 0,170 80,130 160,155 240,110 320,140 400,95 480,125 560,100 640,130 720,115 800,135 800,280" fill="#2A3A4A" opacity="0.7" />
      </>
    ),
    nearMountains: (
      <>
        <polygon points="0,220 0,145 100,115 200,135 300,105 400,130 500,100 600,120 700,110 800,125 800,220" fill="#1A2E22" />
      </>
    ),
    midGround: (
      <>
        {/* Castle towers */}
        <rect x="320" y="100" width="160" height="80" fill="#4A4A5A" />
        <polygon points="320,100 400,50 480,100" fill="#5A5A6A" />
        {/* Left tower */}
        <rect x="300" y="80" width="40" height="100" fill="#3A3A4A" />
        <polygon points="295,80 320,40 345,80" fill="#C45C3C" />
        {/* Right tower */}
        <rect x="460" y="90" width="40" height="90" fill="#3A3A4A" />
        <polygon points="455,90 480,50 505,90" fill="#C45C3C" />
        {/* Gate */}
        <rect x="380" y="130" width="40" height="50" fill="#2A2A3A" />
        {/* Windows */}
        <rect x="330" y="110" width="10" height="15" fill="#E8C49A" opacity="0.5" />
        <rect x="460" y="110" width="10" height="15" fill="#E8C49A" opacity="0.5" />

        {/* Pine trees flanking */}
        <polygon points="180,180 200,80 220,180" fill="#1B4332" />
        <polygon points="200,180 220,90 240,180" fill="#2D6A4F" />
        <polygon points="560,180 580,85 600,180" fill="#1B4332" />
        <polygon points="580,180 600,95 620,180" fill="#2D6A4F" />
        <polygon points="600,180 620,75 640,180" fill="#1B4332" />

        {/* Autumn tree right */}
        <polygon points="680,180 700,70 720,180" fill="#8B4513" />
        <polygon points="670,140 700,60 730,140" fill="#C45C3C" opacity="0.8" />
      </>
    ),
    foreground: (
      <>
        <rect x="0" y="125" width="800" height="15" fill="#1B4332" opacity="0.9" />
        {/* Path to castle */}
        <polygon points="370,140 430,140 420,125 380,125" fill="#6A5A4A" opacity="0.4" />
      </>
    ),
    groundColor: "#1B4332",
  },

  // ============================================
  // DECISIONS: Mountain path, crossroads
  // ============================================
  decisions: {
    skyGradient: "linear-gradient(180deg, #3A4A5A 0%, #6A7A6A 30%, #A0907A 60%, #D4C4A8 85%, #E8D8C0 100%)",
    starPattern: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
    starOpacity: 0.08,
    farMountains: (
      <>
        <polygon points="0,280 0,160 80,120 160,145 240,100 320,130 400,85 480,115 560,95 640,120 720,105 800,125 800,280" fill="#4A5A6A" opacity="0.5" />
      </>
    ),
    nearMountains: (
      <>
        <polygon points="0,220 0,140 120,110 240,130 360,95 480,120 600,105 720,115 800,110 800,220" fill="#2D5A44" />
      </>
    ),
    midGround: (
      <>
        {/* Scattered trees */}
        <polygon points="100,180 120,90 140,180" fill="#1B4332" />
        <polygon points="120,180 140,100 160,180" fill="#2D6A4F" />
        <polygon points="640,180 660,85 680,180" fill="#1B4332" />
        <polygon points="660,180 680,95 700,180" fill="#2D6A4F" />
        <polygon points="680,180 700,80 720,180" fill="#1B4332" />
        {/* Crossroads sign */}
        <rect x="395" y="140" width="4" height="40" fill="#6A5A4A" />
        <rect x="375" y="140" width="50" height="8" fill="#8B7355" />
      </>
    ),
    foreground: (
      <>
        <rect x="0" y="125" width="800" height="15" fill="#2D6A4F" opacity="0.9" />
      </>
    ),
    groundColor: "#2D5A44",
  },

  // ============================================
  // GENERATORS: Wizard tower, mystical
  // ============================================
  generators: {
    skyGradient: "linear-gradient(180deg, #1A1A2A 0%, #2A2A4A 25%, #4A3A6A 50%, #7A5A8A 75%, #A88A9A 100%)",
    starPattern: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
    starOpacity: 0.3,
    farMountains: (
      <>
        <polygon points="0,280 0,170 100,140 200,155 300,125 400,145 500,115 600,135 700,120 800,140 800,280" fill="#2A2A3A" opacity="0.6" />
      </>
    ),
    nearMountains: (
      <>
        <polygon points="0,220 0,155 120,125 240,145 360,110 480,135 600,120 720,130 800,125 800,220" fill="#1A1A2A" />
      </>
    ),
    midGround: (
      <>
        {/* Wizard tower */}
        <rect x="370" y="90" width="60" height="90" fill="#4A4A5A" />
        <polygon points="360,90 400,30 440,90" fill="#6A5A8A" />
        {/* Tower window - glowing */}
        <rect x="390" y="110" width="15" height="20" fill="#E8C49A" opacity="0.7" />
        {/* Stars/sparkles around tower */}
        <rect x="350" y="60" width="3" height="3" fill="#FFE4B5" opacity="0.8" />
        <rect x="440" y="50" width="3" height="3" fill="#FFE4B5" opacity="0.6" />
        <rect x="380" y="40" width="3" height="3" fill="#FFE4B5" opacity="0.7" />

        {/* Trees */}
        <polygon points="180,180 200,90 220,180" fill="#1B2A1A" />
        <polygon points="200,180 220,85 240,180" fill="#2D3A2A" />
        <polygon points="560,180 580,80 600,180" fill="#1B2A1A" />
        <polygon points="580,180 600,90 620,180" fill="#2D3A2A" />
      </>
    ),
    foreground: (
      <>
        <rect x="0" y="125" width="800" height="15" fill="#1A2A1A" opacity="0.9" />
      </>
    ),
    groundColor: "#1A2A1A",
  },

  // ============================================
  // LIFE: River valley, sunrise/sunset
  // ============================================
  life: {
    skyGradient: "linear-gradient(180deg, #2A3A5A 0%, #5A6A7A 25%, #AA8A6A 55%, #E8B888 80%, #F0D0A0 100%)",
    starPattern: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
    starOpacity: 0.1,
    farMountains: (
      <>
        <polygon points="0,280 0,165 80,125 160,150 240,105 320,135 400,90 480,120 560,100 640,125 720,110 800,130 800,280" fill="#5A6A7A" opacity="0.5" />
      </>
    ),
    nearMountains: (
      <>
        <polygon points="0,220 0,148 100,118 200,138 300,108 400,128 500,108 600,118 700,113 800,118 800,220" fill="#3A5A4A" />
      </>
    ),
    midGround: (
      <>
        {/* Valley with river */}
        <polygon points="0,180 0,140 60,120 120,135 180,115 240,130 300,125 360,130 420,125 480,130 540,125 600,130 660,125 720,135 780,130 800,135 800,180" fill="#2D6A4F" />
        {/* River */}
        <rect x="350" y="140" width="100" height="40" fill="#4A7A9A" opacity="0.4" />
        {/* Trees on banks */}
        <polygon points="100,180 120,100 140,180" fill="#1B4332" />
        <polygon points="660,180 680,95 700,180" fill="#1B4332" />
      </>
    ),
    foreground: (
      <>
        <rect x="0" y="125" width="800" height="15" fill="#2D6A4F" opacity="0.9" />
      </>
    ),
    groundColor: "#2D5A44",
  },

  // ============================================
  // PICKONE: Tournament grounds
  // ============================================
  pickone: {
    skyGradient: "linear-gradient(180deg, #3A4A3A 0%, #6A7A5A 30%, #A09A7A 60%, #D4C8A0 85%, #E8D8B8 100%)",
    starPattern: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
    starOpacity: 0.06,
    farMountains: (
      <>
        <polygon points="0,280 0,175 100,145 200,160 300,135 400,150 500,130 600,145 700,140 800,145 800,280" fill="#4A5A4A" opacity="0.5" />
      </>
    ),
    nearMountains: (
      <>
        <polygon points="0,220 0,158 120,130 240,148 360,125 480,140 600,132 720,138 800,135 800,220" fill="#2D4A3A" />
      </>
    ),
    midGround: (
      <>
        {/* Tournament flags/banners */}
        <rect x="200" y="130" width="3" height="50" fill="#6A5A4A" />
        <polygon points="203,130 225,140 203,150" fill="#C45C3C" />
        <rect x="597" y="130" width="3" height="50" fill="#6A5A4A" />
        <polygon points="597,130 575,140 597,150" fill="#4A90D9" />

        {/* Trees */}
        <polygon points="80,180 100,95 120,180" fill="#1B4332" />
        <polygon points="100,180 120,85 140,180" fill="#2D6A4F" />
        <polygon points="660,180 680,90 700,180" fill="#1B4332" />
        <polygon points="680,180 700,80 720,180" fill="#2D6A4F" />
      </>
    ),
    foreground: (
      <>
        <rect x="0" y="125" width="800" height="15" fill="#2D6A4F" opacity="0.9" />
      </>
    ),
    groundColor: "#2D5A44",
  },

  // ============================================
  // RATHER: Village market, cozy
  // ============================================
  rather: {
    skyGradient: "linear-gradient(180deg, #4A5A4A 0%, #7A8A6A 30%, #B0A88A 60%, #D8C8A8 85%, #E8D8C0 100%)",
    starPattern: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
    starOpacity: 0.04,
    farMountains: (
      <>
        <polygon points="0,280 0,178 100,150 200,165 300,140 400,155 500,138 600,148 700,145 800,148 800,280" fill="#5A6A5A" opacity="0.4" />
      </>
    ),
    nearMountains: (
      <>
        <polygon points="0,220 0,160 120,135 240,152 360,130 480,145 600,138 720,142 800,140 800,220" fill="#3A5A4A" />
      </>
    ),
    midGround: (
      <>
        {/* Small houses */}
        <rect x="300" y="140" width="60" height="40" fill="#6A5A4A" />
        <polygon points="295,140 330,115 365,140" fill="#8B5A3A" />
        <rect x="440" y="135" width="50" height="45" fill="#5A4A3A" />
        <polygon points="435,135 465,110 495,135" fill="#7A4A2A" />

        {/* Trees */}
        <polygon points="80,180 100,95 120,180" fill="#1B4332" />
        <polygon points="100,180 120,85 140,180" fill="#2D6A4F" />
        <polygon points="660,180 680,90 700,180" fill="#1B4332" />
        <polygon points="680,180 700,80 720,180" fill="#2D6A4F" />
      </>
    ),
    foreground: (
      <>
        <rect x="0" y="125" width="800" height="15" fill="#2D6A4F" opacity="0.9" />
      </>
    ),
    groundColor: "#2D5A44",
  },
};
