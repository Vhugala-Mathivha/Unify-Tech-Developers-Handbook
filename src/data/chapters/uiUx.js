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
      'An inline script in index.html applies the theme before React loads, so the page never flashes white.',
      'The favicon switches to the white TUT logo in dark mode.',
    ],
    screen: {
      src: adminDashboardDark,
      alt: 'System Admin dashboard in dark mode',
      caption: 'The same dashboard in dark mode: only the tokens changed.',
    },
    snippets: ['theme-apply', 'index-dark-variant'],
  },
]
