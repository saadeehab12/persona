"use client";

import { useState } from "react";

interface ShareButtonsProps {
  encoded: string;
}

export default function ShareButtons({ encoded }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/tournament/result/${encoded}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Tournament Result - Persona Arena",
        text: "Check out my tournament run!",
        url: shareUrl,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div
        className="p-6 rounded-xl border text-center"
        style={{
          borderColor: "var(--theme-border)",
          backgroundColor: "var(--theme-surface)",
        }}
      >
        <h3
          className="text-sm font-bold mb-3 uppercase tracking-wider"
          style={{ color: "var(--theme-muted)" }}
        >
          Share Your Result
        </h3>

        <div className="mb-4 rounded-lg overflow-hidden border" style={{ borderColor: "var(--theme-border)" }}>
          <img
            src={`/api/og/tournament?result=${encoded}`}
            alt="Tournament Result Card"
            className="w-full h-auto"
            style={{ backgroundColor: "var(--theme-surface-raised)" }}
          />
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleCopyLink}
            className="share-btn px-4 py-2 rounded-lg font-medium text-sm border transition-all"
            style={{
              borderColor: "var(--theme-border)",
              backgroundColor: copied ? "#4CAF5020" : "var(--theme-surface-raised)",
              color: copied ? "#4CAF50" : "var(--theme-text)",
            }}
          >
            {copied ? "✓ Copied!" : "📋 Copy Link"}
          </button>

          {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
            <button
              onClick={handleShare}
              className="share-btn px-4 py-2 rounded-lg font-medium text-sm text-white transition-all"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              📤 Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
