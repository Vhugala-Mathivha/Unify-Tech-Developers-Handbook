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
          { title: 'Layout, spacing & grids', pageId: 'ui-layout-spacing' },
          { title: 'Light & dark mode', pageId: 'ui-light-dark' },
        ],
      },
      {
        title: 'Components & patterns',
        entries: [
          { title: 'Shared UI components' },
          { title: 'Cards & dashboard widgets' },
          { title: 'Alerts, empty states & loading skeletons' },
          { title: 'Motion & micro-interactions' },
        ],
      },
      {
        title: 'Key screens',
        entries: [
          { title: 'Landing page' },
          { title: 'Sign in & OTP' },
          { title: 'Role dashboards' },
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
          { title: 'Project file structure' },
          { title: 'Languages, libraries & tools' },
          { title: 'Routing & protected routes' },
          { title: 'App state: store & slices' },
          { title: 'API client & services' },
          { title: 'Deployment on Render' },
        ],
      },
      {
        title: 'Shared screens',
        entries: [
          { title: 'Landing page' },
          { title: 'Sign in' },
          { title: 'OTP verification' },
          { title: 'Dashboard layout' },
          { title: 'Sidebar navigation' },
          { title: 'Top bar & page titles' },
          { title: 'Theme switching' },
        ],
      },
      {
        title: 'System Admin',
        entries: [
          { title: 'Dashboard' },
          { title: 'Timetable Management' },
          { title: 'Find a Timetable' },
          { title: 'Calendar Management' },
          { title: 'Booking Requests' },
          { title: 'Venue Management' },
          { title: 'Class/Lab Access' },
          { title: 'Venue Activity' },
          { title: 'Notifications, Support & Settings' },
        ],
      },
      {
        title: 'Lecturer',
        entries: [
          { title: 'Dashboard' },
          { title: 'My Timetable' },
          { title: 'Find a Timetable' },
          { title: 'My Groups' },
          { title: 'Core Calendar' },
          { title: 'My Bookings' },
          { title: 'Lab Access Requests' },
          { title: 'Notifications, Support & Settings' },
        ],
      },
      {
        title: 'Student',
        entries: [
          { title: 'Dashboard' },
          { title: 'My Timetable' },
          { title: 'Find a Timetable' },
          { title: 'Semester Tests' },
          { title: 'Examinations' },
          { title: 'Core Calendar' },
          { title: 'My Bookings' },
          { title: 'Notifications, Support & Settings' },
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
