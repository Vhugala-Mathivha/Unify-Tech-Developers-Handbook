// Code shown on the 05 · Database Architecture chapters (ARMS.Backend).
// Never add appsettings*.json, ArmsDbContextFactory.cs or the account scripts in
// docs/ (add_accounts_*, add_lecturer_*, link_accounts_*, fix_student_*): they
// hold connection strings, passwords or personal details.
const b = (id, file, from, to, notes, extra = {}) => ({ id, repo: 'backend', file, from, to, ...(notes ? { notes } : {}), ...extra })
const INF = 'ARMS.Infrastructure'
const PER = `${INF}/Persistence`
const CTX = `${PER}/Context/ArmsDbContext.cs`
const INIT = `${PER}/Context/DbInitializer.cs`
const SQL = 'docs/arms_database_full.sql'

export const SNIPPETS = [
  // ======================= Foundations =======================
  b('db-sql-header', SQL, 4, 27, {
    4: 'One PostgreSQL database; each schema is one area of the system',
    5: 'Tables in different schemas are linked by plain id columns, not foreign keys',
    26: 'The script is the reference for the schema; the API also patches it at startup',
  }),
  b('db-schemas', SQL, 103, 110, {
    106: 'Users, roles, students, lecturers, admins and OTP codes',
    107: 'Faculties, departments, courses, modules and groups',
    108: 'Uploaded timetables and their class / test entries',
    109: 'Notifications and support tickets',
    110: 'Permissions and user settings: no C# code maps these tables',
  }),
  b('db-context-sets', CTX, 8, 62, {
    8: 'IApplicationDbContext: the Application layer only sees this interface',
    15: 'Each DbSet is one table; the banners group them by schema',
    41: 'One-time sign-in codes',
    58: 'The academic structure',
  }),
  b('db-context-model', CTX, 101, 140, {
    138: 'Picks up every IEntityTypeConfiguration class in Persistence/Configurations',
  }),
  b('db-timetable-context', `${PER}/Context/TimetableDbContext.cs`, 7, 37, {
    7: 'A second context for the timetable tables; its connection string may point at another database',
    19: 'Uses the same configuration classes as ArmsDbContext',
    34: 'Saving any timetable data empties the cached personal timetables',
  }),
  b('db-user-entity', 'ARMS.Domain/Entities/User.cs', 5, 33, {
    7: 'Property names are the column names (snake_case), so little mapping is needed',
    23: 'Only ever a BCrypt hash',
    31: 'Navigation property: EF loads the role with .Include(u => u.Role)',
  }),
  b('db-user-config', `${PER}/Configurations/UserConfiguration.cs`, 7, 50, {
    11: 'identity_db."user": the table name and its schema',
    30: 'One account per email address',
    49: 'Restrict: a role in use cannot be deleted',
  }),
  b('db-migration', `${PER}/Migrations/20261117150000_AddLabAccessRequestDateRange.cs`, 10, 69, {
    11: 'The timestamp in the id orders the migrations',
    16: 'Up: add the columns as nullable first…',
    30: '…fill them for the rows that already exist…',
    37: '…then make them required',
    58: 'Down: how to undo it',
  }),
  b('db-init-extension', `${INF}/Extensions/DatabaseExtensions.cs`, 11, 49, {
    11: 'Called from Program.cs before the API accepts requests',
    27: 'The banner says “migrations”, but no Migrate() call is made: InitialiseAsync runs SQL checks',
    47: 'A failure stops the API from starting',
  }),
  b('db-init-steps', INIT, 44, 133, {
    50: 'Each step is timed and logged ("[Startup] … took … ms")',
    55: 'Schema steps: CREATE … IF NOT EXISTS / ADD COLUMN IF NOT EXISTS, safe on every start',
    85: 'A one-off data fix that is allowed to fail and retry next time',
    116: 'Seeding comes last, once the tables are certain to exist',
  }),
  b('db-ensure-labs', INIT, 135, 164, {
    139: 'lab_booking_db comes from the SQL script, so the API only adds missing columns',
    154: 'to_regclass: skip quietly when the table is not there',
  }),
  b('db-ensure-otp', INIT, 390, 419, {
    396: 'Matches the OTP entity and docs/arms_database_full.sql',
    411: 'Watch out: this runs on the timetable context. If the timetable connection string points at a separate database, otp is created there instead',
  }),
  b('db-clear-public', INIT, 1061, 1080, {
    1064: 'Tables left in the public schema by early migrations; nothing uses them any more',
  }),
  b('db-seed-roles', INIT, 1086, 1123, {
    1091: 'The app checks roles by name, so the ids do not matter',
    1103: 'Only missing roles are added: running it again changes nothing',
  }),
  b('db-seed-admin', INIT, 1336, 1378, {
    1341: 'Read from configuration (DefaultAdmins:SystemAdmin), never written in code',
    1349: 'Nothing configured: the seed is skipped with a warning',
  }),
  b('db-sql-approval', 'docs/booking_approval_2026-11-19.sql', 1, 51, {
    5: 'Every script is idempotent: safe to run again',
    11: 'BEGIN … COMMIT: all of it is applied, or none',
    44: 'An exclusion constraint: two APPROVED bookings for one venue cannot overlap in time',
    49: 'A partial index that covers only pending bookings, for the approval queue',
  }),
  b('db-sql-venues', 'docs/venue_management_2026-11-19.sql', 1, 59, {
    12: 'New columns for the Add venue form',
    22: 'Constraints are added only if they do not exist yet',
    38: 'The Venue Activity log table',
    50: 'A PostgreSQL text array: one entry per detail line',
  }),

  // ======================= Data areas =======================
  b('db-sql-identity', SQL, 117, 156, {
    122: '"user" is quoted because user is a reserved word in PostgreSQL',
    128: 'A real foreign key: both tables are in identity_db',
    135: 'Each profile table has one row per user (UNIQUE user_id)',
    148: 'timetable_identifier: the lecturer’s name as the timetable spreadsheet writes it',
  }),
  b('db-support-staff', CTX, 489, 507, {
    495: 'Lab technicians and security officers: contacts, not sign-in accounts',
    504: 'Columns renamed by a script are ignored instead of mapped',
  }),
  b('db-sql-academic', SQL, 175, 214, {
    179: 'Soft delete: rows are flagged, not removed, so old timetables still resolve',
    184: 'faculty → department → course → module',
    211: 'Logical link to identity_db."user" (another schema, so no foreign key)',
  }),
  b('db-sql-groups', SQL, 216, 246, {
    222: 'Points at the lecturer teaching this group',
    224: 'A module cannot have two groups with the same name',
    235: 'A student takes a module once per semester and year',
    239: 'student_group is what builds each student’s personal timetable',
  }),
  b('db-managed-timetable', `${PER}/Configurations/ManagedTimetableConfiguration.cs`, 7, 52, {
    11: 'One row per uploaded spreadsheet (the Timetable Management list)',
    24: 'Class Timetable, Semester Test or Examination',
    39: 'Pending → Published (live) → Inactive',
  }),
  b('db-class-entry', `${PER}/Configurations/ClassTimetableEntryConfiguration.cs`, 7, 45, {
    20: 'group_id is a logical link to academic_db."group"',
    30: 'A C# name mapped to a differently spelled column',
    39: 'Ties each class to the uploaded timetable it came from',
    42: 'Filled in code for display; EF never reads or writes them',
  }),
  b('db-sql-tests', SQL, 277, 290, {
    281: 'Selects the upload lane: Semester Test or Exam',
    289: 'The database itself refuses a session that ends before it starts',
  }),
  b('db-planner-entity', 'ARMS.Domain/Entities/AcademicPlanner.cs', 5, 40, {
    16: 'The uploaded file is kept on disk under a generated name',
    29: 'SHA-256 of the file: uploading the same file twice is detected',
    31: 'Only one planner is current; older ones are archived',
  }),
  b('db-calendar-config', CTX, 141, 181, {
    167: 'A hash of each event’s details…',
    171: '…unique per planner, so re-importing the file adds no duplicates',
    180: 'Deleting a planner deletes its events',
  }),
  b('db-lab-config', CTX, 183, 252, {
    191: 'ToTable(name, schema): lab_booking_db.labs',
    199: 'public_id (a uuid) is what the API exposes; lab_id stays internal',
    243: 'is_active = false hides a venue; is_available = false blocks bookings for a while',
    248: 'A C# property worked out from two columns; Ignore keeps EF from looking for a column',
  }),
  b('db-booking-config', CTX, 254, 334, {
    264: 'GENERATED ALWAYS AS IDENTITY: PostgreSQL makes the id',
    297: 'PENDING, APPROVED, REJECTED, CANCELLED…',
    315: 'Approval columns, added by docs/booking_approval_2026-11-19.sql',
    324: 'Index for “bookings of this venue from this time”',
    333: 'Restrict: a venue with bookings cannot be deleted',
  }),
  b('db-rules-config', CTX, 509, 541, {
    516: 'One row per booker type: lecturer, tutor, mentor, student',
    518: 'NULL means “No limit”',
    532: 'A single-row table: setting_id is always 1',
  }),
  b('db-access-config', CTX, 379, 432, {
    391: 'Links to other areas are uuids (public_id), not ints',
    410: 'A request owns its labs, students and admin responses; deleting it deletes them',
    429: 'Composite key: one row per request and lab',
  }),
  b('db-sql-support', SQL, 297, 306, {
    299: 'Logical link to the sender in identity_db."user"',
    303: 'The admin’s reply, shown to the sender',
  }),
  b('db-sql-notifications', SQL, 318, 335, {
    320: 'Academic, Administrative, Calendar, Support or Admin',
    323: 'Optional links to what the notification is about',
    330: 'One row per recipient, with their own read flag',
  }),
  b('db-notify-config', `${PER}/Configurations/NotificationConfiguration.cs`, 41, 63, {
    58: 'No unique (notification, user) pair, on purpose',
    60: 'Index for the bell’s “unread for this user” query',
  }),
]
