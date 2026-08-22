/** TASK-0005 — lint + format solo sobre lo que se commitea. */
export default {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,mjs,cjs}": ["eslint --fix", "prettier --write"],
  "*.{css,scss,md,json,yml,yaml,html}": ["prettier --write"],
};
