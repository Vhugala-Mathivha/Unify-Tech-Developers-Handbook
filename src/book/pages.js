// The ordered list of printed pages between the inside covers.
//
// Page 1 is a right-hand page (it faces the inside front cover), so odd
// pages sit on the right and even pages on the left, like a real book.
//
// To add a chapter page later: push it here and set the matching TOC entry's
// `pageId` in src/data/contents.js — page numbers update automatically.
import { tocCategories } from '../data/contents'

/**
 * How many "rows" fit on one contents page. An entry is 1 row, a group
 * heading counts as ~1.6 rows (it has extra space above it).
 */
const TOC_ROWS_PER_PAGE = 22
const GROUP_HEADING_ROWS = 1.6

/** Split a category's groups across as many contents pages as needed. */
function paginateCategory(category) {
  const pages = []
  let groups = []
  let rows = 0

  const newPage = () => {
    if (groups.length) pages.push(groups)
    groups = []
    rows = 0
  }

  for (const group of category.groups) {
    let chunk = null
    for (const entry of group.entries) {
      const cost = (chunk ? 0 : GROUP_HEADING_ROWS) + 1
      if (rows + cost > TOC_ROWS_PER_PAGE) {
        newPage()
        chunk = null
      }
      if (!chunk) {
        // a group that continues onto a new page repeats its heading
        chunk = { title: group.title, continued: entry !== group.entries[0], entries: [] }
        groups.push(chunk)
        rows += GROUP_HEADING_ROWS
      }
      chunk.entries.push(entry)
      rows += 1
    }
  }
  newPage()
  return pages
}

function buildPages() {
  /** @type {{ key: string, type: string, [k: string]: any }[]} */
  const pages = [
    { key: 'dedication', type: 'dedication' },
    { key: 'dedication-verso', type: 'blank' }, // back of the dedication stays blank
    { key: 'contents', type: 'contents' },
  ]

  for (const category of tocCategories) {
    const chunks = paginateCategory(category)
    chunks.forEach((groups, i) =>
      pages.push({
        key: `toc-${category.id}-${i + 1}`,
        type: 'toc',
        category,
        groups,
        continued: i > 0,
      }),
    )
  }

  // the leaf count must be even, so pad with a blank page if needed
  if (pages.length % 2) pages.push({ key: 'end-blank', type: 'blank' })

  pages.forEach((page, i) => {
    page.number = i + 1
  })
  return pages
}

export const bookPages = buildPages()

const numberByKey = Object.fromEntries(bookPages.map((p) => [p.key, p.number]))

/** Printed page number for a page key, or null if that page doesn't exist yet. */
export const pageNumberFor = (key) => numberByKey[key] ?? null

/** First contents page of each category, by category id. */
export const categoryStartPage = Object.fromEntries(
  tocCategories.map((c) => [c.id, pageNumberFor(`toc-${c.id}-1`)]),
)
