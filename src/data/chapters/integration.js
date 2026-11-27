// 04 · System Integration — how ARMS.Frontend, ARMS.Backend and PostgreSQL work together.
// Each chapter follows one request across the layers, with code from both repos.
import loginLight from '../../assets/screens/login-light.webp'
import { screen } from './frontend/screens'

const layers = { category: 'integration', group: 'Connecting the layers' }
const flows = { category: 'integration', group: 'Feature flows' }

export const integrationChapters = [
  // ======================= Connecting the layers =======================
  {
    ...layers,
    id: 'in-environments',
    title: 'Environments & API base URL',
    spreads: [
      {
        heading: 'Two environments, one setting',
        intro: [
          'ARMS runs in two places: on a developer’s machine and on Render. In both, the frontend finds the API through a single setting, VITE_API_BASE_URL, and the API finds PostgreSQL through its connection string.',
          'Vite writes VITE_ variables into the JavaScript bundle when it builds. Changing the value on a running site does nothing; the frontend must be built again.',
        ],
        visual: {
          type: 'table',
          head: ['Layer', 'Local', 'Hosted'],
          rows: [
            ['Frontend', 'npm run dev → localhost:5173', 'Render static site'],
            ['API', 'dotnet run → localhost:5000/api', 'Render web service (Docker)'],
            ['Database', 'PostgreSQL from the connection string', 'hosted PostgreSQL'],
            ['Frontend → API', '.env: VITE_API_BASE_URL', 'set when Render builds'],
            ['API → frontend', 'Cors:AllowedOrigins lists localhost', 'lists the Render site'],
          ],
        },
        points: ['If VITE_API_BASE_URL is missing, api.js falls back to the hosted backend, never localhost.'],
        snippets: ['in-env-example', 'fe-api-client'],
      },
      {
        heading: 'Deploying the two halves',
        intro: [
          'The frontend is a static site: Render runs npm ci and npm run build and serves the dist folder. Because React Router handles the URLs, every path is rewritten to index.html.',
          'The backend is built from its Dockerfile and listens on port 5000. On Render’s free tier the API goes to sleep when idle, so the first request after a quiet spell can take up to a minute. That is why the frontend waits up to 100 seconds for an answer.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['git push', 'to the branch Render watches'],
            ['Frontend build', 'npm ci && npm run build → dist/'],
            ['Backend build', 'docker build → .NET 10 runtime image'],
            ['Startup', 'DbInitializer checks the schema and seeds'],
            ['Live', 'browser → static site → /api → PostgreSQL'],
          ],
        },
        related: ['fe-deploy', 'be-docker-ci', 'be-config'],
        snippets: ['in-render', 'be-program-pipeline'],
      },
    ],
  },
  {
    ...layers,
    id: 'in-api-client',
    title: 'API client & interceptors',
    spreads: [
      {
        heading: 'Four steps from a click to a controller',
        intro: [
          'Pages never call the API themselves. A page or hook calls a service function; the service calls the shared Axios client in lib/api.js; the client sends the request to an ASP.NET controller.',
          'Endpoint paths live in one file, constants/api.js, so a renamed backend route is fixed in one place. Services also turn the backend’s snake_case fields into the camelCase the UI uses.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Page / hook', 'e.g. useBookingData() asks for a venue’s day'],
            ['Service', 'labBookingService.fetchVenueDay(): builds the call, reshapes the reply'],
            ['lib/api.js', 'base URL, JSON headers, token, 401 handling'],
            ['Controller', 'LabBookingsController → LabBookingService → EF Core'],
          ],
        },
        snippets: ['fe-endpoints', 'fe-service-map'],
      },
      {
        heading: 'What the interceptors add',
        intro: [
          'Axios interceptors run on every request and response. The request interceptor adds the JWT as an Authorization: Bearer header. The response interceptor watches for 401: an expired or invalid token clears the session and sends the user to sign in.',
          'On the backend, controllers read who is calling from that token, never from the request body. A user cannot act as someone else by changing an id in the JSON.',
        ],
        points: [
          'Sign-in and OTP endpoints are left out of the 401 redirect: a wrong password is shown on the form instead.',
          'Dev sign-in tokens are not real JWTs, so their 401s just fail that one request.',
        ],
        related: ['fe-api', 'fe-data-caching'],
        snippets: ['fe-api-interceptors', 'in-user-id'],
      },
    ],
  },
  {
    ...layers,
    id: 'in-signin',
    title: 'Sign-in flow, end to end',
    spreads: [
      {
        heading: 'Step 1: password, then a code by email',
        intro: [
          'Every role signs in on the same page with the same endpoint. The backend checks the email and password, then emails a one-time code instead of returning a session. Nothing is stored in the browser yet.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['LoginPage', 'email + password → useAuth().login()'],
            ['authService', 'POST /api/auth/login'],
            ['AuthController', 'finds the user, checks the BCrypt hash'],
            ['identity_db.otp', 'a 6-digit code, stored as a BCrypt hash, valid for 5 minutes'],
            ['EmailService', 'sends the code to the user’s inbox'],
            ['Frontend', 'opens Verify Code, remembering the email'],
          ],
        },
        screen: { src: loginLight, alt: 'ARMS sign-in page', caption: 'The sign-in page posts to /api/auth/login.' },
        snippets: ['fe-auth-login', 'be-login-otp'],
      },
      {
        heading: 'Step 2: the code becomes a session',
        intro: [
          'The Verify Code page sends the email and code to /api/auth/verify-otp. The backend checks the newest unused code, marks it used and returns a JWT with the user’s details.',
          'The frontend stores the token and user in sessionStorage (arms_token, arms_user). That storage belongs to one browser tab, so a second tab must sign in on its own. The user is then sent to their role’s dashboard.',
        ],
        points: ['Each wrong code counts an attempt; after 5 the code is cancelled and a new one must be requested.'],
        screen: screen('otp', 'Verify Code screen', 'Verify Code turns the emailed code into a session.'),
        related: ['fe-sign-in', 'fe-otp', 'be-auth'],
        snippets: ['be-verify-success', 'fe-otp-verify'],
      },
    ],
  },
  {
    ...layers,
    id: 'in-tokens',
    title: 'Tokens & protected routes',
    spreads: [
      {
        heading: 'What the token carries',
        intro: [
          'The JWT is signed by the backend. Its claims say who the user is and what role they have. The backend checks the signature and expiry on every request; the frontend only reads the expiry to know when a session is over.',
        ],
        visual: {
          type: 'table',
          head: ['Claim', 'Read by'],
          rows: [
            ['NameIdentifier (user id)', 'controllers: whose data to load or change'],
            ['Name, Email', 'emails, activity log, profile'],
            ['Role', '[Authorize(Roles = …)] and policies; frontend routes'],
            ['exp (expiry)', 'JwtBearer on the API; authService on the frontend'],
          ],
        },
        snippets: ['be-token-claims', 'be-jwt-validate'],
      },
      {
        heading: 'Guards on both sides',
        intro: [
          'ProtectedRoute keeps a student out of /lecturer pages, but that is only for a tidy experience: anyone can change JavaScript in their own browser.',
          'The real protection is on the API. Each controller states which roles may call it, and ASP.NET answers 401 (not signed in) or 403 (wrong role) before the code runs.',
        ],
        visual: {
          type: 'table',
          head: ['', 'Frontend', 'Backend'],
          rows: [
            ['Where', 'ProtectedRoute in App.jsx', '[Authorize] on controllers'],
            ['Checks', 'session exists, role matches the URL', 'signature, expiry, role'],
            ['On failure', 'redirect to sign-in or own dashboard', '401 / 403 response'],
            ['Trust', 'convenience only', 'the actual security'],
          ],
        },
        snippets: ['fe-protected-route', 'be-policies'],
      },
      {
        heading: 'Staying signed in',
        intro: [
          'A token lives only a little longer than the idle limit. While the user is active, IdleLogout calls POST /api/auth/keep-alive (at most every 30 seconds) and stores the fresh token it gets back.',
          'After 30 minutes without activity the frontend signs the user out, and the old token stops working on the server as well.',
        ],
        related: ['fe-routing', 'be-jwt'],
        snippets: ['fe-idle-consts', 'be-keepalive'],
      },
    ],
  },
  {
    ...layers,
    id: 'in-cors',
    title: 'CORS & security',
    spreads: [
      {
        heading: 'Why the browser asks first',
        intro: [
          'The frontend and the API live on different addresses, so the browser treats every call as cross-origin. Before sending a request with a JSON body or an Authorization header, it sends an OPTIONS “preflight” request asking the API whether this origin is allowed.',
          'The API answers from its ArmsCors policy. Only the origins listed in Cors:AllowedOrigins are accepted; any other site’s JavaScript is blocked by the browser.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Preflight', 'OPTIONS /api/… with Origin: the frontend URL'],
            ['UseCors', 'origin on the list? allow methods + headers'],
            ['Real request', 'POST with Authorization: Bearer …'],
            ['Response', 'Access-Control-Allow-Origin, Content-Disposition exposed'],
          ],
        },
        points: ['A new frontend address (a preview site, a new domain) must be added to Cors:AllowedOrigins, or every call fails with a CORS error in the console.'],
        snippets: ['in-cors'],
      },
      {
        heading: 'Security across the layers',
        intro: [
          'Each layer has its own part in keeping ARMS safe. The items below are what a new developer should know first.',
        ],
        visual: {
          type: 'table',
          head: ['Concern', 'How ARMS handles it'],
          rows: [
            ['Passwords', 'BCrypt hashes in identity_db."user"'],
            ['Sign-in', 'password + emailed one-time code'],
            ['Sessions', 'short-lived JWT in sessionStorage, renewed while active'],
            ['Access', 'role checks on every controller'],
            ['Transport', 'HTTPS on Render'],
            ['Secrets', 'should come from environment variables'],
          ],
        },
        points: [
          'Watch out: some credentials are committed to ARMS.Backend (appsettings.json and the design-time ArmsDbContextFactory.cs). Move them to environment variables and change them; never copy them into docs or this handbook.',
          'Watch out: the login response says whether an email has an account, and older seeded passwords are compared as plain text (see Password hashing).',
        ],
        related: ['be-pipeline', 'be-passwords', 'be-config'],
        snippets: ['be-hasher'],
      },
    ],
  },
  {
    ...layers,
    id: 'in-errors',
    title: 'Error handling across layers',
    spreads: [
      {
        heading: 'From exception to status code',
        intro: [
          'Services report broken rules by throwing standard .NET exceptions. Each controller turns them into a status code and a JSON body with one field, message, written for the user to read.',
          'The global exception middleware exists but is not wired into Program.cs, so an exception no controller catches becomes a plain 500 response.',
        ],
        visual: {
          type: 'table',
          head: ['Service throws', 'Status', 'User sees'],
          rows: [
            ['ArgumentException', '400 Bad Request', 'what to fix in the form'],
            ['UnauthorizedAccessException', '403 Forbidden', 'not allowed'],
            ['KeyNotFoundException', '404 Not Found', 'it no longer exists'],
            ['InvalidOperationException', '409 Conflict', 'e.g. the period was just taken'],
            ['anything else', '500', 'the service’s fallback text'],
          ],
        },
        snippets: ['in-error-map', 'be-run-helper'],
      },
      {
        heading: 'Turning a response into a message',
        intro: [
          'Every service catches Axios errors and throws a plain Error with a readable message. It prefers the backend’s message, then ASP.NET validation errors, then a fallback written for that action. Pages show error.message in a toast or inline alert.',
          'No response at all means a timeout or a lost connection. For an upload, the server may still have saved the file, so the message says to check the list before trying again.',
        ],
        points: ['401 is handled once, in the api.js interceptor; services do not need to check for it.'],
        related: ['be-errors', 'fe-api'],
        snippets: ['in-booking-errors', 'in-upload-errors'],
      },
    ],
  },

  // ======================= Feature flows =======================
  {
    ...flows,
    id: 'in-flow-timetable',
    title: 'Timetable upload: Excel → API → database',
    spreads: [
      {
        heading: 'Uploading the spreadsheet',
        intro: [
          'A system admin fills in the Upload Timetable form and picks an Excel file. The service sends the file and its details as multipart form data to /api/CreateTimetable/upload/class (or upload/test with ?testType=).',
          'The controller checks the file type, then TimetableExcelService reads every sheet and row. It saves a managed_timetable record with status Pending and one class_timetable_entry row per class session.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Upload form', 'file, name, year, period, faculty'],
            ['Service', 'FormData → POST upload/class'],
            ['Controller', '.xlsx / .xls only, user id from the token'],
            ['Excel service', 'sheets → rows → groups, lecturers, venues'],
            ['timetable_db', 'managed_timetable (Pending) + class_timetable_entry rows'],
            ['Alerts', 'clashes found → admin notification'],
          ],
        },
        screen: screen('admin-timetable-create', 'Upload Timetable form', 'The Upload Timetable form posts to upload/class.'),
        snippets: ['in-upload-service', 'be-upload-class'],
      },
      {
        heading: 'Publishing it to students and lecturers',
        intro: [
          'Nothing changes for students until the admin publishes. Publishing sets the timetable to Published and makes the previously published one of the same type and faculty Inactive.',
          'Students and lecturers then read their personal timetables, built from class_timetable_entry and their student_group rows. Any save in TimetableDbContext empties the cached timetables, so the change shows at once.',
        ],
        points: ['When a published timetable replaces another, the people whose classes changed get a notification.'],
        screen: screen('admin-timetable-menu', 'Timetable Management row menu', 'Publish, Edit, Deactivate and Delete.'),
        related: ['fe-admin-timetable', 'be-timetable-upload', 'be-timetable-publish', 'db-groups-timetables'],
        snippets: ['be-publish', 'db-class-entry'],
      },
    ],
  },
  {
    ...flows,
    id: 'in-flow-booking',
    title: 'Venue booking & approval',
    spreads: [
      {
        heading: 'Making a booking',
        intro: [
          'On Book a Class/Lab the user picks a venue, a day and free periods. createBooking posts them to /api/lab-bookings/book-lab-class, using the snake_case names the API expects.',
          'LabBookingService checks the rules (opening hours, daily limits, how far ahead, clashes) and saves a lab_bookings row. The saved booking comes back in bookingDetails and is reshaped for the UI.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Book a Class/Lab', 'venue, date, periods, purpose'],
            ['labBookingService', 'POST /api/lab-bookings/book-lab-class'],
            ['LabBookingService', 'rules from booking_type_rules + booking_settings'],
            ['lab_booking_db', 'lab_bookings row: PENDING or APPROVED'],
            ['Side effects', 'activity log, notifications, contact emails'],
          ],
        },
        screen: screen('lecturer-book', 'Book a Class/Lab', 'Book a Class/Lab creates the booking.'),
        snippets: ['in-book-create', 'be-book-save'],
      },
      {
        heading: 'Approval, and the database as the last guard',
        intro: [
          'A booking made between 08:00 and 15:00 waits as PENDING for a system admin; outside those hours it is APPROVED at once. Pending requests do not hold the venue, so several people may ask for the same period and the admin decides.',
          'Even if two requests are approved at nearly the same moment, PostgreSQL refuses the second: an exclusion constraint forbids two APPROVED bookings for one venue with overlapping times. The API turns that into a 409 message.',
        ],
        screen: screen('admin-booking-requests', 'Booking Requests', 'Booking Requests approves or rejects pending bookings.'),
        related: ['fe-lec-bookings', 'fe-admin-booking-requests', 'be-bookings', 'be-venue-admin', 'db-venues'],
        snippets: ['in-overlap-409', 'db-sql-approval'],
      },
    ],
  },
  {
    ...flows,
    id: 'in-flow-lab-access',
    title: 'Lab access requests',
    intro: [
      'A lecturer asks for their students to use labs for a period. The form’s choices become API values (ALL_STUDENTS or SELECTED_STUDENTS, CURRENT_SEMESTER… CUSTOM) and are posted to /api/lab-access-requests, a controller only lecturers may call.',
      'The request is stored in lab_booking_db.lab_access_request with its labs and students in link tables. A system admin approves, rejects or offers other labs; each answer is saved as a lab_access_response and notifies the lecturer.',
    ],
    visual: {
      type: 'steps',
      items: [
        ['Lecturer form', 'module, students, labs, period, reason'],
        ['POST /api/lab-access-requests', '201 Created with the new request'],
        ['Database', 'request + request_lab + request_student rows'],
        ['Admin review', 'approve · reject · offer other labs'],
        ['Lecturer', 'accepts or declines an offer'],
      ],
    },
    screen: screen('lecturer-lab-access', 'Lecturer Lab Access page', 'Lab Access sends and tracks requests.'),
    related: ['fe-lec-lab-access', 'fe-admin-access', 'be-lab-access', 'db-venues'],
    snippets: ['in-access-body', 'in-access-create'],
  },
  {
    ...flows,
    id: 'in-flow-notifications',
    title: 'Notifications delivery',
    spreads: [
      {
        heading: 'Created on the server',
        intro: [
          'Notifications are a side effect of other actions: publishing a timetable, a booking decision, a support reply, a calendar reminder. The service doing the work calls NotificationService.CreateAsync with the recipients’ user ids.',
          'That saves one notification row and one user_notification row per recipient in system_db, each with its own read flag. Some actions also send an email through EmailService.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['An action', 'publish, approve, reply, reminder…'],
            ['NotificationService', 'CreateAsync(type, title, message, recipients)'],
            ['system_db', 'notification + user_notification per recipient'],
            ['Email (some types)', 'EmailService → the user’s inbox'],
            ['Frontend', 'GET /api/{role}/notifications'],
          ],
        },
        snippets: ['be-notify-create'],
      },
      {
        heading: 'Read by the browser',
        intro: [
          'There is no live push channel (no WebSockets or SignalR). Each feed is fetched when its page or the bell opens. The cached copy shows first while the fresh list loads.',
          'After the user does something that creates a notification, the frontend calls refreshNotifications(); every feed on screen reloads. Marking items read calls the role’s read endpoint.',
        ],
        screen: screen('admin-bell', 'Notification bell menu', 'The bell and Notifications page read the same feed.'),
        related: ['fe-stu-notifications', 'fe-admin-notifications', 'be-notifications', 'db-requests'],
        snippets: ['in-notify-fetch', 'in-notify-hook'],
      },
    ],
  },
  {
    ...flows,
    id: 'in-flow-support',
    title: 'Support tickets',
    intro: [
      'Students and lecturers send a query from Support. The service posts it to their role’s endpoint (/api/student/support-tickets or the lecturer one). The backend reads the sender from the token, saves a system_db.support_ticket row, notifies the system admins and emails them.',
      'The admin answers in the Support queue. The reply is saved in admin_feedback, the ticket can be marked resolved, and the sender is notified.',
    ],
    visual: {
      type: 'steps',
      items: [
        ['Support form', 'category, subject, message'],
        ['POST …/support-tickets', 'sender from the JWT'],
        ['system_db.support_ticket', 'new row, is_resolved = false'],
        ['Admins', 'notification + email'],
        ['Reply', 'admin_feedback saved, sender notified'],
      ],
    },
    screen: screen('student-support', 'Student Support page', 'Support sends the query to the API.'),
    related: ['fe-stu-support', 'fe-admin-support', 'be-support', 'db-requests'],
    snippets: ['in-support-submit', 'in-support-api'],
  },
]
