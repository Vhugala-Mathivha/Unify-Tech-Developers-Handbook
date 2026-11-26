// Jigsaw geometry: a grid of classic knob-and-socket puzzle edges.
//
// Edges are cubic-bezier runs stored as flat point lists
// [P0, C1, C2, P1, C1, C2, P2, ...] so they can be reversed and joined.

// One knob, in edge-local coords: t = along the edge (0..1),
// n = across it, as a fraction of the edge length.
const KNOB = [
  [0.34, 0], [0.40, 0.02], [0.38, 0.08], // run in to the neck
  [0.30, 0.18], [0.36, 0.27], [0.50, 0.27], // left half of the head
  [0.64, 0.27], [0.70, 0.18], [0.62, 0.08], // right half of the head
  [0.60, 0.02], [0.66, 0], [1, 0], // back out to the corner
]

/**
 * Points for one edge from A to B.
 * sign: +1 / -1 = knob on one side or the other, 0 = straight.
 * The knob points along the normal (-dy, dx): down for a left→right edge,
 * left for a top→bottom edge (when sign is +1).
 */
function edge(A, B, sign) {
  if (!sign) return [A, A, B, B]
  const dx = B[0] - A[0]
  const dy = B[1] - A[1]
  const at = ([t, n]) => [A[0] + t * dx - n * sign * dy, A[1] + t * dy + n * sign * dx]
  return [A, ...KNOB.map(at)]
}

const reverse = (points) => [...points].reverse()

const fmt = (n) => +n.toFixed(3)

function toPath(points, move = true) {
  let d = move ? `M${fmt(points[0][0])} ${fmt(points[0][1])}` : ''
  for (let i = 1; i < points.length; i += 3) {
    const [c1, c2, p] = [points[i], points[i + 1], points[i + 2]]
    d += `C${fmt(c1[0])} ${fmt(c1[1])} ${fmt(c2[0])} ${fmt(c2[1])} ${fmt(p[0])} ${fmt(p[1])}`
  }
  return d
}

// Small deterministic PRNG so the puzzle looks the same on every render.
function mulberry32(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Build a jigsaw grid.
 *
 * @param {object} o
 * @param {number} o.x0, o.y0   top-left of the grid
 * @param {number} o.cell       cell size (square pieces)
 * @param {number} o.cols, o.rows
 * @param {{col:number,row:number,sockets?:('top'|'left'|'right')[]}[]} [o.holes]
 *        cells that get "top knob out, bottom socket in" so nothing pokes down
 *        into the caption below; `sockets` forces side edges inward too
 * @param {number} [o.seed]
 */
export function createJigsaw({ x0, y0, cell, cols, rows, holes = [], seed = 7 }) {
  const rand = mulberry32(seed)
  const flip = () => (rand() < 0.5 ? -1 : 1)
  const corner = (c, r) => [x0 + c * cell, y0 + r * cell]

  // h[r][c]: horizontal edge on top of cell (c, r). v[r][c]: vertical edge left of (c, r).
  const h = Array.from({ length: rows + 1 }, (_, r) =>
    Array.from({ length: cols }, () => (r === 0 || r === rows ? 0 : flip())),
  )
  const v = Array.from({ length: rows }, () =>
    Array.from({ length: cols + 1 }, (_, c) => (c === 0 || c === cols ? 0 : flip())),
  )

  for (const { col, row, sockets = [] } of holes) {
    h[row][col] = -1 // knob pokes up out of the piece
    h[row + 1][col] = -1 // piece below pokes up into it (socket on the bottom)
    // optional sockets, e.g. to keep knobs off the page edge or away from text
    if (sockets.includes('top')) h[row][col] = 1
    if (sockets.includes('left')) v[row][col] = -1
    if (sockets.includes('right')) v[row][col + 1] = 1
  }

  const gridPath = () => {
    let d = ''
    for (let r = 1; r < rows; r++) {
      const line = []
      for (let c = 0; c < cols; c++) {
        const pts = edge(corner(c, r), corner(c + 1, r), h[r][c])
        line.push(...(c === 0 ? pts : pts.slice(1)))
      }
      d += toPath(line)
    }
    for (let c = 1; c < cols; c++) {
      const line = []
      for (let r = 0; r < rows; r++) {
        const pts = edge(corner(c, r), corner(c, r + 1), v[r][c])
        line.push(...(r === 0 ? pts : pts.slice(1)))
      }
      d += toPath(line)
    }
    return d
  }

  const piecePath = (col, row) => {
    const TL = corner(col, row)
    const TR = corner(col + 1, row)
    const BR = corner(col + 1, row + 1)
    const BL = corner(col, row + 1)
    const top = edge(TL, TR, h[row][col])
    const right = edge(TR, BR, v[row][col + 1])
    const bottom = reverse(edge(BL, BR, h[row + 1][col]))
    const left = reverse(edge(TL, BL, v[row][col]))
    return toPath(top) + toPath(right, false) + toPath(bottom, false) + toPath(left, false) + 'Z'
  }

  return { gridPath, piecePath, corner }
}

/** How far a knob reaches past its cell, as a fraction of the cell size. */
export const KNOB_REACH = 0.27
