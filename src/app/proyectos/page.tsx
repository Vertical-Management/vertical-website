import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ProjectsMobileList } from "@/components/proyectos/ProjectsMobileList";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Grain } from "@/components/ui/Grain";
import { PageLoader } from "@/components/transitions/PageLoader";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { projects } from "@/data/projects";

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
 * Proyectos — neo-retro desktop OS (md+) + accessible list (mobile / SEO).
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
              <span className="md:hidden">
                Casos reales. Entra a cada proyecto y ve el craft de cerca.
              </span>
              <span className="hidden md:inline">
                El escritorio de siempre — modernizado. Clic para abrir.
                Arrastra ventanas. Minimiza sin piedad.
              </span>
            </p>
          </div>
          <p className="hidden font-mono text-[0.65rem] uppercase tracking-label text-ink-muted md:block">
            Desktop · v2.0 · No templates found
          </p>
        </div>

        {/* Desktop OS only from md up — mobile gets the list below */}
        <div className="hidden md:block">
          <DesktopScene />
          <p className="mt-4 text-center font-mono text-[0.65rem] uppercase tracking-label text-ink-muted">
            Tip: Start → proyectos · rojo cierra · amarillo minimiza · Esc cierra
          </p>
        </div>
      </Container>

      {/* Mobile-first list */}
      <div className="md:hidden">
        <ProjectsMobileList />
      </div>

      {/* Desktop SEO / a11y index */}
      <div className="hidden border-t border-border bg-paper py-10 md:block">
        <Container>
          <p className="font-mono text-caption uppercase tracking-label text-ink-muted">
            Índice de proyectos
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/proyectos/${p.slug}`}
                  data-cursor="hover"
                  className="group flex flex-col rounded-md border border-border bg-surface px-4 py-3 transition-colors hover:border-ink/25"
                >
                  <span className="font-mono text-[10px] uppercase tracking-label text-ink-muted">
                    {p.year}
                  </span>
                  <span className="font-display text-lg group-hover:text-accent">
                    {p.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </main>
  );
}
