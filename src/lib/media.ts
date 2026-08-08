/** Media helpers for project galleries (image vs video loops). */

const VIDEO_EXT = /\.(mp4|webm|ogg|mov)(\?.*)?$/i;
const GIF_EXT = /\.gif(\?.*)?$/i;

export function isVideoSrc(src: string): boolean {
  return VIDEO_EXT.test(src);
}

export function isGifSrc(src: string): boolean {
  return GIF_EXT.test(src);
}

/**
 * Convention: `foo.mp4` → `foo-poster.webp` (same directory).
 * Falls back to empty string if not a video path.
 */
export function posterForVideo(src: string): string {
  if (!isVideoSrc(src)) return "";
  return src.replace(VIDEO_EXT, "-poster.webp");
}
