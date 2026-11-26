// Physical layout of the book.
import { bookPages } from '../book/pages'

/** Printed pages between the inside covers (always even; see src/book/pages.js). */
export const CONTENT_PAGES = bookPages.length

/** Page width / page height. */
export const PAGE_ASPECT = 0.7

/** Duration of one page turn, in ms. */
export const FLIP_MS = 900

/** Largest page height on big screens, in px. */
export const MAX_PAGE_HEIGHT = 760

/**
 * Leaves in order: front cover, inside front cover, printed pages,
 * inside back cover, back cover. The total must be even so the back cover
 * ends up on its own when the book is closed.
 */
export const LEAF_COUNT = CONTENT_PAGES + 4
export const FRONT_COVER = 0
export const INSIDE_FRONT = 1
export const INSIDE_BACK = LEAF_COUNT - 2
export const BACK_COVER = LEAF_COUNT - 1

/** Leaf index -> printed page number (printed pages start at leaf 2). */
export const pageNumberOf = (leaf) => leaf - 1

/** Printed page number -> leaf index. */
export const leafOf = (pageNumber) => pageNumber + 1
