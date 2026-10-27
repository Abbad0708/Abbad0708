// Generates every SVG under assets/ so the README has one consistent look
// without depending on third-party badge services. Run: node scripts/build-assets.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = (rel, svg) => {
  const file = join(root, "assets", rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, svg.trim() + "\n");
};

const C = {
  bg: "#0b1220",
  bg2: "#111a2e",
  line: "#1e293b",
  teal: "#14b8a6",
  cyan: "#22d3ee",
  text: "#e5eaf3",
  muted: "#8b98b1",
  lightText: "#0f172a",
  lightMuted: "#475569",
  lightLine: "#e2e8f0",
};
const SANS = `ui-sans-serif,-apple-system,'Segoe UI',Inter,Roboto,Helvetica,Arial,sans-serif`;
const MONO = `ui-monospace,'Cascadia Code','Fira Code',Consolas,'Liberation Mono',monospace`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// Rough text-width estimates so chips size themselves; generous so nothing clips.
const wSans = (s, size) => Math.ceil(s.length * size * 0.58);
const wMono = (s, size) => Math.ceil(s.length * size * 0.62);

/* -------------------------------------------------------------- monogram */
// Personal mark: an "A" cut from two gradient bars, used in the banner and footer.
const MARK_GRAD = `<linearGradient id="markGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#14b8a6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient>`;
const mark = (size, x = 0, y = 0) => `
  <g transform="translate(${x} ${y}) scale(${size / 48})">
    <rect width="48" height="48" rx="13" fill="#0b1220" stroke="#1e293b"/>
    <path d="M14 36 L24 11 L34 36" fill="none" stroke="url(#markGrad)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.5 27.5h11" stroke="#e5eaf3" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="24" cy="11" r="2.6" fill="#22d3ee"/>
  </g>`;
out("mark.svg", `
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 48 48" role="img" aria-label="Abbad monogram">
  <defs>${MARK_GRAD}</defs>${mark(48)}
</svg>`);

/* ---------------------------------------------------------------- banner */
{
  const W = 1200, H = 320;
  const term = [
    ["$ ", "npm start", C.muted, C.text],
    ["", "muster listening on localhost:3000", "", C.teal],
    ["", "12 providers · 4 adapters · 0 build steps", "", C.muted],
    ["$ ", "git push origin main", C.muted, C.text],
  ];
  const lines = term.map(([p, t, pc, tc], i) => `
    <text x="36" y="${64 + i * 30}" font-family="${MONO}" font-size="15" opacity="0">
      <tspan fill="${pc || tc}">${esc(p)}</tspan><tspan fill="${tc}">${esc(t)}</tspan>
      <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="${0.6 + i * 0.45}s" fill="freeze"/>
    </text>`).join("");
  out("banner.svg", `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Muhammad Abbad ur Rehman, Computer Science student who builds developer tools">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1220"/><stop offset="0.6" stop-color="#0f1b33"/><stop offset="1" stop-color="#0b2a2f"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" x2="1"><stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6"><stop offset="0" stop-color="${C.teal}" stop-opacity="0.22"/><stop offset="1" stop-color="${C.teal}" stop-opacity="0"/></radialGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" opacity="0.06"/></pattern>
    <clipPath id="r"><rect width="${W}" height="${H}" rx="16"/></clipPath>
    ${MARK_GRAD}
  </defs>
  <g clip-path="url(#r)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#dots)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect x="0" y="0" width="${W}" height="4" fill="url(#accent)"/>

    <!-- name block -->
    ${mark(44, 64, 50)}
    <text x="120" y="82" font-family="${MONO}" font-size="13" fill="${C.muted}" letter-spacing="1.5">ABBAD0708</text>
    <text x="64" y="138" font-family="${SANS}" font-size="40" font-weight="700" fill="${C.text}" letter-spacing="-0.5">Muhammad Abbad ur Rehman</text>
    <rect x="64" y="148" width="0" height="4" rx="2" fill="url(#accent)"><animate attributeName="width" from="0" to="120" dur="0.8s" begin="0.2s" fill="freeze"/></rect>
    <text x="64" y="192" font-family="${SANS}" font-size="21" fill="${C.muted}">Computer Science student  ·  builds small, self-hosted developer tools</text>
    <text x="64" y="236" font-family="${MONO}" font-size="15" fill="${C.teal}">LLM tooling   ·   Node.js   ·   local-first apps   ·   learning in public</text>

    <!-- terminal -->
    <g transform="translate(752 52)">
      <rect width="400" height="196" rx="12" fill="${C.bg2}" stroke="${C.line}"/>
      <rect width="400" height="34" rx="12" fill="#172036"/><rect y="22" width="400" height="12" fill="#172036"/>
      <circle cx="20" cy="17" r="5" fill="#f87171"/><circle cx="38" cy="17" r="5" fill="#fbbf24"/><circle cx="56" cy="17" r="5" fill="#34d399"/>
      <text x="200" y="22" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${C.muted}">abbad@dev — muster</text>
      ${lines}
      <rect x="36" y="172" width="9" height="16" fill="${C.teal}"><animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/></rect>
    </g>
  </g>
</svg>`);
}

/* ---------------------------------------------------------------- footer */
out("footer.svg", `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="72" viewBox="0 0 1200 72" role="img" aria-label="Built in the open">
  <defs>
    <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0b1220"/><stop offset="1" stop-color="#0b2a2f"/></linearGradient>
    <linearGradient id="a" x1="0" x2="1"><stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient>
  </defs>
  <rect width="1200" height="72" rx="14" fill="url(#g)"/>
  <rect x="0" y="68" width="1200" height="4" fill="url(#a)"/>
  <defs>${MARK_GRAD}</defs>${mark(34, 24, 17)}
  <text x="600" y="43" text-anchor="middle" font-family="${MONO}" font-size="14" fill="${C.muted}">built in the open  ·  github.com/Abbad0708  ·  assets generated by scripts/build-assets.mjs</text>
</svg>`);

/* ---------------------------------------------------------------- glyphs */
// Hand-drawn 24x24 line icons (stroke-based, dark ink on the teal tile).
const INK = "#06201e";
const GLYPH = {
  person: `<circle cx="12" cy="8.5" r="3.6"/><path d="M4.5 20c0-3.9 3.2-6.4 7.5-6.4s7.5 2.5 7.5 6.4"/>`,
  layers: `<path d="M12 4l8.5 4.5L12 13 3.5 8.5z" fill="${INK}" stroke="none"/><path d="M3.5 12.5L12 17l8.5-4.5"/><path d="M3.5 16.5L12 21l8.5-4.5"/>`,
  spark: `<path d="M12 3.5l2.2 6.3 6.3 2.2-6.3 2.2L12 20.5l-2.2-6.3-6.3-2.2 6.3-2.2z" fill="${INK}" stroke="none"/>`,
  pulse: `<path d="M3 12.5h4l2.5-6 4 12 2.5-6H21"/>`,
  mail: `<rect x="3.5" y="6" width="17" height="12.5" rx="2.5"/><path d="M4 7.5l8 6 8-6"/>`,
  now: `<circle cx="12" cy="12" r="3.2" fill="${INK}" stroke="none"/><circle cx="12" cy="12" r="7.2" opacity="0.7"/>`,
  learning: `<path d="M5 19.5h3.2v-5H5zM10.4 19.5h3.2v-9h-3.2zM15.8 19.5H19V5.5h-3.2z" fill="${INK}" stroke="none"/>`,
  ask: `<path d="M4.5 6.5h15v9h-8l-3.8 3v-3H4.5z"/><path d="M8.5 11h7" opacity="0.7"/>`,
  principle: `<path d="M12 3.5l8.5 8.5-8.5 8.5L3.5 12z"/><path d="M8.5 12h7" opacity="0.7"/>`,
  check: `<path d="M5 12.5l4.5 4.5 9.5-10"/>`,
  terminal: `<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 10l3 2.5-3 2.5M12 15h5"/>`,
  pin: `<path d="M12 20.5s-6-5.3-6-9.8a6 6 0 0112 0c0 4.5-6 9.8-6 9.8z"/><circle cx="12" cy="10.5" r="2"/>`,
  handshake: `<path d="M3.5 11l4-4 4.5 1.5L16 5l4.5 4.5-6 6.5-3-1.5-3 1.5z"/><path d="M10 13.5l2.5 2.5M12.5 11l2.5 2.5"/>`,
};
// A rounded gradient tile with a glyph centred in it.
const tile = (name, size, x = 0, y = 0, radius = size * 0.26) => `
  <g transform="translate(${x} ${y})">
    <rect width="${size}" height="${size}" rx="${radius}" fill="url(#tileGrad)"/>
    <g transform="translate(${size * 0.17} ${size * 0.17}) scale(${(size * 0.66) / 24})" fill="none" stroke="${INK}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${GLYPH[name]}</g>
  </g>`;
const TILE_GRAD = `<linearGradient id="tileGrad" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient>`;

/* -------------------------------------------------------------- headings */
const heading = (slug, title, glyph) => {
  for (const dark of [true, false]) {
    const text = dark ? C.text : C.lightText;
    const rule = dark ? C.line : C.lightLine;
    out(`headings/${slug}${dark ? "-d" : ""}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="52" viewBox="0 0 720 52" role="img" aria-label="${esc(title)}">
  <defs>${TILE_GRAD}</defs>
  ${tile(glyph, 36, 0, 8)}
  <text x="52" y="35" font-family="${SANS}" font-size="26" font-weight="700" fill="${text}" letter-spacing="-0.3">${esc(title)}</text>
  <rect x="${56 + wSans(title, 26)}" y="26" width="${Math.max(40, 720 - (56 + wSans(title, 26)))}" height="1.5" fill="${rule}"/>
</svg>`);
  }
};
heading("about", "About", "person");
heading("stack", "Stack", "layers");
heading("work", "Featured work", "spark");
heading("activity", "Activity", "pulse");
heading("contact", "Contact", "mail");

/* ------------------------------------------------------- project heading */
for (const dark of [true, false]) {
  out(`headings/h-muster${dark ? "-d" : ""}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="64" viewBox="0 0 720 64" role="img" aria-label="Muster: one prompt, twelve models, side by side">
  <defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient></defs>
  <rect x="0" y="8" width="48" height="48" rx="12" fill="url(#a)"/>
  <g fill="${INK}">
    <rect x="11" y="20" width="7" height="24" rx="2"/><rect x="20.5" y="26" width="7" height="18" rx="2"/><rect x="30" y="16" width="7" height="28" rx="2"/>
  </g>
  <text x="64" y="32" font-family="${SANS}" font-size="28" font-weight="800" fill="${dark ? C.text : C.lightText}" letter-spacing="-0.4">Muster</text>
  <text x="64" y="54" font-family="${MONO}" font-size="13" fill="${dark ? C.muted : C.lightMuted}">one prompt  →  up to 12 LLMs  →  answers side by side</text>
</svg>`);
}

/* ------------------------------------------------------------ chips */
// Two-tone metric chip: LABEL | value
const metric = (slug, label, value) => {
  const h = 28, size = 12;
  const lw = wSans(label, size) + 20, vw = wMono(value, 13) + 20;
  out(`badges/m-${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${lw + vw}" height="${h}" viewBox="0 0 ${lw + vw} ${h}" role="img" aria-label="${esc(label)}: ${esc(value)}">
  <defs><linearGradient id="a" x1="0" x2="1"><stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient><clipPath id="r"><rect width="${lw + vw}" height="${h}" rx="7"/></clipPath></defs>
  <g clip-path="url(#r)">
    <rect width="${lw}" height="${h}" fill="${C.bg2}"/>
    <rect x="${lw}" width="${vw}" height="${h}" fill="url(#a)"/>
  </g>
  <rect x="0.5" y="0.5" width="${lw + vw - 1}" height="${h - 1}" rx="7" fill="none" stroke="${C.line}"/>
  <text x="${lw / 2}" y="18.5" text-anchor="middle" font-family="${SANS}" font-size="${size}" font-weight="600" fill="${C.muted}" letter-spacing="0.6">${esc(label.toUpperCase())}</text>
  <text x="${lw + vw / 2}" y="18.5" text-anchor="middle" font-family="${MONO}" font-size="13" font-weight="700" fill="#06201e">${esc(value)}</text>
</svg>`);
};
metric("providers", "providers", "12");
metric("adapters", "adapters", "4");
metric("build", "build step", "none");
metric("data", "chats stored", "locally");
metric("runtime", "runtime", "Node 22+");

// Tech chip with a coloured dot
const tech = (slug, label, dot) => {
  const h = 26, size = 12.5, w = wSans(label, size) + 34;
  out(`badges/t-${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
  <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="13" fill="${C.bg2}" stroke="${C.line}"/>
  <circle cx="14" cy="13" r="4" fill="${dot}"/>
  <text x="25" y="17.5" font-family="${SANS}" font-size="${size}" font-weight="600" fill="${C.text}">${esc(label)}</text>
</svg>`);
};
tech("node", "Node.js", "#5fa04e");
tech("express", "Express", "#f8fafc");
tech("sqlite", "node:sqlite", "#5cb7f0");
tech("vanilla", "Vanilla JS", "#f7df1e");
tech("markdown", "Custom Markdown renderer", C.cyan);
tech("tests", "Mock providers + headless tests", C.teal);

// Contact buttons
const button = (slug, label, bg, fg = "#ffffff") => {
  const h = 34, size = 13, w = wSans(label, size) + 44;
  out(`badges/b-${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
  <rect width="${w}" height="${h}" rx="9" fill="${bg}"/>
  <rect x="12" y="11" width="12" height="12" rx="3" fill="${fg}" opacity="0.9"/>
  <text x="32" y="22" font-family="${SANS}" font-size="${size}" font-weight="700" fill="${fg}">${esc(label)}</text>
</svg>`);
};
button("linkedin", "LinkedIn", "#0a66c2");
button("x", "X / Twitter", "#0f172a");
button("muster", "Explore Muster", C.teal, "#06201e");
button("message", "Message me on LinkedIn", "#0a66c2");

/* ------------------------------------------------------------ list icons */
// 28px gradient tiles used instead of emoji in the About table; same family as the headings.
const icon = (slug, glyph) => out(`icons/${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" role="img" aria-hidden="true">
  <defs>${TILE_GRAD}</defs>
  ${tile(glyph, 28)}
</svg>`);
icon("now", "now");
icon("learning", "learning");
icon("ask", "ask");
icon("principle", "principle");
icon("status", "check");
icon("location", "pin");
icon("terminal", "terminal");
icon("handshake", "handshake");

/* ------------------------------------------------------------ tech tiles */
// One SVG per stack row: 64px tiles with a brand-coloured monogram and a label.
const techRow = (slug, items) => {
  const T = 64, gap = 12, pad = 14;
  const W = pad * 2 + items.length * T + (items.length - 1) * gap, H = T + 22;
  const tiles = items.map(([mono, label, color], i) => {
    const x = pad + i * (T + gap);
    const fs = mono.length <= 2 ? 22 : mono.length === 3 ? 18 : 15;
    return `
    <g transform="translate(${x} 0)">
      <rect width="${T}" height="${T}" rx="16" fill="${C.bg2}" stroke="${C.line}"/>
      <rect x="1" y="1" width="${T - 2}" height="${T - 2}" rx="15" fill="none" stroke="${color}" stroke-opacity="0.35"/>
      <circle cx="${T / 2}" cy="${T / 2}" r="22" fill="${color}" opacity="0.08"/>
      <text x="${T / 2}" y="${T / 2 + fs * 0.36}" text-anchor="middle" font-family="${MONO}" font-size="${fs}" font-weight="700" fill="${color}">${esc(mono)}</text>
      <text x="${T / 2}" y="${T + 16}" text-anchor="middle" font-family="${SANS}" font-size="11.5" font-weight="600" fill="${C.muted}">${esc(label)}</text>
    </g>`;
  }).join("");
  out(`stack/${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(items.map((i) => i[1]).join(", "))}">
  ${tiles}
</svg>`);
};
techRow("languages", [
  ["JS", "JavaScript", "#f7df1e"],
  ["node", "Node.js", "#5fa04e"],
  ["<>", "HTML", "#e34f26"],
  ["{ }", "CSS", "#3b82f6"],
  ["$_", "Bash", "#4eaa25"],
  ["PS>", "PowerShell", "#5391fe"],
]);
techRow("backend", [
  ["ex", "Express", "#e2e8f0"],
  ["SQL", "SQLite", "#5cb7f0"],
  ["npm", "npm", "#cb3837"],
  ["API", "REST APIs", C.teal],
  ["LLM", "LLM SDKs", C.cyan],
]);
techRow("workflow", [
  ["git", "Git", "#f05032"],
  ["gh", "GitHub", "#e2e8f0"],
  ["CI", "Actions", "#2088ff"],
  ["VS", "VS Code", "#3fa7f3"],
  ["md", "Markdown", "#a3b3cc"],
  ["win", "Windows", "#38bdf8"],
]);

/* -------------------------------------------------------- provider grid */
{
  const providers = [
    ["Claude", "Anthropic", "#d97757"], ["GPT", "OpenAI", "#9ca3af"], ["Gemini", "Google", "#4f8df7"],
    ["Grok", "xAI", "#e5e7eb"], ["DeepSeek", "DeepSeek", "#4d6bfe"], ["Perplexity", "Perplexity", "#1fb8cd"],
    ["Mistral", "Mistral AI", "#fa520f"], ["Llama", "via Groq", "#f55036"], ["Qwen", "Alibaba", "#8b7cf6"],
    ["Kimi", "Moonshot", "#c4b5fd"], ["Command", "Cohere", "#6ee7b7"], ["OpenRouter", "100s of models", C.teal],
  ];
  const cols = 3, cw = 150, ch = 46, gap = 10, pad = 14;
  const W = pad * 2 + cols * cw + (cols - 1) * gap;
  const rows = Math.ceil(providers.length / cols);
  const H = pad * 2 + 30 + rows * ch + (rows - 1) * gap;
  const tiles = providers.map(([name, by, color], i) => {
    const x = pad + (i % cols) * (cw + gap), y = pad + 30 + Math.floor(i / cols) * (ch + gap);
    return `
    <g transform="translate(${x} ${y})">
      <rect width="${cw}" height="${ch}" rx="9" fill="${C.bg}" stroke="${C.line}"/>
      <circle cx="16" cy="23" r="4.5" fill="${color}"/>
      <text x="29" y="20" font-family="${SANS}" font-size="13" font-weight="700" fill="${C.text}">${esc(name)}</text>
      <text x="29" y="35" font-family="${MONO}" font-size="10.5" fill="${C.muted}">${esc(by)}</text>
    </g>`;
  }).join("");
  out("providers.svg", `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Twelve LLM providers supported by Muster">
  <rect width="${W}" height="${H}" rx="14" fill="${C.bg2}" stroke="${C.line}"/>
  <text x="${pad}" y="${pad + 16}" font-family="${SANS}" font-size="11.5" font-weight="700" fill="${C.muted}" letter-spacing="1.2">PROVIDERS WIRED IN</text>
  <text x="${W - pad}" y="${pad + 16}" text-anchor="end" font-family="${MONO}" font-size="11.5" fill="${C.teal}">12 / 4 adapters</text>
  ${tiles}
</svg>`);
}

/* ------------------------------------------------------------------ emoji */
// A bespoke, multi-colour "emoji" set (32px) drawn on the same dark tile, used
// anywhere a stock emoji would normally go.
const EMOJI = {
  wave: `<g fill="#fbbf24"><rect x="7" y="11" width="10.5" height="9.5" rx="3.6"/><rect x="7" y="5" width="2.6" height="8" rx="1.3"/><rect x="10" y="3.4" width="2.6" height="9.6" rx="1.3"/><rect x="13" y="4" width="2.6" height="9" rx="1.3"/><rect x="16" y="6.2" width="2.6" height="7" rx="1.3"/><rect x="3.6" y="12.2" width="2.6" height="7.2" rx="1.3" transform="rotate(-38 4.9 15.8)"/></g><g stroke="${C.teal}" stroke-width="1.6" stroke-linecap="round" fill="none"><path d="M20.3 7.4l1.9-1.4M20.9 10.4h2.3"/></g>`,
  rocket: `<path d="M12 2.6c3.1 2.6 4.6 6.2 4.6 10.8L14.1 17H9.9l-2.5-3.6C7.4 8.8 8.9 5.2 12 2.6z" fill="#e5eaf3"/><circle cx="12" cy="10.2" r="2.1" fill="${C.teal}"/><path d="M7.6 13.4L5 17.6l3.6-.9zM16.4 13.4L19 17.6l-3.6-.9z" fill="${C.cyan}"/><path d="M10 17.5h4L12 21.6z" fill="#fb923c"/>`,
  sprout: `<path d="M12 21.2V11.5" stroke="#4ade80" stroke-width="2" stroke-linecap="round"/><path d="M12 12.6c-5.2 0-7.3-3.2-7.3-7.4 4.2 0 7.3 2.1 7.3 7.4z" fill="#22c55e"/><path d="M12 14.8c5.2 0 7.3-3.2 7.3-7.4-4.2 0-7.3 2.1-7.3 7.4z" fill="#4ade80"/><path d="M5.5 21.2h13" stroke="${C.muted}" stroke-width="1.6" stroke-linecap="round"/>`,
  chat: `<rect x="2.6" y="4.6" width="12.4" height="9" rx="3.2" fill="${C.teal}"/><path d="M5.6 13.4v3.2l3.6-3.2z" fill="${C.teal}"/><rect x="9.6" y="10" width="11.8" height="8.4" rx="3.2" fill="${C.cyan}"/><path d="M18.6 18.2v3.2l-3.6-3.2z" fill="${C.cyan}"/><g fill="${INK}"><circle cx="13" cy="14.2" r="1"/><circle cx="15.6" cy="14.2" r="1"/><circle cx="18.2" cy="14.2" r="1"/></g>`,
  compass: `<circle cx="12" cy="12" r="9.2" fill="#111a2e" stroke="#8b98b1" stroke-width="1.5"/><path d="M15.8 8.2l-2.4 5.5-3.1-3.1z" fill="#f87171"/><path d="M8.2 15.8l2.1-5.2 3.1 3.1z" fill="#e5eaf3"/><circle cx="12" cy="12" r="1" fill="${INK}"/>`,
  bolt: `<path d="M13.6 2.4L5.4 13.6h5.6L9.4 21.6l8.6-11.6h-5.6z" fill="#fbbf24"/>`,
  shield: `<path d="M12 2.4l8.2 3.1v6.1c0 5-3.6 8.6-8.2 10.1-4.6-1.5-8.2-5.1-8.2-10.1V5.5z" fill="${C.teal}"/><rect x="8.9" y="10.6" width="6.2" height="5.2" rx="1.1" fill="${INK}"/><path d="M10 10.6V9.2a2 2 0 014 0v1.4" fill="none" stroke="${INK}" stroke-width="1.6"/>`,
  star: `<path d="M12 2.6l2.9 6 6.5.9-4.7 4.5 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.6 9.5l6.5-.9z" fill="#fbbf24"/>`,
  mail: `<rect x="2.6" y="5.4" width="18.8" height="13.4" rx="3" fill="${C.cyan}"/><path d="M3.4 7.6l8.6 6 8.6-6" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linejoin="round"/>`,
  handshake: `<path d="M3.2 11l4.2-4.2 4.6 1.6L16 4.8l4.8 4.8-6.4 6.8-3-1.6-3 1.6z" fill="#fbbf24" stroke="#d97706" stroke-width="1.2" stroke-linejoin="round"/><path d="M9.6 14l2.6 2.6M12.2 11.4l2.6 2.6" stroke="#d97706" stroke-width="1.4" stroke-linecap="round"/>`,
  pin: `<path d="M12 21.6s-6.6-5.8-6.6-10.6a6.6 6.6 0 0113.2 0c0 4.8-6.6 10.6-6.6 10.6z" fill="#f87171"/><circle cx="12" cy="11" r="2.5" fill="#fff"/>`,
  terminal: `<rect x="2.4" y="4.4" width="19.2" height="15.2" rx="3" fill="#111a2e" stroke="#8b98b1" stroke-width="1.4"/><path d="M6.4 9.4l3.2 2.6-3.2 2.6M11.8 15h5.4" fill="none" stroke="${C.teal}" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`,
  books: `<rect x="3.6" y="4" width="5" height="16.4" rx="1.2" fill="${C.teal}"/><rect x="9.6" y="6.4" width="5" height="14" rx="1.2" fill="${C.cyan}"/><path d="M15.2 7.6l4.4-1.1 3 12.6-4.4 1.1z" fill="#fbbf24"/>`,
  spark: `<path d="M12 2.8l2.1 6.6 6.6 2.1-6.6 2.1L12 20.2l-2.1-6.6-6.6-2.1 6.6-2.1z" fill="${C.cyan}"/><circle cx="19" cy="5" r="1.6" fill="#fbbf24"/><circle cx="5" cy="19" r="1.2" fill="#fbbf24"/>`,
};
const emoji = (slug) => out(`emoji/${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" role="img" aria-hidden="true">
  <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="${C.bg2}" stroke="${C.line}"/>
  <g transform="translate(4.5 4.5) scale(${23 / 24})">${EMOJI[slug]}</g>
</svg>`);
Object.keys(EMOJI).forEach(emoji);

// Contact sheet of the whole set, handy for previews and for reuse in other repos.
{
  const keys = Object.keys(EMOJI), per = 7, cell = 72;
  const W = 24 + per * cell, H = 24 + Math.ceil(keys.length / per) * (cell + 14);
  const cells = keys.map((k, i) => {
    const x = 12 + (i % per) * cell, y = 12 + Math.floor(i / per) * (cell + 14);
    return `<g transform="translate(${x + 8} ${y})"><g transform="scale(${44 / 24})">
      <rect x="0.4" y="0.4" width="23.2" height="23.2" rx="6.5" fill="${C.bg2}" stroke="${C.line}" stroke-width="0.6"/>
      <g transform="translate(3.2 3.2) scale(0.73)">${EMOJI[k]}</g></g>
      <text x="22" y="62" text-anchor="middle" font-family="${MONO}" font-size="10.5" fill="${C.muted}">${k}</text></g>`;
  }).join("");
  out("emoji/sheet.svg", `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Custom emoji set">
  <rect width="${W}" height="${H}" rx="14" fill="${C.bg}"/>${cells}
</svg>`);
}

/* ------------------------------------------------------------ facts strip */
{
  const facts = [
    ["person", "Computer Science student"],
    ["terminal", "Builds self-hosted developer tools"],
    ["layers", "Local-first, no build step, few deps"],
    ["handshake", "Open to collaboration"],
  ];
  const W = 1200, H = 64, seg = W / facts.length;
  const cells = facts.map(([g, label], i) => `
    <g transform="translate(${i * seg} 0)">
      ${i ? `<rect x="0" y="16" width="1" height="32" fill="${C.line}"/>` : ""}
      ${tile(g, 30, 24, 17)}
      <text x="66" y="37" font-family="${SANS}" font-size="14.5" font-weight="600" fill="${C.text}">${esc(label)}</text>
    </g>`).join("");
  out("facts.svg", `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(facts.map((f) => f[1]).join(". "))}">
  <defs>${TILE_GRAD}</defs>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="${C.bg2}" stroke="${C.line}"/>
  ${cells}
</svg>`);
}

/* ------------------------------------------------------------ muster flow */
// How Muster works: one prompt fans out through four adapters to twelve providers,
// and each model only ever sees its own history.
{
  const W = 640, H = 230;
  const box = (x, y, w, h, label, sub, accent = false) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${accent ? "url(#tileGrad)" : C.bg2}" stroke="${accent ? "none" : C.line}"/>
    <text x="${x + w / 2}" y="${y + h / 2 - (sub ? 4 : -5)}" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="700" fill="${accent ? INK : C.text}">${esc(label)}</text>
    ${sub ? `<text x="${x + w / 2}" y="${y + h / 2 + 14}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${accent ? INK : C.muted}" opacity="${accent ? 0.75 : 1}">${esc(sub)}</text>` : ""}`;
  const midY = 96;
  // adapters (4) and providers (12) as stacked pills on the right
  const adapters = [0, 1, 2, 3].map((i) => {
    const y = 28 + i * 40;
    return `<path d="M312 ${midY} C340 ${midY} 340 ${y + 14} 368 ${y + 14}" fill="none" stroke="${C.teal}" stroke-width="1.5" opacity="0.7"/>
            <rect x="368" y="${y}" width="86" height="28" rx="8" fill="${C.bg2}" stroke="${C.line}"/>
            <text x="411" y="${y + 18}" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${C.text}">adapter ${i + 1}</text>`;
  }).join("");
  const providers = [...Array(12).keys()].map((i) => {
    const a = Math.floor(i / 3), y = 28 + a * 40 + 14, py = 16 + i * 13.5;
    return `<path d="M454 ${y} C490 ${y} 490 ${py} 526 ${py}" fill="none" stroke="${C.cyan}" stroke-width="1.2" opacity="0.55"/>
            <circle cx="530" cy="${py}" r="3.2" fill="${C.cyan}"/>`;
  }).join("");
  out("muster-flow.svg", `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="One prompt goes to Muster, which fans out through four adapters to twelve providers. Each model only sees its own history.">
  <defs>${TILE_GRAD}
    <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5 0 10z" fill="${C.teal}"/></marker>
  </defs>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="${C.bg}" stroke="${C.line}"/>
  <text x="18" y="22" font-family="${SANS}" font-size="11.5" font-weight="700" fill="${C.muted}" letter-spacing="1.2">HOW IT WORKS</text>

  ${box(18, midY - 24, 112, 48, "one prompt", "you type once")}
  <line x1="130" y1="${midY}" x2="186" y2="${midY}" stroke="${C.teal}" stroke-width="1.8" marker-end="url(#arr)"/>
  ${box(188, midY - 26, 124, 52, "Muster", "fan-out + stream", true)}
  ${adapters}
  ${providers}
  <text x="548" y="${midY - 2}" font-family="${SANS}" font-size="13" font-weight="700" fill="${C.text}">12</text>
  <text x="548" y="${midY + 14}" font-family="${MONO}" font-size="10.5" fill="${C.muted}">providers</text>

  <rect x="18" y="186" width="${W - 36}" height="28" rx="8" fill="${C.bg2}" stroke="${C.line}"/>
  ${tile("check", 18, 26, 191)}
  <text x="52" y="204.5" font-family="${SANS}" font-size="12.5" fill="${C.text}">On follow-ups each model sees <tspan font-weight="700">only its own history</tspan>, so the comparison stays a fair test.</text>
</svg>`);
}

console.log("assets written");
