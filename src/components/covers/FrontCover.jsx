import { authors, fullName } from '../../data/authors'
import { authorCredit, bookTitle } from '../../data/book'
import goatLogo from '../../assets/brand/goat-logo.jpg'
import PuzzleBackground from './puzzle/PuzzleBackground'
import { TITLE_TOP } from './puzzle/layout'
import './FrontCover.css'

const pieces = [
  // the goat fills ~53% of its 736px square: at 25 units it is ~13 units tall,
  // lifted so its base clears the socket at the bottom of the piece
  { id: 'goat-logo', href: goatLogo, label: 'Goat logo', fit: 'contain', size: 25, offsetY: -2.5 },
  ...authors.map((a) => ({ id: a.id, href: a.puzzlePhoto, label: fullName(a) })),
]

export default function FrontCover() {
  return (
    <div className="front-cover">
      <PuzzleBackground pieces={pieces} />

      <header className="front-cover__top" style={{ top: `${TITLE_TOP}cqw` }}>
        <h1 className="front-cover__title" aria-label={`${bookTitle.main} - ${bookTitle.sub}`}>
          <span className="front-cover__title-main">{bookTitle.main}</span>
          <span className="front-cover__title-sub">{bookTitle.sub}</span>
        </h1>
        <p className="front-cover__credit">{authorCredit}</p>
      </header>
    </div>
  )
}
