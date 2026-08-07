"use client";

import { useLenis } from "@/hooks/useLenis";
import { NavigationProvider } from "@/components/providers/NavigationProvider";
import {
  TransitionProvider,
  PageTransitionOverlay,
  InitialLoader,
  RouteProgress,
} from "@/components/transitions";

function LenisBridge({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}

/**
 * Client providers — Nav, Lenis, cinematic page transitions.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
