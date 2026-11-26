import { forwardRef } from 'react'
import './BookPage.css'

/**
 * One leaf of the flipbook. react-pageflip needs a ref-forwarding DOM element.
 *
 * @param {'left'|'right'} side  which side of the spread it sits on (spine shading, page number)
 * @param {'cover'|'endpaper'|'paper'} variant
 * @param {number|null} number   printed page number, shown in the bottom corner
 */
const BookPage = forwardRef(function BookPage({ side, variant = 'paper', number = null, children }, ref) {
  const hard = variant !== 'paper'
  return (
    <div
      ref={ref}
      className={`book-page book-page--${side} book-page--${variant}`}
      data-density={hard ? 'hard' : 'soft'}
    >
      <div className="book-page__inner">
        {children}
        {number != null && <span className="book-page__number">{number}</span>}
      </div>
    </div>
  )
})

export default BookPage
