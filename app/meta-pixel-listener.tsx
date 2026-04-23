"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type MetaPixelListenerProps = {
  enabled: boolean;
};

export default function MetaPixelListener({ enabled }: MetaPixelListenerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialRender = useRef(true);
  const query = searchParams?.toString() ?? "";

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (typeof window === "undefined" || typeof window.fbq !== "function") {
      return;
    }

    // Initial PageView is already sent by Meta base code in layout.
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    window.fbq("track", "PageView");
  }, [enabled, pathname, query]);

  return null;
}
