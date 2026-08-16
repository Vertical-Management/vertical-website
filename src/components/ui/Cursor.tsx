/**
 * Custom cursor retired (INV-17).
 * Native system pointer on every page — this export stays a no-op
 * so leftover imports cannot remount the overlay.
 */
export function Cursor() {
  return null;
}
