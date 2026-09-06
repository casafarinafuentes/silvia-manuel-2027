/** Esperimento: misura scrollWidth prima e dopo aver tolto i sottoalberi fixed. */

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

const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--remote-debugging-port=9224",
    "--user-data-dir=" + process.env.TEMP + "\\qa-probe",
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" },
);

let wsUrl = null;
for (let i = 0; i < 40 && !wsUrl; i++) {
  await sleep(250);
  try {
    const r = await fetch("http://127.0.0.1:9224/json/version");
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
  width: WIDTH, height: 800, deviceScaleFactor: 1, mobile: true,
});
await send("Page.navigate", { url: URL_ARG });
await sleep(3000);

const out = await send("Runtime.evaluate", {
  expression: `(${() => {
    const doc = document.documentElement;
    const before = doc.scrollWidth;

    const fixed = [...document.querySelectorAll("body *")]
      .filter((el) => getComputedStyle(el).position === "fixed");

    const parked = fixed.map((el) => [el, el.parentNode, el.nextSibling]);
    parked.forEach(([el]) => el.remove());

    const withoutFixed = doc.scrollWidth;

    parked.forEach(([el, parent, next]) => parent.insertBefore(el, next));

    // Ora cerca il colpevole tra i soli elementi in flusso normale.
    const limit = doc.clientWidth;
    const culprits = [];

    for (const el of document.querySelectorAll("body *")) {
      const style = getComputedStyle(el);
      if (style.position === "fixed" || el.closest("[data-fixed-root]")) continue;

      let node = el, insideFixed = false;
      while (node && node !== document.body) {
        if (getComputedStyle(node).position === "fixed") { insideFixed = true; break; }
        node = node.parentElement;
      }
      if (insideFixed) continue;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0) continue;

      if (rect.right > limit + 1) {
        culprits.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).replace(/\\s+/g, " ").trim().slice(0, 80),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        });
      }
    }

    return {
      before,
      withoutFixed,
      clientWidth: limit,
      fixedCount: fixed.length,
      culprits: culprits.sort((a, b) => b.right - a.right).slice(0, 10),
    };
  }})()`,
  returnByValue: true,
});

const d = out.result.value;

console.log(`\n${URL_ARG} @${WIDTH}px`);
console.log(`  clientWidth          : ${d.clientWidth}`);
console.log(`  scrollWidth          : ${d.before}`);
console.log(`  scrollWidth senza fixed: ${d.withoutFixed}   (${d.fixedCount} elementi fixed)`);
console.log(`\n  Colpevoli NON fixed:`);

if (!d.culprits.length) console.log("    nessuno");
else d.culprits.forEach((c) =>
  console.log(`    right=${String(c.right).padStart(5)} w=${String(c.width).padStart(5)}  ${c.tag}  ${c.cls}`),
);

browser.close();
chrome.kill();
