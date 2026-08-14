#!/usr/bin/env node
/**
 * UserPromptSubmit / SessionStart — inject standing orders every turn.
 * Grok may attach hookSpecificOutput.additionalContext to the model prompt.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

let payload = {};
try {
  payload = JSON.parse(
    await new Promise((resolve, reject) => {
      const chunks = [];
      process.stdin.setEncoding("utf8");
      process.stdin.on("data", (c) => chunks.push(c));
      process.stdin.on("end", () => resolve(chunks.join("")));
      process.stdin.on("error", reject);
    }),
  );
} catch {
  payload = {};
}

const root =
  payload.workspaceRoot ||
  payload.cwd ||
  process.env.GROK_WORKSPACE_ROOT ||
  process.cwd();

const event = String(
  process.env.GROK_HOOK_EVENT || payload.hookEventName || "",
).toLowerCase();

if (event.includes("session_start") || event.includes("sessionstart")) {
  try {
    mkdirSync(path.join(root, ".git"), { recursive: true });
    writeFileSync(
      path.join(root, ".git", "grok-hooks-alive"),
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
    /* non-fatal */
  }
}

const additionalContext = [
  "STANDING ORDERS — do not wait to be told.",
  "Obey .grok/rules/invariantes.md (INV-01 through the last INV-NN) on THIS request.",
  "They are permanent orders, not npm scripts. lint/build only check a slice.",
  "Close product work with a commit (commit skill + INV-XX: OK declaration).",
  "Never ask the user to restate these rules.",
].join(" ");

const hookEventName = event.includes("prompt")
  ? "UserPromptSubmit"
  : "SessionStart";

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName,
      additionalContext,
    },
  }),
);
process.exit(0);
