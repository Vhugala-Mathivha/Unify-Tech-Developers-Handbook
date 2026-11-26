import { forwardRef } from 'react'
import './BookPage.css'

/**
 * One leaf of the flipbook. react-pageflip needs a ref-forwarding DOM element.
 *
 * @param {'left'|'right'} side  which side of the spread it sits on (spine shading)
 * @param {'cover'|'endpaper'|'paper'} variant
 */
const BookPage = forwardRef(function BookPage({ side, variant = 'paper', children }, ref) {
  const hard = variant !== 'paper'
  return (
    <div
      ref={ref}
      className={`book-page book-page--${side} book-page--${variant}`}
      data-density={hard ? 'hard' : 'soft'}
    >
      <div className="book-page__inner">{children}</div>
    </div>
  )
})

export default BookPage
