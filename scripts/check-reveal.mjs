/** Verifica che nessun contenuto resti invisibile dopo lo scroll. */

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const URL_ARG = process.argv[2] ?? "http://localhost:3000/sardegna";
const WIDTH = Number(process.argv[3] ?? 1440);

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
      m.error ? f(new Error(m.error.message)) : d(m.result);
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
    "--remote-debugging-port=9225",
    "--user-data-dir=" + process.env.TEMP + "\\qa-reveal",
    "--no-first-run",
    "about:blank",
  ],
  { stdio: "ignore" },
);

let wsUrl = null;
for (let i = 0; i < 40 && !wsUrl; i++) {
  await sleep(250);
  try {
    const r = await fetch("http://127.0.0.1:9225/json/version");
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

// Scorre tutta la pagina come farebbe una persona.
await send("Runtime.evaluate", {
  expression: `new Promise((done)=>{const s=Math.max(200,innerHeight*0.8);let y=0;(function n(){scrollTo(0,y);y+=s;y<document.body.scrollHeight?setTimeout(n,120):(scrollTo(0,0),setTimeout(done,800));})();})`,
  awaitPromise: true,
});

const out = await send("Runtime.evaluate", {
  expression: `(${() => {
    const invisible = [];

    for (const el of document.querySelectorAll("section, section *")) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      if (rect.width < 40 || rect.height < 40) continue;

      const opacity = Number(style.opacity);

      if (opacity < 0.2) {
        invisible.push({
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).replace(/\s+/g, " ").trim().slice(0, 70),
          opacity,
          text: (el.textContent ?? "").trim().slice(0, 45),
          h: Math.round(rect.height),
        });
      }
    }

    // Sezioni con altezza sospetta rispetto al contenuto visibile.
    const sections = [...document.querySelectorAll("section[id]")].map((s) => ({
      id: s.id,
      height: Math.round(s.getBoundingClientRect().height),
    }));

    return { invisible: invisible.slice(0, 20), sections };
  }})()`,
  returnByValue: true,
});

const d = out.result.value;

console.log(`\n${URL_ARG} @${WIDTH}px\n`);
console.log("Sezioni:");
d.sections.forEach((s) => console.log(`  #${s.id.padEnd(12)} ${s.height}px`));

console.log(`\nElementi ancora invisibili dopo lo scroll: ${d.invisible.length}`);
d.invisible.forEach((i) =>
  console.log(`  opacity=${i.opacity}  h=${i.h}  ${i.tag}.${i.cls}  "${i.text}"`),
);

browser.close();
chrome.kill();
