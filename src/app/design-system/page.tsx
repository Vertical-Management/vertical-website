import type { Metadata } from "next";
import {
  Badge,
  Button,
  Container,
  Divider,
  Eyebrow,
  Grain,
  Heading,
  IconButton,
  Input,
  Link,
  Magnetic,
  Marquee,
  MarqueeItem,
  Reveal,
  Section,
  Stagger,
  StaggerItem,
  TextArea,
  TextReveal,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Design System",
  description: "Tokens, tipografía y componentes base — Vertical.",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "Ink", var: "bg-ink", hex: "#0A0A0A" },
  { name: "Paper", var: "bg-paper border border-border", hex: "#F4F1EA" },
  { name: "Accent", var: "bg-accent", hex: "#FF3D00" },
  { name: "Hot", var: "bg-accent-hot", hex: "#FF1A5C" },
  { name: "Cool", var: "bg-accent-cool", hex: "#00C2FF" },
  { name: "Lime", var: "bg-accent-lime", hex: "#C8FF00" },
];

export default function DesignSystemPage() {
  return (
    <main id="main-content" className="relative pb-30">
      <Grain />

      <Section
        padded={false}
        className="border-b border-border pt-[calc(var(--header-height)+1rem)]"
      >
        <Container className="py-16 md:py-24">
          <Eyebrow index="DS" className="mb-6">
            Vertical · Living design system
          </Eyebrow>
          <TextReveal
            as="h1"
            text="Design System"
            className="font-display text-display-xl"
            mode="chars"
            stagger={0.03}
          />
          <p className="mt-6 max-w-xl text-lead text-ink-soft">
            Editorial Digital Disruptivo + Playful High-Craft. Tokens, tipo y primitivos
            listos para Home, Servicios, Proyectos y Contacto.
          </p>
          <div className="mt-8">
            <Link href="/" mono>
              ← Volver home
            </Link>
          </div>
        </Container>
      </Section>

      {/* Color */}
      <Section>
        <Container>
          <Eyebrow index="01" className="mb-4">
            Color
          </Eyebrow>
          <Heading as="h2" size="display-md" className="mb-10">
            Paleta semántica
          </Heading>
          <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {colors.map((c) => (
              <StaggerItem key={c.name}>
                <div className="overflow-hidden rounded-card border border-border bg-surface">
                  <div className={`aspect-square ${c.var}`} />
                  <div className="p-3">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="tracking-label mt-0.5 font-mono text-[0.65rem] uppercase text-ink-muted">
                      {c.hex}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <div
            className="mt-8 overflow-hidden rounded-card p-8 md:p-12"
            data-theme="inverse"
          >
            <Eyebrow className="mb-3 !text-ink-muted">
              data-theme=&quot;inverse&quot;
            </Eyebrow>
            <Heading as="h3" size="display-sm" className="!text-ink">
              Superficies invertidas para desktop, overlays y punch sections.
            </Heading>
          </div>
        </Container>
      </Section>

      <Divider className="container-site" />

      {/* Type */}
      <Section>
        <Container>
          <Eyebrow index="02" className="mb-4">
            Tipografía
          </Eyebrow>
          <Heading as="h2" size="display-md" className="mb-10">
            Escala fluid
          </Heading>
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-2">display-2xl · Syne</p>
              <p className="font-display text-display-2xl">VERTICAL</p>
            </div>
            <div>
              <p className="eyebrow mb-2">display-xl</p>
              <p className="font-display text-display-xl">Insert coin</p>
            </div>
            <div>
              <p className="eyebrow mb-2">display-lg</p>
              <p className="font-display text-display-lg">Servicios con carácter</p>
            </div>
            <div>
              <p className="eyebrow mb-2">display-md / sm</p>
              <p className="font-display text-display-md">Proyectos en el escritorio</p>
              <p className="mt-2 font-display text-display-sm text-ink-soft">
                Contacto desde Andorra
              </p>
            </div>
            <div className="max-w-prose">
              <p className="eyebrow mb-2">body · Manrope · lead</p>
              <p className="text-lead text-ink-soft">
                Creatividad, branding y experiencias digitales con humor y craft. No
                plantillas. Cada micro-interacción tiene intención.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-2">mono · JetBrains</p>
              <p className="tracking-label font-mono text-sm uppercase text-ink-muted">
                01 — Branding · 02 — Digital · 03 — Motion
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Divider className="container-site" />

      {/* Buttons */}
      <Section>
        <Container>
          <Eyebrow index="03" className="mb-4">
            Botones
          </Eyebrow>
          <Heading as="h2" size="display-md" className="mb-10">
            Variantes + magnetic
          </Heading>
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Button variant="primary" data-cursor="hover">
                Primary
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="secondary" data-cursor="hover">
                Secondary
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="accent" data-cursor="hover">
                Accent
              </Button>
            </Magnetic>
            <Magnetic>
              <Button variant="ghost" data-cursor="hover">
                Ghost
              </Button>
            </Magnetic>
            <Magnetic strength={20}>
              <Button variant="arcade" size="lg" data-cursor="hover">
                Insert coin
              </Button>
            </Magnetic>
            <IconButton label="Cerrar" variant="outline" data-cursor="hover">
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </IconButton>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="lime">Lime</Badge>
            <Badge variant="outline" index="04">
              Outline
            </Badge>
            <Badge variant="hot">Hot</Badge>
            <Badge variant="inverse">Inverse</Badge>
          </div>
        </Container>
      </Section>

      <Divider className="container-site" />

      {/* Marquee + forms */}
      <Section>
        <Container>
          <Eyebrow index="04" className="mb-4">
            Motion & forms
          </Eyebrow>
          <Heading as="h2" size="display-md" className="mb-10">
            Marquee · Fields · Reveal
          </Heading>
        </Container>

        <div className="mb-16 border-y border-border py-6">
          <Marquee speed="fast" gap="2rem">
            {["PLAY", "CRAFT", "HUMOR", "VERTICAL", "ANDORRA", "FERRER"].map((w) => (
              <MarqueeItem key={w}>
                <span className="tracking-display font-display text-display-sm">{w}</span>
                <span className="mx-4 text-accent-lime">●</span>
              </MarqueeItem>
            ))}
          </Marquee>
        </div>

        <Container>
          <Reveal className="grid max-w-xl gap-8">
            <Input label="Nombre" name="name" placeholder="Esteban Ferrer" />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="sales@somvertical.ad"
            />
            <TextArea
              label="Mensaje"
              name="message"
              placeholder="Cuéntanos el lío creativo…"
            />
            <div>
              <Button variant="primary" type="button" data-cursor="hover">
                Enviar (demo)
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Inverse punch */}
      <Section inverse className="relative overflow-hidden">
        <Grain strong />
        <Container className="relative z-[1]">
          <Eyebrow index="05" className="mb-6">
            Inverse surface
          </Eyebrow>
          <Heading as="h2" size="display-lg" className="max-w-3xl">
            Premium, pero sigue siendo divertido.
          </Heading>
          <p className="mt-6 max-w-md text-lead text-ink-muted">
            El design system está listo para el Paso 3: navegación con craft y
            transiciones que se sienten de estudio.
          </p>
          <div className="mt-10">
            <Magnetic>
              <Button variant="arcade" size="lg" data-cursor="hover">
                Siguiente: Header + Nav
              </Button>
            </Magnetic>
          </div>
        </Container>
      </Section>
    </main>
  );
}
