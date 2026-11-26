import { PAGE_ASPECT } from '../../../config/book'

// Front-cover layout. Units are % of the page width (1 unit = 1cqw), so the
// SVG puzzle and the HTML title line up exactly.

export const COVER_W = 100
export const COVER_H = COVER_W / PAGE_ASPECT // ≈ 142.86

/** Size of one (square) puzzle cell. */
export const CELL = 22

/** Top of the highest missing piece; the title sits in the clear area above it. */
const FIRST_HOLE_Y = 63

// Four full columns sit inside the page (x 6 → 94); the grid overhangs both
// edges by one cell so the lines run off the page like a real puzzle.
const X0 = 6 - CELL
const COLS = 6
// Row boundaries at y = -3, 19, 41, 63, 85, 107, 129, ...
const Y0 = FIRST_HOLE_Y - 3 * CELL
const ROWS = Math.ceil((COVER_H - Y0) / CELL)

export const grid = { x0: X0, y0: Y0, cell: CELL, cols: COLS, rows: ROWS }

/** Top of the title block. */
export const TITLE_TOP = 15

/**
 * Missing pieces. Order matches the `authors` display order
 * (Vhugala, Boitumelo, Asanda, Hlulani, Nyiko).
 *
 *            col 1     col 2     col 3     col 4
 *   row 3              Vhugala
 *   row 4    Nyiko                         Hlulani
 *   row 5              Asanda    Boitumelo
 *
 * Asanda touches Nyiko's bottom-right corner, Boitumelo touches Hlulani's
 * bottom-left corner, and the two interlock side by side.
 *
 * `sockets` turns a side inward so no knob pokes off the page edge or into
 * the title.
 */
export const holeCells = [
  // Vhugala — under the credit line (top knob clears it); bottom knob so her mouth shows
  { col: 2, row: 3, knobs: ['bottom'] },
  { col: 3, row: 5 }, // Boitumelo
  { col: 2, row: 5 }, // Asanda
  { col: 4, row: 4, sockets: ['right'], knobs: ['left'] }, // Hlulani — page edge on the right
  { col: 1, row: 4, knobs: ['left'] }, // Nyiko — left knob reaches right up to the page edge
]
