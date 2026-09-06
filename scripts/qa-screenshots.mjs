/**
 * QA visivo automatizzato.
 *
 * Pilota Chrome headless via DevTools Protocol per catturare le pagine
 * ai viewport richiesti e raccogliere errori di console, richieste
 * fallite e overflow orizzontali.
 *
 * Uso:  node scripts/qa-screenshots.mjs [baseUrl] [outDir]
 *
 * Nessuna dipendenza: usa la WebSocket nativa di Node 24.
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = process.argv[3] ?? join(process.cwd(), ".qa");

const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];

const VIEWPORTS = [
  { name: "360", width: 360, height: 800, mobile: true },
  { name: "390", width: 390, height: 844, mobile: true },
  { name: "430", width: 430, height: 932, mobile: true },
  { name: "768", width: 768, height: 1024, mobile: false },
  { name: "1024", width: 1024, height: 768, mobile: false },
  { name: "1280", width: 1280, height: 800, mobile: false },
  { name: "1440", width: 1440, height: 900, mobile: false },
];

const PAGES = [
  { name: "home", path: "/" },
  { name: "matrimonio", path: "/matrimonio" },
  { name: "rsvp", path: "/rsvp" },
  { name: "hotel", path: "/hotel" },
  { name: "sardegna", path: "/sardegna" },
];

/* ------------------------------------------------------------------ */

function findChrome() {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!found) throw new Error("Chrome non trovato.");
  return found;
}

let nextId = 1;

/** Client CDP minimale sopra la WebSocket nativa. */
function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    const pending = new Map();
    const listeners = new Map();

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (message.id && pending.has(message.id)) {
        const { resolve: done, reject: fail } = pending.get(message.id);
        pending.delete(message.id);

        if (message.error) fail(new Error(message.error.message));
        else done(message.result);
        return;
      }

      const handlers = listeners.get(message.method);
      if (handlers) handlers.forEach((fn) => fn(message.params));
    });

    socket.addEventListener("error", reject);

    socket.addEventListener("open", () => {
      resolve({
        send(method, params = {}, sessionId) {
          const id = nextId++;

          return new Promise((done, fail) => {
            pending.set(id, { resolve: done, reject: fail });
            socket.send(JSON.stringify({ id, method, params, sessionId }));
          });
        },
        on(method, handler) {
          if (!listeners.has(method)) listeners.set(method, []);
          listeners.get(method).push(handler);
        },
        close: () => socket.close(),
      });
    });
  });
}

/* ------------------------------------------------------------------ */

async function main() {
  await mkdir(OUT, { recursive: true });

  const userDataDir = join(OUT, ".chrome-profile");

  const chrome = spawn(
    findChrome(),
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--remote-debugging-port=9222",
      `--user-data-dir=${userDataDir}`,
      "--no-first-run",
      "--no-default-browser-check",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  // Attende che l'endpoint DevTools risponda.
  let wsUrl = null;

  for (let attempt = 0; attempt < 40 && !wsUrl; attempt++) {
    await sleep(250);

    try {
      const response = await fetch("http://127.0.0.1:9222/json/version");
      wsUrl = (await response.json()).webSocketDebuggerUrl;
    } catch {
      /* non ancora pronto */
    }
  }

  if (!wsUrl) throw new Error("DevTools non raggiungibile.");

  const browser = await connect(wsUrl);
  const report = [];

  try {
    for (const page of PAGES) {
      for (const viewport of VIEWPORTS) {
        const result = await capture(browser, page, viewport);
        report.push(result);

        const issues = [
          result.overflow ? `overflow ${result.scrollWidth}px` : null,
          result.consoleErrors.length
            ? `${result.consoleErrors.length} errori console`
            : null,
          result.failedRequests.length
            ? `${result.failedRequests.length} richieste fallite`
            : null,
        ].filter(Boolean);

        console.log(
          `  ${page.name.padEnd(11)} @${viewport.name.padEnd(5)} ` +
            `${String(result.height).padStart(6)}px  ` +
            (issues.length ? `⚠ ${issues.join(", ")}` : "ok"),
        );
      }
    }
  } finally {
    await writeFile(
      join(OUT, "report.json"),
      JSON.stringify(report, null, 2),
      "utf8",
    );

    browser.close();
    chrome.kill();
  }

  /* Riepilogo dei problemi ------------------------------------------ */

  const overflows = report.filter((r) => r.overflow);
  const errors = report.filter((r) => r.consoleErrors.length);
  const failed = report.filter((r) => r.failedRequests.length);

  console.log("\n────────────────────────── RIEPILOGO ──────────────────────────");

  if (!overflows.length && !errors.length && !failed.length) {
    console.log("Nessun overflow, nessun errore di console, nessun 404.");
  }

  for (const item of overflows) {
    console.log(
      `OVERFLOW  ${item.page} @${item.viewport}: ` +
        `scrollWidth ${item.scrollWidth} > ${item.width}`,
    );
  }

  for (const item of errors) {
    console.log(`CONSOLE   ${item.page} @${item.viewport}:`);
    item.consoleErrors.forEach((e) => console.log(`            ${e}`));
  }

  const uniqueFailed = new Set(
    failed.flatMap((item) => item.failedRequests),
  );

  for (const url of uniqueFailed) {
    console.log(`RICHIESTA FALLITA  ${url}`);
  }

  console.log(`\nScreenshot in: ${OUT}\n`);
}

async function capture(browser, page, viewport) {
  const { targetId } = await browser.send("Target.createTarget", {
    url: "about:blank",
  });

  const { sessionId } = await browser.send("Target.attachToTarget", {
    targetId,
    flatten: true,
  });

  const send = (method, params) => browser.send(method, params, sessionId);

  const consoleErrors = [];
  const failedRequests = [];

  browser.on("Runtime.consoleAPICalled", (params) => {
    if (params.type === "error") {
      consoleErrors.push(
        params.args
          .map((a) => a.value ?? a.description ?? a.type)
          .join(" ")
          .slice(0, 300),
      );
    }
  });

  browser.on("Runtime.exceptionThrown", (params) => {
    consoleErrors.push(
      (params.exceptionDetails?.exception?.description ??
        params.exceptionDetails?.text ??
        "eccezione").slice(0, 300),
    );
  });

  browser.on("Network.responseReceived", (params) => {
    if (params.response.status >= 400) {
      failedRequests.push(`${params.response.status} ${params.response.url}`);
    }
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  await send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });

  await send("Page.navigate", { url: `${BASE}${page.path}` });

  // Attende la fine del caricamento, poi scorre tutta la pagina per
  // far partire lazy loading e reveal on scroll.
  await sleep(2500);

  await send("Runtime.evaluate", {
    expression: `
      new Promise((done) => {
        const step = Math.max(200, window.innerHeight * 0.8);
        let y = 0;

        function next() {
          window.scrollTo(0, y);
          y += step;

          if (y < document.body.scrollHeight) {
            setTimeout(next, 120);
          } else {
            window.scrollTo(0, 0);
            setTimeout(done, 600);
          }
        }

        next();
      })
    `,
    awaitPromise: true,
    returnByValue: true,
  });

  const metrics = await send("Runtime.evaluate", {
    expression: `(${() => {
      const doc = document.documentElement;

      // Trova gli elementi che sporgono oltre il bordo destro.
      const culprits = [];

      if (doc.scrollWidth > doc.clientWidth) {
        for (const el of document.querySelectorAll("*")) {
          const rect = el.getBoundingClientRect();

          if (rect.right > doc.clientWidth + 1 && rect.width > 0) {
            culprits.push(
              `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} right=${Math.round(rect.right)}`,
            );
          }

          if (culprits.length >= 5) break;
        }
      }

      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        height: doc.scrollHeight,
        culprits,
      };
    }})()`,
    returnByValue: true,
  });

  const data = metrics.result.value;

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
  });

  await writeFile(
    join(OUT, `${page.name}-${viewport.name}.png`),
    Buffer.from(shot.data, "base64"),
  );

  await browser.send("Target.closeTarget", { targetId });

  return {
    page: page.name,
    viewport: viewport.name,
    width: viewport.width,
    scrollWidth: data.scrollWidth,
    height: data.height,
    overflow: data.scrollWidth > data.clientWidth + 1,
    culprits: data.culprits,
    consoleErrors,
    failedRequests,
  };
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
