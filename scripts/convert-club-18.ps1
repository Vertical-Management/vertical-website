# Convert CLUB DE LAS 18 PIEZAS masters → optimized web loops.
# Usage (from repo root):
#   powershell -ExecutionPolicy Bypass -File scripts/convert-club-18.ps1
#
# Masters: recursos/CLUB DE LAS 18 PIEZAS
# Output:  public/assets/CLUB DE LAS 18 PIEZAS/loops
# Requires: ffmpeg on PATH
#
# Quality profile: max 1080p, 30fps, H.264 high CRF 22, WebP posters q88

$ErrorActionPreference = "Continue"
$root = Split-Path $PSScriptRoot -Parent
$src = Join-Path $root "recursos\CLUB DE LAS 18 PIEZAS"
$out = Join-Path $root "public\assets\CLUB DE LAS 18 PIEZAS\loops"

if (-not (Test-Path $src)) { throw "Missing $src" }
if (Test-Path $out) { Remove-Item $out -Recurse -Force }
New-Item -ItemType Directory -Force -Path $out | Out-Null

function Get-Slug([string]$name) {
  $s = $name.ToLowerInvariant()
  $s = [regex]::Replace($s, "[^a-z0-9]+", "-")
  $s = $s.Trim("-")
  if ($s.Length -gt 56) { $s = $s.Substring(0, 56).TrimEnd("-") }
  return $s
}

$results = @()
foreach ($f in (Get-ChildItem $src -File | Where-Object { $_.Name -ne ".gitkeep" })) {
  $ext = $f.Extension.ToLowerInvariant()
  $slug = Get-Slug $f.BaseName
  $in = $f.FullName

  if ($ext -eq ".gif" -or $ext -eq ".mp4") {
    $mp4 = Join-Path $out "$slug.mp4"
    $poster = Join-Path $out "$slug-poster.webp"
    Write-Host "ENCODE $slug"
    $vf = "fps=30,scale='min(1080,iw)':-2:flags=lanczos,format=yuv420p"
    cmd /c "ffmpeg -hide_banner -loglevel error -y -i `"$in`" -vf `"$vf`" -c:v libx264 -profile:v high -level 4.1 -crf 22 -preset medium -movflags +faststart -an -g 60 -keyint_min 30 `"$mp4`""
    if (-not (Test-Path $mp4)) { Write-Host "  FAIL $slug"; continue }
    cmd /c "ffmpeg -hide_banner -loglevel error -y -ss 0.25 -i `"$mp4`" -frames:v 1 -vf `"scale='min(1080,iw)':-2:flags=lanczos`" -c:v libwebp -quality 88 `"$poster`""
    $results += [pscustomobject]@{ kind = "video"; slug = $slug; src = $f.Name }
  }
  elseif ($ext -match "\.(webp|png|jpe?g)$") {
    $opt = Join-Path $out "$slug.webp"
    Write-Host "STILL $slug"
    cmd /c "ffmpeg -hide_banner -loglevel error -y -i `"$in`" -vf `"scale='min(1440,iw)':-2:flags=lanczos`" -c:v libwebp -quality 90 `"$opt`""
    if (-not (Test-Path $opt)) { Write-Host "  FAIL $slug"; continue }
    $results += [pscustomobject]@{ kind = "image"; slug = $slug; src = $f.Name }
  }
}

Write-Host "Done: $($results.Count) pieces → $out"
Write-Host ("Total {0:N2} MB" -f (((Get-ChildItem $out -File | Measure-Object Length -Sum).Sum) / 1MB))
Write-Host "Update src/data/carousel.ts if filenames/slugs changed."
