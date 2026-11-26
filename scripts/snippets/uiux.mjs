// Code shown on the 01 · UI/UX Design · Components & patterns and Key screens chapters.
const f = (id, file, from, to, notes, extra = {}) => ({ id, repo: 'frontend', file, from, to, ...(notes ? { notes } : {}), ...extra })

export const SNIPPETS = [
  // ---------- Shared UI components ----------
  f('ux-count-tabs', 'src/components/ui/CountTabs.jsx', 29, 67, {
    32: 'role="tablist" / role="tab": read out as tabs by screen readers',
    40: 'An alert tab (Has clashes) keeps a red badge even when not selected',
    60: 'tabular-nums: digits all the same width, so counts don’t jiggle',
  }),
  f('ux-dropzone', 'src/components/ui/FileDropzone.jsx', 63, 81, {
    70: 'A wrong file type is refused straight away, with a toast',
    75: 'The parent only ever receives a file it can upload',
  }),

  // ---------- Cards & dashboard widgets ----------
  f('ux-card-bg', 'src/components/dashboard/CardBackground.jsx', 35, 52, {
    40: '-z-10 puts the photo behind the card content',
    47: 'A black wash over the photo keeps white text readable (0.3 by default)',
  }),
  f('ux-welcome-tile-css', 'src/styles/dashboardCards.css', 95, 112, {
    100: 'Semi-transparent grey: the photo shows through, the text stays solid',
    108: 'Hover makes the tile a little less see-through and lifts it with a shadow',
  }),

  // ---------- Alerts, empty states & skeletons ----------
  f('ux-alert', 'src/components/feedback/Alert.jsx', 32, 57, {
    32: 'Four tones, each with its own colour token and icon',
    48: "Errors use role='alert' so screen readers announce them at once",
  }),
  f('ux-empty', 'src/components/feedback/EmptyState.jsx', 34, 36, {
    35: 'A card background keeps the message readable on the patterned dashboard',
  }),
  f('ux-skeletons', 'src/components/feedback/Skeletons.jsx', 35, 63, {
    36: 'Varied widths so placeholder lines don’t look like a solid block',
    40: 'Screen readers hear "Loading…"; the grey bars themselves are hidden from them',
  }),

  // ---------- Motion & micro-interactions ----------
  f('ux-scroll-reveal', 'src/components/ScrollReveal.jsx', 13, 43, {
    18: 'IntersectionObserver: fires when the section scrolls into view',
    22: 'Reveals once, then stops watching',
  }),
  f('ux-scroll-reveal-css', 'src/styles/scrollReveal.css', 1, 23, {
    2: 'Starts invisible and 30px lower…',
    12: '…then fades and slides into place',
    17: 'Reduced motion: shown at once, no movement',
  }),
  f('ux-bell-shake', 'src/styles/dashboardLayout.css', 75, 115, {
    78: 'Hovering the bell fills it and gives it a short shake',
  }),
  f('ux-split-flap', 'src/components/ui/SplitFlapText.jsx', 5, 60, {
    19: 'Reduced motion: the letters appear without flipping',
    51: 'Each letter starts a little later, like an airport departure board',
  }),
  f('ux-split-flap-css', 'src/styles/splitFlap.css', 94, 109, {
    97: 'Each letter flips down from above, overshoots a little, then settles',
  }),

  // ---------- Key screens ----------
  f('ux-hero-css', 'src/styles/homepage.css', 219, 267, {
    222: 'The hero grows with the screen width, between two limits',
    237: 'Slides cross-fade over 1.2 seconds',
    245: 'The title sits on the left third, over the photo',
  }),
  f('ux-login-css', 'src/styles/login.css', 20, 42, {
    27: 'A graduation photo behind the whole page…',
    34: '…under a navy wash (--brand-overlay), so the white heading reads clearly',
  }),
  f('ux-login-panel-css', 'src/styles/login.css', 81, 134, {
    83: 'A narrow card: one task, nothing else competing for attention',
    131: 'The TUT blue, gold and red bar under the logo',
  }),
  f('ux-welcome-layout-css', 'src/styles/dashboardCards.css', 35, 70, {
    60: 'Tablets and up: the three stat tiles sit in one row',
    66: 'Desktops: greeting on the left, tiles beside it',
  }),
]
