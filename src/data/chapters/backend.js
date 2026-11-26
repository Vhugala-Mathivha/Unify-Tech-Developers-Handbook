// 03 · Backend Development — ARMS.Backend (.NET 10, ASP.NET Core, EF Core, PostgreSQL).
// The API has no screens of its own: each chapter shows the ARMS screen its code serves.
import loginLight from '../../assets/screens/login-light.webp'
import { screen } from './frontend/screens'

const start = { category: 'backend', group: 'Getting started' }
const core = { category: 'backend', group: 'Core' }
const feat = { category: 'backend', group: 'Features' }

export const backendChapters = [
  // ======================= Getting started =======================
  {
    ...start,
    id: 'be-solution',
    title: 'Solution structure (Clean Architecture)',
    spreads: [
      {
        heading: 'Four projects, one direction',
        intro: [
          'ARMS.Backend is one Visual Studio solution, ARMS.sln, with four projects. They follow Clean Architecture: the inner layers know nothing about the outer ones, so the business rules do not depend on the web or the database.',
          'ARMS.API receives HTTP requests, ARMS.Infrastructure talks to PostgreSQL, email and files, ARMS.Application holds the contracts between them, and ARMS.Domain holds the entities.',
        ],
        visual: {
          type: 'tree',
          text: `ARMS.Backend/
├─ ARMS.sln          the solution
├─ global.json       .NET SDK version (10)
├─ docker/           Dockerfile
├─ docker-compose.yml
├─ .github/workflows CI build + branch rules
├─ docs/             SQL scripts for the live DB
├─ ARMS.API/         web layer (startup, controllers)
├─ ARMS.Application/ contracts: DTOs, interfaces
├─ ARMS.Infrastructure/  EF Core, services, files
└─ ARMS.Domain/      entities and enums`,
        },
        points: ['Dependencies point inward: API → Infrastructure → Application → Domain.'],
        snippets: ['be-app-di'],
      },
      {
        heading: 'What each project holds',
        intro: [
          'Most real work happens in ARMS.Infrastructure/Services: one service per feature (bookings, timetables, notifications…). Controllers in ARMS.API stay thin: they read the user from the token, call a service and turn the result into an HTTP response.',
        ],
        visual: {
          type: 'table',
          head: ['Folder', 'What it holds'],
          rows: [
            ['API/Controllers', '31 controllers, one per area'],
            ['API/Program.cs', 'startup: services and the HTTP pipeline'],
            ['API/Middleware', 'error, correlation-id, logging middleware (not wired up yet)'],
            ['Application/DTOs', 'request and response shapes'],
            ['Application/Interfaces', 'service contracts (ILabBookingService…)'],
            ['Application/Features', 'MediatR commands and queries (template)'],
            ['Domain/Entities', '41 entities: User, LabBooking, Module…'],
            ['Infrastructure/Services', 'the feature services'],
            ['Infrastructure/Persistence', 'DbContexts, EF configurations, migrations, seeding'],
            ['Infrastructure/Timetable', 'PDF / Word / Excel exporters and templates'],
            ['Infrastructure/Email', 'EmailService and the email banner'],
          ],
        },
        snippets: ['be-infra-services'],
      },
      {
        heading: 'How a request travels',
        intro: [
          'Every feature follows the same path. The controller is the only part that knows about HTTP; the service holds the rules and uses EF Core to read and write PostgreSQL.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['HTTP request', 'e.g. POST /api/lab-bookings/book-lab-class'],
            ['Pipeline', 'CORS → JWT authentication → role check'],
            ['Controller', 'reads the user id from the token, calls the service'],
            ['Service', 'validates, applies the rules, saves with EF Core'],
            ['Side effects', 'notifications, emails, activity log'],
            ['Response', 'JSON (or a file) with a status code'],
          ],
        },
        related: ['be-bookings'],
        snippets: ['be-booking-api'],
      },
    ],
  },
  {
    ...start,
    id: 'be-tools',
    title: 'Languages, libraries & tools',
    intro: [
      'The backend is C# on .NET 10 with ASP.NET Core Web API. Data lives in PostgreSQL, reached through Entity Framework Core and the Npgsql provider.',
      'A handful of libraries do the specialist work: reading Excel uploads, writing PDF, Word and Excel files, hashing passwords and issuing JWTs.',
    ],
    visual: {
      type: 'table',
      head: ['Package', 'Used for'],
      rows: [
        ['EF Core 10 + Npgsql', 'PostgreSQL data access'],
        ['JwtBearer', 'validating sign-in tokens'],
        ['BCrypt.Net-Next', 'password and OTP hashing'],
        ['ExcelDataReader', 'reading timetable uploads (.xls / .xlsx)'],
        ['ClosedXML', 'reading the calendar, writing Excel files'],
        ['QuestPDF', 'drawing PDF timetables'],
        ['OpenXML SDK', 'writing Word timetables'],
        ['MediatR · FluentValidation · AutoMapper', 'CQRS template'],
        ['Swashbuckle', 'Swagger API docs at /swagger'],
      ],
      code: [],
    },
    points: ['dotnet run --project ARMS.API starts the API; open /swagger to try every endpoint with a token.'],
    snippets: ['be-infra-db'],
  },
  {
    ...start,
    id: 'be-startup',
    title: 'Program.cs & dependency injection',
    spreads: [
      {
        heading: 'Registering services',
        intro: [
          'Program.cs is the composition root. It registers everything the API needs with ASP.NET Core’s dependency injection container: controllers, CORS, the Application layer, the Infrastructure layer, caching, compression and Swagger.',
          'Most services are scoped, meaning one instance per HTTP request. That matches EF Core’s DbContext, which must not be shared between requests.',
        ],
        points: ['A failing background job is ignored instead of stopping the whole API.'],
        snippets: ['be-program-services', 'be-host-resilience'],
      },
      {
        heading: 'Building the HTTP pipeline',
        intro: [
          'After building the app, Program.cs prepares the database, turns on Swagger and lines up the middleware. Order matters: compression and CORS first, then authentication, then authorization, then the controllers.',
          'Two small endpoints are mapped directly: /health for uptime monitors and /email-banner.jpg for the picture at the top of every email.',
        ],
        snippets: ['be-program-pipeline'],
      },
    ],
  },
  {
    ...start,
    id: 'be-config',
    title: 'Configuration & settings',
    intro: [
      'Settings come from appsettings.json, appsettings.Development.json and environment variables, read through IConfiguration. Code asks for a key by name, e.g. configuration["Session:IdleTimeoutMinutes"].',
      'On Render, secrets should be set as environment variables (a double underscore replaces the colon: Jwt__SecretKey). Keys and connection strings must never be committed to the repository.',
    ],
    visual: {
      type: 'table',
      head: ['Setting', 'Controls'],
      rows: [
        ['ConnectionStrings:DefaultConnection', 'main PostgreSQL database'],
        ['ConnectionStrings:TimetableConnection', 'timetable tables (optional)'],
        ['Jwt:Issuer · Audience · SecretKey', 'signing and checking tokens'],
        ['Session:IdleTimeoutMinutes', 'token lifetime (30)'],
        ['Cors:AllowedOrigins', 'which websites may call the API'],
        ['EmailSettings:MailScriptUrl · MailSecret', 'the email sender'],
        ['Authentication:*EmailDomain', 'allowed email domains per role'],
        ['AcademicCalendar:NotificationHours', 'when calendar reminders run'],
        ['AdminRequestReminders:*', 'booking request reminders'],
      ],
    },
    points: ['The API refuses to start when the JWT key is missing or shorter than 32 characters.'],
    snippets: ['be-jwt-validate'],
  },
  {
    ...start,
    id: 'be-docker-ci',
    title: 'Docker & CI pipeline',
    intro: [
      'The API ships as a Docker image built in two stages: the .NET SDK compiles and publishes, then only the published files are copied into the much smaller ASP.NET runtime image.',
      'GitHub Actions builds and tests every push and pull request on .NET 10. A second workflow enforces the branching rules: only dev may merge into main.',
    ],
    visual: {
      type: 'steps',
      items: [
        ['Feature branch', 'pull request into dev'],
        ['CI', 'restore → build → test'],
        ['dev → main', 'the only route into main'],
        ['Docker build', 'SDK stage → runtime stage, port 5000'],
      ],
    },
    snippets: ['be-dockerfile', 'be-compose', 'be-ci', 'be-branch-rules'],
  },

  // ======================= Core =======================
  {
    ...core,
    id: 'be-pipeline',
    title: 'Request pipeline & CORS',
    intro: [
      'Every request passes through the same middleware before reaching a controller. CORS decides whether the browser may call the API from the frontend’s address; authentication reads the JWT; authorization checks the role.',
      'ARMS.API/Middleware also contains exception-handling, correlation-id and request-logging middleware with a UseArmsPipeline() extension, but Program.cs does not call it yet, so those three do not run today.',
    ],
    points: [
      'The frontend’s URL must be in Cors:AllowedOrigins, or the browser blocks every call.',
      'Content-Disposition is exposed so downloads keep their server-made file names.',
    ],
    snippets: ['be-program-pipeline', 'be-program-services'],
  },
  {
    ...core,
    id: 'be-auth',
    title: 'Sign in & OTP',
    spreads: [
      {
        heading: 'Step 1: password, then a code by email',
        intro: [
          'POST /api/auth/login checks the email and password, cancels any earlier unused codes, and creates a new six-digit code. Only a BCrypt hash of the code is stored; the code itself goes out by email and is valid for five minutes.',
          'No token is issued yet: the frontend moves to the OTP screen.',
        ],
        points: [
          'Watch out: “account does not exist” and “incorrect password” are different messages, which tells anyone whether an email has an account.',
          'While OtpLogFallback is on, a failed email still lets sign-in continue, and the code is in the server log.',
        ],
        screen: { src: loginLight, alt: 'ARMS sign-in page', caption: 'The sign-in screen that calls POST /api/auth/login.' },
        snippets: ['be-login-find', 'be-login-otp', 'be-generate-otp', 'be-login-email'],
      },
      {
        heading: 'Step 2: verifying the code',
        intro: [
          'POST /api/auth/verify-otp takes the newest unused code for that email, checks its expiry and the number of attempts, and compares it with BCrypt. Five wrong tries burn the code.',
          'On success the code is marked used, a JWT is generated and the response carries the user’s profile (name, role, student or staff number).',
        ],
        points: ['Expiry is compared inside PostgreSQL: the database stores local time, and comparing in C# once kept codes valid for two hours.'],
        related: ['fe-otp'],
        screen: screen('otp', 'Verify Code screen', 'The Verify Code screen that calls POST /api/auth/verify-otp.'),
        snippets: ['be-verify-find', 'be-verify-check', 'be-verify-success'],
      },
    ],
  },
  {
    ...core,
    id: 'be-jwt',
    title: 'JWT tokens, sessions & roles',
    intro: [
      'A JWT is a signed token that says who the user is. TokenService puts the user id, name, email and role into it and signs it with the secret key; every later request sends it in the Authorization header.',
      'Tokens live for the 30-minute idle limit plus two minutes. While the user is active the frontend calls POST /api/auth/keep-alive for a fresh token, so an idle session also ends on the server.',
    ],
    visual: {
      type: 'table',
      head: ['Role', 'Example'],
      rows: [
        ['SystemAdmin', '[Authorize(Roles = "SystemAdmin")] on admin controllers'],
        ['Lecturer', 'lab access requests, lecturer timetable'],
        ['Student', 'student timetable, feedback'],
        ['Any signed-in user', '[Authorize] (faculties, groups, bookings)'],
      ],
      code: [],
    },
    snippets: ['be-token-life', 'be-token-claims', 'be-token-sign', 'be-keepalive', 'be-policies'],
  },
  {
    ...core,
    id: 'be-passwords',
    title: 'Password hashing & reset',
    intro: [
      'Passwords are hashed with BCrypt, which salts each hash and is slow on purpose, so a stolen database is hard to crack. New passwords must be 6–13 characters with a letter, a number and a special character.',
      'ARMS does not reset passwords itself: university accounts are managed on TUT4Life, so the reset endpoints point users there.',
    ],
    points: ['Watch out: VerifyPassword compares plain text when the stored value is not a BCrypt hash (older seeded accounts). Rehashing those accounts would remove this path.'],
    snippets: ['be-hasher', 'be-password-rules', 'be-reset', 'be-reset-auth'],
  },
  {
    ...core,
    id: 'be-errors',
    title: 'Error handling & responses',
    intro: [
      'Services signal problems by throwing ordinary .NET exceptions with a readable message. Each controller maps them to HTTP status codes in one helper, so every endpoint answers the same way: { message: "…" } with 400, 403, 404 or 409.',
      'Older controllers catch exceptions inline and return 500 with the message. The template also contains a global ExceptionHandlingMiddleware (Problem Details) and a BaseResponse envelope, which only the MediatR handlers use.',
    ],
    visual: {
      type: 'table',
      head: ['Exception', 'Status'],
      rows: [
        ['ArgumentException', '400 Bad Request'],
        ['UnauthorizedAccessException', '403 Forbidden'],
        ['KeyNotFoundException', '404 Not Found'],
        ['InvalidOperationException', '409 Conflict'],
      ],
    },
    snippets: ['be-run-helper', 'be-exception-mw', 'be-base-response'],
  },
  {
    ...core,
    id: 'be-cqrs',
    title: 'CQRS with MediatR & validation',
    intro: [
      'The project template set up CQRS: each read is a Query and each write a Command, sent through MediatR to its own handler, with FluentValidation running first in a pipeline behaviour.',
      'In ARMS today only the Departments controller uses it, and its handlers are still placeholders. Every real feature was built as a service instead. New code should follow the service pattern unless the team decides to move to MediatR.',
    ],
    points: ['If a handler throws NotImplementedException, it is template code, not a bug in a feature.'],
    snippets: ['be-cqrs-controller', 'be-cqrs-query', 'be-validation-behavior'],
  },
  {
    ...core,
    id: 'be-email',
    title: 'Email service',
    intro: [
      'Render blocks outgoing SMTP, so ARMS sends email over HTTPS: EmailService posts { secret, to, subject, html } to a Google Apps Script web app, which sends the message.',
      'Emails cover sign-in codes, booking confirmations, request decisions and support replies. Every one is wrapped in the ARMS banner and user text is HTML-encoded.',
    ],
    points: [
      'The script URL and secret come from settings or the MAIL_SCRIPT_URL / MAIL_SECRET environment variables.',
      'Watch out: sign-in codes are written to the server log as well.',
    ],
    snippets: ['be-email-otp', 'be-email-send'],
  },
  {
    ...core,
    id: 'be-caching',
    title: 'Caching',
    intro: [
      'Building one student’s timetable takes about seven database queries, so the result is kept in memory (IMemoryCache). Faculty lookups and calendar events are cached the same way.',
      'Cached entries are grouped into regions. Whenever SaveChanges writes timetable, group, enrolment or calendar data, the DbContext evicts the matching region, so no one sees stale data after an edit.',
    ],
    points: ['The cache lives in the API process: a restart (or a second instance) starts empty.'],
    snippets: ['be-cache-region', 'be-cache-invalidate', 'be-cache-use'],
  },
  {
    ...core,
    id: 'be-background',
    title: 'Background services & reminders',
    intro: [
      'Two BackgroundServices run for as long as the API is up. The calendar service checks upcoming academic events at set hours and sends 30/14/7/1/0-day reminders.',
      'The admin reminder service runs every 30 minutes: it lapses booking requests nobody answered before they started, and reminds System Admins about requests waiting more than 12 hours.',
    ],
    points: ['Each run creates its own DI scope, because DbContext is scoped and a background service is not.'],
    screen: screen('admin-booking-requests', 'Booking Requests waiting for an admin', 'Booking Requests: what the reminder service nudges admins about.'),
    snippets: ['be-bg-reminders', 'be-bg-calendar'],
  },

  // ======================= Features =======================
  {
    ...feat,
    id: 'be-users',
    title: 'Users, students & lecturers',
    intro: [
      'Every person is a User with one Role (Student, Lecturer, SystemAdmin), plus a row in Student, Lecturer or SystemAdmin with their number. The admin-only Users, Students, Lecturers and SystemAdmins controllers list and look them up.',
      'An admin can change a lecturer’s sign-in email (a TUT staff address or Gmail) and password; the password rules and BCrypt hashing are the same as everywhere else.',
    ],
    screen: screen('admin-settings', 'Admin Settings with profile details', 'Profile details come from these user records.'),
    snippets: ['be-lecturer-credentials'],
  },
  {
    ...feat,
    id: 'be-faculties',
    title: 'Faculties, modules & groups',
    intro: [
      'GET /api/faculties/me works out the signed-in user’s faculty and department from their modules and courses. The frontend uses it for the top bar and the welcome photo.',
      'GET /api/groups/{id}/students returns a group’s roster for My Groups. It prefers real group allocations and falls back to older name matches, then to an enrolment estimate.',
    ],
    screen: screen('lecturer-groups', 'My Groups page', 'My Groups reads its rosters from GET /api/groups/{id}/students.'),
    snippets: ['be-faculty-me', 'be-group-students'],
  },
  {
    ...feat,
    id: 'be-timetable-upload',
    title: 'Timetable upload & Excel import',
    spreads: [
      {
        heading: 'The upload endpoints',
        intro: [
          'System Admins upload the faculty’s timetable spreadsheet to POST /api/CreateTimetable/upload/class (or upload/test for tests and exams) as multipart form data, with its name, year, period and faculty.',
          'The file is parsed and saved as a Pending managed timetable. A clash check runs straight away, and admins are alerted about same-semester clashes.',
        ],
        screen: screen('admin-timetable-create', 'Upload Timetable form', 'Upload Timetable posts the spreadsheet here.'),
        snippets: ['be-upload-auth', 'be-upload-class', 'be-upload-clash-alert'],
      },
      {
        heading: 'Reading the spreadsheet',
        intro: [
          'TimetableExcelService (about 3,800 lines) understands the faculty’s template. It reads sheets A–H (one per timetable slot), finds the CODE header row and walks each row: module code, course, group, lecturer and the day/venue columns.',
          'Codes and courses fill down like merged cells. Lecturers, groups and modules are looked up once and cached for the upload; unknown ones are created or reported.',
        ],
        points: ['Anything skipped is counted with a reason, and the summary is returned to the admin.'],
        snippets: ['be-excel-sheets', 'be-excel-rows'],
      },
    ],
  },
  {
    ...feat,
    id: 'be-timetable-publish',
    title: 'Publishing & change alerts',
    intro: [
      'PUT /api/timetables/{id}/publish makes a timetable live. Only one timetable per type and faculty can be published, so the previous one becomes Inactive in a single UPDATE.',
      'If something was live before, a background task compares old and new sessions and tells the affected lecturers and students what moved: day, time or venue.',
    ],
    points: ['Deactivate hides a timetable again; Delete removes it with all its rows.'],
    screen: screen('admin-timetable-menu', 'Timetable Management row menu', 'Publish, Edit, Deactivate and Delete call these endpoints.'),
    snippets: ['be-publish', 'be-deactivate-others', 'be-change-alerts', 'be-change-diff'],
  },
  {
    ...feat,
    id: 'be-clashes',
    title: 'Clash detection',
    intro: [
      'GET /api/timetables/{id}/clashes checks a class timetable before it is published. For every student it builds their week the same way their own timetable would, then looks for two different modules at overlapping times.',
      'Sessions are sorted and joined into overlapping blocks. A block with two or more modules is a clash; it is marked same-semester when both modules are in the student’s current semester. A separate report covers lecturers.',
    ],
    points: ['Back-to-back sessions (one ends as the next starts) are not clashes.'],
    screen: screen('admin-timetable-clash', 'Clash report dialog', 'The clash report the frontend draws from this data.'),
    snippets: ['be-clash-records', 'be-clash-blocks'],
  },
  {
    ...feat,
    id: 'be-personal-timetables',
    title: 'Personal timetables & downloads',
    intro: [
      'Students and lecturers ask for “my timetable” without sending an id: the controller reads the user id from the token. The service resolves enrolments, groups and the published timetable, and caches the result.',
      'The download endpoints build the same timetable as PDF, Word or Excel and return it with File(), using the user’s name in the file name.',
    ],
    screen: screen('student-timetable', 'Student My Timetable', 'My Timetable reads GET /api/get-timetable/student/timetable/class.'),
    snippets: ['be-student-tt', 'be-student-download'],
  },
  {
    ...feat,
    id: 'be-group-timetables',
    title: 'Group timetables (Find a Timetable)',
    intro: [
      'GroupTimetablesController serves Find a Timetable: /filters lists faculties, courses, streams and years; /search returns the matching groups’ timetables; /search/download returns them as one file.',
      'Results and bulk downloads are capped, so a very wide search asks the user to narrow it.',
    ],
    screen: screen('admin-find', 'Find a Timetable', 'Find a Timetable calls /api/group-timetables.'),
    snippets: ['be-group-search'],
  },
  {
    ...feat,
    id: 'be-exports',
    title: 'Timetable templates: PDF, Word & Excel',
    intro: [
      'Downloads look like TUT’s own timetable templates. The exporters build one grid model and render it three ways: QuestPDF for PDF, the OpenXML SDK for Word and ClosedXML for Excel.',
      'For PDF, the template artwork is the bottom layer and each class is drawn on top at an exact position, with the template’s colours and fonts. There are exporters for students, lecturers, groups, semester tests, clash reports and the core calendar.',
    ],
    snippets: ['be-export-types', 'be-export-pdf'],
  },
  {
    ...feat,
    id: 'be-calendar',
    title: 'Academic calendar',
    intro: [
      'Admins upload the academic planner (.xlsx) to POST /api/planner/upload/planner. AcademicCalendarExcelImportService scans every worksheet for dated events and saves them; if anything fails, the previous calendar stays live.',
      'GET /api/academic-calendar/calendar returns the events to every role. The year and month downloads are built by CoreCalendarExporter.',
    ],
    screen: screen('admin-calendar-upload', 'Upload Calendar view', 'Upload Calendar posts the planner here.'),
    snippets: ['be-planner-upload', 'be-calendar-import', 'be-calendar-get'],
  },
  {
    ...feat,
    id: 'be-bookings',
    title: 'Lab & class bookings',
    spreads: [
      {
        heading: 'Making a booking',
        intro: [
          'LabBookingsController is used by lecturers, tutors and mentors. They see bookable venues, a venue’s day or week schedule, and book with POST /api/lab-bookings/book-lab-class.',
          'LabBookingService checks who is booking, the purpose, the chosen periods and the admin’s booking rules, then saves the booking: Pending in working hours, Approved after hours.',
        ],
        screen: screen('lecturer-book', 'Book a Class/Lab', 'Book a Class/Lab calls these endpoints.'),
        snippets: ['be-booking-api', 'be-book-validate', 'be-book-save'],
      },
      {
        heading: 'Rules that protect the timetable',
        intro: [
          'Any booking touching 08:00–16:59 South African time needs an admin. Students who are tutors or mentors can book like lecturers; other students can only book venues their lecturer was granted.',
          'PostgreSQL itself refuses two overlapping approved bookings of the same lab, so even a race between two requests cannot double-book a venue.',
        ],
        snippets: ['be-needs-approval', 'be-can-book', 'be-booking-entity'],
      },
    ],
  },
  {
    ...feat,
    id: 'be-venue-admin',
    title: 'Booking approval & venue admin',
    intro: [
      'AdminVenuesController (/api/admin) serves the admin’s venue pages: venues, booking history, booking requests, closures, booking rules and contacts.',
      'Approving a request re-checks the venue, rejects every overlapping request in the same save, and emails the booker, the building’s technicians and Campus Protection Services (CPS).',
    ],
    screen: screen('admin-booking-requests', 'Booking Requests', 'Booking Requests calls the approve and reject endpoints.'),
    snippets: ['be-approve', 'be-approve-notify', 'be-venues-api'],
  },
  {
    ...feat,
    id: 'be-lab-access',
    title: 'Lab access requests',
    intro: [
      'Lecturers ask for their students to use certain labs through /api/lab-access-requests; admins answer through /api/admin/lab-access-requests: approve, reject with a reason, or offer other venues.',
      'Each answer is stored as a response row, so a request keeps its full history. The lecturer and the other admins are notified of every decision.',
    ],
    screen: screen('admin-access-requests', 'Class/Lab Access lecturer requests', 'Class/Lab Access shows these requests.'),
    snippets: ['be-access-admin-api', 'be-access-approve'],
  },
  {
    ...feat,
    id: 'be-special-bookings',
    title: 'Special bookings',
    intro: [
      'A special booking reserves venues for a list of people between two dates (for example a research group or partner company). Admins can preview it first to see which bookings it would cancel.',
      'Saving cancels the overlapping venue bookings, tells their bookers, and tells everyone on the list about their access. Email lists can be uploaded as CSV or Excel.',
    ],
    screen: screen('admin-access-upload', 'Special requests tab', 'Special requests posts to /api/admin/special-bookings.'),
    snippets: ['be-special-create'],
  },
  {
    ...feat,
    id: 'be-venue-activity',
    title: 'Venue activity log',
    intro: [
      'VenueActivityLogger records every venue action: venues added or changed, bookings made, moved or cancelled, and access decisions. Each entry stores who did it, their role and number, what happened and to which venue.',
      'It writes with its own SQL insert and swallows its own errors, so logging can never break the action it records.',
    ],
    screen: screen('admin-activity', 'Venue Activity log', 'Venue Activity reads these rows.'),
    snippets: ['be-activity-log'],
  },
  {
    ...feat,
    id: 'be-notifications',
    title: 'Notifications',
    intro: [
      'NotificationService stores one notification and one read/unread row per recipient. Features notify specific users or a whole role, e.g. every System Admin.',
      'Each role has its own controller (/api/student/notifications, /api/lecturer/notifications, /api/admin/notifications) for the list, the unread count and marking as read.',
    ],
    screen: screen('admin-notifications', 'Notifications page', 'Every role’s notifications page reads these endpoints.'),
    snippets: ['be-notify-create', 'be-notify-api', 'be-notify-broadcast'],
  },
  {
    ...feat,
    id: 'be-support',
    title: 'Support tickets & feedback',
    intro: [
      'Students and lecturers submit support tickets with a category, subject and message. The ticket is saved first and the System Admins are alerted; an alert failure never loses the ticket.',
      'Admins list tickets and respond at PUT /api/support-tickets/{id}/respond, which saves the feedback, resolves or reopens it, and notifies the sender. Students read their answers at /api/student/feedback.',
    ],
    screen: screen('admin-support-ticket', 'Support query dialog', 'The admin’s Support dialog calls respond.'),
    snippets: ['be-support-submit', 'be-support-respond', 'be-feedback'],
  },
]
