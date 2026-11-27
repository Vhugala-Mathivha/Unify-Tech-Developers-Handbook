// Code shown on the 04 · System Integration chapters: both ends of each request.
// Many chapters also reuse fe-* and be-* snippets from the other files.
// Never add appsettings*.json or .env here: they hold connection strings and keys.
const f = (id, file, from, to, notes, extra = {}) => ({ id, repo: 'frontend', file, from, to, ...(notes ? { notes } : {}), ...extra })
const b = (id, file, from, to, notes, extra = {}) => ({ id, repo: 'backend', file, from, to, ...(notes ? { notes } : {}), ...extra })
const API = 'ARMS.API'

export const SNIPPETS = [
  // ======================= Connecting the layers =======================
  f('in-env-example', '.env.example', 1, 6, {
    2: 'Include /api: services add paths such as /auth/login to it',
    6: 'Copy this file to .env and pick one of the two lines',
  }, { language: 'yaml' }),
  f('in-render', 'render.yaml', 10, 19, {
    14: 'Render installs and builds on every push, then serves dist/ as static files',
    17: 'Every path returns index.html, so refreshing /student/dashboard still works',
  }, { language: 'yaml' }),
  b('in-cors', `${API}/Program.cs`, 61, 79, {
    67: 'The allowed origins are read from configuration, so each environment lists its own frontend',
    74: 'Lets the browser send credentials to the API',
    77: 'Without this the frontend cannot read the download file name',
  }),
  b('in-user-id', `${API}/Controllers/LabAccessRequestsController.cs`, 144, 151, {
    146: 'The user id comes from the verified JWT, never from the request body',
  }),

  // ======================= Errors =======================
  b('in-error-map', `${API}/Controllers/LabAccessRequestsController.cs`, 135, 142, {
    137: 'Service rule broken (bad dates, no venues…) → 400',
    138: 'Not your request → 403',
    140: 'Already decided, venue taken… → 409',
    141: 'Anything else is not mapped and becomes a 500',
  }),
  f('in-booking-errors', 'src/services/venues/labBookingService.js', 65, 85, {
    71: 'ASP.NET model-validation errors arrive as { errors: { field: [...] } }',
    72: 'The backend’s own { message } wins, then validation, then the generic title',
    74: 'The status is kept, so a page can treat 409 (taken) differently',
  }),
  f('in-upload-errors', 'src/services/timetableManagementService.js', 96, 116, {
    101: 'No response at all: a timeout or no network, not an error from the API',
    110: 'Some endpoints answer with plain text',
    114: '500s carry the detail in `error`; it is shown after the message',
  }),

  // ======================= Feature flows =======================
  f('in-upload-service', 'src/services/timetableManagementService.js', 129, 153, {
    131: 'The spreadsheet and its details travel together as multipart form data',
    142: 'Class timetables and test / exam timetables use different endpoints',
    145: 'Overrides the client’s JSON default for this one request',
  }),
  b('in-overlap-409', 'ARMS.Infrastructure/Services/LabBookingService.cs', 1519, 1535, {
    1529: 'The insert broke the ex_lab_bookings_no_overlap constraint in PostgreSQL…',
    1533: '…so it becomes the same 409 message the earlier check gives',
  }),
  f('in-book-create','src/services/venues/labBookingService.js', 333, 352, {
    336: 'Dev sign-in: books on sample data in the browser, the API is not called',
    339: 'The body uses the backend’s snake_case names',
    351: 'The saved booking comes back and is reshaped for the UI',
  }),
  f('in-access-body', 'src/services/venues/labAccessService.js', 222, 241, {
    225: 'Form choices become the values the API expects (ALL_STUDENTS, CUSTOM…)',
    239: 'POST /api/lab-access-requests',
  }),
  b('in-access-create', `${API}/Controllers/LabAccessRequestsController.cs`, 42, 73, {
    48: 'Only lecturers reach this controller ([Authorize(Roles = "Lecturer")] on the class)',
    62: 'The service saves the request and notifies the system admins',
    64: '201 Created, with the new request in the body',
    69: 'Known exceptions become 400 / 403 / 404 / 409 (see Map below)',
  }),
  f('in-notify-fetch', 'src/services/notificationService.js', 101, 131, {
    101: 'Backend DTO (type, isRead, createdAt) → the UI’s notification shape',
    112: 'A tiny publish/subscribe list inside the browser tab',
    116: 'Called after actions that create notifications, so open feeds reload',
  }),
  f('in-notify-hook', 'src/features/notifications/hooks/useNotifications.js', 125, 150, {
    129: 'Shows the cached feed straight away…',
    135: '…then asks the API for the latest list',
    145: 'There is no push channel: the feed reloads on page load and on these events',
  }),
  f('in-support-submit', 'src/services/supportService.js', 71, 86, {
    72: 'Students and lecturers post to their own role’s endpoint',
    82: 'Then refreshes the admin feed; a failure here does not undo the ticket',
  }),
  b('in-support-api', `${API}/Controllers/StudentSupportTicketsController.cs`, 59, 91, {
    63: 'Who is asking is read from the token',
    73: 'Saves the ticket, notifies the admins and sends the email',
    85: 'Validation problems come back as 400 with { message }',
  }),
]
