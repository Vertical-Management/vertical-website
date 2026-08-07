import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { ProjectsMobileList } from "@/components/proyectos/ProjectsMobileList";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Grain } from "@/components/ui/Grain";
import { PageLoader } from "@/components/transitions/PageLoader";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

const DesktopScene = dynamic(
  () =>
    import("@/components/proyectos/DesktopScene").then((m) => m.DesktopScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(820px,calc(100dvh-var(--header-height)-2rem))] min-h-[560px] items-center justify-center rounded-card border border-border bg-ink/5">
        <PageLoader variant="inline" label="Booting Vertical OS" />
      </div>
    ),
  },
);

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Escritorio creativo Vertical OS — FEP, Cafeteros, KOAJ, Pedigree y más. Craft con humor.",
  alternates: { canonical: "/proyectos" },
  openGraph: {
    title: "Proyectos · Vertical Management",
    description:
      "Desktop modernizado: abre ventanas, explora casos y entra a cada proyecto.",
    url: "/proyectos",
  },
};

/**
 * Proyectos — neo-retro desktop OS (XP/Linux spirit, 2026 craft).
 * Desktop shell is client-only code-split for performance.
 */
export default function ProyectosPage() {
  return (
    <main id="main-content" className="relative bg-paper-dim pt-header">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Proyectos", path: "/proyectos" },
        ])}
      />
      <Grain className="opacity-[0.03]" />

      <Container className="relative z-[1] py-8 md:py-10">
        <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index="03" className="mb-3">
              Vertical OS
            </Eyebrow>
            <h1 className="font-display text-display-lg tracking-display">
              Proyectos
            </h1>
            <p className="mt-3 max-w-md text-ink-soft">
              El escritorio de siempre — modernizado. Doble clic para abrir.
              Arrastra ventanas. Minimiza sin piedad.
            </p>
          </div>
          <p className="hidden font-mono text-[0.65rem] uppercase tracking-label text-ink-muted md:block">
            Desktop · v2.0 · No templates found
          </p>
        </div>

        <DesktopScene />

        <p className="mt-4 hidden text-center font-mono text-[0.65rem] uppercase tracking-label text-ink-muted md:block">
          Tip: Start → proyectos · rojo cierra · amarillo minimiza
        </p>
      </Container>

      <ProjectsMobileList />
    </main>
  );
}
