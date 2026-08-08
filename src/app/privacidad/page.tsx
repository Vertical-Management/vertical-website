import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacidad",
  description: `Política de privacidad de ${SITE.name}. Cómo tratamos tus datos cuando nos escribes.`,
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
};

/**
 * Privacy policy — contact form data (Andorra / EU-friendly baseline).
 */
export default function PrivacidadPage() {
  return (
    <main id="main-content" className="relative pt-header">
      <Container className="max-w-narrow py-section">
        <Eyebrow className="mb-4">Legal</Eyebrow>
        <h1 className="font-display text-display-lg tracking-display">
          Privacidad
        </h1>
        <p className="mt-4 text-ink-soft">
          Última actualización: agosto 2026 · {SITE.name} ({SITE.location})
        </p>

        <div className="prose-vertical mt-12 space-y-10 text-base leading-relaxed text-ink-soft">
          <section>
            <h2 className="font-display text-display-sm text-ink">
              1. Responsable
            </h2>
            <p className="mt-3">
              El responsable del tratamiento de los datos es{" "}
              <strong className="text-ink">{SITE.name}</strong>, con sede en{" "}
              {SITE.location}. Contacto:{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-ink underline decoration-accent underline-offset-4"
              >
                {SITE.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm text-ink">
              2. Qué datos recogemos
            </h2>
            <p className="mt-3">
              A través del formulario de contacto podemos tratar:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Nombre o alias</li>
              <li>Dirección de correo electrónico</li>
              <li>Empresa (opcional)</li>
              <li>Presupuesto orientativo (opcional)</li>
              <li>Mensaje y contenido del proyecto que nos cuentes</li>
            </ul>
            <p className="mt-3">
              No pedimos datos de pago ni documentos de identidad a través de
              este sitio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm text-ink">
              3. Finalidad y base legal
            </h2>
            <p className="mt-3">
              Usamos estos datos exclusivamente para responder a tu consulta,
              valorar el encargo y, si procede, iniciar una relación comercial.
              La base legal es tu consentimiento al enviar el formulario y, en su
              caso, la ejecución de medidas precontractuales a tu petición.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm text-ink">
              4. Conservación
            </h2>
            <p className="mt-3">
              Conservamos los mensajes el tiempo necesario para gestionar la
              conversación y las obligaciones legales aplicables. Si no hay
              relación comercial, se eliminan o se archivan de forma limitada
              cuando ya no son necesarios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm text-ink">
              5. Encargados y herramientas
            </h2>
            <p className="mt-3">
              El envío de correos del formulario puede realizarse mediante un
              proveedor de email transaccional (p. ej. Resend). El hosting del
              sitio puede estar en Vercel u otro proveedor cloud. Estos
              proveedores actúan como encargados del tratamiento según sus
              propios términos y medidas de seguridad.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm text-ink">
              6. Cookies y analítica
            </h2>
            <p className="mt-3">
              Este sitio no utiliza cookies de publicidad ni trackers de terceros
              por defecto. Pueden usarse cookies técnicas imprescindibles para el
              funcionamiento (p. ej. preferencias de sesión del navegador). Si en
              el futuro se activa analítica, se informará y, cuando sea
              obligatorio, se solicitará consentimiento.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm text-ink">
              7. Tus derechos
            </h2>
            <p className="mt-3">
              Puedes solicitar acceso, rectificación, supresión, limitación u
              oposición al tratamiento de tus datos, y la portabilidad cuando
              aplique, escribiendo a{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-ink underline decoration-accent underline-offset-4"
              >
                {SITE.email}
              </a>
              . También puedes presentar una reclamación ante la autoridad de
              control competente en Andorra o en tu país de residencia en la UE.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm text-ink">
              8. Seguridad
            </h2>
            <p className="mt-3">
              Aplicamos medidas técnicas y organizativas razonables (HTTPS,
              validación de formularios, límites de envío). Ningún sistema es
              100&nbsp;% seguro; si detectas un incidente, avísanos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-display-sm text-ink">
              9. Cambios
            </h2>
            <p className="mt-3">
              Podemos actualizar esta política. La versión vigente estará
              siempre en esta URL:{" "}
              <Link
                href="/privacidad"
                className="text-ink underline decoration-accent underline-offset-4"
              >
                {SITE.url}/privacidad
              </Link>
              .
            </p>
          </section>
        </div>

        <p className="mt-16">
          <Link
            href="/contacto"
            className="font-mono text-caption uppercase tracking-label text-ink-muted transition-colors hover:text-accent"
          >
            ← Volver a contacto
          </Link>
        </p>
      </Container>
    </main>
  );
}
