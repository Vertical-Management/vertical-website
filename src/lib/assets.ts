/**
 * Encode public asset paths that contain spaces / special chars.
 * Example: `/assets/PAG KOAJ 3D/file.webp` → `/assets/PAG%20KOAJ%203D/file.webp`
 */
export function asset(path: string): string {
  if (!path) return path;
  return path
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : ""))
    .join("/");
}
