#!/usr/bin/env node
/**
 * SessionStart marker — proves project hooks are loaded and executing.
 * Writes .git/grok-hooks-alive with a timestamp.
 */
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import path from "node:path";

let payload = {};
try {
  payload = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  /* optional stdin */
}

const root =
  payload.workspaceRoot ||
  payload.cwd ||
  process.env.GROK_WORKSPACE_ROOT ||
  process.cwd();

const dir = path.join(root, ".git");
try {
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    path.join(dir, "grok-hooks-alive"),
    JSON.stringify(
      {
        at: new Date().toISOString(),
        event: process.env.GROK_HOOK_EVENT || "session_start",
        root,
      },
      null,
      2,
    ) + "\n",
  );
} catch {
  /* non-fatal for SessionStart */
}
process.exit(0);
