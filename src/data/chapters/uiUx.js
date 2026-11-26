// 01 · UI/UX Design — chapter pages.
//
// Each chapter is a two-page spread:
//   left  — title, explanation, an optional visual and key points
//   right — a screenshot of ARMS (click to hide) above the commented code
//
// `snippets` are ids from src/data/snippets.json (see scripts/extract-snippets.mjs).
// `visual` picks a small illustration from src/components/chapter/visuals/.
import landing from '../../assets/screens/landing.webp'
import adminDashboardLight from '../../assets/screens/admin-dashboard-light.webp'
import adminDashboardDark from '../../assets/screens/admin-dashboard-dark.webp'
import studentSettings from '../../assets/screens/student-settings.webp'
import studentDashboard from '../../assets/screens/student-dashboard.webp'
import timetableManagement from '../../assets/screens/admin-timetable-management.webp'
import { screen } from './frontend/screens'
import loginLight from '../../assets/screens/login-light.webp'

/**
 * @typedef {{ src: string, alt: string, caption: string }} Screen
 * @typedef {{
 *   id: string, category: string, group: string, title: string,
 *   intro: string[], visual?: string, points: string[],
 *   screen: Screen, snippets: string[]
 * }} Chapter
 */

/** @type {Chapter[]} */
export const uiUxChapters = [
  {
    id: 'ui-design-goals',
    category: 'ui-ux',
    group: 'Foundations',
    title: 'Design goals & principles',
    intro: [
      'ARMS is used by three very different people: a student checking where the next class is, a lecturer managing groups and bookings, and a system admin publishing timetables for the whole university.',
      'The design had to feel like TUT, stay calm under a lot of data, and work for everyone. Four principles guided every screen.',
    ],
    visual: 'principles',
    points: [
      'Every colour, size and radius comes from a shared token, never a one-off value.',
      'Accessibility is built in globally, so no page can forget it.',
    ],
    screen: {
      src: landing,
      alt: 'ARMS landing page with the hero photo and the title Academic Resource Management System',
      caption: 'Landing page: TUT branding, a clear title and one main action, Sign in.',
    },
    snippets: ['custom-focus', 'custom-reduced-motion'],
  },
  {
    id: 'ui-colour-palette',
    category: 'ui-ux',
    group: 'Foundations',
    title: 'Colour palette & themes',
    intro: [
      'ARMS does not define its own brand colours. It uses the TUT palette from tut-components-library: blue for primary actions, a deep navy sidebar, gold for highlights and red for errors.',
      'Colours are named by their job (primary, muted, destructive), not by their shade. A few extra shades are mixed from those tokens, so they follow light and dark mode on their own.',
    ],
    visual: 'palette',
    points: [
      'Use bg-primary, text-muted-foreground and similar names, never hex values.',
      'Red only means “something is wrong”, such as a timetable clash.',
    ],
    screen: {
      src: adminDashboardLight,
      alt: 'System Admin dashboard with a navy sidebar, white cards and green, gold and grey status bars',
      caption: 'System Admin dashboard: navy sidebar, blue actions and status colours.',
    },
    snippets: ['index-arms-colours'],
  },
  {
    id: 'ui-typography',
    category: 'ui-ux',
    group: 'Foundations',
    title: 'Typography',
    intro: [
      'Headings use Trebuchet MS and body text uses Arial. Both are system fonts, so nothing has to download before the first screen appears.',
      'Sizes are semantic roles such as page title, card title and label. Every page uses the same role classes, so a change in one place updates every role at once.',
    ],
    visual: 'typeScale',
    points: [
      'All sizes are in rem, so the whole scale follows the user’s base font size.',
      'On 1366px laptops the root size eases down to 13px, so more fits on screen.',
    ],
    screen: {
      src: studentSettings,
      alt: 'Student settings page with a page title, card titles, labels and body text',
      caption: 'Settings: page title, card titles, subtitles and labels from one scale.',
    },
    snippets: ['typography-scale'],
  },
  {
    id: 'ui-icons-imagery',
    category: 'ui-ux',
    group: 'Foundations',
    title: 'Icons & imagery',
    intro: [
      'Icons come from lucide-react: thin, consistent line icons that sit next to every navigation label, so pages are quick to find at a glance.',
      'Photos make ARMS feel personal. A student or lecturer’s welcome card shows a photo of their own department, tinted dark so the white text stays readable.',
    ],
    visual: 'icons',
    points: [
      'The icon is part of each nav item’s data, so the sidebar draws it automatically.',
      'Brighter photos get a heavier tint; the default tint is 0.3.',
    ],
    screen: {
      src: studentDashboard,
      alt: 'Student dashboard with sidebar icons, a department photo in the welcome card and a keyboard photo behind the next class',
      caption: 'Student dashboard: sidebar icons and department photography.',
    },
    snippets: ['admin-nav-icons', 'welcome-backgrounds'],
  },
  {
    id: 'ui-logos',
    category: 'ui-ux',
    group: 'Foundations',
    title: 'Logos & brand marks',
    intro: [
      'ARMS uses five TUT brand marks, each chosen for the background it sits on: the colour logo on white, the white logo on navy and dark surfaces, and the crest where there is only room for a small square.',
      'Page logos live in src/assets/images and are imported by the components that show them. The two favicons live in public/, so index.html can point at them before React loads.',
    ],
    visual: 'logos',
    points: [
      'The sidebar is navy in both themes, so it always shows the white logo. When it collapses, the logo fades out and the crest fades in.',
      'The landing page and sign-in keep the colour logo in dark mode. Only the favicon swaps (see Light & dark mode).',
    ],
    screen: {
      src: loginLight,
      alt: 'ARMS sign-in page with the colour TUT logo on a white card',
      caption: 'Sign in: the colour TUT logo on a white card.',
    },
    snippets: ['sidebar-logo-imports', 'sidebar-logo-markup', 'sidebar-logo-collapse'],
  },
  {
    id: 'ui-layout-spacing',
    category: 'ui-ux',
    group: 'Foundations',
    title: 'Layout, spacing & grids',
    intro: [
      'Every dashboard page shares one layout: the sidebar on the left, a top bar across the rest, and the page content below it at 95% of the available width.',
      'Spacing, corner radii and shadows come from small, fixed scales, so cards, buttons and tables line up across every role.',
    ],
    visual: 'spacing',
    points: [
      'The layout file only positions things; colours and fonts live elsewhere.',
      'Below 1024px the sidebar collapses to an icon rail; on phones it becomes a drawer.',
    ],
    screen: {
      src: timetableManagement,
      alt: 'Timetable Management page with a sidebar, page title card, tabs, filters and a table',
      caption: 'Timetable Management: sidebar, top bar, title card and content column.',
    },
    snippets: ['dashboard-layout', 'variables-radii-shadows'],
  },
  {
    id: 'ui-light-dark',
    category: 'ui-ux',
    group: 'Foundations',
    title: 'Light & dark mode',
    intro: [
      'Users choose Light, Dark or Match my device in Settings. The choice is saved per role, so a lecturer’s dark mode doesn’t change the public landing page.',
      'Dark mode is one class, “dark”, on the html element. The TUT library swaps every colour token under that class, so components need no dark-mode code of their own.',
    ],
    visual: 'themes',
    points: [
      'The logo follows the theme too: applyTheme swaps the favicon to the white TUT logo in dark mode and back to the colour icon in light mode.',
      'An inline script in index.html applies the theme and the matching favicon before React loads, so nothing flashes.',
    ],
    screen: {
      src: adminDashboardDark,
      alt: 'System Admin dashboard in dark mode',
      caption: 'The same dashboard in dark mode: only the tokens changed.',
    },
    snippets: ['theme-apply', 'index-html-anti-flash', 'index-dark-variant'],
  },

  // ---------- Components & patterns ----------
  {
    id: 'ui-shared-components',
    category: 'ui-ux',
    group: 'Components & patterns',
    title: 'Shared UI components',
    intro: [
      'Most building blocks come from tut-components-library: buttons, cards, dialogs, selects, tooltips and the app shell. ARMS adds a small set of its own in components/ui for patterns the library does not have.',
      'Each one is designed once and reused everywhere, so a tab bar or a download button looks and behaves the same on every page.',
    ],
    visual: {
      type: 'table',
      head: ['Component', 'Where you see it'],
      rows: [
        ['CountTabs', 'Timetable Management, Notifications, Support'],
        ['SortMenu', 'list toolbars: “Upload date · Newest first”'],
        ['DownloadMenu', 'every Download button (PDF / Word / Excel)'],
        ['FileDropzone', 'timetable and calendar uploads'],
        ['YearPicker', 'a wheel for choosing an academic year'],
        ['CollapsibleCard', 'cards that open and close'],
        ['StepHeading', 'numbered steps in long forms'],
      ],
    },
    points: [
      'Controls say what they do: the sort button shows the current order, and the download button opens a choice of format.',
      'Every component works with the keyboard and announces its role to screen readers.',
    ],
    screen: screen('admin-timetable', 'Timetable Management toolbar with tabs, search, Filters and Sort', 'CountTabs, search, Filters and SortMenu on one card.'),
    snippets: ['ux-count-tabs', 'ux-dropzone'],
  },
  {
    id: 'ui-cards-widgets',
    category: 'ui-ux',
    group: 'Components & patterns',
    title: 'Cards & dashboard widgets',
    intro: [
      'Everything in ARMS sits on a white card with soft corners and a light shadow, over a patterned background. Each card holds one topic, so a busy dashboard still reads as a few clear blocks.',
      'Dashboard widgets reuse the same parts: a welcome card with a photo and three stat tiles, a weekly bar chart, a mini calendar with upcoming events, and a Next Class card.',
    ],
    visual: {
      type: 'steps',
      items: [
        ['Photo', 'the department or module picture'],
        ['Dark wash', 'black at 30–50%, so white text stays readable'],
        ['Content', 'greeting, stat tiles or the next class'],
      ],
    },
    points: [
      'Stat tiles are buttons: each opens the page behind its number.',
      'Today is highlighted in the brand colour on charts and calendars.',
    ],
    screen: screen('student-dashboard', 'Student dashboard cards: welcome card, weekly chart, calendar, next class', 'Dashboard widgets on the student dashboard.'),
    snippets: ['ux-card-bg', 'ux-welcome-tile-css'],
  },
  {
    id: 'ui-feedback-states',
    category: 'ui-ux',
    group: 'Components & patterns',
    title: 'Alerts, empty states & loading skeletons',
    intro: [
      'Every screen is designed for three states besides “full”: loading, empty and error. Loading shows grey skeletons in the shape of the real content, so the page does not jump when data arrives.',
      'An empty list explains why it is empty and what to do next. Errors and warnings use one Alert banner with four tones; quick confirmations (“Timetable published.”) use toasts instead.',
    ],
    visual: {
      type: 'table',
      head: ['State', 'Pattern'],
      rows: [
        ['Loading', 'skeleton shaped like the content'],
        ['Empty', 'icon, title and a hint or action'],
        ['Error on the page', 'Alert banner (stays until fixed)'],
        ['Action finished', 'toast (disappears by itself)'],
      ],
      code: [],
    },
    screen: screen('student-open-lab', 'Open Lab/Class page with an empty state for open lab sessions', 'An empty state: “No open lab sessions yet”, with a hint.'),
    snippets: ['ux-alert', 'ux-empty', 'ux-skeletons'],
  },
  {
    id: 'ui-motion',
    category: 'ui-ux',
    group: 'Components & patterns',
    title: 'Motion & micro-interactions',
    intro: [
      'Motion in ARMS is small and purposeful: landing sections fade up as they scroll into view, the hero photos cross-fade, the bell shakes when hovered, tiles lift on hover and the sidebar tooltip slides in.',
      'The “Coming soon” dialog for the Clocking System uses a split-flap animation, like an airport departure board. Every animation respects the device’s reduced-motion setting.',
    ],
    points: [
      'Hover and focus share the same effects, so keyboard users see them too.',
      'custom.css switches every transition off when reduced motion is on.',
    ],
    related: ['ui-design-goals'],
    screen: { src: landing, alt: 'ARMS landing page hero', caption: 'Landing page: the hero cross-fades and sections fade up on scroll.' },
    snippets: ['ux-scroll-reveal', 'ux-scroll-reveal-css', 'ux-bell-shake', 'ux-split-flap', 'ux-split-flap-css'],
  },

  // ---------- Key screens ----------
  {
    id: 'ui-screen-landing',
    category: 'ui-ux',
    group: 'Key screens',
    title: 'Landing page',
    intro: [
      'The landing page introduces ARMS to anyone, signed in or not. Its design is photo-led: a full-width hero of TUT students, a bold title on the left and one clear action, Sign in, in the header.',
      'Below the hero, short sections explain what ARMS does, answer common questions and hold the terms and privacy text. The TUT pattern strip under the header ties it to the university’s brand.',
    ],
    points: [
      'One primary action (Sign in) and a theme toggle in the header.',
      'The hero height scales with the screen but stays between 32rem and 44rem.',
    ],
    related: ['fe-landing'],
    screen: { src: landing, alt: 'ARMS landing page', caption: 'The landing page hero.' },
    snippets: ['ux-hero-css'],
  },
  {
    id: 'ui-screen-sign-in',
    category: 'ui-ux',
    group: 'Key screens',
    title: 'Sign in & OTP',
    intro: [
      'Sign in and OTP share one look: a graduation photo under a navy wash, the university name at the top, and a small white card in the centre with the colour TUT logo and a blue-gold-red accent bar.',
      'The card holds one task at a time: email and password, then the six-box code. Errors appear inside the card, and the back arrow returns to the landing page.',
    ],
    points: ['The OTP boxes accept a pasted code and verify it straight away.'],
    related: ['fe-sign-in', 'fe-otp'],
    screen: screen('otp', 'Verify Code card with six boxes over the campus photo', 'Verify Code uses the same card and background as Sign in.'),
    snippets: ['ux-login-css', 'ux-login-panel-css'],
  },
  {
    id: 'ui-screen-dashboards',
    category: 'ui-ux',
    group: 'Key screens',
    title: 'Role dashboards',
    intro: [
      'Each role’s dashboard follows one layout: a welcome card across the top with three stat tiles, then a 12-column grid of cards for what matters to that role.',
      'Students see classes, tests and exams; lecturers see their teaching load and groups; admins see timetables, venues and requests waiting for them. Shared widgets make the three feel like one system.',
    ],
    visual: {
      type: 'table',
      head: ['Role', 'Welcome tiles'],
      rows: [
        ['Student', 'Today’s Classes · Semester Tests · Upcoming Exams'],
        ['Lecturer', 'Classes Today · Total Groups · Venues'],
        ['System Admin', 'Published · Pending · Inactive timetables'],
      ],
      code: [],
    },
    related: ['fe-admin-dashboard', 'fe-lec-dashboard', 'fe-stu-dashboard'],
    screen: screen('lecturer-dashboard', 'Lecturer dashboard', 'The lecturer dashboard: the same layout as the student’s.'),
    snippets: ['ux-welcome-layout-css'],
  },
]
