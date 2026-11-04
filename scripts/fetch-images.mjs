#!/usr/bin/env node
/**
 * Downloads the existing website's images into /public/images so they are served locally.
 * Run on a machine with normal internet access:  npm run fetch-images
 *
 * The source list is parsed from src/data/images.ts so there is a single source of truth.
 */
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/data/images.ts"), "utf8");
const baseMatch = source.match(/const base = "([^"]+)"/);
const base = baseMatch ? baseMatch[1] : "";

const pairs = [];
const re = /src:\s*"([^"]+)",\s*remote:\s*(?:`\$\{base\}([^`]+)`|"([^"]+)")/g;
let m;
while ((m = re.exec(source))) {
  pairs.push({ local: m[1], remote: m[3] ?? base + m[2] });
}

// Prefer the full-size original when the WordPress "-WxH" resized variant is listed.
const candidates = (url) => {
  const full = url.replace(/-\d+x\d+(\.\w+)$/, "$1");
  return full !== url ? [full, url] : [url];
};

let ok = 0;
let failed = 0;
for (const { local, remote } of pairs) {
  const dest = join(root, "public", local);
  mkdirSync(dirname(dest), { recursive: true });
  let saved = false;
  for (const url of candidates(remote)) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (CMI site asset fetch)" } });
      if (!res.ok) continue;
      writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      console.log(`✔ ${local}  <-  ${url}`);
      saved = true;
      ok++;
      break;
    } catch {
      /* try next candidate */
    }
  }
  if (!saved) {
    failed++;
    console.warn(`✘ ${local} could not be downloaded (${remote})`);
  }
}

if (!existsSync(join(root, "public/images/logo.png"))) {
  console.warn("Note: logo not downloaded; the site falls back to its text wordmark.");
}
console.log(`\nDone: ${ok} downloaded, ${failed} failed.`);
process.exit(failed ? 1 : 0);
