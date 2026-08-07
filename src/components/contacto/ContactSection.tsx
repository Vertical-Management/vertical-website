"use client";

import { ContactDevice } from "@/components/contacto/ContactDevice";
import { ContactForm } from "@/components/contacto/ContactForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Main contact split — form + glass device.
 */
export function ContactSection() {
  return (
    <section className="relative overflow-hidden py-section">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Form column */}
          <div className="lg:col-span-7">
            <Eyebrow index="01" className="mb-4">
              Formulario
            </Eyebrow>
            <Heading as="h2" size="display-md" className="mb-3">
              Cuéntanos el
              <br />
              <span className="text-accent">proyecto</span>
            </Heading>
            <Reveal>
              <p className="mb-10 max-w-md text-ink-soft">
                Brief corto o novela épica — da igual. Lo importante es el
                ángulo. El resto lo afinamos juntos.
              </p>
            </Reveal>
            <ContactForm />
          </div>

          {/* Device column */}
          <div className="relative lg:col-span-5 lg:sticky lg:top-28">
            <p className="mb-6 text-center font-mono text-caption uppercase tracking-label text-ink-muted lg:text-left">
              Direct line · neo-iOS
            </p>
            <ContactDevice />
            <p className="mt-6 text-center text-xs text-ink-muted lg:text-left">
              El smartphone del sitio original, elevado: glass, isla dinámica y
              paisaje andorrano en el wallpaper.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
