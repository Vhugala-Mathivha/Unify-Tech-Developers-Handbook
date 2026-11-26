// Table of contents, one entry per chapter page to be written.
//
// Outline is based on the ARMS.Frontend and ARMS.Backend repositories.
// An entry gets a page number (and becomes clickable) once its chapter page
// exists — give it `pageId` matching a page key in src/book/pages.js.
//
// Order inside each category follows how the code was built: overview and
// setup first, then shared screens / core, then role-specific features.

/**
 * @typedef {{ title: string, pageId?: string }} TocEntry
 * @typedef {{ title: string, entries: TocEntry[] }} TocGroup
 * @typedef {{ id: string, number: string, title: string, summary: string, groups: TocGroup[] }} TocCategory
 */

/** @type {TocCategory[]} */
export const tocCategories = [
  {
    id: 'ui-ux',
    number: '01',
    title: 'UI/UX Design',
    summary: 'The visual language of ARMS and why it looks and feels the way it does.',
    groups: [
      {
        title: 'Foundations',
        entries: [
          { title: 'Design goals & principles', pageId: 'ui-design-goals' },
          { title: 'Colour palette & themes', pageId: 'ui-colour-palette' },
          { title: 'Typography', pageId: 'ui-typography' },
          { title: 'Icons & imagery', pageId: 'ui-icons-imagery' },
          { title: 'Logos & brand marks', pageId: 'ui-logos' },
          { title: 'Layout, spacing & grids', pageId: 'ui-layout-spacing' },
          { title: 'Light & dark mode', pageId: 'ui-light-dark' },
        ],
      },
      {
        title: 'Components & patterns',
        entries: [
          { title: 'Shared UI components', pageId: 'ui-shared-components' },
          { title: 'Cards & dashboard widgets', pageId: 'ui-cards-widgets' },
          { title: 'Alerts, empty states & loading skeletons', pageId: 'ui-feedback-states' },
          { title: 'Motion & micro-interactions', pageId: 'ui-motion' },
        ],
      },
      {
        title: 'Key screens',
        entries: [
          { title: 'Landing page', pageId: 'ui-screen-landing' },
          { title: 'Sign in & OTP', pageId: 'ui-screen-sign-in' },
          { title: 'Role dashboards', pageId: 'ui-screen-dashboards' },
        ],
      },
    ],
  },
  {
    id: 'frontend',
    number: '02',
    title: 'Frontend Development',
    summary: 'The React client: how it is structured, routed, styled and shipped.',
    groups: [
      {
        title: 'Getting started',
        entries: [
          { title: 'Project file structure', pageId: 'fe-file-structure' },
          { title: 'Languages, libraries & tools', pageId: 'fe-tools' },
          { title: 'Routing & protected routes', pageId: 'fe-routing' },
          { title: 'App state: store & slices', pageId: 'fe-store' },
          { title: 'API client & services', pageId: 'fe-api' },
          { title: 'Data fetching & caching', pageId: 'fe-data-caching' },
          { title: 'Dev sign-in & demo data', pageId: 'fe-dev-signin' },
          { title: 'Downloads & exports', pageId: 'fe-exports' },
          { title: 'Deployment on Render', pageId: 'fe-deploy' },
        ],
      },
      {
        title: 'Shared screens',
        entries: [
          { title: 'Landing page', pageId: 'fe-landing' },
          { title: 'Sign in', pageId: 'fe-sign-in' },
          { title: 'OTP verification', pageId: 'fe-otp' },
          { title: 'Dashboard layout', pageId: 'fe-dashboard-layout' },
          { title: 'Sidebar navigation', pageId: 'fe-sidebar' },
          { title: 'Top bar & page titles', pageId: 'fe-topbar' },
          { title: 'Theme switching', pageId: 'fe-theme-switching' },
        ],
      },
      {
        title: 'System Admin',
        entries: [
          { title: 'Dashboard', pageId: 'fe-admin-dashboard' },
          { title: 'Timetable Management', pageId: 'fe-admin-timetable' },
          { title: 'Find a Timetable', pageId: 'fe-admin-find' },
          { title: 'Calendar Management', pageId: 'fe-admin-calendar' },
          { title: 'Booking Requests', pageId: 'fe-admin-booking-requests' },
          { title: 'Venue Management', pageId: 'fe-admin-venues' },
          { title: 'Class/Lab Access', pageId: 'fe-admin-access' },
          { title: 'Venue Activity', pageId: 'fe-admin-activity' },
          { title: 'Notifications', pageId: 'fe-admin-notifications' },
          { title: 'Support', pageId: 'fe-admin-support' },
          { title: 'Settings', pageId: 'fe-admin-settings' },
        ],
      },
      {
        title: 'Lecturer',
        entries: [
          { title: 'Dashboard', pageId: 'fe-lec-dashboard' },
          { title: 'My Timetable', pageId: 'fe-lec-timetable' },
          { title: 'Find a Timetable', pageId: 'fe-lec-find' },
          { title: 'My Groups', pageId: 'fe-lec-groups' },
          { title: 'Core Calendar', pageId: 'fe-lec-calendar' },
          { title: 'My Bookings', pageId: 'fe-lec-bookings' },
          { title: 'Lab Access Requests', pageId: 'fe-lec-lab-access' },
          { title: 'Notifications', pageId: 'fe-lec-notifications' },
          { title: 'Support', pageId: 'fe-lec-support' },
          { title: 'Settings', pageId: 'fe-lec-settings' },
        ],
      },
      {
        title: 'Student',
        entries: [
          { title: 'Dashboard', pageId: 'fe-stu-dashboard' },
          { title: 'My Timetable', pageId: 'fe-stu-timetable' },
          { title: 'Find a Timetable', pageId: 'fe-stu-find' },
          { title: 'Semester Tests', pageId: 'fe-stu-tests' },
          { title: 'Examinations', pageId: 'fe-stu-exams' },
          { title: 'Core Calendar', pageId: 'fe-stu-calendar' },
          { title: 'My Bookings / Open Lab/Class', pageId: 'fe-stu-bookings' },
          { title: 'Notifications', pageId: 'fe-stu-notifications' },
          { title: 'Support', pageId: 'fe-stu-support' },
          { title: 'Settings', pageId: 'fe-stu-settings' },
        ],
      },
    ],
  },
  {
    id: 'backend',
    number: '03',
    title: 'Backend Development',
    summary: 'The .NET API: Clean Architecture, request handling and features.',
    groups: [
      {
        title: 'Getting started',
        entries: [
          { title: 'Solution structure (Clean Architecture)' },
          { title: 'Languages, libraries & tools' },
          { title: 'Configuration & settings' },
          { title: 'Docker & CI pipeline' },
        ],
      },
      {
        title: 'Core',
        entries: [
          { title: 'Request pipeline & middleware' },
          { title: 'Authentication & JWT' },
          { title: 'Password reset' },
          { title: 'CQRS with MediatR' },
          { title: 'Validation' },
          { title: 'Error handling' },
          { title: 'Email service' },
          { title: 'Background services & reminders' },
        ],
      },
      {
        title: 'Features',
        entries: [
          { title: 'Users & roles' },
          { title: 'Faculties, departments & modules' },
          { title: 'Groups' },
          { title: 'Timetables & planner upload' },
          { title: 'Academic calendar' },
          { title: 'Venues & lab bookings' },
          { title: 'Lab access requests' },
          { title: 'Notifications' },
          { title: 'Support tickets' },
          { title: 'Student feedback' },
        ],
      },
    ],
  },
  {
    id: 'integration',
    number: '04',
    title: 'System Integration',
    summary: 'How the frontend, backend and database work together end to end.',
    groups: [
      {
        title: 'Connecting the layers',
        entries: [
          { title: 'Environments & API base URL' },
          { title: 'API client & interceptors' },
          { title: 'Sign-in flow, end to end' },
          { title: 'Tokens & protected routes' },
          { title: 'CORS & security' },
          { title: 'Error handling across layers' },
        ],
      },
      {
        title: 'Feature flows',
        entries: [
          { title: 'Timetable upload: Excel → API → database' },
          { title: 'Venue booking & approval' },
          { title: 'Lab access requests' },
          { title: 'Notifications delivery' },
          { title: 'Support tickets' },
        ],
      },
    ],
  },
  {
    id: 'database',
    number: '05',
    title: 'Database Architecture',
    summary: 'PostgreSQL and Entity Framework Core: the data behind ARMS.',
    groups: [
      {
        title: 'Foundations',
        entries: [
          { title: 'PostgreSQL & Entity Framework Core' },
          { title: 'Database contexts' },
          { title: 'Entity model overview' },
          { title: 'Migrations' },
          { title: 'Seeding & initial data' },
          { title: 'SQL scripts & data fixes' },
        ],
      },
      {
        title: 'Data areas',
        entries: [
          { title: 'People: admins, lecturers & students' },
          { title: 'Faculties, departments & modules' },
          { title: 'Groups & timetables' },
          { title: 'Academic planner & calendar' },
          { title: 'Venues, labs & bookings' },
          { title: 'Requests, notifications & support' },
        ],
      },
    ],
  },
]
