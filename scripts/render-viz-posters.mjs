// eslint.config.js declares globals for the TS/TSX sources only, so a Node
// script has to name the ones it uses or every line of output is a no-undef.
/* global process, console */

/**
 * Renders a still of each chart in public/viz/ into public/viz/posters/ — the
 * plates on the home page's interactive tier.
 *
 * Deliberately NOT wired into `prebuild`: it drives a real Chrome and pulls
 * live observations from Open-Meteo, which has no business in the path of every
 * build and of CI. Run `npm run posters` by hand when a chart's design changes.
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

// The plate's ratio in VizShowcase/LabShowcase, shot at 2x for retina.
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
 * still to look, and the generator repo has no business knowing that. Waits on
 * the chart's own ready signal — the export buttons enable only once a panel
 * has drawn — then strips every piece of furniture except the panel.
 *
 * `meet`, not `slice`: the charts are a ring, a stack of strips and a ranked
 * column, and only a fit that clips nothing composes all three.
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

    /* A mat, not a bleed. Without the padding the widest chart's outermost axis
       label sits on the frame edge and reads as a crop — and the plate is 330px
       wide on the home page, where that looks like an accident. */
    document.documentElement.style.cssText = "margin:0;padding:0;height:100%";
    document.body.style.cssText =
      "margin:0;box-sizing:border-box;padding:3vmin;width:100vw;height:100vh;" +
      "overflow:hidden;background:" + paper;
    document.body.replaceChildren(panel);
  };

  /* Polling rather than a fixed delay: under --virtual-time-budget a timer
     costs nothing while the network is idle, so this resolves the moment the
     chart is done instead of on a guess. */
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
