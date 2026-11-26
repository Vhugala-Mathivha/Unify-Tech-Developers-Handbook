import { createJigsaw, KNOB_REACH } from './jigsaw'
import { CELL, COVER_H, COVER_W, grid, holeCells } from './layout'
import { fullName } from '../../../data/authors'

const jigsaw = createJigsaw({ ...grid, holes: holeCells })
const gridPath = jigsaw.gridPath()

/**
 * White page covered in faint gray jigsaw lines, with one missing piece per
 * author; their photo shows through the gap.
 */
export default function PuzzleBackground({ authors }) {
  const pieces = authors.slice(0, holeCells.length).map((author, i) => {
    const cell = holeCells[i]
    const [x, y] = jigsaw.corner(cell.col, cell.row)
    // Square puzzle crop (face slightly above centre) sized to cover the cell
    // plus any knobs sticking out of it.
    const reach = CELL * KNOB_REACH
    const size = CELL + 2 * reach
    return {
      author,
      id: `cover-piece-${author.id}`,
      d: jigsaw.piecePath(cell.col, cell.row),
      img: { x: x - reach, y: y - reach, width: size, height: size },
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
        {pieces.map((p) => (
          <clipPath id={p.id} key={p.id}>
            <path d={p.d} />
          </clipPath>
        ))}
        <filter id="cover-piece-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0.35" stdDeviation="0.45" floodColor="#000" floodOpacity="0.18" />
        </filter>
      </defs>

      <path className="puzzle-bg__grid" d={gridPath} />

      {pieces.map((p) => (
        <g key={p.id} filter="url(#cover-piece-shadow)">
          <image
            href={p.author.puzzlePhoto}
            x={p.img.x}
            y={p.img.y}
            width={p.img.width}
            height={p.img.height}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${p.id})`}
          >
            <title>{fullName(p.author)}</title>
          </image>
          <path className="puzzle-bg__hole-edge" d={p.d} />
        </g>
      ))}
    </svg>
  )
}
