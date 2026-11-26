import { createJigsaw, KNOB_REACH } from './jigsaw'
import { CELL, COVER_H, COVER_W, grid, slots } from './layout'

const jigsaw = createJigsaw({ ...grid, holes: Object.values(slots) })
const gridPath = jigsaw.gridPath()

/**
 * White page covered in faint gray jigsaw lines, with missing pieces whose
 * gaps show the authors' photos.
 *
 * @param {{ id: string, href: string, label: string }[]} pieces
 *        each `id` must have a slot in layout.js
 */
export default function PuzzleBackground({ pieces }) {
  const reach = CELL * KNOB_REACH
  const shapes = pieces
    .filter((p) => slots[p.id])
    .map((p) => {
      const { col, row } = slots[p.id]
      const [x, y] = jigsaw.corner(col, row)
      return {
        ...p,
        clipId: `cover-piece-${p.id}`,
        d: jigsaw.piecePath(col, row),
        // square photo covering the cell plus any knobs sticking out of it
        box: { x: x - reach, y: y - reach, size: CELL + 2 * reach },
      }
    })

  return (
    <svg
      className="puzzle-bg"
      viewBox={`0 0 ${COVER_W} ${COVER_H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Puzzle with the authors' photos in the missing pieces"
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
          <image
            href={s.href}
            x={s.box.x}
            y={s.box.y}
            width={s.box.size}
            height={s.box.size}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${s.clipId})`}
          >
            <title>{s.label}</title>
          </image>
          <path className="puzzle-bg__hole-edge" d={s.d} />
        </g>
      ))}
    </svg>
  )
}
