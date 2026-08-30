import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { decodeTournamentResult } from "@/lib/tournament/encode";
import { tournamentConfig } from "@/lib/tournament/config";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const resultParam = searchParams.get("result");

  if (!resultParam) {
    return new ImageResponse(
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A19",
          color: "#F5F5F4",
          fontSize: "48px",
          fontFamily: "sans-serif",
        }}
      >
        Persona Arena
      </div>,
      { width: 1200, height: 630 }
    );
  }

  const result = decodeTournamentResult(resultParam);

  if (!result) {
    return new ImageResponse(
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A19",
          color: "#F5F5F4",
          fontSize: "48px",
          fontFamily: "sans-serif",
        }}
      >
        Persona Arena
      </div>,
      { width: 1200, height: 630 }
    );
  }

  const isChampion = result.finalResult === "champion";
  const title = isChampion ? "🏆 Tournament Champion!" : "Eliminated";
  const subtitle = isChampion
    ? "Conquered all rounds"
    : `Made it to round ${result.roundsWon + 1}, won ${result.roundsWon}`;

  const statBars = tournamentConfig.stats.map((stat) => {
    const value = result.stats[stat.id] ?? 0;
    const pct = Math.min(100, (value / stat.maxValue) * 100);
    return { ...stat, value, pct };
  });

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: isChampion
          ? "linear-gradient(135deg, #E85D3A 0%, #FFB400 100%)"
          : "linear-gradient(135deg, #1A1A19 0%, #2A2A29 100%)",
        color: "white",
        fontFamily: "sans-serif",
        padding: "60px",
      }}
    >
      <div style={{ fontSize: "100px", marginBottom: "16px" }}>
        {isChampion ? "🏆" : "⚔️"}
      </div>
      <div
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "28px",
          opacity: 0.9,
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        {subtitle}
      </div>

      {/* Stat bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "600px" }}>
        {statBars.map((stat) => (
          <div key={stat.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>{stat.icon}</span>
            <span style={{ fontSize: "18px", width: "50px", fontWeight: "bold" }}>
              {stat.shortName}
            </span>
            <div
              style={{
                flex: 1,
                height: "16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.2)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${stat.pct}%`,
                  height: "100%",
                  borderRadius: "8px",
                  backgroundColor: stat.color,
                }}
              />
            </div>
            <span style={{ fontSize: "18px", width: "40px", textAlign: "right", fontWeight: "bold" }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: "24px",
          opacity: 0.7,
          marginTop: "32px",
        }}
      >
        Persona Arena
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
