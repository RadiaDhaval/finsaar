"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBackForward = useRef(false);
  const scrollPositions = useRef<Record<string, number>>({});

  useEffect(() => {
    // Listen for browser Back & Forward button events
    const handlePopState = () => {
      isBackForward.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    // Continuously save current page scroll position
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        scrollPositions.current[pathname] = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (isBackForward.current) {
      // 1. Back / Forward Navigation: Restore exact previous scroll position
      const savedPosition = scrollPositions.current[pathname] || 0;
      window.scrollTo({ top: savedPosition, left: 0, behavior: "instant" });
      isBackForward.current = false;
    } else {
      // 2. New Link Click: Open fresh page from the Top (Hero section)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return <>{children}</>;
}
