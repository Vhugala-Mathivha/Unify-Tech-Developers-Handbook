// Code shown on the 02 · Frontend · System Admin chapters (ARMS.Frontend).
const f = (id, file, from, to, notes, extra = {}) => ({ id, repo: 'frontend', file, from, to, ...(notes ? { notes } : {}), ...extra })
const TM = 'src/features/timetable-management'

export const SNIPPETS = [
  // ---------- Dashboard ----------
  f('ad-dash-page', 'src/pages/system-admin/SystemAdminDashboard.jsx', 38, 49, {
    44: "'Good Morning / Afternoon / Evening' from the current time",
  }),
  f('ad-dash-cards', `src/features/system-admin-dashboard/components/SystemAdminDashboardCards.jsx`, 57, 105, {
    58: 'Each tile opens Timetable Management already filtered to its status',
    62: 'Timetable numbers from the timetable-management API',
    63: 'Bookings, requests and venue numbers from the venue API',
    94: 'A gold ring on Pending while anything is waiting to be published',
  }),
  f('ad-dash-grid', `src/features/system-admin-dashboard/components/SystemAdminDashboardCards.jsx`, 107, 138, {
    107: 'Skeleton cards hold the layout while the first load runs',
    119: 'A 12-column grid: three cards of 4 columns, then a full-width row',
  }),
  f('ad-dash-stats', 'src/features/system-admin-dashboard/hooks/useSystemAdminDashboardStats.js', 64, 91, {
    64: 'One request for all timetables; every number is counted in the browser',
    75: 'The five newest uploads for the Recent Timetable Uploads card',
    90: 'Kept in the page cache so the next visit shows numbers at once',
  }),
  f('ad-dash-publish', 'src/features/system-admin-dashboard/hooks/useSystemAdminDashboardStats.js', 134, 147, {
    137: 'The backend also deactivates the timetable this one replaces',
    139: 'Everyone gets a "Timetable published" notification',
  }),
  f('ad-welcome-card', 'src/components/dashboard/DashboardWelcomeCard.jsx', 54, 92, {
    55: "Students and lecturers see their department's photo; admins get the default",
    69: 'Each stat tile is a real button, so it works with the keyboard',
  }),
  f('ad-status-card', `src/features/system-admin-dashboard/components/TimetableStatusCard.jsx`, 45, 79, {
    51: 'A sentence version of the bar for screen readers',
    70: 'role="img" + aria-label: the bar is read out as one picture',
    75: 'flexGrow = the count, so each segment takes its share of the width',
  }),
  f('ad-venues-now', 'src/features/venues/admin-dashboard/VenuesNowCard.jsx', 15, 54, {
    16: 'Skeleton only on the very first load',
    20: 'Free / In use / Closed right now, on the admin’s campus',
  }),
  f('ad-venue-dash-hook', 'src/features/venues/admin-dashboard/useVenueAdminDashboard.js', 7, 12, {
    10: 'Refreshes every minute (paused while the tab is hidden)',
  }),

  // ---------- Timetable Management ----------
  f('ad-tm-page-state', 'src/pages/system-admin/TimetableManagement.jsx', 78, 115, {
    83: 'All list state (search, tabs, sort, paging, clash reports) lives in one hook',
    86: '"creating" is view state, not a separate route',
    113: 'A new key remounts the form, clearing the chosen file',
  }),
  f('ad-tm-page-views', 'src/pages/system-admin/TimetableManagement.jsx', 171, 241, {
    173: 'Create view: the form on the left, the review card on the right',
    177: 'Breadcrumbs in the eyebrow: Timetable Management > Upload Timetable',
    236: 'List view: everything the hook returns is passed to the table',
  }),
  f('ad-tm-upload-handler', 'src/pages/system-admin/TimetableManagement.jsx', 117, 158, {
    123: 'The form shows faculty names; the API needs the backend faculty id',
    131: "The file name (without .xlsx) becomes the timetable's name",
    149: 'Only class timetables are checked for clashes',
  }),
  f('ad-tm-hook-load', `${TM}/hooks/useTimetableManagement.js`, 170, 218, {
    180: 'The table appears as soon as the timetables arrive; faculties load alongside',
    197: 'One clash check per class timetable',
    213: 'Every class timetable not checked yet is checked automatically',
  }),
  f('ad-tm-hook-views', `${TM}/hooks/useTimetableManagement.js`, 226, 274, {
    228: 'Search and filters first; every tab count is taken from this list',
    248: 'Has clashes lists clashing timetables whatever their status',
    261: 'Ties are broken by name, so the order is stable',
    274: 'Client-side paging: only this page of rows is rendered',
  }),
  f('ad-tm-status', `${TM}/timetableStatus.js`, 22, 42, {
    27: 'The colour token for dots and chart segments (defined in index.css)',
  }),
  f('ad-tm-tabs', `${TM}/components/TimetableTable.jsx`, 45, 51, {
    50: 'alert: this tab’s count is shown in red',
  }),
  f('ad-tm-upload-service', 'src/services/timetableManagementService.js', 129, 153, {
    130: 'Class timetables and test / exam timetables use different upload endpoints',
    131: 'The spreadsheet goes as multipart form data, with its details',
    145: 'Overrides the client’s JSON default so the file is sent as multipart',
  }),
  f('ad-tm-hook-upload', `${TM}/hooks/useTimetableManagement.js`, 330, 360, {
    336: 'A timed-out upload may still exist on the server, so refresh before failing',
    341: 'Admins get a "New timetable uploaded" notification',
    349: 'The upload response has no id, so the new record is found in the refreshed list',
  }),
  f('ad-tm-form', `${TM}/components/CreateTimetableForm.jsx`, 93, 119, {
    104: 'Locked while uploading and after a successful upload',
    107: 'Lists what is still missing, used in the hint under the Upload button',
  }),
  f('ad-tm-excel-check', `${TM}/components/CreateTimetableForm.jsx`, 55, 66, {
    65: 'Both the extension and the file type must say Excel',
  }),
  f('ad-tm-clash-service', 'src/services/timetableManagementService.js', 218, 240, {
    221: 'Dev sign-in: demo clash reports after a short delay, so "Checking…" is visible',
    227: 'Each clash: a day and time, the students affected and the sessions that overlap',
  }),
  f('ad-tm-clash-indicator', `${TM}/components/TimetableClashIndicator.jsx`, 33, 94, {
    34: 'Tests and exams are not checked: a dash',
    43: 'Still checking: a spinner',
    52: 'The check failed: Retry',
    81: 'Clashes: a red pill that opens the clash report',
  }),
  f('ad-tm-row-actions', `${TM}/components/TimetableRowActions.jsx`, 141, 172, {
    142: 'The Publish confirmation repeats the clash result so it is seen first',
    159: 'Every action: ignore double clicks, then toast success or the backend’s error',
  }),
  f('ad-tm-confirms', `${TM}/components/TimetableRowActions.jsx`, 331, 361, {
    334: 'The title changes when the timetable has clashes',
    356: 'Delete is destructive (red) and says it cannot be undone',
  }),

  // ---------- Find a Timetable ----------
  f('ad-find-page', 'src/pages/system-admin/SystemAdminFindTimetable.jsx', 14, 23, {
    20: 'allowVenues: only admins can also search by venue (and download in bulk)',
  }),
  f('ad-find-order', 'src/features/timetable/components/FindTimetable.jsx', 60, 73, {
    63: 'The order of the choices; picking one clears the choices after it',
    65: 'What a download covers: one group, a whole course or a whole department',
  }),
  f('ad-find-choose', 'src/features/timetable/components/FindTimetable.jsx', 183, 216, {
    183: 'Only a complete choice (faculty → group) loads a timetable',
    189: 'The choices are in the URL, so a search can be shared or reloaded',
    204: 'Changing a choice deletes the ones after it',
    213: 'Each module gets its own colour, in the order it first appears',
  }),
  f('ad-find-bulk', 'src/features/timetable/components/FindTimetable.jsx', 224, 246, {
    226: 'Fetches many group timetables, four at a time',
    232: 'Turns each timetable into a table: one row per time, one column per day',
    245: 'One file: a page per group (PDF) or a sheet per group (Excel)',
  }),
  f('ad-find-batches', 'src/features/timetable/timetableDownload.js', 48, 63, {
    61: 'At most `limit` requests run at the same time, so the backend is not flooded',
  }),
  f('ad-find-venue', 'src/features/timetable/components/FindVenueTimetable.jsx', 121, 131, {
    123: '?week= picks the week shown (always moved to its Monday)',
    125: 'With one campus it is chosen for you',
  }),

  // ---------- Calendar Management ----------
  f('ad-cal-page', 'src/pages/system-admin/CalendarManagement.jsx', 51, 85, {
    54: 'The calendar view’s state (month / year, navigation, download)',
    55: 'The upload view’s state (year, status, active calendar)',
    58: '?upload=1 opens straight in the upload view',
  }),
  f('ad-cal-upload', 'src/features/calendar-management/hooks/useCoreCalendarManagement.js', 136, 169, {
    142: 'Checked in the browser first; the backend parses the spreadsheet',
    151: "status: 'idle' → 'uploading' → 'success' or 'error'",
    154: 'The new calendar replaces the active one for every student and lecturer',
  }),
  f('ad-cal-events-by-date', 'src/features/calendar/hooks/useAcademicCalendar.js', 205, 224, {
    205: 'Shared by the Core Calendar and the dashboards’ mini calendars',
    217: 'A multi-day period (recess, registration) is placed on every day it covers',
  }),
  f('ad-cal-month-grid', 'src/features/calendar/hooks/useAcademicCalendar.js', 239, 254, {
    241: 'Weeks start on Monday',
    243: 'Always 6 weeks × 7 days = 42 cells, padded with days from the months around it',
  }),
  f('ad-cal-categories', 'src/features/calendar/components/AcademicCalendar.jsx', 142, 168, {
    150: 'Public and TUT holidays share one colour in the legend',
  }),
  f('ad-cal-capacity', 'src/features/calendar/components/AcademicCalendar.jsx', 443, 485, {
    457: 'Measures how tall a day cell really is…',
    471: '…to work out how many event lines fit in it',
    477: 'Re-measured whenever the grid is resized',
    484: 'Phones show dots only',
  }),

  // ---------- Booking Requests ----------
  f('ad-br-hook', 'src/features/venues/booking-requests/hooks/useBookingRequests.js', 15, 46, {
    16: 'The same cache key as the sidebar badge',
    35: 'Refresh even after a failure: someone else may already have answered',
  }),
  f('ad-br-groups', 'src/services/venues/bookingRequestGroups.js', 15, 56, {
    18: 'Requests are grouped by venue and day…',
    29: '…and overlapping times become one group, so competing requests sit side by side',
    51: 'Inside a group the oldest request is first: first come is a fair tie-breaker',
  }),
  f('ad-br-filters', 'src/features/venues/views/BookingRequestsView.jsx', 29, 51, {
    47: '"Only times more than one person wants" shows contested groups only',
  }),
  f('ad-br-decide', 'src/features/venues/booking-requests/components/BookingRequestGroup.jsx', 35, 64, {
    39: 'Approving one request rejects the others that overlap it',
    47: 'The building’s technicians and campus CPS are emailed about the booking',
  }),

  // ---------- Venue Management ----------
  f('ad-vm-view', 'src/features/venues/views/VenueManagementView.jsx', 28, 71, {
    38: 'The open tab is in the URL (?tab=closures), so links from the dashboard open the right one',
    41: 'null = closed, {} = a new venue, a venue = edit it',
  }),
  f('ad-vm-hooks', 'src/features/venues/venue-management/hooks/useVenueManagement.js', 28, 64, {
    28: 'Reads go through the shared query cache',
    46: 'After any change, everything that could show it is refreshed',
  }),
  f('ad-vm-closures', 'src/features/venues/venue-management/components/ClosuresTab.jsx', 49, 70, {
    56: 'Mon–Sun by default; the Days field can narrow it',
    65: 'Shows exactly which bookings the closure would cancel, before it is saved',
  }),
  f('ad-vm-limit', 'src/features/venues/venue-management/components/BookingRulesTab.jsx', 23, 57, {
    32: 'Every rule can be a number or "No limit"',
    52: 'Ticking No limit keeps the last number, ready for unticking',
  }),

  // ---------- Class/Lab Access ----------
  f('ad-acc-view', 'src/features/venues/views/VenueAccessibilityView.jsx', 16, 51, {
    36: 'The Lecturer requests tab shows how many are waiting',
    45: 'Saving a special request jumps to Approved groups',
  }),
  f('ad-acc-hooks', 'src/features/venues/venue-access/hooks/useVenueAccess.js', 30, 67, {
    32: '"Offer other venue": the labs the system would suggest instead',
    49: 'A special request cancels the venue bookings it overlaps, so bookings refresh too',
  }),
  f('ad-acc-csv', 'src/utils/csv.js', 9, 40, {
    10: 'A small CSV reader for the special-request list (one email per row)',
    18: 'Two quotes inside a quoted cell mean one quote character',
  }),

  // ---------- Venue Activity ----------
  f('ad-act-view', 'src/features/venues/views/AuditLogView.jsx', 24, 76, {
    29: 'The last two weeks by default',
    36: 'Changing any filter goes back to page 1',
  }),
  f('ad-act-hook', 'src/features/venues/audit-log/hooks/useAuditLog.js', 9, 16, {
    10: 'The filters are part of the cache key: each filter combination is cached separately',
  }),

  // ---------- Notifications ----------
  f('ad-not-page', 'src/pages/system-admin/SystemAdminNotifications.jsx', 51, 95, {
    59: 'The same hook the lecturer and student feeds use, with the admin’s functions',
    66: 'The open category is in the URL (?category=support)',
    90: 'Each row gets an action link: Review, View, or a venue page',
  }),
  f('ad-not-unified', 'src/services/unifiedAdminNotificationFeed.js', 14, 31, {
    17: 'Timetable / support notifications and venue notifications come from two services…',
    21: '…merged into one feed, newest first',
    28: "Venue ids start with 'venue:', so each id goes back to the right service",
  }),
  f('ad-not-actions', 'src/features/notifications/adminNotificationActions.js', 31, 47, {
    36: 'Opens the support queue with that query already open',
  }),
  f('ad-not-hook', 'src/features/notifications/hooks/useNotifications.js', 125, 150, {
    129: 'The last feed shown is kept, so the bell badge never blanks on navigation',
    145: 'Re-fetches when a notification is pushed anywhere in the app',
  }),
  f('ad-not-filters', 'src/features/notifications/hooks/useNotifications.js', 167, 188, {
    169: 'Categories switched off in Settings › Notification Preferences are hidden',
    182: 'An unknown or disabled tab falls back to All',
  }),
  f('ad-not-groups', 'src/features/notifications/groupByDate.js', 30, 63, {
    41: 'The week starts on Monday, like the Core Calendar',
  }),

  // ---------- Support ----------
  f('ad-sup-page', 'src/pages/system-admin/SystemAdminSupport.jsx', 53, 81, {
    57: 'The open query is in the URL (?ticket=12), so a notification link opens it',
    62: 'Keeps the dialog’s content on screen while it animates closed',
    78: 'A link to a query that does not exist explains itself and closes',
  }),
  f('ad-sup-summary', 'src/features/support/hooks/useSupportTickets.js', 214, 256, {
    215: 'The tiles always describe the whole queue, whatever is filtered below',
    233: 'Longest waiting: the unresolved tab, oldest first',
    247: 'The backend emails the sender and adds an in-app notification',
  }),
  f('ad-sup-wait', 'src/features/support/supportTickets.js', 118, 136, {
    120: 'Amber after 3 days, red after 7, so forgotten queries stand out',
  }),
  f('ad-sup-manual', 'src/pages/system-admin/SystemAdminSupportManual.jsx', 29, 37, {
    34: 'The same ManualSection as students and lecturers, with the admin manual’s content',
  }),
  f('ad-sup-manual-data', 'src/features/support/manuals.js', 385, 401, {
    386: 'Manuals are data: a quick-start list and sections with steps and tips',
  }),

  // ---------- Settings ----------
  f('ad-set-page', 'src/pages/system-admin/SystemAdminSettings.jsx', 39, 55, {
    41: 'The lecturer profile hook, given the admin’s own fetch function',
    46: 'Profile on the left; security and appearance on the right',
  }),
]
