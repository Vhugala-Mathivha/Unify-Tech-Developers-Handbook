// Code shown on the 02 · Frontend Development chapters (ARMS.Frontend).
// Line numbers are the real ones; `notes` add handbook explanations after a line.
const f = (id, file, from, to, notes, extra = {}) => ({ id, repo: 'frontend', file, from, to, ...(notes ? { notes } : {}), ...extra })

export const SNIPPETS = [
  // ======================= Getting started =======================
  f('fe-feature-index', 'src/features/auth/index.js', 27, 29, {
    27: 'A feature folder exposes its public pieces here; pages import from the folder, never its inner files',
  }),
  f('fe-thin-page', 'src/pages/system-admin/VenueManagement.jsx', 7, 21, {
    7: 'A page imports the shared layout...',
    8: "...its role's sidebar list (it sits next to the role's pages)...",
    10: '...and one view from a feature folder',
    15: 'contextLabel is the text on the left of the top bar; roleLabel goes under the user’s name',
  }),
  f('fe-timetable-index', 'src/features/timetable/index.js', 18, 21, {
    18: 'Only these are public; the feature’s other files (colourUtils, nextClass…) stay private',
  }),
  f('fe-lib-index', 'src/lib/index.js', 29, 31, {
    29: 'Services import { api, downloadFile } from ‘../lib’',
  }),
  f('fe-main', 'src/main.jsx', 44, 62, {
    48: "ARMS's own Tailwind build loads first...",
    49: "...then the TUT component library's compiled CSS (the order matters)",
    54: 'One global store wraps the whole app (see App state: store & slices)',
    57: 'Toast pop-ups (success / error messages) used by every page',
  }),
  f('fe-package', 'package.json', 11, 30, {
    13: 'docx, exceljs, file-saver and jspdf build the Word / Excel / PDF downloads',
    18: 'lucide-react: every icon in the app',
    22: 'recharts: the dashboard bar charts',
    23: "TUT's shared React component library, installed from a .tgz kept in vendor/",
    26: 'Tailwind CSS 4 runs as a Vite plugin (see vite.config.js)',
  }),
  f('fe-vite', 'vite.config.js', 1, 7, { 6: 'React (JSX + fast refresh) and Tailwind are the only plugins' }),
  f('fe-app-routes', 'src/App.jsx', 75, 96, {
    78: 'ThemeProvider sits inside the router because the theme is saved per role (it reads the URL)',
    80: 'Public pages: no sign-in needed',
    83: 'A layout route: every page inside it needs a signed-in student',
    96: 'The lecturer and system-admin groups follow the same pattern',
  }),
  f('fe-protected-route', 'src/pages/ProtectedRoute.jsx', 37, 59, {
    40: 'A typo in the URL lands on your own dashboard (or sign-in), never a blank page',
    45: 'No valid session: back to the sign-in page',
    49: 'Wrong role (a student opening a /lecturer page): sent to their own dashboard',
    55: 'Outlet renders whichever child page matched',
    56: 'One idle timer covers every protected page',
  }),
  f('fe-role-routes', 'src/constants/routes.js', 91, 129, {
    91: 'Where each role lands after signing in',
    101: 'The backend may spell roles differently; they all map to one key',
  }),
  f('fe-auth-guard', 'src/services/authService.js', 307, 340, {
    311: 'Reads the expiry time stored inside the JWT itself',
    335: 'Dev sign-in tokens are not JWTs, so they skip the expiry check (local only)',
    337: 'A broken or expired session is cleared so it is not picked up again',
  }),
  f('fe-idle-consts', 'src/features/auth/components/IdleLogout.jsx', 57, 74, {
    58: '30 minutes',
    68: 'While active, the backend token is renewed at most every 30 seconds',
  }),
  f('fe-idle-signout', 'src/features/auth/components/IdleLogout.jsx', 123, 142, {
    129: 'Clears the session (authService.logout)',
    133: 'Tells the user why they were signed out',
    141: 'Moving to another page also counts as activity',
  }),
  f('fe-store', 'src/store/index.jsx', 36, 60, {
    44: 'Every action goes to every slice; each slice only reacts to its own action types',
    52: 'useMemo: consumers re-render only when the state really changes',
    58: 'Using the store outside StoreProvider is a bug, so it fails loudly',
  }),
  f('fe-auth-slice', 'src/store/slices/authSlice.js', 53, 78, {
    59: 'Restored from sessionStorage so refreshing the OTP page keeps it',
    69: 'Set by useAuth().login(), read by the OTP page',
    73: 'Signing out resets the slice',
  }),
  f('fe-api-client', 'src/lib/api.js', 54, 70, {
    54: 'VITE_API_BASE_URL (from .env) is read at BUILD time; the Render backend is the fallback',
    66: '100 s: the free Render backend can take up to a minute to wake up',
  }),
  f('fe-api-interceptors', 'src/lib/api.js', 72, 97, {
    77: 'Every request carries the signed-in user’s JWT',
    88: 'An expired token on a normal request: clear the session and go to sign-in',
  }),
  f('fe-endpoints', 'src/constants/api.js', 68, 97, {
    69: 'Paths with an id are functions, so callers cannot build them wrong',
    78: 'Comments record the confirmed backend response shape for each endpoint',
  }),
  f('fe-service-fetch', 'src/services/timetableService.js', 131, 152, {
    140: 'Dev sign-in: serve stub data, because the real API would answer 401',
  }),
  f('fe-service-map', 'src/services/timetableService.js', 64, 96, {
    66: 'The service is the only layer that talks HTTP',
    69: 'Module and lecturer names are looked up in two parallel requests',
    74: 'Backend fields (snake_case) become the shape the UI uses (camelCase)',
    94: 'Fails soft: the page shows an empty timetable instead of crashing',
  }),
  f('fe-query-load', 'src/lib/query.js', 24, 52, {
    24: 'Data younger than 30 s is reused instead of fetched again',
    37: 'Two components asking for the same key share one request',
  }),
  f('fe-query-hook', 'src/lib/query.js', 76, 123, {
    76: 'Same idea as React Query, in about 140 lines',
    92: 'Fresh data: answer from the cache',
    114: 'Fetch on mount and whenever the key changes',
  }),
  f('fe-query-use', 'src/features/venues/booking/hooks/useBookingData.js', 25, 39, {
    27: "The key says what the data is; invalidate('venues') later refreshes all of these",
    32: 'A null key skips the request until a venue is chosen',
  }),
  f('fe-page-cache', 'src/lib/pageCache.js', 55, 77, {
    57: 'A different token means a different user: the cache is emptied',
  }),
  f('fe-page-cache-use', 'src/features/student-academics/hooks/useSemesterTests.js', 22, 53, {
    25: 'Already loaded this session: show it at once',
    40: '...then refresh it in the background',
    42: 'Remember the fresh result for next time',
  }),
  f('fe-dev-signin', 'src/services/authService.js', 192, 204, {
    193: 'Vite sets import.meta.env.DEV to false in a production build, so this can never run on Render',
    198: 'Not a real JWT; api.js knows to let its 401s fail quietly',
  }),
  f('fe-dev-buttons', 'src/pages/auth/LoginPage.jsx', 83, 93, {
    88: 'Skips the password and OTP steps completely',
  }),
  f('fe-dev-panel', 'src/pages/auth/LoginPage.jsx', 132, 149, {
    134: 'Rendered only by `npm run dev`; removed from the production build',
  }),
  f('fe-export', 'src/lib/export/index.js', 29, 47, {
    30: 'import() inside a function: each library is downloaded only when that format is picked',
  }),
  f('fe-download-file', 'src/lib/downloadFile.js', 61, 79, {
    64: 'The backend builds the file; the browser receives it as a Blob',
    69: "The file name comes from the server's Content-Disposition header",
    71: 'A temporary <a download> link is clicked to save the file',
  }),
  f('fe-render', 'render.yaml', 1, 19, {
    14: 'npm ci installs exactly what package-lock.json lists',
    15: 'Vite writes the built site to dist/',
    17: 'Every path serves index.html so React Router can handle /student/dashboard on refresh',
  }, { language: 'yaml' }),
  f('fe-env', '.env.example', 1, 6, { 6: 'Copy to .env; the value is baked into the build' }, { language: 'yaml' }),

  // ======================= Shared screens =======================
  f('fe-home-state', 'src/pages/HomePage.jsx', 46, 61, {
    51: 'The landing page has its own light/dark toggle (the public theme scope)',
    55: 'Header links are #anchors that scroll to sections of this one page',
  }),
  f('fe-home-carousel', 'src/pages/HomePage.jsx', 86, 96, {
    88: 'Every 4 seconds the next hero photo fades in, wrapping back to the first',
    95: 'The interval is cleared when the page unmounts',
  }),
  f('fe-home-header', 'src/pages/HomePage.jsx', 127, 165, {
    132: 'Switches between light and dark for the public pages',
    137: 'The one main action: Sign in',
    147: 'Below the desktop breakpoint the links move into a hamburger menu',
  }),
  f('fe-home-hero', 'src/pages/HomePage.jsx', 171, 210, {
    179: 'Only the first slide downloads at high priority',
    181: "The 'active' class fades the current slide in (homepage.css)",
    205: 'Each dot jumps straight to its slide',
  }),
  f('fe-home-faq', 'src/pages/HomePage.jsx', 303, 330, {
    305: 'Only one answer is open at a time',
    313: 'aria-expanded / aria-controls tell screen readers which answer the button opens',
  }),
  f('fe-login-submit', 'src/pages/auth/LoginPage.jsx', 71, 81, {
    76: 'Checks the email + password; the backend emails a one-time code',
    77: 'No session yet: the user goes on to enter the code',
  }),
  f('fe-login-card', 'src/pages/auth/LoginPage.jsx', 104, 130, {
    122: "The backend's own error message, e.g. 'Invalid email or password'",
    127: 'The form only collects input; the page decides what happens on submit',
  }),
  f('fe-login-form', 'src/features/auth/components/LoginForm.jsx', 39, 82, {
    46: 'The form hands the values up and does not call the API itself',
    66: 'The eye button switches the field between hidden and visible',
  }),
  f('fe-use-auth-login', 'src/features/auth/hooks/useAuth.js', 46, 59, {
    51: 'Remembers which email is waiting for its code',
  }),
  f('fe-auth-login', 'src/services/authService.js', 87, 109, {
    89: 'One sign-in endpoint for every role',
    102: 'Resend: the backend cancels the earlier code, so only the newest works',
  }),
  f('fe-otp-change', 'src/pages/auth/OtpPage.jsx', 144, 179, {
    146: 'Letters and digits only, one character per box',
    150: 'You cannot skip ahead past an empty box',
    173: 'Typing a digit moves the cursor to the next box',
  }),
  f('fe-otp-paste', 'src/pages/auth/OtpPage.jsx', 185, 224, {
    199: 'A pasted code is spread across the boxes from the one you pasted into',
    215: 'A complete pasted code is verified straight away',
  }),
  f('fe-otp-verify', 'src/pages/auth/OtpPage.jsx', 419, 478, {
    440: 'No pending email (e.g. the tab was closed): start again at sign-in',
    457: 'The backend checks the code and returns the real session',
    469: 'Each role has its own dashboard',
  }),
  f('fe-verify-service', 'src/services/authService.js', 117, 156, {
    131: "Display name: first initial + surname, e.g. 'S Mokoena'",
    137: "'Student' / 'Lecturer' / 'System Admin' become 'student' / 'lecturer' / 'system-admin'",
    140: 'The session lives in sessionStorage: one tab, gone when the tab closes',
    145: "The user's faculty and department are added once, at sign-in",
  }),
  f('fe-otp-resend', 'src/pages/auth/OtpPage.jsx', 358, 399, {
    383: 'The expiry countdown restarts from what the backend says (5 minutes by default)',
    385: 'Resend is locked for 60 seconds',
  }),
  f('fe-layout-props', 'src/components/layout/DashboardLayout.jsx', 136, 158, {
    136: 'Every role page wraps its content in this layout',
    140: "Each role passes its own sidebar list (e.g. SYSTEM_ADMIN_NAV_ITEMS)",
    152: 'The bell reads a different notification feed per role',
  }),
  f('fe-layout-collapse', 'src/components/layout/DashboardLayout.jsx', 179, 216, {
    181: 'The collapsed / expanded choice is remembered in localStorage',
    201: 'Phones: full drawer. Tablets: icon rail. Desktop: the user’s choice',
  }),
  f('fe-layout-shell', 'src/components/layout/DashboardLayout.jsx', 316, 335, {
    316: "AppShell comes from tut-components-library: sidebar slot + top bar slot + content",
    327: 'More Apps: the other TUT systems this role may open',
  }),
  f('fe-layout-content', 'src/components/layout/DashboardLayout.jsx', 538, 548, {
    542: 'Page content uses 95% of the width beside the sidebar, centred',
  }),
  f('fe-sidebar-items', 'src/pages/system-admin/systemAdminNavItems.js', 32, 45, {
    32: 'Plain data: section heading, label, route and icon for each link',
    38: 'countKey: show a live count badge (pending booking requests)',
  }),
  f('fe-layout-sections', 'src/components/layout/DashboardLayout.jsx', 250, 276, {
    257: "A regular student sees 'Open Lab/Class' instead of 'My Bookings'",
    262: 'The flat list is grouped into headed sections, keeping the order they first appear in',
    274: 'The badge number, e.g. 7 booking requests waiting',
  }),
  f('fe-sidebar-active', 'src/components/layout/NavSidebar.jsx', 86, 95, {
    95: 'The longest matching path wins, so /venues/access highlights Class/Lab Access, not Venue Management',
  }),
  f('fe-sidebar-rows', 'src/components/layout/NavSidebar.jsx', 193, 221, {
    204: 'aria-current="page" tells screen readers which page is open',
    209: 'When collapsed, a small dot on the icon replaces the count',
  }),
  f('fe-sidebar-tip', 'src/components/layout/NavSidebar.jsx', 128, 146, {
    138: 'Only when collapsed: expanded rows already show their label',
    140: 'The bubble is positioned next to the hovered row',
  }),
  f('fe-sidebar-tip-portal', 'src/components/layout/NavSidebar.jsx', 328, 343, {
    330: "A portal renders the bubble on <body>, so the sidebar's overflow: hidden cannot clip it",
  }),
  f('fe-sidebar-apps', 'src/components/layout/NavSidebar.jsx', 226, 253, {
    235: 'A disclosure button: aria-expanded says whether the list is open',
    252: 'inert: the hidden links cannot be tabbed to while the list is closed',
  }),
  f('fe-systems', 'src/constants/systems.js', 46, 60, {
    49: 'No URL yet: clicking shows a "Coming soon" dialog',
    56: 'Only systems whose roles include the user’s role are listed',
  }),
  f('fe-nav-counts', 'src/components/layout/useNavCounts.js', 12, 17, {
    15: 'Same cache key as the Booking Requests page, so approving a request updates this badge',
  }),
  f('fe-topbar-title', 'src/components/layout/DashboardLayout.jsx', 278, 294, {
    281: "Admins work across faculties, so their bar says 'System Administration'",
  }),
  f('fe-bell-feeds', 'src/components/layout/DashboardLayout.jsx', 107, 134),
  f('fe-bell', 'src/components/layout/DashboardLayout.jsx', 344, 390, {
    356: 'The label includes the unread count for screen readers',
    362: 'The bell fills in while its popover is open',
    385: '99+ keeps the badge small',
  }),
  f('fe-bell-detail', 'src/components/layout/DashboardLayout.jsx', 164, 177, {
    168: 'A notification opens in a popup right here; the page does not change',
    175: 'It is marked read when the popup closes',
  }),
  f('fe-profile-menu', 'src/components/layout/DashboardLayout.jsx', 488, 529, {
    498: 'The same setting as Settings > Appearance, as a quick switch',
    501: 'role="switch" + aria-checked: announced as an on/off switch',
    523: 'Sign Out asks for confirmation first',
  }),
  f('fe-page-title-card', 'src/components/layout/PageTitleCard.jsx', 38, 61, {
    38: 'Every page (except the dashboards) starts with this card',
    50: 'eyebrow: a breadcrumb line above the title, e.g. Timetable Management > Upload Timetable',
    55: 'actions: buttons on the right, e.g. Upload Timetable',
  }),
  f('fe-theme-context', 'src/contexts/ThemeContext.jsx', 37, 72, {
    39: 'The URL decides the scope: public, student, lecturer or system-admin',
    42: 'key={scope}: moving to another scope remounts the state with that scope’s saved theme',
    52: 'Applies the class on <html> and saves the choice',
    57: "'Match my device' listens for the operating system switching between light and dark",
  }),
  f('fe-theme-scope', 'src/utils/theme.js', 33, 46, {
    44: "Saved as arms_theme (public) or arms_theme_student / _lecturer / _system-admin",
  }),
  f('fe-appearance-hook', 'src/features/settings/hooks/useAppearance.js', 35, 50, {
    45: 'Applies at once through ThemeContext',
    46: 'Also sent to the settings service (fire and forget)',
  }),
  f('fe-appearance-tiles', 'src/features/settings/components/AppearanceCard.jsx', 83, 116, {
    85: 'Arrow keys move between the tiles, like native radio buttons',
    100: 'The three tiles form one radio group for screen readers',
    112: 'Only the selected tile is in the Tab order (roving tabindex)',
  }),
]
