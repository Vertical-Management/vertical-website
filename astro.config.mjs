import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repoOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

const site = isGitHubActions && repoOwner ? `https://${repoOwner}.github.io` : undefined;
const base = isGitHubActions && repoName ? `/${repoName}` : '/';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
