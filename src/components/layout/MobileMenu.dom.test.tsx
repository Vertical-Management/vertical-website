import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import {
  NavigationProvider,
  useNavigation,
} from "@/components/providers/NavigationProvider";

// NavLink y NavigationProvider dependen del router de Next
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

/** Botón trigger dentro del provider. */
function OpenButton() {
  const { openMenu } = useNavigation();
  return (
    <button type="button" onClick={openMenu}>
      Abrir menú
    </button>
  );
}

/** Harness: providers reales + botón que abre + overlay bajo prueba. */
function Harness() {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <OpenButton />
        <MobileMenu />
      </NavigationProvider>
    </LanguageProvider>
  );
}

describe("MobileMenu (overlay de navegación)", () => {
  it("no renderiza diálogo con el menú cerrado", () => {
    render(<Harness />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("abre el diálogo con los links del nav y aria-modal", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(dialog.getAttribute("aria-label")).toBe("Navegación principal");
    // Links principales presentes en el overlay
    for (const label of ["Home", "Nosotros", "Servicios", "Proyectos", "Contacto"]) {
      expect(
        screen.getAllByRole("link", { name: new RegExp(label) }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("Escape cierra el diálogo y libera el scroll del body", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    await screen.findByRole("dialog");
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    // AnimatePresence anima la salida antes de desmontar
    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).toBeNull();
      },
      { timeout: 4000 },
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("click en un link del overlay navega (href) y cierra el menú", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    const link = await screen.findByRole("link", { name: /Servicios/ });
    expect(link.getAttribute("href")).toBe("/servicios");

    await user.click(link);
    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).toBeNull();
      },
      { timeout: 4000 },
    );
  });
});
