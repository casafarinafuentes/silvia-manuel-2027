/**
 * Screenshot di una singola sezione, a dimensione leggibile.
 *
 * Uso: node scripts/shot-section.mjs <url> <selettore> <width> <output.png>
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { setTimeout as sleep } from "node:timers/promises";

const [, , URL_ARG, SELECTOR, WIDTH_ARG, OUT] = process.argv;
const WIDTH = Number(WIDTH_ARG ?? 1440);

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

const port = 9230 + Math.floor(Math.random() * 60);

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${process.env.TEMP}/qa-shot-${port}`,
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
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH, height: 900, deviceScaleFactor: 1, mobile: WIDTH < 768,
});
await send("Page.navigate", { url: URL_ARG });
await sleep(2500);

// Scorre tutto per far scattare lazy loading e reveal, poi torna su.
await send("Runtime.evaluate", {
  expression: `new Promise((done)=>{const s=Math.max(200,innerHeight*0.8);let y=0;(function n(){scrollTo(0,y);y+=s;y<document.body.scrollHeight?setTimeout(n,110):(scrollTo(0,0),setTimeout(done,700));})();})`,
  awaitPromise: true,
});

const box = await send("Runtime.evaluate", {
  expression: `(() => {
    const el = document.querySelector(${JSON.stringify(SELECTOR)});
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height };
  })()`,
  returnByValue: true,
});

const clip = box.result.value;

if (!clip) {
  console.error(`Selettore non trovato: ${SELECTOR}`);
  browser.close();
  chrome.kill();
  process.exit(1);
}

const shot = await send("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: true,
  clip: { ...clip, scale: 1 },
});

await writeFile(OUT, Buffer.from(shot.data, "base64"));
console.log(`${OUT}  ${Math.round(clip.width)}x${Math.round(clip.height)}`);

browser.close();
chrome.kill();
