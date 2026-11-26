import vhugala from '../assets/authors/cropped/vhugala-mathivha.jpg'
import boitumelo from '../assets/authors/cropped/boitumelo-magashula.jpg'
import asanda from '../assets/authors/cropped/asanda-thabethe.jpg'
import hlulani from '../assets/authors/cropped/hlulani-ndlovu.jpg'
import nyiko from '../assets/authors/cropped/nyiko-tsonani.jpg'

/**
 * @typedef {Object} Author
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} role
 * @property {string} photo     bundled URL of the cropped 3:4 portrait
 * @property {string} takeaway  2–3 sentences shown on the back cover
 */

/**
 * Display order on both covers. The front cover shows the first three on
 * row one and the remaining two on row two.
 * @type {Author[]}
 */
export const authors = [
  {
    id: 'vhugala-mathivha',
    firstName: 'Vhugala',
    lastName: 'Mathivha',
    role: 'Full Stack Developer',
    photo: vhugala,
    // TODO: replace demo takeaway with the author's own words
    takeaway:
      'Good architecture is the quiet decisions nobody notices until they are missing. ARMS taught me to design for the next developer, not just for today’s feature.',
  },
  {
    id: 'boitumelo-magashula',
    firstName: 'Boitumelo',
    lastName: 'Magashula',
    role: 'UI/UX & Frontend Developer',
    photo: boitumelo,
    takeaway:
      'Design is how it works, not just how it looks. Every ARMS screen started as a question about who would use it and what they needed in that moment.',
  },
  {
    id: 'asanda-thabethe',
    firstName: 'Asanda',
    lastName: 'Thabethe',
    role: 'Frontend Developer',
    photo: asanda,
    takeaway:
      'Reusable components pay for themselves many times over. Build it once, build it well, and the whole team moves faster.',
  },
  {
    id: 'hlulani-ndlovu',
    firstName: 'Hlulani',
    lastName: 'Ndlovu',
    role: 'Frontend Developer',
    photo: hlulani,
    takeaway:
      'Small, reviewed pull requests beat big heroic merges every time. Code review is where most of our learning actually happened.',
  },
  {
    id: 'nyiko-tsonani',
    firstName: 'Nyiko',
    lastName: 'Tsonani',
    role: 'Backend Developer',
    photo: nyiko,
    takeaway:
      'Clean, consistent APIs let the frontend and backend move in parallel. Agree on the contract early and protect it.',
  },
]

export const fullName = (a) => `${a.firstName} ${a.lastName}`
