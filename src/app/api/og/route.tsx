import { ImageResponse } from "next/og";
import { getQuizBySlug } from "@/lib/registry";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const outcomeId = searchParams.get("outcome");

  if (!slug || !outcomeId) {
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
        Freebuff
      </div>,
      { width: 1200, height: 630 }
    );
  }

  const quiz = getQuizBySlug(slug);
  const outcome = quiz?.outcomes.find((o) => o.id === outcomeId);

  if (!quiz || !outcome) {
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
        Freebuff
      </div>,
      { width: 1200, height: 630 }
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: outcome.theme.gradient,
        color: "white",
        fontFamily: "sans-serif",
        padding: "60px",
      }}
    >
      <div style={{ fontSize: "120px", marginBottom: "20px" }}>
        {outcome.theme.icon}
      </div>
      <div
        style={{
          fontSize: "64px",
          fontWeight: "bold",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        {outcome.name}
      </div>
      <div
        style={{
          fontSize: "32px",
          opacity: 0.9,
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        {outcome.tagline}
      </div>
      <div
        style={{
          fontSize: "24px",
          opacity: 0.7,
        }}
      >
        {quiz.title} | Freebuff
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
