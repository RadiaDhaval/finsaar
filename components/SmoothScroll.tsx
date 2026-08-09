"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Force immediate scroll to top on route change to prevent sliding effect
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
