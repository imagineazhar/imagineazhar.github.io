// eslint.config.js declares globals for the TS/TSX sources only, so a Node
// script has to name the ones it uses or every line of output is a no-undef.
/* global process, console */

/**
 * Renders a still of each chart in public/viz/ into public/viz/posters/.
 *
 * These stills are the plates on the home page's interactive tier. They are
 * screenshots of the chart actually running — not artwork drawn to resemble
 * one — so a plate and the page behind it cannot disagree about what the chart
 * looks like.
 *
 * Deliberately NOT wired into `prebuild`. It drives a real Chrome and pulls
 * live observations from Open-Meteo, which is the wrong thing to put in the
 * path of every `npm run build` and of CI. Run it by hand when a chart's
 * design changes:
 *
 *   npm run posters
 *
 * The output is committed, so a build never depends on this having run.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const OUT_DIR = join(PUBLIC, "viz", "posters");

/* The plate's ratio in VizShowcase/LabShowcase (736x454), shot at 2x so the
   still holds up on a retina display without being a 4x file nobody needs. */
const WIDTH = 736;
const HEIGHT = 454;
const SCALE = 2;

/* Generous: the chart geocodes the subject, then fetches forecast and archive
   series for every city in it before it draws. This is virtual time, so it
   costs wall-clock only while the network is actually busy. */
const TIME_BUDGET_MS = 60_000;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

function findChrome() {
  const found = CHROME_CANDIDATES.find((path) => existsSync(path));
  if (!found) {
    throw new Error(
      `No Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.\nLooked in:\n  ${CHROME_CANDIDATES.join("\n  ")}`
    );
  }
  return found;
}

/**
 * The page, rewritten into a poster of itself.
 *
 * Injected rather than built into the charts: this is how the site wants a
 * still to look, and the generator repo has no business knowing that. It waits
 * on the chart's own "ready" signal — the export buttons enable only once a
 * panel has drawn — then throws away every piece of furniture except the panel
 * and lets the panel's viewBox scale it into the frame.
 *
 * `meet`, not `slice`: the three charts are a ring, a stack of strips and a
 * ranked column, and only a fit that clips nothing composes all three. Margins
 * land on the chart's own paper colour, so the still reads as a plate rather
 * than as a screenshot with bars.
 */
const POSTER_SCRIPT = `
(() => {
  const ready = () => {
    const btn = document.getElementById("downloadBtn");
    return btn && !btn.disabled;
  };

  const paper = getComputedStyle(document.getElementById("app")).backgroundColor;

  const compose = () => {
    /* The first panel that actually drew. climate-ring carries a second,
       linear panel under the ring; the ring is the chart's face. */
    const panel = [...document.querySelectorAll("svg.panel")].find(
      (svg) => svg.getBoundingClientRect().height > 0
    );
    if (!panel) return;

    panel.setAttribute("preserveAspectRatio", "xMidYMid meet");
    panel.style.cssText = "display:block;width:100%;height:100%";

    /* A mat, not a bleed. Without it the widest chart's outermost axis label
       sits exactly on the frame edge and reads as a crop rather than as a
       plate — and the plate is 330px wide on the home page, where an edge-lit
       label is the first thing to look like an accident. */
    document.documentElement.style.cssText = "margin:0;padding:0;height:100%";
    document.body.style.cssText =
      "margin:0;box-sizing:border-box;padding:3vmin;width:100vw;height:100vh;" +
      "overflow:hidden;background:" + paper;
    document.body.replaceChildren(panel);
  };

  /* Polling rather than a fixed delay: under --virtual-time-budget a timer
     costs nothing while the network is idle, so this resolves the moment the
     chart is done instead of on a guess about how long it takes. */
  const tick = () => (ready() ? compose() : setTimeout(tick, 100));
  tick();
})();
`;

function renderPoster(chrome, project, workDir) {
  const source = join(PUBLIC, project.file.replace(/^\//, ""));
  if (!existsSync(source)) throw new Error(`Missing chart file: ${source}`);

  const patched = join(workDir, `${project.slug}.html`);
  const html = readFileSync(source, "utf8");
  writeFileSync(
    patched,
    html.replace("</body>", `<script>${POSTER_SCRIPT}</script>\n</body>`),
    "utf8"
  );

  const out = join(OUT_DIR, `${project.slug}.png`);
  const url = `file:///${patched.replace(/\\/g, "/")}?${project.queryParam}=${encodeURIComponent(project.defaultSubject)}`;

  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      `--user-data-dir=${join(workDir, "profile")}`,
      `--force-device-scale-factor=${SCALE}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      `--virtual-time-budget=${TIME_BUDGET_MS}`,
      `--screenshot=${out}`,
      url,
    ],
    { stdio: ["ignore", "ignore", "pipe"] }
  );

  return out;
}

const chrome = findChrome();
const { projects } = JSON.parse(
  readFileSync(join(ROOT, "src/app/data/labProjects.json"), "utf8")
);
const workDir = mkdtempSync(join(tmpdir(), "viz-posters-"));

mkdirSync(OUT_DIR, { recursive: true });

try {
  for (const project of projects) {
    process.stdout.write(`  ${project.slug} … `);
    const out = renderPoster(chrome, project, workDir);
    console.log(`${(readFileSync(out).length / 1024).toFixed(0)} kB`);
  }
  console.log(`\n${projects.length} posters written to public/viz/posters/`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
