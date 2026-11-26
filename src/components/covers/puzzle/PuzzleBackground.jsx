import { createJigsaw, KNOB_REACH } from './jigsaw'
import { CELL, COVER_H, COVER_W, grid, slots } from './layout'

const jigsaw = createJigsaw({ ...grid, holes: Object.values(slots) })
const gridPath = jigsaw.gridPath()

/**
 * Where to draw an image inside its piece.
 *  - 'cover' (photos): a square image filling the cell plus any knobs.
 *  - 'contain' (logos): `size` units square, centred at the visible middle of
 *    the cell, on a white fill.
 */
function imageBox(slot, { fit = 'cover', size, offsetY = 0 }) {
  const [x, y] = jigsaw.corner(slot.col, slot.row)
  if (fit === 'cover') {
    const reach = CELL * KNOB_REACH
    return { x: x - reach, y: y - reach, size: CELL + 2 * reach }
  }
  // the top row overhangs the page, so centre on the part that is visible
  const visibleTop = Math.max(y, 0)
  const cx = x + CELL / 2
  const cy = (visibleTop + y + CELL) / 2 + offsetY
  return { x: cx - size / 2, y: cy - size / 2, size }
}

/**
 * White page covered in faint gray jigsaw lines, with missing pieces whose
 * gaps show an image (author photos, the logo).
 *
 * @param {{ id: string, href: string, label: string, fit?: 'cover'|'contain', size?: number, offsetY?: number }[]} pieces
 *        each `id` must have a slot in layout.js
 */
export default function PuzzleBackground({ pieces }) {
  const shapes = pieces
    .filter((p) => slots[p.id])
    .map((p) => ({
      ...p,
      clipId: `cover-piece-${p.id}`,
      d: jigsaw.piecePath(slots[p.id].col, slots[p.id].row),
      box: imageBox(slots[p.id], p),
    }))

  return (
    <svg
      className="puzzle-bg"
      viewBox={`0 0 ${COVER_W} ${COVER_H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Puzzle with the authors' photos and the team logo in the missing pieces"
    >
      <defs>
        {shapes.map((s) => (
          <clipPath id={s.clipId} key={s.clipId}>
            <path d={s.d} />
          </clipPath>
        ))}
        <filter id="cover-piece-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0.35" stdDeviation="0.45" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>

      <path className="puzzle-bg__grid" d={gridPath} />

      {shapes.map((s) => (
        <g key={s.clipId} filter="url(#cover-piece-shadow)">
          <g clipPath={`url(#${s.clipId})`}>
            {s.fit === 'contain' && <path d={s.d} fill="#ffffff" />}
            <image
              href={s.href}
              x={s.box.x}
              y={s.box.y}
              width={s.box.size}
              height={s.box.size}
              preserveAspectRatio="xMidYMid slice"
            >
              <title>{s.label}</title>
            </image>
          </g>
          <path className="puzzle-bg__hole-edge" d={s.d} />
        </g>
      ))}
    </svg>
  )
}
