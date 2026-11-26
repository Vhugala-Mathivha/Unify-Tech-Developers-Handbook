// Code shown on the 02 · Frontend · Lecturer and Student chapters (ARMS.Frontend).
const f = (id, file, from, to, notes, extra = {}) => ({ id, repo: 'frontend', file, from, to, ...(notes ? { notes } : {}), ...extra })
const V = 'src/features/venues'

export const SNIPPETS = [
  // ======================= Lecturer =======================
  f('lc-nav', 'src/pages/lecturer/lecturerNavItems.js', 40, 52, {
    41: 'The lecturer sidebar, top to bottom (see Sidebar navigation)',
  }),
  f('lc-dash-page', 'src/pages/lecturer/LecturerDashboard.jsx', 36, 50, {
    40: 'plainBackground: no patterned background behind the dashboard cards',
    44: "Picks the welcome card's department photo",
  }),
  f('lc-dash-stats', 'src/features/lecturer-dashboard/hooks/useLecturerDashboardStats.js', 115, 146, {
    117: 'Timetable + this year’s and next year’s calendar events, in parallel',
    129: 'Distinct venues and groups across the week',
    132: 'One bar per weekday for the Weekly Teaching Load chart',
  }),
  f('lc-next-class', 'src/features/lecturer-dashboard/hooks/useLecturerDashboardStats.js', 72, 96, {
    82: 'Days until that weekday; a class earlier today counts as next week',
    85: 'The smallest wait wins',
  }),
  f('lc-week-chart', 'src/components/dashboard/WeeklyScheduleChart.jsx', 89, 118, {
    91: "Today's bar is highlighted; every other day is grey",
    98: 'recharts: ResponsiveContainer fills the card',
    110: 'One Cell per bar so each can have its own colour',
  }),
  f('lc-next-class-card', 'src/features/lecturer-dashboard/components/NextClassCard.jsx', 20, 59, {
    21: 'No upcoming class: a quiet grey card instead of nothing',
    41: 'A photo behind the card, darkened so the white text stays readable',
  }),
  f('lc-tt-page', 'src/pages/lecturer/LecturerTimetable.jsx', 30, 55, {
    32: 'One hook holds the entries, view, layout, colours and download',
    40: 'A skeleton grid while the timetable loads',
  }),
  f('lc-tt-hook-load', 'src/features/timetable/hooks/useTimetable.js', 87, 127, {
    88: 'Wait until we know who the user is',
    105: 'Each module gets a default colour, in the order it first appears',
    115: 'The template slot code (e.g. H1) when the backend has none',
  }),
  f('lc-tt-colours', 'src/features/timetable/hooks/useTimetable.js', 129, 171, {
    132: 'Each user’s module colours are saved in localStorage under their email',
    146: 'A module has two colours: background, and border + text',
    168: 'Daily view shows today, or Monday at the weekend',
  }),
  f('lc-tt-clash-lanes', 'src/features/timetable/components/TimetableTable.jsx', 93, 143, {
    93: 'Overlapping classes on one day are drawn side by side in lanes',
    120: 'Back-to-back classes do not count as a clash',
    128: 'Each class takes the first lane free when it starts',
  }),
  f('lc-colour-picker', 'src/features/timetable/components/ColourPicker.jsx', 64, 97, {
    65: 'One drag helper for the colour square and the hue slider',
    79: 'Pointer capture keeps the drag going outside the square',
    96: 'Left–right is saturation, up–down is brightness',
  }),
  f('lc-find-page', 'src/pages/lecturer/LecturerFindTimetable.jsx', 14, 23, {
    20: 'No allowVenues: lecturers search class groups only, and download one group',
  }),
  f('lc-groups-page', 'src/pages/lecturer/LecturerGroups.jsx', 38, 89, {
    48: 'Totals shown as chips in the title card',
    63: 'Skeleton cards keep the grid’s shape while loading',
    72: 'Different empty messages for “no results” and “nothing yet”',
  }),
  f('lc-groups-hook', 'src/features/groups/hooks/useLecturerGroups.js', 34, 77, {
    62: 'Search runs in the browser on module name or code',
  }),
  f('lc-groups-service', 'src/services/groupService.js', 75, 105, {
    76: 'Groups are worked out from the lecturer’s own timetable',
    79: 'One card per module, collecting its groups and sessions',
  }),
  f('lc-roster', 'src/features/groups/components/GroupRosterDialog.jsx', 46, 80, {
    49: 'Search filters students in every group and hides empty groups',
  }),
  f('lc-cal-page', 'src/pages/lecturer/LecturerCalendar.jsx', 28, 38, {
    30: 'The same calendar component and hook as the admin and student pages',
  }),
  f('lc-cal-hook', 'src/features/calendar/hooks/useAcademicCalendar.js', 87, 117, {
    89: 'Download range follows the view until the user picks one',
    91: 'Changes when a new calendar is uploaded, so the events reload',
  }),
  f('lc-mybookings-switch', `${V}/views/MyBookingsView.jsx`, 120, 139, {
    123: 'A regular student always gets the Open Lab/Class page',
    136: 'Only lecturers, tutors and mentors can book',
    139: '?view=book shows Book a Class/Lab inside My Bookings',
  }),
  f('lc-mybookings-list', `${V}/views/MyBookingsView.jsx`, 34, 61, {
    40: '?id= opens a booking (e.g. from a notification)',
    49: 'The URL always points at the open booking, so a reload keeps it open',
  }),
  f('lc-booking-hooks', `${V}/booking/hooks/useBookingData.js`, 41, 79, {
    52: 'After booking, cancelling or rescheduling: refresh bookings, venues and the bell',
  }),
  f('lc-receipt', `${V}/booking/bookingReceipt.js`, 10, 38, {
    11: 'The details card and the PDF receipt use the same rows',
    31: 'A one-table PDF built in the browser (lib/export)',
  }),
  f('lc-book-view', `${V}/views/BookVenueView.jsx`, 42, 97, {
    56: 'The date comes from the URL, never earlier than today',
    58: '?reschedule= moves an existing booking instead of making a new one',
    88: 'Search, building, type and equipment filters, all in the browser',
  }),
  f('lc-book-choose', `${V}/booking/components/VenueDayPanel.jsx`, 228, 260, {
    242: 'First click selects a period',
    250: 'Clicking a chosen period unselects it',
    257: 'Working-hours periods and after-hours slots cannot be mixed in one booking',
  }),
  f('lc-book-submit', `${V}/booking/components/VenueDayPanel.jsx`, 303, 342, {
    307: 'Checked in the browser first; the backend checks everything again',
    320: 'Working-hours bookings wait for an admin; after-hours ones are confirmed at once',
  }),
  f('lc-lab-view', `${V}/views/LabAccessView.jsx`, 26, 84, {
    27: 'Needs your reply: an admin offered a different venue',
    42: 'Opens on Needs your reply when anything is waiting there',
    75: 'The new-request form is always beside the list',
  }),
  f('lc-lab-hooks', `${V}/access-requests/hooks/useAccessRequests.js`, 24, 62, {
    42: 'busyId: only the card being acted on shows a spinner',
    58: 'Decline the offered venue and reply to the admin',
  }),
  f('lc-not-page', 'src/pages/lecturer/LecturerNotifications.jsx', 34, 64, {
    36: 'Lecturer defaults: no fetchFn needed (the hook uses the lecturer feed)',
    60: 'Venue notifications link to My Bookings or Lab Access Requests',
  }),
  f('lc-sup-page', 'src/pages/lecturer/LecturerSupport.jsx', 31, 47, {
    36: 'One Support Centre for students and lecturers; the content is passed in',
  }),
  f('lc-sup-message', 'src/features/support/hooks/useSupportMessage.js', 58, 112, {
    70: 'The backend’s category list replaces the built-in one when it loads',
    87: 'Send is disabled until subject and message have text',
    104: 'The success panel shows the reference, e.g. SUP-012',
  }),
  f('lc-faq-search', 'src/features/support/components/FaqSection.jsx', 107, 116, {
    114: 'Every word typed must appear in the question or the answer',
  }),
  f('lc-highlight', 'src/features/support/components/Highlight.jsx', 22, 42, {
    22: 'Escaped first, so a search like "c++" cannot break the RegExp',
    33: 'split() with a capture group puts the matches at the odd positions',
  }),
  f('lc-settings', 'src/pages/lecturer/LecturerSettings.jsx', 36, 52),
  f('lc-pref-hook', 'src/features/settings/hooks/useNotificationPreferences.js', 34, 74, {
    63: 'Optimistic: the switch flips at once, then the change is saved',
  }),

  // ======================= Student =======================
  f('st-nav', 'src/pages/student/studentNavItems.js', 42, 55, {
    51: "Shown as 'Open Lab/Class' to a student who is not a tutor or mentor",
  }),
  f('st-dash-cards', 'src/features/student-dashboard/components/StudentDashboardCards.jsx', 51, 82, {
    61: "The department's photo on the welcome card",
    66: 'Each tile links to its page',
  }),
  f('st-dash-stats', 'src/features/student-dashboard/hooks/useStudentDashboardStats.js', 113, 143, {
    115: 'Five requests in parallel: timetable, tests, exams and two years of calendar events',
  }),
  f('st-welcome-bg', 'src/components/dashboard/welcomeBackgrounds.js', 52, 62),
  f('st-template', 'src/features/timetable/components/TimetableTemplate.jsx', 45, 68, {
    45: 'Template rows are half-hour periods from 08:00',
    48: 'Overlapping classes on a day share one block, listed one under the other',
  }),
  f('st-find-order', 'src/features/timetable/components/FindTimetable.jsx', 201, 206, {
    204: 'Pick a new course and the stream, year and group are cleared',
  }),
  f('st-tests-page', 'src/pages/student/StudentSemesterTests.jsx', 29, 41),
  f('st-tests-service', 'src/services/academicScheduleService.js', 63, 98, {
    68: 'Dev sign-in: demo tests',
    73: 'The same endpoint returns exams; they are left out here',
    82: 'One row per test: date, time, module, session, type, lecturer, venue',
  }),
  f('st-tests-card', 'src/features/student-academics/components/SemesterTestsCard.jsx', 36, 79, {
    55: 'The file is generated by the backend',
  }),
  f('st-exams-card', 'src/features/student-academics/components/ExaminationsCard.jsx', 15, 51, {
    22: 'A table-shaped skeleton while loading',
    37: 'Zebra rows: every second row is tinted',
  }),
  f('st-cal-page', 'src/pages/student/StudentCalendar.jsx', 30, 40),
  f('st-identity', 'src/services/venues/venueIdentity.js', 21, 60, {
    25: 'Tutor and mentor come from the backend’s is_tutor / is_mentor flags',
    57: "Shown under the name: 'Student', 'Student • Tutor' or 'Student • Mentor'",
  }),
  f('st-open-labs', `${V}/views/StudentBookingGuide.jsx`, 18, 40, {
    19: 'Sessions tutors, mentors and lecturers opened to every student',
  }),
  f('st-not-page', 'src/pages/student/StudentNotifications.jsx', 40, 52, {
    43: 'The student feed and its own mark-read functions',
  }),
  f('st-manual-page', 'src/pages/student/StudentSupportManual.jsx', 26, 37, {
    33: '#contact scrolls to the contact form and focuses Subject',
  }),
]
