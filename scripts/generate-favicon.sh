#!/bin/bash
# Favicon generation script
# Requires: ImageMagick's convert

set -e

FAVICON_SVG="public/favicon.svg"
FAVICON_ICO="public/favicon.ico"
FAVICON_SIZES=(16 32 64 128 256)

if [ ! -f "$FAVICON_SVG" ]; then
  echo "❌ favicon.svg not found at $FAVICON_SVG"
  exit 1
fi

echo "🎨 Generating favicons from $FAVICON_SVG"

# Check if convert is available
if ! command -v convert &> /dev/null; then
  echo "⚠️  ImageMagick (convert) not found."
  echo "Install with: brew install imagemagick"
  exit 1
fi

# Create temporary directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Generate different sizes
for size in "${FAVICON_SIZES[@]}"; do
  convert -background none -density 384 -resize "${size}x${size}" "$FAVICON_SVG" "$TEMP_DIR/favicon-${size}.png"
  echo "✅ Generated ${size}×${size} favicon"
done

# Create .ico from the PNG files
convert "$TEMP_DIR/favicon-16.png" "$TEMP_DIR/favicon-32.png" "$TEMP_DIR/favicon-64.png" "$FAVICON_ICO"
echo "✅ Generated favicon.ico"

# Also create apple touch icons
for size in 120 152 180; do
  convert "$FAVICON_SVG" -resize "${size}x${size}" "public/apple-touch-icon-${size}.png"
  echo "✅ Generated apple-touch-icon-${size}.png"
done

echo ""
echo "✨ Favicon generation complete!"
echo "📁 Generated files:"
echo "  - $FAVICON_ICO"
echo "  - public/apple-touch-icon-*.png"
