"use client";

import type { ReactNode } from "react";
import { useLenis } from "@/hooks/useLenis";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { NavigationProvider } from "@/components/providers/NavigationProvider";
import {
  TransitionProvider,
  PageTransitionOverlay,
  InitialLoader,
  RouteProgress,
} from "@/components/transitions";

function LenisBridge({ children }: { children: ReactNode }) {
  useLenis();
  return <>{children}</>;
}

/**
 * Client providers — Language, Nav, Lenis, cinematic page transitions.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <LenisBridge>
          <TransitionProvider>
            <InitialLoader />
            <PageTransitionOverlay />
            <RouteProgress />
            {children}
          </TransitionProvider>
        </LenisBridge>
      </NavigationProvider>
    </LanguageProvider>
  );
}
