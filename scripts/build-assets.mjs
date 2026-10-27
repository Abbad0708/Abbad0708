// Generates every SVG under assets/{dark,light}/ for the profile README: section and project
// headings, flat contact / metric / tech badges, stack logos (vendored brand icons plus drawn
// glyphs) and the two status emoji. Run: node scripts/build-assets.mjs
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = (rel, svg) => {
  const file = join(root, "assets", DIR, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + "\n");
};

const THEMES = {
  dark: {
    bg: "#0b1220", bg2: "#111a2e", bg3: "#172036", line: "#1e293b",
    teal: "#14b8a6", cyan: "#22d3ee", text: "#e5eaf3", fg: "#e5eaf3", muted: "#8b98b1",
  },
  light: {
    bg: "#ffffff", bg2: "#f1f5f9", bg3: "#e2e8f0", line: "#cbd5e1",
    teal: "#0d9488", cyan: "#0891b2", text: "#0f172a", fg: "#334155", muted: "#64748b",
  },
};
let C = THEMES.dark; // current palette while building
let DIR = "dark";     // assets/<DIR>/...
const SANS = `ui-sans-serif,-apple-system,'Segoe UI',Inter,Roboto,Helvetica,Arial,sans-serif`;
const MONO = `ui-monospace,'Cascadia Code','Fira Code',Consolas,'Liberation Mono',monospace`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const build = () => {
const INK = "#06201e";

/* -------------------------------------------------------------- headings */
// Section headings: one stroked line icon in an accent colour beside bold 24px text. 42px tall.
const AMBER = "#F59E0B";
const heading = (slug, title, color, icon) => {
  const w = 42 + Math.ceil(title.length * 24 * 0.56) + 10;
  out(`headings/${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="42" viewBox="0 0 ${w} 42" fill="none" role="img" aria-label="${esc(title)}"><g transform="translate(2.0,6.0) scale(1.25)" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${icon}</g><text x="42" y="29.4" font-family="'Segoe UI', Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="${C.text}">${esc(title)}</text></svg>`);
};
heading("about", "About", "#14B8A6", `<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.2 4.9-4.9 2.2 2.2-4.9z"/><circle cx="12" cy="12" r="0.6" fill="#14B8A6" stroke="none"/>`);
heading("stack", "Tech Stack", "#6366F1", `<path d="M12 3 21 8 12 13 3 8Z"/><path d="M3 12 12 17 21 12"/><path d="M3 16 12 21 21 16"/>`);
heading("work", "Featured Work", AMBER, `<path d="M12 2C13 8 16 11 22 12 16 13 13 16 12 22 11 16 8 13 2 12 8 11 11 8 12 2Z" fill="${AMBER}" stroke="none"/>`);

// Flat contact badges in the reference profile's exact style: 20px, square corners, solid brand
// colour, white logo and Verdana text; a 28px uppercase call-to-action for the bottom.
{
  const LI = "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
  const GM = "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z";
  const FONT = "Verdana,Geneva,'DejaVu Sans',sans-serif";
  const flat = (slug, label, color, path, perChar) => {
    const tl = Math.round(label.length * perChar), w = 24 + tl + 8;
    out(`badges/b-${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="20" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title><rect width="${w}" height="20" fill="${color}"/><g transform="translate(6,3.0) scale(0.5833)" fill="#fff"><path d="${path}"/></g><text x="24" y="13.7" fill="#fff" font-family="${FONT}" font-size="11" textLength="${tl}" lengthAdjust="spacingAndGlyphs">${esc(label)}</text></svg>`);
  };
  flat("linkedin", "LinkedIn", "#0A66C2", LI, 6.125);
  flat("email", "m.abbad0708@gmail.com", "#EA4335", GM, 7.3);
  const cta = "MESSAGE ME ON LINKEDIN", ctl = 190, cw = 41 + ctl + 16;
  out(`badges/b-cta.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="28" role="img" aria-label="${cta}"><title>${cta}</title><rect width="${cw}" height="28" fill="#0A66C2"/><g transform="translate(14,5.0) scale(0.7500)" fill="#fff"><path d="${LI}"/></g><text x="41" y="17.7" fill="#fff" font-family="${FONT}" font-size="11" font-weight="700" textLength="${ctl}" lengthAdjust="spacingAndGlyphs">${cta}</text></svg>`);
}

/* ------------------------------------------------------------ tech tiles */
// Original pictograms for each language / tool (24-unit grid), no wordmarks.
const HEX = "M12 2.5l8.2 4.7v9.6L12 21.5l-8.2-4.7V7.2z";
const TECH = {
  js: `<path d="${HEX}" fill="#f7df1e"/><path d="M9.6 7.2c-1.7 0-2.1.7-2.1 1.9v1.5c0 .9-.5 1.3-1.4 1.4.9.1 1.4.5 1.4 1.4v1.5c0 1.2.4 1.9 2.1 1.9M14.4 7.2c1.7 0 2.1.7 2.1 1.9v1.5c0 .9.5 1.3 1.4 1.4-.9.1-1.4.5-1.4 1.4v1.5c0 1.2-.4 1.9-2.1 1.9" fill="none" stroke="#1f1a00" stroke-width="1.7" stroke-linecap="round"/>`,
  node: `<path d="${HEX}" fill="none" stroke="#5fa04e" stroke-width="1.9" stroke-linejoin="round"/><path d="M12 8.2l-3.6 7.2M12 8.2l3.6 7.2M8.4 15.4h7.2" stroke="#5fa04e" stroke-width="1.4"/><g fill="#86efac"><circle cx="12" cy="8.2" r="2"/><circle cx="8.4" cy="15.4" r="2"/><circle cx="15.6" cy="15.4" r="2"/></g>`,
  html: `<path d="M4 3h16l-1.4 15.6L12 21l-6.6-2.4z" fill="#e34f26"/><path d="M12 4.5v15" stroke="#ff6d3f" stroke-width="0.8" opacity="0.5"/><path d="M10 8.5L7.4 11.5 10 14.5M14 8.5l2.6 3-2.6 3" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  css: `<path d="M4 3h16l-1.4 15.6L12 21l-6.6-2.4z" fill="#2965f1"/><path d="M8 8.3h8M8 11.5h6.5M8 14.7h4.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/><circle cx="15.5" cy="14.7" r="1.4" fill="#93c5fd"/>`,
  bash: `<rect x="2.5" y="3.5" width="19" height="17" rx="3" fill="#1f2937"/><rect x="2.5" y="3.5" width="19" height="4.5" rx="2.2" fill="#374151"/><path d="M6 11.2l3.2 2.6L6 16.4M11 16.6h5.5" fill="none" stroke="#4eaa25" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
  powershell: `<path d="M6.2 4h15.3l-3.7 16H2.5z" fill="#5391fe"/><path d="M8.6 9l4.2 3-4.2 3M12.8 16h4.2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  express: `<circle cx="4.5" cy="12" r="2.3" fill="${C.fg}"/><circle cx="19.5" cy="12" r="2.3" fill="${C.fg}"/><path d="M6.8 12h3.4l1.8-4 2 8 1.8-4h1.4" fill="none" stroke="${C.fg}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  sqlite: `<path d="M4.5 6.5v11c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2v-11z" fill="#38bdf8"/><path d="M4.5 12.2c0 1.8 3.4 3.2 7.5 3.2s7.5-1.4 7.5-3.2" fill="none" stroke="#0369a1" stroke-width="1.3"/><ellipse cx="12" cy="6.5" rx="7.5" ry="3.1" fill="#bae6fd"/>`,
  npm: `<path d="M12 2.8l8.5 4.4v9.6L12 21.2l-8.5-4.4V7.2z" fill="#b91c1c"/><path d="M12 2.8L3.5 7.2 12 11.6l8.5-4.4z" fill="#ef4444"/><path d="M12 11.6v9.6" stroke="#7f1d1d" stroke-width="1.3"/><path d="M7.5 5.1l8.5 4.4" stroke="#fecaca" stroke-width="1.2" opacity="0.8"/>`,
  api: `<path d="M8 5.2c-2 0-2.5.7-2.5 2.5v2c0 1-.6 1.7-1.6 2.3 1 .6 1.6 1.3 1.6 2.3v2c0 1.8.5 2.5 2.5 2.5M16 5.2c2 0 2.5.7 2.5 2.5v2c0 1 .6 1.7 1.6 2.3-1 .6-1.6 1.3-1.6 2.3v2c0 1.8-.5 2.5-2.5 2.5" fill="none" stroke="${C.teal}" stroke-width="1.8" stroke-linecap="round"/><path d="M9.6 10.4h4.8l-1.5-1.5M14.4 13.6H9.6l1.5 1.5" fill="none" stroke="#99f6e4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  llm: `<path d="M5 7l7 5M5 17l7-5M12 12l7-6M12 12h7M12 12l7 6" stroke="${C.cyan}" stroke-width="1.3" opacity="0.6"/><g fill="${C.cyan}"><circle cx="5" cy="7" r="2.1"/><circle cx="5" cy="17" r="2.1"/><circle cx="19" cy="6" r="2.1"/><circle cx="19" cy="12" r="2.1"/><circle cx="19" cy="18" r="2.1"/></g><circle cx="12" cy="12" r="2.8" fill="#a5f3fc"/>`,
  git: `<path d="M7 7.4v9.2M17 10.4c0 3.6-3.2 3.8-7.5 4.8" fill="none" stroke="#f05032" stroke-width="1.9" stroke-linecap="round"/><g fill="#f05032"><circle cx="7" cy="5" r="2.5"/><circle cx="7" cy="19" r="2.5"/><circle cx="17" cy="8" r="2.5"/></g>`,
  github: `<path d="M5 4.5a2 2 0 012-2h12v15.5H7a2 2 0 00-2 2z" fill="${C.fg}"/><path d="M5 20a2 2 0 012-2h12v3.5H7a2 2 0 01-2-2z" fill="#94a3b8"/><path d="M9.5 6.5h6M9.5 9.5h6" stroke="#0f172a" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="13.5" r="1.4" fill="${C.teal}"/>`,
  actions: `<path d="M12 3.5a8.5 8.5 0 108.5 8.5" fill="none" stroke="#2088ff" stroke-width="2.1" stroke-linecap="round"/><path d="M18.6 5.2l2.2 6.6-6.2-2.3z" fill="#2088ff"/><path d="M9.8 8.6v6.8l5.4-3.4z" fill="#93c5fd"/>`,
  vscode: `<path d="M16.5 3L21 5.3v13.4L16.5 21 7.2 13.6 4.3 15.8 2.5 14.9V9.1l1.8-.9 2.9 2.2z" fill="#3fa7f3"/><path d="M16.5 3v18L7.2 13.6z" fill="#0b5fa5" opacity="0.55"/><path d="M16.5 7.2v9.6L10.5 12z" fill="#dbeafe" opacity="0.35"/>`,
  markdown: `<rect x="2" y="5.5" width="20" height="13" rx="2.6" fill="none" stroke="#a3b3cc" stroke-width="1.8"/><path d="M5.5 15.5v-7l3 3.4 3-3.4v7" fill="none" stroke="#a3b3cc" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.8 8.5v6.2M14.3 12.5l2.5 2.8 2.5-2.8" fill="none" stroke="${C.teal}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  windows: `<g fill="#38bdf8"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/></g><rect x="13" y="13" width="8" height="8" rx="2" fill="#0ea5e9"/>`,
  python: `<path d="M12 2.5c-4 0-4.6 1.8-4.6 3.3v2h4.8v.7H5.4C3.6 8.5 2.5 9.9 2.5 12s1.1 3.5 2.9 3.5h1.8v-2.4c0-1.9 1.6-3.4 3.5-3.4h4.5c1.6 0 2.9-1.3 2.9-2.9V5.8C18.1 4 16 2.5 12 2.5z" fill="#3b82f6"/><circle cx="9.6" cy="5.3" r="1" fill="#fff"/><path d="M12 21.5c4 0 4.6-1.8 4.6-3.3v-2h-4.8v-.7h6.8c1.8 0 2.9-1.4 2.9-3.5s-1.1-3.5-2.9-3.5h-1.8v2.4c0 1.9-1.6 3.4-3.5 3.4H8.8c-1.6 0-2.9 1.3-2.9 2.9v1C5.9 20 8 21.5 12 21.5z" fill="#fbbf24"/><circle cx="14.4" cy="18.7" r="1" fill="#fff"/>`,
  cpp: `<path d="${HEX}" fill="#5c8dbc"/><path d="M10.2 9.2a3.4 3.4 0 100 5.6" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/><path d="M13.6 10.2v3.6M11.8 12h3.6M17.4 10.2v3.6M15.6 12h3.6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>`,
  sql: `<rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="#f59e0b" stroke-width="1.8"/><path d="M3 9.2h18M9 9.2V20M15 9.2V20M3 14.6h18" stroke="#f59e0b" stroke-width="1.4"/><path d="M5.5 4h13A2.5 2.5 0 0121 6.5v2.7H3V6.5A2.5 2.5 0 015.5 4z" fill="#f59e0b"/>`,
  duckdb: `<path d="M4.5 7v10.2c0 1.7 3.4 3.1 7.5 3.1s7.5-1.4 7.5-3.1V7z" fill="#facc15"/><path d="M4.5 12.2c0 1.7 3.4 3.1 7.5 3.1s7.5-1.4 7.5-3.1" fill="none" stroke="#a16207" stroke-width="1.2"/><ellipse cx="12" cy="7" rx="7.5" ry="3" fill="#fde047"/><circle cx="15" cy="7" r="1.1" fill="#a16207"/>`,
  prompt: `<path d="M3 5.5h18v11H10l-4.5 3.5v-3.5H3z" fill="#0b1220" stroke="${C.teal}" stroke-width="1.7" stroke-linejoin="round"/><path d="M7.5 9.5l2.5 1.8-2.5 1.8M12 13.2h4.5" fill="none" stroke="${C.teal}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`,
  openai: `<path d="M12 3.2l7.6 4.4v8.8L12 20.8l-7.6-4.4V7.6z" fill="none" stroke="#10a37f" stroke-width="2" stroke-linejoin="round"/><path d="M12 7.5l3.9 2.25v4.5L12 16.5l-3.9-2.25v-4.5z" fill="#10a37f"/>`,
  excel: `<path d="M3 5a2 2 0 012-2h8l8 3v13l-8 3H5a2 2 0 01-2-2z" fill="#217346"/><path d="M13 3l8 3v13l-8 3z" fill="#1a5c38"/><path d="M6 8.5l2.4 3.5L6 15.5h2l1.4-2.2 1.4 2.2h2l-2.4-3.5 2.4-3.5h-2L9.4 10.6 8 8.5z" fill="#fff"/><path d="M15 8h4v2h-4zM15 11h4v2h-4zM15 14h4v2h-4z" fill="#8fd4ae" opacity="0.9"/>`,
  tableau: `<g fill="#E97627"><path d="M11 2.5h2v3.2h3.2v2H13v3.2h-2V7.7H7.8v-2H11z"/><path d="M11 13.1h2v3.2h3.2v2H13v3.2h-2v-3.2H7.8v-2H11z"/><path d="M3 9.8h1.6v2.2h2.2v1.4H4.6v2.2H3v-2.2H.8V12H3zM19.4 9.8H21v2.2h2.2v1.4H21v2.2h-1.6v-2.2h-2.2V12h2.2z"/></g>`,
  powerbi: `<g fill="#F2C811"><rect x="4" y="13" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="16" y="3" width="4" height="18" rx="1"/></g><rect x="4" y="13" width="4" height="8" rx="1" fill="#e0b000" opacity="0.5"/>`,
  ml: `<path d="M12 5L6.5 13M12 5l5.5 8M6.5 13L4 19.5M6.5 13L9 19.5M17.5 13L15 19.5M17.5 13l2.5 6.5" stroke="#a78bfa" stroke-width="1.3"/><circle cx="12" cy="5" r="2.5" fill="#a78bfa"/><circle cx="6.5" cy="13" r="2.4" fill="#a78bfa"/><circle cx="17.5" cy="13" r="2.4" fill="#a78bfa"/><g fill="#c4b5fd"><circle cx="4" cy="19.8" r="1.8"/><circle cx="9" cy="19.8" r="1.8"/><circle cx="15" cy="19.8" r="1.8"/><circle cx="20" cy="19.8" r="1.8"/></g>`,
};
// Stack icons. Brand logos come from scripts/brand-icons.json (Simple Icons, CC0), vendored so
// the build is offline and deterministic. Logos that are near-black switch to the theme's text
// colour in dark mode. Tools without an official logo use the drawn glyphs from TECH.
const BRAND = JSON.parse(readFileSync(join(root, "scripts", "brand-icons.json"), "utf8"));
const lum = (h) => {
  const x = h.replace("#", ""); const [r, g, b] = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
for (const [key, entry] of Object.entries(BRAND)) {
  const { title } = entry;
  if (entry.inner) { // full-colour original artwork; currentColor follows the theme's text colour
    out(`stack/${key}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="${entry.viewBox}" fill="currentColor" color="${C.text}" role="img" aria-label="${esc(title)}">${entry.inner}</svg>`);
    continue;
  }
  const fill = DIR === "dark" && lum(entry.hex) < 0.12 ? C.text : entry.hex;
  out(`stack/${key}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" role="img" aria-label="${esc(title)}"><path fill="${fill}" d="${entry.path}"/></svg>`);
}
for (const key of ["powershell", "vscode", "windows", "sql", "ml", "api", "llm", "prompt", "excel", "tableau", "powerbi"]) {
  if (BRAND[key]) continue;
  out(`stack/${key}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" role="img" aria-hidden="true">${TECH[key]}</svg>`);
}

// Small line icons for the stack category headers.
const CAT = {
  code: `<path d="M9 6.5L4.5 12 9 17.5M15 6.5l4.5 5.5-4.5 5.5"/>`,
  ds: `<path d="M6 6l12 12M18 6L6 18"/><circle cx="12" cy="12" r="2.2" fill="${C.teal}" stroke="none"/>`,
  db: `<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>`,
  globe: `<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17"/>`,
  spark: `<path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z"/><path d="M19 17.5v3M17.5 19h3"/>`,
  chart: `<path d="M4 20h16M7 16v-5M12 16V6M17 16v-8"/>`,
  gear: `<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>`,
};
for (const [k, body] of Object.entries(CAT)) out(`stack/cat-${k}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" role="img" aria-hidden="true"><g fill="none" stroke="${C.teal}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`);

/* ---------------------------------------------- featured work (sample style) */
// Project headings: 36px, a stroked line icon in an accent colour, bold 21px title.
const projectHeading = (slug, title, color, icon) => {
  const w = 38 + Math.ceil(title.length * 21 * 0.55) + 12;
  out(`headings/h-${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="36" viewBox="0 0 ${w} 36" fill="none" role="img" aria-label="${esc(title)}"><g transform="translate(2.0,5.0) scale(1.0833)" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${icon}</g><text x="38" y="25.4" font-family="'Segoe UI', Helvetica, Arial, sans-serif" font-size="21" font-weight="700" fill="${C.text}">${esc(title)}</text></svg>`);
};
projectHeading("muster", "Muster · LLM Comparison Tool", "#14B8A6", `<rect x="4" y="11" width="3.5" height="9" rx="1"/><rect x="10.25" y="7" width="3.5" height="13" rx="1"/><rect x="16.5" y="4" width="3.5" height="16" rx="1"/>`);
projectHeading("ranker", "Content-Decay Ranker · FlyRank AI", "#F59E0B", `<path d="M3 12h3.5l2-5.5 3.2 11 2-5.5H21"/>`);

// Metric badges: grey label | teal value, 20px, Verdana, like the sample.
const VERDANA = "Verdana,Geneva,'DejaVu Sans',sans-serif";
const mflat = (slug, label, value) => {
  const lt = Math.round(label.length * 6.4), vt = Math.round(value.length * 6.4);
  const lw = lt + 16, vw = vt + 16, w = lw + vw;
  out(`badges/m-${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="20" role="img" aria-label="${esc(label)}: ${esc(value)}"><title>${esc(label)}: ${esc(value)}</title><rect width="${lw}" height="20" fill="#555555"/><rect x="${lw}" width="${vw}" height="20" fill="#1abc9c"/><g fill="#fff" font-family="${VERDANA}" font-size="11"><text x="${lw / 2}" y="14.2" text-anchor="middle" textLength="${lt}" lengthAdjust="spacingAndGlyphs">${esc(label)}</text><text x="${lw + vw / 2}" y="14.2" text-anchor="middle" textLength="${vt}" lengthAdjust="spacingAndGlyphs">${esc(value)}</text></g></svg>`);
};
mflat("providers", "Providers", "12");
mflat("build", "Build step", "none");
mflat("local", "Chats stored", "locally");
mflat("p50", "precision@50", "0.80");
mflat("rule", "Production rule", "0.61");
mflat("splits", "Splits won", "7 of 8");

// Tech badges: solid brand colour, white (or black) logo and Verdana text, 20px.
const tflat = (slug, label, color, path, ink = "#fff") => {
  const tl = Math.round(label.length * 6.6), w = 24 + tl + 8;
  out(`badges/t-${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="20" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title><rect width="${w}" height="20" fill="${color}"/><g transform="translate(6,3.0) scale(0.5833)" fill="${ink}"><path d="${path}"/></g><text x="24" y="13.7" fill="${ink}" font-family="${VERDANA}" font-size="11" textLength="${tl}" lengthAdjust="spacingAndGlyphs">${esc(label)}</text></svg>`);
};
const SPARK = "M12 2l2.2 6.3 6.3 2.2-6.3 2.2L12 19l-2.2-6.3L3.5 10.5l6.3-2.2z";
const TREE = "M12 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM6 10.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm12 0a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM4 19a2 2 0 110 4 2 2 0 010-4zm5 0a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4zm5 0a2 2 0 110 4 2 2 0 010-4zM11.3 6.8l-4 3.1 1 1.2 4-3.1zm1.4 0l-1 1.2 4 3.1 1-1.2zM5.3 15.5l-1 3 1.6.5 1-3zm1.4 0l-1.6.5 1 3 1.6-.5zm10.6 0l-1 3 1.6.5 1-3zm1.4 0l-1.6.5 1 3 1.6-.5z";
tflat("node", "Node.js", "#5FA04E", BRAND.node.path);
tflat("express", "Express", "#0A0A0A", BRAND.express.path);
tflat("sqlite", "SQLite", "#003B57", BRAND.sqlite.path);
tflat("javascript", "JavaScript", "#F7DF1E", BRAND.js.path, "#000");
tflat("python", "Python", "#3776AB", BRAND.python.path);
tflat("duckdb", "DuckDB", "#FFF000", BRAND.duckdb.path, "#000");
tflat("rf", "Random forest", "#8B5CF6", TREE);
tflat("gsc", "Search Console data", "#4285F4", SPARK);

/* ------------------------------------------------------------------ emoji */
// A bespoke, multi-colour "emoji" set (32px) drawn on the same dark tile, used
// anywhere a stock emoji would normally go.
const EMOJI = {
  wave: `<g fill="#fbbf24"><rect x="7" y="11" width="10.5" height="9.5" rx="3.6"/><rect x="7" y="5" width="2.6" height="8" rx="1.3"/><rect x="10" y="3.4" width="2.6" height="9.6" rx="1.3"/><rect x="13" y="4" width="2.6" height="9" rx="1.3"/><rect x="16" y="6.2" width="2.6" height="7" rx="1.3"/><rect x="3.6" y="12.2" width="2.6" height="7.2" rx="1.3" transform="rotate(-38 4.9 15.8)"/></g><g stroke="${C.teal}" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M20.3 7.4l1.9-1.4M20.9 10.4h2.3"/></g>`,
  rocket: `<path d="M12 2.6c3.1 2.6 4.6 6.2 4.6 10.8L14.1 17H9.9l-2.5-3.6C7.4 8.8 8.9 5.2 12 2.6z" fill="${C.fg}"/><circle cx="12" cy="10.2" r="2.1" fill="${C.teal}"/><path d="M7.6 13.4L5 17.6l3.6-.9zM16.4 13.4L19 17.6l-3.6-.9z" fill="${C.cyan}"/><path d="M10 17.5h4L12 21.6z" fill="#fb923c"/>`,
  sprout: `<path d="M12 21.2V11.5" stroke="#4ade80" stroke-width="2" stroke-linecap="round"/><path d="M12 12.6c-5.2 0-7.3-3.2-7.3-7.4 4.2 0 7.3 2.1 7.3 7.4z" fill="#22c55e"/><path d="M12 14.8c5.2 0 7.3-3.2 7.3-7.4-4.2 0-7.3 2.1-7.3 7.4z" fill="#4ade80"/><path d="M5.5 21.2h13" stroke="${C.muted}" stroke-width="1.6" stroke-linecap="round"/>`,
  chat: `<rect x="2.6" y="4.6" width="12.4" height="9" rx="3.2" fill="${C.teal}"/><path d="M5.6 13.4v3.2l3.6-3.2z" fill="${C.teal}"/><rect x="9.6" y="10" width="11.8" height="8.4" rx="3.2" fill="${C.cyan}"/><path d="M18.6 18.2v3.2l-3.6-3.2z" fill="${C.cyan}"/><g fill="${INK}"><circle cx="13" cy="14.2" r="1"/><circle cx="15.6" cy="14.2" r="1"/><circle cx="18.2" cy="14.2" r="1"/></g>`,
  compass: `<circle cx="12" cy="12" r="9.2" fill="${C.bg}" stroke="#8b98b1" stroke-width="1.5"/><path d="M15.8 8.2l-2.4 5.5-3.1-3.1z" fill="#f87171"/><path d="M8.2 15.8l2.1-5.2 3.1 3.1z" fill="${C.fg}"/><circle cx="12" cy="12" r="1" fill="${INK}"/>`,
  bolt: `<path d="M13.6 2.4L5.4 13.6h5.6L9.4 21.6l8.6-11.6h-5.6z" fill="#fbbf24"/>`,
  shield: `<path d="M12 2.4l8.2 3.1v6.1c0 5-3.6 8.6-8.2 10.1-4.6-1.5-8.2-5.1-8.2-10.1V5.5z" fill="${C.teal}"/><rect x="8.9" y="10.6" width="6.2" height="5.2" rx="1.1" fill="${INK}"/><path d="M10 10.6V9.2a2 2 0 014 0v1.4" fill="none" stroke="${INK}" stroke-width="1.6"/>`,
  star: `<path d="M12 2.6l2.9 6 6.5.9-4.7 4.5 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.6 9.5l6.5-.9z" fill="#fbbf24"/>`,
  mail: `<rect x="2.6" y="5.4" width="18.8" height="13.4" rx="3" fill="${C.cyan}"/><path d="M3.4 7.6l8.6 6 8.6-6" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linejoin="round"/>`,
  handshake: `<path d="M3.2 11l4.2-4.2 4.6 1.6L16 4.8l4.8 4.8-6.4 6.8-3-1.6-3 1.6z" fill="#fbbf24" stroke="#d97706" stroke-width="1.2" stroke-linejoin="round"/><path d="M9.6 14l2.6 2.6M12.2 11.4l2.6 2.6" stroke="#d97706" stroke-width="1.4" stroke-linecap="round"/>`,
  pin: `<path d="M12 21.6s-6.6-5.8-6.6-10.6a6.6 6.6 0 0113.2 0c0 4.8-6.6 10.6-6.6 10.6z" fill="#f87171"/><circle cx="12" cy="11" r="2.5" fill="#fff"/>`,
  terminal: `<rect x="2.4" y="4.4" width="19.2" height="15.2" rx="3" fill="${C.bg}" stroke="#8b98b1" stroke-width="1.4"/><path d="M6.4 9.4l3.2 2.6-3.2 2.6M11.8 15h5.4" fill="none" stroke="${C.teal}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
  books: `<rect x="3.6" y="4" width="5" height="16.4" rx="1.2" fill="${C.teal}"/><rect x="9.6" y="6.4" width="5" height="14" rx="1.2" fill="${C.cyan}"/><path d="M15.2 7.6l4.4-1.1 3 12.6-4.4 1.1z" fill="#fbbf24"/>`,
  briefcase: `<rect x="3" y="8" width="18" height="12" rx="2.4" fill="#8b5e3c"/><path d="M9 8V6a1.6 1.6 0 011.6-1.6h2.8A1.6 1.6 0 0115 6v2" fill="none" stroke="#8b5e3c" stroke-width="1.8"/><rect x="3" y="12" width="18" height="1.8" fill="#fbbf24"/><rect x="10" y="11" width="4" height="3.6" rx="0.9" fill="#fde68a"/>`,
  spark: `<path d="M12 2.8l2.1 6.6 6.6 2.1-6.6 2.1L12 20.2l-2.1-6.6-6.6-2.1 6.6-2.1z" fill="${C.cyan}"/><circle cx="19" cy="5" r="1.6" fill="#fbbf24"/><circle cx="5" cy="19" r="1.2" fill="#fbbf24"/>`,
};
const emoji = (slug) => out(`emoji/${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" role="img" aria-hidden="true">
  <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="${C.bg2}" stroke="${C.line}"/>
  <g transform="translate(4.5 4.5) scale(${23 / 24})">${EMOJI[slug]}</g>
</svg>`);
["terminal", "briefcase"].forEach(emoji);

};
for (const [name, theme] of Object.entries(THEMES)) { DIR = name; C = theme; build(); }
console.log("assets written (dark + light)");
