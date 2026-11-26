// 02 · Frontend Development · Shared screens (used by every role)
import landing from '../../../assets/screens/landing.webp'
import loginLight from '../../../assets/screens/login-light.webp'
import { screen } from './screens'

const base = { category: 'frontend', group: 'Shared screens' }

export const sharedScreenChapters = [
  {
    ...base,
    id: 'fe-landing',
    title: 'Landing page',
    spreads: [
      {
        heading: 'Header, theme toggle and hero carousel',
        intro: [
          'HomePage.jsx is the public front door at /. A sticky header holds the TUT logo, links that scroll to sections of the same page, a light/dark toggle and the Sign in button.',
          'Below it a full-width hero shows four campus photos that change every four seconds. Dots let visitors jump to a photo.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['Header', 'logo · Home · About · FAQs · Terms · Privacy · theme · Sign in'],
            ['Hero', 'rotating campus photos + title and tagline'],
            ['Features', '“Designed for Campus Coordination” cards'],
            ['FAQ · About · Terms · Privacy', 'sections the header links scroll to'],
          ],
        },
        points: [
          'On small screens the links collapse into a hamburger menu.',
          'Only the first hero image loads at high priority, so the page appears quickly.',
        ],
        screen: { src: landing, alt: 'ARMS landing page with header and hero photo', caption: 'The landing page: header, hero carousel and the first section.' },
        snippets: ['fe-home-state', 'fe-home-carousel', 'fe-home-header'],
      },
      {
        heading: 'Hero slides and the FAQ accordion',
        intro: [
          'Every hero image is rendered at once; CSS fades in the one with the active class. That keeps the switch smooth and lets the browser keep the images in memory.',
          'The FAQ section is an accordion: one question is open at a time, and each button tells assistive technology which answer it controls.',
        ],
        points: ['Sections use ScrollReveal, which fades content in as it scrolls into view (and not at all with reduced motion).'],
        snippets: ['fe-home-hero', 'fe-home-faq'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-sign-in',
    title: 'Sign in',
    intro: [
      'Signing in has two steps: email and password first, then a one-time code sent by email. The sign-in page only does step one; on success it moves to /otp.',
      'The page, the form, the hook and the service each have one job. LoginForm collects input, LoginPage decides where to go, useAuth tracks loading and errors, and authService makes the request.',
    ],
    visual: {
      type: 'steps',
      items: [
        ['LoginForm', 'email + password, show/hide password'],
        ['useAuth().login()', 'loading + error state; saves the pending email'],
        ['authService.login()', 'POST to the sign-in endpoint; the code is emailed'],
        ['navigate(/otp)', 'continue with the code'],
      ],
    },
    points: [
      '“Forgot Password?” opens the TUT4Life reset page; ARMS does not manage passwords.',
      'One endpoint serves every role; the role comes back with the session after the OTP.',
    ],
    screen: { src: loginLight, alt: 'ARMS sign-in card with email and password fields', caption: 'Sign in: the TUT card in the middle, campus photo behind it.' },
    snippets: ['fe-login-submit', 'fe-login-card', 'fe-login-form', 'fe-use-auth-login', 'fe-auth-login'],
  },
  {
    ...base,
    id: 'fe-otp',
    title: 'OTP verification',
    spreads: [
      {
        heading: 'Six boxes that behave like one field',
        intro: [
          'The OTP page shows six single-character boxes. Typing moves to the next box, Backspace moves back, and you cannot skip an empty box.',
          'Pasting a whole code fills the boxes from the one you pasted into and verifies straight away. A typed code waits for Verify OTP or Enter.',
        ],
        points: [
          'A countdown shows how long the code is valid; Resend unlocks after 60 seconds.',
          'The email waiting for its code comes from the auth store, which survives a refresh.',
        ],
        screen: screen('otp', 'OTP verification card with six code boxes and a Verify OTP button', 'Verify Code: six boxes, the resend link and the expiry timer.'),
        snippets: ['fe-otp-change', 'fe-otp-paste'],
      },
      {
        heading: 'Verifying and starting the session',
        intro: [
          'handleVerifyOtp sends the email and code to the backend. On success the service saves the token and the user in sessionStorage and the page opens the dashboard for the user’s role.',
          'verifyOtp also shapes the user once for the whole app: a display name like “S Mokoena”, a normalised role, and the user’s faculty and department for the top bar and welcome card.',
        ],
        visual: {
          type: 'steps',
          items: [
            ['verifyOtp(email, code)', 'backend returns { token, user }'],
            ['Shape the user', 'name, role key, faculty, department'],
            ['Save the session', 'sessionStorage: arms_token, arms_user'],
            ['Go to the dashboard', 'student / lecturer / system-admin'],
          ],
        },
        snippets: ['fe-otp-verify', 'fe-verify-service', 'fe-otp-resend'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-dashboard-layout',
    title: 'Dashboard layout',
    intro: [
      'Every signed-in page is wrapped in DashboardLayout. It builds the screen from the component library’s AppShell: the ARMS sidebar on the left, the top bar across the top and the page content below.',
      'The layout decides how the sidebar behaves on each screen size, and remembers whether the user collapsed it.',
    ],
    visual: {
      type: 'table',
      head: ['Screen width', 'Sidebar'],
      rows: [
        ['under 640px (phone)', 'hidden; opens as a full drawer'],
        ['640–1023px (tablet)', 'always the icon rail'],
        ['1024px and up', 'expanded or collapsed: the user’s choice'],
      ],
      code: [],
    },
    points: ['A role page passes navItems, contextLabel (the faculty) and roleLabel; nothing else is needed.'],
    screen: screen('admin-dashboard', 'System Admin dashboard showing the sidebar, top bar and content area', 'The shell: sidebar, top bar, and the page content at 95% width.'),
    snippets: ['fe-layout-props', 'fe-layout-collapse', 'fe-layout-shell', 'fe-layout-content'],
  },
  {
    ...base,
    id: 'fe-sidebar',
    title: 'Sidebar navigation',
    spreads: [
      {
        heading: 'From a list of links to headed sections',
        intro: [
          'Each role has a nav-items file: a flat list of links, each with a section, label, route and lucide icon. DashboardLayout groups them into headed sections (Overview, Scheduling, Venue Booking, Account…) in the order they appear.',
          'NavSidebar draws the sections and highlights the current page. If two links match the URL, the longer path wins.',
        ],
        points: [
          'Booking Requests shows a live count of requests waiting, from the same cache as its page.',
          'A regular student’s “My Bookings” link is renamed “Open Lab/Class”.',
        ],
        screen: screen('admin-dashboard', 'Expanded System Admin sidebar with section headings and icons', 'The admin sidebar: sections, icons, the Booking Requests badge and Sign Out.'),
        snippets: ['fe-sidebar-items', 'fe-layout-sections', 'fe-sidebar-active', 'fe-sidebar-rows', 'fe-nav-counts'],
      },
      {
        heading: 'Collapsing, tooltips and More Apps',
        intro: [
          'The round button on the sidebar’s edge collapses it to an icon rail. Labels stay mounted and are only hidden, so collapsing animates smoothly. Hovering or focusing an icon then shows a speech-bubble label.',
          'Students and lecturers also get an Applications section. “More Apps” opens a list of the other TUT systems; the Clocking System is not live yet, so it shows a “Coming soon” dialog.',
        ],
        points: ['The tooltip is rendered in a portal so the sidebar’s overflow cannot clip it.'],
        screen: screen('admin-sidebar-collapsed', 'Collapsed sidebar showing only icons', 'Collapsed: an icon rail with the crest at the top.'),
        snippets: ['fe-sidebar-tip', 'fe-sidebar-tip-portal', 'fe-sidebar-apps', 'fe-systems'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-topbar',
    title: 'Top bar & page titles',
    spreads: [
      {
        heading: 'Notification bell',
        intro: [
          'The top bar shows the user’s faculty (or “System Administration” for admins) on the left, and the notification bell and profile menu on the right.',
          'The bell shows the unread count and opens a popover of unread notifications. Clicking one opens its details in a popup without leaving the page. Each role reads its own feed.',
        ],
        points: ['The admin feed merges support, uploads, access requests and venue bookings.'],
        screen: screen('admin-bell', 'Notification bell popover listing unread notifications', 'The bell popover on the admin dashboard.'),
        snippets: ['fe-topbar-title', 'fe-bell-feeds', 'fe-bell', 'fe-bell-detail'],
      },
      {
        heading: 'Profile menu and page title cards',
        intro: [
          'The profile button shows the user’s initials, name and role. Its menu has View settings, a Dark mode switch and Sign Out (which asks for confirmation).',
          'Every page except the dashboards starts with a PageTitleCard: an optional icon, the title, a description, optional breadcrumbs and action buttons on the right.',
        ],
        screen: screen('admin-profile-menu', 'Profile menu with View settings, Dark mode switch and Sign Out', 'Profile menu: settings, dark mode and sign out.'),
        snippets: ['fe-profile-menu', 'fe-page-title-card'],
      },
    ],
  },
  {
    ...base,
    id: 'fe-theme-switching',
    title: 'Theme switching',
    intro: [
      'The theme can change in three places: the landing page toggle, the profile menu switch and Settings › Appearance. All three call setTheme from ThemeContext.',
      'The choice is saved per scope (public, student, lecturer, system-admin), so each role keeps its own theme. “Match my device” follows the operating system and updates live when it changes.',
    ],
    points: ['How the colours themselves change is covered in UI/UX › Light & dark mode.'],
    related: ['ui-light-dark', 'fe-landing'],
    screen: screen('admin-settings-dark', 'Settings page in dark mode with the Dark tile selected', 'Settings › Appearance with Dark selected.'),
    snippets: ['fe-theme-context', 'fe-theme-scope', 'fe-appearance-hook', 'fe-appearance-tiles'],
  },
]
