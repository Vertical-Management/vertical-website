# Vertical Management Portfolio — Suggested Commits & Versioning

This document provides suggested commit messages and a versioning strategy for tracking development of the Vertical Management portfolio website.

## Version Structure

Use semantic versioning: `MAJOR.MINOR.PATCH` (e.g., `0.1.0` → `0.2.0` → 1.0.0)

- **MAJOR**: Major feature releases (new section, full redesign)
- **MINOR**: Feature additions or significant improvements
- **PATCH**: Bug fixes, small updates, content changes

Current version: **0.1.0** (initial setup)

---

## Suggested Commits (Development Phase)

### 1. Project Setup & Scaffolding
```bash
git commit -m "chore(setup): Initialize Astro project with React components"
git commit -m "chore(deps): Add Sass, Prettier, and core dependencies"
git commit -m "chore(config): Configure Astro for static output and GitHub Pages"
```

### 2. Base Layouts & Components
```bash
git commit -m "feat(layout): Create BaseLayout with head and typography"
git commit -m "feat(components): Add Header with responsive mobile menu"
git commit -m "feat(components): Add Hero section with entrance animation"
git commit -m "feat(components): Add RotatingWords component for advice block"
```

### 3. Pages
```bash
git commit -m "feat(pages): Create landing page (index.astro)"
git commit -m "feat(pages): Create About page with author bio"
git commit -m "feat(pages): Create Services page with service grid"
git commit -m "feat(pages): Create Projects listing and detail routes"
git commit -m "feat(pages): Create Contact page"
```

### 4. Styling & Animations
```bash
git commit -m "style(scss): Add global styles and typography system"
git commit -m "style(animations): Add entrance animations and transitions"
git commit -m "style(responsive): Implement mobile-first responsive design"
git commit -m "feat(a11y): Add prefers-reduced-motion support"
```

### 5. Assets & Data
```bash
git commit -m "feat(data): Add projects.json with sample portfolio entries"
git commit -m "assets(logo): Add SVG logo placeholder for rebranding"
git commit -m "assets(favicon): Generate favicon and apple-touch-icons"
git commit -m "chore(sync): Add script to sync recursos/ to public/assets/"
```

### 6. GitHub Pages & Deployment
```bash
git commit -m "chore(ci): Add GitHub Actions workflow for build and deploy"
git commit -m "docs(readme): Create setup and deployment instructions"
git commit -m "chore(.gitignore): Add standard ignores (node_modules, dist, etc.)"
```

### 7. Optimization
```bash
git commit -m "perf(images): Add image optimization script (WebP conversion)"
git commit -m "perf(favicon): Add favicon generation script"
git commit -m "perf(build): Minify assets and optimize Astro config"
```

---

## Release Tags

Create a git tag for each published version:

```bash
# After preparing a release, tag it:
git tag -a v0.1.0 -m "Initial portfolio launch with landing page, about, and projects"
git push origin v0.1.0

# Later releases:
git tag -a v0.2.0 -m "Add services page and advanced animations"
git tag -a v1.0.0 -m "Official launch: full portfolio with blog and contact form"
```

---

## Development Workflow Example

```bash
# Start a feature branch
git checkout -b feat/add-blog-section

# Make commits as you work
git add .
git commit -m "feat(blog): Add blog landing page"
git commit -m "feat(blog): Create individual blog post template"
git commit -m "style(blog): Add blog-specific typography and layout"

# Create a pull request (optional on GitHub)

# Merge to main when ready
git checkout main
git merge feat/add-blog-section

# Tag the release
git tag -a v0.3.0 -m "Add blog section with sample posts"
git push origin main --tags
```

---

## Content Updates (Low-priority Commits)

Once you have project copy and real assets, use these messages:

```bash
git commit -m "content(about): Update About section with official bio"
git commit -m "content(services): Finalize service descriptions"
git commit -m "content(projects): Add real project entries and descriptions"
git commit -m "assets(logo): Replace placeholder SVG with official brand logo"
git commit -m "content(contact): Update contact email and social links"
```

---

## Branch Naming Convention

- `feat/feature-name` — New features
- `fix/bug-description` — Bug fixes
- `docs/documentation-update` — Documentation only
- `style/css-or-layout` — Style changes
- `chore/task-description` — Maintenance, dependencies, config
- `refactor/code-cleanup` — Code refactoring without new features

Example:
```bash
git checkout -b feat/add-testimonials
git checkout -b fix/responsive-menu-bug
git checkout -b chore/update-dependencies
```

---

## Checklist Before Release

- [ ] All tests pass (if applicable)
- [ ] README.md is up-to-date
- [ ] Code is linted and formatted (`npm run format`)
- [ ] No console errors in build (`npm run build`)
- [ ] Review all changes since last release
- [ ] Update version in `package.json`
- [ ] Create git tag and push to remote
- [ ] Verify GitHub Pages deployment succeeded

---

## Notes

- **Avoid force push to `main`** — Always use pull requests for collaboration.
- **Commit often** — Keep commits atomic and focused on one change.
- **Use the imperative mood** — "Add feature" not "Added feature".
- **Reference issues** — Include issue numbers: `fix(hero): Remove gap in layout (fixes #42)`.

---

Next steps after initial launch:
1. Gather client feedback on portfolio design
2. Plan v0.2.0 with additional features (e.g., blog, testimonials, advanced filtering)
3. Set up GitHub Discussions or Issues for community feedback
4. Plan v1.0.0 for official public launch
