"use client";

import { useEffect, useRef, useCallback } from "react";

export type SceneTheme = "sunny" | "moonlight";

interface PixelCanvasProps {
  theme: SceneTheme;
  width?: number;
  height?: number;
  className?: string;
}

// ============================================================
// COLOR PALETTES - Rich atmospheric colors
// ============================================================

interface Palette {
  sky: string[];
  skyDither: string[];
  mountainFar: string[];
  mountainMid: string[];
  mountainNear: string[];
  treeTrunk: string[];
  treeLeafGreen: string[];
  treeLeafAutumn: string[];
  treeLeafDark: string[];
  towerWall: string[];
  towerRoof: string[];
  towerStone: string[];
  cottageWall: string[];
  cottageTimber: string[];
  cottageRoof: string[];
  cottageWindow: string[];
  cottageDoor: string[];
  ground: string[];
  groundDetail: string[];
  particle: string;
  cloud: string[];
  moonGlow?: string;
}

const palettes: Record<SceneTheme, Palette> = {
  sunny: {
    sky: ["#5A8CB8", "#7AA8C8", "#9AC8E0", "#C8DDE8", "#E8D5B8", "#F0C89A"],
    skyDither: ["#6A9CC0", "#8AB8D0", "#A8D0E0", "#D0C8B0", "#E8C090"],
    mountainFar: ["#7A9AAA", "#8AAAB8", "#6A8A98"],
    mountainMid: ["#4A7A5A", "#3A6A4A", "#5A8A6A"],
    mountainNear: ["#2D5A3A", "#1B4A2A", "#3A6A4A"],
    treeTrunk: ["#5A3A2A", "#6A4A3A", "#4A2A1A", "#3A2A1A"],
    treeLeafGreen: ["#2D7A4A", "#1B6A3A", "#3A8A5A", "#4A9A6A", "#2A6A40", "#1A5A30"],
    treeLeafAutumn: ["#C85C3C", "#D86A4A", "#B84A2A", "#E88A5A", "#A84A2A", "#F0A070"],
    treeLeafDark: ["#1A3A2A", "#0A2A1A", "#1A4A2A", "#0A3A1A"],
    towerWall: ["#8A8A90", "#7A7A80", "#9A9AA0", "#6A6A70", "#A0A0A8"],
    towerRoof: ["#4A2A2A", "#5A3A3A", "#3A1A1A", "#6A4A4A"],
    towerStone: ["#707078", "#808088", "#606068", "#909098"],
    cottageWall: ["#E8D8C0", "#D8C8B0", "#F0E0C8", "#C8B8A0"],
    cottageTimber: ["#5A3A2A", "#4A2A1A", "#6A4A3A"],
    cottageRoof: ["#6A4A3A", "#7A5A4A", "#5A3A2A", "#8A6A5A"],
    cottageWindow: ["#87CEEB", "#A8D8EA", "#90C8E0"],
    cottageDoor: ["#4A3020", "#3A2010"],
    ground: ["#4A8A4A", "#3A7A3A", "#5A9A5A", "#2A6A2A"],
    groundDetail: ["#2A5A2A", "#3A6A3A", "#1A4A1A", "#4A7A4A", "#1A3A1A"],
    particle: "#FFE8B8",
    cloud: ["#FFFFFF", "#F8F8F8", "#F0F0F0"],
  },
  moonlight: {
    sky: ["#0A1A2A", "#12253A", "#1A3050", "#1A2A4A", "#0A1A3A", "#0A1525"],
    skyDither: ["#0F2030", "#1A2A40", "#0A1525", "#151F35"],
    mountainFar: ["#1A2A3A", "#2A3A4A", "#0A1A2A"],
    mountainMid: ["#1A3A2A", "#0A2A1A", "#1A4A2A"],
    mountainNear: ["#0A2A1A", "#0A1A0A", "#1A3A1A"],
    treeTrunk: ["#2A1A0A", "#3A2A1A", "#1A0A00", "#2A2010"],
    treeLeafGreen: ["#0A3A1A", "#1A4A2A", "#0A2A1A", "#1A3A1A", "#0A4A1A", "#0A3A20"],
    treeLeafAutumn: ["#5A2A1A", "#6A3A2A", "#4A1A0A", "#7A4A3A", "#3A1A0A"],
    treeLeafDark: ["#0A1A0A", "#0A0A00", "#0A2A0A", "#051005"],
    towerWall: ["#3A3A45", "#2A2A35", "#4A4A55", "#252530", "#555560"],
    towerRoof: ["#3A2020", "#4A3030", "#2A1515", "#5A4040"],
    towerStone: ["#353540", "#404050", "#303038", "#454555"],
    cottageWall: ["#3A3A45", "#2A2A35", "#4A4A55", "#1A1A25"],
    cottageTimber: ["#2A1A0A", "#1A0A00", "#3A2A1A"],
    cottageRoof: ["#3A2A1A", "#4A3A2A", "#2A1A0A", "#5A4A3A"],
    cottageWindow: ["#FFE4B5", "#FFD89A", "#FFCC80", "#FFB870"],
    cottageDoor: ["#1A0A00", "#2A1A0A"],
    ground: ["#0A2A0A", "#1A3A1A", "#0A1A0A", "#1A2A0A"],
    groundDetail: ["#0A1A0A", "#0A2A0A", "#0A0A0A", "#1A2A1A", "#050F05"],
    particle: "#D8D0FF",
    cloud: ["#1A2A3A", "#152030", "#202A3A"],
    moonGlow: "#E8E0D0",
  },
};

// ============================================================
// DITHERING ENGINE
// ============================================================

const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

function hexToRgb(hex: string): [number, number, number] {
  if (!hex || typeof hex !== 'string') return [0, 0, 0];
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function setPixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
}

function ditherPixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color1: string,
  color2: string,
  mix: number
) {
  const threshold = BAYER_4X4[y & 3][x & 3] / 16;
  const use = mix > threshold;
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const [r, g, b] = use ? [r2, g2, b2] : [r1, g1, b1];
  setPixel(ctx, x, y, rgbToHex(r, g, b));
}

function noisePixel(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  spread: number = 2
) {
  const [r, g, b] = hexToRgb(color);
  const n = ((x * 7 + y * 13) % (spread * 2 + 1)) - spread;
  setPixel(
    ctx,
    x,
    y,
    rgbToHex(
      Math.max(0, Math.min(255, r + n)),
      Math.max(0, Math.min(255, g + n)),
      Math.max(0, Math.min(255, b + n))
    )
  );
}

// ============================================================
// SCENE DRAWING FUNCTIONS
// ============================================================

function drawDitheredSky(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  colors: string[],
  ditherColors: string[]
) {
  const bandH = Math.ceil(h / colors.length);
  for (let py = 0; py < h; py++) {
    const bandIdx = Math.min(Math.floor(py / bandH), colors.length - 1);
    const bandProgress = (py % bandH) / bandH;

    for (let px = 0; px < w; px++) {
      const color = colors[bandIdx];

      if (bandProgress > 0.65 && bandIdx < colors.length - 1) {
        const nextColor = colors[bandIdx + 1];
        ditherPixel(
          ctx,
          px,
          py,
          color,
          nextColor,
          (bandProgress - 0.65) / 0.35
        );
      } else if (bandProgress < 0.35 && bandIdx > 0) {
        const prevColor = colors[bandIdx - 1];
        ditherPixel(
          ctx,
          px,
          py,
          prevColor,
          color,
          (0.35 - bandProgress) / 0.35
        );
      } else {
        noisePixel(ctx, px, py, color, 1);
      }
    }
  }
}

function drawMountain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseY: number,
  colors: string[],
  seed: number,
  amplitude: number = 50
) {
  // Generate smooth mountain profile
  const points: number[] = [];
  const segments = Math.ceil(w / 4);
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * (w + 100) - 50;
    const n1 = Math.sin(i * 0.15 + seed) * amplitude;
    const n2 = Math.sin(i * 0.08 + seed * 1.7) * amplitude * 0.6;
    const n3 = Math.sin(i * 0.3 + seed * 0.4) * amplitude * 0.3;
    points.push(baseY - n1 - n2 - n3);
  }

  // Draw filled mountain with depth-based coloring
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const segIdx = Math.min(
        Math.floor((px / w) * segments),
        segments
      );
      const mtH = points[segIdx];

      if (py >= mtH && colors.length > 0) {
        const depth = Math.min(Math.max(0, (py - mtH) / (baseY - mtH + 20)), 1);
        const ci = Math.min(
          Math.floor(depth * colors.length),
          colors.length - 1
        );
        const color = colors[ci] || colors[0];

        if (!color) continue;

        // Dither at edges and in depth bands
        if (py < mtH + 4) {
          const [r, g, b] = hexToRgb(color);
          const n = ((px * 7 + py * 13) % 5) - 2;
          setPixel(
            ctx,
            px,
            py,
            rgbToHex(
              Math.max(0, Math.min(255, r + n * 2)),
              Math.max(0, Math.min(255, g + n * 2)),
              Math.max(0, Math.min(255, b + n * 2))
            )
          );
        } else {
          noisePixel(ctx, px, py, color, 1);
        }
      }
    }
  }
}

function drawDetailedTree(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  height: number,
  leafColors: string[],
  trunkColors: string[],
  isAutumn: boolean = false
) {
  const trunkH = Math.floor(height * 0.4);
  const canopyH = Math.floor(height * 0.75);
  const trunkW = Math.max(3, Math.floor(height * 0.07));

  // Trunk with bark texture
  for (let y = cy; y < cy + trunkH; y++) {
    for (let x = cx - trunkW; x <= cx + trunkW; x++) {
      const barkPattern = ((x + y * 2) % 3 === 0) ? 1 : 0;
      const ci = Math.min(
        (barkPattern + ((x * 3 + y) % trunkColors.length)) % trunkColors.length,
        trunkColors.length - 1
      );
      setPixel(ctx, x, y, trunkColors[ci]);
    }
  }

  // Main branches (visible through canopy gaps)
  if (height > 50) {
    const branchY = cy + Math.floor(trunkH * 0.2);
    // Left branch
    for (let i = 0; i < 12; i++) {
      const bx = cx - 3 - i;
      const by = branchY - Math.floor(i * 0.8);
      setPixel(ctx, bx, by, trunkColors[0]);
      setPixel(ctx, bx, by + 1, trunkColors[1] || trunkColors[0]);
    }
    // Right branch
    for (let i = 0; i < 10; i++) {
      const bx = cx + 3 + i;
      const by = branchY - Math.floor(i * 0.6);
      setPixel(ctx, bx, by, trunkColors[0]);
      setPixel(ctx, bx, by + 1, trunkColors[1] || trunkColors[0]);
    }
  }

  // Rich canopy with multiple leaf clusters
  const layers = isAutumn ? 5 : 6;
  for (let layer = 0; layer < layers; layer++) {
    const layerY = cy - canopyH + Math.floor((layer / layers) * canopyH * 0.6);
    const layerWidth =
      Math.floor(canopyH * 0.45) *
      Math.sin(((layer + 0.5) / layers) * Math.PI);
    const clusterH = Math.floor(canopyH / layers) + 6;
    const colors = leafColors;

    for (let y = layerY; y < layerY + clusterH; y++) {
      for (let x = cx - layerWidth; x <= cx + layerWidth; x++) {
        // Rounded cluster shape
        const dx = (x - cx) / Math.max(layerWidth, 1);
        const dy = (y - layerY) / (clusterH * 0.5) - 0.5;
        const dist = dx * dx + dy * dy;

        if (dist < 1.0) {
          const edgeFade = Math.max(0, (dist - 0.6) / 0.4);
          if (edgeFade > 0 && ((x + y) & 3) < Math.floor(edgeFade * 4))
            continue; // Dithered edge

          const ci = ((x * 3 + y * 7 + layer * 11) % colors.length + colors.length) % colors.length;
          const color = colors[ci];

          if (dist > 0.75) {
            // Subtle highlight at top of clusters
            const [r, g, b] = hexToRgb(color);
            const highlight = isAutumn ? 15 : 10;
            setPixel(
              ctx,
              x,
              y,
              rgbToHex(
                Math.min(255, r + highlight),
                Math.min(255, g + highlight),
                Math.min(255, b + Math.floor(highlight * 0.5))
              )
            );
          } else {
            noisePixel(ctx, x, y, color, 1);
          }
        }
      }
    }
  }
}

function drawCastleTower(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  wallColors: string[],
  roofColors: string[],
  stoneColors: string[],
  isNight: boolean
) {
  const towerW = 28;
  const towerH = 120;
  const baseY = cy;

  // Tower body with stone brick texture
  for (let y = baseY - towerH; y < baseY; y++) {
    for (let x = cx - towerW / 2; x < cx + towerW / 2; x++) {
      const brickRow = Math.floor((y - (baseY - towerH)) / 5);
      const offset = brickRow % 2 === 0 ? 0 : 3;
      const brickX = (x + offset) % 7;
      const isMortar = brickX === 0 || ((y - (baseY - towerH)) % 5 === 0);

      if (isMortar) {
        setPixel(ctx, x, y, wallColors[1] || wallColors[0]);
      } else {
        const ci = ((brickRow + Math.floor(x / 7)) % stoneColors.length + stoneColors.length) % stoneColors.length;
        setPixel(ctx, x, y, stoneColors[ci]);
      }
    }
  }

  // Tower crenellations (battlements)
  const crenW = 5;
  const crenH = 8;
  for (let i = 0; i < 4; i++) {
    const bx = cx - towerW / 2 + i * (crenW + 2);
    for (let y = baseY - towerH - crenH; y < baseY - towerH; y++) {
      for (let x = bx; x < bx + crenW; x++) {
        setPixel(ctx, x, y, stoneColors[i % stoneColors.length]);
      }
    }
  }

  // Pointed roof / conical top
  const roofBaseY = baseY - towerH - crenH;
  const roofH = 35;
  const roofW = towerW / 2 + 4;
  for (let y = 0; y < roofH; y++) {
    const progress = y / roofH;
    const rowW = Math.floor(roofW * (1 - progress));
    for (let x = cx - rowW; x <= cx + rowW; x++) {
      const ci = y % roofColors.length;
      const tileShade = ((x + y) % 3 === 0) ? 1 : 0;
      setPixel(
        ctx,
        x,
        roofBaseY - y,
        roofColors[(ci + tileShade) % roofColors.length]
      );
    }
  }

  // Roof finial/flag
  setPixel(ctx, cx, roofBaseY - roofH - 1, "#FFD700");
  setPixel(ctx, cx, roofBaseY - roofH - 2, "#FFD700");
  setPixel(ctx, cx, roofBaseY - roofH - 3, "#FF6B6B");

  // Narrow windows on tower
  const windowPositions = [
    { y: baseY - towerH + 15 },
    { y: baseY - towerH + 40 },
    { y: baseY - towerH + 65 },
  ];
  for (const wp of windowPositions) {
    // Narrow slit window
    for (let dy = 0; dy < 8; dy++) {
      setPixel(ctx, cx, wp.y + dy, isNight ? "#FFE4B5" : "#4A6A8A");
      setPixel(ctx, cx - 1, wp.y + dy, isNight ? "#FFD090" : "#3A5A7A");
      setPixel(ctx, cx + 1, wp.y + dy, isNight ? "#FFD090" : "#3A5A7A");
    }
    // Window arch
    setPixel(ctx, cx - 1, wp.y - 1, wallColors[0]);
    setPixel(ctx, cx + 1, wp.y - 1, wallColors[0]);
    setPixel(ctx, cx, wp.y - 1, isNight ? "#FFE4B5" : "#5A7A9A");
  }

  // Glow effect for night windows
  if (isNight) {
    for (const wp of windowPositions) {
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#FFE4B5";
      ctx.fillRect(cx - 8, wp.y - 4, 16, 16);
      ctx.globalAlpha = 0.08;
      ctx.fillRect(cx - 12, wp.y - 8, 24, 24);
      ctx.globalAlpha = 1;
    }
  }
}

function drawHalfTimberCottage(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  wallColors: string[],
  timberColors: string[],
  roofColors: string[],
  windowColors: string[],
  doorColors: string[],
  isNight: boolean
) {
  const wallW = 50;
  const wallH = 35;
  const roofH = 22;

  // White plaster wall
  for (let y = cy - wallH; y < cy; y++) {
    for (let x = cx - wallW / 2; x < cx + wallW / 2; x++) {
      const ci = ((x + y * 2) % wallColors.length + wallColors.length) % wallColors.length;
      noisePixel(ctx, x, y, wallColors[ci], 1);
    }
  }

  // Half-timbering pattern (exposed wooden beams)
  const beams = [
    // Vertical beams
    { x1: cx - wallW / 2 + 5, y1: cy - wallH, x2: cx - wallW / 2 + 5, y2: cy },
    { x1: cx + wallW / 2 - 5, y1: cy - wallH, x2: cx + wallW / 2 - 5, y2: cy },
    { x1: cx, y1: cy - wallH, x2: cx, y2: cy },
    // Horizontal beam
    { x1: cx - wallW / 2, y1: cy - wallH + Math.floor(wallH * 0.55), x2: cx + wallW / 2, y2: cy - wallH + Math.floor(wallH * 0.55) },
    // Diagonal beams (left half)
    { x1: cx - wallW / 2 + 5, y1: cy - wallH, x2: cx, y2: cy - wallH + Math.floor(wallH * 0.55) },
    { x1: cx, y1: cy - wallH, x2: cx - wallW / 2 + 5, y2: cy - wallH + Math.floor(wallH * 0.55) },
    // Diagonal beams (right half)
    { x1: cx, y1: cy - wallH, x2: cx + wallW / 2 - 5, y2: cy - wallH + Math.floor(wallH * 0.55) },
    { x1: cx + wallW / 2 - 5, y1: cy - wallH, x2: cx, y2: cy - wallH + Math.floor(wallH * 0.55) },
  ];

  for (const beam of beams) {
    const dx = beam.x2 - beam.x1;
    const dy = beam.y2 - beam.y1;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const bx = Math.floor(beam.x1 + dx * t);
      const by = Math.floor(beam.y1 + dy * t);
      setPixel(ctx, bx, by, timberColors[i % timberColors.length]);
      setPixel(ctx, bx + 1, by, timberColors[(i + 1) % timberColors.length]);
    }
  }

  // Roof with tile texture
  for (let y = cy - wallH - roofH; y < cy - wallH + 2; y++) {
    const progress = (y - (cy - wallH - roofH)) / roofH;
    const rowW = wallW / 2 + progress * 8;
    for (let x = cx - rowW; x <= cx + rowW; x++) {
      const tileRow = Math.floor((y - (cy - wallH - roofH)) / 3);
      const tileOff = tileRow % 2 === 0 ? 0 : 2;
      const tileX = (x + tileOff) % 5;
      const isGap = tileX === 0;

      const ci = tileRow % roofColors.length;
      setPixel(ctx, x, y, isGap ? "#1A1A1A" : roofColors[ci]);
    }
  }

  // Chimney
  const chimX = cx + wallW / 3;
  const chimW = 5;
  for (let y = cy - wallH - roofH - 12; y < cy - wallH - 5; y++) {
    for (let x = chimX; x < chimX + chimW; x++) {
      setPixel(ctx, x, y, timberColors[(x + y) % timberColors.length]);
    }
  }

  // Windows with warm glow
  const winSize = 7;
  const winPositions = [
    { x: cx - wallW / 3, y: cy - wallH + 8 },
    { x: cx + wallW / 4, y: cy - wallH + 8 },
  ];

  for (const wp of winPositions) {
    // Window frame
    setPixel(ctx, wp.x - 1, wp.y - 1, timberColors[0]);
    setPixel(ctx, wp.x + winSize, wp.y - 1, timberColors[0]);
    setPixel(ctx, wp.x - 1, wp.y + winSize, timberColors[0]);
    setPixel(ctx, wp.x + winSize, wp.y + winSize, timberColors[0]);

    // Window glass with curtain pattern
    for (let y = wp.y; y < wp.y + winSize; y++) {
      for (let x = wp.x; x < wp.x + winSize; x++) {
        const ci = ((x + y) % windowColors.length + windowColors.length) % windowColors.length;
        setPixel(ctx, x, y, windowColors[ci]);
      }
    }

    // Cross bars
    setPixel(ctx, wp.x + Math.floor(winSize / 2), wp.y, timberColors[0]);
    setPixel(ctx, wp.x + Math.floor(winSize / 2), wp.y + winSize, timberColors[0]);
    setPixel(ctx, wp.x, wp.y + Math.floor(winSize / 2), timberColors[0]);
    setPixel(ctx, wp.x + winSize, wp.y + Math.floor(winSize / 2), timberColors[0]);

    // Window glow
    if (isNight) {
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = "#FFE4B5";
      ctx.fillRect(wp.x - 5, wp.y - 5, winSize + 10, winSize + 10);
      ctx.globalAlpha = 0.12;
      ctx.fillRect(wp.x - 10, wp.y - 10, winSize + 20, winSize + 20);
      ctx.globalAlpha = 1;
    }
  }

  // Door
  const doorW = 9;
  const doorH = 14;
  const doorX = cx - doorW / 2;
  const doorY = cy - doorH;
  for (let y = doorY; y < cy; y++) {
    for (let x = doorX; x < doorX + doorW; x++) {
      // Wood grain
      const grain = ((x + y * 3) % 4 === 0) ? 1 : 0;
      const ci = grain % doorColors.length;
      setPixel(ctx, x, y, doorColors[ci]);
    }
  }
  // Door frame
  for (let y = doorY - 1; y < cy; y++) {
    setPixel(ctx, doorX - 1, y, timberColors[0]);
    setPixel(ctx, doorX + doorW, y, timberColors[0]);
  }
  // Door handle
  setPixel(ctx, doorX + doorW - 3, doorY + Math.floor(doorH / 2), "#FFD700");
}

function drawClouds(
  ctx: CanvasRenderingContext2D,
  w: number,
  y: number,
  colors: string[],
  seed: number,
  isNight: boolean
) {
  const clouds = [
    { x: w * 0.12, w: 50, h: 12 },
    { x: w * 0.35, w: 60, h: 14 },
    { x: w * 0.55, w: 40, h: 10 },
    { x: w * 0.78, w: 55, h: 13 },
    { x: w * 0.92, w: 35, h: 9 },
  ];

  for (const cloud of clouds) {
    const offsetX = Math.sin(seed * 0.01 + cloud.x * 0.01) * 5;
    const cx = cloud.x + offsetX;
    const alpha = isNight ? 0.3 : 0.6;

    // Cloud body with rounded shape
    for (let dy = -cloud.h / 2; dy < cloud.h / 2; dy++) {
      const rowProgress = Math.abs(dy) / (cloud.h / 2);
      const rowW = cloud.w * (1 - rowProgress * 0.3);
      for (let dx = -rowW / 2; dx < rowW / 2; dx++) {
        const px = Math.floor(cx + dx);
        const py = y + Math.floor(dy);
        if (px >= 0 && px < w && py >= 0) {
          const ci = ((Math.floor(dx) + Math.floor(dy)) % colors.length + colors.length) % colors.length;
          ctx.globalAlpha = alpha;
          setPixel(ctx, px, py, colors[ci]);
          ctx.globalAlpha = 1;
        }
      }
    }
  }
}

function drawMoon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) {
  // Outer glow rings
  ctx.globalAlpha = 0.03;
  ctx.fillStyle = "#E8E0D0";
  ctx.beginPath();
  ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.06;
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Moon body
  for (let py = -radius; py <= radius; py++) {
    for (let px = -radius; px <= radius; px++) {
      const dist = Math.sqrt(px * px + py * py);
      if (dist <= radius) {
        const edgeFade = Math.max(0, (dist - radius + 2) / 2);
        if (edgeFade > 0 && ((px + py) & 1) === 0) continue;
        setPixel(ctx, x + px, y + py, "#E8E0D0");
      }
    }
  }

  // Moon craters
  const craters = [
    { dx: -3, dy: -2, r: 3 },
    { dx: 2, dy: 1, r: 2 },
    { dx: -1, dy: 3, r: 2 },
    { dx: 3, dy: -3, r: 1 },
  ];
  for (const crater of craters) {
    for (let py = -crater.r; py <= crater.r; py++) {
      for (let px = -crater.r; px <= crater.r; px++) {
        if (px * px + py * py <= crater.r * crater.r) {
          setPixel(ctx, x + crater.dx + px, y + crater.dy + py, "#D0C8B8");
        }
      }
    }
  }
}

function drawStars(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  count: number,
  seed: number
) {
  for (let i = 0; i < count; i++) {
    const x = (i * 137 + seed * 31) % w;
    const y = (i * 89 + seed * 17) % (h * 0.55);
    const brightness = 0.3 + ((i * 47) % 7) / 10;
    const size = ((i * 23) % 3) + 1;

    ctx.globalAlpha = brightness;
    ctx.fillStyle = size > 1 ? "#FFFFFF" : "#D8D8FF";
    ctx.fillRect(x, y, 1, 1);
    if (size > 1) {
      ctx.globalAlpha = brightness * 0.3;
      ctx.fillRect(x - 1, y, 1, 1);
      ctx.fillRect(x + 1, y, 1, 1);
      ctx.fillRect(x, y - 1, 1, 1);
      ctx.fillRect(x, y + 1, 1, 1);
    }
    ctx.globalAlpha = 1;
  }
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  count: number,
  seed: number,
  isNight: boolean
) {
  for (let i = 0; i < count; i++) {
    const x = (i * 137 + seed * 31) % w;
    const y = (i * 89 + seed * 17) % (h * 0.7);
    const alpha = 0.2 + ((i * 47) % 6) / 10;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    if (!isNight && ((i * 23) % 5 === 0)) {
      ctx.globalAlpha = alpha * 0.3;
      ctx.fillRect(x - 1, y, 1, 1);
      ctx.fillRect(x + 1, y, 1, 1);
    }
    ctx.globalAlpha = 1;
  }
}

function drawGround(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  startY: number,
  colors: string[],
  detailColors: string[],
  seed: number
) {
  for (let y = startY; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const depth = (y - startY) / (h - startY);
      const ci = Math.min(Math.floor(depth * colors.length), colors.length - 1);
      noisePixel(ctx, x, y, colors[ci], 1);

      // Grass tufts
      if (y < startY + 8 && ((x * 7 + seed) % 5 === 0)) {
        const grassH = 2 + ((x * 3 + seed) % 3);
        for (let dy = 0; dy < grassH; dy++) {
          const gi = ((x + dy) % detailColors.length + detailColors.length) % detailColors.length;
          setPixel(ctx, x, y - dy, detailColors[gi]);
        }
      }
    }
  }
}

// ============================================================
// MAIN SCENE RENDERER
// ============================================================

function renderScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  theme: SceneTheme
) {
  const p = palettes[theme];
  const isNight = theme === "moonlight";
  const seed = isNight ? 42 : 7;

  ctx.clearRect(0, 0, w, h);

  // 1. SKY
  drawDitheredSky(ctx, w, h, p.sky, p.skyDither);

  // 2. CLOUDS
  drawClouds(ctx, w, h * 0.1, p.cloud, seed, isNight);

  // 3. MOON (night only)
  if (isNight) {
    drawMoon(ctx, Math.floor(w * 0.78), Math.floor(h * 0.13), 14);
  }

  // 4. STARS (night only)
  if (isNight) {
    drawStars(ctx, w, h, 80, seed);
  }

  // 5. FAR MOUNTAINS (faint, atmospheric)
  drawMountain(ctx, w, h, h * 0.52, p.mountainFar, seed, 45);

  // 6. MID MOUNTAINS
  drawMountain(ctx, w, h, h * 0.6, p.mountainMid, seed + 10, 40);

  // 7. NEAR MOUNTAINS
  drawMountain(ctx, w, h, h * 0.68, p.mountainNear, seed + 20, 35);

  // 8. GROUND
  drawGround(ctx, w, h, Math.floor(h * 0.72), p.ground, p.groundDetail, seed);

  // 9. CASTLE TOWER (center-left focal point)
  drawCastleTower(
    ctx,
    Math.floor(w * 0.42),
    Math.floor(h * 0.72),
    p.towerWall,
    p.towerRoof,
    p.towerStone,
    isNight
  );

  // 10. HALF-TIMBER COTTAGE (right of tower)
  drawHalfTimberCottage(
    ctx,
    Math.floor(w * 0.58),
    Math.floor(h * 0.72),
    p.cottageWall,
    p.cottageTimber,
    p.cottageRoof,
    p.cottageWindow,
    p.cottageDoor,
    isNight
  );

  // 11. TREES — Left cluster (foreground)
  drawDetailedTree(ctx, Math.floor(w * 0.06), Math.floor(h * 0.71), 80, p.treeLeafGreen, p.treeTrunk);
  drawDetailedTree(ctx, Math.floor(w * 0.13), Math.floor(h * 0.69), 95, p.treeLeafGreen, p.treeTrunk);
  drawDetailedTree(ctx, Math.floor(w * 0.03), Math.floor(h * 0.73), 65, p.treeLeafAutumn, p.treeTrunk, true);
  drawDetailedTree(ctx, Math.floor(w * 0.2), Math.floor(h * 0.72), 75, p.treeLeafDark, p.treeTrunk);

  // 12. TREES — Right cluster (foreground)
  drawDetailedTree(ctx, Math.floor(w * 0.8), Math.floor(h * 0.7), 85, p.treeLeafGreen, p.treeTrunk);
  drawDetailedTree(ctx, Math.floor(w * 0.87), Math.floor(h * 0.71), 100, p.treeLeafGreen, p.treeTrunk);
  drawDetailedTree(ctx, Math.floor(w * 0.93), Math.floor(h * 0.73), 70, p.treeLeafAutumn, p.treeTrunk, true);
  drawDetailedTree(ctx, Math.floor(w * 0.75), Math.floor(h * 0.72), 60, p.treeLeafDark, p.treeTrunk);

  // 13. BACKGROUND TREES (smaller, behind structures)
  drawDetailedTree(ctx, Math.floor(w * 0.28), Math.floor(h * 0.63), 45, p.treeLeafDark, p.treeTrunk);
  drawDetailedTree(ctx, Math.floor(w * 0.72), Math.floor(h * 0.64), 40, p.treeLeafDark, p.treeTrunk);

  // 14. ATMOSPHERIC PARTICLES
  drawParticles(ctx, w, h, p.particle, isNight ? 40 : 60, seed, isNight);

  // 15. FOREGROUND GRASS EDGE
  for (let x = 0; x < w; x += 2) {
    const gh = 3 + ((x * 5 + seed) % 4);
    for (let dy = 0; dy < gh; dy++) {
      const gi = ((x + dy) % p.ground.length + p.ground.length) % p.ground.length;
      setPixel(ctx, x, Math.floor(h * 0.72) - dy, p.ground[gi]);
    }
  }
}

// ============================================================
// REACT COMPONENT
// ============================================================

export default function PixelCanvas({
  theme,
  width = 800,
  height = 480,
  className = "",
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;
    ctx.imageSmoothingEnabled = false;

    renderScene(ctx, width, height, theme);
  }, [theme, width, height]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: `${height}px`,
        imageRendering: "pixelated",
        display: "block",
      }}
    />
  );
}
