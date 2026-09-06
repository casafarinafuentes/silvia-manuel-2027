/**
 * Test end-to-end della catena di autenticazione admin, nel browser.
 *
 * Uso: node scripts/test-admin.mjs <password-corretta>
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const PASSWORD = process.argv[2];
const BASE = "http://localhost:3000";

const CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
].find((p) => existsSync(p));

let nextId = 1;

function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    const pending = new Map();

    socket.addEventListener("message", (e) => {
      const m = JSON.parse(e.data);
      if (!m.id || !pending.has(m.id)) return;
      const { resolve: d, reject: f } = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) f(new Error(m.error.message));
      else d(m.result);
    });

    socket.addEventListener("error", reject);

    socket.addEventListener("open", () =>
      resolve({
        send(method, params = {}, sessionId) {
          const id = nextId++;
          return new Promise((d, f) => {
            pending.set(id, { resolve: d, reject: f });
            socket.send(JSON.stringify({ id, method, params, sessionId }));
          });
        },
        close: () => socket.close(),
      }),
    );
  });
}

const port = 9340;

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${process.env.TEMP}/qa-admin-${Date.now()}`,
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" },
);

let wsUrl = null;
for (let i = 0; i < 40 && !wsUrl; i++) {
  await sleep(250);
  try {
    const r = await fetch(`http://127.0.0.1:${port}/json/version`);
    wsUrl = (await r.json()).webSocketDebuggerUrl;
  } catch {}
}

const browser = await connect(wsUrl);
const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });
const send = (m, p) => browser.send(m, p, sessionId);

await send("Page.enable");
await send("Runtime.enable");
await send("Network.enable");

const results = [];
const check = (name, ok, detail = "") =>
  results.push({ name, ok, detail });

async function evaluate(expression) {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return r.result.value;
}

async function goto(path) {
  await send("Page.navigate", { url: `${BASE}${path}` });
  await sleep(1800);
}

async function submitPassword(value) {
  await evaluate(`(async () => {
    const input = document.querySelector('#password');
    const setter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype, 'value').set;
    setter.call(input, ${JSON.stringify(value)});
    input.dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('form').requestSubmit();
  })()`);
  await sleep(2500);
}

/* 1. Accesso senza sessione ------------------------------------- */

await goto("/admin");
let url = await evaluate("location.pathname");
check("/admin senza sessione reindirizza al login", url === "/admin/login", url);

/* 2. Password sbagliata ----------------------------------------- */

await submitPassword("password-sbagliata");

const afterWrong = await evaluate(`({
  path: location.pathname,
  error: document.querySelector('[role=alert]')?.textContent ?? null,
  cookie: document.cookie.includes('sm_admin'),
})`);

check("password sbagliata: resta sul login", afterWrong.path === "/admin/login", afterWrong.path);
check("password sbagliata: mostra un errore", Boolean(afterWrong.error), afterWrong.error ?? "nessun messaggio");

/* Il cookie è httpOnly: non deve essere visibile da JavaScript. */
const cookies = await send("Network.getCookies", { urls: [BASE] });
const session = cookies.cookies.find((c) => c.name === "sm_admin");
check("password sbagliata: nessuna sessione creata", !session);

/* 3. Password corretta ------------------------------------------ */

await submitPassword(PASSWORD);

const afterRight = await evaluate("location.pathname");
check("password corretta: entra in /admin", afterRight === "/admin", afterRight);

const cookies2 = await send("Network.getCookies", { urls: [BASE] });
const session2 = cookies2.cookies.find((c) => c.name === "sm_admin");

check("sessione creata", Boolean(session2));
check("cookie httpOnly", Boolean(session2?.httpOnly));
check("cookie sameSite Lax", session2?.sameSite === "Lax");
check(
  "cookie non leggibile da JavaScript",
  !(await evaluate("document.cookie.includes('sm_admin')")),
);

/* 4. Manomissione della firma ------------------------------------ */

if (session2) {
  const tampered = session2.value.replace(/\.[0-9a-f]+$/, ".00deadbeef");

  await send("Network.setCookie", {
    name: "sm_admin",
    value: tampered,
    url: BASE,
    path: "/",
    httpOnly: true,
  });

  await goto("/admin");
  const tamperedPath = await evaluate("location.pathname");

  check(
    "firma manomessa: accesso rifiutato",
    tamperedPath === "/admin/login",
    tamperedPath,
  );
}

/* ---------------------------------------------------------------- */

console.log();
let failed = 0;

for (const r of results) {
  console.log(`  ${r.ok ? "PASS" : "FALLITO"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
  if (!r.ok) failed++;
}

console.log(`\n  ${results.length - failed}/${results.length} verifiche superate\n`);

browser.close();
chrome.kill();
process.exit(failed ? 1 : 0);
