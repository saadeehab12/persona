"use client";

import { useState } from "react";

type Props = {
  quizSlug: string;
  outcomeName: string;
  outcomeIcon: string;
  quizTitle: string;
};

export default function ShareButtons({
  quizSlug,
  outcomeName,
  outcomeIcon,
  quizTitle,
}: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `I got "${outcomeName}" on ${quizTitle}! ${outcomeIcon}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Fallback for non-HTTPS
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  }

  function shareFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  }

  function shareNative() {
    if (navigator.share) {
      navigator.share({ title: shareText, url: shareUrl });
    }
  }

  return (
    <div className="text-center">
      <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] mb-3">
        Share your result
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={copyLink}
          className="share-btn bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border)] dark:border-[var(--color-border-dark)] px-4 py-2 rounded-lg text-sm font-medium"
        >
          {copied ? "Copied!" : "Copy Link"}
        </button>
        <button
          onClick={shareTwitter}
          className="share-btn bg-[#1DA1F2] text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Twitter
        </button>
        <button
          onClick={shareFacebook}
          className="share-btn bg-[#4267B2] text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Facebook
        </button>
      </div>
    </div>
  );
}
