// 02 · Frontend Development · Lecturer (in sidebar order)
import { screen } from './screens'

const base = { category: 'frontend', group: 'Lecturer' }

export const lecturerChapters = [
  {
    ...base,
    id: 'fe-lec-dashboard',
    title: 'Dashboard',
    spreads: [
      {
        heading: 'A teaching day at a glance',
        intro: [
          'The lecturer’s sidebar has four sections: Overview, Teaching, Academic Venues and Account. The dashboard is the first page after sign-in.',
          'A welcome card with the lecturer’s department photo shows Classes Today, Total Groups and Venues. Below it are the Weekly Teaching Load chart, a calendar with upcoming events, and the Next Class card.',
        ],
        points: ['Every number is worked out in the browser from the timetable; there is no separate dashboard endpoint.'],
        screen: screen('lecturer-dashboard', 'Lecturer dashboard with welcome card, weekly teaching load, calendar and next class', 'The lecturer dashboard.'),
        snippets: ['lc-nav', 'lc-dash-page', 'lc-dash-stats'],
      },
      {
        heading: 'Weekly chart and Next Class',
        intro: [
          'WeeklyScheduleChart is shared with the student dashboard: a recharts bar chart of Monday to Friday, with today’s bar, count and label in the brand colour.',
          'The Next Class card finds the soonest class still to come this week and counts down to it (“Starts in 1 hr 20 min”). With no classes it becomes a quiet grey card.',
        ],
        snippets: ['lc-next-class', 'lc-week-chart', 'lc-next-class-card'],
        related: ['fe-stu-dashboard'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-lec-timetable',
    title: 'My Timetable',
    spreads: [
      {
        heading: 'The weekly grid',
        intro: [
          'My Timetable shows the lecturer’s classes in a time × Monday–Friday grid. Each block shows the module and the groups attending; students see the lecturer instead.',
          'The toolbar switches Weekly / Daily, Standard / Template layout, opens Customize Modules and downloads the timetable (built by the backend) as PDF, Word or Excel.',
        ],
        points: ['Clashing classes are drawn side by side in lanes instead of on top of each other.'],
        screen: screen('lecturer-timetable', 'Lecturer My Timetable weekly grid', 'My Timetable, weekly view.'),
        snippets: ['lc-tt-page', 'lc-tt-hook-load', 'lc-tt-clash-lanes'],
      },
      {
        heading: 'Customize Modules: colours that stay',
        intro: [
          'Customize Modules lists the lecturer’s modules. Opening one shows a preview of its next class and a colour picker for its background, or its border and text.',
          'The picker is built by hand: a saturation/brightness square, a hue slider and a palette. It works with mouse, touch, pen and arrow keys. Colours are saved per user in localStorage.',
        ],
        screen: screen('lecturer-timetable-colours', 'Customize Modules popup with a colour square and palette', 'Customize Modules with the colour picker open.'),
        snippets: ['lc-tt-colours', 'lc-colour-picker'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-lec-find',
    title: 'Find a Timetable',
    intro: [
      'Lecturers use the same Find a Timetable component as admins, without the venue search. They pick faculty, course, stream, year and group to see any group’s class timetable, and can download that one group.',
    ],
    related: ['fe-admin-find'],
    screen: screen('lecturer-find', 'Find a Timetable for lecturers with the class choices', 'Find a Timetable (class groups only).'),
    snippets: ['lc-find-page'],
  },
  {
    ...base,
    id: 'fe-lec-groups',
    title: 'My Groups',
    intro: [
      'My Groups shows one card per module the lecturer teaches: its class groups, when and where each session runs, and how many students there are. The student count opens a roster with a search box.',
      'The groups are worked out from the lecturer’s timetable, with the rosters from the backend. A search box filters the cards by module name or code.',
    ],
    points: ['Skeleton cards show while loading; an empty state explains when nothing matches.'],
    screen: screen('lecturer-groups', 'My Groups page with a module card and its sessions', 'My Groups: a card per module.'),
    snippets: ['lc-groups-page', 'lc-groups-hook', 'lc-groups-service', 'lc-roster'],
  },
  {
    ...base,
    id: 'fe-lec-calendar',
    title: 'Core Calendar',
    intro: [
      'Lecturers see the same Core Calendar as everyone else: month or year view, the colour legend, a dialog per day and downloads.',
      'useAcademicCalendar keeps the view state and loads the events for the years in view. Month view also loads the neighbouring years, because December’s grid runs into January.',
    ],
    related: ['fe-admin-calendar'],
    screen: screen('lecturer-calendar', 'Core Calendar month view for a lecturer', 'The Core Calendar.'),
    snippets: ['lc-cal-page', 'lc-cal-hook'],
  },
  {
    ...base,
    id: 'fe-lec-bookings',
    title: 'My Bookings',
    spreads: [
      {
        heading: 'Upcoming, past and cancelled bookings',
        intro: [
          'My Bookings lists the lecturer’s class and lab bookings in three tabs. Selecting one shows its details beside the list, with Reschedule, Cancel and a PDF receipt.',
          'The same page decides who may book at all: lecturers, tutors and mentors get bookings; a regular student gets the Open Lab/Class guide instead.',
        ],
        points: ['Booking rules (how many, how far ahead, cancel cut-offs) are shown under the list.'],
        screen: screen('lecturer-bookings', 'My Bookings with the upcoming list and booking details', 'My Bookings: list and details.'),
        snippets: ['lc-mybookings-switch', 'lc-mybookings-list', 'lc-booking-hooks', 'lc-receipt'],
      },
      {
        heading: 'Book a Class/Lab',
        intro: [
          'Book a Class/Lab lists the venues the lecturer may use, with search and filters. Picking one shows its periods for the day or week: Free, Yours, Lecture, Booked, Unavailable or Past.',
          'Working-hours periods (08:00–16:59) are requests an admin approves; after-hours slots (17:00–07:59) are confirmed at once. Up to two periods side by side can be booked together.',
        ],
        screen: screen('lecturer-book', 'Book a Class/Lab with the venue list', 'Book a Class/Lab: pick a venue, then its periods.'),
        snippets: ['lc-book-view', 'lc-book-choose', 'lc-book-submit'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-lec-lab-access',
    title: 'Lab Access Requests',
    intro: [
      'Lecturers ask here for their module’s students to be able to book specific classes and labs. The request covers every enrolled student (plus tutors) or only the students picked.',
      'Requests sit in four tabs: Needs your reply (the admin offered another venue), Pending, Approved and Closed. The new-request form is always beside the list.',
    ],
    points: ['The admin’s side of this is Class/Lab Access.'],
    related: ['fe-admin-access'],
    screen: screen('lecturer-lab-access', 'Lab Access Requests with a request needing a reply and the new request form', 'Lab Access Requests: an offered venue waiting for a reply.'),
    snippets: ['lc-lab-view', 'lc-lab-hooks'],
  },
  {
    ...base,
    id: 'fe-lec-notifications',
    title: 'Notifications',
    intro: [
      'The lecturer’s Notifications page uses the shared useNotifications hook with the lecturer feed. Tabs filter by category (Academic, Administrative, Calendar Events, Academic Venues), each with its unread count.',
      'Rows are grouped Today / This Week / Earlier. Venue notifications get a link straight to the booking or request.',
    ],
    related: ['fe-admin-notifications'],
    screen: screen('lecturer-notifications', 'Lecturer notifications grouped by date with category tabs', 'Lecturer notifications.'),
    snippets: ['lc-not-page'],
  },
  {
    ...base,
    id: 'fe-lec-support',
    title: 'Support',
    spreads: [
      {
        heading: 'Support Centre and the contact form',
        intro: [
          'The Support Centre is shared by lecturers and students. It has a help search over the role’s FAQs and manual, Quick Help tiles, popular questions and a “Send us a message” form.',
          'Sending a message creates a support ticket for the admins. The success panel shows its reference (SUP-012); the admin’s reply arrives as a notification and by email.',
        ],
        screen: screen('lecturer-support', 'Support Centre with help search, quick help and the contact form', 'The Support Centre.'),
        snippets: ['lc-sup-page', 'lc-sup-message'],
      },
      {
        heading: 'FAQs with highlighted search',
        intro: [
          'The FAQ page lists questions by topic in an accordion. Typing in the search keeps only questions containing every word, and highlights the words that matched.',
        ],
        screen: screen('lecturer-faq', 'Lecturer FAQs page with topic chips and accordion', 'FAQs: topics, search and answers.'),
        snippets: ['lc-faq-search', 'lc-highlight'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-lec-settings',
    title: 'Settings',
    intro: [
      'Lecturer Settings shows the same three cards as the admin’s: profile, Account & Security and Appearance.',
      'A NotificationPreferencesCard and its hook exist in features/settings (switches per notification category), but this page does not render it at the moment. Saved preferences are still respected by the notification feeds.',
    ],
    related: ['fe-admin-settings', 'fe-theme-switching'],
    screen: screen('lecturer-settings', 'Lecturer Settings page', 'Lecturer Settings.'),
    snippets: ['lc-settings', 'lc-pref-hook'],
  },
]
