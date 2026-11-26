import { BACK_COVER, FRONT_COVER, INSIDE_BACK, INSIDE_FRONT, pageNumberOf } from '../../config/book'

function leafName(leaf) {
  if (leaf === INSIDE_FRONT) return 'Inside cover'
  if (leaf === INSIDE_BACK) return 'Inside back cover'
  return `Page ${pageNumberOf(leaf)}`
}

/** Human label for what is currently visible, e.g. "Pages 2–3". */
export default function spreadLabel(leaf, portrait) {
  if (leaf === FRONT_COVER) return 'Front cover'
  if (leaf >= BACK_COVER) return 'Back cover'
  if (portrait) return leafName(leaf)

  // In a spread the left leaf always has an odd index.
  const left = leaf % 2 === 1 ? leaf : leaf - 1
  const right = left + 1
  if (left === INSIDE_FRONT) return leafName(right)
  if (right === INSIDE_BACK) return leafName(left)
  return `Pages ${pageNumberOf(left)}–${pageNumberOf(right)}`
}
