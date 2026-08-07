import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

/**
 * Persistent chrome: Header + main slot + Footer + scroll progress.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <ScrollProgress />
      <div className="flex min-h-dvh flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
