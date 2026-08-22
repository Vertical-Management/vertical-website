import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("concatena clases condicionales", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });

  it("resuelve conflictos de utilidades tailwind con la última", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("no colisiona font-size custom con text-color", () => {
    const merged = cn("text-display-lg", "text-paper");
    // Ambas deben sobrevivir: display-lg es tamaño, paper es color
    expect(merged).toContain("text-display-lg");
    expect(merged).toContain("text-paper");
  });
});
