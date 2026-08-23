"use client";

import { ContactDevice } from "@/components/contacto/ContactDevice";
import { ContactForm } from "@/components/contacto/ContactForm";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Main contact split — form + glass device.
 */
export function ContactSection() {
  const { t } = useLanguage();
  const s = t.contactPage.section;

  return (
    <section className="relative overflow-hidden py-section">
      <Container>
        <div className="grid items-start gap-12 sm:gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow index="01" className="mb-3 sm:mb-4">
              {s.eyebrow}
            </Eyebrow>
            <Heading as="h2" size="display-md" className="mb-3 text-balance">
              {s.titleLine1}
              <br />
              <span className="text-accent">{s.titleAccent}</span>
            </Heading>
            <Reveal>
              <p className="mb-8 max-w-md text-base leading-relaxed text-ink-soft sm:mb-10">
                {s.body}
              </p>
            </Reveal>
            <ContactForm />
          </div>

          <div className="relative mt-2 lg:sticky lg:top-28 lg:col-span-5 lg:mt-0">
            <p className="tracking-label mb-5 text-center font-mono text-caption uppercase text-ink-muted sm:mb-6 lg:text-left">
              {s.deviceLabel}
            </p>
            <ContactDevice />
            <p className="mt-5 text-center text-xs leading-relaxed text-ink-muted sm:mt-6 lg:text-left">
              {s.deviceHint}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
