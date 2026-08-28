"use client";

import { useCallback, useEffect, useState } from "react";
import { Check, Copy, Mail, Share2 } from "lucide-react";
import { FacebookIcon, LinkedInIcon, XIcon } from "@/components/SocialIcons";

type CareerShareJobProps = {
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

export default function CareerShareJob({ title, shareUrl }: CareerShareJobProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [canNativeShare, setCanNativeShare] = useState(false);

  const shareMessage = `Check out this role at First Economy: ${title}`;
  const emailSubject = `${title} — Careers at First Economy`;
  const emailBody = `${shareMessage}\n\n${shareUrl}`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedMessage = encodeURIComponent(shareMessage);
  const encodedEmailSubject = encodeURIComponent(emailSubject);
  const encodedEmailBody = encodeURIComponent(emailBody);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

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

  const handleNativeShare = useCallback(async () => {
    if (!navigator.share) {
      await handleCopyLink();
      return;
    }

    try {
      await navigator.share({
        title: emailSubject,
        text: shareMessage,
        url: shareUrl,
      });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      await handleCopyLink();
    }
  }, [emailSubject, handleCopyLink, shareMessage, shareUrl]);

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
    {
      label: "Share via email",
      href: `mailto:?subject=${encodedEmailSubject}&body=${encodedEmailBody}`,
      Icon: Mail,
      isMail: true,
    },
  ] as const;

  return (
    <div role="group" aria-label="Share options">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => void handleCopyLink()}
          className="text-cta tap-target-sm inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-mist px-4 text-muted transition hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
        >
          {copyStatus === "copied" ? (
            <Check size={16} aria-hidden />
          ) : (
            <Copy size={16} aria-hidden />
          )}
          {copyStatus === "copied" ? "Copied" : copyStatus === "error" ? "Copy failed" : "Copy link"}
        </button>

        {canNativeShare ? (
          <button
            type="button"
            onClick={() => void handleNativeShare()}
            className="text-cta tap-target-sm inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-mist px-4 text-muted transition hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
          >
            <Share2 size={16} aria-hidden />
            Share
          </button>
        ) : null}

        {socialLinks.map((link) => {
          const Icon = link.Icon;
          return (
            <a
              key={link.label}
              href={link.href}
              target={"isMail" in link && link.isMail ? undefined : "_blank"}
              rel={"isMail" in link && link.isMail ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="tap-target-sm grid size-11 place-items-center rounded-full border border-line bg-mist text-muted transition hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
            >
              <Icon size={16} aria-hidden />
            </a>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {copyStatus === "copied"
          ? "Job link copied to clipboard."
          : copyStatus === "error"
            ? "Could not copy the job link."
            : ""}
      </p>
    </div>
  );
}
