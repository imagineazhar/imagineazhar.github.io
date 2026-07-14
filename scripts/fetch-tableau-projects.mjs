// Fetches all public vizzes from the Tableau Public profile and writes them to
// src/app/data/tableauProjects.json. Runs automatically before `vite build`
// (see the "prebuild" script in package.json). Tableau's API sends no CORS
// headers, so this data can't be fetched from the browser — it has to be
// baked in at build time.
import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const PROFILE = "m.azhar";
const PAGE_SIZE = 50; // API maximum
const OUT_FILE = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/app/data/tableauProjects.json",
);

async function fetchPage(start) {
  const url = `https://public.tableau.com/public/apis/workbooks?profileName=${PROFILE}&start=${start}&count=${PAGE_SIZE}&visibility=NON_HIDDEN`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Tableau API responded ${res.status} for start=${start}`);
  const data = await res.json();
  if (data.error) throw new Error(`Tableau API error: ${data.error.message}`);
  return data.contents ?? [];
}

function toProject(workbook) {
  const repo = workbook.workbookRepoUrl;
  // defaultViewRepoUrl looks like "<repo>/sheets/<viewName>"
  const viewName = workbook.defaultViewRepoUrl.split("/").pop();
  return {
    title: workbook.title.replace(/\s+/g, " ").trim(),
    viewCount: workbook.viewCount,
    favorites: workbook.numberOfFavorites,
    vizUrl: `https://public.tableau.com/app/profile/${PROFILE}/viz/${repo}/${viewName}`,
    thumbnailUrl: `https://public.tableau.com/static/images/${repo.slice(0, 2)}/${repo}/${viewName}/4_3.png`,
  };
}

try {
  const workbooks = [];
  for (let start = 0; ; start += PAGE_SIZE) {
    const page = await fetchPage(start);
    workbooks.push(...page);
    if (page.length < PAGE_SIZE) break;
  }

  const payload = {
    profile: PROFILE,
    profileUrl: `https://public.tableau.com/app/profile/${PROFILE}/vizzes`,
    projects: workbooks.map(toProject),
  };
  writeFileSync(OUT_FILE, JSON.stringify(payload, null, 2) + "\n");
  console.log(`tableau: wrote ${payload.projects.length} projects to ${OUT_FILE}`);
} catch (err) {
  // Never fail the build over a network hiccup — the committed snapshot is a
  // good-enough fallback. Only fail if no snapshot exists at all.
  if (existsSync(OUT_FILE)) {
    console.warn(`tableau: fetch failed (${err.message}); keeping existing snapshot`);
  } else {
    console.error(`tableau: fetch failed and no snapshot exists: ${err.message}`);
    process.exit(1);
  }
}
