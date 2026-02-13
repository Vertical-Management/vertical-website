#!/bin/bash
# Image optimization script for Vertical Management portfolio
# Requires: imagemagick (convert) and cwebp

set -e

RESOURCES_DIR="recursos"
PUBLIC_ASSETS="public/assets"
BACKUP_DIR=".backup-images-$(date +%s)"

echo "📦 Starting image optimization for $RESOURCES_DIR/"
echo "🔄 Creating backup in $BACKUP_DIR"

# Create backup if there are already optimized images
if [ -d "$PUBLIC_ASSETS" ]; then
  mkdir -p "$BACKUP_DIR"
  cp -r "$PUBLIC_ASSETS" "$BACKUP_DIR/" || true
fi

# Ensure public/assets directory exists
mkdir -p "$PUBLIC_ASSETS"

# Function to convert images to WebP
optimize_webp() {
  local input="$1"
  local output="$2"
  
  if command -v cwebp &> /dev/null; then
    cwebp -q 85 "$input" -o "$output"
    echo "✅ Converted $(basename "$input") → WebP"
  else
    echo "⚠️  cwebp not found. Install libwebp: brew install libwebp"
  fi
}

# Function to optimize PNG/JPG
optimize_image() {
  local input="$1"
  local ext="${input##*.}"
  
  if command -v convert &> /dev/null; then
    case "$ext" in
      jpg|jpeg)
        convert "$input" -quality 85 -interlace Plane "$input"
        echo "✅ Optimized JPEG: $(basename "$input")"
        ;;
      png)
        convert "$input" -strip -quality 85 "$input"
        echo "✅ Optimized PNG: $(basename "$input")"
        ;;
    esac
  fi
}

# Copy and optimize resources
find "$RESOURCES_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.gif" -o -iname "*.webp" -o -iname "*.mp4" \) | while read -r file; do
  # Create directory structure
  rel_path="${file#$RESOURCES_DIR/}"
  target_dir="$PUBLIC_ASSETS/$(dirname "$rel_path")"
  mkdir -p "$target_dir"
  
  ext="${file##*.}"
  filename="$(basename "$file")"
  target_file="$target_dir/$filename"
  
  # Copy file
  cp "$file" "$target_file"
  
  # Optimize based on type
  case "$ext" in
    png|jpg|jpeg)
      optimize_image "$target_file"
      ;;
    webp)
      echo "✅ Copied WebP: $filename"
      ;;
    gif|mp4)
      echo "✅ Copied media: $filename"
      ;;
  esac
done

echo ""
echo "✨ Image optimization complete!"
echo "📁 Assets copied to: $PUBLIC_ASSETS"
echo ""
echo "Optional: Convert GIFs to video for smaller file size"
echo "  ffmpeg -i input.gif -vf \"scale=trunc(iw/2)*2:trunc(ih/2)*2\" -c:v libx264 -crf 23 -c:a aac output.mp4"
