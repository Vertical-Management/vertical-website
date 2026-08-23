#!/usr/bin/env node
/**
 * PreToolUse gate for git commit / dangerous git push (Vertical Management).
 * Reads Grok hook JSON from stdin; writes { decision, reason? } to stdout.
 *
 * Invariants (invariantes.md) are ORDERS to obey — not shell commands to run.
 * This gate only:
 *  - requires a written declaration that each order was obeyed (INV-XX: OK)
 *  - runs separate mechanical checks (lint/typecheck/build) as safety net
 *
 * On git commit (vertical-website only):
 *  1. Parse every **INV-XX** order from `.grok/rules/invariantes.md`
 *  2. Require commit message declares obedience for EACH id
 *  3. Block commits without -m/-F, block --no-verify
 *  4. Branch / secrets / Conventional Commits
 *  5. Mechanical quality: lint + typecheck (+ build if runtime paths staged)
 *
 * On git push: block force to main/master.
 *
 * GROK_SKIP_QUALITY_GATE=1 skips only mechanical npm scripts — never the
 * per-order obedience declaration.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

const SENSITIVE_PATH =
  /(^|[\\/])(\.env(\.|$)|.*\.pem$|.*\.key$|credentials\.json$|id_rsa$|\.npmrc$)/i;

const SECRET_LINE =
  /(?:api[_-]?key|secret|password|token|private[_-]?key|RESEND_API_KEY)\s*[=:]\s*['"]?[^\s'"]{8,}/i;

const CONVENTIONAL =
  /^(feat|fix|chore|docs|style|refactor|perf|ci|test|build|revert)(\([a-z0-9._/-]+\))?!?:\s.+/i;

/** Staged paths that require a production build (mechanical check) */
const BUILD_PATH =
  /^(src\/|public\/|next\.config|package\.json|package-lock\.json|tsconfig|tailwind\.config|postcss\.config|middleware\.|vercel\.json)/i;

const INV_FILE_REL = path.join(".grok", "rules", "invariantes.md");

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function allow(extra = {}) {
  process.stdout.write(JSON.stringify({ decision: "allow", ...extra }));
  process.exit(0);
}

function deny(reason) {
  process.stdout.write(JSON.stringify({ decision: "deny", reason }));
  process.exit(2);
}

function git(args, opts = {}) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      ...opts,
    }).trim();
  } catch (e) {
    const err = e.stderr?.toString?.() || e.message || String(e);
    throw new Error(err);
  }
}

function extractShellCommand(toolInput) {
  if (!toolInput || typeof toolInput !== "object") return "";
  return String(toolInput.command ?? toolInput.cmd ?? "");
}

function isGitCommit(cmd) {
  return /\bgit(\.exe)?\s+commit\b/i.test(cmd);
}

function isGitPush(cmd) {
  return /\bgit(\.exe)?\s+push\b/i.test(cmd);
}

function forcePushToMain(cmd) {
  const force = /(--force|--force-with-lease|-f)\b/.test(cmd);
  if (!force) return false;
  if (/\b(main|master)\b/.test(cmd)) return true;
  try {
    const branch = git(["rev-parse", "--abbrev-ref", "HEAD"]);
    if (branch === "main" || branch === "master") return true;
  } catch {
    /* ignore */
  }
  return false;
}

/**
 * Extract commit message bodies from the shell command (-m / --message / -F / --file).
 * PowerShell here-strings: -m @" ... "@
 */
function parseCommitMessages(cmd, cwd) {
  const messages = [];
  const re =
    /(?:-m|--message)(?:=|\s+)(?:"([^"]*)"|'([^']*)'|([^\s"']+))/g;
  let m;
  while ((m = re.exec(cmd)) !== null) {
    messages.push(m[1] ?? m[2] ?? m[3] ?? "");
  }
  const hs = cmd.match(/-m\s+@"([\s\S]*?)"@/);
  if (hs) messages.push(hs[1].trim());

  const fileRe =
    /(?:-F|--file)(?:=|\s+)(?:"([^"]+)"|'([^']+)'|([^\s"']+))/g;
  let fm;
  while ((fm = fileRe.exec(cmd)) !== null) {
    const rel = fm[1] ?? fm[2] ?? fm[3] ?? "";
    if (!rel) continue;
    try {
      const abs = path.isAbsolute(rel) ? rel : path.join(cwd, rel);
      messages.push(readFileSync(abs, "utf8"));
    } catch {
      deny(
        `No se pudo leer el archivo de mensaje (-F ${rel}). Usa -m con el checklist INV en el comando.`,
      );
    }
  }
  return messages;
}

function stagedFiles(cwd) {
  const out = git(["diff", "--cached", "--name-only", "--diff-filter=ACMR"], {
    cwd,
  });
  return out ? out.split(/\r?\n/).filter(Boolean) : [];
}

function runNpmScript(script, cwd) {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const r = spawnSync(npm, ["run", script], {
    cwd,
    encoding: "utf8",
    env: process.env,
    shell: process.platform === "win32",
  });
  return {
    ok: r.status === 0,
    status: r.status,
    out: `${r.stdout || ""}\n${r.stderr || ""}`.trim(),
  };
}

function loadInvariantsFile(root) {
  const p = path.join(root, INV_FILE_REL);
  if (!existsSync(p)) {
    deny(
      `Falta ${INV_FILE_REL}. No se puede commitear sin la fuente de invariantes.`,
    );
  }
  return readFileSync(p, "utf8");
}

/**
 * Parse invariant IDs from invariantes.md.
 * Only formal entries: **INV-01** (bold markdown headings in the checklist).
 * Ignores prose mentions like "INV-N+" so docs don't invent fake IDs.
 */
function parseInvariantIds(text) {
  const found = new Set();
  const re = /\*\*INV-(\d{1,3})\*\*/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    const n = String(parseInt(m[1], 10)).padStart(2, "0");
    found.add(`INV-${n}`);
  }
  return [...found].sort((a, b) => {
    const na = parseInt(a.slice(4), 10);
    const nb = parseInt(b.slice(4), 10);
    return na - nb;
  });
}

/**
 * Each INV-XX must appear with an affirmative status in the message.
 * Accepted per id (case-insensitive):
 *   INV-01: OK | INV-01=OK | INV-01 OK | [x] INV-01 | INV-01 ✓
 * Status tokens: ok | yes | pass | checked | done | ✓ | ✅
 */
function missingInvariantAttestations(message, ids) {
  const missing = [];
  const status = "(?:ok|yes|pass|checked|done|✓|✅)";
  for (const id of ids) {
    const num = id.replace(/^INV-0?/, ""); // flexible 01 vs 1
    const idAlt = `INV-0*${parseInt(num, 10)}`;
    const patterns = [
      new RegExp(
        `\\bINV-0*${parseInt(num, 10)}\\b\\s*[:=]\\s*${status}\\b`,
        "i",
      ),
      new RegExp(`\\bINV-0*${parseInt(num, 10)}\\b\\s+${status}\\b`, "i"),
      new RegExp(
        `\\[[xX✓✅]\\]\\s*INV-0*${parseInt(num, 10)}\\b`,
        "i",
      ),
      new RegExp(
        `\\bINV-0*${parseInt(num, 10)}\\b\\s*[✓✅]`,
        "i",
      ),
    ];
    if (!patterns.some((p) => p.test(message))) {
      missing.push(id);
    }
  }
  return missing;
}

function formatInvChecklistHelp(ids, invText) {
  const lines = ids.map((id) => `${id}: OK`);
  return [
    "Commit bloqueado: las invariantes son ORDENES a obedecer (no comandos a ejecutar).",
    "Debes declarar en el mensaje que obedeciste CADA orden de " + INV_FILE_REL + ".",
    "",
    "Formato (declaracion de obediencia):",
    "",
    "feat(scope): resumen",
    "",
    "Obedecidas:",
    ...lines,
    "",
    "Solo la palabra Inv-OK NO basta. Marca OK solo si de verdad obedeciste esa orden.",
    "npm run lint/build no 'ejecuta' una invariante: solo ayuda a comprobar parte del trabajo.",
    "",
    "--- Ordenes actuales (invariantes.md) ---",
    invText.trim(),
  ].join("\n");
}

function needsBuild(files) {
  if (!files.length) return true; // commit -a / unknown → build to be safe
  return files.some((f) => BUILD_PATH.test(f.replace(/\\/g, "/")));
}

// ── main ───────────────────────────────────────────────────────────
const raw = readStdin();
let payload;
try {
  payload = JSON.parse(raw || "{}");
} catch {
  // Fail closed for commits if we cannot parse — but we don't know yet.
  allow();
}

const toolName = String(payload.toolName || "");
const cmd = extractShellCommand(payload.toolInput);

const isShell =
  /run_terminal_command|Bash|Shell|shell/i.test(toolName) || !toolName;
if (!isShell || !cmd) allow();

const cwd =
  payload.cwd ||
  payload.workspaceRoot ||
  process.env.GROK_WORKSPACE_ROOT ||
  process.cwd();

function isVerticalRepo(root) {
  try {
    const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
    if (pkg?.name === "vertical-website") return true;
  } catch {
    /* fall through */
  }
  try {
    readFileSync(path.join(root, INV_FILE_REL), "utf8");
    return true;
  } catch {
    return false;
  }
}

if (!isVerticalRepo(cwd)) allow();

// Dangerous force-push
if (isGitPush(cmd) && forcePushToMain(cmd)) {
  deny(
    "Bloqueado: force push a main/master. Usa una rama de feature o pide override consciente.",
  );
}

if (!isGitCommit(cmd)) allow();

// Block bypass flags on the commit command itself
if (/(^|\s)(--no-verify|-n)(\s|$)/.test(cmd)) {
  deny(
    "Commit bloqueado: no uses --no-verify / -n. Debe quedar constancia de obediencia a las ordenes (invariantes).",
  );
}

// ── invariantes.md = source of truth ───────────────────────────────
const invText = loadInvariantsFile(cwd);
const invIds = parseInvariantIds(invText);
if (!invIds.length) {
  deny(
    `${INV_FILE_REL} no define ningún INV-XX parseable. Añade entradas **INV-01** …`,
  );
}

const messagesForInv = parseCommitMessages(cmd, cwd);
if (!messagesForInv.length) {
  deny(
    [
      "Commit bloqueado: el mensaje debe ir con -m (o -F) para declarar obediencia a las ordenes (invariantes).",
      "No uses un editor interactivo sin -m.",
      "",
      formatInvChecklistHelp(invIds, invText),
    ].join("\n"),
  );
}

const fullMsg = messagesForInv.join("\n");
const missing = missingInvariantAttestations(fullMsg, invIds);
if (missing.length) {
  deny(
    [
      `Falta declarar obediencia a estas ordenes: ${missing.join(", ")}`,
      `(ordenes en ${INV_FILE_REL}; todas requeridas: ${invIds.join(", ")})`,
      "",
      formatInvChecklistHelp(invIds, invText),
    ].join("\n"),
  );
}

// Optional global token still allowed as extra, but never as substitute
// (already enforced above)

// ── branch guard ───────────────────────────────────────────────────
let branch = "";
try {
  branch = git(["rev-parse", "--abbrev-ref", "HEAD"], { cwd });
} catch (e) {
  deny(`No se pudo leer la rama actual: ${e.message}`);
}

if (
  (branch === "main" || branch === "master") &&
  process.env.GROK_ALLOW_MAIN_COMMIT !== "1"
) {
  deny(
    `Commit bloqueado en rama "${branch}". Crea una feature branch o exporta GROK_ALLOW_MAIN_COMMIT=1 si es intencional.`,
  );
}

// ── staged sensitive paths ─────────────────────────────────────────
let files = [];
try {
  files = stagedFiles(cwd);
} catch (e) {
  deny(`No se pudo listar el index: ${e.message}`);
}

const badPaths = files.filter((f) => SENSITIVE_PATH.test(f));
if (badPaths.length) {
  deny(
    `Archivos sensibles en staging (quita del index): ${badPaths.join(", ")}`,
  );
}

// ── staged diff secret scan ────────────────────────────────────────
try {
  const diff = git(["diff", "--cached", "--unified=0", "--", ...files], {
    cwd,
    maxBuffer: 8 * 1024 * 1024,
  });
  const lines = diff
    .split(/\r?\n/)
    .filter((l) => l.startsWith("+") && !l.startsWith("+++"));
  for (const line of lines) {
    if (
      SECRET_LINE.test(line) &&
      !/example|placeholder|your[_-]?key|changeme/i.test(line)
    ) {
      deny(
        "Posible secreto en el diff staged (api key / token / password). Revisa el index antes de commitear.",
      );
    }
  }
} catch {
  /* empty / binary */
}

// ── conventional commit subject ────────────────────────────────────
const subject = messagesForInv[0].split(/\r?\n/)[0].trim();
if (subject && !CONVENTIONAL.test(subject)) {
  deny(
    `Mensaje no sigue Conventional Commits: "${subject}". Usa p.ej. feat(scope): resumen`,
  );
}

// ── quality gate (lint / typecheck / build) ────────────────────────
if (process.env.GROK_SKIP_QUALITY_GATE === "1") {
  // Still allowed only after full INV attestation above.
  allow();
}

const pkg = path.join(cwd, "package.json");
try {
  readFileSync(pkg, "utf8");
} catch {
  allow();
}

// Mechanical checks (not "running" invariants — safety net for a buildable tree)
const lint = runNpmScript("lint", cwd);
if (!lint.ok) {
  const tail = lint.out.split(/\r?\n/).slice(-40).join("\n");
  deny(
    `Comprobacion mecanica: npm run lint fallo (exit ${lint.status}). El arbol no esta listo para commit.\n${tail}`,
  );
}

const tc = runNpmScript("typecheck", cwd);
if (!tc.ok) {
  const tail = tc.out.split(/\r?\n/).slice(-40).join("\n");
  deny(
    `Comprobacion mecanica: npm run typecheck fallo (exit ${tc.status}). El arbol no esta listo para commit.\n${tail}`,
  );
}

if (needsBuild(files)) {
  const build = runNpmScript("build", cwd);
  if (!build.ok) {
    const tail = build.out.split(/\r?\n/).slice(-50).join("\n");
    deny(
      `Comprobacion mecanica: npm run build fallo (exit ${build.status}). Corrige antes de commit.\n${tail}`,
    );
  }
}

allow();
