// Copies the code shown on chapter pages out of the ARMS repositories, so the
// book always shows real code with its real line numbers.
//
//   npm run snippets
//
// Reads ../ARMS.Frontend and ../ARMS.Backend (next to this repo; override with
// ARMS_FRONTEND / ARMS_BACKEND) and writes src/data/snippets.json, which is
// committed — the deployed site never needs the ARMS repos.
//
// To show new code on a page: add an entry below, run `npm run snippets`, then
// list the snippet id in that chapter's `snippets` (src/data/chapters/).
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repos = {
  frontend: process.env.ARMS_FRONTEND ?? resolve(root, '../ARMS.Frontend'),
  backend: process.env.ARMS_BACKEND ?? resolve(root, '../ARMS.Backend'),
}
const repoName = { frontend: 'ARMS.Frontend', backend: 'ARMS.Backend' }

/**
 * id: used by chapters; repo: frontend | backend; file: path inside the repo;
 * from/to: 1-based inclusive line range; language: optional highlighter override.
 */
const SNIPPETS = [
  // ---------- 01 UI/UX Design · Foundations ----------
  { id: 'custom-focus', repo: 'frontend', file: 'src/styles/custom.css', from: 25, to: 29 },
  { id: 'custom-reduced-motion', repo: 'frontend', file: 'src/styles/custom.css', from: 44, to: 58 },
  { id: 'index-arms-colours', repo: 'frontend', file: 'src/index.css', from: 120, to: 140 },
  { id: 'typography-scale', repo: 'frontend', file: 'src/styles/typography.css', from: 51, to: 69 },
  { id: 'admin-nav-icons', repo: 'frontend', file: 'src/pages/system-admin/systemAdminNavItems.js', from: 29, to: 36 },
  { id: 'welcome-backgrounds', repo: 'frontend', file: 'src/components/dashboard/welcomeBackgrounds.js', from: 52, to: 62 },
  { id: 'variables-radii-shadows', repo: 'frontend', file: 'src/styles/variables.css', from: 56, to: 70 },
  { id: 'dashboard-layout', repo: 'frontend', file: 'src/styles/dashboardLayout.css', from: 21, to: 35 },
  { id: 'index-dark-variant', repo: 'frontend', file: 'src/index.css', from: 52, to: 61 },
  { id: 'theme-apply', repo: 'frontend', file: 'src/utils/theme.js', from: 61, to: 77 },
  // the lines inside the inline <script>, so highlight them as JavaScript
  { id: 'index-html-anti-flash', repo: 'frontend', file: 'index.html', from: 14, to: 31, language: 'jsx' },
  { id: 'sidebar-logo-imports', repo: 'frontend', file: 'src/components/layout/NavSidebar.jsx', from: 81, to: 82 },
  { id: 'sidebar-logo-markup', repo: 'frontend', file: 'src/components/layout/NavSidebar.jsx', from: 180, to: 183 },
  { id: 'sidebar-logo-collapse', repo: 'frontend', file: 'src/styles/sidebar.css', from: 182, to: 188 },
]

const LANGS = { css: 'css', js: 'jsx', jsx: 'jsx', ts: 'tsx', tsx: 'tsx', cs: 'csharp', json: 'json', html: 'markup' }

const out = {}
for (const s of SNIPPETS) {
  const lines = readFileSync(join(repos[s.repo], s.file), 'utf8').split(/\r?\n/)
  if (s.to > lines.length) throw new Error(`${s.id}: ${s.file} has only ${lines.length} lines`)
  out[s.id] = {
    repo: repoName[s.repo],
    file: s.file,
    from: s.from,
    language: s.language ?? LANGS[s.file.split('.').pop()] ?? 'clike',
    code: lines.slice(s.from - 1, s.to).join('\n'),
  }
}

writeFileSync(join(root, 'src/data/snippets.json'), JSON.stringify(out, null, 2) + '\n')
console.log(`wrote ${SNIPPETS.length} snippets to src/data/snippets.json`)
