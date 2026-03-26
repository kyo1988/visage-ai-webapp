"use client";

import Link from "next/link";
import { trackCtaClick } from "@/components/LPTracker";

type Variant = "primary" | "outline" | "outline-light";

type Props = {
  href: string;
  ctaId: string;
  pageId: string;
  label: string;
  variant?: Variant;
};

const styles: Record<Variant, React.CSSProperties> = {
  primary: {
    display: "inline-block",
    padding: "14px 32px",
    borderRadius: "6px",
    background: "#4f46e5",
    color: "#fff",
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "15px",
  },
  outline: {
    display: "inline-block",
    padding: "14px 32px",
    borderRadius: "6px",
    border: "1px solid #a0c4ff",
    color: "#a0c4ff",
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "15px",
    background: "transparent",
  },
  "outline-light": {
    display: "inline-block",
    padding: "14px 32px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "#f0f0f0",
    fontWeight: 600,
    textDecoration: "none",
    fontSize: "15px",
    background: "transparent",
  },
};

export default function TrackedCTA({
  href,
  ctaId,
  pageId,
  label,
  variant = "primary",
}: Props) {
  return (
    <Link
      href={href}
      style={styles[variant]}
      onClick={() => trackCtaClick(ctaId, href, pageId)}
    >
      {label}
    </Link>
  );
}
