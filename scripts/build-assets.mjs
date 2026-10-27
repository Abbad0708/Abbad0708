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
  </defs>
  <g clip-path="url(#r)">
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#dots)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect x="0" y="0" width="${W}" height="4" fill="url(#accent)"/>

    <!-- name block -->
    <text x="64" y="126" font-family="${SANS}" font-size="40" font-weight="700" fill="${C.text}" letter-spacing="-0.5">Muhammad Abbad ur Rehman</text>
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
  <text x="600" y="43" text-anchor="middle" font-family="${MONO}" font-size="14" fill="${C.muted}">built in the open  ·  github.com/Abbad0708  ·  assets generated by scripts/build-assets.mjs</text>
</svg>`);

/* -------------------------------------------------------------- headings */
const heading = (slug, title, glyph) => {
  for (const dark of [true, false]) {
    const text = dark ? C.text : C.lightText;
    const rule = dark ? C.line : C.lightLine;
    out(`headings/${slug}${dark ? "-d" : ""}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="52" viewBox="0 0 720 52" role="img" aria-label="${esc(title)}">
  <defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient></defs>
  <rect x="0" y="8" width="36" height="36" rx="9" fill="url(#a)"/>
  <text x="18" y="33" text-anchor="middle" font-family="${MONO}" font-size="17" font-weight="700" fill="#06201e">${esc(glyph)}</text>
  <text x="52" y="35" font-family="${SANS}" font-size="26" font-weight="700" fill="${text}" letter-spacing="-0.3">${esc(title)}</text>
  <rect x="${56 + wSans(title, 26)}" y="26" width="${Math.max(40, 720 - (56 + wSans(title, 26)))}" height="1.5" fill="${rule}"/>
</svg>`);
  }
};
heading("about", "About", "~");
heading("stack", "Stack", "#");
heading("work", "Featured work", ">");
heading("activity", "Activity", "%");
heading("contact", "Contact", "@");

/* ------------------------------------------------------- project heading */
for (const dark of [true, false]) {
  out(`headings/h-muster${dark ? "-d" : ""}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="64" viewBox="0 0 720 64" role="img" aria-label="Muster: one prompt, twelve models, side by side">
  <defs><linearGradient id="a" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="${C.cyan}"/></linearGradient></defs>
  <rect x="0" y="8" width="48" height="48" rx="12" fill="url(#a)"/>
  <g fill="#06201e">
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
// 22px glyphs used instead of emoji in the About table. Teal reads on both themes.
const icon = (slug, body) => out(`icons/${slug}.svg`, `
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" role="img" aria-hidden="true">
  <rect x="0.75" y="0.75" width="20.5" height="20.5" rx="6" fill="${C.bg2}" stroke="${C.line}"/>
  <g fill="none" stroke="${C.teal}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</g>
</svg>`);
icon("now", `<circle cx="11" cy="11" r="3.2" fill="${C.teal}" stroke="none"/><circle cx="11" cy="11" r="6.5" opacity="0.55"/>`);
icon("learning", `<path d="M5 15.5h3v-4H5zM9.5 15.5h3v-7h-3zM14 15.5h3V6h-3z"/>`);
icon("ask", `<path d="M5.5 6.5h11v7h-6l-3 2.5v-2.5h-2z"/>`);
icon("principle", `<path d="M11 4.5l6.5 6.5-6.5 6.5L4.5 11z"/><path d="M8.5 11h5" opacity="0.6"/>`);
icon("status", `<path d="M5 11.5l4 4 8-9"/>`);
icon("location", `<path d="M11 17s-4.5-4.2-4.5-7.5a4.5 4.5 0 019 0C15.5 12.8 11 17 11 17z"/><circle cx="11" cy="9.5" r="1.5"/>`);

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

console.log("assets written");
