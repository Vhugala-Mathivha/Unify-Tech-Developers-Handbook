// 05 · Database Architecture — PostgreSQL + Entity Framework Core in ARMS.Backend.
// No connection strings, keys or account rows appear here: only schema and code.
import { screen } from './frontend/screens'

const found = { category: 'database', group: 'Foundations' }
const areas = { category: 'database', group: 'Data areas' }

export const databaseChapters = [
  // ======================= Foundations =======================
  {
    ...found,
    id: 'db-postgres-ef',
    title: 'PostgreSQL & Entity Framework Core',
    spreads: [
      {
        heading: 'One database, several schemas',
        intro: [
          'ARMS keeps its data in one PostgreSQL database. Tables are grouped into schemas, one per area of the system, much like separate services: identity, academic, timetable, system and lab booking.',
          'C# code reaches the tables through Entity Framework Core with the Npgsql provider. EF turns LINQ queries into SQL and tracks changes to entities, so most features never write SQL by hand.',
        ],
        visual: {
          type: 'tree',
          text: `PostgreSQL database
├─ identity_db     user, role, student, lecturer,
│                  system_admin, support_staff, otp
├─ academic_db     faculty, department, course, module,
│                  lecturer_module, group,
│                  student_enrollment, student_group
├─ timetable_db    managed_timetable,
│                  class_timetable_entry, test_timetable_entry
├─ system_db       notification, user_notification,
│                  support_ticket
├─ lab_booking_db  labs, lab_bookings, lab_access_request…,
│                  special_bookings, booking rules, venue_activity
└─ public          "AcademicPlanners", "AcademicCalendarEvents"`,
        },
        snippets: ['db-sql-header', 'db-schemas'],
      },
      {
        heading: 'Logical links between schemas',
        intro: [
          'Inside a schema, tables use real foreign keys: student.user_id must point at an existing user. Between schemas they do not. class_timetable_entry.group_id is a plain integer that the code matches to academic_db."group".',
          'This keeps each area independent, but PostgreSQL will not stop a link pointing at a deleted row. The services check these links themselves, and rows are usually soft-deleted (is_deleted) rather than removed.',
        ],
        visual: {
          type: 'table',
          head: ['Link', 'Kind'],
          rows: [
            ['student.user_id → user', 'foreign key (same schema)'],
            ['group.module_id → module', 'foreign key (same schema)'],
            ['class_timetable_entry.group_id → group', 'logical (timetable → academic)'],
            ['lecturer_module.lecturer_user_id → user', 'logical (academic → identity)'],
            ['user_notification.user_id → user', 'logical (system → identity)'],
            ['lab_access_request.requested_by_public_id', 'logical, by uuid'],
          ],
        },
        points: ['The planner tables have no schema in their mapping, so EF names them after the DbSets ("AcademicPlanners") in public. PascalCase names must be quoted in SQL.'],
        related: ['be-tools', 'in-environments'],
        snippets: ['be-infra-db'],
      },
    ],
  },
  {
    ...found,
    id: 'db-contexts',
    title: 'Database contexts',
    spreads: [
      {
        heading: 'ArmsDbContext',
        intro: [
          'A DbContext is EF Core’s session with the database. ArmsDbContext lists almost every table as a DbSet property and holds the mapping for the lab-booking tables in OnModelCreating.',
          'Services get a context through dependency injection, one per HTTP request. The Application layer sees it only through the IApplicationDbContext interface.',
        ],
        points: ['SaveChanges is overridden: saving academic or calendar data also empties the matching cache region.'],
        snippets: ['db-context-sets', 'db-context-model'],
      },
      {
        heading: 'TimetableDbContext and design time',
        intro: [
          'TimetableDbContext holds only the three timetable tables. It has its own connection string, so timetables can live in a separate database if needed; today both usually point at the same one.',
          'ArmsDbContextFactory gives the dotnet ef tools a context at design time, when the API is not running. Its code is not shown in this handbook because it contains a connection string.',
        ],
        points: ['Watch out: ArmsDbContextFactory.cs has the live connection string written into it. Read it from an environment variable instead, and change that password.'],
        related: ['be-caching', 'be-startup'],
        snippets: ['db-timetable-context', 'be-cache-invalidate'],
      },
    ],
  },
  {
    ...found,
    id: 'db-entities',
    title: 'Entity model overview',
    spreads: [
      {
        heading: 'Entities and configurations',
        intro: [
          'Each table has an entity class in ARMS.Domain/Entities. Property names follow the column names in snake_case (user_id, full_name), so the C# reads like the SQL.',
          'The mapping lives in two places: IEntityTypeConfiguration classes in Persistence/Configurations (one per entity), and the lab-booking mappings written straight in ArmsDbContext.OnModelCreating.',
        ],
        visual: {
          type: 'table',
          head: ['Mapping call', 'What it does'],
          rows: [
            ['ToTable("user", "identity_db")', 'table and schema'],
            ['HasKey / ValueGeneratedOnAdd', 'primary key, made by PostgreSQL'],
            ['Property().HasMaxLength().IsRequired()', 'column size and NOT NULL'],
            ['HasIndex().IsUnique()', 'unique index (e.g. one email per user)'],
            ['HasOne / HasMany + OnDelete', 'relationship and what deleting does'],
            ['Ignore()', 'a C# property with no column'],
          ],
        },
        snippets: ['db-user-entity', 'db-user-config'],
      },
      {
        heading: 'Entities by area',
        intro: [
          'ARMS.Domain/Entities has 41 files. Most entities belong to one data area, covered in the chapters that follow. A few (AcademicResource, Loan, Reservation, Location, ResourceCategory) come from an early resource-loan design; their tables are dropped from the public schema at startup.',
        ],
        visual: {
          type: 'table',
          head: ['Area', 'Entities'],
          rows: [
            ['People', 'User, Role, Student, Lecturer, SystemAdmin, SupportStaff, Otp'],
            ['Academic', 'Faculty, Department, Course, Module, LecturerModule'],
            ['Groups', 'Group, StudentEnrollment, StudentGroup'],
            ['Timetables', 'ManagedTimetable, ClassTimetableEntry, TestTimetableEntry'],
            ['Calendar', 'AcademicPlanner, AcademicCalendarEvent'],
            ['Venues', 'Lab, LabEquipment, LabBooking, SpecialBooking, BookingTypeRule, BookingSettings, VenueActivity'],
            ['Requests', 'LabAccessRequest (+ labs, students, responses), StudentLabRole'],
            ['System', 'Notification, UserNotification, SupportTicket, AdminRequestReminder'],
          ],
        },
        related: ['be-solution'],
        snippets: ['db-context-model'],
      },
    ],
  },
  {
    ...found,
    id: 'db-migrations',
    title: 'Migrations',
    intro: [
      'EF Core migrations are C# classes that describe a schema change: Up applies it and Down undoes it. ARMS has seven, in Persistence/Migrations, plus the model snapshot EF compares against when you add the next one.',
      'They are not applied when the API starts. Program.cs runs DbInitializer, which checks the schema with idempotent SQL. Run migrations yourself with dotnet ef database update, after checking what they will do on the live database.',
    ],
    visual: {
      type: 'tree',
      text: `Persistence/Migrations/
├─ 20260901…_InitialCreate             identity tables
├─ 20260901…_SyncModelChanges          departments
├─ 20260902…_PendingChanges            profile columns
├─ 20261112…_AddStudentLabRoles        lab roles; drops old tables
├─ 20261117…_AddLabAccessRequestDateRange
├─ 20261118…_SyncLabAccessRequestDetails
├─ 20261118…_AddLabAccessRequestDetails
└─ ArmsDbContextModelSnapshot.cs       the model EF compares against`,
    },
    points: [
      'Add one: dotnet ef migrations add Name --project ARMS.Infrastructure --startup-project ARMS.API',
      'Much of lab_booking_db was built with SQL scripts, not migrations, so the snapshot does not describe every table.',
    ],
    related: ['db-seeding', 'db-sql-scripts'],
    snippets: ['db-migration'],
  },
  {
    ...found,
    id: 'db-seeding',
    title: 'Seeding & initial data',
    spreads: [
      {
        heading: 'What runs at startup',
        intro: [
          'Before the API takes its first request, Program.cs calls InitialiseDatabaseAsync. DbInitializer then runs a fixed list of steps, each one timed and logged.',
          'Every step is safe to run again: tables and columns are created only if missing, and seed rows only if absent. A database that is already up to date starts in a few seconds.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Schema checks', 'otp, timetable, academic, system, lab booking'],
            ['Booking patches', 'approval columns, rules, contacts'],
            ['Data fixes', 'split combined class groups'],
            ['Calendar import', 'events from the current planner'],
            ['Clean-up', 'drop unused public tables'],
            ['Seeds', 'roles, the default system admin, test lecturers'],
          ],
        },
        snippets: ['db-init-extension', 'db-init-steps'],
      },
      {
        heading: 'Roles and the first admin',
        intro: [
          'Three roles are seeded: Student, Lecturer and SystemAdmin. The code always checks roles by name, never by id.',
          'The first system admin is created from the DefaultAdmins:SystemAdmin section of configuration, with the password hashed by BCrypt. Students are not seeded here. Lecturer accounts are created by the timetable import, and SeedLecturers can point some at real inboxes for testing.',
        ],
        points: ['Watch out: give seed passwords through environment variables on Render, not in appsettings.json.'],
        related: ['be-config', 'be-users', 'db-sql-scripts'],
        snippets: ['db-seed-roles', 'db-seed-admin'],
      },
    ],
  },
  {
    ...found,
    id: 'db-sql-scripts',
    title: 'SQL scripts & data fixes',
    spreads: [
      {
        heading: 'The docs/ folder',
        intro: [
          'ARMS.Backend/docs holds hand-written SQL. arms_database_full.sql builds the core schemas from scratch; the dated scripts each add one feature’s tables or columns.',
          'Feature scripts are idempotent (IF NOT EXISTS) and wrapped in BEGIN … COMMIT. Most are also applied by DbInitializer at startup, so running them by hand is only needed for a database the API has not started against.',
        ],
        visual: {
          type: 'table',
          head: ['Script', 'What it does'],
          rows: [
            ['arms_database_full.sql', 'all core schemas and tables; patch block for existing DBs'],
            ['booking_approval_…', 'approval columns, overlap constraint, settings, special bookings'],
            ['booking_contacts_rules_…', 'support-staff campus, rules per booker type'],
            ['venue_management_…', 'venue details, opening hours, venue_activity'],
            ['support_staff_emailed_for_…', 'which buildings a contact covers'],
            ['sync_admin_notifications_…', 'back-fills admin notifications'],
            ['one-off account fixes', 'add or link single accounts (personal data, not shown)'],
          ],
        },
        points: ['Watch out: do not run STEP 1 of arms_database_full.sql on a live database. It drops every schema.'],
        snippets: ['db-sql-approval'],
      },
      {
        heading: 'Patches the API applies itself',
        intro: [
          'The lab and booking base tables were created by a separate lab-booking SQL script that is not in this repo. DbInitializer therefore only adds the columns the C# model needs, and only after checking the table exists.',
          'The same pattern (to_regclass, ADD COLUMN IF NOT EXISTS, constraints added only when missing) lets one API build start against an old database or a fresh one.',
        ],
        points: ['Before writing a new script, check whether DbInitializer already does the same thing.'],
        related: ['db-migrations', 'db-venues'],
        snippets: ['db-ensure-labs', 'db-ensure-otp', 'db-clear-public'],
      },
    ],
  },

  // ======================= Data areas =======================
  {
    ...areas,
    id: 'db-people',
    title: 'People: admins, lecturers & students',
    spreads: [
      {
        heading: 'One user, one profile',
        intro: [
          'Everyone who signs in has one row in identity_db."user" with their name, email, BCrypt password hash and role. A second table holds what is special to the role: student (student number, campus), lecturer (staff number, office) or system_admin.',
          'Each profile row points at its user with a UNIQUE foreign key, so a user has at most one profile of each kind. Deleting a user deletes the profile (ON DELETE CASCADE).',
        ],
        visual: {
          type: 'tree',
          text: `identity_db
├─ role           Student · Lecturer · SystemAdmin
├─ user           name, email (unique), password_hash, role_id
│  ├─ student       student_number, campus, contact
│  ├─ lecturer      staff_number, office, timetable_identifier
│  └─ system_admin  employee_number, technical_contact
├─ support_staff  lab technicians, security officers (no sign-in)
└─ otp            hashed sign-in codes, expiry, attempts`,
        },
        snippets: ['db-sql-identity'],
      },
      {
        heading: 'Mapping and contacts',
        intro: [
          'UserConfiguration maps the user table: required fields, a unique email index and the link to its role. Restrict on that link means a role still in use cannot be deleted.',
          'support_staff holds booking contacts (lab technicians and Campus Protection Services officers). They receive booking emails but never sign in, so they have no user row.',
        ],
        related: ['be-users', 'be-auth', 'db-seeding'],
        snippets: ['db-user-config', 'db-support-staff'],
      },
    ],
  },
  {
    ...areas,
    id: 'db-academic',
    title: 'Faculties, departments & modules',
    intro: [
      'academic_db describes how TUT is organised: a faculty has departments, a department offers courses, and a course is made of modules. Each level points at the one above it with a real foreign key.',
      'lecturer_module says who teaches which module. Its lecturer_user_id is a logical link into identity_db. Faculties, departments, courses and modules are soft-deleted (is_deleted), so old timetables still find their module names.',
    ],
    visual: {
      type: 'steps',
      items: [
        ['faculty', 'name, code (e.g. ICT)'],
        ['department', 'belongs to a faculty'],
        ['course', 'code, qualification and NQF level'],
        ['module', 'code (unique), name'],
        ['lecturer_module', 'lecturer ↔ module, office number'],
      ],
    },
    screen: screen('lecturer-groups', 'My Groups page', 'My Groups lists a lecturer’s modules and groups.'),
    related: ['be-faculties', 'db-groups-timetables'],
    snippets: ['db-sql-academic'],
  },
  {
    ...areas,
    id: 'db-groups-timetables',
    title: 'Groups & timetables',
    spreads: [
      {
        heading: 'Groups and who is in them',
        intro: [
          'A module is taught in groups (e.g. P1, P2). student_enrollment records that a student takes a module in a semester and year. student_group puts that student into one group of the module.',
          'student_group is what personal timetables are built from: a student’s classes are the class_timetable_entry rows of the groups they are in.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['module', 'e.g. a first-year programming module'],
            ['group', 'P1, P2… unique per module'],
            ['student_enrollment', 'student takes the module this semester'],
            ['student_group', 'student is in group P2'],
            ['class_timetable_entry', 'P2’s classes → the student’s timetable'],
          ],
        },
        snippets: ['db-sql-groups'],
      },
      {
        heading: 'Uploaded timetables and their entries',
        intro: [
          'Every uploaded spreadsheet becomes one managed_timetable row (name, type, year, period, faculty, status). Its rows become class_timetable_entry or test_timetable_entry records linked back to it.',
          'Status drives what users see: Pending after upload, Published when live, Inactive when replaced. Only one timetable of each type per faculty is Published at a time.',
        ],
        visual: {
          type: 'table',
          head: ['Table', 'One row is'],
          rows: [
            ['managed_timetable', 'one uploaded spreadsheet'],
            ['class_timetable_entry', 'a class: group, day, times, venue, lecturer'],
            ['test_timetable_entry', 'a test or exam: module, date, times, venue'],
          ],
        },
        snippets: ['db-managed-timetable', 'db-class-entry'],
      },
      {
        heading: 'Tests and exams',
        intro: [
          'Semester tests and exams are linked to a module, not a group, and have a real date instead of a weekday. test_type chooses which upload lane the rows came from.',
          'CHECK constraints guard the data in the database itself: a session cannot end before it starts, and academic_week starts at 1.',
        ],
        related: ['be-timetable-upload', 'be-personal-timetables', 'in-flow-timetable'],
        snippets: ['db-sql-tests'],
      },
    ],
  },
  {
    ...areas,
    id: 'db-calendar',
    title: 'Academic planner & calendar',
    intro: [
      'The academic planner is the year-plan spreadsheet a system admin uploads. The "AcademicPlanners" table records the file: its stored name, size, SHA-256 hash and whether it is the current planner. Older planners are archived, not deleted.',
      'Its events are imported into "AcademicCalendarEvents". Both tables are in the public schema. Each event stores a hash of its details, unique per planner, so importing the same file again adds no duplicates. Deleting a planner deletes its events.',
    ],
    visual: {
      type: 'steps',
      items: [
        ['Upload', 'planner file saved; one is_current planner'],
        ['Import', 'sheets → events, each with an event_hash'],
        ['AcademicCalendarEvents', 'title, dates, category, source sheet'],
        ['Readers', 'Academic Calendar pages and reminder emails'],
      ],
    },
    screen: screen('student-calendar', 'Student Academic Calendar', 'The calendar pages read these events.'),
    related: ['be-calendar', 'be-background'],
    snippets: ['db-planner-entity', 'db-calendar-config'],
  },
  {
    ...areas,
    id: 'db-venues',
    title: 'Venues, labs & bookings',
    spreads: [
      {
        heading: 'Venues',
        intro: [
          'Every bookable room is a row in lab_booking_db.labs: a computer lab (is_lab = true) or a classroom. It has a campus, location, optional capacity and floor, and opening hours stored as whole hours (0 to 24).',
          'Two flags control it: is_active = false hides the venue entirely; is_available = false keeps it listed but blocks new bookings for a while. The API exposes public_id (a uuid), never the internal lab_id.',
        ],
        points: ['lab_equipment lists what is in each venue; it is deleted with the venue.'],
        snippets: ['db-lab-config', 'db-sql-venues'],
      },
      {
        heading: 'Bookings',
        intro: [
          'A lab_bookings row is one booking: who, which venue, start and end (timestamps with time zone), purpose, type and status. Approval columns record who reviewed it, when, why, and the venue first asked for if the admin moved it.',
          'The database protects the timetable itself. An exclusion constraint stops two APPROVED bookings overlapping in one venue, and a venue that has bookings cannot be deleted.',
        ],
        snippets: ['db-booking-config', 'db-sql-approval'],
      },
      {
        heading: 'Rules, settings and special bookings',
        intro: [
          'booking_type_rules has one row per booker type (lecturer, tutor, mentor, student): how many active bookings, periods per day, days ahead and cancel cut-off. NULL means no limit.',
          'booking_settings is a single row with the admin’s daily slot limit. special_bookings hold system-admin reservations for events or outside companies, with their venues and members in link tables.',
        ],
        screen: screen('admin-venues-rules', 'Venue Management booking rules', 'Booking rules edit booking_type_rules.'),
        related: ['be-bookings', 'be-venue-admin', 'be-special-bookings', 'in-flow-booking'],
        snippets: ['db-rules-config'],
      },
    ],
  },
  {
    ...areas,
    id: 'db-requests',
    title: 'Requests, notifications & support',
    spreads: [
      {
        heading: 'Lab access requests',
        intro: [
          'A lecturer’s request is a lab_access_request row (module, scope, period, reason, status), with its labs and selected students in two link tables. Each admin answer is a lab_access_response with the labs it offers.',
          'These tables link to people and modules by uuid (public_id) instead of integer ids. Deleting a request deletes everything attached to it.',
        ],
        visual: {
          type: 'tree',
          text: `lab_access_request        status: PENDING · OFFERED ·
│                           APPROVED · REJECTED · WITHDRAWN
├─ lab_access_request_lab      the labs asked for
├─ lab_access_request_student  only for SELECTED_STUDENTS
└─ lab_access_response         the admin’s decision
   └─ lab_access_response_lab  the labs offered`,
        },
        snippets: ['db-access-config'],
      },
      {
        heading: 'Notifications and support tickets',
        intro: [
          'A notification is stored once, with one user_notification row per recipient holding that person’s read flag. Optional columns link it to a class, test or support ticket.',
          'support_ticket stores a query, the admin’s reply (admin_feedback) and whether it is resolved. admin_request_reminder remembers when admins were last reminded about a pending request, so reminders are not repeated too often.',
        ],
        related: ['be-notifications', 'be-support', 'be-lab-access', 'in-flow-notifications'],
        snippets: ['db-sql-notifications', 'db-notify-config', 'db-sql-support'],
      },
    ],
  },
]
