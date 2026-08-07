import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vertical Management",
    short_name: "Vertical",
    description:
      "Creatividad, branding y experiencias digitales con craft y humor. Andorra.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f1ea",
    theme_color: "#0a0a0a",
    lang: "es",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
