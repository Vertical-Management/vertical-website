"use client";

import { PageEnter } from "@/components/transitions/PageEnter";

/**
 * Remounts on navigation — drives content enter animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageEnter>{children}</PageEnter>;
}
