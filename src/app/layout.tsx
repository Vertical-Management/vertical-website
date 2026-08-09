import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers/Providers";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SkipLink } from "@/components/layout/SkipLink";
import { Cursor } from "@/components/ui/Cursor";
import { JsonLd } from "@/components/seo/JsonLd";
import { fontVariables } from "@/lib/fonts";
import { organizationJsonLd, personJsonLd, SEO, websiteJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SEO.title,
    template: "%s · Vertical",
  },
  description: SEO.description,
  applicationName: SITE.name,
  keywords: [
    "Vertical Management",
    "Esteban Ferrer",
    "branding",
    "creatividad",
    "Andorra",
    "diseño",
    "digital",
    "motion graphics",
    "UX UI",
    "estrategia creativa",
    SITE.pitch,
  ],
  authors: [{ name: SITE.founder, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "design",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SEO.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SEO.title,
    description: SEO.description,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.pitch}`,
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    site: SEO.twitterHandle,
    creator: SEO.twitterHandle,
    images: [SEO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("antialiased", fontVariables)}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-paper font-body text-ink">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), personJsonLd()]} />
        <Providers>
          <SkipLink />
          <Cursor />
          <div id="smooth-wrapper" className="relative">
            <div id="smooth-content">
              <SiteChrome>{children}</SiteChrome>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
