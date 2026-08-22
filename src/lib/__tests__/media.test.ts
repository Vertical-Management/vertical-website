import { describe, expect, it } from "vitest";
import { isGifSrc, isVideoSrc, posterForVideo } from "@/lib/media";

describe("media helpers", () => {
  it("detecta vídeos por extensión", () => {
    expect(isVideoSrc("/assets/loops/hero.mp4")).toBe(true);
    expect(isVideoSrc("/assets/loops/hero.webm?v=2")).toBe(true);
    expect(isVideoSrc("/assets/img/cover.webp")).toBe(false);
  });

  it("detecta gifs", () => {
    expect(isGifSrc("/assets/a.gif")).toBe(true);
    expect(isGifSrc("/assets/a.mp4")).toBe(false);
  });

  it("convierte foo.mp4 en foo-poster.webp", () => {
    expect(posterForVideo("/assets/x/loop.mp4")).toBe(
      "/assets/x/loop-poster.webp",
    );
    expect(posterForVideo("/assets/x/cover.webp")).toBe("");
  });
});
