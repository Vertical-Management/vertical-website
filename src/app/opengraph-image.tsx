import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vertical Management — Esteban Ferrer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic OG / Twitter card — PNG for broad platform support.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "56px 64px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              color: "#c8ff00",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            Andorra · Insert coin
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              background: "#ff3d00",
              transform: "rotate(12deg)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "#f4f1ea",
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 0.95,
            }}
          >
            VERTICAL
          </div>
          <div
            style={{
              color: "rgba(244,241,234,0.85)",
              fontSize: 36,
              fontWeight: 600,
            }}
          >
            Editorial Digital Disruptivo
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ color: "rgba(244,241,234,0.65)", fontSize: 24 }}>
              Branding · Digital · Motion · Estrategia
            </div>
            <div style={{ color: "rgba(244,241,234,0.65)", fontSize: 22 }}>
              Esteban Ferrer
            </div>
          </div>
          <div
            style={{
              border: "2px solid #c8ff00",
              borderRadius: 999,
              padding: "12px 28px",
              color: "#c8ff00",
              fontSize: 18,
              letterSpacing: 2,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            SOMVERTICAL.AD
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
