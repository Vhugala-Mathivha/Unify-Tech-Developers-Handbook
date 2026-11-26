// 02 · Frontend Development · System Admin (in sidebar order)
import { screen } from './screens'

const base = { category: 'frontend', group: 'System Admin' }

export const systemAdminChapters = [
  {
    ...base,
    id: 'fe-admin-dashboard',
    title: 'Dashboard',
    spreads: [
      {
        heading: 'Timetables, venues and requests at a glance',
        intro: [
          'The admin dashboard answers “what needs me today?”. The welcome card counts Published, Pending and Inactive timetables; each tile opens Timetable Management already filtered to that status.',
          'Below it sit today’s venue bookings, waiting class/lab requests, the timetable status bar, live venue status and the five most recent uploads.',
        ],
        visual: {
          type: 'table',
          head: ['Card', 'Data from'],
          rows: [
            ['Welcome tiles', 'useSystemAdminDashboardStats'],
            ['Venue bookings today', 'useVenueAdminDashboard'],
            ['Class/lab requests', 'useVenueAdminDashboard'],
            ['Timetable Status', 'useSystemAdminDashboardStats'],
            ['Venue status (Live)', 'useVenueAdminDashboard, every 60 s'],
            ['Recent Timetable Uploads', 'useSystemAdminDashboardStats'],
          ],
          code: [1],
        },
        points: ['Pending gets a gold ring while anything waits to be published.'],
        screen: screen('admin-dashboard', 'System Admin dashboard', 'The System Admin dashboard.'),
        snippets: ['ad-dash-page', 'ad-dash-cards', 'ad-dash-grid', 'ad-welcome-card'],
      },
      {
        heading: 'Counting in the browser and publishing from the dashboard',
        intro: [
          'The timetable numbers come from one request: every managed timetable. deriveStats counts each status, the pending uploads from this week and the five newest uploads.',
          'Publishing a pending timetable from Recent Uploads asks for confirmation, publishes it on the backend, refreshes the numbers and notifies everyone. Status bars are drawn with flexbox: each segment’s flex-grow is its count.',
        ],
        points: ['Each bar has a sentence label (role="img"), so screen-reader users hear the numbers.'],
        snippets: ['ad-dash-stats', 'ad-dash-publish', 'ad-status-card', 'ad-venues-now', 'ad-venue-dash-hook'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-admin-timetable',
    title: 'Timetable Management',
    spreads: [
      {
        heading: 'The page: a list view and an upload view',
        intro: [
          'Timetable Management is where the timetable department’s spreadsheets become live timetables. It lists every uploaded timetable with its period, upload date, status and clash-check result.',
          'The page has two views on one route: the list, and Upload Timetable (with breadcrumbs back). All list state lives in useTimetableManagement.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Upload', 'the spreadsheet is saved as Pending'],
            ['Clash check', 'class timetables are checked automatically'],
            ['Publish', 'visible to students and lecturers; the previous one becomes Inactive'],
            ['Deactivate / Delete', 'hide it again, or remove it permanently'],
          ],
        },
        screen: screen('admin-timetable', 'Timetable Management table with tabs, search and status badges', 'The list: tabs with counts, search, filters, sort and status badges.'),
        snippets: ['ad-tm-page-state', 'ad-tm-page-views'],
      },
      {
        heading: 'Tabs, search, filters, sort and paging',
        intro: [
          'The hook loads the timetables once and does everything else in the browser: search, the type/year/period filters, the status tabs, sorting and paging.',
          'Every tab count is taken from the searched and filtered list, so a count always matches what the tab would show. “Has clashes” lists clashing timetables of any status, with a red count.',
        ],
        points: [
          'Opening ?status=pending (from a dashboard tile) starts on that tab.',
          'Status labels and colours are defined once in timetableStatus.js.',
        ],
        snippets: ['ad-tm-hook-views', 'ad-tm-tabs', 'ad-tm-status'],
      },
      {
        heading: 'Uploading a timetable',
        intro: [
          'The upload form asks for the type, academic year, period and faculty, then the Excel file. Upload stays disabled until everything is filled in, and the hint lists what is missing.',
          'The service sends the file as multipart form data to one of two endpoints (class, or test/exam). The upload response has no id, so the hook finds the new record in the refreshed list.',
        ],
        points: ['The faculty name is matched to the backend’s faculty id, ignoring words like “Faculty of” and “(ICT)”.'],
        screen: screen('admin-timetable-create', 'Upload Timetable form beside the Review and Publish card', 'Upload Timetable: details and spreadsheet on the left, Review and Publish on the right.'),
        snippets: ['ad-tm-upload-handler', 'ad-tm-form', 'ad-tm-excel-check', 'ad-tm-upload-service', 'ad-tm-hook-upload'],
      },
      {
        heading: 'Clash checks and the clash report',
        intro: [
          'A clash is a student (or lecturer) with two classes at overlapping times. Every class timetable is checked automatically when it appears in the list; finished reports are remembered for the session.',
          'The Clashes column shows a spinner, “None”, Retry or a red pill. The pill opens the clash report: each clash’s day and time, the overlapping sessions and the students affected. It can be downloaded to send to the timetable department.',
        ],
        points: ['Tests and exams are not checked: their column shows a dash.'],
        screen: screen('admin-timetable-clash', 'Clash report dialog listing clashes with the overlapping sessions', 'A clash report: totals, then each clash with its sessions.'),
        snippets: ['ad-tm-hook-load', 'ad-tm-clash-service', 'ad-tm-clash-indicator'],
      },
      {
        heading: 'Row actions: publish, edit, deactivate, delete',
        intro: [
          'Each row shows its obvious next step (Publish on a pending row) and a ⋯ menu with Edit details, View clash report, Deactivate and Delete.',
          'Every action asks for confirmation. Publishing repeats the clash result in the dialog, so nobody publishes clashes by accident; only one timetable per type and faculty can be live at a time.',
        ],
        screen: screen('admin-timetable-menu', 'Row menu open with Edit details and Delete', 'The ⋯ menu on a row.'),
        snippets: ['ad-tm-row-actions', 'ad-tm-confirms'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-admin-find',
    title: 'Find a Timetable',
    spreads: [
      {
        heading: 'Searching by class group',
        intro: [
          'Find a Timetable shows any group’s published class timetable. The admin picks faculty, course, stream (Mainstream or Extended), year and group; each choice narrows the next and clears the ones after it.',
          'The choices are stored in the URL, so a search can be bookmarked, reloaded or shared. Students and lecturers use the same component without the venue search.',
        ],
        screen: screen('admin-find', 'Find a Timetable with Class selected and the faculty, course, stream, year and group choices', 'Search for a Class timetable: the choice chain before a group is picked.'),
        snippets: ['ad-find-page', 'ad-find-order', 'ad-find-choose'],
      },
      {
        heading: 'Searching by venue, and bulk downloads',
        intro: [
          'Admins can switch to Venue: pick a campus, building and class or lab to see everything timetabled in it, week by week.',
          'Admins can also download every group in a course or a whole department in one file, with a page (PDF) or sheet (Excel) per group. The timetables are fetched four at a time, with progress shown.',
        ],
        screen: screen('admin-find-venue', 'Find a Timetable with Venue selected: campus, building and venue fields', 'Search for a Venue timetable.'),
        snippets: ['ad-find-bulk', 'ad-find-batches', 'ad-find-venue'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-admin-calendar',
    title: 'Calendar Management',
    spreads: [
      {
        heading: 'The Core Calendar',
        intro: [
          'Calendar Management opens on the Core Calendar: the academic year’s key dates (holidays, exams, registration, recess) in a month or year view, with a colour legend and downloads.',
          'The admin sees the same calendar students and lecturers see; the page adds the Upload Calendar button.',
        ],
        points: [
          'Clicking a day opens a dialog with all its events.',
          'Day cells measure their height and show as many event lines as fit; phones show dots.',
        ],
        screen: screen('admin-calendar', 'Calendar Management month view with colour legend and events', 'The Core Calendar in month view.'),
        snippets: ['ad-cal-page', 'ad-cal-events-by-date', 'ad-cal-month-grid', 'ad-cal-categories', 'ad-cal-capacity'],
      },
      {
        heading: 'Uploading a new core calendar',
        intro: [
          'Upload Calendar takes the academic year and the planner spreadsheet (.xlsx). Beside the form, the Active Calendar card shows the calendar in use now, its events by category and the next dates.',
          'After a successful upload the new calendar replaces the active one for everyone, the calendar cache is cleared and admins get a notification.',
        ],
        screen: screen('admin-calendar-upload', 'Upload Calendar form beside the Active Calendar card', 'Upload Calendar with the Active Calendar summary.'),
        snippets: ['ad-cal-upload'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-admin-booking-requests',
    title: 'Booking Requests',
    intro: [
      'Lecturers, tutors and mentors can ask to book classes and labs. Requests in working hours (08:00–16:59) wait here for an admin; after-hours bookings are confirmed automatically.',
      'Requests for the same venue at overlapping times are grouped, so competing requests can be compared side by side. Approving one rejects the overlapping others and emails the building’s technicians and campus CPS.',
    ],
    points: [
      'The sidebar badge counts the same requests (same cache key).',
      'Rejecting needs a reason, which is sent to the booker.',
    ],
    screen: screen('admin-booking-requests', 'Booking Requests grouped by venue and time with Approve and Reject buttons', 'Booking Requests: grouped by venue and time.'),
    snippets: ['ad-br-hook', 'ad-br-groups', 'ad-br-filters', 'ad-br-decide'],
  },
  {
    ...base,
    id: 'fe-admin-venues',
    title: 'Venue Management',
    spreads: [
      {
        heading: 'Five tabs in one card',
        intro: [
          'Venue Management holds everything about the venues themselves: Booking History, Venues (add, edit, deactivate), Closures & blocks, Booking rules and Booking contacts.',
          'The open tab is in the URL, and every action refreshes all the caches that could show the change (venues, bookings, rules, activity, notifications).',
        ],
        screen: screen('admin-venues-bookings', 'Venue Management Booking History tab', 'Booking History: every booking, filterable.'),
        snippets: ['ad-vm-view', 'ad-vm-hooks'],
      },
      {
        heading: 'Venues, closures and booking rules',
        intro: [
          'Closures close or block venues for maintenance, exams or events, on chosen days between two dates. Before saving, the admin sees which bookings will be cancelled.',
          'Booking rules are set per booker type (lecturer, tutor, mentor, student): bookings at once, periods a day, days ahead, and how late a booking can be cancelled or rescheduled. Any rule can be “No limit”.',
        ],
        points: ['Booking contacts are the technicians and the campus CPS email, who are told about approved bookings.'],
        screen: screen('admin-venues-rules', 'Booking rules tab with limits per booker type', 'Booking rules per booker type.'),
        snippets: ['ad-vm-closures', 'ad-vm-limit'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-admin-access',
    title: 'Class/Lab Access',
    intro: [
      'Class/Lab Access decides who may book which classes and labs. Lecturer requests asks the admin to approve a lecturer’s request for their students, offer another venue, or reject it.',
      'Special requests give a list of people (added by email, or from a CSV / Excel list) access to venues between two dates. Saved groups appear under Approved groups.',
    ],
    points: [
      'An approval becomes an approved group straight away.',
      'A special request cancels the bookings it overlaps, so every booking view refreshes.',
    ],
    screen: screen('admin-access-requests', 'Class/Lab Access Lecturer requests tab with a request open', 'Lecturer requests: the queue and the selected request.'),
    snippets: ['ad-acc-view', 'ad-acc-hooks', 'ad-acc-csv'],
  },
  {
    ...base,
    id: 'fe-admin-activity',
    title: 'Venue Activity',
    intro: [
      'Venue Activity is the audit log: every action taken on venues and their access, with who did it, when and to what.',
      'It filters by user, venue, action and date range (the last two weeks by default) and pages through the results.',
    ],
    screen: screen('admin-activity', 'Venue Activity log with filters and rows of actions', 'Venue Activity: who did what, and when.'),
    snippets: ['ad-act-view', 'ad-act-hook'],
  },
  {
    ...base,
    id: 'fe-admin-notifications',
    title: 'Notifications',
    spreads: [
      {
        heading: 'One feed from two sources',
        intro: [
          'The admin’s Notifications & Activity page merges two feeds: timetable and support notifications, and venue notifications (bookings and access requests). The result is sorted newest first.',
          'Each row gets an action link where there is something to do: Review a pending timetable or support query, or open the venue page.',
        ],
        screen: screen('admin-notifications', 'Notifications & Activity page with category tabs and rows', 'Notifications & Activity with its category tabs.'),
        snippets: ['ad-not-page', 'ad-not-unified', 'ad-not-actions'],
      },
      {
        heading: 'useNotifications: the hook behind every feed',
        intro: [
          'Every role’s notifications page and the top-bar bell use useNotifications, with role-specific fetch and mark-read functions.',
          'The hook caches the last feed, hides categories the user switched off in Settings, counts unread per tab, and groups rows into Today, This Week and Earlier.',
        ],
        snippets: ['ad-not-hook', 'ad-not-filters', 'ad-not-groups'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-admin-support',
    title: 'Support',
    spreads: [
      {
        heading: 'The support queue',
        intro: [
          'Support is where admins answer queries from students and lecturers. Four tiles summarise the queue: Unresolved, Longest waiting, New this week and Resolved; each opens the matching view.',
          'The queue has Unresolved / Resolved / All tabs, search, category and user-type filters, and sorting. Waiting queries turn amber after 3 days and red after 7.',
        ],
        screen: screen('admin-support', 'Admin Support page with summary tiles and the queue table', 'The support queue (shown with sample queries).'),
        snippets: ['ad-sup-page', 'ad-sup-summary', 'ad-sup-wait'],
      },
      {
        heading: 'Answering a query, and the Admin Manual',
        intro: [
          'Opening a query shows it as a conversation, with a reply box. The admin can send feedback, mark it resolved, or reopen it; the sender is notified in ARMS and by email. “Link an FAQ” inserts a link to an existing answer.',
          'The Admin Manual is the same ManualSection component students and lecturers use, filled with the admin’s own steps.',
        ],
        screen: screen('admin-support-ticket', 'Support query dialog with the message and a reply box', 'A query open in its dialog.'),
        snippets: ['ad-sup-manual', 'ad-sup-manual-data'],
        related: ['fe-stu-support'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-admin-settings',
    title: 'Settings',
    intro: [
      'Settings is shared by every role. The admin sees a read-only profile card, Account & Security (sign-in method and a link to reset the password on TUT4Life) and Appearance.',
      'Profile data comes from the same hook as the lecturer’s, given the admin’s own fetch function.',
    ],
    related: ['fe-theme-switching'],
    screen: screen('admin-settings', 'Admin Settings page with profile, security and appearance cards', 'Settings: profile, security and appearance.'),
    snippets: ['ad-set-page'],
  },
]
