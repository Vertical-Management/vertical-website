# Deployment Guide — Vertical Management Portfolio

This guide covers deployment to GitHub Pages, custom domains, and performance optimization.

---

## GitHub Pages Setup (Automatic via GitHub Actions)

### Prerequisites

1. Repository on GitHub (public or private)
2. Repository settings:
   - Go to **Settings** → **Pages**
   - Source: **Deploy from a branch** or **GitHub Actions** (modern)
   - The workflow `.github/workflows/deploy.yml` handles this automatically

### How It Works

1. Push to `main` branch
2. GitHub Actions runs the workflow:
   - Checkouts code
   - Installs Node 18+
   - Runs `npm ci` and `npm run build`
   - Uploads `dist/` artifact
   - Deploys to GitHub Pages

3. Site is live at: `https://<username>.github.io/<repo-name>/`

### Configuration

If using a **project repository** (not user/org repo):

1. Set repo name in `package.json`:
   ```json
   {
     "homepage": "https://estebanferrer.github.io/vertical-website"
   }
   ```

2. Update `astro.config.mjs`:
   ```mjs
   export default defineConfig({
     site: "https://estebanferrer.github.io",
     base: "/vertical-website",
     output: 'static',
   });
   ```

3. Update internal links in components to use `base` if needed.

If using a **user repository** (`<username>.github.io`):
- No base path needed.
- Site is live at: `https://<username>.github.io/`

---

## Custom Domain Setup

1. Purchase a domain (e.g., `estebanferrer.design`)
2. In GitHub repository settings (**Settings** → **Pages**):
   - Add custom domain: `estebanferrer.design`
   - Check "Enforce HTTPS"

3. Configure DNS with your registrar:
   ```
   CNAME record:
   estebanferrer.design → <username>.github.io
   
   Or use A records (GitHub IPs):
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

4. Wait for DNS propagation (5–48 hours)
5. GitHub automatically generates HTTPS cert (Let's Encrypt)

---

## Local Testing

Before pushing to GitHub:

```bash
# Install dependencies
npm install

# Sync assets from recursos/
npm run sync:assets

# Run local dev server
npm run dev
# Open http://localhost:3000

# Build production (generates dist/)
npm run build

# Preview production build
npm run preview
# Open http://localhost:3000 (or see terminal)
```

---

## Performance Optimization

### 1. Image Optimization

Run the provided script to optimize and convert images:

```bash
# Make scripts executable
chmod +x scripts/optimize-images.sh scripts/generate-favicon.sh

# Optimize all images in recursos/ and copy to public/assets/
scripts/optimize-images.sh

# Generate favicons from SVG
scripts/generate-favicon.sh
```

This will:
- Compress PNG/JPEG/WebP
- Convert images to WebP where beneficial
- Generate favicon.ico and apple-touch-icons
- Create backups in `.backup-images-*` if needed

### 2. Lazy Load Images

Update `src/components/ProjectGrid.jsx` to add lazy loading:

```jsx
<img
  src={imageSrc}
  alt={alt}
  loading="lazy"
  decoding="async"
/>
```

### 3. Compression

Astro automatically minimizes CSS/JS in production. Verify with:

```bash
npm run build
# Check dist/ folder size
du -sh dist/
```

### 4. Lighthouse Audit

After deployment, test performance:

1. Open site in Chrome
2. Right-click → **Inspect** → **Lighthouse** tab
3. Run audit and address issues

---

## Rollback & Updates

### Rolling Back to Previous Version

If something breaks after deployment:

```bash
# View recent commits
git log --oneline

# Revert to previous commit
git revert <commit-hash>
git push origin main
# GitHub Actions redeploys automatically
```

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all (safe)
npm update

# Update specific package
npm install astro@latest

# Commit changes
git add package.json package-lock.json
git commit -m "chore(deps): Update dependencies"
git push origin main
```

---

## Troubleshooting

### Workflow Fails to Run

1. Check `.github/workflows/deploy.yml` permissions:
   - GitHub settings → Actions → Permissions
   - Ensure "Allow all actions and reusable workflows" is selected

2. Check runner logs:
   - Go to repo → Actions → Recent workflow run
   - Review error logs

### Site Shows 404

- Confirm base path in `astro.config.mjs` matches your repo structure
- Verify all links use correct paths (e.g., `/vertical-website/...` if using base)

### Assets Not Loading

- Ensure `npm run sync:assets` was run before build
- Check that recursos/ folder has files
- Verify paths in components match public/assets/ structure

### Slow Performance

1. Optimize images using `scripts/optimize-images.sh`
2. Enable Astro precompression:
   ```bash
   npm install --save-dev astro-compress
   ```

3. Reduce WebP file sizes:
   ```bash
   cwebp -q 80 image.png -o image.webp
   ```

---

## Monitoring & Analytics

### Site Traffic (optional)

1. Add Google Analytics (or similar):
   ```html
   <!-- In src/layouts/BaseLayout.astro -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_ID');
   </script>
   ```

2. Monitor build performance in GitHub Actions logs

---

## Maintenance Checklist

- [ ] Weekly: Review GitHub Actions logs for failed builds
- [ ] Monthly: Update dependencies (`npm update`)
- [ ] Quarterly: Test on multiple devices and browsers
- [ ] Yearly: Review Lighthouse scores and optimize

---

## Next Steps

1. Configure custom domain (if desired)
2. Run image optimization script
3. Push to GitHub and verify automatic deployment
4. Test site in browser at GitHub Pages URL
5. Share portfolio link with clients/collaborators

For more info, see:
- [Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Web Vitals Guide](https://web.dev/vitals/)
