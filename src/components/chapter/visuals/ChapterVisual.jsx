// Small illustrations for the left page of a chapter, picked by name
// (`visual` in src/data/chapters/). Colours and sizes are the real ARMS
// token values from tut-components-library and ARMS.Frontend/src/styles.
import { Bell, CalendarClock, CalendarDays, CalendarSearch, Inbox, LayoutDashboard, MapPinned, ShieldCheck } from 'lucide-react'
import logoColor from '../../../assets/logos/tut-logo-color.webp'
import logoWhite from '../../../assets/logos/tut-logo-white.webp'
import crest from '../../../assets/logos/tut-crest.webp'
import faviconLight from '../../../assets/logos/favicon-light.webp'
import faviconDark from '../../../assets/logos/favicon-dark.webp'
import './visuals.css'

const PRINCIPLES = [
  ['Brand-led', 'TUT colours and logos from the shared component library.'],
  ['Consistent', 'Tokens and semantic classes instead of one-off values.'],
  ['Accessible', 'Visible focus, reduced motion and readable contrast.'],
  ['Role-focused', 'Each role sees only its own dashboard and menu.'],
]

function Principles() {
  return (
    <ol className="viz-principles">
      {PRINCIPLES.map(([name, text], i) => (
        <li key={name}>
          <span className="viz-principles__num">{String(i + 1).padStart(2, '0')}</span>
          <strong>{name}</strong>
          <span>{text}</span>
        </li>
      ))}
    </ol>
  )
}

// light-mode values from tut-components-library/dist/styles.css
const PALETTE = [
  ['primary', 'oklch(44.3% .126 250)'],
  ['sidebar', 'oklch(32% .09 255)'],
  ['gold', 'oklch(82.3% .167 81.5)'],
  ['destructive', 'oklch(58.1% .225 22.4)'],
  ['success', 'oklch(60% .13 155)'],
  ['warning', 'oklch(75% .15 75)'],
  ['foreground', 'oklch(19% .014 255)'],
  ['muted-fg', 'oklch(48% .014 255)'],
  ['border', 'oklch(90% .008 250)'],
  ['background', 'oklch(99.5% .002 250)'],
]

function Palette() {
  return (
    <ul className="viz-palette">
      {PALETTE.map(([name, value]) => (
        <li key={name}>
          <span className="viz-palette__chip" style={{ background: value }} />
          <span className="viz-palette__name">{name}</span>
        </li>
      ))}
    </ul>
  )
}

// typography.css roles; size in rem, shown relative to a 16px root
const TYPE_ROLES = [
  ['.page-title', 1.5, 700, 'serif', 'Settings'],
  ['.section-title', 1.25, 700, 'serif', 'Upcoming events'],
  ['.card-title', 1.125, 400, 'serif', 'Weekly Schedule'],
  ['.body-text', 0.875, 400, 'sans', 'Here’s what’s happening today.'],
  ['.label-text', 0.75, 500, 'muted', 'STUDENT NUMBER'],
]

function TypeScale() {
  return (
    <ul className="viz-type">
      {TYPE_ROLES.map(([role, rem, weight, kind, sample]) => (
        <li key={role}>
          <span className="viz-type__meta">
            {role} <em>{rem}rem</em>
          </span>
          <span
            className={`viz-type__sample viz-type__sample--${kind}`}
            style={{ fontSize: `${rem * 2.6}cqw`, fontWeight: weight }}
          >
            {sample}
          </span>
        </li>
      ))}
    </ul>
  )
}

const ICONS = [
  [LayoutDashboard, 'Dashboard', 'LayoutDashboard'],
  [CalendarClock, 'Timetable Management', 'CalendarClock'],
  [CalendarSearch, 'Find a Timetable', 'CalendarSearch'],
  [CalendarDays, 'Calendar Management', 'CalendarDays'],
  [Inbox, 'Booking Requests', 'Inbox'],
  [MapPinned, 'Venue Management', 'MapPinned'],
  [ShieldCheck, 'Class/Lab Access', 'ShieldCheck'],
  [Bell, 'Notifications', 'Bell'],
]

function Icons() {
  return (
    <ul className="viz-icons">
      {ICONS.map(([Icon, label, name]) => (
        <li key={name}>
          <Icon className="viz-icons__icon" strokeWidth={1.75} aria-hidden="true" />
          <span>{label}</span>
          <code>{name}</code>
        </li>
      ))}
    </ul>
  )
}

const SPACES = [
  ['--space-1', 4],
  ['--space-2', 8],
  ['--space-3', 12],
  ['--space-4', 16],
  ['--space-6', 24],
  ['--space-8', 32],
]
const RADII = [
  ['xs', 4],
  ['sm', 6],
  ['md', 8],
  ['lg', 12],
]

function Spacing() {
  return (
    <div className="viz-spacing">
      <ul className="viz-spacing__scale">
        {SPACES.map(([name, px]) => (
          <li key={name}>
            <code>{name}</code>
            <span className="viz-spacing__bar" style={{ width: `${px * 0.7}cqw` }} />
            <span className="viz-spacing__px">{px}px</span>
          </li>
        ))}
      </ul>
      <ul className="viz-spacing__radii">
        {RADII.map(([name, px]) => (
          <li key={name}>
            <span className="viz-spacing__box" style={{ borderRadius: `${px * 0.22}cqw` }} />
            <code>{name}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Every logo ARMS uses, on the background it is used on.
// `bg` matches where it appears: white pages, the navy sidebar, a dark browser tab.
const LOGOS = [
  { src: logoColor, file: 'TUT_Logo_Color.webp', use: 'Landing header, Sign in, OTP', bg: '#fff', wide: true },
  { src: logoWhite, file: 'TUT_Logo_White.webp', use: 'Sidebar, landing footer', bg: 'oklch(32% .09 255)', wide: true },
  { src: crest, file: 'TUT Crest.webp', use: 'Collapsed sidebar', bg: 'oklch(32% .09 255)' },
  { src: faviconLight, file: 'TUT Web Icon.png', use: 'Browser tab, light', bg: '#fff' },
  { src: faviconDark, file: 'TUT White Logo.png', use: 'Browser tab, dark', bg: 'oklch(20% .012 255)' },
]

function Logos() {
  return (
    <ul className="viz-logos">
      {LOGOS.map((logo) => (
        <li key={logo.file} className={logo.wide ? 'viz-logos__item--wide' : undefined}>
          <span className="viz-logos__stage" style={{ background: logo.bg }}>
            <img src={logo.src} alt={`${logo.file}, used in ${logo.use}`} />
          </span>
          <code>{logo.file}</code>
          <span className="viz-logos__use">{logo.use}</span>
        </li>
      ))}
    </ul>
  )
}

// the same tokens in each theme, plus the favicon applyTheme() picks for it
const THEMES = {
  light: { favicon: faviconLight, bg: 'oklch(99.5% .002 250)', card: 'oklch(100% 0 0)', fg: 'oklch(19% .014 255)', primary: 'oklch(44.3% .126 250)', muted: 'oklch(48% .014 255)', border: 'oklch(90% .008 250)' },
  dark: { favicon: faviconDark, bg: 'oklch(15% .01 255)', card: 'oklch(20% .012 255)', fg: 'oklch(95% .006 250)', primary: 'oklch(62% .12 250)', muted: 'oklch(68% .02 250)', border: 'oklch(100% 0 0 / .1)' },
}

function Themes() {
  return (
    <div className="viz-themes">
      {Object.entries(THEMES).map(([name, t]) => (
        <div key={name} className="viz-themes__panel" style={{ background: t.bg, color: t.fg }}>
          {/* a browser tab showing the favicon for this theme */}
          <span className="viz-themes__tab" style={{ background: t.card, borderColor: t.border }}>
            <img src={t.favicon} alt={name === 'light' ? 'Colour TUT favicon' : 'White TUT favicon'} />
            ARMS
          </span>
          <span className="viz-themes__name">{name === 'light' ? 'Light' : '.dark'}</span>
          <span className="viz-themes__card" style={{ background: t.card, borderColor: t.border }}>
            <span className="viz-themes__title">Card title</span>
            <span className="viz-themes__muted" style={{ color: t.muted }}>
              Muted text
            </span>
            <span className="viz-themes__btn" style={{ background: t.primary }}>
              Primary
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

const VISUALS = { principles: Principles, palette: Palette, typeScale: TypeScale, icons: Icons, logos: Logos, spacing: Spacing, themes: Themes }

export default function ChapterVisual({ name }) {
  const Visual = VISUALS[name]
  return Visual ? (
    <div className="viz">
      <Visual />
    </div>
  ) : null
}
