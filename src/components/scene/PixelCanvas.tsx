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
// COLOR PALETTES
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
  cottageWall: string[];
  cottageRoof: string[];
  cottageWindow: string[];
  cottageDoor: string[];
  ground: string[];
  groundDetail: string[];
  particle: string;
  cloud: string[];
}

const palettes: Record<SceneTheme, Palette> = {
  sunny: {
    sky: ["#87CEEB", "#A8D8EA", "#C9E4F0", "#E8D5B8", "#F0C89A", "#F5D4A0"],
    skyDither: ["#7BC4E0", "#9AD0E4", "#B8DCE8", "#E0CCA8", "#ECC090"],
    mountainFar: ["#7A9AAA", "#8AAAB8", "#6A8A98"],
    mountainMid: ["#4A7A5A", "#3A6A4A", "#5A8A6A"],
    mountainNear: ["#2D5A3A", "#1B4A2A", "#3A6A4A"],
    treeTrunk: ["#5A3A2A", "#6A4A3A", "#4A2A1A"],
    treeLeafGreen: ["#2D6A3A", "#1B5A2A", "#3A7A4A", "#4A8A5A", "#2A5A30"],
    treeLeafAutumn: ["#C45C3C", "#D46A4A", "#B84A2A", "#E87A5A", "#A83A1A"],
    treeLeafDark: ["#1A3A2A", "#0A2A1A", "#1A4A2A"],
    cottageWall: ["#D4B896", "#C4A886", "#E4C8A6", "#B89876"],
    cottageRoof: ["#8B4513", "#9A5523", "#7A3503", "#AA6533"],
    cottageWindow: ["#FFE4B5", "#FFD89A", "#FFCC80"],
    cottageDoor: ["#5A3A2A", "#4A2A1A"],
    ground: ["#3A6A3A", "#2A5A2A", "#4A7A4A", "#1A4A1A"],
    groundDetail: ["#2A4A2A", "#3A5A3A", "#1A3A1A", "#4A6A4A"],
    particle: "#FFE4B5",
    cloud: ["#FFFFFF", "#F0F0F0", "#E8E8E8"],
  },
  moonlight: {
    sky: ["#0A1A2A", "#1A2A3A", "#2A3A4A", "#1A2A4A", "#0A1A3A", "#1A1A3A"],
    skyDither: ["#152535", "#253545", "#0A1525", "#151535"],
    mountainFar: ["#1A2A3A", "#2A3A4A", "#0A1A2A"],
    mountainMid: ["#1A3A2A", "#0A2A1A", "#1A4A2A"],
    mountainNear: ["#0A2A1A", "#0A1A0A", "#1A3A1A"],
    treeTrunk: ["#2A1A0A", "#3A2A1A", "#1A0A00"],
    treeLeafGreen: ["#0A3A1A", "#1A4A2A", "#0A2A1A", "#1A3A1A", "#0A4A1A"],
    treeLeafAutumn: ["#5A2A1A", "#6A3A2A", "#4A1A0A", "#7A4A3A"],
    treeLeafDark: ["#0A1A0A", "#0A0A00", "#0A2A0A"],
    cottageWall: ["#3A3A4A", "#2A2A3A", "#4A4A5A", "#1A1A2A"],
    cottageRoof: ["#3A2A1A", "#4A3A2A", "#2A1A0A", "#5A4A3A"],
    cottageWindow: ["#FFE4B5", "#FFD89A", "#FFCC80"],
    cottageDoor: ["#1A0A00", "#2A1A0A"],
    ground: ["#0A2A0A", "#1A3A1A", "#0A1A0A", "#1A2A0A"],
    groundDetail: ["#0A1A0A", "#0A2A0A", "#0A0A0A", "#1A2A1A"],
    particle: "#E8D8FF",
    cloud: ["#2A3A4A", "#1A2A3A", "#3A4A5A"],
  },
};

// ============================================================
// DITHERING ENGINE
// ============================================================

// 4x4 ordered dither matrix (Bayer)
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function ditherColor(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color1: string,
  color2: string,
  mix: number
) {
  const threshold = BAYER_4X4[y % 4][x % 4] / 16;
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const useColor2 = mix > threshold;
  const [r, g, b] = useColor2 ? [r2, g2, b2] : [r1, g1, b1];
  ctx.fillStyle = rgbToHex(r, g, b);
  ctx.fillRect(x, y, 1, 1);
}

function drawDitheredRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color1: string,
  color2: string,
  mix: number
) {
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      ditherColor(ctx, px, py, color1, color2, mix);
    }
  }
}

function drawGradientSky(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  colors: string[],
  ditherColors: string[]
) {
  const bandH = Math.ceil(h / colors.length);
  for (let i = 0; i < colors.length; i++) {
    const y = i * bandH;
    const color = colors[i];
    const nextColor = colors[Math.min(i + 1, colors.length - 1)];
    const ditherCol = ditherColors[i % ditherColors.length];

    // Main band
    for (let py = y; py < y + bandH && py < h; py++) {
      for (let px = 0; px < w; px++) {
        const progress = (py - y) / bandH;
        if (progress > 0.7) {
          // Dither transition to next color
          ditherColor(ctx, px, py, color, nextColor, (progress - 0.7) / 0.3);
        } else if (progress < 0.3 && i > 0) {
          // Dither transition from previous color
          const prevColor = colors[Math.max(0, i - 1)];
          ditherColor(ctx, px, py, prevColor, color, (0.3 - progress) / 0.3);
        } else {
          // Solid with subtle noise
          const [r, g, b] = hexToRgb(color);
          const noise = ((px * 7 + py * 13) % 3) - 1;
          ctx.fillStyle = rgbToHex(
            Math.max(0, Math.min(255, r + noise)),
            Math.max(0, Math.min(255, g + noise)),
            Math.max(0, Math.min(255, b + noise))
          );
          ctx.fillRect(px, py, 1, 1);
        }
      }
    }
  }
}

// ============================================================
// SCENE DRAWING FUNCTIONS
// ============================================================

function drawMountainRange(
  ctx: CanvasRenderingContext2D,
  w: number,
  baseY: number,
  colors: string[],
  seed: number
) {
  // Generate mountain profile
  const points: Array<{ x: number; y: number }> = [];
  const segments = 20;
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * w;
    const noise1 = Math.sin(i * 0.8 + seed) * 30;
    const noise2 = Math.sin(i * 1.6 + seed * 2) * 15;
    const noise3 = Math.sin(i * 0.3 + seed * 0.5) * 20;
    const y = baseY - 40 - noise1 - noise2 - noise3;
    points.push({ x, y });
  }

  // Draw filled mountain with dithering
  for (let py = baseY - 100; py <= baseY; py++) {
    for (let px = 0; px < w; px++) {
      // Find mountain height at this x
      let mountainY = baseY;
      for (let i = 0; i < points.length - 1; i++) {
        if (px >= points[i].x && px <= points[i + 1].x) {
          const t = (px - points[i].x) / (points[i + 1].x - points[i].x);
          mountainY = points[i].y + t * (points[i + 1].y - points[i].y);
          break;
        }
      }

      if (py >= mountainY) {
        // Inside mountain
        const depth = (py - mountainY) / (baseY - mountainY);
        const colorIdx = Math.min(Math.floor(depth * colors.length), colors.length - 1);
        const color = colors[colorIdx];

        // Add dithering at edges
        if (py < mountainY + 3) {
          const [r, g, b] = hexToRgb(color);
          const noise = ((px * 7 + py * 13) % 5) - 2;
          ctx.fillStyle = rgbToHex(
            Math.max(0, Math.min(255, r + noise * 3)),
            Math.max(0, Math.min(255, g + noise * 3)),
            Math.max(0, Math.min(255, b + noise * 3))
          );
        } else {
          ctx.fillStyle = color;
        }
        ctx.fillRect(px, py, 1, 1);
      }
    }
  }
}

function drawTree(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  height: number,
  leafColors: string[],
  trunkColors: string[],
  isAutumn: boolean = false
) {
  const trunkH = Math.floor(height * 0.35);
  const canopyH = Math.floor(height * 0.65);
  const trunkW = Math.max(3, Math.floor(height * 0.08));

  // Trunk with texture
  for (let y = cy; y < cy + trunkH; y++) {
    for (let x = cx - trunkW; x <= cx + trunkW; x++) {
      const colorIdx = ((x + y) % trunkColors.length + trunkColors.length) % trunkColors.length;
      ctx.fillStyle = trunkColors[colorIdx];
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Branch stubs
  if (height > 40) {
    const branchY = cy + Math.floor(trunkH * 0.3);
    for (let dx = -8; dx <= 8; dx += 16) {
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = trunkColors[i % trunkColors.length];
        ctx.fillRect(cx + dx + (dx > 0 ? i : -i), branchY - Math.floor(i * 0.5), 1, 1);
      }
    }
  }

  // Canopy with leaf clusters
  const layers = isAutumn ? 4 : 5;
  for (let layer = 0; layer < layers; layer++) {
    const layerY = cy - canopyH + Math.floor((layer / layers) * canopyH * 0.7);
    const layerW = Math.floor((canopyH * 0.8) * (1 - Math.abs(layer - layers / 2) / (layers / 2)));
    const colors = isAutumn
      ? leafColors.slice(layer % leafColors.length, layer % leafColors.length + 2)
      : leafColors;

    for (let y = layerY; y < layerY + canopyH / layers + 4; y++) {
      for (let x = cx - layerW; x <= cx + layerW; x++) {
        // Circular cluster shape with dithering
        const dx = (x - cx) / layerW;
        const dy = (y - layerY) / (canopyH / layers);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1.1) {
          // Dithered edge
          const edgeMix = Math.max(0, (dist - 0.7) / 0.4);
          const colorIdx = ((x * 3 + y * 7 + layer * 11) % colors.length + colors.length) % colors.length;
          const color = colors[colorIdx];

          if (edgeMix > 0) {
            const bgIdx = ((x + y * 3) % 3);
            const bgColor = bgIdx === 0 ? "transparent" : color;
            if (bgColor !== "transparent") {
              const [r, g, b] = hexToRgb(color);
              const noise = ((x * 7 + y * 13) % 4) - 2;
              ctx.fillStyle = rgbToHex(
                Math.max(0, Math.min(255, r + noise * 2)),
                Math.max(0, Math.min(255, g + noise * 2)),
                Math.max(0, Math.min(255, b + noise * 2))
              );
              ctx.fillRect(x, y, 1, 1);
            }
          } else {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }
  }

  // Highlight spots on canopy (lighting)
  if (height > 30) {
    for (let i = 0; i < 8; i++) {
      const hx = cx + ((i * 7 + 3) % (canopyH / 2)) - canopyH / 4;
      const hy = cy - canopyH + ((i * 11 + 5) % Math.floor(canopyH * 0.6));
      const lightColor = isAutumn ? "#FFE4B5" : "#8ACA6A";
      ctx.fillStyle = lightColor;
      ctx.globalAlpha = 0.4;
      ctx.fillRect(hx, hy, 2, 2);
      ctx.globalAlpha = 1;
    }
  }
}

function drawCottage(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  wallColors: string[],
  roofColors: string[],
  windowColors: string[],
  doorColors: string[],
  isNight: boolean
) {
  const wallW = 60;
  const wallH = 40;
  const roofH = 25;

  // Wall with brick texture
  for (let y = cy - wallH; y < cy; y++) {
    for (let x = cx - wallW / 2; x < cx + wallW / 2; x++) {
      const brickRow = Math.floor((y - (cy - wallH)) / 6);
      const offset = brickRow % 2 === 0 ? 0 : 4;
      const brickX = (x + offset) % 8;
      const isMortar = brickX === 0 || ((y - (cy - wallH)) % 6 === 0);

      if (isMortar) {
        ctx.fillStyle = wallColors[Math.min(1, wallColors.length - 1)];
      } else {
        const colorIdx = ((brickRow + Math.floor(x / 8)) % wallColors.length + wallColors.length) % wallColors.length;
        ctx.fillStyle = wallColors[colorIdx];
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Roof with tile texture
  for (let y = cy - wallH - roofH; y < cy - wallH + 2; y++) {
    const progress = (y - (cy - wallH - roofH)) / roofH;
    const roofWidth = wallW / 2 + progress * (wallW / 2 + 10);
    for (let x = cx - roofWidth; x <= cx + roofWidth; x++) {
      if (x >= cx - wallW / 2 - 5 && x <= cx + wallW / 2 + 5) {
        const tileRow = Math.floor((y - (cy - wallH - roofH)) / 4);
        const tileOffset = tileRow % 2 === 0 ? 0 : 3;
        const tileX = (x + tileOffset) % 6;
        const isGap = tileX === 0;

        const colorIdx = tileRow % roofColors.length;
        ctx.fillStyle = isGap ? "#1A1A1A" : roofColors[colorIdx];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  // Chimney
  const chimneyX = cx + wallW / 3;
  const chimneyW = 6;
  const chimneyH = 15;
  for (let y = cy - wallH - roofH - chimneyH + 5; y < cy - wallH - roofH + 5; y++) {
    for (let x = chimneyX; x < chimneyX + chimneyW; x++) {
      const colorIdx = (x + y) % 2 === 0 ? 0 : 1;
      ctx.fillStyle = wallColors[colorIdx];
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // Windows with glow
  const windowSize = 8;
  const windowPositions = [
    { x: cx - wallW / 3, y: cy - wallH + 10 },
    { x: cx + wallW / 6, y: cy - wallH + 10 },
  ];

  for (const pos of windowPositions) {
    // Window frame
    ctx.fillStyle = doorColors[0];
    ctx.fillRect(pos.x - 1, pos.y - 1, windowSize + 2, windowSize + 2);

    // Window glass
    for (let y = pos.y; y < pos.y + windowSize; y++) {
      for (let x = pos.x; x < pos.x + windowSize; x++) {
        const glassIdx = ((x + y) % windowColors.length + windowColors.length) % windowColors.length;
        ctx.fillStyle = windowColors[glassIdx];
        ctx.fillRect(x, y, 1, 1);
      }
    }

    // Cross bars
    ctx.fillStyle = doorColors[0];
    ctx.fillRect(pos.x + Math.floor(windowSize / 2), pos.y, 1, windowSize);
    ctx.fillRect(pos.x, pos.y + Math.floor(windowSize / 2), windowSize, 1);

    // Window glow effect
    if (isNight) {
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#FFE4B5";
      ctx.fillRect(pos.x - 4, pos.y - 4, windowSize + 8, windowSize + 8);
      ctx.globalAlpha = 0.15;
      ctx.fillRect(pos.x - 8, pos.y - 8, windowSize + 16, windowSize + 16);
      ctx.globalAlpha = 1;
    }
  }

  // Door
  const doorW = 10;
  const doorH = 16;
  const doorX = cx - doorW / 2;
  const doorY = cy - doorH;
  for (let y = doorY; y < cy; y++) {
    for (let x = doorX; x < doorX + doorW; x++) {
      const colorIdx = ((x + y) % doorColors.length + doorColors.length) % doorColors.length;
      ctx.fillStyle = doorColors[colorIdx];
      ctx.fillRect(x, y, 1, 1);
    }
  }
  // Door handle
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(doorX + doorW - 3, doorY + doorH / 2, 2, 2);
}

function drawClouds(
  ctx: CanvasRenderingContext2D,
  w: number,
  y: number,
  colors: string[],
  seed: number
) {
  const clouds = [
    { x: w * 0.15, size: 20 },
    { x: w * 0.4, size: 25 },
    { x: w * 0.7, size: 18 },
    { x: w * 0.85, size: 22 },
  ];

  for (const cloud of clouds) {
    const cx = cloud.x + Math.sin(seed + cloud.x) * 10;
    for (let dy = -cloud.size / 3; dy < cloud.size / 3; dy++) {
      const rowWidth = cloud.size * (1 - Math.abs(dy) / (cloud.size / 2));
      for (let dx = -rowWidth / 2; dx < rowWidth / 2; dx++) {
        const px = Math.floor(cx + dx);
        const py = y + Math.floor(dy);
        if (px >= 0 && px < w && py >= 0) {
          const colorIdx = ((Math.floor(dx) + Math.floor(dy)) % colors.length + colors.length) % colors.length;
          ctx.fillStyle = colors[colorIdx];
          ctx.globalAlpha = 0.7;
          ctx.fillRect(px, py, 1, 1);
          ctx.globalAlpha = 1;
        }
      }
    }
  }
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: string,
  count: number,
  seed: number
) {
  for (let i = 0; i < count; i++) {
    const x = ((i * 137 + seed * 31) % w);
    const y = ((i * 89 + seed * 17) % (h * 0.7));
    const size = ((i * 23) % 3) + 1;
    const alpha = 0.3 + ((i * 47) % 5) / 10;

    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.globalAlpha = 1;
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
    const x = ((i * 137 + seed * 31) % w);
    const y = ((i * 89 + seed * 17) % (h * 0.5));
    const twinkle = ((i * 47 + seed) % 10) > 3;
    if (twinkle) {
      ctx.fillStyle = "#FFFFFF";
      ctx.globalAlpha = 0.5 + ((i * 23) % 5) / 10;
      ctx.fillRect(x, y, 1, 1);
      ctx.globalAlpha = 1;
    }
  }
}

function drawMoon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
) {
  // Moon body
  ctx.fillStyle = "#E8E0D0";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  // Moon craters (dithered)
  ctx.fillStyle = "#D0C8B8";
  ctx.globalAlpha = 0.5;
  ctx.fillRect(x - 3, y - 2, 3, 3);
  ctx.fillRect(x + 2, y + 1, 2, 2);
  ctx.fillRect(x - 1, y + 3, 2, 2);
  ctx.globalAlpha = 1;

  // Moon glow
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "#E8E0D0";
  ctx.beginPath();
  ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.05;
  ctx.beginPath();
  ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
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

  // Clear
  ctx.clearRect(0, 0, w, h);

  // 1. SKY with dithered gradient
  drawGradientSky(ctx, w, h, p.sky, p.skyDither);

  // 2. CLOUDS
  drawClouds(ctx, w, h * 0.12, p.cloud, seed);

  // 3. MOON (night only)
  if (isNight) {
    drawMoon(ctx, w * 0.75, h * 0.15, 12);
  }

  // 4. STARS (night only)
  if (isNight) {
    drawStars(ctx, w, h, 60, seed);
  }

  // 5. FAR MOUNTAINS
  drawMountainRange(ctx, w, h * 0.55, p.mountainFar, seed);

  // 6. MID MOUNTAINS
  drawMountainRange(ctx, w, h * 0.62, p.mountainMid, seed + 10);

  // 7. NEAR MOUNTAINS
  drawMountainRange(ctx, w, h * 0.7, p.mountainNear, seed + 20);

  // 8. GROUND
  for (let y = Math.floor(h * 0.7); y < h; y++) {
    for (let x = 0; x < w; x++) {
      const depth = (y - h * 0.7) / (h * 0.3);
      const colorIdx = Math.min(Math.floor(depth * p.ground.length), p.ground.length - 1);
      const color = p.ground[colorIdx];

      // Dithered ground texture
      const detailIdx = ((x * 3 + y * 7) % p.groundDetail.length + p.groundDetail.length) % p.groundDetail.length;
      const useDetail = ((x + y) % 5 === 0);
      ctx.fillStyle = useDetail ? p.groundDetail[detailIdx] : color;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // 9. GROUND DETAIL (grass tufts, rocks)
  for (let i = 0; i < 40; i++) {
    const gx = ((i * 137 + seed * 31) % w);
    const gy = Math.floor(h * 0.72 + ((i * 89) % (h * 0.25)));
    const tuftColor = p.groundDetail[i % p.groundDetail.length];

    // Small grass tuft
    for (let dy = -3; dy <= 0; dy++) {
      ctx.fillStyle = tuftColor;
      ctx.fillRect(gx, gy + dy, 1, 1);
      if (dy < -1) {
        ctx.fillRect(gx - 1, gy + dy, 1, 1);
        ctx.fillRect(gx + 1, gy + dy, 1, 1);
      }
    }
  }

  // 10. COTTAGE
  drawCottage(
    ctx,
    Math.floor(w * 0.5),
    Math.floor(h * 0.68),
    p.cottageWall,
    p.cottageRoof,
    p.cottageWindow,
    p.cottageDoor,
    isNight
  );

  // 11. TREES — Left cluster
  drawTree(ctx, Math.floor(w * 0.08), Math.floor(h * 0.7), 70, p.treeLeafGreen, p.treeTrunk);
  drawTree(ctx, Math.floor(w * 0.14), Math.floor(h * 0.68), 80, p.treeLeafGreen, p.treeTrunk);
  drawTree(ctx, Math.floor(w * 0.05), Math.floor(h * 0.72), 55, p.treeLeafAutumn, p.treeTrunk, true);
  drawTree(ctx, Math.floor(w * 0.18), Math.floor(h * 0.71), 65, p.treeLeafDark, p.treeTrunk);

  // 12. TREES — Right cluster
  drawTree(ctx, Math.floor(w * 0.82), Math.floor(h * 0.69), 75, p.treeLeafGreen, p.treeTrunk);
  drawTree(ctx, Math.floor(w * 0.88), Math.floor(h * 0.7), 85, p.treeLeafGreen, p.treeTrunk);
  drawTree(ctx, Math.floor(w * 0.92), Math.floor(h * 0.72), 60, p.treeLeafAutumn, p.treeTrunk, true);
  drawTree(ctx, Math.floor(w * 0.78), Math.floor(h * 0.71), 50, p.treeLeafDark, p.treeTrunk);

  // 13. TREES — Behind cottage (smaller, background)
  drawTree(ctx, Math.floor(w * 0.3), Math.floor(h * 0.62), 40, p.treeLeafDark, p.treeTrunk);
  drawTree(ctx, Math.floor(w * 0.7), Math.floor(h * 0.63), 35, p.treeLeafDark, p.treeTrunk);

  // 14. ATMOSPHERIC PARTICLES
  drawParticles(ctx, w, h, p.particle, isNight ? 30 : 50, seed);

  // 15. FOREGROUND GRASS DETAIL
  for (let x = 0; x < w; x += 3) {
    const grassH = 2 + ((x * 7 + seed) % 4);
    const gy = Math.floor(h * 0.75);
    for (let dy = 0; dy < grassH; dy++) {
      const colorIdx = ((x + dy) % p.ground.length + p.ground.length) % p.ground.length;
      ctx.fillStyle = p.ground[colorIdx];
      ctx.fillRect(x, gy - dy, 1, 1);
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

    // Set canvas resolution to match display
    canvas.width = width;
    canvas.height = height;

    // Disable image smoothing for crisp pixels
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
