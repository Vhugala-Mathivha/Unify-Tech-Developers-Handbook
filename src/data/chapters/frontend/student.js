// 02 · Frontend Development · Student (in sidebar order)
import { screen } from './screens'

const base = { category: 'frontend', group: 'Student' }

export const studentChapters = [
  {
    ...base,
    id: 'fe-stu-dashboard',
    title: 'Dashboard',
    intro: [
      'The student’s sidebar has Overview, Academics, Academic Venues and Account. The dashboard’s welcome card shows Today’s Classes, Semester Tests and Upcoming Exams over a photo of the student’s department.',
      'Below it: the Weekly Schedule chart, the calendar with upcoming events, and the Next Class card with the lecturer’s name and a countdown.',
    ],
    points: ['The department photo is chosen by matching the department’s name (Computer Science, Informatics…); others get the TUT campus sign.'],
    related: ['fe-lec-dashboard'],
    screen: screen('student-dashboard', 'Student dashboard with welcome card, weekly schedule, calendar and next class', 'The student dashboard.'),
    snippets: ['st-nav', 'st-dash-cards', 'st-dash-stats', 'st-welcome-bg'],
  },
  {
    ...base,
    id: 'fe-stu-timetable',
    title: 'My Timetable',
    intro: [
      'Students use the same timetable feature as lecturers; each class shows the lecturer instead of the groups. Daily view shows only today.',
      'The Template layout draws the timetable like the Faculty of ICT’s template: 18 half-hour periods from 08:00 to 17:00, with Subject and Venue columns per day.',
    ],
    related: ['fe-lec-timetable'],
    screen: screen('student-timetable', 'Student My Timetable weekly grid with coloured modules', 'My Timetable, weekly view.'),
    snippets: ['st-template'],
  },
  {
    ...base,
    id: 'fe-stu-find',
    title: 'Find a Timetable',
    intro: [
      'Students can look up any group’s class timetable, for example a friend’s or a group they might move to. It is the same component as the lecturer’s; picking an earlier choice clears the later ones.',
    ],
    related: ['fe-admin-find'],
    screen: screen('student-find', 'Find a Timetable for students', 'Find a Timetable.'),
    snippets: ['st-find-order'],
  },
  {
    ...base,
    id: 'fe-stu-tests',
    title: 'Semester Tests',
    intro: [
      'Semester Tests lists the student’s tests: date, time, module, session, session type, lecturer and venue. The Download menu asks the backend for a PDF, Word or Excel file.',
      'The service reads the test timetable endpoint, drops exams (they belong to Examinations) and looks up module codes and lecturer names in parallel.',
    ],
    screen: screen('student-tests', 'Semester Tests table with a Download button', 'Semester Tests.'),
    snippets: ['st-tests-page', 'st-tests-service', 'st-tests-card'],
  },
  {
    ...base,
    id: 'fe-stu-exams',
    title: 'Examinations',
    intro: [
      'Examinations lists the exams still to be written: module, date, start and end time. It reads the same endpoint as Semester Tests and keeps only the exams.',
    ],
    screen: screen('student-exams', 'Examinations table', 'Examinations.'),
    snippets: ['st-exams-card'],
  },
  {
    ...base,
    id: 'fe-stu-calendar',
    title: 'Core Calendar',
    intro: [
      'The student’s Core Calendar is the shared calendar. Year view shows all twelve months at once with a year picker; the download covers the month or the year shown.',
    ],
    related: ['fe-admin-calendar'],
    screen: screen('student-calendar-year', 'Core Calendar in year view showing twelve months', 'Year view.'),
    snippets: ['st-cal-page'],
  },
  {
    ...base,
    id: 'fe-stu-bookings',
    title: 'My Bookings / Open Lab/Class',
    spreads: [
      {
        heading: 'Regular students: Open Lab/Class',
        intro: [
          'Regular students cannot book venues, so their sidebar link reads “Open Lab/Class”. The page explains who can book, how to get a class opened to study in, and lists open lab sessions any student can join.',
          'Whether a student is a tutor or mentor comes from the backend (is_tutor / is_mentor) and also changes the role under their name: “Student • Tutor”.',
        ],
        screen: screen('student-open-lab', 'Open Lab/Class guide for a regular student', 'Open Lab/Class for a regular student.'),
        snippets: ['st-identity', 'st-open-labs'],
      },
      {
        heading: 'Tutors and mentors: My Bookings',
        intro: [
          'A student who tutors or mentors gets the full My Bookings page, the same as a lecturer’s, and can book classes and labs within the student booking rules.',
        ],
        related: ['fe-lec-bookings'],
        screen: screen('tutor-bookings', 'My Bookings for a student tutor', 'My Bookings for a tutor (Student • Tutor).'),
        snippets: ['lc-mybookings-switch'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-stu-notifications',
    title: 'Notifications',
    intro: [
      'The student’s Notifications page is the shared feed with the student’s own fetch and mark-read functions: tabs per category, date groups and “Mark all as read”.',
    ],
    related: ['fe-admin-notifications'],
    screen: screen('student-notifications', 'Student notifications', 'Student notifications.'),
    snippets: ['st-not-page'],
  },
  {
    ...base,
    id: 'fe-stu-support',
    title: 'Support',
    intro: [
      'Students get the same Support Centre and FAQs as lecturers, with student questions. The Student Manual walks through every page with numbered steps and tips; its contents list highlights the section on screen.',
      'Each role’s manual is data in manuals.js, rendered by one ManualSection component.',
    ],
    related: ['fe-lec-support'],
    screen: screen('student-manual', 'Student Manual with contents list and quick start', 'The Student Manual.'),
    snippets: ['st-manual-page'],
  },
  {
    ...base,
    id: 'fe-stu-settings',
    title: 'Settings',
    intro: [
      'Student Settings matches the other roles: profile (with student number), Account & Security and Appearance. The theme chosen here applies to the student pages only.',
    ],
    related: ['fe-theme-switching'],
    screen: screen('student-settings', 'Student Settings page', 'Student Settings.'),
    snippets: ['lc-settings'],
  },
]
