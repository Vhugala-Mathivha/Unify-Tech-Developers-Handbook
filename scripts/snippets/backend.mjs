// Code shown on the 03 · Backend Development chapters (ARMS.Backend).
// Never add appsettings*.json here: it holds connection strings and keys.
const b = (id, file, from, to, notes, extra = {}) => ({ id, repo: 'backend', file, from, to, ...(notes ? { notes } : {}), ...extra })
const API = 'ARMS.API'
const INF = 'ARMS.Infrastructure'
const APP = 'ARMS.Application'

export const SNIPPETS = [
  // ======================= Getting started =======================
  b('be-program-services', `${API}/Program.cs`, 61, 98, {
    69: 'Allowed origins come from configuration: localhost and the deployed frontend',
    77: 'Lets the browser read the file name of downloads',
    85: 'MediatR, FluentValidation and AutoMapper (Application layer)',
    91: 'Database, auth, email and every feature service (Infrastructure layer)',
  }),
  b('be-program-pipeline', `${API}/Program.cs`, 232, 293, {
    238: 'Applies migrations / seeds data before the first request',
    262: 'Order matters: compression, CORS, then authentication before authorization',
    286: 'Every [ApiController] class becomes reachable',
    291: 'A cheap /health URL for uptime monitors, so the free host stays awake',
  }),
  b('be-host-resilience', `${API}/Program.cs`, 13, 30, {
    28: 'A crashing background job stops itself, not the whole API',
  }),
  b('be-app-di', `${APP}/DependencyInjection.cs`, 40, 55, {
    42: 'Scans this project for handlers, validators and mapping profiles',
    47: 'Every MediatR request is validated first',
  }),
  b('be-infra-db', `${INF}/Extensions/InfrastructureServiceExtensions.cs`, 39, 80, {
    48: 'Connection pool size from configuration, kept between 1 and 100',
    58: 'ArmsDbContext: users, venues, bookings, notifications… on PostgreSQL',
    66: 'TimetableDbContext: the timetable tables, optionally in their own database',
  }),
  b('be-infra-services', `${INF}/Extensions/InfrastructureServiceExtensions.cs`, 82, 123, {
    88: 'Interfaces live in Application; the implementations are registered here',
    90: 'EmailService gets its own HttpClient with a 30 s timeout',
    100: 'Scoped: one instance per HTTP request',
    118: 'Hosted services run in the background for the life of the API',
  }),
  b('be-dockerfile', 'docker/Dockerfile', 1, 42, {
    2: 'Stage 1: the full .NET 10 SDK, to build',
    14: 'Restore first: this layer is cached while only source files change',
    32: 'Stage 2: the small ASP.NET runtime image, without the SDK',
    38: 'The API listens on port 5000 inside the container',
  }, { language: 'yaml' }),
  b('be-compose', 'docker-compose.yml', 1, 10, null, { language: 'yaml' }),
  b('be-ci', '.github/workflows/ci.yml', 1, 17, {
    3: 'Runs on every push and pull request',
    15: 'Restore, build, then run the tests',
  }, { language: 'yaml' }),
  b('be-branch-rules', '.github/workflows/branch-rules.yml', 23, 41, {
    27: 'Only dev / development may merge into main',
    35: 'main may not be merged back into dev; use a feature branch',
  }, { language: 'yaml' }),

  // ======================= Core =======================
  b('be-jwt-validate', `${INF}/Extensions/AuthenticationExtensions.cs`, 30, 71, {
    34: 'Refuses to start with a weak signing key',
    53: 'Expired tokens are rejected…',
    69: '…to the second: no clock-skew allowance',
  }),
  b('be-policies', `${INF}/Extensions/AuthenticationExtensions.cs`, 77, 108, {
    80: 'Named policies; most controllers use [Authorize(Roles = "...")] directly',
  }),
  b('be-token-life', `${INF}/Services/TokenService.cs`, 38, 51, {
    43: 'Session:IdleTimeoutMinutes (30) from configuration',
    50: 'Plus 2 minutes of grace for a request already in flight',
  }),
  b('be-token-claims', `${INF}/Services/TokenService.cs`, 89, 110, {
    91: 'The user id: controllers read it back with User.FindFirst(...)',
    103: 'The role drives every [Authorize(Roles = ...)] check',
  }),
  b('be-token-sign', `${INF}/Services/TokenService.cs`, 140, 166, {
    146: 'HMAC-SHA256 signature with the secret key',
  }),
  b('be-login-find', `${API}/Controllers/AuthController.cs`, 348, 399, {
    348: 'Emails are compared in lower case',
    363: 'Note: a different message for unknown accounts tells callers which emails exist',
    389: 'BCrypt check (see Password hashing & reset)',
  }),
  b('be-login-otp', `${API}/Controllers/AuthController.cs`, 405, 454, {
    405: 'Any older unused code stops working',
    422: 'Only a BCrypt hash of the code is stored, never the code itself',
    434: 'Valid for 5 minutes',
  }),
  b('be-generate-otp', `${API}/Controllers/AuthController.cs`, 689, 694, {
    691: 'Cryptographically secure random number, 100000–999999',
  }),
  b('be-login-email', `${API}/Controllers/AuthController.cs`, 460, 503, {
    462: 'Sent through the email service (Google Apps Script)',
    474: 'While this flag is on, a failed email still lets sign-in continue; the code is in the server log',
  }),
  b('be-verify-find', `${API}/Controllers/AuthController.cs`, 746, 788, {
    746: 'The newest unused code for this email',
    772: 'Expiry is compared inside PostgreSQL, so both sides use the same time zone',
  }),
  b('be-verify-check', `${API}/Controllers/AuthController.cs`, 794, 829, {
    794: 'Five wrong tries and the code is burned',
    819: 'BCrypt compares the typed code with the stored hash',
  }),
  b('be-verify-success', `${API}/Controllers/AuthController.cs`, 904, 918, {
    915: 'The JWT the frontend sends on every later request',
  }),
  b('be-keepalive', `${API}/Controllers/AuthController.cs`, 937, 972, {
    937: 'Needs a token that is still valid',
    951: 'Rebuilt from the account as it is now: a deleted account cannot stay signed in',
    968: 'A fresh token with a new 30-minute lifetime',
  }),
  b('be-hasher', `${INF}/Services/PasswordHasher.cs`, 15, 48, {
    28: 'Watch out: seeded accounts may still hold plain-text passwords; these are compared directly',
    33: 'Normal path: BCrypt (salted, slow on purpose)',
  }),
  b('be-password-rules', `${INF}/Services/PasswordHasher.cs`, 50, 99, {
    58: '6–13 characters, with a letter, a number and a special character',
  }),
  b('be-reset', `${API}/Controllers/PasswordResetController.cs`, 19, 35, {
    22: 'ARMS does not store reset tokens: it sends users to the TUT4Life reset page',
  }),
  b('be-reset-auth', `${API}/Controllers/AuthController.cs`, 313, 322),
  b('be-run-helper', `${API}/Controllers/LabBookingsController.cs`, 213, 235, {
    213: 'Services throw ordinary .NET exceptions; this maps each to an HTTP status',
    219: 'Bad input → 400',
    223: 'Not allowed → 403',
    227: 'Missing → 404',
    231: 'Breaks a rule (e.g. the slot is taken) → 409',
  }),
  b('be-exception-mw', `${API}/Middleware/ExceptionHandlingMiddleware.cs`, 61, 96, {
    63: 'Typed exceptions → status codes, as RFC 7807 Problem Details',
    87: 'Stack traces only in Development',
  }),
  b('be-base-response', `${APP}/Common/BaseResponse.cs`, 30, 55, {
    30: 'The result envelope the MediatR handlers return',
  }),
  b('be-cqrs-controller', `${API}/Controllers/DepartmentsController.cs`, 33, 59, {
    48: 'The controller only sends a request object; MediatR finds its handler',
  }),
  b('be-cqrs-query', `${APP}/Features/Departments/Queries/GetAllDepartmentsQuery.cs`, 33, 45, {
    33: 'A query is a record that declares what it returns',
    43: 'Still the template placeholder: this handler is not implemented yet',
  }),
  b('be-validation-behavior', `${APP}/DependencyInjection.cs`, 62, 95, {
    75: 'No validators for this request: go straight to the handler',
    78: 'All validators run in parallel',
    92: 'Any failure stops the request before the handler runs',
  }),
  b('be-email-otp', `${INF}/Email/EmailService.cs`, 30, 57, {
    34: 'Watch out: the code is also written to the server log',
    42: 'User text is HTML-encoded before it goes into the email',
  }),
  b('be-email-send', `${INF}/Email/EmailService.cs`, 241, 313, {
    255: 'Settings first, then the MAIL_SCRIPT_URL / MAIL_SECRET environment variables',
    285: 'One JSON POST to a Google Apps Script web app, which sends the email',
    296: 'The script answers with a redirect; ARMS follows it by hand',
    306: 'If only the result page fails, the email was already sent: do not fail the sign-in',
  }),
  b('be-cache-region', `${INF}/Caching/CacheRegion.cs`, 13, 55, {
    23: 'Every cached entry is tied to the region’s cancellation token…',
    34: '…so cancelling it evicts the whole region at once',
    49: 'Timetables, groups, enrolments, faculties',
    54: 'Calendar events (the same for every user)',
  }),
  b('be-cache-use', `${INF}/Services/TimetablePersonalService.cs`, 503, 522, {
    509: 'One cache entry per student',
    517: 'About 7 database round trips, only when not cached',
    521: 'A copy, so no caller can reorder the shared list',
  }),
  b('be-cache-invalidate', `${INF}/Persistence/Context/ArmsDbContext.cs`, 697, 720, {
    711: 'Which regions do the pending changes touch?',
    717: 'After a successful save, evict those regions',
  }),
  b('be-bg-reminders', `${INF}/Services/AdminRequestReminderBackgroundService.cs`, 37, 82, {
    54: 'PeriodicTimer: every 30 minutes by default',
    60: 'A new DI scope per run (DbContext is scoped)',
    77: 'A failed run is logged; the next tick tries again',
  }),
  b('be-bg-calendar', `${INF}/Services/AcademicCalendarNotificationBackgroundService.cs`, 56, 132, {
    87: 'A check right after startup…',
    103: '…then at the configured hours each day (AcademicCalendar:NotificationHours)',
  }),

  // ======================= Features =======================
  b('be-lecturer-credentials', `${API}/Controllers/LecturersController.cs`, 153, 245, {
    154: 'Only a System Admin can change a lecturer’s sign-in details',
    196: 'Staff address or Gmail only',
    209: 'Emails must be unique across all users',
    228: 'Hashed with the same rules as everywhere else',
  }),
  b('be-faculty-me', `${API}/Controllers/FacultiesController.cs`, 87, 135, {
    107: 'Cached per user for an hour, evicted whenever academic data is saved',
  }),
  b('be-group-students', `${API}/Controllers/GroupsController.cs`, 44, 100, {
    58: 'First choice: students allocated to this group',
    66: 'Fallback: older rows that match the group by name',
    97: 'Last resort: an estimate from module enrolments',
  }),
  b('be-upload-auth', `${API}/Controllers/CreateTimetable.cs`, 10, 12, {
    11: 'Every endpoint in this controller is System Admin only',
  }),
  b('be-upload-class', `${API}/Controllers/CreateTimetable.cs`, 52, 101, {
    53: 'multipart/form-data: the file plus its details',
    81: '.xlsx or .xls only',
    95: 'Parses the sheets and saves a Pending managed timetable',
  }),
  b('be-upload-clash-alert', `${API}/Controllers/CreateTimetable.cs`, 103, 158, {
    105: 'The clash check runs straight after the upload',
    114: 'Same-semester clashes alert every System Admin',
    123: 'A failed check never fails the upload itself',
    139: 'Not a class timetable workbook → 400 with a clear message',
  }),
  b('be-excel-sheets', `${INF}/Services/TimetableExcelService.cs`, 130, 199, {
    130: 'Caches so each lecturer / group / module is looked up once per upload',
    153: 'ExcelDataReader reads every sheet as a table',
    159: 'Only the slot sheets A–H hold classes',
    168: 'Find the header row that starts with CODE',
  }),
  b('be-excel-rows', `${INF}/Services/TimetableExcelService.cs`, 200, 256, {
    234: 'Blank rows and “Section:” separators are skipped',
    251: 'A module code fills down to the rows below it, like merged cells',
  }),
  b('be-publish', `${API}/Controllers/TimetablesController.cs`, 273, 329, {
    289: 'The currently live timetables of this type and faculty',
    298: 'Only one can be live: the others become Inactive',
    305: 'Change alerts run in the background',
    316: 'Lecturers are told to check their timetable',
  }),
  b('be-deactivate-others', `${API}/Controllers/TimetablesController.cs`, 542, 556, {
    553: 'ExecuteUpdateAsync: one UPDATE statement, no entities loaded',
  }),
  b('be-change-alerts', `${API}/Controllers/TimetablesController.cs`, 508, 540, {
    513: 'First publish for this type and faculty: nothing to compare',
    518: 'Fire-and-forget, so the publish answers at once',
    522: 'Its own DI scope, because the request’s scope ends when it returns',
  }),
  b('be-change-diff', `${INF}/Services/TimetableChangeNotifier.cs`, 99, 130, {
    116: 'A brand-new group is an addition, not a change',
    124: 'Same day, time and venue: nothing to report',
  }),
  b('be-clash-records', `${INF}/Services/TimetablePersonalService.cs`, 1511, 1545, {
    1526: 'Records: small immutable types for the report',
  }),
  b('be-clash-blocks', `${INF}/Services/TimetablePersonalService.cs`, 1764, 1806, {
    1766: 'Sessions sorted by start time are joined into overlapping blocks',
    1786: 'One module in two venues is not a clash: it needs two different modules',
    1800: 'Same-semester clashes are the serious ones',
  }),
  b('be-student-tt', `${API}/Controllers/GetTimetableController.cs`, 341, 379, {
    342: 'Students only; the id comes from their own token, never the URL',
  }),
  b('be-student-download', `${API}/Controllers/GetTimetableController.cs`, 429, 519, {
    470: 'One endpoint, three formats: ?format=pdf | word | excel',
    477: 'File(...) sends the bytes with a content type and a file name',
  }),
  b('be-group-search', `${INF}/Services/GroupTimetableService.cs`, 179, 225, {
    189: 'Searches are capped, so a wide filter cannot return thousands of timetables',
    207: 'Bulk downloads are capped too',
  }),
  b('be-export-types', `${INF}/Timetable/TimetableTemplateExporter.cs`, 41, 115, {
    73: 'The template colours, copied from the faculty’s own design',
    92: 'Fonts embedded in the PDF; Office files use close system fonts',
    109: 'One timetable model, three renderers',
  }),
  b('be-export-pdf', `${INF}/Timetable/TimetableTemplateExporter.cs`, 262, 294, {
    267: 'QuestPDF: the page is described in C#',
    280: 'The template image is the bottom layer…',
    285: '…and the classes are drawn on top at exact positions',
  }),
  b('be-planner-upload', `${API}/Controllers/UploadPlannerController.cs`, 30, 114, {
    31: 'Up to 20 MB',
    43: 'ClosedXML reads .xlsx only',
    98: 'Every worksheet is scanned for dated events',
    108: 'If the import fails, the previous calendar stays the current one',
  }),
  b('be-calendar-import', `${INF}/Services/AcademicCalendarExcelImportService.cs`, 26, 90, {
    46: 'Opened as a stream so a broken file can still be deleted',
    67: 'Refuses workbooks that are not an academic calendar',
    80: 'Formal Excel tables first, then the rest of each sheet',
  }),
  b('be-calendar-get', `${API}/Controllers/AcademicCalendarController.cs`, 28, 84, {
    31: 'Every role can read the calendar',
  }),
  b('be-booking-api', `${API}/Controllers/LabBookingsController.cs`, 126, 140, {
    132: '201 Created, with the new booking’s URL',
  }),
  b('be-book-validate', `${INF}/Services/LabBookingService.cs`, 307, 348, {
    312: 'Lecturer, tutor or mentor? (403 otherwise)',
    317: '“Has internet” is a lecturer-only option',
    347: 'Free periods, back-to-back, daily limits, no overlaps…',
  }),
  b('be-book-save', `${INF}/Services/LabBookingService.cs`, 350, 411, {
    351: 'The admin’s booking rules for this booker type',
    369: 'Working hours wait for an admin; after hours are confirmed at once',
    393: 'The booker is told either way',
    398: 'Every booking is written to the Venue Activity log',
  }),
  b('be-needs-approval', `${INF}/Services/LabBookingService.cs`, 1206, 1224, {
    1210: 'Any overlap with 08:00–16:59 South African time needs approval',
  }),
  b('be-can-book', `${INF}/Services/LabBookingAccessService.cs`, 47, 73, {
    69: 'Tutors and mentors are not limited to granted venues',
  }),
  b('be-booking-entity', 'ARMS.Domain/Entities/LabBooking.cs', 1, 64, {
    16: 'PostgreSQL itself refuses two overlapping approved bookings of one lab',
  }),
  b('be-approve', `${INF}/Services/LabBookingService.cs`, 2821, 2860, {
    2831: 'Re-checks that the venue is still free right now',
    2844: 'Everyone else who wanted an overlapping time…',
    2854: '…is rejected in the same save',
  }),
  b('be-approve-notify', `${INF}/Services/LabBookingService.cs`, 2862, 2897, {
    2864: 'The booker, the building’s technicians and campus CPS are emailed',
  }),
  b('be-venues-api', `${API}/Controllers/AdminVenuesController.cs`, 44, 98, {
    73: 'An exception filter maps known errors to status codes',
    89: 'Taking a venue out of use cancels its upcoming bookings and tells the bookers',
  }),
  b('be-access-admin-api', `${API}/Controllers/AdminLabAccessRequestsController.cs`, 50, 98, {
    81: 'Shared helper: read the admin id, run, map errors',
  }),
  b('be-access-approve', `${INF}/Services/LabAccessRequestService.cs`, 463, 523, {
    470: 'Each decision is stored as a response row: the request keeps its history',
    478: 'The lecturer and the other admins are notified',
    500: 'Rejecting needs a reason',
  }),
  b('be-special-create', `${INF}/Services/SpecialBookingService.cs`, 130, 160, {
    134: 'Refuses to overlap another special booking',
    149: 'Venue bookings it overlaps are cancelled and their bookers told',
    152: 'Everyone on the list is told about their access',
  }),
  b('be-activity-log', `${INF}/Services/VenueActivityLogger.cs`, 9, 65, {
    52: 'Raw SQL insert: does not save anything else the caller is still tracking',
    61: 'A failed log line never breaks the action being logged',
  }),
  b('be-notify-create', `${INF}/Services/NotificationService.cs`, 39, 103, {
    60: 'One notification row…',
    71: '…and one read/unread row per recipient',
    97: 'Everyone in a role: SystemAdmin, Lecturer or Student',
  }),
  b('be-notify-api', `${API}/Controllers/StudentNotificationsController.cs`, 39, 76, {
    46: 'The student’s own id from the token',
  }),
  b('be-notify-broadcast', `${API}/Controllers/StudentNotificationsController.cs`, 188, 224, {
    189: 'Admins only, though it sits in the student controller',
  }),
  b('be-support-submit', `${INF}/Services/SupportTicketService.cs`, 43, 103, {
    47: 'Only the known categories are accepted',
    86: 'Saved first…',
    92: '…then the admins are alerted; a failed alert does not lose the ticket',
  }),
  b('be-support-respond', `${INF}/Services/SupportTicketService.cs`, 147, 190, {
    164: 'Resolve, or reopen with Resolve = false',
    178: 'The sender gets an in-app notification and an email',
  }),
  b('be-feedback', `${API}/Controllers/StudentFeedbackController.cs`, 16, 72, {
    40: 'Only ever the signed-in student’s own tickets',
  }),
]
