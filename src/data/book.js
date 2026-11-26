import { authors, fullName } from './authors'

export const bookTitle = {
  main: 'UNIFY TECH',
  sub: 'THE DEVELOPERS HANDBOOK',
}

/** Order the names are credited in on the cover (differs from photo order). */
const creditOrder = [
  'vhugala-mathivha',
  'boitumelo-magashula',
  'hlulani-ndlovu',
  'asanda-thabethe',
  'nyiko-tsonani',
]

function joinNames(names) {
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} & ${names.at(-1)}` : names[0]
}

export const authorCredit = `Written by ${joinNames(
  creditOrder.map((id) => fullName(authors.find((a) => a.id === id))),
)}`

export const backCoverHeading = 'KEY TAKEAWAYS FROM AUTHORS'
