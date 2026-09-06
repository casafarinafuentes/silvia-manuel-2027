/**
 * Diagnostica overflow orizzontale.
 *
 * Uso: node scripts/find-overflow.mjs <url> <width>
 *
 * Elenca gli elementi che sporgono oltre il bordo destro, ignorando
 * quelli in position:fixed (che in emulazione mobile si dimensionano
 * sul layout viewport e sono quindi conseguenza, non causa).
 */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const URL_ARG = process.argv[2] ?? "http://localhost:3000/";
const WIDTH = Number(process.argv[3] ?? 360);

const CHROME = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
].find((p) => existsSync(p));

let nextId = 1;

function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    const pending = new Map();

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !pending.has(message.id)) return;

      const { resolve: done, reject: fail } = pending.get(message.id);
      pending.delete(message.id);

      if (message.error) fail(new Error(message.error.message));
      else done(message.result);
    });

    socket.addEventListener("error", reject);

    socket.addEventListener("open", () =>
      resolve({
        send(method, params = {}, sessionId) {
          const id = nextId++;
          return new Promise((done, fail) => {
            pending.set(id, { resolve: done, reject: fail });
            socket.send(JSON.stringify({ id, method, params, sessionId }));
          });
        },
        close: () => socket.close(),
      }),
    );
  });
}

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--remote-debugging-port=9223",
    "--user-data-dir=" + process.env.TEMP + "\\qa-overflow",
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" },
);

let wsUrl = null;

for (let i = 0; i < 40 && !wsUrl; i++) {
  await sleep(250);
  try {
    const r = await fetch("http://127.0.0.1:9223/json/version");
    wsUrl = (await r.json()).webSocketDebuggerUrl;
  } catch {}
}

const browser = await connect(wsUrl);

const { targetId } = await browser.send("Target.createTarget", {
  url: "about:blank",
});

const { sessionId } = await browser.send("Target.attachToTarget", {
  targetId,
  flatten: true,
});

const send = (m, p) => browser.send(m, p, sessionId);

await send("Page.enable");
await send("Runtime.enable");

await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: 800,
  deviceScaleFactor: 1,
  mobile: true,
});

await send("Page.navigate", { url: URL_ARG });
await sleep(3000);

const result = await send("Runtime.evaluate", {
  expression: `(${() => {
    const doc = document.documentElement;
    const limit = doc.clientWidth;
    const found = [];

    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);

      // Gli elementi fixed si dimensionano sul layout viewport:
      // riflettono l'overflow invece di causarlo.
      if (style.position === "fixed") continue;
      if (style.display === "none" || style.visibility === "hidden") continue;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      if (rect.right > limit + 1 || rect.left < -1) {
        found.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).replace(/\\s+/g, " ").trim().slice(0, 90),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          overflowX: style.overflowX,
        });
      }
    }

    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: limit,
      // I più sporgenti per primi.
      found: found.sort((a, b) => b.right - a.right).slice(0, 15),
    };
  }})()`,
  returnByValue: true,
});

const data = result.result.value;

console.log(
  `\n${URL_ARG} @${WIDTH}px — scrollWidth ${data.scrollWidth}, clientWidth ${data.clientWidth}\n`,
);

if (data.found.length === 0) {
  console.log("  Nessun elemento non-fixed sporge.");
} else {
  for (const item of data.found) {
    console.log(
      `  right=${String(item.right).padStart(5)} left=${String(item.left).padStart(5)} w=${String(item.width).padStart(5)}  ${item.tag}  ${item.cls}`,
    );
  }
}

browser.close();
chrome.kill();
