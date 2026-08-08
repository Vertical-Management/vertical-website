#!/usr/bin/env bash
# Convert FEP GIF loops → H.264 MP4 + WebP poster (requires ffmpeg).
# Usage: from repo root → bash scripts/convert-fep-gifs.sh
set -euo pipefail

SRC="public/assets/PAG ANIMATION FEP2026"
OUT="$SRC/loops"
mkdir -p "$OUT"

shopt -s nullglob
for gif in "$SRC"/*.gif; do
  base=$(basename "$gif" .gif)
  # slugify
  safe=$(echo "$base" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
  mp4="$OUT/${safe}.mp4"
  poster="$OUT/${safe}-poster.webp"

  echo "→ $base"
  ffmpeg -y -i "$gif" \
    -vf "scale='min(1080,iw)':-2:flags=lanczos" \
    -c:v libx264 -pix_fmt yuv420p -profile:v high \
    -crf 28 -preset medium -movflags +faststart -an \
    "$mp4"

  ffmpeg -y -ss 0.4 -i "$mp4" -frames:v 1 \
    -vf "scale='min(1080,iw)':-2" \
    -c:v libwebp -quality 85 \
    "$poster"
done

echo "Done. Update src/data/projects.ts gallery paths if needed."
