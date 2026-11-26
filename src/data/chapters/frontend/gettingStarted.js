// 02 · Frontend Development · Getting started
import loginLight from '../../../assets/screens/login-light.webp'
import { screen } from './screens'

const base = { category: 'frontend', group: 'Getting started' }

export const gettingStartedChapters = [
  {
    ...base,
    id: 'fe-file-structure',
    title: 'Project file structure',
    spreads: [
      {
        heading: 'The whole project at a glance',
        intro: [
          'ARMS.Frontend is organised by feature, not by file type. Everything for one feature (its components, hooks and helpers) lives in one folder under src/features, and pages only assemble those pieces.',
          'Every source file starts with a WHAT / WHY / HOW header comment, so read the top of a file first. The next two spreads explain each folder.',
        ],
        visual: {
          type: 'tree',
          text: `ARMS.Frontend/
├─ index.html       page shell + early theme script
├─ public/          favicons, served as-is
├─ vendor/          tut-components-library .tgz
├─ render.yaml      Render deployment settings
├─ .env.example     VITE_API_BASE_URL template
└─ src/
   ├─ main.jsx      entry: store, toasts, <App/>
   ├─ App.jsx       every route in one place
   ├─ index.css     Tailwind + colour token bridge
   ├─ pages/        one file per screen, by role
   ├─ features/     one folder per feature
   ├─ components/   shared layout & UI pieces
   ├─ services/     every call to the backend
   ├─ lib/          api client, caches, exports
   ├─ constants/    routes, endpoints, site text
   ├─ contexts/     ThemeContext
   ├─ store/        global state + slices
   ├─ hooks/        useMediaQuery
   ├─ utils/        small pure helpers
   ├─ styles/       one stylesheet per area
   └─ assets/images logos, photos, backgrounds`,
        },
        snippets: ['fe-main'],
      },
      {
        heading: 'pages/ and features/',
        intro: [
          'pages/ has one folder per role (student, lecturer, system-admin) plus auth/ for sign-in and OTP. A page file is thin: the DashboardLayout, its role’s sidebar list and one feature view. The role’s nav-items file sits next to its pages.',
          'features/ holds the real work. Each folder has components/, hooks/ and an index.js that lists what other code may import.',
        ],
        visual: {
          type: 'table',
          head: ['features/…', 'What it holds'],
          rows: [
            ['auth', 'login form, useAuth, idle sign-out'],
            ['*-dashboard (×3)', 'each role’s dashboard cards + stats hook'],
            ['timetable', 'My Timetable grid, colours, Find a Timetable'],
            ['timetable-management', 'admin upload, publish, clash reports'],
            ['calendar', 'Core Calendar month / year views'],
            ['calendar-management', 'admin calendar upload'],
            ['groups', 'lecturer My Groups + rosters'],
            ['student-academics', 'semester tests, examinations'],
            ['notifications', 'feeds, filters, detail popup'],
            ['support', 'Support Centre, FAQs, manuals, admin queue'],
            ['settings', 'profile, security, appearance cards'],
            ['venues', 'bookings, lab access, venue admin, activity'],
          ],
        },
        snippets: ['fe-thin-page', 'fe-timetable-index', 'fe-feature-index'],
      },
      {
        heading: 'The shared folders',
        intro: [
          'Anything used by more than one feature lives outside features/. Components are split by job, services mirror the backend’s controllers, and constants keep every path and endpoint in one place.',
        ],
        visual: {
          type: 'table',
          head: ['Folder', 'What it holds'],
          rows: [
            ['components/layout', 'DashboardLayout, NavSidebar, PageTitleCard'],
            ['components/dashboard', 'welcome card, charts, mini calendar'],
            ['components/ui', 'tabs, menus, dropzone, year picker'],
            ['components/feedback', 'alerts, empty states, skeletons'],
            ['services/', 'one file per backend area; venues/ subfolder'],
            ['services/stubs', 'demo data for dev sign-in'],
            ['lib/', 'api.js, query + page caches, export/'],
            ['constants/', 'ROUTES, ENDPOINTS, SITE, SYSTEMS'],
            ['contexts/ · store/', 'theme; auth, ui and alert state'],
            ['utils/', 'dates, formatters, theme, venue helpers'],
            ['styles/', 'variables, typography, per-page CSS'],
            ['assets/images', 'TUT logos, hero and department photos'],
          ],
        },
        points: ['Import shared pieces through their index.js (e.g. ../lib), not their inner files.'],
        snippets: ['fe-lib-index'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-tools',
    title: 'Languages, libraries & tools',
    intro: [
      'The frontend is written in JavaScript with JSX (no TypeScript), built with Vite and styled with Tailwind CSS plus plain CSS files in src/styles.',
      'Most visual components (cards, dialogs, tables, the app shell) come from tut-components-library, TUT’s own React library, so ARMS looks like the university’s other systems.',
    ],
    visual: {
      type: 'table',
      head: ['Package', 'Used for'],
      rows: [
        ['react 19', 'the UI'],
        ['react-router-dom 7', 'pages and URLs'],
        ['tut-components-library', 'TUT components and colour tokens'],
        ['tailwindcss 4', 'utility classes'],
        ['axios', 'HTTP requests to the API'],
        ['lucide-react', 'icons'],
        ['recharts', 'dashboard charts'],
        ['jspdf · exceljs · docx', 'PDF / Excel / Word downloads'],
      ],
    },
    points: [
      'npm run dev starts Vite on localhost:5173; npm run build writes the site to dist/.',
      'The component library is installed from a .tgz file in vendor/, not from the npm registry.',
    ],
    snippets: ['fe-package', 'fe-vite'],
  },
  {
    ...base,
    id: 'fe-routing',
    title: 'Routing & protected routes',
    spreads: [
      {
        heading: 'One route table, guarded by role',
        intro: [
          'Every URL is registered in App.jsx, using the paths in constants/routes.js. Public pages (landing, sign in, OTP) are open; every dashboard page sits inside a ProtectedRoute for its role.',
          'ProtectedRoute checks the session before anything renders. No session goes to sign-in; the wrong role goes to that user’s own dashboard.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Open /student/timetable', 'React Router matches the student group'],
            ['ProtectedRoute role="student"', 'reads the session from sessionStorage'],
            ['Valid student session?', 'yes: render the page · no: redirect'],
            ['IdleLogout starts', 'one 30-minute timer for every page'],
          ],
        },
        points: [
          'Never hard-code a path: use ROUTES.X, so a renamed URL changes in one place.',
          'A URL that matches nothing redirects to your dashboard or to sign-in.',
        ],
        snippets: ['fe-app-routes', 'fe-protected-route'],
      },
      {
        heading: 'Sessions, roles and idle sign-out',
        intro: [
          'A session is a JWT plus the user, stored in sessionStorage, so it belongs to one browser tab. getAuthenticatedUser() reads it and checks the token’s own expiry time.',
          'After 30 minutes without activity IdleLogout signs the user out. In the last 10 seconds a dialog counts down with “Stay signed in”. While the user is active, the backend token is renewed every 30 seconds.',
        ],
        points: [
          'The backend’s role names (“Student”, “System Admin”) are normalised to one key: student, lecturer, system-admin.',
          'A damaged or expired session is cleared, not reused.',
        ],
        snippets: ['fe-auth-guard', 'fe-role-routes', 'fe-idle-consts', 'fe-idle-signout'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-store',
    title: 'App state: store & slices',
    intro: [
      'ARMS has a small global store built from React Context and useReducer, without Redux. It holds three slices: auth (user, token, the email waiting for its OTP), ui (sidebar and busy flags) and alert.',
      'Most data does not live here. Pages load their data through feature hooks, and the store only keeps what several screens must share, like the sign-in in progress.',
    ],
    visual: {
      type: 'table',
      head: ['Action', 'What it changes'],
      rows: [
        ['auth/setPendingEmail', 'email waiting for its OTP'],
        ['auth/setUser · auth/setToken', 'the signed-in session'],
        ['auth/clear', 'everything (sign out)'],
        ['ui/toggleSidebar · ui/setBusy', 'layout flags'],
        ['alert/setActive · alert/dismiss', 'in-app alerts'],
      ],
    },
    points: [
      'Read and dispatch with const { state, dispatch } = useStore().',
      'The pending email is mirrored to sessionStorage so a refresh on /otp does not lose it.',
    ],
    snippets: ['fe-store', 'fe-auth-slice'],
  },
  {
    ...base,
    id: 'fe-api',
    title: 'API client & services',
    spreads: [
      {
        heading: 'One Axios client for every request',
        intro: [
          'lib/api.js creates the single Axios instance every service uses. It sets the base URL from VITE_API_BASE_URL, adds the JWT to every request, and handles an expired session in one place.',
          'Endpoint paths live in constants/api.js, grouped by backend controller. Each group records the response shape the team confirmed against the real API.',
        ],
        points: [
          'The timeout is 100 seconds because the free Render backend sleeps when idle.',
          'Sign-in endpoints are excluded from the 401 redirect: a wrong password is shown on the form instead.',
        ],
        snippets: ['fe-api-client', 'fe-api-interceptors', 'fe-endpoints'],
      },
      {
        heading: 'Services: the only layer that talks HTTP',
        intro: [
          'Components never call Axios. A feature hook calls a service function (fetchTimetable, publishTimetable…), and the service calls the API and maps the backend’s fields to the shape the UI expects.',
          'Services also decide what happens during local development: with a dev sign-in they return stub data from services/stubs, because the real API would reject the fake token.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Page', 'StudentTimetable.jsx'],
            ['Feature hook', 'useTimetable() holds state'],
            ['Service', 'fetchTimetable() calls the API and maps fields'],
            ['lib/api.js', 'adds the token, handles 401'],
          ],
        },
        snippets: ['fe-service-fetch', 'fe-service-map'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-data-caching',
    title: 'Data fetching & caching',
    intro: [
      'ARMS uses two small caches so that returning to a page is instant. lib/query.js is a tiny React-Query-style cache: data is stored under a key like [\'bookings\', \'mine\', userId], shared between components, and refreshed when it gets stale or is invalidated.',
      'lib/pageCache.js remembers what each page loaded during this sign-in. A page shows that at once and refreshes it in the background. Signing in as someone else empties it.',
    ],
    points: [
      'After an action, call invalidate(\'bookings\') and every reader of a key starting with bookings refetches.',
      'Polling (refetchInterval) pauses while the browser tab is hidden.',
    ],
    snippets: ['fe-query-load', 'fe-query-hook', 'fe-query-use', 'fe-page-cache', 'fe-page-cache-use'],
  },
  {
    ...base,
    id: 'fe-dev-signin',
    title: 'Dev sign-in & demo data',
    intro: [
      'Testing every role through real email codes is slow, so the sign-in page has a Dev sign-in panel in local development. One click signs in as a demo student, tutor, mentor, lecturer or system admin.',
      'The demo accounts and their data live in services/stubs. Because Vite removes import.meta.env.DEV code from production builds, the panel and devSignIn() cannot exist on the deployed site.',
    ],
    points: [
      '“Reset venue demo data” puts every booking, request and closure back to the original test data.',
      'Dev sessions are flagged, so a 401 from the real API fails quietly instead of signing you out.',
    ],
    screen: {
      src: loginLight,
      alt: 'ARMS sign-in page with the Dev sign-in panel listing demo accounts beside the sign-in card',
      caption: 'Sign in during npm run dev: the Dev sign-in panel sits beside the real card.',
    },
    snippets: ['fe-dev-signin', 'fe-dev-buttons', 'fe-dev-panel'],
  },
  {
    ...base,
    id: 'fe-exports',
    title: 'Downloads & exports',
    intro: [
      'ARMS produces files in two ways. Most are built by the backend (My Timetable, Semester Tests, the Core Calendar, clash reports): downloadFile() fetches them as a Blob and saves them with the name the server sends.',
      'A few are built in the browser through lib/export: booking receipts and Find a Timetable’s bulk and venue downloads. exportTable() and exportSections() pick the PDF, Excel or Word exporter and load that library only when it is needed.',
    ],
    visual: {
      type: 'table',
      head: ['Format', 'Library', 'File'],
      rows: [
        ['PDF', 'jspdf + jspdf-autotable', 'pdfExport.js'],
        ['XLSX', 'exceljs', 'excelExport.js'],
        ['DOCX', 'docx + file-saver', 'wordExport.js'],
      ],
      code: [2],
    },
    points: [
      'Dynamic import() keeps these large libraries out of the first page load.',
      'exceljs is used instead of the npm xlsx package because of its unpatched security advisories.',
    ],
    screen: screen('student-tests', 'Semester Tests page with a Download button above the table', 'Semester Tests: the Download menu asks the backend for a PDF, Word or Excel file.'),
    snippets: ['fe-export', 'fe-download-file'],
  },
  {
    ...base,
    id: 'fe-deploy',
    title: 'Deployment on Render',
    intro: [
      'The frontend is a static site on Render. Render runs npm ci && npm run build and serves the dist/ folder that Vite produces.',
      'The app uses real URLs (/student/dashboard), which exist only inside React Router. A rewrite rule sends every path to index.html, so refreshing any page works.',
    ],
    visual: {
      type: 'steps',
      items: [
        ['git push', 'Render picks up the new commit'],
        ['npm ci && npm run build', 'VITE_API_BASE_URL is baked in now'],
        ['Publish dist/', 'static files on Render’s CDN'],
        ['Rewrite /* → /index.html', 'React Router takes over in the browser'],
      ],
    },
    points: [
      'Changing VITE_API_BASE_URL needs a new build; it is not read at run time.',
      'render.yaml keeps these settings in the repo; the dashboard has the same Redirect/Rewrite option.',
    ],
    snippets: ['fe-render', 'fe-env'],
  },
]
