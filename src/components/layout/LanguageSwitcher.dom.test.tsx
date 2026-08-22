import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const STORAGE_KEY = "vertical-locale";

// El jsdom comparte localStorage entre tests del mismo fichero
beforeEach(() => {
  window.localStorage.clear();
});

function renderSwitcher() {
  return render(
    <LanguageProvider>
      <LanguageSwitcher />
    </LanguageProvider>,
  );
}

async function openListbox() {
  const user = userEvent.setup();
  renderSwitcher();
  const trigger = screen.getByRole("button", { name: /Seleccionar idioma/ });
  await user.click(trigger);
  return { user, trigger };
}

describe("LanguageSwitcher", () => {
  it("arranca en es (default) con el trigger cerrado", () => {
    renderSwitcher();
    const trigger = screen.getByRole("button", {
      name: /Seleccionar idioma: Castellano/,
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.documentElement.lang).toBe("es");
  });

  it("abre el listbox con los otros 3 locales y selecciona English", async () => {
    const { user, trigger } = await openListbox();

    const listbox = await screen.findByRole("listbox");
    expect(listbox.getAttribute("aria-label")).toBe("Idioma");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    const english = screen.getByRole("option", { name: "English" });
    await user.click(english);

    // Persistencia + <html lang> + trigger actualizado. Con locale "en" el
    // chrome entero va en inglés ("Select language: English") → ancla al meta.
    await waitFor(() => {
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("en");
      expect(document.documentElement.lang).toBe("en");
    });
    expect(await screen.findByRole("button", { name: /: English$/ })).toBeTruthy();
    await waitFor(() => {
      expect(screen.queryByRole("listbox")).toBeNull();
    });
  });

  it("Escape cierra el listbox sin cambiar el locale", async () => {
    const { user, trigger } = await openListbox();
    await screen.findByRole("listbox");

    await user.keyboard("{Escape}");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it("hidrata el locale guardado en localStorage tras montar (fr)", () => {
    window.localStorage.setItem(STORAGE_KEY, "fr");
    renderSwitcher();
    // Con locale fr TODO el chrome va en francés; el label del meta es "Français"
    expect(screen.getByRole("button", { name: /: Français$/ })).toBeTruthy();
    expect(document.documentElement.lang).toBe("fr");
  });
});
