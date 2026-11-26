import { authors } from '../../data/authors'
import { authorCredit, bookTitle } from '../../data/book'
import PuzzleBackground from './puzzle/PuzzleBackground'
import { TITLE_TOP } from './puzzle/layout'
import './FrontCover.css'

export default function FrontCover() {
  return (
    <div className="front-cover">
      <PuzzleBackground authors={authors} />

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
