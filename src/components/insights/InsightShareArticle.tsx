"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/SocialIcons";

type InsightShareArticleProps = {
  title: string;
  shareUrl: string;
};

type CopyStatus = "idle" | "copied" | "error";

async function copyTextToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

export default function InsightShareArticle({ title, shareUrl }: InsightShareArticleProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const shareMessage = title;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMessage = encodeURIComponent(shareMessage);

  useEffect(() => {
    if (copyStatus === "idle") return;
    const timer = window.setTimeout(() => setCopyStatus("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  const handleCopyLink = useCallback(async () => {
    try {
      await copyTextToClipboard(shareUrl);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }, [shareUrl]);

  const socialLinks = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedInIcon,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
      Icon: XIcon,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
    },
  ] as const;

  return (
    <div role="group" aria-label="Share this article" className="flex shrink-0 flex-wrap items-center gap-2">
      {socialLinks.map((link) => {
        const Icon = link.Icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="tap-target-sm grid size-9 place-items-center rounded-full border border-line bg-white text-muted transition hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            <Icon size={15} aria-hidden />
          </a>
        );
      })}
      <button
        type="button"
        onClick={() => void handleCopyLink()}
        aria-label={
          copyStatus === "copied"
            ? "Link copied"
            : copyStatus === "error"
              ? "Copy failed, try again"
              : "Copy link"
        }
        className="tap-target-sm grid size-9 place-items-center rounded-full border border-line bg-white text-muted transition hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
      >
        {copyStatus === "copied" ? <Check size={15} aria-hidden /> : <Link2 size={15} aria-hidden />}
      </button>
      <p className="sr-only" role="status" aria-live="polite">
        {copyStatus === "copied"
          ? "Article link copied to clipboard."
          : copyStatus === "error"
            ? "Could not copy the article link."
            : ""}
      </p>
    </div>
  );
}
